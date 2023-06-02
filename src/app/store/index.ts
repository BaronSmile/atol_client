import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
});

export default store;

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
