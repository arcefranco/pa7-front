import { createSlice } from '@reduxjs/toolkit/dist'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import getHeaderDB from '../../../helpers/getHeaderDB'
import axios from 'axios'
import { errorsHandling } from '../../errorsHandling'


const initialState = {
    reporteSelected: [],
    reporteZonal: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const getReporte = createAsyncThunk('micro/reporteZonal', async (reporteData ,thunkAPI) => {
    try {
      
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Micro/Zonal', reporteData, headers).catch((error) => errorsHandling(error))
    return response.data

     
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })




  export const reporteZonaSlice = createSlice({
    name: 'Reporte Zonal',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''       
      },
      
    },

    extraReducers: (builder) => {
        builder
        .addCase(getReporte.pending, (state) => {
            state.isLoading = true
        })
          .addCase(getReporte.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reporteSelected = action.payload
            state.reporteZonal = action.payload.data[0]
            
        }) 
          .addCase(getReporte.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.reporteSelected = action.payload
        })
    }
})

export const { reset } = reporteZonaSlice.actions
export default reporteZonaSlice.reducer

