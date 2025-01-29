import { visitors,doctors,clinics,laboratories } from "./data";
import { createSlice } from "@reduxjs/toolkit";

export const DocsauraSlice = createSlice({
    name : 'DocsAura',
    initialState : {
        visitors : visitors,
        doctors : doctors,
        clinics : clinics,
        laboratories : laboratories
    },
    reducers:{
        
    }
})