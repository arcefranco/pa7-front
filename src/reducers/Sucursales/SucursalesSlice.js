import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import sucursalesService from './SucursalesService'


const initialState = {
    sucursales: [],
    sucursalById: [],
    sucursalStatus: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAllSucursales = createAsyncThunk('sucursales/All', async (thunkAPI) => {
    try {
      
      const data = await sucursalesService.getAllSucursales()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getSucursalById = createAsyncThunk('sucursales/Id', async (id, thunkAPI) => {
    try {
      
      const data = await sucursalesService.getSucursalById(id)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const deleteSucursal = createAsyncThunk('sucursales/delete', async (id, thunkAPI) => {
    try {
      
      const data = await sucursalesService.deleteSucursal(id)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const updateSucursal = createAsyncThunk('sucursales/update', async (sucursalData, thunkAPI) => {
    try {
      
      const data = await sucursalesService.updateSucursal(sucursalData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const createSucursal = createAsyncThunk('sucursales/create', async (sucursalData, thunkAPI) => {
    try {
      
      const data = await sucursalesService.createSucursal(sucursalData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const endCommit = createAsyncThunk('endCommit', async (usuarioData, thunkAPI) => {
    try {
      
      const data = await sucursalesService.endCommit()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })


export const sucursalesSlice = createSlice({
    name: 'sucursales',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.sucursalById = []
        state.sucursalStatus = ''       
      },
    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllSucursales.pending, (state) => {
            state.isLoading = true
        })
          .addCase(getAllSucursales.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sucursales = action.payload
        }) 
          .addCase(getAllSucursales.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getSucursalById.pending, (state) => {
            state.isLoading = true
        })
          .addCase(getSucursalById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sucursalById = action.payload
        }) 
          .addCase(getSucursalById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteSucursal.pending, (state) => {
            state.isLoading = true
        })
          .addCase(deleteSucursal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sucursalStatus = action.payload
        }) 
          .addCase(deleteSucursal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.sucursalStatus = action.payload
        })
        .addCase(updateSucursal.pending, (state) => {
            state.isLoading = true
        })
          .addCase(updateSucursal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sucursalStatus = action.payload
        }) 
          .addCase(updateSucursal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.sucursalStatus = action.payload
        })
        .addCase(createSucursal.pending, (state) => {
            state.isLoading = true
        })
          .addCase(createSucursal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sucursalStatus = action.payload
        }) 
          .addCase(createSucursal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.sucursalStatus = action.payload
        })
        .addCase(endCommit.pending, (state) => {
          state.isLoading = true
      })
        .addCase(endCommit.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.sucursalStatus = action.payload
      }) 
        .addCase(endCommit.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.sucursalStatus = action.payload
      })
}})


export const { reset } = sucursalesSlice.actions
export default sucursalesSlice.reducer