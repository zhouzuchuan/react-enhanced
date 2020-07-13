import React from 'react'
import Spinner, { SpinnerProps } from 'react-spinkit'
import styled, { StyledComponent } from 'styled-components'

const mapList = {
    mask: {
        position: 'absolute',
        display: 'block',
    },
    cover: {
        position: 'relative',
        display: 'none',
    },
}

export interface LoadingProps {
    mask?: boolean
    loading?: boolean
    className?: string
    wrapClassName?: string
    spinnerProps?: SpinnerProps
    children?: React.ReactNode | null
    text?: React.ReactNode
    type?: 'mask' | 'cover'
    style?: React.CSSProperties
}

export default function Loading({
    children,
    loading = true,
    spinnerProps,
    text,
    wrapClassName,
    className,
    type = 'cover',
    style = {},
}: LoadingProps) {
    const { position, display } = mapList[type] || {}

    return (
        <StyledWrap className={wrapClassName}>
            {loading && (
                <StyledLoading
                    hasChildren={!!children}
                    position={position}
                    display={display}
                    className={className}
                    style={style}
                >
                    <Spinner {...spinnerProps} />
                    {text}
                </StyledLoading>
            )}
            {type === 'mask' || !loading ? children : null}
        </StyledWrap>
    )
}

type TLoading = {
    display: string
    position: string
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
    position: ${({ position }: TLoading) => position};

    &::after {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        filter: blur(1px);
        z-index: 9999999999;
        display: none;
        display: ${({ display }: TLoading) => display};
    }

    & > :first-child {
        position: relative;
        z-index: 99999999991;
    }
`
const StyledWrap = styled.div`
    position: relative;
`
