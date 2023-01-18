import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { Zona } from "../../../types/ConfigDatosGenerales/Zonas/Zona";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import supervisoresService from "./supervisoresService";

interface SupervisorState extends ReduxState {
  supervisores: Supervisor[];
  supervisoresById: Supervisor | null;
  gerentes: Gerente[];
  gerentesActivos: Gerente[];
  zonas: Zona[];
  statusNuevoSupervisor: ResponseStatus | null;
}

const initialState: SupervisorState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  supervisores: [],
  supervisoresById: null,
  gerentes: [],
  gerentesActivos: [],
  zonas: [],
  statusNuevoSupervisor: null,
};

export const getSupervisores = createAsyncThunk(
  "supervisores",
  async (): Promise<Supervisor[] | ResponseStatus> => {
    const data: Supervisor[] | ResponseStatus =
      await supervisoresService.getSupervisores();
    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);

export const beginUpdate = createAsyncThunk(
  "beginUpdate",
  async (supervisorData: EndUpdateParam): Promise<ResponseStatus> => {
    try {
      const data: ResponseStatus = await supervisoresService.beginUpdate(
        supervisorData
      );

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
export const getAllGerentes = createAsyncThunk(
  "supervisores/gerentes",
  async (): Promise<Gerente[] | ResponseStatus> => {
    const data: Gerente[] | ResponseStatus =
      await supervisoresService.getAllGerentes();

    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);
export const getAllGerentesActivos = createAsyncThunk(
  "supervisores/gerentesActivos",
  async (): Promise<Gerente[] | ResponseStatus> => {
    const data: Gerente[] | ResponseStatus =
      await supervisoresService.getAllGerentes();

    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);
export const getAllZonas = createAsyncThunk<Zona[] | ResponseStatus>(
  "supervisores/zonas",
  async () => {
    const data: Zona[] | ResponseStatus =
      await supervisoresService.getAllZonas();

    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);

export const postSupervisores = createAsyncThunk(
  "postsupervisores",
  async (form: Supervisor): Promise<ResponseStatus> => {
    const data: ResponseStatus = await supervisoresService.postSupervisores(
      form
    );
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const updateSupervisores = createAsyncThunk(
  "updatesupervisores",
  async (form: Supervisor): Promise<ResponseStatus> => {
    const data: ResponseStatus = await supervisoresService.updateSupervisores(
      form
    );
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const deleteSupervisores = createAsyncThunk(
  "deletesupervisores",
  async (form: EndUpdateParam): Promise<ResponseStatus> => {
    const data: ResponseStatus = await supervisoresService.deleteSupervisores(
      form
    );
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);
export const endUpdate = createAsyncThunk(
  "endUpdate",
  async (gerentesData: EndUpdateParam): Promise<ResponseStatus> => {
    const data: ResponseStatus = await supervisoresService.endUpdate(
      gerentesData
    );

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const supervisoresSlice = createSlice({
  name: "supervisores",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    resetStatus: (state) => {
      state.statusNuevoSupervisor = null;
      state.isSuccess = false;
      state.isError = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSupervisores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSupervisores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.supervisores = action.payload as Supervisor[];
    });
    builder.addCase(getSupervisores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoSupervisor = action.error as ResponseStatus;
    });

    builder.addCase(beginUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(beginUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoSupervisor = action.payload;
    });
    builder.addCase(beginUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoSupervisor = action.error as ResponseStatus;
    });
    builder.addCase(getAllGerentes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllGerentes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.gerentes = action.payload as Gerente[];
    });
    builder.addCase(getAllGerentes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoSupervisor = action.error as ResponseStatus;
    });
    builder.addCase(getAllGerentesActivos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllGerentesActivos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.gerentesActivos = action.payload as Gerente[];
    });
    builder.addCase(getAllGerentesActivos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoSupervisor = action.error as ResponseStatus;
    });
    builder.addCase(getAllZonas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllZonas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.zonas = action.payload as Zona[];
    });
    builder.addCase(getAllZonas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoSupervisor = action.error as ResponseStatus;
    });
    builder.addCase(postSupervisores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postSupervisores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoSupervisor = action.payload;
    });
    builder.addCase(postSupervisores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoSupervisor = action.error as ResponseStatus;
    });

    builder.addCase(updateSupervisores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSupervisores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoSupervisor = action.payload;
    });
    builder.addCase(updateSupervisores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoSupervisor = action.error as ResponseStatus;
    });

    builder.addCase(deleteSupervisores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSupervisores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoSupervisor = action.payload;
    });
    builder.addCase(deleteSupervisores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoSupervisor = action.error as ResponseStatus;
    });
  },
});

export const { reset, resetStatus } = supervisoresSlice.actions;
export default supervisoresSlice.reducer;
