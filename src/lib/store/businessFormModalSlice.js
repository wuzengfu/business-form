import { createSlice } from '@reduxjs/toolkit'

export const businessFormModalSlice = createSlice({
  name: 'businessFormModal',
  initialState: {
    isSuccessModalOpen: false,
    isErrorModalOpen: false,
  },
  reducers: {
    setSuccessModalOpen: (state, action) => {
      state.isSuccessModalOpen = action.payload
    },
    setErrorModalOpen: (state, action) => {
      state.isErrorModalOpen = action.payload
    },
  },
})

export const { setSuccessModalOpen, setErrorModalOpen } =
  businessFormModalSlice.actions

export default businessFormModalSlice.reducer
