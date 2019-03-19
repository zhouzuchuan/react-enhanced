import { fromJS } from 'immutable'
import { LOADING_MODEL_NAME } from '../const'

export default {
    namespace: LOADING_MODEL_NAME,
    state: fromJS({}),
    reducers: {
        remove: (state, { payload }) => state.deleteIn(payload),
        set: (state, { payload }) => state.setIn(payload, 1),
    },
}
