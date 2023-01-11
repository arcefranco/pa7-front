import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";

import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
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
  async () => {
    const data: Gerente[] | ResponseStatus =
      await gerentesService.getGerentes();
    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);

export const deleteGerentes = createAsyncThunk(
  "deletegerentes",
  async (gerentesData: EditGerente): Promise<ResponseStatus> => {
    const data: ResponseStatus = await gerentesService.deleteGerentes(
      gerentesData
    );
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const postGerentes = createAsyncThunk(
  "postgerentes",
  async (form: Gerente): Promise<ResponseStatus> => {
    const data = await gerentesService.postGerentes(form);
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const updateGerentes = createAsyncThunk(
  "updategerentes",
  async (form: Gerente): Promise<ResponseStatus> => {
    const data = await gerentesService.updateGerentes(form);
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const endUpdate = createAsyncThunk(
  "endUpdate",
  async (gerentesData: EndUpdateParam, thunkAPI) => {
    try {
      const data = await gerentesService.endUpdate(gerentesData);
      return data;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const beginUpdate = createAsyncThunk(
  "beginUpdate",
  async (gerentesData: EndUpdateParam, thunkAPI) => {
    try {
      const data = await gerentesService.beginUpdate(gerentesData);
      return data;
    } catch (error: any) {
      throw error;
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
      state.statusNuevoGerente = action.error as ResponseStatus;
    });

    builder.addCase(beginUpdate.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(beginUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.statusNuevoGerente = action.payload;
    });
    builder.addCase(beginUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.statusNuevoGerente = action.payload as ResponseStatus;
    });

    builder.addCase(postGerentes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postGerentes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoGerente = action.payload;
    });
    builder.addCase(postGerentes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoGerente = action.error as ResponseStatus;
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
      state.statusNuevoGerente = action.error as ResponseStatus;
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
      state.statusNuevoGerente = action.error as ResponseStatus;
    });
  },
});

export const { reset, resetStatus } = gerentesSlice.actions;
export default gerentesSlice.reducer;
