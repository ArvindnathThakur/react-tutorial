## Eureka
> UI is a function of your `state` and `props` are to `components` what arguments are to `functions`. `fn(d) = V` => Function takes in data to return View.

> `JSX` is an abstraction over `React.createElement` which is a function that returns an object representation of the DOM.

## Higher-Order Component
- Is a component
- Takes in a component as an argument
- Returns a new component
- The component it returns can render the original component that was passed in

## Dynamic Import aka Code Splitting

> Check library react-loadable

### The concept

#### DynamicImport Component implementation
```JavaScript
export default class DynamicImport extends React.Component() {
    state ={
        component: null
    }
    componentDidMount() {
    this.props.load()
      .then((component) => {
        this.setState({
          component: component.default 
            ? component.default 
            : component
        })
      })
    }
    render() {
        return this.props.children(this.state.component)
    }
}
```

#### Loading modules using DynamicImport
```JavaScript
const Settings= (props) => (
    <DynamicImport load={() => import('./Settings')}>
        {(Component) => Component === null
        ? <h1>Loading...</h1>
        : <Component {...props}> />}
    </DynamicImport>
)
```


### React way

- Use `React.lazy` to lazily load the module.
- Use `React.Suspense` to display content while module is loading. This can take multiple modules as an argument
```Javascript
const Settings = React.lazy(() => import('./Settings'))

function App () {
  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <Settings />
      </React.Suspense>
    </div>
  )
}
```

### Full App using both approaches
```JSX
import React from 'react'
import Loading from './Loading'
import DynamicImport from './DynamicImport'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

const Home = (props) => (
  <DynamicImport load={() => import('./Home')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Topics = (props) => (
  <DynamicImport load={() => import('./Topics')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Settings = (props) => (
  <DynamicImport load={() => import('./Settings')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const LazyHome = React.lazy(() => import('./Home'))
const LazyTopics = React.lazy(() => import('./Topics'))
const LazySettings = React.lazy(() => import('./Settings'))

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/topics'>Topics</Link></li>
            <li><Link to='/settings'>Settings</Link></li>
          </ul>

          <hr />

          <Route exact path='/' component={Home} />
          <Route path='/topics' component={Topics} />
          <Route path='/settings' component={Settings} />

          <React.Suspense fallback={<Loading />}>
            <Route exact path='/' component={LazyHome} />
            <Route path='/topics' component={LazyTopics} />
            <Route path='/settings' component={LazySettings} />
          </React.Suspense>
        </div>
      </Router>
    )
  }
}

export default App
```