import { createSlice } from "@reduxjs/toolkit/dist";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import {
  RequestResetData,
  UpdatePassData,
  VerifyData,
} from "../../types/ForgotPassword/VerifyData";
import { LoginData } from "../../types/Login/LoginData";
import loginService from "./loginService";
import { User } from "../../types/Login/User";

const user = JSON.parse(localStorage.getItem("user") as string);
interface RecoveryMessage {
  message: string;
  username?: string;
  db?: string;
}
interface UpdateStatus {
  status?: boolean;
  message: string;
}
interface LoginInitialState {
  user: User | null;
  tokenForgot: { status: boolean };
  recoveryMessage: RecoveryMessage;
  updateStatus: UpdateStatus;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  toggle: boolean;
}

const initialState: LoginInitialState = {
  user: user ? user : null,
  tokenForgot: { status: false },
  recoveryMessage: { message: "" }, //Estado del token
  updateStatus: { message: "" }, //Info sobre si encontramos o no el usuario y le enviamos el mail
  isError: false, //El mensaje para saber si la pass se actualizo o no
  isSuccess: false,
  isLoading: false,
  message: "",
  toggle: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginData, thunkAPI) => {
    try {
      const session = await loginService.login(user);

      return session;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const verify = createAsyncThunk(
  "auth/verify",
  async (verifyData: VerifyData, thunkAPI) => {
    try {
      const session = await loginService.resetPassword(verifyData);

      return session;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const recoveryPass = createAsyncThunk(
  "auth/recovery",
  async (login: RequestResetData, thunkAPI) => {
    try {
      const session = await loginService.forgotPassowrd(login);

      return session;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePass = createAsyncThunk(
  "auth/update",
  async (userData: UpdatePassData, thunkAPI) => {
    try {
      const session = await loginService.updatePassword(userData);

      return session;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return loginService.logout();
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.user = null;
    },
    resetToken: (state) => {
      state.tokenForgot = { status: false };
      state.isSuccess = false;
    },
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    setToggleFalse: (state) => {
      state.toggle = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === "string"
            ? action.payload
            : JSON.stringify(action.payload);
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === "string"
            ? action.payload
            : JSON.stringify(action.payload);
        state.user = state.user;
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tokenForgot = action.payload;
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(recoveryPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recoveryPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recoveryMessage = action.payload;
      })
      .addCase(recoveryPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.recoveryMessage = { message: "Error, comuníquese con sistemas" };
      })
      .addCase(updatePass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateStatus = action.payload;
      })
      .addCase(updatePass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.updateStatus = { message: "Error, comuníquese con sistemas" };
      });
  },
});

export const { reset, setToggle, setToggleFalse, resetToken } =
  loginSlice.actions;
export default loginSlice.reducer;
