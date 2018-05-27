import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import { HashRouter as Router, BrowserRouter } from 'react-router-dom'
import { init, connect } from 'react-enhanced'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import Loading from './components/Loading.jsx'

const { Provider } = init({
    // componentLoading: Loading
})

ReactDOM.render(
    <Provider>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
