import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import getHeaderDB from '../../../helpers/getHeaderDB';
import axios from 'axios';
import { errorsHandling } from '../../errorsHandling';

const initialState = {
    allEstructura: [],
    estructuraActivos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getEstructura = createAsyncThunk('estructura/All', async (thunkAPI) => {
    try {
      
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'estructura', headers).catch((error) => errorsHandling(error))
    return response.data

     
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

  export const puntosSlice = createSlice({
    name: 'Estructura',
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
        .addCase(getEstructura.pending, (state) => {
            state.isLoading = true
        })
          .addCase(getEstructura.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.allEstructura = action.payload
            state.estructuraActivos = action.payload.filter(e => e.ActivoGerentes === 1 && e.InactivoSucursales === 0 || null && e.InactivoVendedores === 0 || null && e.InactivoTL.data[0] === 0)


        }) 
          .addCase(getEstructura.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    
    }})



export const { reset } = puntosSlice.actions
export default puntosSlice.reducer