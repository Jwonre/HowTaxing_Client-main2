// 보유주택 리스트

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const ownHouseListSlice = createSlice({
  name: 'ownHouseList',
  initialState,
  reducers: {
    setOwnHouseList: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOwnHouseList} = ownHouseListSlice.actions;

export default ownHouseListSlice.reducer;
