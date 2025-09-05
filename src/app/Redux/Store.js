import { configureStore } from "@reduxjs/toolkit";
import MenubarSlice from "./Slices/MenubarSlice"


const store = configureStore({
    reducer:{
        menubar:MenubarSlice,
    },
})

export default store;