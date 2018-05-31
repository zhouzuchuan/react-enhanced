import { fromJS } from 'immutable'
import axios from 'axios'

const serve = function() {
    return axios.get('http://10.5.141.45:8081/datatable/dapDataTb/getTbInfo').then(v => {
        console.log(v)
        return v.data
    })
}

export default {
    namespace: 'home',

    state: fromJS({
        // 数据集 表（文件树））
        tbList: []
    }),

    effects: {
        *GET_TBINFO({ payload }, { call }) {
            const cc = yield call(serve)
            console.log(cc)
        },
        *test({ payload }, { put, call, select }) {
            console.log('ddddd')
            yield put({
                request: () => {
                    return axios.get('http://10.5.141.45:8081/datatable/dapDataTb/getTbInfo')
                },
                did: {
                    type: 'home/aa'
                    // payload: v => {
                    //     console.log(v)
                    //     return v
                    // }
                }
            })
            // console.log(call)
            // return 'data'
        }
    },
    reducers: {
        aa: (state, { payload }) => {
            console.log('dddssss', payload)
            return state
        },
        GET_SUCCESS: (state, { payload }) => {
            return Object.entries({
                ...payload,
                loading: false
            }).reduce((r, [n, m]) => r.set(n, fromJS(m)), state)
        },
        SELECT_MENU: (state, { payload }) => state.set('selectMenu', payload)
    }
}
