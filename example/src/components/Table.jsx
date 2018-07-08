import React from 'react'
import { Pull } from 'react-enhanced'

@Pull('home', ['test', 'getTbInfo'])
@Pull('list', ['ccc'])
export default class Table extends React.Component {
    render() {
        console.log(this.props, '=====')
        return <div>table------=======</div>
    }
}
