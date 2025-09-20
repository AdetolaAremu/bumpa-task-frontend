import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IAllProducts,
  IGetUserCart,
  ILoginUser,
} from "../../interfaces/responses/Ecom.response";
import type { IAllPagination } from "../../interfaces/types/Ecom.Type";
import axiosInstance from "../util/AxiosInsance";

const service_url = import.meta.env.VITE_BASE_URL;

export const loginUser = createAsyncThunk<
  string, // Only the token string
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post(
      `${service_url}/auth/login`,
      data
    );
    const token = response.data.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

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
    const response = await axiosInstance.get(
      `${service_url}/products?${params.toString()}`
    );
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addToCart = createAsyncThunk<
  any,
  { product_id: number; quantity: number },
  { rejectValue: string }
>("cart/addToCart", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`${service_url}/user/cart`, data);
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getUserCart = createAsyncThunk<
  IGetUserCart["data"],
  void,
  { rejectValue: string }
>("cart/getUserCart", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${service_url}/user/cart`);
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeFromCart = createAsyncThunk<
  any,
  { product_id: number },
  { rejectValue: string }
>("cart/addToCart", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(
      `${service_url}/user/cart/${data.product_id}`
    );
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const clearUserCart = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("cart/getUserCartClear", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`${service_url}/user/cart`);
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const proceedToPayment = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("cart/paymentCheckout", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${service_url}/user/order`);
    // console.log("response", response.data.data);
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
