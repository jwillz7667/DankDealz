import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Import your reducers here
// import userReducer from './reducers/userReducer';
// import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  // Add your reducers here
  // user: userReducer,
  // cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can blacklist certain reducers from being persisted
  // blacklist: ['someReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
