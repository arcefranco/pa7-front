import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import getHeaderDB from "../../../helpers/getHeaderDB";
import axios from "axios";
import { errorsHandling } from "../../errorsHandling";

const initialState = {
  reporteSelected: [],
  reporteDetalle: [],
  reporteZonal: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getReporte = createAsyncThunk(
  "micro/reporteZonal",
  async (data, { rejectWithValue }) => {
    const headers = getHeaderDB();
    const result = await axios.post(
      process.env.REACT_APP_HOST + "Reportes/Micro/Zonal",
      data,
      headers
    );

    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      return rejectWithValue(result.data);
    }
  }
);

export const reporteZonaSlice = createSlice({
  name: "Reporte Zonal",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.reporteSelected = [];
      state.reporteDetalle = [];
      state.reporteZonal = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getReporte.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReporte.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reporteSelected = Object.values(action.payload[0]);
        /*         state.reporteZonal = Object.values(action.payload[1]); */
        state.reporteDetalle = Object.values(action.payload[1]);
      })
      .addCase(getReporte.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.reporteSelected = action.payload;
      });
  },
});

export const { reset } = reporteZonaSlice.actions;
export default reporteZonaSlice.reducer;
