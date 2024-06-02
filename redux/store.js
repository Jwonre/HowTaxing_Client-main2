import {configureStore} from '@reduxjs/toolkit';
import currentUserSlice from './currentUserSlice';
import houseInfoSlice from './houseInfoSlice';
import chatDataListSlice from './chatDataListSlice';
import ownHouseListSlice from './ownHouseListSlice';
import certSlice from './certSlice';
import directRegisterSlice from './directRegisterSlice';
import modalListSlice from './modalListSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    houseInfo: houseInfoSlice,
    chatDataList: chatDataListSlice,
    ownHouseList: ownHouseListSlice,
    cert: certSlice,
    directRegister: directRegisterSlice,
    modalList: modalListSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
