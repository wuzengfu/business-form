import { createSlice } from '@reduxjs/toolkit'
import { businessSchema } from "@/schemas";

export const businessSlice = createSlice({
    name: 'business',
    initialState: businessSchema,
    reducers: {
        updateBusiness: (state, action) => {
            state.business = action.payload
        },
        updateAddress: (state, action) => {
            state.address = action.payload
        },
        updateBusinessHours: (state, action) => {
            state.businessHours = action.payload
        },
        updateServices: (state, action) => {
            state.services = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {updateBusiness, updateAddress, updateBusinessHours, updateServices} = businessSlice.actions

export default businessSlice.reducer