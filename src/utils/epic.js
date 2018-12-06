import { ofType } from 'redux-observable';

// 封装epic类型 调用
export const epicEnhance = fn => (action$, ...other) => fn(action$.pipe(ofType(fn.name)), ...other);
