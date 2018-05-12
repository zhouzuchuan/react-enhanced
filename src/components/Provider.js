import { Provider } from 'react-redux'
import React from 'react'

import TransferContext from './TransferContext'

const XRProvider = props => {
    return <Provider {...props} />
}

export default TransferContext(3, ['XR'])(XRProvider)
