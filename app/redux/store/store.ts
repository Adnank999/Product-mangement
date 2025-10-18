import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "../auth/authApi";
import authReducer from "../auth/authSlice"
import { productApi } from '../product/productApi'; 
import { categoryApi } from '../category/categoryApi';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({

  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer, 
   [categoryApi.reducerPath]: categoryApi.reducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware).concat(productApi.middleware).concat(categoryApi.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
