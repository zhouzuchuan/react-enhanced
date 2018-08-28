import React from 'react'
import { Modal, Button } from 'antd'
import { bindActionCreators, connect, Install, Push } from 'react-enhanced'
import Table from '../components/Table'
import axios from 'axios'

const serve = function() {
    return axios.get('http://localhost:3000/packageList').then(v => {
        console.log(v)
        return v.data
    })
}

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
                    request: serve,
                    will: 'home/GET_TBINFO'
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
@Push('home', ['test'])
@Push('home', ['getTbInfo'])
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    componentDidMount() {
        this.props.getTbInfo()
        // this.props.test().then(() => {
        //     console.log('promise then')
        // })
    }
    _oper = () => {
        this.setState(({ visible }) => ({ visible: !visible }))
    }
    render() {
        // console.log(this.props)

        const { RequestLoading } = this.props

        return (
            <div>
                <Table />
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
