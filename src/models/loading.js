export default {
    namespace: '@@LOADING',
    state: {
        loading: false
    },
    effects: {},
    reducers: {
        __SET_LOADING__(state, { payload }) {
            return {
                state,
                ...payload
            };
        }
    }
};
