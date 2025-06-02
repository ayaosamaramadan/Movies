import { createSlice } from "@reduxjs/toolkit";

interface MovieState {

}

const initialState: MovieState = {
 
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
   
  },
});

export const {} = movieSlice.actions;
export default movieSlice.reducer;
