export type ModelState = string[]

// loading model 名称
export const LOADING_MODEL_NAME =
    'React-Enhnaced-Loading-Model-' + new Date().getTime()

export default {
    namespace: LOADING_MODEL_NAME,
    state: [],
    reducers: {
        remove: (state: ModelState, { payload }: any) =>
            state.filter((v) => v !== payload),
        set: (state: ModelState, { payload }: any) => [...state, payload],
    },
}
