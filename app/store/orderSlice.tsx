// walkingSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface WalkingState {
  visible: boolean;
}

const initialState: WalkingState = {
  visible: true, // Initially visible
};

const walkingSlice = createSlice({
  name: "walking",
  initialState,
  reducers: {
    toggleWalking: (state) => {
      state.visible = !state.visible; // Toggle visibility
    },
  },
});

export const { toggleWalking } = walkingSlice.actions;
export default walkingSlice.reducer;
