import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";

import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { beginUpdateFunction, endUpdateFunction } from "../../updateManager";
import gerentesService from "./gerentesService";

interface GerentesInitialState extends ReduxState {
  gerentes: Gerente[];
  gerentesById: Gerente | null;
  statusNuevoGerente: ResponseStatus | null;
}

const initialState: GerentesInitialState = {
  gerentes: [],
  gerentesById: null,
  statusNuevoGerente: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getGerentes = createAsyncThunk<Gerente[] | ResponseStatus>(
  "gerentes",
  async (z, { rejectWithValue }) => {
    const data: Gerente[] | ResponseStatus =
      await gerentesService.getGerentes();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const deleteGerentes = createAsyncThunk(
  "deletegerentes",
  async (gerentesData: EndUpdateParam, { rejectWithValue }) => {
    const data: ResponseStatus = await gerentesService.deleteGerentes(
      gerentesData
    );
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const postGerentes = createAsyncThunk(
  "postgerentes",
  async (form: Gerente, { rejectWithValue }) => {
    const data = await gerentesService.postGerentes(form);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const updateGerentes = createAsyncThunk(
  "updategerentes",
  async (form: Gerente, { rejectWithValue }) => {
    const data = await gerentesService.updateGerentes(form);
    if (data.status) {
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
      "gerentes/endUpdate"
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
  async (gerentesData: EndUpdateParam, { rejectWithValue }) => {
    const data: ResponseStatus = await beginUpdateFunction(
      gerentesData,
      "gerentes/beginUpdate"
    );
    if (data.codigo) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const gerentesSlice = createSlice({
  name: "gerentes",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    resetStatus: (state) => {
      state.statusNuevoGerente = null;
      state.isSuccess = false;
      state.isError = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getGerentes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGerentes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.gerentes = action.payload as Gerente[];
    });
    builder.addCase(getGerentes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });

    builder.addCase(beginUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(beginUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });
    builder.addCase(beginUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });

    builder.addCase(endUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(endUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });
    builder.addCase(endUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });

    builder.addCase(postGerentes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postGerentes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });
    builder.addCase(postGerentes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });

    builder.addCase(updateGerentes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateGerentes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoGerente = action.payload;
    });
    builder.addCase(updateGerentes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });

    builder.addCase(deleteGerentes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteGerentes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoGerente = action.payload;
    });
    builder.addCase(deleteGerentes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });
  },
});

export const { reset, resetStatus } = gerentesSlice.actions;
export default gerentesSlice.reducer;
