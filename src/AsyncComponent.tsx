import React from 'react'
import { ReactEnhancedContext } from './store'
import { toArray } from './utils'
import Loading from './components/Loading'

type Ta = () => Promise<{
    default: any
}>

export interface AsyncComponentProps {
    models: Ta[]
    component: () => Promise<{
        default: React.ComponentType<any>
    }>
    componentProps: React.Props<any>
}

export const AsyncComponent = ({
    models,
    component,
    componentProps,
}: AsyncComponentProps) => {
    const [rely, setRely] = React.useState(false)
    const LazyComponents = React.lazy(component)

    const { registerModel, requestLoadingProps } = React.useContext(
        ReactEnhancedContext,
    )

    React.useEffect(() => {
        if (models.length) {
            // 注入model
            Promise.all(models.map((v) => v())).then((data) => {
                if (data.length) {
                    Object.values(data).forEach((v) => registerModel(v.default))
                    setRely(true)
                }
            })
        } else {
            setRely(true)
        }
    }, [registerModel])

    return rely ? (
        <React.Suspense
            fallback={<Loading spinnerProps={requestLoadingProps} />}
        >
            <LazyComponents {...componentProps} />
        </React.Suspense>
    ) : (
        <Loading spinnerProps={requestLoadingProps} />
    )
}

/**
 * 异步加载组件
 *
 * @param {promise} component 异步加载组件 import()
 * @param {object} options 组件配置
 * @param {array} options.models 当前组件需要的 model
 * @param {object} options.props 当前组件 props
 * @returns
 */
export const asyncComponent: (
    component: AsyncComponentProps['component'],
    options?: Partial<{
        models: AsyncComponentProps['models']
        props: AsyncComponentProps['componentProps']
    }>,
) => React.ComponentType<any> = (component, options) => () => (
    <AsyncComponent
        {...{
            component: component,
            models: toArray(options?.models || []),
            componentProps: options?.props || {},
        }}
    />
)
