import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IImage } from "../../types";
import { RootState } from "../store";
import { fetchImages, seedImages } from "./imageApi";

export interface ImageState {
  images: IImage[];
  image: IImage | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: ImageState = {
  images: [],
  image: undefined,
  status: "idle",
};

export const fetchImagesAsync = createAsyncThunk(
  "image/fetchImages",
  async () => {
    const { data } = await fetchImages();
    return data;
  }
);

export const seedImagesAsync = createAsyncThunk(
  "image/seedImages",
  async () => {
    const { data } = await seedImages();
    return data;
  }
);

export const imageSlice = createSlice({
  name: "image",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImagesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.images = action.payload;
      })
      .addCase(seedImagesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(seedImagesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.images = action.payload;
      });
  },
});

export const {} = imageSlice.actions;

export const selectImages = (state: RootState) => state.image;

export default imageSlice.reducer;
