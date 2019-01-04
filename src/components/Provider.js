import React from 'react'
import { Provider } from 'react-redux'
import RE from '../store'

const Provider2 = props => <Provider {...{ store: RE.__store__, ...props }} />

export default Provider2
