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
    text: 'Do something?',
    conditions: [
      {
        id: 31,
        text: 'Yes',
        type: 'element-condition',
        to: 1
      },
      {
        id: 32,
        text: 'No',
        type: 'element-condition',
        to: 4
      }
    ]
  },
  {
    id: 4,
    type: 'element-branch',
    text: 'Are you sure?',
    conditions: [
      {
        id: 41,
        text: 'Yes',
        type: 'element-condition',
        to: 1
      },
      {
        id: 42,
        text: 'No',
        type: 'element-condition',
        to: 3
      },
      {
        id: 43,
        text: 'Maybe',
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

![flow](https://user-images.githubusercontent.com/503539/62951179-2a3eba00-bdf2-11e9-9d0e-a207913ab60f.png)

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
