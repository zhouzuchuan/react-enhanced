import React from 'react'
import { Modal, Button } from 'antd'
import { bindActionCreators, connect, Install } from 'react-enhanced'

@connect(
    store => {
        console.log(store)
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
@Install(['RequestLoading'])
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    componentDidMount() {
        this.props.getTbInfo()
        this.props.test().then(() => {
            console.log('promise then')
        })
    }
    _oper = () => {
        this.setState(({ visible }) => ({ visible: !visible }))
    }
    render() {
        console.log(this.props)

        const { RequestLoading } = this.props

        return (
            <div>
                React-enhanced
                <RequestLoading className="dddd" />
                <RequestLoading>loadingw</RequestLoading>
                <p>
                    <Button onClick={this._oper}>弹出</Button>
                </p>
                <Modal onOk={this._oper}
                    visible={this.state.visible}
                >
                    dddd
                </Modal>
            </div>
        )
    }
}
