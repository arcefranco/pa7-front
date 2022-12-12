import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import actualPreService from './actualPreService'


const initialState = {
    solicitudes: [],
    datosOp: [],
    modelos: [],
    oficialesMora: [],
    oficialesPC: [],
    oficialesScoring: [],
    origen: [],
    puntos: [],
    parametros: [],
    formasPago: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getPreOperaciones = createAsyncThunk('Operaciones/ActualPre/getPreOp', async (dataOp, thunkAPI) => {
    try {
      
      const data = await actualPreService.getPreOperaciones(dataOp)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })


  export const getDatosPreSol = createAsyncThunk('Operaciones/ActualPre/getDatosOp', async (dataOp, thunkAPI) => {
    try {
      
      const data = await actualPreService.getDatosPreSol(dataOp)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })

  export const getModelos = createAsyncThunk('Operaciones/ActualPre/getModelos', async (thunkAPI) => {
    try {
      
      const data = await actualPreService.getModelos()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })

  export const getOficialesMora = createAsyncThunk('Operaciones/ActualPre/getOficialesMora', async (thunkAPI) => {
    try {
      
      const data = await actualPreService.getOficialesMora()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })

  export const getOficialesPC = createAsyncThunk('Operaciones/ActualPre/getOficialesPC', async (thunkAPI) => {
    try {
      
      const data = await actualPreService.getOficialesPC()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })

  
  export const getOficialesScoring = createAsyncThunk('Operaciones/ActualPre/getOficialesScoring', async (thunkAPI) => {
    try {
      
      const data = await actualPreService.getOficialesScoring()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })

  export const getOrigenSuscripcion = createAsyncThunk('Operaciones/ActualPre/OrigenSuscripcion', async (thunkAPI) => {
    try {
      
      const data = await actualPreService.getOrigenSuscripcion()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })

  export const getPuntosVenta = createAsyncThunk('Operaciones/ActualPre/puntosVenta', async (thunkAPI) => {
    try {
      
      const data = await actualPreService.getPuntosVenta()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })

  
  export const getParametros = createAsyncThunk('Operaciones/ActualPre/parametros', async (thunkAPI) => {
    try {
      
      const data = await actualPreService.getParametros()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })

  export const getFormasPago = createAsyncThunk('Operaciones/ActualPre/formasPago', async (thunkAPI) => {
    try {
      
      const data = await actualPreService.getFormasPago()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }

  })



  export const actualPreSlice = createSlice({
    name: 'actualPre',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.solicitudes = []
            state.datosOp = []
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getPreOperaciones.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getPreOperaciones.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.solicitudes = action.payload
          })
          .addCase(getPreOperaciones.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.solicitudes = action.payload
          })

          .addCase(getDatosPreSol.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getDatosPreSol.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.datosOp = action.payload
          })
          .addCase(getDatosPreSol.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.datosOp = action.payload
          })
          .addCase(getModelos.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getModelos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.modelos = action.payload
          })
          .addCase(getModelos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.modelos = action.payload
          })
          .addCase(getOficialesMora.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getOficialesMora.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.oficialesMora = action.payload
          })
          .addCase(getOficialesMora.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.oficialesMora = action.payload
          })
          .addCase(getOficialesPC.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getOficialesPC.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.oficialesPC = action.payload
          })
          .addCase(getOficialesPC.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.oficialesPC = action.payload
          })
          .addCase(getOficialesScoring.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getOficialesScoring.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.oficialesScoring = action.payload
          })
          .addCase(getOficialesScoring.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.oficialesScoring = action.payload
          })
          .addCase(getOrigenSuscripcion.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getOrigenSuscripcion.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.origen = action.payload
          })
          .addCase(getOrigenSuscripcion.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.origen = action.payload
          })
          .addCase(getPuntosVenta.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getPuntosVenta.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.puntos = action.payload
          })
          .addCase(getPuntosVenta.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.puntos = action.payload
          })
          .addCase(getParametros.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getParametros.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.parametros = action.payload
          })
          .addCase(getParametros.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.parametros = action.payload
          })
          .addCase(getFormasPago.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getFormasPago.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.formasPago = action.payload
          })
          .addCase(getFormasPago.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.formasPago = action.payload
          })
    }
})

export const { reset } = actualPreSlice.actions
export default actualPreSlice.reducer
