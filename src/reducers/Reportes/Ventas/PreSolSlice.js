import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import PreSolService from './PreSolService'
import groupBy from '../../../helpers/groupBy'


const initialState = {
    preSolSelected: [],
    preSolEP: [],
    preSolME: [],
    preSolDetalle: [],
    paramsDetalles: [],
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

  export const getDetalleIngresadas = createAsyncThunk('preSolDetalleIngresdas', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getDetalleIngresadas(preSolData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getDetalleMP = createAsyncThunk('preSolDetalleMP', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getDetalleMP(preSolData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getDetalleAnulRechaz = createAsyncThunk('preSolDetalleAnulRechaz', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getDetalleAnulRechaz(preSolData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getDetalleCruceScoring = createAsyncThunk('getDetalleCruceScoring', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getDetalleCruceScoring(preSolData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getDetalleProduccion = createAsyncThunk('getDetalleProduccion', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getDetalleProduccion(preSolData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getDetallePendientes= createAsyncThunk('getDetallePendientes', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getDetallePendientes(preSolData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getDetalleTresYSiete = createAsyncThunk('getDetalleTresYSiete', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getDetalleTresYSiete(preSolData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getDetalleProdYCS = createAsyncThunk('getDetalleProdYCS', async (preSolData, thunkAPI) => {
    try {
      
      const data = await PreSolService.getDetalleProdYCS(preSolData)

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
        state.preSolSelected = []
        state.preSolEP = []
        state.preSolME = []
        state.preSolDetalle = []
        state.paramsDetalles = []       
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
            state.preSolEP = groupBy(action.payload.data.filter(e => e.EsMiniEmprendedor === 0), 'NomSucursal')
            state.preSolME = groupBy(action.payload.data.filter(e => e.EsMiniEmprendedor === 1), 'NomSucursal')
            state.paramsDetalles = action.meta.arg
        }) 
          .addCase(getPreSol.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.preSolSelected = action.payload
        })
          .addCase(getDetalleIngresadas.pending, (state) => {
          state.isLoading = true
      })
          .addCase(getDetalleIngresadas.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.preSolDetalle = action.payload
      }) 
          .addCase(getDetalleIngresadas.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.preSolDetalle = action.payload
      })
          .addCase(getDetalleMP.pending, (state) => {
        state.isLoading = true
    })
          .addCase(getDetalleMP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.preSolDetalle = action.payload
    }) 
          .addCase(getDetalleMP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.preSolDetalle = action.payload
    })
      .addCase(getDetalleAnulRechaz.pending, (state) => {
      state.isLoading = true
    })
        .addCase(getDetalleAnulRechaz.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.preSolDetalle = action.payload
    }) 
        .addCase(getDetalleAnulRechaz.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.preSolDetalle = action.payload
    })
        .addCase(getDetalleCruceScoring.pending, (state) => {
        state.isLoading = true
    })
        .addCase(getDetalleCruceScoring.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.preSolDetalle = action.payload
    }) 
        .addCase(getDetalleCruceScoring.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.preSolDetalle = action.payload
    })

      .addCase(getDetalleProduccion.pending, (state) => {
      state.isLoading = true
    })
      .addCase(getDetalleProduccion.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.preSolDetalle = action.payload
    }) 
      .addCase(getDetalleProduccion.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.preSolDetalle = action.payload
    })

    .addCase(getDetallePendientes.pending, (state) => {
      state.isLoading = true
    })
      .addCase(getDetallePendientes.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.preSolDetalle = action.payload
    }) 
      .addCase(getDetallePendientes.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.preSolDetalle = action.payload
    })

    .addCase(getDetalleTresYSiete.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getDetalleTresYSiete.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.preSolDetalle = action.payload
    }) 
      .addCase(getDetalleTresYSiete.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.preSolDetalle = action.payload
    })

    .addCase(getDetalleProdYCS.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getDetalleProdYCS.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.preSolDetalle = action.payload
    }) 
      .addCase(getDetalleProdYCS.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.preSolDetalle = action.payload
    })


    }
})

export const { reset } = preSolSlice.actions
export default preSolSlice.reducer