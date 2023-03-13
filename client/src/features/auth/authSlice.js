import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register user. User dispatched from Signup component
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (err) {
    const message = (
      err.response && 
      err.response.data && 
      err.response.data.message) || 
      err.message || 
      err.toString()
    // console.log('Error', err.response.data, message)
    return thunkAPI.rejectWithValue(message); // pass in message as payload
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // reset state to initial values
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false 
        state.isSuccess = true 
        state.user = action.payload // return payload from register function line 18
      })
      .addCase(register.rejected, (state, action) => { 
        state.isLoading = false
        state.isError = true
        state.message = action.payload // payload is the message line 27
        state.user = null
      })
    }
  })

export const { reset } = authSlice.actions
export default authSlice.reducer


