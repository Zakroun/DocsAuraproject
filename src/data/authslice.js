import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../data/axios";

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    console.log(userData);
    try {
      const response = await axios.post("/auth/register", {
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
        gender: userData.gender,
        city: userData.city,
        birth_date: userData.birthyear,
        password: userData.password,
      });
      return response.data;
    } catch (error) {
      console.log("Laravel Error:", error.response?.data); // ← Ajoute ceci dans ton catch
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const verifyRegistrationCode = createAsyncThunk(
  "auth/verifyRegistrationCode",
  async ({ email, code }, { rejectWithValue }) => {
    console.log("[DEBUG] Starting verification with:", { email, code });
    try {
      const response = await axios.post("/auth/verify-registration", {
        email,
        code,
      });
      console.log("[DEBUG] Verification response:", response.data);
      if (!response.data?.success) {
        console.error("[DEBUG] Verification failed:", response.data);
        throw new Error(response.data?.message || "Verification failed");
      }
      return {
        token: response.data.data.access_token,
        user: response.data.data.user,
        debug: response.data.debug,
      };
    } catch (error) {
      console.error("[DEBUG] Verification error:", {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      });
      return rejectWithValue({
        message: error.response?.data?.message || "Verification failed",
        error: error.message,
        debug: error.response?.data?.debug || null,
      });
    }
  }
);

// 2. Login User Async Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Login failed");
      }
      return {
        token: response.data.data.access_token,
        user: response.data.data.user,
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Login failed",
      });
    }
  }
);
// Async thunk to handle API call for sending confirmation code
// Send Confirmation Code (updated error handling)
export const sendConfirmationCode = createAsyncThunk(
  "auth/sendConfirmationCode",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/send-code", { email });
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to send code");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to send code",
        errors: error.response?.data?.errors,
      });
    }
  }
);

// Confirm Code (updated error handling)
export const confirmCodepass = createAsyncThunk(
  "auth/confirmCodepass",
  async ({ email, code }, { rejectWithValue }) => {
    console.log("this the email : ", email, "code : ", code);
    try {
      const response = await axios.post("/auth/confirm-code", {
        email,
        code,
      });
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Invalid code");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Invalid code",
        errors: error.response?.data?.errors,
      });
    }
  }
);
// Update Password (updated error handling)
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ email, code, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/update-password", {
        email,
        code,
        password,
      });
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Password update failed");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Password update failed",
        errors: error.response?.data?.errors,
      });
    }
  }
);

// Logout (new thunk to match your route)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);
// Add this with your other async thunks
export const resendConfirmationCode = createAsyncThunk(
  "auth/resendConfirmationCode",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/resend-code", { email });
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to resend code");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to resend code",
        errors: error.response?.data?.errors,
      });
    }
  }
);
// Get user by ID from localStorage
export const fetchUserById = createAsyncThunk(
  "auth/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/auth/user/${userId}`);
      
      // Check if data exists in the expected structure
      if (!response.data.success || !response.data.data?.user) {
        throw new Error('Invalid response structure');
      }
      
      return response.data.data.user;  // Return just the user object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// 3. Initial state
const initialState = {
  user: null, // Will hold the user info when logged in or registered
  token: null, // To store the authentication token
  Login: false,
  loading: false, // To indicate loading state
  error: null, // To hold error message when login/registration fails
  successMessage: null, // To hold success message after registration
};

// 4. Create the auth slice using createSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reset the auth state (useful for clearing error messages, etc.)
    resetAuthState: (state) => {
      state.error = null;
      state.successMessage = null;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register User - Loading state
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // console.log(action.payload)
        // console.log(action.payload.data.access_token)
        // console.log(action.payload.data.user)
        state.loading = false;
        state.user = action.payload.data.user; // Assuming response contains user data
        state.successMessage = "Registration successful!";
        state.Login = true;
        state.token = action.payload.data.access_token; // Assuming response contains token
        const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000; // 24h en millisecondes
        localStorage.setItem(
          "token",
          JSON.stringify({
            value: action.payload.data.access_token,
            expiresAt,
          })
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            value: action.payload.data.user,
            expiresAt,
          })
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong during registration";
      })
      // Add this in your extraReducers builder
      .addCase(resendConfirmationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendConfirmationCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendConfirmationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login User - Loading state
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Assuming response contains user data

        state.token = action.payload.token; // Assuming response contains token
        state.Login = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(verifyRegistrationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegistrationCode.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(verifyRegistrationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        if (action.payload.errors) {
          state.validationErrors = action.payload.errors;
        }
      })
      // Send confirmation code
      .addCase(sendConfirmationCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendConfirmationCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendConfirmationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Confirm code
      .addCase(confirmCodepass.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmCodepass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(confirmCodepass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;  // Directly store the user object
      state.isAuthenticated = true;
    })
    .addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    });
  },
});

// 5. Export actions and the reducer
export const { resetAuthState, logout, setAuthToken, clearError } =
  authSlice.actions;
export default authSlice;
