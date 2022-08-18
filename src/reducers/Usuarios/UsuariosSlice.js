import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import usuariosService from './UsuariosService'


const initialState = {
    usuarios: [],
    vendedores: [],
    gerentes: [],
    supervisores: [],
    teamLeaders: [],
    statusNuevoUsuario: [],
    usuarioById: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAllUsuarios = createAsyncThunk('usuarios/All', async (thunkAPI) => {
    try {
      
      const data = await usuariosService.getAllUsuarios()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getAllVendedores = createAsyncThunk('usuarios/vendedores', async (thunkAPI) => {
    try {
      
      const data = await usuariosService.getAllVendedores()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getAllGerentes = createAsyncThunk('usuarios/gerentes', async (thunkAPI) => {
    try {
      
      const data = await usuariosService.getAllGerentes()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const getAllSupervisores = createAsyncThunk('usuarios/supervisores', async (thunkAPI) => {
    try {
      
      const data = await usuariosService.getAllSupervisores()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getAllTeamLeaders = createAsyncThunk('usuarios/teamLeaders', async (thunkAPI) => {
    try {
      
      const data = await usuariosService.getAllTeamLeaders()

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const createUsuario = createAsyncThunk('createUsuario', async (usuarioData, thunkAPI) => {
    try {
      
      const data = await usuariosService.createUsuario(usuarioData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const getUsuarioById = createAsyncThunk('usuarioById', async (id, thunkAPI) => {
    try {
      
      const data = await usuariosService.getUsuarioById(id)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const updateUsuario = createAsyncThunk('updateUsuario', async (usuarioData, thunkAPI) => {
    try {
      
      const data = await usuariosService.updateUsuario(usuarioData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })
  export const deleteUsuario = createAsyncThunk('deleteUsuario', async (usuarioData, thunkAPI) => {
    try {
      
      const data = await usuariosService.deleteUsuario(usuarioData)

      return data
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.statusNuevoUsuario= []
      },
    },

    extraReducers: (builder) => {
        builder
          .addCase(getAllUsuarios.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getAllUsuarios.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.usuarios = action.payload
          }) 
          .addCase(getAllUsuarios.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.usuarios = null
          })
          .addCase(getAllVendedores.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getAllVendedores.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.vendedores = action.payload
          }) 
          .addCase(getAllVendedores.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.vendedores = null
          })
          .addCase(getAllGerentes.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getAllGerentes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.gerentes = action.payload
          }) 
          .addCase(getAllGerentes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.gerentes = null
          })
          .addCase(getAllSupervisores.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getAllSupervisores.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.supervisores = action.payload
          }) 
          .addCase(getAllSupervisores.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.supervisores = null
          })
          .addCase(getAllTeamLeaders.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getAllTeamLeaders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.teamLeaders = action.payload
          }) 
          .addCase(getAllTeamLeaders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.teamLeaders = null
          })
          .addCase(createUsuario.pending, (state) => {
            state.isLoading = true
            state.statusNuevoUsuario = []
          })
          .addCase(createUsuario.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoUsuario = [action.payload]
          }) 
          .addCase(createUsuario.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            
            state.statusNuevoUsuario = [action.payload]
          })
          .addCase(updateUsuario.pending, (state) => {
            state.isLoading = true
            state.statusNuevoUsuario = []
          })
          .addCase(updateUsuario.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoUsuario = [action.payload]
          }) 
          .addCase(updateUsuario.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            
            state.statusNuevoUsuario = [action.payload]
          })
          .addCase(getUsuarioById.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getUsuarioById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.usuarioById = action.payload
          }) 
          .addCase(getUsuarioById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(deleteUsuario.pending, (state) => {
            state.isLoading = true
            state.statusNuevoUsuario = []
          })
          .addCase(deleteUsuario.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.statusNuevoUsuario = [action.payload]
          }) 
          .addCase(deleteUsuario.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            
            state.statusNuevoUsuario = [action.payload]
          })
        }


})

export const { reset } = usuariosSlice.actions
export default usuariosSlice.reducer