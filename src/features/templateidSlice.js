import {  createSlice } from '@reduxjs/toolkit';





export const templateidSlice = createSlice({
  name: 'templateid',
  initialState:{
    templateid: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateid: (state,action) => {
      state.templateid=action.payload;
    },
    deleteid: (state) =>{
      state.templateid =null;
    }
  },

});

export const { updateid,deleteid} = templateidSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined in line where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selecttemplateid = (state) => state.templateid.templateid;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default templateidSlice.reducer;
