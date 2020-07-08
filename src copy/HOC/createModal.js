import React from 'react'
import { Modal } from 'antd'

import { isFunction } from '../utils'

/**
 * 封装 antd Modal HOC
 * */
export default ({
    okTrigger = '',
    cancelTrigger = '',
    createAndshowAfter = '',
    modal,
    control = false,
}) => WrappedComponent => {
    const ref = React.createRef()

    return class CreateModalHoc extends React.Component {
        static getDerivedStateFromProps(np, ps) {
            if (np.count !== ps.prevCount) {
                if (ref.current) {
                    const fn = ref.current[createAndshowAfter]
                    if (isFunction(fn)) {
                        fn()
                    }
                }
                return {
                    visible: !!np.count,
                    prevCount: np.count,
                }
            }
            return null
        }
        state = {
            visible: false,
            prevCount: null,
            confirmLoading: false,
            modalProps: {},
        }
        componentRef = ref
        closeModal = () => {
            this.setState({
                visible: false,
                confirmLoading: false,
                modalProps: {},
            })
        }
        handleCancel = () => {
            this.dispatchAction(cancelTrigger, this.closeModal)
        }
        handleOk = () => {
            this.setState({
                confirmLoading: true,
            })
            this.dispatchAction(okTrigger, this.closeModal, () => {
                this.setState({
                    confirmLoading: false,
                })
            })
        }
        dispatchAction = (name, fn = f => f, fn2 = f => f) => {
            const currRef = this.componentRef.current

            if (name !== '' && isFunction(currRef[name])) {
                return new Promise(currRef[name]()).then(isFunction(fn) ? fn : f => f).catch(fn2)
            } else {
                return Promise.resolve()
                    .then(isFunction(fn) ? fn : f => f)
                    .catch(fn2)
            }
        }

        modalControlState = params => {
            this.setState(params)
        }
        render() {
            const { visible, confirmLoading, prevCount, modalProps } = this.state
            const { modal: propsModal = {}, count, ...props } = this.props

            const createModalProps = {
                maskClosable: false,
                ...modal,
                ...propsModal,
                visible,
                confirmLoading,
                ...modalProps,
                onCancel: this.handleCancel,
                onOk: this.handleOk,
            }

            const ownprops = control ? { modalControlState: this.modalControlState } : {}

            return prevCount ? (
                <Modal {...createModalProps}>
                    {count && (
                        <WrappedComponent
                            {...{ ...props, ...ownprops, count, loading: confirmLoading }}
                            ref={this.componentRef}
                        />
                    )}
                </Modal>
            ) : null
        }
    }
}
