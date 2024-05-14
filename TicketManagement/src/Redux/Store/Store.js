import { configureStore, combineReducers } from "@reduxjs/toolkit";


import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist"
import { FirstSlice } from "../Slice/Slice";
import UserSliceReducer from "../Slice/userSlice";

const persistConfig = {
    key: 'root',
    storage
}
 
const rootReducer = combineReducers({
    userrole: UserSliceReducer,
    user : FirstSlice.reducer,
})


const persistedReducer = persistReducer(persistConfig,  rootReducer)

export const Store = configureStore({
    // reducer: {
    //     user: FirstSlice.reducer
    // }
    reducer: persistedReducer,
})
export default Store;
export const persistor = persistStore(Store)
