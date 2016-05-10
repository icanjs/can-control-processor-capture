[![npm version](https://badge.fury.io/js/can-control-processor-capture.svg)](https://badge.fury.io/js/can-control-processor-capture)

# An event processor for CanJS

Allows to subscribe to the `capture` phase of DOM events. Extends [can.Control.processors](https://canjs.com/docs/can.Control.processors.html).

_Note: does not support event delegation yet_.

## Usage

### With can.Component

```html
<my-component></my-component>

can.Component.extend({
  tag: 'my-component',
  viewModel: {},
  events: {
    '{document} click capture': function(){
      console.log('{document} click capture', arguments);
    }
  }
});
```

### With pure can.Control

```html
<div id="app">
  <button>Click</button>
</div>

let MyControl = can.Control.extend({
    'button click capture': function(){
        console.log('button click capture', arguments);
    },
    '{document} click capture': function(){
        console.log('{document} click capture', arguments);
    }
});
new MyControl('#app');

```


