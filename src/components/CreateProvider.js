import React from 'react';
import { Provider } from 'react-redux';
import CreateInstall from './CreateInstall';

export const CreateProvider = (
    { store, registerModel, AsyncComponent },
    contextID
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
        __RE__: { registerModel, AsyncComponent },
        __CONTEXT__: contextID.reduce((r, v) => {
            return {
                ...r,
                [v]: React.createContext()
            };
        }, {})
    })(REProvider);
};
