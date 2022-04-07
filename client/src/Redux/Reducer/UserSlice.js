import { createSlice } from '@reduxjs/toolkit';
import {userActions} from './Action'

const initialState = {
    current: {},
    status: "",

}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [userActions.current.pending]: (state) => {
        state.status = "loading";
      },
      [userActions.current.fulfilled]: (state, action) => {
        state.status = "success";
        state.current = action.payload.data;
      },
      [userActions.current.rejected]: (state) => {
        state.status = "failed";
      },
  }
});

export const {} = UserSlice.actions

export default UserSlice.reducer