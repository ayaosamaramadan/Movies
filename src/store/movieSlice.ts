import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { nextPage, prevPage, setPage } = movieSlice.actions;
export default movieSlice.reducer;
