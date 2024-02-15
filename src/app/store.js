import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import templateidReducer from '../features/templateidSlice';
import templateReducer from '../features/templateSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    templateid:templateidReducer,
    data: templateReducer,

  },
});
