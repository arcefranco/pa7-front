import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import supervisoresService from './supervisoresService'


const initialState = {
    
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    supervisores: [],
    supervisoresById: [],
    gerentes:[],
    zonas:[],
    statusNuevoSupervisor: [],
}

export const getSupervisores = createAsyncThunk('supervisores', async (thunkAPI) => {
    try {
      const data = await supervisoresService.getSupervisores()
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  
  export const getSupervisoresById = createAsyncThunk('getsupervisoresbyid', async (supervisoresData,thunkAPI) => {
    try {
      const data = await supervisoresService.getSupervisoresById(supervisoresData)
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getAllGerentes = createAsyncThunk('supervisores/gerentes', async (thunkAPI) => {
    try {
      
      const data = await supervisoresService.getAllGerentes()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getAllZonas = createAsyncThunk('supervisores/zonas', async (thunkAPI) => {
    try {
      
      const data = await supervisoresService.getAllZonas()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

export const postSupervisores = createAsyncThunk('postsupervisores', async  (form,thunkAPI) => {
    try {
      const data = await supervisoresService.postSupervisores(form)
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

export const updateSupervisores = createAsyncThunk('updatesupervisores', async (form, thunkAPI) => {
    try {
      const data = await supervisoresService.updateSupervisores(form)
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const deleteSupervisores = createAsyncThunk('deletesupervisores', async (supervisoresData ,thunkAPI) => {
    try {
      const data = await supervisoresService.deleteSupervisores(supervisoresData)
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })



export const supervisoresSlice = createSlice({
    name: 'supervisores',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.supervisoresById =[]
        state.statusNuevoSupervisor = []
      },
    },

    extraReducers: (builder) => {
        
        builder.addCase(getSupervisores.pending, (state) => {
            state.isLoading = true
          })
        builder.addCase(getSupervisores.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.supervisores = action.payload
          }) 
        builder.addCase(getSupervisores.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.supervisores = null
          });

          builder.addCase(getSupervisoresById.pending, (state) => {
            state.isLoading = true
          })
        builder.addCase(getSupervisoresById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.supervisoresById = action.payload
          }) 
        builder.addCase(getSupervisoresById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.supervisoresById = null
          });
          builder.addCase(getAllGerentes.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(getAllGerentes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.gerentes = action.payload
          }) 
          builder.addCase(getAllGerentes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.gerentes = null
          })
          builder.addCase(getAllZonas.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(getAllZonas.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.zonas = action.payload
          }) 
          builder.addCase(getAllZonas.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.zonas = null
          })
        builder.addCase(postSupervisores.pending, (state) => {
            state.isLoading = true
            state.statusNuevoSupervisor = []
          })
        builder.addCase(postSupervisores.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoSupervisor = [action.payload]
          }) 
        builder.addCase(postSupervisores.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoSupervisor = [action.payload]
          });

        builder.addCase(updateSupervisores.pending, (state) => {
            state.isLoading = true
            state.statusNuevoSupervisor = []
          })
        builder.addCase(updateSupervisores.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoSupervisor = [action.payload]
          }) 
        builder.addCase(updateSupervisores.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoSupervisor = [action.payload]
          });
          
          builder.addCase(deleteSupervisores.pending, (state) => {
            state.isLoading = true
            state.statusNuevoSupervisor = []
          })
        builder.addCase(deleteSupervisores.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoSupervisor = [action.payload]
          }) 
        builder.addCase(deleteSupervisores.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoSupervisor = [action.payload]
            state.supervisores = null
          });  


        }
        


})

export const { reset } = supervisoresSlice.actions
export default supervisoresSlice.reducer