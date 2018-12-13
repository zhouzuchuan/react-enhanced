import React from 'react'
import { Provider } from 'react-redux'
import RE from '../store'

const Provider2 = props => <Provider {...{ ...props, store: RE.__store__ }} />

export default Provider2
