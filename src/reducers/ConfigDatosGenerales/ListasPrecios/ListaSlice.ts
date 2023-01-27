import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import ListaService from "./ListaService";
import { Lista } from "../../../types/ConfigDatosGenerales/ListasPrecios/Lista";
import { ModeloOnLista } from "../../../types/ConfigDatosGenerales/ListasPrecios/ModeloOnLista";
import { Modelo } from "../../../types/ConfigDatosGenerales/Modelo/Modelo";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";

interface ListaInitialState extends ReduxState {
  listas: Lista[];
  modeloOnLista: ModeloOnLista[];
  modelos: Modelo[];
  listaStatus: ResponseStatus | null;
  updatedModelo: ResponseStatus | null;
  deletedModelo: ResponseStatus | null;
  createdModelo: ResponseStatus | null;
  nuevaLista: ResponseStatus | null;
  deletedLista: ResponseStatus | null;
  updatedLista: ResponseStatus | null;
}

export interface GetListaParams {
  lista?: number;
  marca?: number;
}

export interface ModeloFromListaParam {
  precio?: number;
  lista: number;
  codigoModelo: number;
}

const initialState: ListaInitialState = {
  listas: [],
  modeloOnLista: [],
  modelos: [],
  listaStatus: null,
  updatedModelo: null,
  deletedModelo: null,
  createdModelo: null,
  nuevaLista: null,
  deletedLista: null,
  updatedLista: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getListas = createAsyncThunk(
  "getListas",
  async (z, { rejectWithValue }) => {
    const data: Lista[] | ResponseStatus = await ListaService.getListas();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getModelos = createAsyncThunk(
  "getModelos",
  async (z, { rejectWithValue }) => {
    const data: Modelo[] | ResponseStatus = await ListaService.getModelos();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const modelosOnLista = createAsyncThunk(
  "modelosOnLista",
  async (listaData: GetListaParams, { rejectWithValue }) => {
    const data = await ListaService.modelosOnLista(listaData);
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const updatePrecioModelo = createAsyncThunk(
  "updatePrecioModelo",
  async (listaData: ModeloFromListaParam, { rejectWithValue }) => {
    const data = await ListaService.updatePrecioModelo(listaData);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const deleteModeloFromLista = createAsyncThunk(
  "deleteModeloFromLista",
  async (listaData: ModeloFromListaParam, { rejectWithValue }) => {
    const data = await ListaService.deleteModeloFromLista(listaData);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const insertModeloLista = createAsyncThunk(
  "insertModeloLista",
  async (listaData: Lista, { rejectWithValue }) => {
    const data = await ListaService.insertModeloLista(listaData);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const createLista = createAsyncThunk(
  "createLista",
  async (listaData: Lista, { rejectWithValue }) => {
    const data = await ListaService.createLista(listaData);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const updateLista = createAsyncThunk(
  "updateLista",
  async (listaData: Lista, { rejectWithValue }) => {
    const data = await ListaService.updateLista(listaData);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const deleteLista = createAsyncThunk(
  "deleteLista",
  async (listaData: EndUpdateParam, { rejectWithValue }) => {
    const data = await ListaService.deleteLista(listaData);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const ListaSlice = createSlice({
  name: "Listas Precios",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.modeloOnLista = [];
      state.updatedModelo = null;
      state.updatedLista = null;
    },

    resetStatus: (state) => {
      state.listaStatus = null;
      state.deletedModelo = null;
      state.updatedModelo = null;
      state.createdModelo = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getListas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listas = action.payload as Lista[];
      })
      .addCase(getListas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listaStatus = action.payload as ResponseStatus;
      })

      .addCase(modelosOnLista.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(modelosOnLista.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modeloOnLista = action.payload as ModeloOnLista[];
      })
      .addCase(modelosOnLista.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.listaStatus = action.payload as ResponseStatus;
      })
      .addCase(updatePrecioModelo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePrecioModelo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedModelo = action.payload;
      })
      .addCase(updatePrecioModelo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.listaStatus = action.payload as ResponseStatus;
      })
      .addCase(deleteModeloFromLista.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteModeloFromLista.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedModelo = action.payload;
      })
      .addCase(deleteModeloFromLista.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.listaStatus = action.payload as ResponseStatus;
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
        state.listaStatus = action.payload as ResponseStatus;
      })
      .addCase(insertModeloLista.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertModeloLista.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdModelo = action.payload;
      })
      .addCase(insertModeloLista.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.listaStatus = action.payload as ResponseStatus;
      })
      .addCase(createLista.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLista.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listaStatus = action.payload as ResponseStatus;
      })
      .addCase(createLista.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.listaStatus = action.payload as ResponseStatus;
      })

      .addCase(deleteLista.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLista.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listaStatus = action.payload as ResponseStatus;
      })
      .addCase(deleteLista.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.listaStatus = action.payload as ResponseStatus;
      })
      .addCase(updateLista.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLista.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listaStatus = action.payload;
      })
      .addCase(updateLista.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.listaStatus = action.payload as ResponseStatus;
      });
  },
});

export const { reset, resetStatus } = ListaSlice.actions;
export default ListaSlice.reducer;
