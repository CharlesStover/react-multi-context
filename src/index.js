import React from 'react';

const providerSort = (a, b) =>
  a[0] < b[0] ?
    -1 :
    1;

const createMultiContext = (defaults = Object.create(null)) => {
  const contexts = Object.create(null);
  for (const [ key, value ] of Object.entries(defaults)) {
    contexts[key] = React.createContext(value);
  }

  return class MultiContext extends React.PureComponent {

    static with(...contextKeys) {

      const reduceContextToProps = (props, contextValue, index) => {
        props[contextKeys[index]] = contextValue;
        return props;
      };

      return (Component) =>
        class WithMultiContext extends React.PureComponent {

          contextConsumer = (...contextValues) => {
            const props = contextValues.reduce(
              reduceContextToProps,
              Object.create(null)
            );
            return (
              <Component
                {...props}
                {...this.props}
              />
            );
          }

          render() {
            return (
              <MultiContext
                children={this.contextConsumer}
                get={contextKeys}
              />
            );
          }
        };
    }

    createContext(key) {
      if (!Object.prototype.hasOwnProperty.call(contexts, key)) {
        contexts[key] =
          typeof this.props.default === 'object' &&
          this.props.default !== null &&
          Object.prototype.hasOwnProperty.call(this.props.default, key) ?
            React.createContext(this.props.default[key]) :
            React.createContext();
      }
      return contexts[key];
    }

    // Recursively generate <Context.Consumer>, with each consumer being a child of the last.
    getConsumer(children, index, values) {

      // If we have all the consumers, we can spread the values to the child render prop.
      if (this.props.get.length === index) {
        return children(...values);
      }

      // Check if this context exists.
      const contextKey = this.props.get[index];
      if (!Object.prototype.hasOwnProperty.call(contexts, contextKey)) {
        throw new Error('Context `' + contextKey + '` does not exist.');
      }

      // Create this context's consumer.
      const Context = contexts[contextKey];
      return (
        <Context.Consumer
          children={
            (value) =>
              this.getConsumer(
                children,
                index + 1,
                values.concat([ value ])
              )
          }
        />
      );
    }

    getProvider(children, providers, index) {

      // If we have all the consumers, we can spread the values to the child render prop.
      if (providers.length === index) {
        return children;
      }

      // Create the context (if it doesn't exist).
      const Context = this.createContext(providers[index][0]);

      // Create this context's provider.
      return (
        <Context.Provider
          children={this.getProvider(children, providers, index + 1)}
          value={providers[index][1]}
        />
      );
    }

    get hasConsumers() {
      return (
        Array.isArray(this.props.get) &&
        this.props.get.length > 0
      );
    }

    get hasProviders() {
      return (
        typeof this.props.set === 'object' &&
        this.props.set !== null
      );
    }

    renderConsumers(children) {

      // If there are no consumers to get, just return the children.
      if (!this.hasConsumers) {
        return children;
      }

      // If there are consumers to get, get them one at a time.
      if (typeof children !== 'function') {
        throw new Error('Consuming context requires a function child.');
      }

      return this.getConsumer(children, 0, []);
    }

    renderProviders(children) {

      // If there are no providers to set, just return the children.
      if (!this.hasProviders) {
        return children;
      }

      // If there are providers to set,
      const providers = Object.entries(this.props.set);
      if (
        typeof this.props.default === 'object' &&
        this.props.default !== null
      ) {
        const propDefaults = Object.entries(this.props.default);
        const propDefaultsLength = propDefaults.length;
        for (let x = 0; x < propDefaultsLength; x++) {

          // Don't duplicate a provider if it is already set.
          if (!Object.prototype.hasOwnProperty.call(this.props.set, propDefaults[x][0])) {
            providers.push(propDefaults[x]);
          }
        }
      }
      if (providers.length === 0) {
        return children;
      }

      // Sort them to insure same hierarchy and prevent unnecessary re-rendering (if hierarchy were to change).
      providers.sort(providerSort);

      // If there are consumers, return a function render prop that sets each provider one at a time.
      if (this.hasConsumers) {
        return (...values) => this.getProvider(children(...values), providers, 0);
      }

      // If there are no consumers, set each provider one at a time.
      return this.getProvider(children, providers, 0);
    }

    render() {
      return this.renderConsumers(
        this.renderProviders(
          this.props.children
        )
      );
    }
  };
};

export default createMultiContext;
