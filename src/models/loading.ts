import { LOADING_MODEL_NAME } from '../constant'

export type ModelState = string[]

export default {
    namespace: LOADING_MODEL_NAME,
    state: [],
    reducers: {
        remove: (state: ModelState, { payload }: any) =>
            state.filter((v) => v !== payload),
        set: (state: ModelState, { payload }: any) => [...state, payload],
    },
}
