# React components

A piece of UI in React is called a component. We will start working with a simplified version of the `CodeEditor` component from the [src/js/components/code-editor.js](https://github.com/InseeFr/Pogues/blob/master/src/js/components/code-editor.js) file:

![CodeEditor component](../img/code-editor.png "CodeEditor component")

In order to promote design of reusable components and enforce a modular coding style, components should be as elementary as possible. Then, we can build more complex components by [composing simple ones](./combining-components.md). From this perspective, our `CodeEditor` should be seen as a composition of two different components:
- the input field;
- the controls, which in turn could be split into three components, one for each button.

Yet, to keep things simple and to stick to the code, we will consider the `CodeEditor` as an elementary block.

If we ignore layout and style instructions, `HTML` for this editor looks like this:

```html
<div>
  <input type="text" defaultValue="very unhappy" />
  <div class="controls">
    <button class="up"></button>
    <button class="down"></button>
    <button class="removetrash"></button>
  </div>
</div>
```

Which can be represented in React with:

```javascript
import React from 'react'

export default function CodeEditor() {
  return (
    <div>
      <input type="text" defaultValue="very unhappy" />
       <div className="controls">
          <button className="up"></button>
          <button className="down"></button>
          <button className="remove"></button>
       </div>
    </div>
  )
}
```

We notice that:
- the `CodeEditor` component is represented as a function;
- this function returns some `HTML` like syntax; this is called `JSX` and provides a convenient way to write components; [during the compilation process](/application/build-process.md), `JSX` will be transformed to regular `JavaScript`, and this function will eventually return a `React` element;
- there are some small differences between `JSX` and `HTML` (here, the attribute `className` in place of the regular `class` attribute in `HTML`, and the attribute `defaultValue` instead of `value`);
- we export (read more about [exports](/javascript/syntax.md#export-and-import)) the component in order to use it to build the `CodeListEditor` component.

We need to tell React to render the application into an existing `div` of the [src/index.html](https://github.com/InseeFr/Pogues/blob/master/src/index.html). That's what the `ReactDOM.render` is used for (more in [bootstrap the application](doc/application/bootstrap.md)).

```javascript
ReactDOM.render(
  <CodeEditor />,
  document.getElementById('base')
)
```

If you want to experience with the code, you can start with this [pen](http://codepen.io/BoogalooJB/pen/PWJOEP) (all the code stays in one pen, so there is no `import` or `export` statements). 

<!-- Add script to embed codepens -->
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<p
  data-height="434"
  data-theme-id="dark"
  data-slug-hash="PWJOEP"
  data-default-tab="js,result"
  data-user="BoogalooJB"
  data-embed-version="2"
  data-pen-title="React and Redux within Pogues"
  class="codepen" />


<!-- pen content
//bootstrap the application (you can ignore this for now)
ReactDOM.render(
  <CodeEditor />,
  document.getElementById('base')
);


function CodeEditor() {
  return (
    <div>
      <input
         type="text"
         value="very unhappy" />
       <div className="controls">
          <button className="up" />
          <button className="down" />
          <button className="remove" />
       </div>
    </div>
  )
}
-->