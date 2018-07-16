# react-multi-context
Manage multiple contexts with a single React component.

![GitHub version](https://img.shields.io/github/package-json/v/CharlesStover/react-multi-context.svg)
![npm version](https://img.shields.io/npm/v/react-multi-context.svg)
![npm downloads](https://img.shields.io/npm/dt/react-multi-context.svg)
![min](https://img.shields.io/bundlephobia/min/react-multi-context.svg)
![minzip](https://img.shields.io/bundlephobia/minzip/react-multi-context.svg)

## Install
`npm install react-multi-context --save` or `yarn add react-multi-context`

## Use
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

export ParentContext = createMultiContext(); // context to provide to children

class Parent extends React.Component {
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

class Child extends React.Component {
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
// parent - writes A and B
const Parent = () =>
  <MultiContextInstance set={{ a: 1, b: 2, c: 3 }}>
    <Child1 />
    <Child2 />
  </MultiContextInstance>;

// child1 - reads A
// Note: Each value is its own context, which is what makes this MULTI-context.
const Child1 = () =>
  <MultiContextInstance get={[ 'a' ]}>
    {(a) => `The value of A is ${a}!`}
  </MultiContextInstance>;

// child2 - reads A and B
// Note: Reading multiple values will trigger a re-render if any one read value changes.
const Child2 = () =>
  <MultiContextInstance get={[ 'a', 'b' ]}>
    {(a, b) => `The value of A+B is ${a + b}!`}
  </MultiContextInstance>;

// child3 - reads B and A
// Note: The order of the get property corresponds to the order of the function parameters.
const Child3 = () =>
  <MultiContextInstance get={[ 'b', 'a' ]}>
    {(b, a) => `The value of A+B is ${a + b}!`}
  </MultiContextInstance>;
```

## Default Values
You may pass an object of default values for the contexts via the `default` prop.
