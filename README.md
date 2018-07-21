# react-multi-context
Manage multiple contexts with a single React component.

![package](https://img.shields.io/github/package-json/v/CharlesStover/react-multi-context.svg)
![build](https://api.travis-ci.com/CharlesStover/react-multi-context.svg)
![downloads](https://img.shields.io/npm/dt/react-multi-context.svg)
![minified size](https://img.shields.io/bundlephobia/min/react-multi-context.svg)
![minzipped size](https://img.shields.io/bundlephobia/minzip/react-multi-context.svg)

## Install
* `npm install react-multi-context --save` or
* `yarn add react-multi-context`

## Test
* `npm run test` or
* `yarn test`

## Use
```JS
import createMultiContext from 'react-multi-context';
export const MyMultiContext = createMultiContext();
```

Create the context by importing and executing `createMultiContext` wherever you want to create context.
Then, import that multi-context instance as needed.

Use the `set` prop to set a context's value.
Changing the value on a key-value pair in a context will cause all getters for that key to re-render.

Use the `get` prop to get a context's value.
Using this prop will execute the children function by passing the corresponding values of the context as the parameters.

## Example
```JS
// Parent.js
import createMultiContext from 'react-multi-context';

export const ParentContext = createMultiContext(); // context to provide to children

export default class Parent extends React.Component {
  render() {
    return (
      <ParentContext
        set={{
          cost: 10,
          project: {
            name: 'React Multi-Context',
            version: 1.0
          },
          user: 'Charles'
        }}
      >
        <Child />
      </ParentContext>
    );
  }
}

// Child.js
import { ParentContext } from './Parent'; // context provided from parent

export default class Child extends React.Component {
  render() {
    return (
      <ParentContext get={[ 'project', 'user' ]}>
        {(project, user) =>
          <p>This is a demo of {project.name} v{project.version} by {user}!</p>
        }
      </ParentContext>
    );
  }
}
```

## Example (Shorter)
```JS
// Parent - writes A and B
const Parent = () =>
  <MultiContextInstance set={{ a: 1, b: 2 }}>
    <Child1 />
    <Child2 />
    <Child3 />
  </MultiContextInstance>;

// Child1 - reads A
// Note: Each value is its own context, which is what makes this MULTI-context.
const Child1 = () =>
  <MultiContextInstance get={[ 'a' ]}>
    {(a) => `The value of A is ${a}!`}
  </MultiContextInstance>;

// Child2 - reads A and B
// Note: Reading multiple values will trigger a re-render if any one read value changes.
const Child2 = () =>
  <MultiContextInstance get={[ 'a', 'b' ]}>
    {(a, b) => `The value of A+B is ${a + b}!`}
  </MultiContextInstance>;

// Child3 - reads B and A
// Note: The order of the get prop corresponds to the order of the function parameters.
const Child3 = () =>
  <MultiContextInstance get={[ 'b', 'a' ]}>
    {(b, a) => `The value of A+B is ${a + b}!`}
  </MultiContextInstance>;
```

## Default Values
You may pass an object of default values for the contexts via the `default` prop.

## withContext
`withContext(MultiContextInstance, multiContextKeys)(Component)` will bind the `multiContextKeys` of `MultiContextInstance` to the props of `Component`.

```JS
import React from 'react';
import withContext from 'react-multi-context/withContext';
import { SomeMultiContext } from './some-component';

class MyComponent extends React.PureComponent {
  render() {
    return <div children={'My name is ' + this.props.name + '!'} />;
  }
}

// Binds the MultiContext's `name` property to MyComponent's `name` prop.
export default withContext(SomeMultiContext, [ 'name' ])(MyComponent);
```
