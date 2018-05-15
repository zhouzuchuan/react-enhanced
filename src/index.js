import { configureStore } from './configureStore'
import REProvider from './components/Provider'
import { CreateProvider } from './components/CreateProvider'

export const init = (contextID = [], ...params) => {
    return {
        Provider: CreateProvider(configureStore(params), contextID)(REProvider)
    }
}

export { default as Install } from './components/Install'
