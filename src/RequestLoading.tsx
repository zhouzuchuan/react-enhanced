import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Loading from './components/Loading'
import { LOADING_MODEL_NAME } from './constant'
import { ModelState } from './models/loading'
import { toArray } from './utils'

// const returnArray = (v, s = Map()) =>
//     (isArray(v) ? v : [v]).some((o) => !(s.get(o) || Map()).isEmpty())

// const returnUpdate = (include, exclude, store) => {
//     if (isNull(include)) {
//         return isNull(exclude) ? true : !returnArray(exclude, store)
//     } else {
//         return returnArray(include, store)
//     }
// }

export interface RequestLoadingProps {
    include?: string[] | string
    exclude?: string[] | string
}

export default function RequestLoading({
    include,
    exclude,
    ...otherProps
}: RequestLoadingProps) {
    const modelState = useSelector<any, ModelState>((store) => {
        return Reflect.get(store, LOADING_MODEL_NAME)
    })

    const loading = useMemo(
        () =>
            toArray(
                include ??
                    modelState.filter((v) => !toArray(exclude).includes(v)),
            ).some((v) => modelState.includes(v)),
        [modelState, include, exclude],
    )

    return <Loading {...otherProps} loading={loading} />
}
