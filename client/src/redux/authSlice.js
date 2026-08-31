import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", form);
      return data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", form);
      return data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Login failed"
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/me");
      return data.user;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await api.post("/auth/logout");
    return true;
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  booted: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    forceLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CURRENT USER
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.booted = true;
      })

      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.booted = true;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, forceLogout } = authSlice.actions;

export default authSlice.reducer;