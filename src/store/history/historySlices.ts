import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHistoryData } from "../../utils/types/commonTypes";

interface IInitialState {
  history: IHistoryData[];
}

const initialState: IInitialState = {
  history: [],
};

const history = createSlice({
  name: "history",
  initialState,
  reducers: {
    // Get History list
    setHistory: (state: IInitialState, action: PayloadAction<IHistoryData>) => {
      state.history.push(action.payload);
    },

    // Delete selected history item
    deleteHistory: (state: IInitialState, action: PayloadAction<number>) => {
      state.history.splice(action.payload, 1);
    },
  },
});

const { reducer, actions } = history;
export const { setHistory, deleteHistory } = actions;
export default reducer;
