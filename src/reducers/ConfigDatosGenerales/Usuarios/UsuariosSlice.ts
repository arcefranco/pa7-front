import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { Rol } from "../../../types/ConfigDatosGenerales/Rol/Rol";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { TeamLeader } from "../../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { Usuario } from "../../../types/ConfigDatosGenerales/Usuarios/Usuario";
import { Vendedor } from "../../../types/ConfigDatosGenerales/Vendedor/Vendedor";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import usuariosService from "./UsuariosService";

interface UsuarioState extends ReduxState {
  usuarios: Usuario[];
  vendedores: Vendedor[];
  gerentes: Gerente[];
  supervisores: Supervisor[];
  teamLeaders: TeamLeader[];
  statusNuevoUsuario: ResponseStatus | null;
  selectedRoles: Rol[];
  userSelectedRoles: Rol[];
  commitState: string;
  rolStatus: string;
}

const initialState: UsuarioState = {
  usuarios: [],
  vendedores: [],
  gerentes: [],
  supervisores: [],
  teamLeaders: [],
  statusNuevoUsuario: null,
  selectedRoles: [],
  userSelectedRoles: [],
  commitState: "",
  rolStatus: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllUsuarios = createAsyncThunk(
  "usuarios/All",
  async (z, { rejectWithValue }) => {
    const data = await usuariosService.getAllUsuarios();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getAllVendedores = createAsyncThunk(
  "usuarios/vendedores",
  async (z, { rejectWithValue }) => {
    const data = await usuariosService.getAllVendedores();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllGerentes = createAsyncThunk(
  "usuarios/gerentes",
  async (z, { rejectWithValue }) => {
    const data = await usuariosService.getAllGerentes();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getAllSupervisores = createAsyncThunk(
  "usuarios/supervisores",
  async (z, { rejectWithValue }) => {
    const data = await usuariosService.getAllSupervisores();
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getAllTeamLeaders = createAsyncThunk(
  "usuarios/teamLeaders",
  async (z, { rejectWithValue }) => {
    const data = await usuariosService.getAllTeamLeaders();

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const createUsuario = createAsyncThunk(
  "createUsuario",
  async (usuarioData: Usuario, { rejectWithValue }) => {
    const data = await usuariosService.createUsuario(usuarioData);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const getSelectedRoles = createAsyncThunk(
  "selectedRoles",
  async (rolData: string, { rejectWithValue }) => {
    const data = await usuariosService.getSelectedRoles(rolData);

    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const getUserSelectedRoles = createAsyncThunk(
  "userSelectedRoles",
  async (user, { rejectWithValue }) => {
    const data = await usuariosService.getUserSelectedRoles(user);
    if (Array.isArray(data)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const addRol = createAsyncThunk("addRol", async (rolData, thunkAPI) => {
  try {
    const data = await usuariosService.addRol(rolData);

    return data;
  } catch (error: any) {
    (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const deleteRol = createAsyncThunk(
  "deleteRol",
  async (rolData, thunkAPI) => {
    try {
      const data = await usuariosService.deleteRol(rolData);

      return data;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const copyRoles = createAsyncThunk(
  "copyRol",
  async (usersData, thunkAPI) => {
    try {
      const data = await usuariosService.copyRoles(usersData);

      return data;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const replaceRoles = createAsyncThunk(
  "replaceRol",
  async (usersData, thunkAPI) => {
    try {
      const data = await usuariosService.replaceRoles(usersData);

      return data;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const giveMaster = createAsyncThunk(
  "giveMaster",
  async (rolData, thunkAPI) => {
    try {
      const data = await usuariosService.giveMaster(rolData);

      return data;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateUsuario = createAsyncThunk(
  "updateUsuario",
  async (usuarioData: Usuario, { rejectWithValue }) => {
    const data = await usuariosService.updateUsuario(usuarioData);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const deleteUsuario = createAsyncThunk(
  "deleteUsuario",
  async (usuarioData: { id: number }, { rejectWithValue }) => {
    const data = await usuariosService.deleteUsuario(usuarioData);

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
    const data = await usuariosService.beginUpdate(usuarioData);

    if (data.codigo) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const endUpdate = createAsyncThunk(
  "endUpdate",
  async (usuarioData: EndUpdateParam, { rejectWithValue }) => {
    const data = await usuariosService.endUpdate(usuarioData);

    if (data.status) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.supervisores = [];
      state.statusNuevoUsuario = null;
      state.rolStatus = "";
      state.commitState = "";
    },

    resetStatus: (state) => {
      state.statusNuevoUsuario = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsuarios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsuarios.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.usuarios = action.payload;
      })
      .addCase(getAllUsuarios.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(getAllVendedores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVendedores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vendedores = action.payload;
      })
      .addCase(getAllVendedores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(getAllGerentes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGerentes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gerentes = action.payload;
      })
      .addCase(getAllGerentes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(getAllSupervisores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSupervisores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.supervisores = action.payload;
      })
      .addCase(getAllSupervisores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(getAllTeamLeaders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTeamLeaders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teamLeaders = action.payload;
      })
      .addCase(getAllTeamLeaders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(createUsuario.pending, (state) => {
        state.isLoading = true;
        state.statusNuevoUsuario = null;
      })
      .addCase(createUsuario.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.statusNuevoUsuario = action.payload;
      })
      .addCase(createUsuario.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(updateUsuario.pending, (state) => {
        state.isLoading = true;
        state.statusNuevoUsuario = null;
      })
      .addCase(updateUsuario.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.statusNuevoUsuario = action.payload;
      })
      .addCase(updateUsuario.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(beginUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(beginUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.statusNuevoUsuario = action.payload;
      })
      .addCase(beginUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })

      .addCase(deleteUsuario.pending, (state) => {
        state.isLoading = true;
        state.statusNuevoUsuario = null;
      })
      .addCase(deleteUsuario.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.statusNuevoUsuario = action.payload;
      })
      .addCase(deleteUsuario.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(getSelectedRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSelectedRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedRoles = action.payload;
      })
      .addCase(getSelectedRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(getUserSelectedRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSelectedRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userSelectedRoles = action.payload;
      })
      .addCase(getUserSelectedRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusNuevoUsuario = action.payload as ResponseStatus;
      })
      .addCase(addRol.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRol.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rolStatus = action.payload;
      })
      .addCase(addRol.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.rolStatus = action.payload as string;
        state.message = action.payload as string;
      })
      .addCase(deleteRol.pending, (state) => {
        state.isLoading = true;
        state.rolStatus = "Cargando...";
      })
      .addCase(deleteRol.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rolStatus = action.payload;
      })
      .addCase(deleteRol.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.rolStatus = action.payload as string;
        state.message = action.payload as string;
      })
      .addCase(copyRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(copyRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rolStatus = action.payload;
      })
      .addCase(copyRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.rolStatus = action.payload as string;
        state.message = action.payload as string;
      })
      .addCase(replaceRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(replaceRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rolStatus = action.payload;
      })
      .addCase(replaceRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.rolStatus = action.payload as string;
        state.message = action.payload as string;
      })
      .addCase(giveMaster.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(giveMaster.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rolStatus = action.payload;
      })
      .addCase(giveMaster.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.rolStatus = action.payload as string;
        state.message = action.payload as string;
      });
  },
});

export const { reset, resetStatus } = usuariosSlice.actions;
export default usuariosSlice.reducer;
