import { configureStore } from '@reduxjs/toolkit'
import businessReducer from './store/businessSlice'
import businessFormStepReducer from './store/businessFormStepSlice'
import businessFormModalReducer from './store/businessFormModalSlice'

export default configureStore({
  reducer: {
    businessForm: businessReducer,
    businessFormStep: businessFormStepReducer,
    businessFormModal: businessFormModalReducer,
  },
})
