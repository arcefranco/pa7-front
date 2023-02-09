import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { Solicitud } from "../../../types/Operaciones/Solicitud";
import { PreSol } from "../../../types/Operaciones/PreSol";
import actualPreService from "./actualPreService";
import { Modelo } from "../../../types/ConfigDatosGenerales/Modelo/Modelo";
import {
  OficialMora,
  OficialPlanCanje,
  OficialScoring,
} from "../../../types/ConfigDatosGenerales/Oficiales/Oficiales";
import { OrigenSuscripcion } from "../../../types/Operaciones/OrigenSuscripcion";
import { PuntosVenta } from "../../../types/Operaciones/PuntosVenta";
import { FormasPago } from "../../../types/Operaciones/FormasPago";
import { Tarjeta } from "../../../types/Operaciones/Tarjeta";
import { Interes } from "../../../types/Operaciones/Interes";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { NuevoPago } from "../../../components/Operaciones/ActualPre/NuevoPago";
import { Senia } from "../../../types/Operaciones/Senia";

interface getWithNumeroPreSol {
  codigoMarca?: string;
  Numero?: string;
}

interface actualPreState extends ReduxState {
  solicitudes: Solicitud[];
  datosOp: PreSol | null;
  senias: PreSol[];
  modelos: Modelo[];
  oficialesMora: OficialMora[];
  oficialesPC: OficialPlanCanje[];
  oficialesScoring: OficialScoring[];
  origen: OrigenSuscripcion[];
  puntos: PuntosVenta[];
  parametros: { soli: number; sanu: number } | null;
  formasPago: FormasPago[];
  tarjetas: Tarjeta[];
  intereses: Interes[];
  seniaStatus: ResponseStatus | null;
}

const initialState: actualPreState = {
  solicitudes: [],
  datosOp: null,
  senias: [],
  modelos: [],
  oficialesMora: [],
  oficialesPC: [],
  oficialesScoring: [],
  origen: [],
  puntos: [],
  parametros: null,
  formasPago: [],
  tarjetas: [],
  intereses: [],
  seniaStatus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getPreOperaciones = createAsyncThunk(
  "Operaciones/ActualPre/getPreOp",
  async (
    dataOp: {
      marca: number;
      Solicitud: string;
      Apellido: string;
      Documento: string;
    },
    { rejectWithValue }
  ) => {
    const data = await actualPreService.getPreOperaciones(dataOp);
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getDatosPreSol = createAsyncThunk(
  "Operaciones/ActualPre/getDatosOp",
  async (dataOp: getWithNumeroPreSol, { rejectWithValue }) => {
    const data: ResponseStatus | PreSol = await actualPreService.getDatosPreSol(
      dataOp
    );

    if (!Object.keys(data).hasOwnProperty("status")) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getModelos = createAsyncThunk(
  "Operaciones/ActualPre/getModelos",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getModelos();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getOficialesMora = createAsyncThunk(
  "Operaciones/ActualPre/getOficialesMora",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getOficialesMora();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getOficialesPC = createAsyncThunk(
  "Operaciones/ActualPre/getOficialesPC",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getOficialesPC();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getOficialesScoring = createAsyncThunk(
  "Operaciones/ActualPre/getOficialesScoring",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getOficialesScoring();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getOrigenSuscripcion = createAsyncThunk(
  "Operaciones/ActualPre/OrigenSuscripcion",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getOrigenSuscripcion();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getPuntosVenta = createAsyncThunk(
  "Operaciones/ActualPre/puntosVenta",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getPuntosVenta();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getParametros = createAsyncThunk(
  "Operaciones/ActualPre/parametros",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getParametros();
    if (
      data &&
      (Object.keys(data).includes("sanu") || Object.keys(data).includes("soli"))
    ) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getFormasPago = createAsyncThunk(
  "Operaciones/ActualPre/formasPago",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getFormasPago();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getTarjetas = createAsyncThunk(
  "Operaciones/ActualPre/tarjetas",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getTarjetas();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getIntereses = createAsyncThunk(
  "Operaciones/ActualPre/intereses",
  async (z, { rejectWithValue }) => {
    const data = await actualPreService.getIntereses();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const pagoSenia = createAsyncThunk(
  "Operaciones/ActualPre/pagoSenia",
  async (datos: NuevoPago, { rejectWithValue }) => {
    const data = await actualPreService.pagoSenia(datos);
    console.log(data);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const deletePago = createAsyncThunk(
  "Operaciones/ActualPre/deletePago",
  async (datos: { codigoMarca: number; ID: number }, { rejectWithValue }) => {
    const data = await actualPreService.deletePago(datos);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const updatePago = createAsyncThunk(
  "Operaciones/ActualPre/updatePago",
  async (datos: Senia, { rejectWithValue }) => {
    const data = await actualPreService.updatePago(datos);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getSenias = createAsyncThunk(
  "Operaciones/ActualPre/getSenias",
  async (datos: getWithNumeroPreSol, { rejectWithValue }) => {
    const data = await actualPreService.getSenias(datos);
    console.log(data);
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const actualPreSlice = createSlice({
  name: "actualPre",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.solicitudes = [];
      state.datosOp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPreOperaciones.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPreOperaciones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.solicitudes = action.payload;
      })
      .addCase(getPreOperaciones.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })

      .addCase(getDatosPreSol.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDatosPreSol.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.datosOp = action.payload as PreSol;
      })
      .addCase(getDatosPreSol.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getModelos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getModelos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modelos = action.payload;
      })
      .addCase(getModelos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getOficialesMora.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOficialesMora.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialesMora = action.payload;
      })
      .addCase(getOficialesMora.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getOficialesPC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOficialesPC.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialesPC = action.payload;
      })
      .addCase(getOficialesPC.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getOficialesScoring.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOficialesScoring.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialesScoring = action.payload;
      })
      .addCase(getOficialesScoring.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getOrigenSuscripcion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrigenSuscripcion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.origen = action.payload;
      })
      .addCase(getOrigenSuscripcion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getPuntosVenta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPuntosVenta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.puntos = action.payload;
      })
      .addCase(getPuntosVenta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getParametros.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getParametros.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parametros = action.payload as any;
      })
      .addCase(getParametros.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getFormasPago.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFormasPago.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.formasPago = action.payload as any;
      })
      .addCase(getFormasPago.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getTarjetas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTarjetas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tarjetas = action.payload;
      })
      .addCase(getTarjetas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getIntereses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIntereses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.intereses = action.payload;
      })
      .addCase(getIntereses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(pagoSenia.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pagoSenia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.seniaStatus = action.payload;
      })
      .addCase(pagoSenia.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(deletePago.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePago.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.seniaStatus = action.payload;
      })
      .addCase(deletePago.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })

      .addCase(updatePago.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePago.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.seniaStatus = action.payload;
      })
      .addCase(updatePago.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      })
      .addCase(getSenias.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSenias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.senias = action.payload;
      })
      .addCase(getSenias.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.seniaStatus = action.payload as ResponseStatus;
      });
  },
});

export const { reset } = actualPreSlice.actions;
export default actualPreSlice.reducer;
