import { fromJS } from 'immutable'
import { put, call, select } from 'redux-saga/effects'

export default {
    namespace: 'home',

    state: fromJS({
        // 数据集 表（文件树））
        tbList: []
    }),

    effects: {
        *GET_TBINFO({ payload }) {},
        *test({ payload }, a) {
            console.log(payload, a)
        }
    },
    reducers: {
        GET_SUCCESS: (state, { payload }) => {
            return Object.entries({
                ...payload,
                loading: false
            }).reduce((r, [n, m]) => r.set(n, fromJS(m)), state)
        },
        SELECT_MENU: (state, { payload }) => state.set('selectMenu', payload)
    }
}
