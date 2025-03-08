import { createSlice } from '@reduxjs/toolkit'
import businessSchema from '@/schemas/businessSchema'

export const businessFormStepSlice = createSlice({
  name: 'businessFormStep',
  initialState: {
    stepNum: 0,
    maxStepNum: 0
  },
  reducers: {
    incrementStepNum: (state, action) => {
      state.maxStepNum = Math.max(state.stepNum + 1, state.maxStepNum)
      state.stepNum++;
    },
    setStepNum: (state, action) => {
      state.stepNum = action.payload
    }
  },
})

export const {
  incrementStepNum,
  setStepNum,
} = businessFormStepSlice.actions

export default businessFormStepSlice.reducer
