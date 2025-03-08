import { configureStore } from '@reduxjs/toolkit'
import businessReducer from './store/businessSlice'
import businessFormStepReducer from './store/businessFormStepSlice'

export default configureStore({
  reducer: {
    businessForm: businessReducer,
    businessFormStep: businessFormStepReducer,
  },
})
