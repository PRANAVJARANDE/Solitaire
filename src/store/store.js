import {configureStore} from '@reduxjs/toolkit'
import stateslice from './stateslice';

const store=configureStore({
    reducer: stateslice
});

export default store;