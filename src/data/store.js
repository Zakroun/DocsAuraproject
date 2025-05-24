import { DocsauraSlice } from "./DocsauraSlice";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";

export const store = configureStore({
  reducer: {
    Docsaura: DocsauraSlice.reducer,
    auth: authSlice.reducer,
  },
});
