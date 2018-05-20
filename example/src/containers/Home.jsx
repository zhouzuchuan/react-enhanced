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
                    did: 'dataSet/GET_TBINFO',
                    request: f => Promise.resolve()
                })
            },
            dispatch
        )
    })
)
export default class Home extends React.Component {
    componentDidMount() {
        this.props.getTbInfo()
    }
    render() {
        console.log(this.props)

        return <div>home</div>
    }
}
