# EduBoost SA — Functional Frontend Roadmap

**Last Updated:** April 27, 2026  
**Status:** 🔴 Red (Significant Architectural Drift / Disconnected Logic)

## 🎯 Primary Objective
Transition the frontend from a "stub-heavy" React mockup to a production-grade Next.js application that is fully wired to the stateful backend Orchestrator. 

## 🚨 Current Frontend Issues Audit

The current frontend gives the illusion of functionality but is fundamentally disconnected. Tests pass because they mock broken components.

### 1. Routing & Navigation Failures
- **Dead Links:** The Sidebar pushes to `/learner/${tabId}` (e.g., `/learner/dashboard`), but the actual Next.js App Router structure puts these pages at `/dashboard`. This results in 404s.
- **Login Bypass:** `LoginPage` directs to `/dashboard` via a "Bypass Login" button, but `LearnerLayout` kicks the user back to `/` if `LearnerContext` doesn't have a valid learner object.
- **Parent vs Learner Layouts:** The separation of `(parent)` and `(learner)` layouts is present, but navigation between them is jarring and state is not cleanly segregated.

### 2. State & Data Disconnection
- **`FeaturePanels.jsx` Monolith:** The app relies on a massive `FeaturePanels.jsx` file full of `PlaceholderPanel` components. These look like a 1-page JSP.
- **Legacy API usage:** The `FeaturePanels.jsx` still imports from the old `./api.js` (which uses `localStorage` mocks) instead of the new, centralized `lib/api/services.js` (which handles real JWTs).
- **Missing Global State:** Total XP, current streak, and active study plans are not consistently synchronized between components.

### 3. Component Stubs (Fake Functionality)
- **Diagnostic Engine:** Currently uses a `PlaceholderPanel` with a fake "Run Diagnostic" button that executes a single API call instead of the real multi-step IRT flow.
- **Parent Portal:** Still uses `PlaceholderPanel` and doesn't implement the real linkage flow (adding a learner via pseudonym).
- **Badges & Gamification:** The UI just lists badges from a mock profile instead of dynamically rendering awarded badges based on real backend XP events.

### 4. Testing Delusion
- **Mock-Heavy Tests:** Tests are passing because they mock the API responses and render isolated components. They do not test if the component actually sends the right data to the backend.
- **No E2E Coverage:** We have no strict integration tests (like Playwright/Cypress) that ensure clicking "Start Lesson" actually routes correctly and loads real data.

---

## 🏗️ Pillar 1: Routing & Architectural Integrity
- [ ] **Fix 404 Navigation**: Update Sidebar and Navbar to use the correct App Router paths.
- [ ] **Enforce Auth Guards**: Implement real Next.js middleware or context-level guards that validate the `learner_token` or `guardian_token`.
- [ ] **Eliminate `FeaturePanels.jsx`**: Move all panel logic into their respective `app/(learner)/[feature]/page.jsx` files.

## 🎨 Pillar 2: UI Realism & Design System
- [ ] **Destroy `PlaceholderPanel`**: Replace all stub cards with actual, functional UI components built with Tailwind CSS.
- [ ] **Implement Interactive Diagnostics**: Build the step-by-step question/answer UI for the IRT engine.
- [ ] **Implement Parent Dashboard**: Build the learner linkage and progress report viewer.

## 🔗 Pillar 3: Stateful Backend Connectivity
- [ ] **Wire `services.js` Everywhere**: Eradicate the old `api.js` file entirely. 
- [ ] **Connect Onboarding**: Wire the onboarding flow to the real `POST /learners/` endpoint.
- [ ] **Connect Gamification**: Ensure XP and streaks update in real-time in the `Sidebar` after lesson completion.

## 🧪 Pillar 4: Strict Functional Testing
- [ ] **Introduce Playwright/Cypress**: Add end-to-end tests that interact with the live DOM and real (test-mode) backend.
- [ ] **Contract Tests**: Ensure frontend components fail explicitly if backend schema expectations change.
