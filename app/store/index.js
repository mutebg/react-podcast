import reduxThunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import reducers from '../reducers';

export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(
      reduxThunk
    ),
    //applyMiddleware(crashReporter), // report all js crashes
    autoRehydrate(), // save redux state in localstorate

    (process.env.NODE_ENV === 'development') &&
      typeof window === 'object' &&
       typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() : f => f
  ));

  persistStore(store, {
    blacklist: ['search'],
    debounce: 500,
  });

  return store;
}
