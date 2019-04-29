import * as React from 'react'
import { Route } from 'react-router-dom'
import RE from '../store'

// 继承指定class
export const extendsClass = A => class extends A {}

export default class RcRoute extends React.Component {
    componentRender = (mothed, ...params) => {
        if (RE.guardFunction && !RE.guardFunction(...params)) {
            return null
        }

        if (typeof mothed === 'function') {
            if (mothed.name === 'LoadableComponent') {
                const CustComponent = extendsClass(mothed)
                return new CustComponent()
            } else {
                // @ts-ignore
                return new mothed(...params)
            }
        } else {
            return mothed
        }
    }

    render() {
        return (
            <Route
                {...['component', 'render'].reduce(
                    (r, v) => ({
                        ...r,
                        ...(r[v] && { [v]: (...a) => this.componentRender(r[v], ...a) }),
                    }),
                    this.props,
                )}
            />
        )
    }
}
