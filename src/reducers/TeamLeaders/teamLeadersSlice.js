import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import teamLeadersService from './teamLeadersService'


const initialState = {
    
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    teamLeaders: [],
    teamLeadersById: [],
    supervisores:[],
    supervisoresActivos:[],
    statusNuevoTeamLeader: [],
}

export const getTeamLeaders = createAsyncThunk('teamleaders', async (thunkAPI) => {
    try {
      const data = await teamLeadersService.getTeamLeaders()
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  
  export const beginUpdate = createAsyncThunk('beginUpdate', async (teamLeadersData, thunkAPI) => {
    try {
      
      const data = await teamLeadersService.beginUpdate(teamLeadersData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getAllSupervisores = createAsyncThunk('teamleaders/supervisores', async (thunkAPI) => {
    try {
      
      const data = await teamLeadersService.getAllSupervisores()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getAllSupervisoresActivos = createAsyncThunk('teamleaders/supervisoresActivos', async (thunkAPI) => {
    try {
      
      const data = await teamLeadersService.getAllSupervisoresActivos()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  

export const postTeamLeaders = createAsyncThunk('postTeamLeaders', async  (form,thunkAPI) => {
    try {
      const data = await teamLeadersService.postTeamLeaders(form)
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

export const updateTeamLeaders = createAsyncThunk('updateteamleaders', async (form, thunkAPI) => {
    try {
      const data = await teamLeadersService.updateTeamLeaders(form)
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const deleteTeamLeaders = createAsyncThunk('deleteTeamLeaders', async (teamLeadersData ,thunkAPI) => {
    try {
      const data = await teamLeadersService.deleteTeamLeaders(teamLeadersData)
      return data
    } catch (error) {
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const endUpdate = createAsyncThunk('endUpdate', async (teamLeadersData, thunkAPI) => {
    try {
      
      const data = await teamLeadersService.endUpdate(teamLeadersData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })



export const teamLeadersSlice = createSlice({
    name: 'teamleaders',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },

      resetStatus: (state) => {
        state.statusNuevoTeamLeader = []
      }
    },

    extraReducers: (builder) => {
        
        builder.addCase(getTeamLeaders.pending, (state) => {
            state.isLoading = true
          })
        builder.addCase(getTeamLeaders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.teamLeaders = action.payload
          }) 
        builder.addCase(getTeamLeaders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.teamLeaders = null
          });

          builder.addCase(getAllSupervisores.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(getAllSupervisores.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.supervisores = action.payload
          }) 
          builder.addCase(getAllSupervisores.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.supervisores = null
          })
          builder.addCase(getAllSupervisoresActivos.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(getAllSupervisoresActivos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.supervisoresActivos = action.payload
          }) 
          builder.addCase(getAllSupervisoresActivos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.supervisoresActivos = null
          })
         
        builder.addCase(postTeamLeaders.pending, (state) => {
            state.isLoading = true
            state.statusNuevoTeamLeader = []
          })
        builder.addCase(postTeamLeaders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoTeamLeader = action.payload
          }) 
        builder.addCase(postTeamLeaders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoTeamLeader = action.payload
          });

        builder.addCase(updateTeamLeaders.pending, (state) => {
            state.isLoading = true
            state.statusNuevoTeamLeader = []
          })
        builder.addCase(updateTeamLeaders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoTeamLeader = action.payload
          }) 
        builder.addCase(updateTeamLeaders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoTeamLeader = action.payload
          });
          
          builder.addCase(deleteTeamLeaders.pending, (state) => {
            state.isLoading = true
            state.statusNuevoTeamLeader = []
          })
        builder.addCase(deleteTeamLeaders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoTeamLeader = action.payload
          }) 
        builder.addCase(deleteTeamLeaders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoTeamLeader = action.payload
            state.teamLeaders = null
          });
          builder.addCase(beginUpdate.pending, (state) => {
            state.isLoading = true
            state.statusNuevoTeamLeader = []
          })
        builder.addCase(beginUpdate.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoTeamLeader = action.payload
          }) 
        builder.addCase(beginUpdate.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoTeamLeader = action.payload
          });  
}
        


})

export const { reset, resetStatus } = teamLeadersSlice.actions
export default teamLeadersSlice.reducer