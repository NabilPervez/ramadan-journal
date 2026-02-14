import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
    isSetupComplete: boolean
    calculationMethod: string
    madhab: 'Standard' | 'Hanafi'
    location: {
        lat: number
        lng: number
        city: string
    } | null
    theme: 'light' | 'dark' | 'system'
}

const initialState: SettingsState = {
    isSetupComplete: false,
    calculationMethod: 'ISNA',
    madhab: 'Hanafi',
    location: null,
    theme: 'system',
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        completeSetup: (state) => {
            state.isSetupComplete = true
        },
        updateLocation: (state, action: PayloadAction<{ lat: number; lng: number; city: string }>) => {
            state.location = action.payload
        },
        updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
            return { ...state, ...action.payload }
        },
    },
})

export const { completeSetup, updateLocation, updateSettings } = settingsSlice.actions
export default settingsSlice.reducer
