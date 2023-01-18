import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { PuntoDeVenta } from "../../../types/ConfigDatosGenerales/PuntoDeVenta/PuntoDeVenta";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import puntosService from "./puntosService";

interface PuntoInitialState extends ReduxState {
  puntosDeVenta: PuntoDeVenta[];
  puntoStatus: ResponseStatus | null;
}

const initialState: PuntoInitialState = {
  puntosDeVenta: [],
  puntoStatus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllPuntosDeVenta = createAsyncThunk(
  "puntos/All",
  async (): Promise<PuntoDeVenta[] | ResponseStatus> => {
    const data: PuntoDeVenta[] | ResponseStatus =
      await puntosService.getAllPuntosDeVenta();
    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);
export const beginUpdate = createAsyncThunk(
  "beginUpdate",
  async (puntoData: EndUpdateParam, thunkAPI): Promise<ResponseStatus> => {
    try {
      const data: ResponseStatus = await puntosService.beginUpdate(puntoData);

      if (data.status || data.codigo !== null) {
        return data;
      } else {
        throw data;
      }
    } catch (error) {
      throw error;
    }
  }
);
export const deletePuntoDeVenta = createAsyncThunk(
  "puntos/delete",
  async (puntoData: EndUpdateParam): Promise<ResponseStatus> => {
    const data: ResponseStatus = await puntosService.deletePuntoDeVenta(
      puntoData
    );

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);
export const updatePuntoDeVenta = createAsyncThunk(
  "puntos/update",
  async (puntoData: PuntoDeVenta): Promise<ResponseStatus> => {
    const data = await puntosService.updatePuntoDeVenta(puntoData);

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const createPuntoDeVenta = createAsyncThunk(
  "puntos/create",
  async (puntoData: PuntoDeVenta): Promise<ResponseStatus> => {
    const data = await puntosService.createPuntoDeVenta(puntoData);

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const endUpdate = createAsyncThunk(
  "puntos/create",
  async (puntoData: EndUpdateParam) => {
    const data = await puntosService.endUpdate(puntoData);
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);
export const puntosSlice = createSlice({
  name: "puntosDeVenta",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    resetStatus: (state) => {
      state.puntoStatus = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPuntosDeVenta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPuntosDeVenta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.puntosDeVenta = action.payload as PuntoDeVenta[];
      })
      .addCase(getAllPuntosDeVenta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.puntoStatus = action.error as ResponseStatus;
      })
      .addCase(beginUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(beginUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.puntoStatus = action.payload;
      })
      .addCase(beginUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.puntoStatus = action.error as ResponseStatus;
      })
      .addCase(deletePuntoDeVenta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePuntoDeVenta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.puntoStatus = action.payload;
      })
      .addCase(deletePuntoDeVenta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.puntoStatus = action.error as ResponseStatus;
      })
      .addCase(updatePuntoDeVenta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePuntoDeVenta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.puntoStatus = action.payload;
      })
      .addCase(updatePuntoDeVenta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.puntoStatus = action.error as ResponseStatus;
      })
      .addCase(createPuntoDeVenta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPuntoDeVenta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.puntoStatus = action.payload;
      })
      .addCase(createPuntoDeVenta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.puntoStatus = action.error as ResponseStatus;
      });
  },
});

export const { reset, resetStatus } = puntosSlice.actions;
export default puntosSlice.reducer;
