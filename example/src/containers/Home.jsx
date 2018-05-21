import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

@connect(
    store => {
        return {}
    },
    dispatch => ({
        ...bindActionCreators(
            {
                getTbInfo: payload => ({
                    did: 'home/GET_TBINFO',
                    request: f => Promise.resolve()
                }),

                test: payload => ({
                    type: 'home/test',
                    payload: {
                        a: 10
                    }
                })
            },
            dispatch
        )
    })
)
export default class Home extends React.Component {
    componentDidMount() {
        this.props.getTbInfo()
        this.props.test()
    }
    render() {
        console.log(this.props)

        return <div>home</div>
    }
}
