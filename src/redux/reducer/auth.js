import {createSlice} from "@reduxjs/toolkit"
const authSlice=createSlice({
    name:"AUTH",
    initialState:{
        loading:true,
        user:null
    },

    reducers:{
        setUser:(state,{payload})=>{
            state.loading=false,
            state.user=payload
        },
        deleteUser:(state)=>{
            state.loading=false,
            state.user=null

            
        }

    }
})

export const {setUser,deleteUser}=authSlice.actions
export default authSlice