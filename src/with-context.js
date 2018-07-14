import React from 'react';

const withContext = (MultiContext, contextKeys) => {

  const reduceContextToProps = (props, contextValue, index) => {
    props[contextKeys[index]] = contextValue;
    return props;
  };

  return (Component) =>
    class ContextComponent extends React.PureComponent {

      constructor(props) {
        super(props);
        this.contextConsumer = this.contextConsumer.bind(this);
      }

      contextConsumer(...contextValues) {
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
};

export default withContext;
