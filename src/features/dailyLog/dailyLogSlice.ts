import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface PrayerStatus {
    status: 'prayed' | 'missed' | 'pending'
    jamaah: boolean
}

export interface DailyLogState {
    date: string // ISO string YYYY-MM-DD
    hijriDate: string
    prayers: {
        fajr: PrayerStatus
        dhuhr: PrayerStatus
        asr: PrayerStatus
        maghrib: PrayerStatus
        isha: PrayerStatus
        taraweeh?: PrayerStatus
    }
    wellness: {
        waterCount: number
        sleepHours: number
    }
    journal: {
        intention: string
        reflection: string
        mood: string
        habitsAvoided: string[]
    }
    sunnahDidDo: boolean
}

const initialState: DailyLogState = {
    date: new Date().toISOString().split('T')[0],
    hijriDate: '',
    prayers: {
        fajr: { status: 'pending', jamaah: false },
        dhuhr: { status: 'pending', jamaah: false },
        asr: { status: 'pending', jamaah: false },
        maghrib: { status: 'pending', jamaah: false },
        isha: { status: 'pending', jamaah: false },
    },
    wellness: {
        waterCount: 0,
        sleepHours: 0,
    },
    journal: {
        intention: '',
        reflection: '',
        mood: '',
        habitsAvoided: [],
    },
    sunnahDidDo: false,
}

export const dailyLogSlice = createSlice({
    name: 'dailyLog',
    initialState,
    reducers: {
        setDailyLog: (state, action: PayloadAction<DailyLogState>) => {
            return action.payload
        },
        updatePrayer: (state, action: PayloadAction<{ prayer: keyof DailyLogState['prayers']; status: PrayerStatus }>) => {
            if (state.prayers[action.payload.prayer]) {
                state.prayers[action.payload.prayer] = action.payload.status
            }
        },
        incrementWater: (state) => {
            state.wellness.waterCount += 1
        },
        updateJournal: (state, action: PayloadAction<Partial<DailyLogState['journal']>>) => {
            state.journal = { ...state.journal, ...action.payload }
        },
    },
})

export const { setDailyLog, updatePrayer, incrementWater, updateJournal } = dailyLogSlice.actions
export default dailyLogSlice.reducer
