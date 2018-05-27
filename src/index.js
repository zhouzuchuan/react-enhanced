import { configureStore } from './configureStore';
import { CreateProvider } from './components/CreateProvider';

export const init = ({ warehouse = [], componentLoading, ...params } = {}) => {
    return {
        Provider: CreateProvider(
            configureStore(params),
            warehouse,
            componentLoading
        )
    };
};

export { default as Install } from './components/Install';
export { default as Pull } from './components/Pull';
export { default as Push } from './components/Push';
export { connect } from 'react-redux';
export { bindActionCreators } from 'redux';
