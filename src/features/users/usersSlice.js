import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, API_USERS } from "../../api/api";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await api.get(API_USERS);
  return res.data;
});

export const addUser = createAsyncThunk("users/add", async (payload) => {
  const res = await api.post(API_USERS, payload);
  return res.data;
});

export const updateUserApi = createAsyncThunk("users/update", async ({ id, payload }) => {
  const res = await api.put(`${API_USERS}/${id}`, payload);
  return res.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await api.delete(`${API_USERS}/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Erreur";
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateUserApi.fulfilled, (state, action) => {
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;