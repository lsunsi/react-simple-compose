# React Simple Compose


Description
---
Utility function designed to create containers for your React components, following the smart/dumb component philosophy.

Installation
---
```
npm install react-simple-compose
```
Usage
---
The package default export is a **compose** function.
It expects a **composer** function as its first argument and returns a **container** function.
```javascript
import compose from 'react-simple-compose';

const composer = (cb, props) => {
  /* do something with cb*/
}

const container = compose(composer);
```
The **composer** function is called when the contained component is mounted and receives two arguments: a *callback* and the *props* passed to the container.

The callback is used to provide data to the component, even asynchronously.
```javascript
const composer = cb => {
  cb({ name: 'Lucas' });

  setInterval(() => {
    cb({ now: new Date() })
  }, 1000);

  /* Component gets a 'name' prop with value 'Lucas'
  * and a 'now' prop that updates every second
  */
}
```
There are two possible special states: **loading** and **error**.
By default, the component doesn't get rendered in these states.

The callback can also be used to change the container state.
```javascript
const composer = cb => {
  // state defaults to 'loading'
  http.get('/my/friends', (err, res) => {
    // passing an error as first argument changes state to 'error'
    if (err) cb(err)
    // passing data removes any kind of special states
    else cb({ friends: res })
  });
}
```
You can provide custom components to be rendered in special states.
All rendered components get the same props: all the data and the error object.
```javascript
const ErrorComponent = ({ error }) => (
  <div style={{ color: 'red' }}>
    {error.reason}
  </div>
)

const container = compose(composer, {
  loading: LoadingComponent,
  error: ErrorComponent
})
```
The generated **container** function expects a component and returns its **contained** version, that is, the component wrapped in the container that provides the props it needs.

This is sometimes called a *smart component* and that's what you should render to your view.
```javascript
const container = compose(composer)
const Smart = container(dumb)

render((
  <div id='named-clock'>
    <Smart />
  </div>
))
```


License
---

MIT
