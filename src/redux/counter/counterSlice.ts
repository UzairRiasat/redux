import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { stat } from "fs";
import { IncrementalCache } from "next/dist/server/lib/incremental-cache";
import { resolve } from "path";

interface counterState {
    value:number
    status:string
}

const initialState : counterState = {
    value : 0,
    status:"idle"
}

export const counterslice = createSlice ({
    name :'counter',
    initialState,
    reducers:{
         Increment:(state)=>{
           state.value+=1
         },
         decrement:(state)=>{
            state.value-=1
         },
         reset:(state)=>{
            state.value=0
         },
         addVal:(state, action:PayloadAction<number>)=>{
            //what ever action is generated in that input will be provided to the state previous value
            //in this case it will add
            //we will give input value as a payload in button
          state.value = state.value + action.payload
         },
         decVal:(state, action:PayloadAction<number>)=>{
            state.value = state.value - action.payload 
         }
    },
    //when ever add extra reducers add builder
    //promises have states like pending, fulfilled, rejected
    //in this case we use state so when promise is fulfilled continue further
    
    extraReducers:(builder)=>{
        builder
        .addCase(addAsync.fulfilled,(state , action:PayloadAction<number>)=>{
            state.value = state.value + action.payload
            state.status = 'fulfilled'
        })
        //you can add pending actions aswell
        .addCase(addAsync.pending,(state)=>{
            state.status = 'pending'
        })
    }
});

//for async
//createAsyncThunk = Thunk is a redux middleware
//middleware = it is used to dispatch value further , it is like a post man 


export const addAsync = createAsyncThunk(
    //createAsyncThunk takes two arguments
    //counter is from counterslice name
    'counter / addAsync',
    async(amount:number)=>{
        await new Promise ((resolve)=>setTimeout(resolve,2000))
      return amount;
    }
)


//reducer -default export
export default counterslice.reducer

//action creator - named export
export const {Increment , decrement, reset, addVal , decVal} = counterslice.actions