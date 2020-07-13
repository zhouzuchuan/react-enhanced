import React, { useMemo, useContext } from 'react'
import { useSelector } from 'react-redux'
import Loading, { LoadingProps } from './components/Loading'
import { ModelState, LOADING_MODEL_NAME, splitStr } from './loadingModel'
import { toArray } from './utils/index'
import { ReactEnhancedContext } from './store'

export interface RequestLoadingProps extends LoadingProps {
    include?: string[] | string
    exclude?: string[] | string
    visible?: boolean
}

export default function RequestLoading(props: RequestLoadingProps) {
    const { include, exclude, visible, ...otherProps } = props
    const modelState = useSelector<any, ModelState>((store) =>
        Reflect.get(store, LOADING_MODEL_NAME),
    )

    const { requestLoadingProps } = useContext(ReactEnhancedContext)

    const loading = useMemo(() => {
        const currRequestName = modelState.map((v) => v.split(splitStr)[0])
        return toArray(
            include ??
                currRequestName.filter((v) => !toArray(exclude).includes(v)),
        ).some((v) => currRequestName.includes(v))
    }, [modelState, include, exclude])

    return (
        <Loading
            {...otherProps}
            loading={visible ?? loading}
            spinnerProps={requestLoadingProps}
        />
    )
}
