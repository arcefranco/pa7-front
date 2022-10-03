import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import ListaService from './ListaService'

const initialState = {
    listas: [],
    modeloOnLista: [],
    modelos: [],
    updatedModelo: '',
    deletedModelo: '',
    createdModelo: '',
    nuevaLista: [],
    deletedLista: '',
    updatedLista: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getListas = createAsyncThunk('getListas', async (thunkAPI) => {
    try {
      
      const data = await ListaService.getListas()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getModelos = createAsyncThunk('getModelos', async (thunkAPI) => {
    try {
      
      const data = await ListaService.getModelos()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const modelosOnLista = createAsyncThunk('modelosOnLista', async (listaData, thunkAPI) => {
    try {
      
      const data = await ListaService.modelosOnLista(listaData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const updatePrecioModelo = createAsyncThunk('updatePrecioModelo', async (listaData, thunkAPI) => {
    try {
      
      const data = await ListaService.updatePrecioModelo(listaData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const deleteModeloFromLista = createAsyncThunk('deleteModeloFromLista', async (listaData, thunkAPI) => {
    try {
      
      const data = await ListaService.deleteModeloFromLista(listaData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const insertModeloLista = createAsyncThunk('insertModeloLista', async (listaData, thunkAPI) => {
    try {
      
      const data = await ListaService.insertModeloLista(listaData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const createLista = createAsyncThunk('createLista', async (listaData, thunkAPI) => {
    try {
      
      const data = await ListaService.createLista(listaData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const updateLista = createAsyncThunk('updateLista', async (listaData, thunkAPI) => {
    try {
      
      const data = await ListaService.updateLista(listaData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const deleteLista = createAsyncThunk('deleteLista', async (listaData, thunkAPI) => {
    try {
      
      const data = await ListaService.deleteLista(listaData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })



export const ListaSlice = createSlice({
    name: 'Listas Precios',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.modeloOnLista = []
        state.updatedModelo = ''
        state.updatedLista = ' '   
      },
    },

    extraReducers: (builder) => {
        builder

    .addCase(getListas.pending, (state) => {
            state.isLoading = true
        })
    .addCase(getListas.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.listas = action.payload
        }) 
    .addCase(getListas.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

    .addCase(modelosOnLista.pending, (state) => {
            state.isLoading = true
        })
    .addCase(modelosOnLista.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.modeloOnLista = action.payload
        }) 
    .addCase(modelosOnLista.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    .addCase(updatePrecioModelo.pending, (state) => {
            state.isLoading = true
        })
    .addCase(updatePrecioModelo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.updatedModelo = action.payload
        }) 
    .addCase(updatePrecioModelo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.updatedModelo= action.payload
        })
    .addCase(deleteModeloFromLista.pending, (state) => {
            state.isLoading = true
        })
    .addCase(deleteModeloFromLista.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.deletedModelo = action.payload
        }) 
    .addCase(deleteModeloFromLista.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.deletedModelo= action.payload
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
            state.message = action.payload
        })
    .addCase(insertModeloLista.pending, (state) => {
            state.isLoading = true
        })
    .addCase(insertModeloLista.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.createdModelo = action.payload
        }) 
    .addCase(insertModeloLista.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    .addCase(createLista.pending, (state) => {
            state.isLoading = true
        })
    .addCase(createLista.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.nuevaLista = action.payload
        }) 
    .addCase(createLista.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

    .addCase(deleteLista.pending, (state) => {
            state.isLoading = true
        })
    .addCase(deleteLista.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.deletedLista = action.payload
        }) 
    .addCase(deleteLista.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.deletedLista = action.payload
        })
    .addCase(updateLista.pending, (state) => {
            state.isLoading = true
        })
    .addCase(updateLista.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.updatedLista = action.payload
        }) 
    .addCase(updateLista.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.updatedLista = action.payload
        })
    }
})

export const { reset } = ListaSlice.actions
export default ListaSlice.reducer