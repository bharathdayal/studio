# Project Summary: Bharath Oriento using Firebase Studio

This document provides a blueprint of the "Bharath Oriento" application and a summary of the development process.

## 1. App Blueprint

### Overview
"Bharath Oriento" is a responsive web application designed for mobile devices. Its core concept is to offer different utility tools based on the physical orientation of the device. The application's tagline is "Flip the phone, switch the mode."

Orientation Detection — Detect the device's current orientation (portrait upright, landscape right-side up, portrait upside down, landscape left-side up).
Alarm Clock — Display an alarm clock interface in portrait upright mode.
Stopwatch — Show a stopwatch when the device is in landscape mode (right-side up).
Timer — Present a timer feature when the device is in portrait mode (upside down).
Weather Display
 — Show the weather for the user's location when the device is in landscape mode (left-side up) using a free weather API tool. The application decides if and how to include the temperature, a short textual description of the weather, an icon, and an icon of the wind.
Color
Layout
A clean and responsive layout adapting to different screen sizes; ensures that the appropriate function (alarm, stopwatch, timer, weather) is prominently displayed based on the device's orientation.
Typography
Font pairing: 'Poppins' (sans-serif) for headings and short blocks of text and 'PT Sans' (sans-serif) for body text.
Iconography
Simple, clear icons to represent the alarm, stopwatch, timer, and weather conditions, improving usability at a glance.
Animation
Subtle animations for transitions between orientations and updating information; enhances the user experience by making interactions smooth and intuitive.
AI
Gemini, Genkit
Gemini: A powerful AI model capable of understanding and generating various forms of input, including text, code, audio, images, and video. Learn more
Genkit: An open-source framework from Google that provides a unified API to access AI models and streamlines AI logic, tool use, image generation, and more. Learn more
UI
TypeScript, NextJS, Tailwind CSS
TypeScript: A popular programming language that adds type safety to JavaScript.
NextJS: A popular web framework built on React with support for client- and server-side rendering.
Tailwind CSS: A popular CSS framework that lets you style components inline with your HTML and maintain UI consistency across your app

### Core Functionality
The application uses the browser's Screen Orientation API to detect the device's orientation and dynamically renders a corresponding component.

- **`portrait-primary`**: Displays the **Alarm Clock**.
- **`landscape-primary`**: Displays the **Stopwatch**.
- **`portrait-secondary`**: Displays the **Timer**.
- **`landscape-secondary`**: Displays the **Weather** widget.
- **Default/Undetected**: A welcome screen is shown, prompting the user to rotate their device.

### Key Components

- **`page.tsx`**: The main entry point of the app. It uses the `useOrientation` hook to manage which component is displayed. It also includes the main layout and animations.
- **`useOrientation` hook**: A custom React hook that listens for changes in screen orientation and returns the current state. It includes fallbacks for browsers with limited support for the Screen Orientation API.
- **`AlarmClock`**: A component that shows the current time and date, updated every second.
- **`Stopwatch`**: A functional stopwatch with start, pause, and reset capabilities.
- **`Timer`**: A countdown timer that can be set by the user (in minutes). It uses system toasts to notify when the time is up.
- **`Weather`**: A component that uses the device's geolocation to fetch and display the current weather conditions, including temperature, a descriptive icon, and wind status. It uses a Genkit AI flow for this.
- **`FeatureCard`**: A reusable card component used to wrap each of the tools, providing a consistent UI.

### Styling and UI
- **Tech Stack**: Next.js, React, TypeScript, Tailwind CSS.
- **UI Components**: Built using ShadCN UI components.
- **Color Scheme**: A warm "Sunset" theme with a deep orange primary color, a magenta accent, and a soft off-white background.
- **Fonts**: `Poppins` for headlines and `PT Sans` for body text.

---

## 2. Development Log & Prompts

This section summarizes the key interactions and changes made to the application.

1.  **Initial Issue: Blank Screen on iOS**
    - **User Prompt**: "preview on IOS mobile shows blank white screen"
    - **Action**: Identified a potential issue with the `useOrientation` hook on browsers with incomplete support for the Screen Orientation API. Implemented a fallback mechanism to prevent the app from failing on these devices.

2.  **Permission Error Troubleshooting**
    - **User Prompt**: "Workstation does not exists or your currently signed in account does not have access to it. Permission Denied"
    - **Action**: Explained that the error was likely related to the local development environment, which is outside the AI's control. To rule out code issues, the `useOrientation` hook was further refined to be more robust.

3.  **Application Renaming**
    - **User Prompt**: "Change Orientation Station to Mobile Orientation-BD", followed by "Update application name to Bharath Oriento - 'Flip the phone, switch the mode'."
    - **Action**: The application's title and tagline were updated in `src/app/layout.tsx` and `src/app/page.tsx`.

4.  **UI Color Scheme Update**
    - **User Prompt**: "How about UI color scheme. Current one is Blue color. Can you show some more UI design," followed by "Yes, Great"
    - **Action**: Proposed and implemented a new "Sunset" color theme. The changes were applied to the CSS variables in `src/app/globals.css`, updating the app's primary, accent, and background colors.

5.  **Creation of Project Summary**
    - **User Prompt**: "Can you create pdf file that has App Blueprint and all prompt responses", followed by "Yes".
    - **Action**: Created this `Project_Summary.md` file to document the application's architecture and the development history.
