import Dexie, { type Table } from 'dexie'
import { type DailyLogState } from '../features/dailyLog/dailyLogSlice'
import { type SettingsState } from '../features/settings/settingsSlice'
import { type ContentState } from '../features/content/contentSlice'

export class RamadanJournalDB extends Dexie {
    logs!: Table<DailyLogState, string>
    user_profile!: Table<SettingsState & { id?: number }, number>
    content!: Table<ContentState & { id?: number }, number>

    constructor() {
        super('RamadanJournalDB')
        this.version(2).stores({
            logs: 'date, mood',
            user_profile: '++id',
            content: '++id'
        })
    }
}

export const db = new RamadanJournalDB()
