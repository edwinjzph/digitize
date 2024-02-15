import {  createSlice } from '@reduxjs/toolkit';





export const templateSlice = createSlice({
  name: 'data',
  initialState:{
    data: {},
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state,action) => {
     
if(state.data[action.payload.id]){
  state.data[action.payload.id] = state.data[action.payload.id] +action.payload.quantity
}else{
  state.data[action.payload.id] = action.payload.quantity
}


    },
    logout: (state) =>{
      state.data =[];
    },
    remove: (state,action) =>{
      console.log(action.payload.id,state.data[action.payload.id])
      delete state.data[action.payload.id]
    },
    decrement: (state,action) =>{
      if(state.data[action.payload.id]){
        state.data[action.payload.id] = state.data[action.payload.id] -action.payload.quantity
        if( state.data[action.payload.id] ===0){
          delete state.data[action.payload.id]

        }
      }
    }
  },

});

export const { login,logout,remove,decrement} = templateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined in line where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selecttemplate = (state) => state.data.data;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default templateSlice.reducer;
