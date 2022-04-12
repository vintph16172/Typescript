import { createSlice,createAsyncThunk }  from '@reduxjs/toolkit'
import { listUsers,listUserDetail,updateUser } from '../../api/user'

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async () => {
        const { data } = await listUsers()
        return data
    }
)

export const getUserDetail = createAsyncThunk(
    "users/getUserDetail",
    async (id) => {
        const { data } = await listUserDetail(id)
        return data
    }
)

export const editUsers = createAsyncThunk(
    "users/editUsers",
    async (user) => {
        const { data } = await updateUser(user)
        return data
    }
)



const userSlice = createSlice({
    name: "users",
    initialState:{
        value: {},
        listValue: [],
        detail: {},
        selected: []
        
        
    },
    reducers:{
        changeDetail(state, action) {
            state.detail = action.payload

            // console.log(action.payload);
        },
        changeUserValue(state, action){
            state.value = action.payload
        },
        logOut(state, action){
            state.value ={}
            localStorage.removeItem('user')
        },
        onSelected(state, action) {
            state.selected = action.payload

            // console.log(action.payload);
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.listValue = action.payload
        })
        builder.addCase(getUserDetail.fulfilled,(state,action)=>{
            state.listValue = action.payload
        })
        builder.addCase(editUsers.fulfilled,(state,action)=>{
            state.listValue = state.listValue.map(item => item._id === action.payload._id ? action.payload : item)
        })

    }
})
export const { changeUserValue,logOut,onSelected,changeDetail } = userSlice.actions



export default userSlice.reducer;