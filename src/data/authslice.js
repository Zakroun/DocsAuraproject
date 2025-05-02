import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// 1. Register User Async Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch("/api/register", {
        // Replace with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data; // Return the response data (user or success message)
    } catch (error) {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);

// 2. Login User Async Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch("/api/login", {
        // Replace with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data; // Return the response data (user and token)
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);
// Async thunk for confirming the code and getting the token
export const confirmCode = createAsyncThunk(
  "auth/confirmCode",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/confirm-code", { code }); // Replace with actual endpoint
      if (response.data.token) {
        return response.data.token; // Return the token
      } else {
        return rejectWithValue("Invalid confirmation code.");
      }
    } catch (err) {
      return rejectWithValue("An error occurred. Please try again later.");
    }
  }
);
// Async thunk to handle API call for sending confirmation code
export const sendConfirmationCode = createAsyncThunk(
  "auth/sendConfirmationCode",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/send-code", { email });
      return response.data; // assuming the API returns a success message
    } catch (error) {
      return rejectWithValue(error.response.data); // return error message from the API
    }
  }
);

// Async thunk to handle API call for confirming the code
export const confirmCodepass = createAsyncThunk(
  "auth/confirmCode",
  async ({ code, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/confirm-code", { code, email });
      return response.data; // assuming the API returns a success message
    } catch (error) {
      return rejectWithValue(error.response.data); // return error message from the API
    }
  }
);

// Async thunk to handle API call for updating the password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ newPassword, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/update-password", {
        newPassword,
        email,
      });
      return response.data; // assuming the API returns a success message
    } catch (error) {
      return rejectWithValue(error.response.data); // return error message from the API
    }
  }
);

// 3. Initial state
const initialState = {
  user: null, // Will hold the user info when logged in or registered
  token: null, // To store the authentication token
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
        state.loading = false;
        state.user = action.payload.user; // Assuming response contains user data
        state.successMessage = "Registration successful!";
        state.token = action.payload.token; // Assuming response contains token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong during registration";
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(confirmCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmCode.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Store token in state
      })
      .addCase(confirmCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
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
    //   .addCase(confirmCodepass.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(confirmCodepass.fulfilled, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(confirmCodepass.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
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
      });
  },
});

// 5. Export actions and the reducer
export const { resetAuthState, logout, setAuthToken } = authSlice.actions;

export default authSlice;
