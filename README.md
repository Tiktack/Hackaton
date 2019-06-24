## Hackaton editor 

### `Components`

U can use WidgetEditor functional component or WidgetEditorClass ES6 class component.

### `Usage`

U should provide 2 props: 
`data` - if u wanna load this widget with initial state<br>
`types` - array of types that you can use further<br>
#### Interface:
  `componentName: @string,<br>
  displayName: @string,<br>
  props: []`

### `Saving data`

Create reference with useRef or createRef and pass as a prop.
After that u can use this ref to call method save() which will return object.

### `Example`

Look at **App** component.
