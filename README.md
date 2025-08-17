Project Roles and Responsibilities

This project uses Laravel for backend and routing, and React (TypeScript) for frontend components and pages.

Team Roles & Assigned Tasks
Nafis

Notifications (implementation and management)

Mahfuj

Laravel Routes:

routes/web.php → Feed page

routes/web.php → Post detail page

React Pages:

resources/js/pages/feed.tsx

resources/js/pages/post.tsx

Jim

Laravel Routes:

routes/web.php → Create Post

routes/web.php → Delete Post

React Components:

resources/js/components/feed/FeedPost.tsx

Nasif

Laravel Routes:

routes/web.php → Profile page

React Pages:

resources/js/pages/profile.tsx

Aisharjo

Laravel Routes:

routes/settings.php (custom settings routes)

routes/web.php → Saved page

React Pages:

resources/js/pages/settings.tsx

resources/js/pages/saved.tsx

Project Structure Overview
Backend (Laravel)

Route definitions primarily in:

routes/web.php

routes/settings.php (settings-specific routes)

Frontend (React + TypeScript)

Page components under resources/js/pages/

Shared or specific UI components under resources/js/components/

Development Setup

Clone the repository

Install PHP dependencies:

composer install


Install JavaScript dependencies:

npm install


Compile frontend assets:

npm run dev


Run Laravel server:

php artisan serve

Notes

Coordinate with team members on route and page integration.

Follow the React components structure for UI consistency.

Backend routes are organized in Laravel's routing files according to feature.
