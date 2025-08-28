import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: "",
    type: ""
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.type = action.payload.type;
    },
    deleteUser: (state) => {
      state.name = "";
      state.type = "";
    }
  },
})

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;