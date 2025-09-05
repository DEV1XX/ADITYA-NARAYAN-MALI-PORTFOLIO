import {createSlice} from '@reduxjs/toolkit'

const MenubarSlice = createSlice({
    name:"menubar",
    initialState:{
        isMenubarOpen : false
    },
    reducers:{
        toggleMenubar : (state,action)=>{
            state.isMenubarOpen = (!state.isMenubarOpen)
        }   
    }
});

export const { toggleMenubar } =  MenubarSlice.actions;
export default MenubarSlice.reducer;