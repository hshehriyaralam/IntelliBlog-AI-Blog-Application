import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import type { AuthState, ReduxUser as User } from "../../../types/global";

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? Cookies.get("token") || null : null,
  loading: false,
  error: null,
};

// ✅ Thunk for Google Popup Token Flow (with correct loading control)
export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      // Ensure Google SDK is available
      if (!(window as any).google?.accounts?.oauth2) {
        throw new Error("Google SDK not loaded");
      }

      // Create a Promise that resolves only after user completes popup flow
      const data = await new Promise<any>((resolve, reject) => {
        const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          scope: "openid email profile",
          callback: async (tokenResponse: any) => {
            if (tokenResponse?.error) {
              reject(new Error(tokenResponse.error));
              return;
            }

            const accessToken = tokenResponse.access_token;
            try {
              const backendRes = await axios.post("/api/auth", { accessToken });
              resolve(backendRes.data); // { user, token }
            } catch (err: any) {
              reject(err.response?.data || err.message);
            }
          },
          error_callback: (error: any) => {
            reject(new Error(error?.type || "Google sign-in was cancelled"));
          },
        });

        // ✅ Request token popup (starts user interaction)
        tokenClient.requestAccessToken();
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      Cookies.remove("user");
      Cookies.remove("token");
    },
    setAuth(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.loading = false;
      // ✅ Save in cookies for persistence
      Cookies.set("token", action.payload.token, { expires: 7 });
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        Cookies.set("token", action.payload.token, { expires: 7 });
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;
