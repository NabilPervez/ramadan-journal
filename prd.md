Product Requirements Document (PRD)

Project Name: Ramadan Reflections

Version: 2.0 (Developer Blueprint)
Status: Ready for Development
Date: February 14, 2026

1. Executive Summary

Vision: To build a holistic digital companion that bridges the gap between spiritual tracking, physical wellness, and mindful journaling. Unlike standard prayer apps, this tool focuses on the quality of the user's Ramadan experience, helping them track not just what they did, but how they felt and what they learned.

Target Audience:

The Busy Professional: Needs quick, efficient logging and reminders.

The Spiritual Seeker: Wants deep reflection prompts and Quranic connection.

The Wellness Conscious: Wants to ensure fasting doesn't negatively impact health/sleep.

2. Global Navigation & Layout Architecture

The application wrapper that persists across all routes.

Global Container (App.js):

Wrappers: ChakraProvider (UI), Provider (Redux), BrowserRouter (Router).

Logic: Checks localDB on mount to hydrate Redux state. If no user profile exists, redirect to /setup.

Navigation Component (BottomNav / SideBar):

Mobile: Bottom Tab Bar (Fixed position).

Desktop: Left Vertical Sidebar.

Route Items:

Dashboard (/) - Icon: Home

Journal (/journal) - Icon: Book/Pen

Quran (/quran) - Icon: Open Book

Dua (/dua) - Icon: Hands/Tasbih

Settings (/settings) - Icon: Cog

3. Page-by-Page Specifications

Page 1: Onboarding / Setup

Route: /setup
Goal: Collect necessary data to calculate prayer times and personalize the experience.

Section: Location & Calculation

Component: LocationRequest

Action: Triggers browser Geolocation API (navigator.geolocation).

Output: Dispatches {lat, lng} to settingsSlice.

Component: CalculationSelect (Chakra Select)

Data: Options from adhan library (e.g., ISNA, MWL, Umm Al-Qura).

Default: ISNA (North America) or closest based on timezone.

Component: MadhabToggle (Chakra RadioGroup)

Options: Standard (Shafi, Maliki, Hanbali) vs. Hanafi (affects Asr time).

Section: Goal Setting

Component: IntentionInput (Chakra Input)

Prompt: "My main goal for this Ramadan is..."

Output: Strings saved to userProfile.

Component: CompleteSetupBtn

Action: Validates data -> Writes to LocalDB -> Redirects to /.

Page 2: Dashboard (Home)

Route: /
Goal: At-a-glance status of the current "Ramadan Day."

Section: Header

Component: DateDisplay

Library: moment-hijri or Intl API.

Display: "Ramadan 14, 1447 AH" (Top) | "Feb 14, 2026" (Sub).

Component: LocationBadge

Action: Tapping redirects to Settings.

Section: The Fasting Timer (Hero)

Component: CircularTimer (Custom SVG + Framer Motion)

Logic:

Pre-Fajr: Count down to Fajr (Suhoor time). Color: Cool Blue.

Day: Count down to Maghrib (Iftar time). Color: Warm Gold.

Animation: SVG Stroke-dashoffset animates as time passes.

Section: Prayer Tracker

Component: PrayerCard (Repeated 5x + Taraweeh)

Props: prayerName, time.

Sub-Components:

CheckboxGroup: [Prayed] [On Time] [Jama'ah].

Interaction: onClick dispatches togglePrayer(id, status) to Redux.

Visuals: Card turns green/gold when "Prayed" is checked.

Section: Quick Wellness

Component: HydrationCounter

UI: Row of water droplet icons or a simple + / - stepper.

Logic: Resets daily at Maghrib.

Component: DeedToggle (Chakra Switch)

Label: "Did you do the Sunnah of the day?"

Action: Updates boolean in dailyLog.

Page 3: The Journal

Route: /journal
Goal: Morning intention setting and evening reflection.

Section: Mode Switcher

Component: DayNightTabs (Chakra Tabs)

Logic: Auto-selects based on current time, but user can manually toggle.

Section: Morning View

Component: IntentionField (Textarea)

Placeholder: "Today I will focus on..."

Component: SleepLog (Chakra Slider)

Range: 0 to 12 hours.

Section: Evening View

Component: MoodSelector

UI: 5 Icons (Sad, Anxious, Neutral, Happy, Grateful).

Action: Sets mood string in Redux.

Component: ReflectionPrompt

Logic: Displays a prompt from a static array.

Action: "Shuffle" button to get a new prompt.

Component: HabitBreakerGrid

UI: Grid of toggles for negative habits (Anger, Backbiting, Lying).

Logic: "True" means the habit was avoided (Success).

Section: Footer

Component: SaveEntryBtn

Action: Persists Redux state to LocalDB.

Feedback: Toast notification "Journal Saved."

Page 4: Quran Tracker

Route: /quran
Goal: Track reading progress and insights.

Section: Visualization

Component: JuzProgress (Chakra Progress)

Math: (PagesRead / 604) * 100.

Section: Logger

Component: SurahSelector (Searchable Dropdown)

Data: JSON list of 114 Surahs.

Component: AyahInput (Number Input)

Component: TafseerNote (Textarea)

Label: "One verse that touched my heart..."

Section: Vocabulary

Component: VocabCard

Data: Fetches vocab_{day}.json. Shows Arabic word, English meaning, and root.

Page 5: The Dua Vault

Route: /dua
Goal: Manage spiritual requests and "Iftar Mode."

Section: Master List

Component: DuaList

Features: Add, Delete, Edit.

Categorization: Tags for (Self, Family, Ummah).

Section: Iftar Mode (Overlay)

Component: FocusModeBtn

Trigger: Opens a full-screen Modal.

Component: CarouselCard

UI: Large typography, minimal distraction.

Logic: Rotates through the user's DuaList randomly.

Use Case: The last 10 minutes before Maghrib.

4. Data Architecture (Schema)

Redux Store Structure

The app will use Redux Toolkit for state management.

1. settingsSlice

{
  "isSetupComplete": true,
  "calculationMethod": "ISNA",
  "madhab": "Hanafi",
  "location": { "lat": 32.7, "lng": -96.7, "city": "Dallas" },
  "theme": "light"
}


2. dailyLogSlice (Represents the current active day)

{
  "date": "2026-02-14",
  "hijriDate": "1447-09-01",
  "prayers": {
    "fajr": { "status": "prayed", "jamaah": false },
    "dhuhr": { "status": "missed", "jamaah": false }
  },
  "wellness": {
    "waterCount": 3,
    "sleepHours": 6
  },
  "journal": {
    "intention": "Focus on patience",
    "reflection": "Today was hard...",
    "mood": "anxious",
    "habitsAvoided": ["anger", "gossip"]
  }
}


3. contentSlice

{
  "quranProgress": { "currentJuz": 1, "lastSurah": 2, "lastAyah": 140 },
  "duaList": [
    { "id": "1", "text": "Health for parents", "category": "family" },
    { "id": "2", "text": "Forgiveness", "category": "self" }
  ]
}


Local Database (IndexedDB)

We will use Dexie.js as a wrapper for IndexedDB to persist data offline.

Table: logs (Archive of past days)

Primary Key: date (ISO String).

Indexes: mood.

Table: user_profile

Stores settings and goals.

5. Technical Stack & Implementation

Core Framework

React 18+

Vite (Build tool for speed)

TypeScript (Strict typing for the Schemas defined above)

UI & Styling

Chakra UI: For base components (Box, Flex, Modal, Toast, Form controls).

Tailwind CSS: For specific layout utilities and custom spacing.

Framer Motion:

Page transitions (<AnimatePresence>).

Circular Timer animation.

Dua Carousel swipe effects.

Logic & Libraries

Adhan.js: Crucial. Calculates prayer times based on Lat/Lng/Date.

Moment-Hijri / Intl: For Hijri date conversion.

Redux Toolkit: Global state management.

Dexie.js: Local database persistence.

React Router Dom: Navigation.

Hosting (PWA)

Netlify:

_redirects file for SPA routing.

PWA Manifest generation (icons, theme color).

Service Worker registration for offline capability.

6. Brand Guidelines

Brand Personality

Voice: Gentle, Encouraging, Minimalist, Serene.

Keywords: Ihsaan (Excellence), Sakinah (Tranquility), Clarity.

Color Palette

Color Name

Hex Code

Usage

Midnight Teal

#0F4C5C

Night Mode BG, Headers

Sandstone

#F5F1E8

Day Mode BG, Cards

Mecca Gold

#D4AF37

Accents, Active States, Timer

Sage Green

#8AA399

Success, Completed Prayers

Clay Red

#BF6B63

Alerts, Missed Habits

Slate Text

#2C3E50

Primary Text

Typography

Headings: Playfair Display (Serif) - Traditional, elegant.

Body: Inter (Sans-Serif) - Clean, legible.
