import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Import your reducers here
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'] // Only persist these reducers
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  cart: persistReducer(persistConfig, cartReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
