import React from 'react'
import { ReactEnhancedContext } from './store'
import { toArray } from './utils'

export interface AsyncComponentProps {
    models: Function[]
    component: any
    componentProps: React.Props<any>
}

export const AsyncComponent = ({
    models,
    component,
    componentProps,
}: AsyncComponentProps) => {
    const [rely, setRely] = React.useState(false)
    const LazyComponents = React.lazy(component)

    const { registerModel, ComponentLoading } = React.useContext(
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
        <React.Suspense fallback={<ComponentLoading />}>
            <LazyComponents {...componentProps} />
        </React.Suspense>
    ) : (
        <ComponentLoading />
    )
}

/**
 * 异步加载组件
 *
 * @param {function} component 组件地址
 * @param {object} options 组件地址
 * @param {array} options.models 组件地址
 * @param {object} options.props 组件地址
 * @returns
 */
export const asyncComponent: (
    component: AsyncComponentProps['component'],
    options: {
        models: AsyncComponentProps['models']
        props: AsyncComponentProps['componentProps']
    },
) => React.ReactNode = (component, options) => () => (
    <AsyncComponent
        {...{
            component: component,
            models: toArray(options?.models || []),
            componentProps: options?.props || {},
        }}
    />
)
