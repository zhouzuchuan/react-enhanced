import React from 'react'
import { Modal, Button } from 'antd'
import { bindActionCreators, connect, Install, Push, Pull } from 'react-enhanced'
import Table from '../components/Table'

@connect(
    store => {
        return {}
    },
    dispatch => ({
        ...bindActionCreators(
            {
                getTbInfo: payload => ({
                    // did: 'home/GET_TBINFO',
                    // request: f => Promise.resolve(),
                    type: 'home/GET_TBINFO'
                }),

                test: payload => ({
                    type: 'home/test',
                    payload: {
                        a: 10
                    },
                    RE_PROMISE: true
                })
            },
            dispatch
        )
    })
)
@Push('list', props => {
    return { ccc: 10 }
})
@Pull('$service', ['serveGetUserInfo'])
export default class Home extends React.Component {
    render() {
        console.log(this.props)

        return (
            <div>
                list<Table />
            </div>
        )
    }
}
