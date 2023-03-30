import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import MoraXOficialService from "./MoraXOficialService";

const initialState = {
  MoraXOficial: null,
  MoraXOficialDetalle: [],
  mes: "",
  anio: "",
  MoraStatus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getMoraXOficial = createAsyncThunk(
  "Reportes/MoraXOficial",
  async (data, { rejectWithValue }) => {
    const result = await MoraXOficialService.getMoraXOficial(data);
    if (result.hasOwnProperty("resumen") && result.hasOwnProperty("detalle")) {
      return result;
    } else {
      return rejectWithValue(result);
    }
  }
);

export const MoraXOficialSlice = createSlice({
  name: "MoraXOficial",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.MoraXOficial = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoraXOficial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.MoraXOficial = action.payload.resumen;
        state.MoraXOficialDetalle = action.payload.detalle;
        state.mes = action.payload.mes;
        state.anio = action.payload.anio;
      })
      .addCase(getMoraXOficial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.MoraStatus = action.payload;
      })
      .addCase(getMoraXOficial.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = MoraXOficialSlice.actions;
export default MoraXOficialSlice.reducer;
