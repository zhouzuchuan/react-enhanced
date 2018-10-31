let temp = {};

export default {
    namespace: '@@LOADING',
    state: {
        // loading: false,
        // key: ''
    },
    effects: {
        *__SET_LOADING_ACTION__(
            {
                payload: { timestamp, data }
            },
            { put }
        ) {
            Object.entries(data).forEach(([k, v]) => {
                if (v) {
                    temp = {
                        ...temp,
                        [k]: {
                            ...(temp[k] || {}),
                            [timestamp]: v
                        }
                    };
                } else {
                    delete temp[k][timestamp];
                }
            });

            yield put({
                type: '@@LOADING/__SET_SUCCESS__',
                payload: Object.entries(data).reduce((r, [k, v]) => {
                    const curr = Object.values(temp[k] || {});
                    return {
                        ...r,
                        [k]: curr.length ? curr.some(o => o) : false
                    };
                }, {})
            });
        }
    },
    reducers: {
        __SET_SUCCESS__(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    }
};
