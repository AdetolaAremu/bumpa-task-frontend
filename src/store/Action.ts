import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IAllProducts,
  ILoginUser,
} from "../../interfaces/responses/Ecom.response";
import type { IAllPagination } from "../../interfaces/types/Ecom.Type";
import axios from "axios";

const service_url = import.meta.env.VITE_BASE_URL;

export const loginUser = createAsyncThunk<
  ILoginUser["data"],
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${service_url}/login`, data);
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// In Action.ts
export const getAllProducts = createAsyncThunk<
  IAllProducts["data"],
  IAllPagination,
  { rejectValue: string }
>("products/getAll", async (data, thunkAPI) => {
  try {
    const params = new URLSearchParams({
      pageSize: data.pageSize.toString(),
      page: data.page?.toString() || "1",
      searchQuery: data.searchQuery || "",
    });
    const response = await axios.get(
      `${service_url}/products?${params.toString()}`
    );
    return response.data.data; // <-- Only return the 'data' property
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
