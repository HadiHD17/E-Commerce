import { configureStore } from "@reduxjs/toolkit";
import fooReducer from "./slices/foo-slice";

export default configureStore({
    reducer: {
        foo: fooReducer,
    },
});
