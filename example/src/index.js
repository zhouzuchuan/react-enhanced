import React from 'react'
import ReactDOM from 'react-dom'
// import 'babel-polyfill'
import { HashRouter as Router, BrowserRouter } from 'react-router-dom'
import { init, connect } from 'react-enhanced'
import { Modal } from 'antd'

import list from './api'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import Loading from './components/Loading.jsx'

const { Provider } = init({
    // warehouse: ['home', 'list'],
    componentLoading: 2,
    requestLoading: 2,
    apiList: list
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
