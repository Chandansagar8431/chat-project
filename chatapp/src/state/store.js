import authreducer from "../state/index";

import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});

export default store;
