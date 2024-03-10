// 세금 계산할 주택 정보 데이터

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const houseInfoSlice = createSlice({
  name: 'houseInfo',
  initialState,
  reducers: {
    setHouseInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setHouseInfo} = houseInfoSlice.actions;

export default houseInfoSlice.reducer;
