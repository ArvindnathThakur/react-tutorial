import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component {
    render() {
        const name = 'Arvind'
        return (
            <React.Fragment>Hello {name}!! Today is {new Date().toLocaleDateString()}.</React.Fragment>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)