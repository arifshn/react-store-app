// src/features/theme/themeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

const storedTheme = (localStorage.getItem("theme") as ThemeMode) || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: storedTheme },
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice;
