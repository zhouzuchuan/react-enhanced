import React from 'react';
import { Provider } from 'react-redux';
import CreateInstall from './CreateInstall';
import PlaceholderLoading from './PlaceholderLoading';

export const CreateProvider = (
    { store, registerModel, AsyncComponent },
    contextID,
    componentLoading,
    requestLoading
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
            RequestLoading: PlaceholderLoading(requestLoading),
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
