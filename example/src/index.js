import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import { HashRouter as Router, BrowserRouter } from 'react-router-dom'
import { init } from 'react-enhanced'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const { Provider } = init({})

ReactDOM.render(
    <Provider>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
