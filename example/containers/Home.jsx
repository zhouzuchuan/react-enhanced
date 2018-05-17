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
                    type: 'dataSet/GET_TBINFO',
                    payload
                })
            },
            dispatch
        )
    })
)
export default class Home extends React.Component {
    render() {
        console.log(this.props)

        return <div>home</div>
    }
}
