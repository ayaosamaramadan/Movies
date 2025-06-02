import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
  page: number;
}

const initialState: MovieState = {
  page: 1,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    nextPage(state) {
      state.page += 1;
    },
    prevPage(state) {
      if (state.page > 1) state.page -= 1;
    },
   
  },
});

export const { nextPage, prevPage } = movieSlice.actions;
export default movieSlice.reducer;
