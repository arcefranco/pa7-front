import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import OficialesService from './OficialesService'

const initialState = {
    oficialesSelected: [],
    oficialById: [],
    oficialStatus: '',
    oficialCategoria: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getOficialSelected = createAsyncThunk('getOficialSelected', async (oficialName, thunkAPI) => {
    try {
      
      const data = await OficialesService.getOficialSelected(oficialName)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const deleteOficiales = createAsyncThunk('deleteOficiales', async (oficialData, thunkAPI) => {
    try {
      
      const data = await OficialesService.deleteOficiales(oficialData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getOficialCategoria = createAsyncThunk('oficialCategoria', async (oficialData, thunkAPI) => {
    try {
      
      const data = await OficialesService.oficialCategoria(oficialData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

export const oficialesSlice = createSlice({
    name: 'oficiales',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.oficialById = []
        state.oficialStatus = ''       
      },
    },

    extraReducers: (builder) => {
        builder

        .addCase(getOficialSelected.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getOficialSelected.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.oficialesSelected = action.payload
        }) 
        .addCase(getOficialSelected.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.oficialesSelected = action.payload
        })
        .addCase(deleteOficiales.pending, (state) => {
          state.isLoading = true
      })
      .addCase(deleteOficiales.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.oficialStatus = action.payload
      }) 
      .addCase(deleteOficiales.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.oficialStatus = action.payload
      })
      .addCase(getOficialCategoria.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getOficialCategoria.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.oficialCategoria = action.payload
    }) 
    .addCase(getOficialCategoria.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.oficialCategoria = action.payload
    })
    }
})

export const { reset } = oficialesSlice.actions
export default oficialesSlice.reducer