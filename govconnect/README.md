# GovConnect

**One Platform. Every Citizen Service.**

GovConnect is a unified citizen-facing platform that helps users discover government schemes, explore job opportunities, manage important documents securely, and get AI-assistance preparing grievances.

## Overview
This project represents the complete frontend architecture for the GovConnect platform. It is built as a production-quality, responsive web application ready for future integration with a Node.js/PostgreSQL backend, OCR, semantic matching, and LLM services.

## Features
- **Global Identity**: Unified citizen profile to serve as the single source of truth for eligibility matching.
- **Scheme Discovery**: Personalized scheme matching with visual eligibility checklists.
- **Government Jobs**: Discover relevant vacancies and track approaching deadlines.
- **Document Vault**: A local preview of a secure document manager with OCR processing states.
- **Grievance Workflow**: AI-assisted grievance drafting that classifies the issue and directs the citizen to the correct official portal.
- **AI Assistant**: A conversational interface for answering queries about government services.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Utilities**: `clsx`, `tailwind-merge`

## Project Structure
```text
src/
├── components/
│   ├── layout/      # Public and Dashboard layouts, Navbar, Footer, Sidebar
│   ├── ui/          # Reusable design system components (Button, etc.)
├── pages/
│   ├── public/      # Landing page, About, Services
│   ├── auth/        # Login, Register
│   ├── dashboard/   # Overview, Profile, Schemes, Jobs, Documents, Grievances, Assistant
├── utils/           # Utility functions (e.g. tailwind class merger)
```

## Running Locally

1. Clone the repository and navigate to the project root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## Future Architecture
The current implementation utilizes mock data and local state to demonstrate the UI/UX flows.
The frontend is architected with a separation of concerns, meaning the UI components are decoupled from the data fetching layer. 
When the backend REST API is available, the service hooks will be wired up to communicate with standard authentication, database (PostgreSQL), and AI service endpoints without requiring a major rewrite of the UI.

## Security Considerations
- The frontend prototype clearly designates the boundary between GovConnect and official government portals.
- CAPTCHA, OTP, and final official submissions are deliberately **not** bypassed.
- No real sensitive secrets are exposed in this repository.

## License
MIT License
