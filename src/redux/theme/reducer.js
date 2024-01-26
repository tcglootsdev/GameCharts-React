import { handleActions } from "redux-actions";
import types from "./types";

let themeMode = localStorage.getItem("themeMode");
if (themeMode !== "light" && themeMode !== "dark") {
  themeMode = "light";
}
document.documentElement.setAttribute("data-app-theme", themeMode);

const initialState = {
  themeMode,
};

const reducer = handleActions(
  {
    [types.SAVE_THEME_MODE]: (state, action) => ({
      ...state,
      themeMode: action.payload.themeMode,
    }),
  },
  initialState
);

export default reducer;
