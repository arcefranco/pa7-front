import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { TeamLeader } from "../../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import teamLeadersService from "./teamLeadersService";

interface TeamLeaderStatus extends ReduxState {
  teamLeaders: TeamLeader[];
  supervisores: Supervisor[];
  teamLeadersById: TeamLeader[];
  supervisoresActivos: Supervisor[];
  statusNuevoTeamLeader: ResponseStatus | null;
}

const initialState: TeamLeaderStatus = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  teamLeaders: [],
  teamLeadersById: [],
  supervisores: [],
  supervisoresActivos: [],
  statusNuevoTeamLeader: null,
};

export const getTeamLeaders = createAsyncThunk(
  "teamleaders",
  async (): Promise<TeamLeader[] | ResponseStatus> => {
    const data: TeamLeader[] | ResponseStatus =
      await teamLeadersService.getTeamLeaders();
    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);

export const beginUpdate = createAsyncThunk(
  "beginUpdate",
  async (teamLeadersData: EndUpdateParam): Promise<ResponseStatus> => {
    const data: ResponseStatus = await teamLeadersService.beginUpdate(
      teamLeadersData
    );

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);
export const getAllSupervisores = createAsyncThunk(
  "teamleaders/supervisores",
  async (): Promise<Supervisor[] | ResponseStatus> => {
    const data: Supervisor[] | ResponseStatus =
      await teamLeadersService.getAllSupervisores();

    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);
export const getAllSupervisoresActivos = createAsyncThunk(
  "teamleaders/supervisoresActivos",
  async (): Promise<Supervisor[] | ResponseStatus> => {
    const data: Supervisor[] | ResponseStatus =
      await teamLeadersService.getAllSupervisores();

    if (Array.isArray(data)) {
      return data;
    } else {
      throw data;
    }
  }
);

export const postTeamLeaders = createAsyncThunk(
  "postTeamLeaders",
  async (form: TeamLeader): Promise<ResponseStatus> => {
    const data: ResponseStatus = await teamLeadersService.postTeamLeaders(form);
    console.log("es este", data);
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const updateTeamLeaders = createAsyncThunk(
  "updateteamleaders",
  async (form: TeamLeader): Promise<ResponseStatus> => {
    const data: ResponseStatus = await teamLeadersService.updateTeamLeaders(
      form
    );
    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const deleteTeamLeaders = createAsyncThunk(
  "deleteTeamLeaders",
  async (teamLeadersData: EndUpdateParam): Promise<ResponseStatus> => {
    const data: ResponseStatus = await teamLeadersService.deleteTeamLeaders(
      teamLeadersData
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
  async (teamLeadersData: EndUpdateParam): Promise<ResponseStatus> => {
    const data: ResponseStatus = await teamLeadersService.endUpdate(
      teamLeadersData
    );

    if (data.status) {
      return data;
    } else {
      throw data;
    }
  }
);

export const teamLeadersSlice = createSlice({
  name: "teamleaders",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    resetStatus: (state) => {
      state.statusNuevoTeamLeader = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTeamLeaders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTeamLeaders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.teamLeaders = action.payload as TeamLeader[];
    });
    builder.addCase(getTeamLeaders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoTeamLeader = action.error as ResponseStatus;
    });

    builder.addCase(getAllSupervisores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSupervisores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.supervisores = action.payload as Supervisor[];
    });
    builder.addCase(getAllSupervisores.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoTeamLeader = action.error as ResponseStatus;
    });
    builder.addCase(getAllSupervisoresActivos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSupervisoresActivos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.supervisoresActivos = action.payload as Supervisor[];
    });
    builder.addCase(getAllSupervisoresActivos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoTeamLeader = action.error as ResponseStatus;
    });

    builder.addCase(postTeamLeaders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postTeamLeaders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.statusNuevoTeamLeader = action.payload;
    });
    builder.addCase(postTeamLeaders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoTeamLeader = action.error as ResponseStatus;
    });

    builder.addCase(updateTeamLeaders.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateTeamLeaders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.statusNuevoTeamLeader = action.payload;
    });
    builder.addCase(updateTeamLeaders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoTeamLeader = action.error as ResponseStatus;
    });

    builder.addCase(deleteTeamLeaders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTeamLeaders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoTeamLeader = action.payload as ResponseStatus;
    });
    builder.addCase(deleteTeamLeaders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.statusNuevoTeamLeader = action.error as ResponseStatus;
    });
    builder.addCase(beginUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(beginUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.statusNuevoTeamLeader = action.payload;
    });
    builder.addCase(beginUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.statusNuevoTeamLeader = action.error as ResponseStatus;
    });
  },
});

export const { reset, resetStatus } = teamLeadersSlice.actions;
export default teamLeadersSlice.reducer;
