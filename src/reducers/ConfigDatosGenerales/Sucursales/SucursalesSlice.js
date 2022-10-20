import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import sucursalesService from './SucursalesService'


const initialState = {
    sucursales: [],
    sucursalStatus: '',
    tipoPlan:[],
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
  export const getAllTipoPlan = createAsyncThunk('sucursales/AllTipoPlan', async (thunkAPI) => {
    try {
      
      const data = await sucursalesService.getAllTipoPlan()

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
  export const endUpdate = createAsyncThunk('endUpdate', async (sucursalData, thunkAPI) => {
    try {
      
      const data = await sucursalesService.endUpdate(sucursalData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const beginUpdate = createAsyncThunk('beginUpdate', async (sucursalData, thunkAPI) => {
    try {
      
      const data = await sucursalesService.beginUpdate(sucursalData)

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
      },

      resetStatus: (state) => {
        state.sucursalStatus = {}
      }
      
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
        .addCase(getAllTipoPlan.pending, (state) => {
          state.isLoading = true
      })
        .addCase(getAllTipoPlan.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.tipoPlan = action.payload
      }) 
        .addCase(getAllTipoPlan.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
      })
        .addCase(beginUpdate.pending, (state) => {
            state.isLoading = true
        })
        .addCase(beginUpdate.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sucursalStatus = action.payload
        }) 
        .addCase(beginUpdate.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.sucursalStatus = action.payload
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

}})


export const { reset, resetStatus, resetSucursales } = sucursalesSlice.actions
export default sucursalesSlice.reducer