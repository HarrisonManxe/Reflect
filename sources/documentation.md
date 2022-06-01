# Creating copy.

## Pro tip:

if you not use jQuery, write this:

```js
const $ = Reflect; // $ maybe changed to another name.
```

How start use library? It's simple: create `root` element with Reflect() `function`. For exmple:

HTML:

```html
<div id="root">
  
</div>
```

JavaScript:

```js
// First way
const root = Reflect('#root');

// Second way
Reflect('#root'). // ...
```

What are the features of the library when creating an element? - You can use custom selector - ":". How it use:

```
   :          TAG_NAME          CHILD_INDEX
   ^             ^                   ^
   |             |                   |
Selector    Name of parent    Index of daughter element, which we need
```

Example:

HTML:

```html
<body>
  <div id="root">
    
  </div>
</body>
```

JavaScript:

```js
const root = Reflect(":body0"); // : (selector), body (Root element's parent) 0 (Root index of element relative to parent)
```

And you can't use `title`, `meta`, `head`, `script`, `link` and `style` tags!

# Work with classes.

Its simple: you can add class, get classes and remove

Examples:

```js
root.addClass('test')
root.getClasses() // => ['test' /* Any pre-existing classes */]
root.removeClass('test')
```

In addition, you can observe an object and assign a class to it if it does not exist and remove it if it does. Example:

```js
const root = Reflect('button')

root.on('click', (event) => {
  root.inspectClass('clicked');
})
```

# Work with id.

There is nothing significant or special here:

```js
root.getId() // => 'root /* Others */'
root.addId('test')
```

If id already exist method return `this` (for chaining) to you.

# Work with CSS Styles.

There is also no need to say much here, except that now you can remove the added classes:

HTML:

```html
<div>
  
</div>
```

JavaScript:

```js
const root = Reflect(':body0');

root.addStyles({
  'background': 'black',
  'color': 'white'
})

root.removeStyles(['background'])
```

# Creating child/new object and render it to root.

Here is the very innovation that can be useful for many developers. Create and render new objects in the root element.

HTML before `render()`:

```html
<div id="root">
  
</div>
```

JavaScript:

```js
const root = Reflect('#root')

root.render('span', {
  styles: {
     'background': 'black',
     'color': 'white'
  }
})
```

HTML after `render()`:
```html
<div id="root">
  <span style="background: black; color: white;"></span>
</div>
```

How its can work yet:

* With no arguments. It render empty HTMLElement.
* With classes. Write next:

```js
root.render('span', {
  classes: ['test', 'test2']
})
```

HTML after:

```html
<div id="root">
  <span class="test test2"></span>
</div>
```

After render HTMLElement added to root's `childs array` and you can interact with this:

```js
const child0 = root.child(0) // 0 - is index in array. You can always check them - console.log(root.childs)

child0.getClasses() // As you see, now you can use Reflect API with child
```

But you can remove child (Child (HTMLElement) will remove on page.

```js
root.removeChild(0)
```

# Work with content.

Nothing complicated. Everything is simple and already obvious:

```js
root.getText()
root.setText('test')

root.getHTML()
root.setHTML('<p>hello</p>')
```

You can handle event with `on()` method:

```js
root.on('myEvent', function myCallback() {})
```

# Other useful methods and function.

* refresh - reload page, use: `root.refresh()`.
