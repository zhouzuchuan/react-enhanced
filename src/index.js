import { configureStore } from './configureStore';
import { CreateProvider } from './components/CreateProvider';

export const init = ({ warehouse = [], ...params } = {}) => {
    return {
        Provider: CreateProvider(configureStore(params), warehouse)
    };
};

export { default as Install } from './components/Install';
export { default as Pull } from './components/Pull';
export { default as Push } from './components/Push';
