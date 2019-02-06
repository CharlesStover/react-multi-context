# React Multi-Context [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Simplify%20React's%20Context%20API%20by%20managing%20multiple%20contexts%20with%20a%20single%20component.&url=https://github.com/CharlesStover/react-multi-context&via=CharlesStover&hashtags=react,reactjs,javascript,webdev,webdeveloper,webdevelopment)

Manage multiple contexts with a single React component.

[![version](https://img.shields.io/npm/v/react-multi-context.svg)](https://www.npmjs.com/package/react-multi-context)
[![minified size](https://img.shields.io/bundlephobia/min/react-multi-context.svg)](https://www.npmjs.com/package/react-multi-context)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-multi-context.svg)](https://www.npmjs.com/package/react-multi-context)
[![downloads](https://img.shields.io/npm/dt/react-multi-context.svg)](https://www.npmjs.com/package/react-multi-context)
[![build](https://api.travis-ci.com/CharlesStover/react-multi-context.svg)](https://travis-ci.com/CharlesStover/react-multi-context/)

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
Using this prop will execute the `children` render prop by passing the corresponding values of the context as the parameters.

## Example

```JS
// Parent.js
import createMultiContext from 'react-multi-context';

// Context to provide to children.
export const ParentContext = createMultiContext();

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
```
```JS
// Child.js
// Get the context provided from the parent
import { ParentContext } from './Parent';

export default class Child extends React.Component {
  render() {
    return (
      <ParentContext get={[ 'project', 'user' ]}>
        {(project, user) =>

          /* This is a demo of React Multi-Context v1.0 by Charles! */
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
```
```JS
// Child1 - reads A
// Note: Each value is its own context, which is what makes this MULTI-context.
const Child1 = () =>
  <MultiContextInstance get={[ 'a' ]}>
    {(a) => `The value of A is ${a}!`}
  </MultiContextInstance>;
```
```JS
// Child2 - reads A and B
// Note: Reading multiple values will trigger a re-render if any one read value changes.
const Child2 = () =>
  <MultiContextInstance get={[ 'a', 'b' ]}>
    {(a, b) => `The value of A+B is ${a + b}!`}
  </MultiContextInstance>;
```
```JS
// Child3 - reads B and A
// Note: The order of the get prop corresponds to the order of the function parameters.
const Child3 = () =>
  <MultiContextInstance get={[ 'b', 'a' ]}>
    {(b, a) => `The value of A+B is ${a + b}!`}
  </MultiContextInstance>;
```

## Default Values

You may pass an object of default values for the contexts as a parameter to `createMultiContext` or via the `default` prop.

```JS
const MyMultiContext = createMultiContext({ a: 0, b: 0 });
```

or

```JS
<MyMultiContext
  default={{ a: 0, b: 0 }}
  set={{ a: 1 }}
>
  <MyMultiContext get={[ 'b' ]}>
    {b => 'I predict that B equals zero: ' + b}
  </MyMultiContext>
</MyMultiContext>
```

You do not need to do both.

## MultiContext.with

`MultiContextInstance.with(...multiContextKeys)(Component)` will bind the `multiContextKeys` of `MultiContextInstance` to the props of `Component`.

```JS
import React from 'react';
import { SomeMultiContext } from './some-component';

class MyComponent extends React.PureComponent {
  render() {
    return <div children={'My name is ' + this.props.name + ', and I am ' + this.props.age + '!'} />;
  }
}

// Binds the MultiContext's `name` property to MyComponent's `name` prop.
export default SomeMultiContext.with('name', 'age')(MyComponent);
```
