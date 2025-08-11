# Dashboard Assignment - DataGain

A modern, responsive dashboard application built with Next.js, featuring a collapsible sidebar, data table with CRUD operations, and an interactive calendar system.

## 🚀 Live Demo

[**View Live on Vercel**](https://dashboard-assignment-datagain.vercel.app/appeal-letter)

## Github Repository

[**GitHub Repo**](https://github.com/AnsariYasirArfat/dashboard_assignment_datagain)

## 📋 Assignment Overview

This project implements a comprehensive dashboard solution with three main tasks:

### Task 1: Collapsible Sidebar
[Watch Video Demo](/public/assignments/videos/collapsible_sidebar.mkv)
- Create a sidebar with collapsible options on click of expand button
- Show icons with names for navigation
- Responsive design with drawer for mobile devices

### Task 2: Data Table with CRUD Operations
[Watch Video Demo](/public/assignments/videos/data_table_with_crud_operations.mkv)
- Create a table and bind data
- Perform CRUD operations (Create, Read, Update, Delete) on actions
- Row selection, search, sorting, and pagination

### Task 3: Interactive Calendar
 [Watch Video Demo](/public/assignments/videos/interactive_calendar.mkv)
- Create a calendar with date click functionality
- Provide two options: add event and add reminder
- Display events and reminders with different colors on selected dates

## ✨ Features

### �� Core Functionality

- **Responsive Layout**: Mobile-first design with collapsible sidebar and mobile drawer
- **Data Management**: Full CRUD operations for appeal letter data
- **Interactive Calendar**: Event and reminder management with color coding
- **Navigation**: Seamless navigation between pages with active state indicators

### 📊 Data Table Features

- **Row Selection**: Multi-select with checkbox functionality
- **Search & Filtering**: Real-time search across all data fields
- **Sorting**: Column-based sorting for all data types
- **Pagination**: Configurable page sizes with navigation controls
- **Actions**: Edit, status change, and download options per row
- **Bulk Operations**: Mass selection and status updates

### �� Calendar Features

- **Multiple Views**: Day, week, month, and list views
- **Event Management**: Add, edit, and delete events with time specifications
- **Reminder System**: Create and manage reminders with custom times
- **Color Coding**: Different colors for events vs reminders
- **Responsive Design**: Optimized for all screen sizes

### 🎨 UI/UX Features

- **Dark/Light Mode**: Theme switching with system preference detection
- **Toast Notifications**: User feedback for actions and selections
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Custom error and not-found pages
- **Responsive Design**: Optimized for desktop, tablet, and mobile


## 🎯 Assignment Completion Status

- ✅ **Task 1**: Collapsible Sidebar - **COMPLETED**
- ✅ **Task 2**: Data Table CRUD - **COMPLETED**
- ✅ **Task 3**: Interactive Calendar - **COMPLETED**

All three main tasks have been successfully implemented with additional features including responsive design, error handling, and modern UI/UX patterns.

## 📹 Video Demonstrations Summary

| Task       | Description          | Video Link                                                                   | Duration |
| ---------- | -------------------- | ---------------------------------------------------------------------------- | -------- |
| **Task 1** | Collapsible Sidebar  | [Watch Demo](/public/assignments/videos/collapsible_sidebar.mkv)             | ~2-3 min |
| **Task 2** | Data Table CRUD      | [Watch Demo](/public/assignments/videos/data_table_with_crud_operations.mkv) | ~3-4 min |
| **Task 3** | Interactive Calendar | [Watch Demo](/public/assignments/videos/interactive_calendar.mkv)            | ~3-4 min |

## 📸 Screenshots

![Light Mode](/public/assignments/screenshots/light_mode.png)
![Dark Mode](/public/assignments/screenshots/dark_mode.png)
![Add Appeal Letter page](/public/assignments/screenshots/add_appeal_letter.png)
![Edit Appeal Letter page](/public/assignments/screenshots/edit_appeal_letter.png)
![Calendar Summary](/public/assignments/screenshots/calendar_summary.png)
![Add Event](/public/assignments/screenshots/add_event.png)
![Add Reminder](/public/assignments/screenshots/add_reminder.png)
![Event Details](/public/assignments/screenshots/event_details.png)
![Reminder Details](/public/assignments/screenshots/reminder_details.png)
![Edit Calendar Form](/public/assignments/screenshots/edit_calendar_form.png)
![Calendar Event & Reminder](/public/assignments/screenshots/event_reminder.png)
---



## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 14**: App Router with server-side rendering
- **React 18**: Latest React features and hooks
- **TypeScript**: Type-safe development

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality React components
- **Lucide React**: Beautiful, customizable icons

### State Management

- **Redux Toolkit**: Centralized state management
- **React Redux**: React bindings for Redux

### Form Handling & Validation

- **React Hook Form**: Performant forms with minimal re-renders
- **Yup**: Schema-based validation

### Calendar Integration

- **FullCalendar**: Feature-rich calendar component
- **date-fns**: Modern date utility library

### Development Tools

- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dashboard_assignment_datagain
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
dashboard_assignment_datagain/
├── app/                        # Next.js App Router
│   ├── appeal-letter/          # Appeal letter pages
│   ├── error.tsx               # Error boundary
│   ├── layout.tsx              # Root layout
│   ├── not-found.tsx           # 404 page
│   └── page.tsx                # Home page (redirects)
├── components/                 # React components
│   ├── appeal-letter/          # Appeal letter components
│   ├── calendar/               # Calendar components
│   ├── common/                 # Shared components
│   ├── layouts/                # Layout components
│   ├── providers/              # Context providers
│   └── ui/                     # Shadcn/ui components
├── data/                       # Data interfaces and mock data
├── lib/                        # Utility functions
├── store/                      # Redux store and slices
│   ├── reducers/               # Redux slices
│   ├── hook.ts                 # Typed Redux hooks
│   └── store.ts                # Store configuration
├── public/                     # Static assets
└── styles/                     # Global styles
```

## 🔧 Key Components

### Layout Components

- **AppShell**: Main application wrapper
- **Header**: Top navigation with search and user actions
- **Sidebar**: Collapsible navigation with mobile drawer
- **DrawerSidebar**: Mobile-responsive sidebar drawer

### Data Management

- **AppealLetterTable**: Main data table with all CRUD operations
- **AppealLetterForm**: Add/edit form with validation
- **SearchAndFilters**: Search, filtering, and bulk actions
- **Pagination**: Table pagination controls

### Calendar System

- **Calendar**: FullCalendar integration with custom event handling
- **CalendarDialog**: Unified modal for add/edit/view operations
- **CalendarForm**: Event and reminder creation/editing
- **CalendarView**: Event details and management

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Desktop**: Full sidebar with collapsible options
- **Tablet**: Adaptive layout with responsive tables
- **Mobile**: Drawer-based navigation with touch-optimized controls

## 🎨 Customization

### Theme Colors

- **Primary**: Custom teal (`bg-custom-teal`)
- **Accent**: Custom red (`bg-custom-red`)
- **Supporting**: Gray scale with dark mode variants
---
Thank You!