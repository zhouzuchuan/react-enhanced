import Loading from './components/PlaceholderLoading';

export { default as Install } from './components/Install';
export { default as Push } from './components/Push';
export { default as Pull } from './components/Pull';
export { default as Model } from './HOC/Model';
export { default as Request } from './HOC/Request';
export { default as withEnhance } from './HOC/withEnhance';
export { configureStore as init } from './configureStore';
export { connect } from 'react-redux';
export { bindActionCreators } from 'redux';

export const component = {
    Loading
};

export { default as asyncComponent } from './AsyncComponent';
