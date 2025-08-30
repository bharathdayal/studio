# Project Summary: Mobile Oriento

This document provides a blueprint of the "Mobile Oriento" application and a summary of the development process.

## 1. App Blueprint

### Overview
"Mobile Oriento" is a responsive web application designed for mobile devices. Its core concept is to offer different utility tools based on the physical orientation of the device. The application's tagline is "Flip the phone, switch the mode."

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

## 2. Codebase & Tech Stack

The application is built on a modern, component-based architecture using the following technologies:

-   **Framework**: [Next.js](https://nextjs.org/) with the App Router
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/) for smooth page and component transitions.
-   **Icons**: [Lucide React](https://lucide.dev/)

The codebase is organized into components, hooks, and AI flows to ensure maintainability and scalability.

## 3. AI Tools Used

The application leverages Google's Generative AI to provide intelligent features.

-   **AI Framework**: [Genkit](https://firebase.google.com/docs/genkit), Google's open-source framework for building AI-powered applications.
-   **Model**: The weather feature is powered by the `googleai/gemini-2.5-flash` model.

### Weather Feature

The weather widget (`src/components/weather.tsx`) uses a Genkit flow to fetch and display current weather conditions based on the user's geolocation.

-   **Flow Location**: `src/ai/flows/weather-description-from-location.ts`
-   **Functionality**: It takes the user's latitude and longitude, passes them to the Genkit flow, and receives a structured JSON object containing the temperature, a weather description, and relevant icon names.

## 4. Prompting Technique

The AI's behavior is guided by a carefully crafted prompt within the Genkit flow.

-   **Prompt Definition**: Located in the `weatherPrompt` object in the weather flow file.

The prompt instructs the AI model to act as a "helpful weather assistant." It is given the latitude and longitude and is instructed to return a JSON object that strictly adheres to a predefined Zod schema (`WeatherDescriptionFromLocationOutputSchema`).

This technique, known as **structured output prompting**, ensures that the AI's response is always in a predictable, machine-readable format that the application can easily parse and display, which prevents errors and improves reliability. The use of Zod schemas to define the output format is a key part of this robust implementation.

## 5. Development Log & Prompts

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
