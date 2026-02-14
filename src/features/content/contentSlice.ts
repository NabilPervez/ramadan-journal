import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Dua {
    id: string
    text: string
    category: string
}

export interface ContentState {
    quranProgress: {
        currentJuz: number
        lastSurah: number
        lastAyah: number
    }
    duaList: Dua[]
}

const initialState: ContentState = {
    quranProgress: {
        currentJuz: 1,
        lastSurah: 1,
        lastAyah: 1,
    },
    duaList: [],
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        updateQuranProgress: (state, action: PayloadAction<Partial<ContentState['quranProgress']>>) => {
            state.quranProgress = { ...state.quranProgress, ...action.payload }
        },
        addDua: (state, action: PayloadAction<Dua>) => {
            state.duaList.push(action.payload)
        },
        removeDua: (state, action: PayloadAction<string>) => {
            state.duaList = state.duaList.filter((d) => d.id !== action.payload)
        },
        setContent: (_state, action: PayloadAction<ContentState>) => {
            return action.payload
        },
    },
})

export const { updateQuranProgress, addDua, removeDua, setContent } = contentSlice.actions
export default contentSlice.reducer
