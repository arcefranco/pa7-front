import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import PreSolService from './PreSolService'


const initialState = {
    preSolSelected: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const getPreSol = createAsyncThunk('preSolSelected', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getPreSol(preSolData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })



  export const preSolSlice = createSlice({
    name: 'Pre-Sol',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''       
      },
      
    },

    extraReducers: (builder) => {
        builder
        .addCase(getPreSol.pending, (state) => {
            state.isLoading = true
        })
          .addCase(getPreSol.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.preSolSelected = action.payload
        }) 
          .addCase(getPreSol.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.preSolSelected = action.payload
        })

    }
})

export const { reset } = preSolSlice.actions
export default preSolSlice.reducer