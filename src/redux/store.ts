import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '@/redux/counter/counterSlice' //this import is from counterslice.reducer it is default export so name doesnot matter 


//argument inside configstore is an object
export const reduxStore = configureStore({
    reducer:{
        //counter is the name of reducer increment 
        counter : counterReducer
        //we can add more reducers here if created in counterslice reducer
        
    }
})
//returntype is a type in ts 
//in this case returntype will use the type returned by store
//getstate is a redux fuction that gets the state
//get state will get the state type of reduxStore and with ReturnType provide the state to RootState 
//Making this type is helpfull because no matter how many states we make in store their return type will be assigned to rootstate
export type RootState = ReturnType<typeof reduxStore.getState>

//Dispatch type
//making dispatch type
export type RootDispatch = typeof reduxStore.dispatch