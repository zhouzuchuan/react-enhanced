import React from 'react'
import Spinner, { SpinnerProps } from 'react-spinkit'
import styled, { StyledComponent } from 'styled-components'

// import './loading.css'

/**
 * Loading 组件
 * include/exclude (string/string) 默认为请求全触发，设置值且值为字符串, 转成数组，判断request中间层的函数名是否在数组中 有则触发
 *
 * */

interface LoadingProps {
    mask?: boolean
    loading?: boolean
    className?: string
    wrapClassName?: string
    spinnerProps?: SpinnerProps
    children?: React.ReactNode | null
    text?: React.ReactNode
}

export default function Loading({
    children,
    loading,
    spinnerProps,
    text,
    wrapClassName,
}: LoadingProps) {
    return (
        <StyledWrap className={wrapClassName}>
            {/* {loading && (
                <StyledLoading hasChildren={!!children}>
                    <Spinner {...spinnerProps} color="red" />
                    {text}
                </StyledLoading>
            )} */}
            <StyledLoading hasChildren={!!children}>
                <Spinner {...spinnerProps} color="red" />
                {text}
            </StyledLoading>
            {children}
        </StyledWrap>
    )
}

type TLoading = {
    hasChildren: boolean
}

const StyledLoading: StyledComponent<any, TLoading> = styled.div`
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: ${({ hasChildren }: TLoading) =>
        hasChildren ? 'absolute' : 'relative'};

    &::after {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        filter: blur(1px);
        z-index: 1;
        display: ${({ hasChildren }: TLoading) =>
            hasChildren ? 'block' : 'none'};
    }

    img {
        position: relative;
        z-index: 2;
    }

    & > :first-child {
        z-index: 2;
    }
`
const StyledWrap = styled.div`
    position: relative;
    vertical-align: middle;
`
