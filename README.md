# Flow (work in progress)
A Vue.js component which generates diagram based on json input

## Example

```
[
  {
    id: 0,
    type: 'element-start',
    to: 2
  },
  {
    id: 2,
    type: 'element-square',
    to: 3
  },
  {
    id: 3,
    type: 'element-branch',
    conditions: [
      {
        id: 31,
        type: 'element-condition',
        to: 1
      },
      {
        id: 32,
        type: 'element-condition',
        to: 4
      }
    ]
  },
  {
    id: 4,
    type: 'element-branch',
    conditions: [
      {
        id: 41,
        type: 'element-condition',
        to: 2
      },
      {
        id: 42,
        type: 'element-condition',
        to: 1
      }
    ]
  },
  {
    id: 1,
    type: 'element-end'
  }
]
```

![p1](https://user-images.githubusercontent.com/503539/62825789-e5c8d980-bbb9-11e9-8f03-c25dc20089f1.png)

## Status

API is not yet defined.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Config
TODO

### Schema rules
Following conditions must be met by json schema:
- It must have start and end element
- Each element must have an ID and it must be unique
- Element can't reference non existing element