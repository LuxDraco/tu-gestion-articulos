import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { uiReducer } from './slices/uiSlice';
import { favoritesReducer } from './slices/favoritesSlice';
import { ratingsReducer } from './slices/ratingsSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favorites', 'ratings'],
};

const reducers = combineReducers({
    ui: uiReducer,
    favorites: favoritesReducer,
    ratings: ratingsReducer,
});

export const rootReducer = persistReducer(persistConfig, reducers);