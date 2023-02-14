import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { Modelo } from "../../../types/ConfigDatosGenerales/Modelo/Modelo";
import { Oficial } from "../../../types/ConfigDatosGenerales/Oficiales/Oficiales";
import { PuntoDeVenta } from "../../../types/ConfigDatosGenerales/PuntoDeVenta/PuntoDeVenta";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { TeamLeader } from "../../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { Vendedor } from "../../../types/ConfigDatosGenerales/Vendedor/Vendedor";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { SolicitudStatus } from "../../../types/Operaciones/AltaPre/SolicitudStatus";
import { FormasPago } from "../../../types/Operaciones/FormasPago";
import { Interes } from "../../../types/Operaciones/Interes";
import { Operacion } from "../../../types/Operaciones/Operacion";
import { OrigenSuscripcion } from "../../../types/Operaciones/OrigenSuscripcion";
import { PreSol } from "../../../types/Operaciones/PreSol";
import { Suscriptor } from "../../../types/Operaciones/Suscriptor";
import { Tarjeta } from "../../../types/Operaciones/Tarjeta";

import altaPreService from "./altaPreService";

type documentoStatus = {
  Solicitud: number;
  Empresa: string;
  Encontro: number;
};

type fechaMinimaCont = { ValorSTR: string };

interface altaPreState extends ReduxState {
  modelos: Modelo[];
  sucursales: Sucursal[];
  formasPago: FormasPago[];
  vendedores: Vendedor[];
  puntosventa: PuntoDeVenta[];
  oficialesCanje: Oficial[];
  teamleaders: TeamLeader[];
  supervisores: Supervisor[];
  intereses: Interes[];
  tarjetas: Tarjeta[];
  origen: OrigenSuscripcion[];
  fechaMinimaCont: fechaMinimaCont | null;
  verifyResult: [PreSol | null, Operacion | null];
  verifyStatus: SolicitudStatus | null;
  modeloValorCuota: { CuotaTerminal: number | null } | null;
  modeloPrecios: {
    PrecioA: { CuotaACobrar: number };
    PrecioB: { CuotaACobrar: number };
  } | null;
  solicitudesDoc: {
    docStatus: documentoStatus[];
    suscriptor: Suscriptor;
  } | null;
  altaPreStatus: ResponseStatus | null;
}

const initialState: altaPreState = {
  modelos: [],
  sucursales: [],
  formasPago: [],
  vendedores: [],
  puntosventa: [],
  oficialesCanje: [],
  teamleaders: [],
  supervisores: [],
  intereses: [],
  tarjetas: [],
  origen: [],
  fechaMinimaCont: null,
  verifyResult: [null, null],
  verifyStatus: null,
  modeloValorCuota: null,
  modeloPrecios: null,
  solicitudesDoc: null,
  altaPreStatus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getModelos = createAsyncThunk(
  "Operaciones/AltaPre/modelos",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getModelos();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getSucursales = createAsyncThunk(
  "Operaciones/AltaPre/sucursales",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getSucursales();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getFormasPago = createAsyncThunk(
  "Operaciones/AltaPre/formaspago",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getFormasPago();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getVendedores = createAsyncThunk(
  "Operaciones/AltaPre/vendedores",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getVendedores();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getPuntosVenta = createAsyncThunk(
  "Operaciones/AltaPre/puntosventa",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getPuntosVenta();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getOficialCanje = createAsyncThunk(
  "Operaciones/AltaPre/oficialcanje",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getOficialCanje();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getTeamLeaders = createAsyncThunk(
  "Operaciones/AltaPre/teamleaders",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getTeamLeaders();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getSupervisores = createAsyncThunk(
  "Operaciones/AltaPre/supervisores",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getSupervisores();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getIntereses = createAsyncThunk(
  "Operaciones/AltaPre/intereses",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getIntereses();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getTarjetas = createAsyncThunk(
  "Operaciones/AltaPre/tarjetas",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getTarjetas();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getOrigenSuscripcion = createAsyncThunk(
  "Operaciones/AltaPre/origen",
  async (z, { rejectWithValue }) => {
    const data = await altaPreService.getOrigenSuscripcion();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getFechaMinimaCont = createAsyncThunk(
  "Operaciones/AltaPre/fechaCont",
  async (marca: { marca: number }, { rejectWithValue }) => {
    const data = await altaPreService.getFechaMinimaCont(marca);

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const verifySolicitud = createAsyncThunk(
  "Operaciones/AltaPre/verify",
  async (solicitud: { solicitud: number }, { rejectWithValue }) => {
    const data = await altaPreService.verifySolicitud(solicitud);

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const verifySolicitudStatus = createAsyncThunk(
  "Operaciones/AltaPre/verifyStatus",
  async (
    solicitud: { solicitud: number; codMarca: number },
    { rejectWithValue }
  ) => {
    const data = await altaPreService.verifySolicitudStatus(solicitud);

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getModeloValorCuota = createAsyncThunk(
  "Operaciones/AltaPre/modeloValorCuota",
  async (
    modeloData: { codMarca: number; modelo: number; tipoPlan: string },
    { rejectWithValue }
  ) => {
    const data = await altaPreService.getModeloValorCuota(modeloData);

    if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      data.hasOwnProperty("CuotaTerminal")
    ) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getModeloPrecio = createAsyncThunk(
  "Operaciones/AltaPre/modeloPrecio",
  async (
    modeloData: { codMarca: number; modelo: number; tipoPlan: string },
    { rejectWithValue }
  ) => {
    const data = await altaPreService.getModeloPrecio(modeloData);

    if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      data.hasOwnProperty("PrecioA") &&
      data.hasOwnProperty("PrecioB")
    ) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const verifyDoc = createAsyncThunk(
  "Operaciones/AltaPre/verifyDoc",
  async (
    documentoData: { documento: number; documentoNro: number },
    { rejectWithValue }
  ) => {
    const data = await altaPreService.verifyDoc(documentoData);

    if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      data.hasOwnProperty("docStatus") &&
      data.hasOwnProperty("suscriptor")
    ) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const altaPre = createAsyncThunk(
  "Operaciones/AltaPre/altaPre",
  async (documentoData: PreSol, { rejectWithValue }) => {
    const data = await altaPreService.altaPre(documentoData);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const altaPreSlice = createSlice({
  name: "altaPre",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.modelos = [];
      state.sucursales = [];
      state.formasPago = [];
      state.vendedores = [];
      state.puntosventa = [];
      state.oficialesCanje = [];
      state.teamleaders = [];
      state.supervisores = [];
      state.intereses = [];
      state.tarjetas = [];
      state.origen = [];
      state.fechaMinimaCont = null;
    },

    resetStatus: (state) => {
      state.altaPreStatus = null;
    },
  },

  extraReducers: (builder) => {
    builder
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
        state.altaPreStatus = action.payload as ResponseStatus;
      })
      .addCase(getSucursales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSucursales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sucursales = action.payload;
      })
      .addCase(getSucursales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })
      .addCase(getFormasPago.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFormasPago.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.formasPago = action.payload;
      })
      .addCase(getFormasPago.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })
      .addCase(getVendedores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVendedores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vendedores = action.payload;
      })
      .addCase(getVendedores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })

      .addCase(getPuntosVenta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPuntosVenta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.puntosventa = action.payload;
      })
      .addCase(getPuntosVenta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })
      .addCase(getOficialCanje.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOficialCanje.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialesCanje = action.payload;
      })
      .addCase(getOficialCanje.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })
      .addCase(getTeamLeaders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeamLeaders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teamleaders = action.payload;
      })
      .addCase(getTeamLeaders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })
      .addCase(getSupervisores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupervisores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.supervisores = action.payload;
      })
      .addCase(getSupervisores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
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
        state.altaPreStatus = action.payload as ResponseStatus;
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
        state.altaPreStatus = action.payload as ResponseStatus;
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
        state.altaPreStatus = action.payload as ResponseStatus;
      })

      .addCase(getFechaMinimaCont.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFechaMinimaCont.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fechaMinimaCont = action.payload as any;
      })
      .addCase(getFechaMinimaCont.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })

      .addCase(verifySolicitud.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifySolicitud.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.verifyResult = action.payload as any;
      })
      .addCase(verifySolicitud.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })

      .addCase(verifySolicitudStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifySolicitudStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.verifyStatus = action.payload as any;
      })
      .addCase(verifySolicitudStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })
      .addCase(getModeloValorCuota.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getModeloValorCuota.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modeloValorCuota = action.payload;
      })
      .addCase(getModeloValorCuota.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })

      .addCase(getModeloPrecio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getModeloPrecio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modeloPrecios = action.payload;
      })
      .addCase(getModeloPrecio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })

      .addCase(verifyDoc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.solicitudesDoc = action.payload;
      })
      .addCase(verifyDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      })
      .addCase(altaPre.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(altaPre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.altaPreStatus = action.payload;
      })
      .addCase(altaPre.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.altaPreStatus = action.payload as ResponseStatus;
      });
  },
});

export const { reset, resetStatus } = altaPreSlice.actions;
export default altaPreSlice.reducer;
