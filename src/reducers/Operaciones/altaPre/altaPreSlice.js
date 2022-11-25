import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'

import altaPreService from './altaPreService'



const initialState = {
    modelos: [],
    sucursales: [],
    formasPago: [],
    vendedores: [],
    puntosventa: [],
    oficialesCanje: [],
    teamleaders: [],
    supervisores: [],
    intereses: [],
    tarjetas: [],
    origen: [],
    verifyResult: '',
    verifyStatus: '',
    modeloValorCuota: '',
    modeloPrecios: [],
    solicitudesDoc: [],
    altaPreStatus: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getModelos = createAsyncThunk('Operaciones/AltaPre/modelos', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getModelos()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getSucursales = createAsyncThunk('Operaciones/AltaPre/sucursales', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getSucursales()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getFormasPago = createAsyncThunk('Operaciones/AltaPre/formaspago', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getFormasPago()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getVendedores = createAsyncThunk('Operaciones/AltaPre/vendedores', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getVendedores()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getPuntosVenta = createAsyncThunk('Operaciones/AltaPre/puntosventa', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getPuntosVenta()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getOficialCanje = createAsyncThunk('Operaciones/AltaPre/oficialcanje', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getOficialCanje()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getTeamLeaders = createAsyncThunk('Operaciones/AltaPre/teamleaders', async (thunkAPI) => {
    try {
       
      const data = await altaPreService.getTeamLeaders()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getSupervisores = createAsyncThunk('Operaciones/AltaPre/supervisores', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getSupervisores()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getIntereses = createAsyncThunk('Operaciones/AltaPre/intereses', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getIntereses()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getTarjetas = createAsyncThunk('Operaciones/AltaPre/tarjetas', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getTarjetas()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getOrigenSuscripcion = createAsyncThunk('Operaciones/AltaPre/origen', async (thunkAPI) => {
    try {
      
      const data = await altaPreService.getOrigenSuscripcion()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const verifySolicitud = createAsyncThunk('Operaciones/AltaPre/verify', async (solicitud, thunkAPI) => {
    try {
      
      const data = await altaPreService.verifySolicitud(solicitud)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const verifySolicitudStatus = createAsyncThunk('Operaciones/AltaPre/verifyStatus', async (solicitud, thunkAPI) => {
    try {
      
      const data = await altaPreService.verifySolicitudStatus(solicitud)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getModeloValorCuota = createAsyncThunk('Operaciones/AltaPre/modeloValorCuota', async (modeloData, thunkAPI) => {
    try {
      
      const data = await altaPreService.getModeloValorCuota(modeloData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getModeloPrecio = createAsyncThunk('Operaciones/AltaPre/modeloPrecio', async (modeloData, thunkAPI) => {
    try {
      
      const data = await altaPreService.getModeloPrecio(modeloData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const verifyDoc = createAsyncThunk('Operaciones/AltaPre/verifyDoc', async (documentoData, thunkAPI) => {
    try {
      
      const data = await altaPreService.verifyDoc(documentoData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const altaPre = createAsyncThunk('Operaciones/AltaPre/altaPre', async (documentoData, thunkAPI) => {
    try {
      
      const data = await altaPreService.altaPre(documentoData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })


  export const altaPreSlice = createSlice({
    name: 'altaPre',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.modelos = []
        state.sucursales = []
        state.formasPago = []
        state.vendedores = []
        state.puntosventa = []
        state.oficialesCanje = []
        state.teamleaders = []
        state.supervisores = []
        state.intereses = []
        state.tarjetas = []
        state.origen = []     
      },

      resetStatus: (state) => {
        state.altaPreStatus = []
      }
      
    },

    extraReducers: (builder) => {
        builder
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
      .addCase(getSucursales.pending, (state) => {
          state.isLoading = true
      })
      .addCase(getSucursales.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.sucursales = action.payload
      }) 
      .addCase(getSucursales.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.sucursales = action.payload
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
      .addCase(getVendedores.pending, (state) => {
        state.isLoading = true
  })
      .addCase(getVendedores.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.vendedores = action.payload
  }) 
      .addCase(getVendedores.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.vendedores = action.payload
  })

      .addCase(getPuntosVenta.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPuntosVenta.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.puntosventa = action.payload
      }) 
      .addCase(getPuntosVenta.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.puntosventa = action.payload
      })
      .addCase(getOficialCanje.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOficialCanje.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.oficialesCanje = action.payload
      }) 
      .addCase(getOficialCanje.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.oficialesCanje = action.payload
      })
      .addCase(getTeamLeaders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTeamLeaders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.teamleaders = action.payload
      }) 
      .addCase(getTeamLeaders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.teamleaders = action.payload
      })
      .addCase(getSupervisores.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSupervisores.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.supervisores = action.payload
      }) 
      .addCase(getSupervisores.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.supervisores = action.payload
      })

      .addCase(getIntereses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getIntereses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.intereses = action.payload
      }) 
      .addCase(getIntereses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.intereses = action.payload
      })

      .addCase(getTarjetas.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTarjetas.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tarjetas = action.payload
      }) 
      .addCase(getTarjetas.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.tarjetas = action.payload
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

      .addCase(verifySolicitud.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifySolicitud.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.verifyResult = action.payload
      }) 
      .addCase(verifySolicitud.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.verifyResult = action.payload
      })

      .addCase(verifySolicitudStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifySolicitudStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.verifyStatus = action.payload
      }) 
      .addCase(verifySolicitudStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.verifyStatus = action.payload
      })
      .addCase(getModeloValorCuota.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getModeloValorCuota.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.modeloValorCuota = action.payload
      }) 
      .addCase(getModeloValorCuota.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.modeloValorCuota = action.payload
      })

      .addCase(getModeloPrecio.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getModeloPrecio.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.modeloPrecios = action.payload
      }) 
      .addCase(getModeloPrecio.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.modeloPrecios = action.payload
      })

      .addCase(verifyDoc.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyDoc.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.solicitudesDoc = action.payload
      }) 
      .addCase(verifyDoc.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.solicitudesDoc = action.payload
      })
      .addCase(altaPre.pending, (state) => {
        state.isLoading = true
      })
      .addCase(altaPre.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.altaPreStatus = action.payload
      }) 
      .addCase(altaPre.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.altaPreStatus = action.payload
      })
    }
})

export const { reset, resetStatus } = altaPreSlice.actions
export default altaPreSlice.reducer