import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { EstructuraComercial } from "../../../types/ConfigDatosGenerales/Estructura/Estructura";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { getFunction } from "../../Axios/axiosFunctions";

interface EstructuraState extends ReduxState {
  allEstructura: EstructuraComercial[];
  estructuraActivos: EstructuraComercial[];
  estructuraStatus: ResponseStatus | null;
}

const initialState: EstructuraState = {
  allEstructura: [],
  estructuraActivos: [],
  estructuraStatus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getEstructura = createAsyncThunk(
  "estructura/All",
  async (z, { rejectWithValue }) => {
    const data = await getFunction("estructura");
    if (Array.isArray(data)) {
      return data;
    } else {
      console.log(data);
      return rejectWithValue(data);
    }
  }
);

export const puntosSlice = createSlice({
  name: "estructura",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    resetStatus: (state) => {
      state.estructuraStatus = null;
      state.isSuccess = false;
      state.isError = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getEstructura.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEstructura.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allEstructura = action.payload;
        state.estructuraActivos = action.payload.filter(
          (e) =>
            (e.ActivoGerentes === 1 && e.InactivoSucursales === 0) ||
            (null && e.InactivoVendedores === 0) ||
            (null && e.InactivoTL.data[0] === 0)
        );
      })
      .addCase(getEstructura.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.estructuraStatus = action.payload as ResponseStatus;
      });
  },
});

export const { reset, resetStatus } = puntosSlice.actions;
export default puntosSlice.reducer;
