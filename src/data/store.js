import { DocsauraSlice } from "./DocsauraSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    Docsaura: DocsauraSlice.reducer,
  },
});
