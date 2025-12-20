# Flight Search App

Frontend flight search application built as a take-home test.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Features

- Display list of flights from API
- Show airline logo, airline name, and flight number
- Show departure and arrival time with airport code
- Show flight duration and baggage allowance
- Display price in IDR format with original price if available

## Filtering

- Filter flights by airline
- Filter flights by price range
- Filter flights by maximum duration
- Filters update results in real time
- Reset filters option

## Sorting

- Recommendation (default from API)
- Lowest Price
- Shortest Duration

## UI & UX

- Responsive layout for desktop and mobile
- Supports light and dark mode based on system preference
- Mobile filter and sort using bottom sheet
- Loading skeleton while fetching data
- Error state with retry action

## Tech Stack

- Next.js
- TypeScript
- Zustand
- Tailwind CSS

## Live URL

[Vercel](https://flight-khaki.vercel.app/)