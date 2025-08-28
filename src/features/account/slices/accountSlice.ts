import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import { router } from "../../../router/Routes";
import { accountApi } from "../api/accountApi";
import type { User } from "../../../model/IUser";
import { toast } from "react-toastify";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const loginUser = createAsyncThunk<User, FieldValues>(
  "account/login",
  async (data, { rejectWithValue }) => {
    try {
      const user = await accountApi.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const getUser = createAsyncThunk<User>(
  "account/getuser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await accountApi.getUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const updateUser = createAsyncThunk<User, FieldValues>(
  "account/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const user = await accountApi.updateUser(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const changePassword = createAsyncThunk<void, FieldValues>(
  "account/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      await accountApi.changePassword(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/home");
      console.log("User logged out");
      toast.info("Çıkış yapıldı");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("Set user:", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("Login success:", action.payload);
        toast.success("Giriş başarılı!");
      })
      .addCase(loginUser.rejected, (_, action) => {
        console.error("Login failed:", action.payload);
        toast.error("Giriş başarısız!");
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("Get user success:", action.payload);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        localStorage.removeItem("user");
        router.navigate("/login");
        console.error("Get user failed:", action.payload);
        toast.error("Kullanıcı bilgisi alınamadı!");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("Update user success:", action.payload);
        toast.success("Kullanıcı bilgisi güncellendi!");
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
        router.navigate("/login");
        console.log("Password changed successfully");
        toast.success("Şifre değiştirildi, tekrar giriş yapınız!");
      })
      .addCase(changePassword.rejected, (_, action) => {
        console.error("Password change failed:", action.payload);
        toast.error("Şifre değiştirilemedi!");
      });
  },
});

export const { logout, setUser } = accountSlice.actions;
