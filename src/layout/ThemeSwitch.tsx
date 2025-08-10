// src/features/theme/components/ThemeSwitch.tsx
import { Switch } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../store/store";
import { toggleTheme } from "../store/themeSlice";

export default function ThemeSwitch() {
  const mode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <Switch
      checked={mode === "dark"}
      onChange={() => dispatch(toggleTheme())}
      color="default"
    />
  );
}
