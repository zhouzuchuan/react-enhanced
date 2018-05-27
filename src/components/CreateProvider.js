import React from 'react';
import { Provider } from 'react-redux';
import CreateInstall from './CreateInstall';

export const CreateProvider = (
    { store, registerModel, AsyncComponent },
    contextID,
    componentLoading
) => {
    class REProvider extends React.Component {
        render() {
            return (
                <Provider
                    {...{
                        store,
                        ...this.props
                    }}
                />
            );
        }
    }

    return CreateInstall({
        __RE__: {
            registerModel,
            AsyncComponent: AsyncComponent.bind(null, componentLoading)
        },
        __CONTEXT__: contextID.reduce((r, v) => {
            return {
                ...r,
                [v]: React.createContext()
            };
        }, {})
    })(REProvider);
};
