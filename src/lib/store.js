import { configureStore } from '@reduxjs/toolkit'
import businessReducer from './store/businessSlice'

export default configureStore({
    reducer: {
        counter: businessReducer
    }
})