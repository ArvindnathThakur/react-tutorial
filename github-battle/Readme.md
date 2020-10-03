## React Hooks

### Why Hooks

- Simplifies state/Lifecycle
- Add state to functional components
- Isolate and share non visual logic from UI components

### Types of Hooks

#### useState
Gives a value that will persist across renders and an API to update that value and trigger a re-render.

```Javascript
const [playerOne, setPlayerOne] = React.useState(null);
// playerOne => state
// setPlayerOne => method to update state
// null => initial value of the state
```

#### useEffect

Used for interacting with outside module (call some API)

- Will be re-invoked after each render
- Re-invoking can be skipped by list of dependant variables passed as a second argument
- Clean up can be performed by a `return function` within the effect.

```Javascript
  React.useEffect(() => {
    // Will be invoked on the initial render
    // and all subsequent re-renders.
  })

  React.useEffect(() => {
    // Will be invoked on the initial render
    // and when "value1/2" changes.
  }, [value1, value2])

  React.useEffect(() => {
    // Will only be invoked on the initial render
  }, [])

  React.useEffect(() => {
    return () => {
      // perform the cleanup
      // invoked right before invoking
      // the new effect on a re-render AND
      // right before removing the component
      // from the DOM
    }
  }, [username])
```

#### Custom Hooks

- Can be used instead of `Higher Order Component` or `Render Props`

```Javascript
// Custom hook to add hover effect
// Definition:
function useHover () {
  const [hovering, setHovering] = React.useState(false)

  const mouseOver = () => setHovering(true)
  const mouseOut = () => setHovering(false)

  const attrs = {
    onMouseOver: mouseOver,
    onMouseOut: mouseOut
  }
  return [hovering, attrs]
}

// Usage:
function Info ({ id, size }) {
  const [hovering, attrs] = useHover()

  return (
      <React.Fragment>
        {hovering === true
          ? <Tooltip id={id} />
          : null}
        <img
          {...attrs}
          src="someimage.png" />
      </React.Fragment>
  )
}
```

#### useReducer
- Used for managing complex state, updating more than 1 related states. It allows for adding state to a functional component but managing the using the reducer pattern.
    > Reducer is a pattern that takes a collection and returns a single value, ideally it takes in two argument, first the aggregate functona and second the initial state.
- `useReducer` returns an array with two elements, first the state and second the dispath method whcih when called will invoke the reducer.

```Javascript
function reducer (state, action) {
  switch(action.type) {
    case 'increment':
      return {
        count: state.count + state.step,
        step: state.step,
      }
    case 'decrement':
      return {
        count: state.count - state.step,
        step: state.step,
      }
    case 'reset':
      return {
        count: 0,
        step: state.step,
      }
    case 'updateStep':
      return {
        count: state.count,
        step: action.step,
      }
    default:
      throw new Error(`This action type isn't supported.`)
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0, step: 1 })

  return (
    <React.Fragment>
      <Slider onChange={(value) => dispatch({type: 'updateStep', step: value})} />
      <hr />
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({type: 'increment'})}> + </button>
      <button onClick={() => dispatch({type: 'decrement'})}> - </button>
      <button onClick={() => dispatch({type: 'reset'})}> Reset </button>
    </React.Fragment>
  )
}
```

#### useRef
Is used to add state to a component that persists across renders but doesn’t trigger a re-render when it’s updated

```Javascript
function Form () {
  const nameRef = React.useRef()
  const emailRef = React.useRef()
  const passwordRef = React.useRef()

  const handleSubmit = e => {
    e.preventDefault()

    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    console.log(name, email, password)
  }

  return (
    <React.Fragment>
      <label>
        Name:
        <input placeholder="name" type="text" ref={nameRef} />
      </label>
      <label>
        Email:
        <input placeholder="email" type="text" ref={emailRef} />
      </label>
      <label>
        Password:
        <input placeholder="password" type="text" ref={passwordRef} />
      </label>
      <hr />
      <button onClick={() => nameRef.current.focus()}>
        Focus Name Input
      </button>
      <button onClick={() => emailRef.current.focus()}>
        Focus Email Input
      </button>
      <button onClick={() => passwordRef.current.focus()}>
        Focus Password Input
      </button>
      <hr />
      <button onClick={handleSubmit}>Submit</button>
    </React.Fragment>
  )
}
```

#### React.createContext
Context provides a way to pass data through the component tree without having to pass props down manually at every level.
```Javascript
const LocaleContext = React.createContext('en')
const ThemeContext = React.createContext('light')

export default function App () {
  const [locale] = React.useContext('en')
  const [theme] = React.useContext('light')

  return (
    <ThemeContext.Provider value={theme}>
      <LocaleContext.Provider value={locale}>
        <Home />
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  )
}

export default function Home () {
  const [locale] = React.useContext(LocaleContext)
  const [theme] = React.useContext(ThemeContext)

  return (
    <div className={`${theme}-mode`}>
        {(locale) => <Post locale={locale} />}
    </div>
  )
}
```

#### React.memo & useCallback
##### React.memo
Is a `Higher-order component` that lets you skip re-rendering a component if its props haven’t changed. The way it does this is when a component is wrapped in `React.memo()`, React will render the component and memoize the result. On subsequent re-renders, React will perform a shallow comparison (===) between the previous props and the new props - if the props haven’t changed, React will skip rendering the component and reuse the last rendered result.

##### useCallback 
Returns a memoized callback. What this means is that any function you create with useCallback won’t be re-created on subsequent re-renders. It takes two arguments, a function and an array of values that the function depends on. The memoized function it returns will only change if one of the values in the dependency array change.

```Javascript
function NthFib({ count, increment }) {
  const fib = calculateFib(count)

  return (
    <div className='container'>
      <h2>Nth Fib</h2>
      <p>
        The <b>{suffixOf(count)}</b> number in the fibonacci sequence is <b>{fib}</b>.
      </p>
      <button onClick={increment}>Next number</button>
    </div>
  )
}

function NthPrime({ count, increment }) {
  const prime = calculatePrime(count)

  return (
    <div className='container'>
      <h2>Nth Prime</h2>
      <p>
        The <b>{suffixOf(count)}</b> prime number is <b>{prime}</b>.
      </p>
      <button onClick={increment}>Next prime</button>
    </div>
  )
}

function App() {
  const [fibCount, setFibCount] = React.useState(1)
  const [primeCount, setPrimeCount] = React.useState(1)

  const handleReset = () => {
    setFibCount(1)
    setPrimeCount(1)
  }

  const add10 = () => {
    setFibCount((c) => c + 10)
    setPrimeCount((c) => c + 10)
  }

  const incrementFib = React.useCallback(() => setFibCount((c) => c + 1), [])
  const incrementPrime = React.useCallback(() => setPrimeCount((c) => c + 1), [])

  return (
    <React.Fragment>
      <button onClick={add10}>Add 10</button>
      <button onClick={handleReset}>Reset</button>
      <hr />
      <NthFib count={fibCount} increment={incrementFib} />
      <hr />
      <NthPrime count={primeCount} increment={incrementPrime} />
    </React.Fragment>
  );
}
```

#### useMemo
Takes two arguments, a function and an array of values that the function depends on. It returns a value that will be computed on the initial render and whenever any of the values in the dependency array change.

```Javascript
function NthFib({ count, increment }) {
  const fib = React.useMemo(() => calculateFib(count), [count])

  return (
    <div className='container'>
      <h2>Nth Fib</h2>
      <p>
        The <b>{suffixOf(count)}</b> number in the fibonacci sequence is <b>{fib}</b>.
      </p>
      <button onClick={increment}>Next number</button>
    </div>
  )
}

function NthPrime({ count, increment }) {
  const prime = React.useMemo(() => calculatePrime(count), [count])

  return (
    <div className='container'>
      <h2>Nth Prime</h2>
      <p>
        The <b>{suffixOf(count)}</b> prime number is <b>{prime}</b>.
      </p>
      <button onClick={increment}>Next prime</button>
    </div>
  )
}

function App() {
  const [fibCount, setFibCount] = React.useState(1)
  const [primeCount, setPrimeCount] = React.useState(1)

  const handleReset = () => {
    setFibCount(1)
    setPrimeCount(1)
  }

  const add10 = () => {
    setFibCount((c) => c + 10)
    setPrimeCount((c) => c + 10)
  }

  return (
    <React.Fragment>
      <button onClick={add10}>Add 10</button>
      <button onClick={handleReset}>Reset</button>
      <hr />
      <NthFib count={fibCount} increment={() => setFibCount((c) => c + 1)} />
      <hr />
      <NthPrime count={primeCount} increment={() => setPrimeCount((c) => c + 1)} />
    </React.Fragment>
  );
}

 function calculateFib(n, a = 1, b = 0) {
    console.count('nthFib called')
    return n === 0
        ? b
        : calculateFib(n - 1, b, a + b)
}

 function suffixOf(i) {
    let j = i % 10
    let k = i % 100

    if (j === 1 && k !== 11) {
        return i + "st"
    }
    if (j === 2 && k !== 12) {
        return i + "nd"
    }
    if (j === 3 && k !== 13) {
        return i + "rd"
    }
    return i + "th"
}

const isPrime = (n) => {
    if (n === 1) return false

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false
    }
    return true
}

 function calculatePrime(n) {
    console.count('nthPrime called')
    const primes = []
    let i = 2
    while (primes.length < n) {
        if (isPrime(i)) {
            primes.push(i)
        }
        i++
    }
    return primes[n - 1]
}

```
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

```Javascript
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
