import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { AxiosResponse } from "axios";
import {
  OficialMora,
  OficialScoring,
} from "../../types/ConfigDatosGenerales/Oficiales/Oficiales";
import { TeamLeader } from "../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { Escala } from "../../types/ConfigDatosGenerales/Vendedor/Escala";
import { Vendedor } from "../../types/ConfigDatosGenerales/Vendedor/Vendedor";
import { ResponseStatus } from "../../types/Generales/ResponseStatus";
import vendedoresService from "./vendedoresService";
import { beginUpdateFunction, endUpdateFunction } from "../updateManager";

interface VendedorState extends ReduxState {
  vendedores: Vendedor[];
  vendedoresById: Vendedor | null;
  teamleader: TeamLeader[];
  teamleaderActivo: TeamLeader[];
  escalas: Escala[];
  oficialesScoring: OficialScoring[];
  oficialesMora: OficialMora[];
  oficialesScoringActivos: OficialScoring[];
  oficialesMoraActivos: OficialMora[];
  statusNuevoVendedor: ResponseStatus | null;
}

const initialState: VendedorState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  vendedores: [],
  vendedoresById: null,
  teamleader: [],
  teamleaderActivo: [],
  escalas: [],
  oficialesScoring: [],
  oficialesMora: [],
  oficialesScoringActivos: [],
  oficialesMoraActivos: [],
  statusNuevoVendedor: null,
};

export const getVendedores = createAsyncThunk(
  "vendedores",
  async (z, { rejectWithValue }) => {
    const data: Vendedor[] | ResponseStatus =
      await vendedoresService.getVendedores();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const endUpdate = createAsyncThunk(
  "endUpdate",
  async (usuarioData: EndUpdateParam, { rejectWithValue }) => {
    const data: ResponseStatus = await endUpdateFunction(
      usuarioData,
      "vendedores/endUpdate"
    );
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const beginUpdate = createAsyncThunk(
  "beginUpdate",
  async (usuarioData: EndUpdateParam, { rejectWithValue }) => {
    const data: ResponseStatus = await beginUpdateFunction(
      usuarioData,
      "vendedores/beginUpdate"
    );
    if (data.codigo) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllEscalas = createAsyncThunk(
  "vendedores/escalas",
  async (z, { rejectWithValue }) => {
    const data: Escala[] | ResponseStatus =
      await vendedoresService.getAllEscalas();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllTeamLeaders = createAsyncThunk(
  "vendedores/teamleader",
  async (z, { rejectWithValue }) => {
    const data = await vendedoresService.getAllTeamLeaders();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllTeamLeadersActivos = createAsyncThunk(
  "vendedores/teamleadersActivos",
  async (z, { rejectWithValue }) => {
    const data = await vendedoresService.getAllTeamLeadersActivos();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllOficialesScoring = createAsyncThunk(
  "vendedores/ofcialesScoring",
  async (z, { rejectWithValue }) => {
    const data = await vendedoresService.getAllOficialesScoring();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllOficialesMora = createAsyncThunk(
  "vendedores/oficialesMora",
  async (z, { rejectWithValue }) => {
    const data: OficialMora[] | ResponseStatus =
      await vendedoresService.getAllOficialesMora();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllOficialesScoringActivos = createAsyncThunk(
  "vendedores/ofcialesScoringActivos",
  async (z, { rejectWithValue }) => {
    const data = await vendedoresService.getAllOficialesScoringActivos();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllOficialesMoraActivos = createAsyncThunk(
  "vendedores/oficialesMoraActivos",
  async (z, { rejectWithValue }) => {
    const data = await vendedoresService.getAllOficialesMoraActivos();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const postVendedores = createAsyncThunk(
  "postvendedores",
  async (form: Vendedor, { rejectWithValue }) => {
    const data: ResponseStatus = await vendedoresService.postVendedores(form);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const updateVendedores = createAsyncThunk(
  "updatevendedores",
  async (form: Vendedor, { rejectWithValue }) => {
    const data: ResponseStatus = await vendedoresService.updateVendedores(form);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const deleteVendedores = createAsyncThunk(
  "deletevendedores",
  async (vendedoresData: EndUpdateParam, { rejectWithValue }) => {
    const data = await vendedoresService.deleteVendedores(vendedoresData);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const vendedoresSlice = createSlice({
  name: "vendedores",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    resetStatus: (state) => {
      state.statusNuevoVendedor = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getVendedores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVendedores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.vendedores = action.payload as Vendedor[];
    });
    builder.addCase(getVendedores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });

    builder.addCase(beginUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(beginUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoVendedor = action.payload;
    });
    builder.addCase(beginUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(endUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(endUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(endUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(getAllTeamLeaders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTeamLeaders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.teamleader = action.payload as TeamLeader[];
    });
    builder.addCase(getAllTeamLeaders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(getAllTeamLeadersActivos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTeamLeadersActivos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.teamleaderActivo = action.payload as TeamLeader[];
    });
    builder.addCase(getAllTeamLeadersActivos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(getAllEscalas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllEscalas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.escalas = action.payload as Escala[];
    });
    builder.addCase(getAllEscalas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(getAllOficialesScoring.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOficialesScoring.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.oficialesScoring = action.payload as OficialScoring[];
    });
    builder.addCase(getAllOficialesScoring.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(getAllOficialesMora.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOficialesMora.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.oficialesMora = action.payload as OficialMora[];
    });
    builder.addCase(getAllOficialesMora.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(getAllOficialesScoringActivos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllOficialesScoringActivos.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialesScoringActivos = action.payload as OficialScoring[];
      }
    );
    builder.addCase(getAllOficialesScoringActivos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(getAllOficialesMoraActivos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOficialesMoraActivos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.oficialesMoraActivos = action.payload as OficialMora[];
    });
    builder.addCase(getAllOficialesMoraActivos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(postVendedores.pending, (state) => {
      state.isLoading = true;
      state.statusNuevoVendedor = null;
    });
    builder.addCase(postVendedores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(postVendedores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });

    builder.addCase(updateVendedores.pending, (state) => {
      state.isLoading = true;
      state.statusNuevoVendedor = null;
    });
    builder.addCase(updateVendedores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
    builder.addCase(updateVendedores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });

    builder.addCase(deleteVendedores.pending, (state) => {
      state.isLoading = true;
      state.statusNuevoVendedor = null;
    });
    builder.addCase(deleteVendedores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoVendedor = action.payload;
    });
    builder.addCase(deleteVendedores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoVendedor = action.payload as ResponseStatus;
    });
  },
});

export const { reset, resetStatus } = vendedoresSlice.actions;
export default vendedoresSlice.reducer;
