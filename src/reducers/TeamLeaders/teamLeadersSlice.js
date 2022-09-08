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
  
  export const getTeamLeadersById = createAsyncThunk('getteamleadersbyid', async (teamLeadersData,thunkAPI) => {
    try {
      const data = await teamLeadersService.getTeamLeadersById(teamLeadersData)
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



export const teamLeadersSlice = createSlice({
    name: 'teamleaders',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.teamLeadersById =[]
        state.statusNuevoTeamLeader = []
      },
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

          builder.addCase(getTeamLeadersById.pending, (state) => {
            state.isLoading = true
          })
        builder.addCase(getTeamLeadersById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.teamLeadersById = action.payload
          }) 
        builder.addCase(getTeamLeadersById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.teamLeadersById = null
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
         
        builder.addCase(postTeamLeaders.pending, (state) => {
            state.isLoading = true
            state.statusNuevoTeamLeader = []
          })
        builder.addCase(postTeamLeaders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoTeamLeader = [action.payload]
          }) 
        builder.addCase(postTeamLeaders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoTeamLeader = [action.payload]
          });

        builder.addCase(updateTeamLeaders.pending, (state) => {
            state.isLoading = true
            state.statusNuevoTeamLeader = []
          })
        builder.addCase(updateTeamLeaders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoTeamLeader = [action.payload]
          }) 
        builder.addCase(updateTeamLeaders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoTeamLeader = [action.payload]
          });
          
          builder.addCase(deleteTeamLeaders.pending, (state) => {
            state.isLoading = true
            state.statusNuevoTeamLeader = []
          })
        builder.addCase(deleteTeamLeaders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoTeamLeader = [action.payload]
          }) 
        builder.addCase(deleteTeamLeaders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.statusNuevoTeamLeader = [action.payload]
            state.teamLeaders = null
          });  


        }
        


})

export const { reset } = teamLeadersSlice.actions
export default teamLeadersSlice.reducer