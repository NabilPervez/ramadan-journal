import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../db/db'
import type { RootState } from '../app/store'
import { updateSettings } from '../features/settings/settingsSlice'
import { setDailyLog } from '../features/dailyLog/dailyLogSlice'
import { setContent } from '../features/content/contentSlice'

export const usePersistence = () => {
    const dispatch = useDispatch()
    const settings = useSelector((state: RootState) => state.settings)
    const dailyLog = useSelector((state: RootState) => state.dailyLog)
    const content = useSelector((state: RootState) => state.content)

    // Load Data on Mount
    useEffect(() => {
        const loadData = async () => {
            try {
                // Load Settings
                const profile = await db.user_profile.toCollection().first()
                if (profile) {
                    dispatch(updateSettings(profile))
                }

                // Load Today's Log
                const today = new Date().toISOString().split('T')[0]
                const log = await db.logs.get(today)
                if (log) {
                    dispatch(setDailyLog(log))
                }

                // Load Content
                const contentData = await db.content.toCollection().first()
                if (contentData) {
                    dispatch(setContent(contentData))
                }
            } catch (error) {
                console.error("Failed to load data", error)
            }
        }
        loadData()
    }, [dispatch])

    // Save Settings
    useEffect(() => {
        if (settings.isSetupComplete) {
            db.user_profile.put({ ...settings, id: 1 } as any)
        }
    }, [settings])

    // Save Daily Log
    useEffect(() => {
        if (dailyLog.date) {
            db.logs.put(dailyLog)
        }
    }, [dailyLog])

    // Save Content
    useEffect(() => {
        db.content.put({ ...content, id: 1 } as any)
    }, [content])
}
