import { map } from 'rxjs/operators'

import { RE_LOADING_NAME } from '../const'

const temp = {}

export default {
    namespace: RE_LOADING_NAME,
    epics: {
        __SET_LOADING_ACTION__: epic$ =>
            epic$.pipe(
                map(({ payload: { timestamp, data } }) => ({
                    type: `${RE_LOADING_NAME}/__SET_SUCCESS__`,
                    payload: Object.entries(data).reduce((r, [k, v]) => {
                        if (v) {
                            Reflect.set(temp, k, {
                                ...(temp[k] || {}),
                                [timestamp]: v
                            })
                        } else {
                            Reflect.deleteProperty(temp[k], timestamp)
                        }

                        const curr = Object.values(temp[k] || {})
                        return {
                            ...r,
                            [k]: curr.length ? curr.some(o => o) : false
                        }
                    }, {})
                }))
            )
    },
    reducers: {
        __SET_SUCCESS__: (state, { payload }) => ({
            ...state,
            ...payload
        })
    }
}
