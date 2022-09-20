import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import modelosService from './modelosService'


const initialState = {
    modelos: [],
    tipoPlan: [],
    modeloById: [],
    modeloStatus: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAllModelos = createAsyncThunk('modelos/All', async (thunkAPI) => {
    try {
      
      const data = await modelosService.getAllModelos()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getAllTipoPlan = createAsyncThunk('modelos/AllTipoPlan', async (thunkAPI) => {
    try {
      
      const data = await modelosService.getAllTipoPlan()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getModeloById = createAsyncThunk('modelos/Id', async (id, thunkAPI) => {
    try {
      
      const data = await modelosService.getModeloById(id)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const deleteModelos = createAsyncThunk('modelos/delete', async (id, thunkAPI) => {
    try {
      
      const data = await modelosService.deleteModelos(id)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const updateModelos = createAsyncThunk('modelos/update', async (modelosData, thunkAPI) => {
    try {
      
      const data = await modelosService.updateModelos(modelosData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const createModelos = createAsyncThunk('modelos/create', async (modeloData, thunkAPI) => {
    try {
      
      const data = await modelosService.createModelos(modeloData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const endUpdate = createAsyncThunk('endUpdate', async (ModelosData, thunkAPI) => {
    try {
      
      const data = await modelosService.endUpdate()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })


export const ModelosSlice = createSlice({
    name: 'Modelos',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.modeloById = []
        state.modeloStatus = ''
        state.tipoPlan= []       
      },
    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllModelos.pending, (state) => {
            state.isLoading = true
        })
          .addCase(getAllModelos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.modelos = action.payload
        }) 
          .addCase(getAllModelos.rejected, (state, action) => {
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
        .addCase(getModeloById.pending, (state) => {
            state.isLoading = true
        })
          .addCase(getModeloById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.modeloById = action.payload
        }) 
          .addCase(getModeloById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteModelos.pending, (state) => {
            state.isLoading = true
        })
          .addCase(deleteModelos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.modeloStatus = action.payload
        }) 
          .addCase(deleteModelos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.modeloStatus = action.payload
        })
        .addCase(updateModelos.pending, (state) => {
            state.isLoading = true
        })
          .addCase(updateModelos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.modeloStatus = action.payload
        }) 
          .addCase(updateModelos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.modeloStatus = action.payload
        })
        .addCase(createModelos.pending, (state) => {
            state.isLoading = true
        })
          .addCase(createModelos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.modeloStatus = action.payload
        }) 
          .addCase(createModelos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.modeloStatus = action.payload
        })
        .addCase(endUpdate.pending, (state) => {
          state.isLoading = true
      })
        .addCase(endUpdate.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.modeloStatus = action.payload
      }) 
        .addCase(endUpdate.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.modeloStatus = action.payload
      })
}})


export const { reset } = ModelosSlice.actions
export default ModelosSlice.reducer