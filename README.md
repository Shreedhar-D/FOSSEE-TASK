# Workshop Booking System (React + Django)

## Overview

This project improves the usability and mobile experience of an existing Workshop Booking System without changing backend logic
 
The original interface had issues with navigation clarity, mobile responsiveness, and form usability. My goal was to solve these practical problems by redesigning the frontend with a mobile-first approach, clearer user flows, and consistent UI patterns.
 
Rather than just improving visuals, the focus was on making key user actions—like logging in, browsing workshops, and checking status—faster, clearer, and more intuitive.

## Key Improvements (Before vs After)
 
| Problem in Original UI          | Improvement Made                                   |
| ------------------------------- | -------------------------------------------------- |
| Poor mobile usability           | Mobile-first responsive layout                     |
| Confusing navigation flow       | Simplified navigation with hamburger menu          |
| Inconsistent form structure     | Standardized and cleaner forms                     |
| Lack of feedback during actions | Added loading states and API feedback              |
| Important details not visible   | Highlighted workshop info (date, status, location) |

## What Was Improved

- Mobile-first layout for better usability on smaller screens
- Simplified navigation across core pages
- Consistent form design and validation feedback
- Improved visibility of important workshop details
- Loading indicators and error handling for better user feedback
- Route-based lazy loading for improved performance

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Django
- Django REST Framework

### Communication
- REST APIs

## Architecture

The system follows a clean separation of concerns:
 
- React handles UI and user interactions
- Django manages backend logic, authentication, and database operations
- Axios is used for communication between frontend and backend
 
**Flow:**
 
```
User → Frontend (React) → Backend (Django) → Database → Response → UI Update
```
## Reasoning

### 1. What design principles guided your improvements?
I mainly followed clarity, consistency, and task-first design.
Most users come to do simple tasks like login, check workshops, or view status, so I made these actions easier to spot.
I also kept buttons, spacing, and form patterns similar across pages so the UI feels familiar while moving through the app.

### 2. How did you ensure responsiveness across devices?
I used a mobile-first approach because the portal is often used on phones.
I first fixed layouts for smaller screens, then scaled them for tablet and desktop with responsive classes.
I paid extra attention to navigation, forms, and workshop cards so users can use the app comfortably without zooming or horizontal scrolling.

### 3. What trade-offs did you make between design and performance?
I avoided heavy animations and large visual effects.
The goal was to improve usability without making the app feel slow.
I used route-level lazy loading so pages are loaded when needed instead of loading everything at startup.
This keeps the UI simple while still improving the initial load experience.

### 4. What was the most challenging part and how did you approach it?
During setup, CORS issues came up between React and Django. I fixed it by adding a simple proxy setting in the Vite config and updating one Django URL line. The backend functionality stayed the same.

The hardest part was keeping the experience consistent across login, register, workshop, and profile pages on different screen sizes.
I handled this by reusing the same layout spacing pattern, validating each flow step by step, and checking before/after screens for each important page.


## Setup Instructions

### Backend (Django)
1. Clone the repository.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
4. Create superuser:
   ```bash
   python manage.py createsuperuser
   ```
5. Run backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React + Vite)
1. Move to frontend folder:
   ```bash
   cd workshop-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:8000/workshop
   ```
4. Start frontend:
   ```bash
   npm run dev
   ```


## Visual Showcase

### Homepage (Before / After)
**Before**
![Before UI - Homepage](screenshots/Home-Before.png)

**After**
![After UI - Homepage](screenshots/Home-After.png)

### Mobile Login (Before / After)
**Before**
![Mobile Login - Before](screenshots/Mobile-login-before.png)

**After**
![Mobile Login - After](screenshots/Mobile-login-after.png)

### Mobile Register
![Mobile Register - View 1](screenshots/Register-mobile-page-1.png)
![Mobile Register - View 2](screenshots/Register-mobile-page-2.png)

### Workshop Pages
![Workshop List](screenshots/Workshop-list.png)
![Workshop Details](screenshots/Workshop-detail.png)

### Statistics Dashboard
![Workshop Statistics](screenshots/workshop-statistics.png)

Note: The statistics view opens the existing Django-based statistics dashboard.

## Project Demo

**Demo Video:** [Link to Demo Video](https://drive.google.com/file/d/1O4cMyfbA11HPJF-zO2q1aX_402nx5O1z/view?usp=sharing)

## Submission Checklist
- [x] Code is readable and well-structured
- [x] Git history shows progressive work (no single commit dumps)  
- [x] README includes reasoning answers and setup instructions
- [x] Screenshots included (before/after)
- [x] Code documented where necessary