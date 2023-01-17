import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { TipoPlan } from "../../../types/ConfigDatosGenerales/TipoPlan/TipoPlan";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import sucursalesService from "./SucursalesService";

interface SucursalState extends ReduxState {
  sucursales: Sucursal[];
  sucursalStatus: ResponseStatus | null;
  tipoPlan: TipoPlan[];
}

const initialState: SucursalState = {
  sucursales: [],
  sucursalStatus: null,
  tipoPlan: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllSucursales = createAsyncThunk(
  "sucursales/All",
  async (): Promise<Sucursal[] | ResponseStatus> => {
    const data = await sucursalesService.getAllSucursales();

    if (Array.isArray(data)) {
      return data;
    } else {
      console.log(data);
      throw data;
    }
  }
);
export const getAllTipoPlan = createAsyncThunk(
  "sucursales/AllTipoPlan",
  async (): Promise<TipoPlan[] | ResponseStatus> => {
    const data = await sucursalesService.getAllTipoPlan();

    if (Array.isArray(data)) {
      return data;
    } else {
      console.log(data);
      throw data;
    }
  }
);

export const deleteSucursal = createAsyncThunk(
  "sucursales/delete",
  async (id): Promise<ResponseStatus> => {
    const data = await sucursalesService.deleteSucursal(id);

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);
export const updateSucursal = createAsyncThunk(
  "sucursales/update",
  async (sucursalData: Sucursal, thunkAPI): Promise<ResponseStatus> => {
    const data = await sucursalesService.updateSucursal(sucursalData);

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const createSucursal = createAsyncThunk(
  "sucursales/create",
  async (sucursalData: Sucursal, thunkAPI): Promise<ResponseStatus> => {
    const data = await sucursalesService.createSucursal(sucursalData);

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);
export const endUpdate = createAsyncThunk(
  "endUpdate",
  async (sucursalData: EndUpdateParam) => {
    const data = await sucursalesService.endUpdate(sucursalData);

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const beginUpdate = createAsyncThunk(
  "beginUpdate",
  async (sucursalData: EndUpdateParam) => {
    const data = await sucursalesService.beginUpdate(sucursalData);

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const sucursalesSlice = createSlice({
  name: "sucursales",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    resetStatus: (state) => {
      state.sucursalStatus = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllSucursales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSucursales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sucursales = action.payload as Sucursal[];
      })
      .addCase(getAllSucursales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.sucursalStatus = action.error as ResponseStatus;
      })
      .addCase(getAllTipoPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTipoPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tipoPlan = action.payload as TipoPlan[];
      })
      .addCase(getAllTipoPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.sucursalStatus = action.error as ResponseStatus;
      })
      .addCase(beginUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(beginUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sucursalStatus = action.payload;
      })
      .addCase(beginUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.sucursalStatus = action.error as ResponseStatus;
      })
      .addCase(deleteSucursal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSucursal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sucursalStatus = action.payload as ResponseStatus;
      })
      .addCase(deleteSucursal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.sucursalStatus = action.error as ResponseStatus;
      })
      .addCase(updateSucursal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSucursal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sucursalStatus = action.payload as ResponseStatus;
      })
      .addCase(updateSucursal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.sucursalStatus = action.error as ResponseStatus;
      })
      .addCase(createSucursal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSucursal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sucursalStatus = action.payload as ResponseStatus;
      })
      .addCase(createSucursal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.sucursalStatus = action.error as ResponseStatus;
      });
  },
});

export const { reset, resetStatus } = sucursalesSlice.actions;
export default sucursalesSlice.reducer;
