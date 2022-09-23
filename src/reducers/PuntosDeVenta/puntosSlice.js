import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import puntosService from './puntosService'


const initialState = {
    puntosDeVenta: [],
    puntoById: [],
    puntoStatus: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAllPuntosDeVenta = createAsyncThunk('puntos/All', async (thunkAPI) => {
    try {
      
      const data = await puntosService.getAllPuntosDeVenta()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getPuntoById = createAsyncThunk('puntos/id', async (puntoData, thunkAPI) => {
    try {
      
      const data = await puntosService.getPuntoById(puntoData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const deletePuntoDeVenta = createAsyncThunk('puntos/delete', async (puntoData, thunkAPI) => {
    try {
      
      const data = await puntosService.deletePuntoDeVenta(puntoData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const updatePuntoDeVenta = createAsyncThunk('puntos/update', async (puntoData, thunkAPI) => {
    try {
      
      const data = await puntosService.updatePuntoDeVenta(puntoData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const createPuntoDeVenta = createAsyncThunk('puntos/create', async (puntoData, thunkAPI) => {
    try {
      
      const data = await puntosService.createPuntoDeVenta(puntoData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const endUpdate = createAsyncThunk('puntos/create', async (puntoData, thunkAPI) => {
    try {
      
      const data = await puntosService.endUpdate(puntoData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
export const puntosSlice = createSlice({
    name: 'puntosDeVenta',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.puntoById = []
        state.puntoStatus = ''       
      },
    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllPuntosDeVenta.pending, (state) => {
            state.isLoading = true
        })
          .addCase(getAllPuntosDeVenta.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.puntosDeVenta = action.payload
        }) 
          .addCase(getAllPuntosDeVenta.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getPuntoById.pending, (state) => {
          state.isLoading = true
      })
        .addCase(getPuntoById.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.puntoById = action.payload
      }) 
        .addCase(getPuntoById.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
      })
        .addCase(deletePuntoDeVenta.pending, (state) => {
          state.isLoading = true
      })
        .addCase(deletePuntoDeVenta.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.puntoStatus = action.payload
      }) 
        .addCase(deletePuntoDeVenta.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.puntoStatus = action.payload
      })
      .addCase(updatePuntoDeVenta.pending, (state) => {
        state.isLoading = true
    })
      .addCase(updatePuntoDeVenta.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.puntoStatus = action.payload
    }) 
      .addCase(updatePuntoDeVenta.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.puntoStatus = action.payload
    })
    .addCase(createPuntoDeVenta.pending, (state) => {
      state.isLoading = true
  })
    .addCase(createPuntoDeVenta.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.puntoStatus = action.payload
  }) 
    .addCase(createPuntoDeVenta.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.puntoStatus = action.payload
  })
    
    }})



export const { reset } = puntosSlice.actions
export default puntosSlice.reducer