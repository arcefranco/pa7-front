import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import OficialesService from "./OficialesService";
import { Oficial } from "../../../types/ConfigDatosGenerales/Oficiales/Oficiales";
import { beginUpdateFunction, endUpdateFunction } from "../../updateManager";

interface oficialState extends ReduxState {
  oficialesSelected: Oficial[];
  oficialStatus: ResponseStatus | null;
  oficialCategoria: string;
  oficialById: Oficial | null;
}

export interface oficialParam {
  Codigo: number;
  categoria: string;
}

const initialState: oficialState = {
  oficialesSelected: [],
  oficialStatus: null,
  oficialCategoria: "",
  oficialById: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getOficialSelected = createAsyncThunk(
  "getOficialSelected",
  async (oficialName: { oficialName: string }, { rejectWithValue }) => {
    const data = await OficialesService.getOficialSelected(oficialName);

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const deleteOficiales = createAsyncThunk(
  "deleteOficiales",
  async (
    oficialData: { Codigo: number; oficialName: string },
    { rejectWithValue }
  ) => {
    const data = await OficialesService.deleteOficiales(oficialData);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getOficialCategoria = createAsyncThunk(
  "oficialCategoria",
  async (oficialData: string, { rejectWithValue }) => {
    const data = await OficialesService.oficialCategoria(oficialData);

    if (typeof data === "string") {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const updateOficiales = createAsyncThunk(
  "updateOficiales",
  async (oficialData: Oficial, { rejectWithValue }) => {
    const data = await OficialesService.updateOficiales(oficialData);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const createOficiales = createAsyncThunk(
  "createOficiales",
  async (oficialData: Oficial, { rejectWithValue }) => {
    const data = await OficialesService.createOficiales(oficialData);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const beginUpdate = createAsyncThunk(
  "beginUpdate",
  async (oficialData: oficialParam, { rejectWithValue }) => {
    const data = await beginUpdateFunction(
      oficialData,
      "oficiales/beginUpdate"
    );

    if (data.codigo !== null) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const endUpdate = createAsyncThunk(
  "endUpdate",
  async (oficialData: oficialParam, { rejectWithValue }) => {
    const data = await endUpdateFunction(oficialData, "oficiales/endUpdate");
    console.log(data);
    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const oficialesSlice = createSlice({
  name: "oficiales",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    resetStatus: (state) => {
      state.oficialStatus = null;
    },

    resetOficiales: (state) => {
      state.oficialesSelected = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getOficialSelected.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOficialSelected.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialesSelected = action.payload;
      })
      .addCase(getOficialSelected.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.oficialStatus = action.payload as ResponseStatus;
      })
      .addCase(deleteOficiales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOficiales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialStatus = action.payload;
      })
      .addCase(deleteOficiales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.oficialStatus = action.payload as ResponseStatus;
      })
      .addCase(getOficialCategoria.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOficialCategoria.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialCategoria = action.payload as string;
      })
      .addCase(getOficialCategoria.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.oficialStatus = action.payload as ResponseStatus;
      })

      .addCase(updateOficiales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOficiales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialStatus = action.payload;
      })
      .addCase(updateOficiales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.oficialStatus = action.payload as ResponseStatus;
      })
      .addCase(createOficiales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOficiales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialStatus = action.payload;
      })
      .addCase(createOficiales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.oficialStatus = action.payload as ResponseStatus;
      })

      .addCase(endUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(endUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialStatus = action.payload as ResponseStatus;
      })
      .addCase(endUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.oficialStatus = action.payload as ResponseStatus;
      })

      .addCase(beginUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(beginUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oficialStatus = action.payload;
      })
      .addCase(beginUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.oficialStatus = action.payload as ResponseStatus;
      });
  },
});

export const { reset, resetStatus, resetOficiales } = oficialesSlice.actions;
export default oficialesSlice.reducer;
