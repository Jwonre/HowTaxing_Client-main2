// 채팅 데이터

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const modalListSlice = createSlice({
  name: 'modalList',
  initialState,
  reducers: {
    setModalList: (state, action) => {
      state.value = action.payload;
    },
    removeLastModalList: (state) => {
      const keys = Object.keys(state.value);
      if (keys.length > 0) {
        const lastKey = keys[keys.length - 1];
        delete state.value[lastKey];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {setModalList, removeLastModalList} = modalListSlice.actions;

export default modalListSlice.reducer;
