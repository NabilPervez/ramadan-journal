import Dexie, { type Table } from 'dexie'
import { type DailyLogState } from '../features/dailyLog/dailyLogSlice'
import { type SettingsState } from '../features/settings/settingsSlice'

export class RamadanJournalDB extends Dexie {
    logs!: Table<DailyLogState, string>
    user_profile!: Table<SettingsState, number>

    constructor() {
        super('RamadanJournalDB')
        this.version(1).stores({
            logs: 'date, mood',
            user_profile: '++id'
        })
    }
}

export const db = new RamadanJournalDB()
