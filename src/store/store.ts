import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./history/historySlices";
import { weatherAPIs } from "./weather/weatherApis";

const rootReducer = {
  history: historyReducer,
  [weatherAPIs.reducerPath]: weatherAPIs.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      weatherAPIs.middleware
    ]),
});

export default store;
