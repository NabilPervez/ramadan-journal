import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from '../features/settings/settingsSlice'
import dailyLogReducer from '../features/dailyLog/dailyLogSlice'
import contentReducer from '../features/content/contentSlice'

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        dailyLog: dailyLogReducer,
        content: contentReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
