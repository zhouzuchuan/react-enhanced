import { LOADING_MODEL_NAME } from '../constant'

export default {
    namespace: LOADING_MODEL_NAME,
    state: new Map(),
    reducers: {
        remove: (state: Map<string, number>, { payload }: any) =>
            state.delete(payload),
        set: (state: Map<string, number>, { payload }: any) =>
            state.set(payload, 1),
    },
}
