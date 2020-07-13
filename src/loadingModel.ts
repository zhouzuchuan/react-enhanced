export type ModelState = string[]

// loading model 名称
export const LOADING_MODEL_NAME =
    'React-Enhnaced-Loading-Model-' + new Date().getTime()

// 标识分隔符 （函数名以及时间戳）
export const splitStr = '--'

export default {
    namespace: LOADING_MODEL_NAME,
    state: [],
    reducers: {
        // 删除 标识
        remove: (state: ModelState, { payload }: any) =>
            state.filter((v) => v !== payload),
        // 删除 指定函数名 标识
        removeDesignation: (state: ModelState, { payload }: any) =>
            state.filter((v) => !v.startsWith(`${payload}${splitStr}`)),
        // 设置 标识
        set: (state: ModelState, { payload }: any) => [...state, payload],
    },
}
