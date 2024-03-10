import {configureStore} from '@reduxjs/toolkit';
import currentUserSlice from './currentUserSlice';
import houseInfoSlice from './houseInfoSlice';
import chatDataListSlice from './chatDataListSlice';
import ownHouseListSlice from './ownHouseListSlice';
import certSlice from './certSlice';
import directRegisterSlice from './directRegisterSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    houseInfo: houseInfoSlice,
    chatDataList: chatDataListSlice,
    ownHouseList: ownHouseListSlice,
    cert: certSlice,
    directRegister: directRegisterSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
