export default {
    namespace: '@@LOADING',
    state: {
        loading: false,
        key: ''
    },
    effects: {},
    reducers: {
        __SET_LOADING_START__(state, { payload }) {
            return {
                state,
                ...payload
            };
        },
        __SET_LOADING_END__(state, { payload }) {
            return {
                state,
                ...payload
            };
        }
    }
};
