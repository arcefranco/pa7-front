import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { Adjudicacion } from "../../../types/Operaciones/EfectividadAdj/Adjudicacion";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import efectividadAdjService from "./efectividadAdjService";
import { Oficial } from "../../../types/ConfigDatosGenerales/Oficiales/Oficiales";
interface efectividadAdjState extends ReduxState {
  adjudicaciones: Adjudicacion[];
  oficialesAdj: Oficial[];
  adjudicacionStatus: ResponseStatus | null;
}

const initialState: efectividadAdjState = {
  adjudicaciones: [],
  oficialesAdj: [],
  adjudicacionStatus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAdjudicaciones = createAsyncThunk(
  "Reportes/efectividadAdj/getAdj",
  async (
    data: {
      codigoMarca: number;
      mes: number;
      anio: number;
      oficial: number;
    },
    { rejectWithValue }
  ) => {
    const result = await efectividadAdjService.getAdjudicaciones(data);
    if (Array.isArray(result)) {
      return result;
    } else {
      return rejectWithValue(result);
    }
  }
);

export const getOficialesAdj = createAsyncThunk(
  "Reportes/efectividadAdj/getOficiales",
  async (f, { rejectWithValue }) => {
    const result = await efectividadAdjService.getOficialesAdj();
    if (Array.isArray(result)) {
      return result;
    } else {
      return rejectWithValue(result);
    }
  }
);

export const efectividadAdjSlice = createSlice({
  name: "efectividadAdj",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.adjudicaciones = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdjudicaciones.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdjudicaciones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adjudicaciones = action.payload;
      })
      .addCase(getAdjudicaciones.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.adjudicacionStatus = action.payload as ResponseStatus;
      })
      .addCase(getOficialesAdj.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOficialesAdj.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialesAdj = action.payload;
      })
      .addCase(getOficialesAdj.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.adjudicacionStatus = action.payload as ResponseStatus;
      });
  },
});

export const { reset } = efectividadAdjSlice.actions;
export default efectividadAdjSlice.reducer;
