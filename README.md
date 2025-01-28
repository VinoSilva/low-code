# Vite React Project

This is a simple React project bootstrapped with [Vite](https://vitejs.dev/), a fast and modern frontend build tool.

---

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v16+ recommended)  
  [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** (optional)  
  [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

---

## Getting Started

Follow these steps to set up and run the project locally:

## Cloning and running the project

```bash
git clone <repository-url>

cd <project-directory>

npm install/yarn install

npm run dev/yarn run dev

```

The development server will start, and you can view the app at:
http://localhost:5173

## Building the project

```bash
npm run build/yarn build
```

## Project Structure
```bash
├── src/                # Application source code
│   ├── pages/          # Top-level pages representing routes in the application
│   ├── components/     # Reusable React components used across the application
│   ├── services/       # API calls or utility functions for external interactions
│   ├── types/          # TypeScript type definitions and interfaces
│   ├── features/       # Redux slices and reducers for managing application state
│   ├── data/           # Static or mock data used in the application
│   ├── context/        # React Contexts for managing shared application state
│   ├── constants/      # Application-wide constants (e.g., URLs, action types)
│   ├── store/          # Redux store configuration
│   ├── utility/        # Helper functions and utility modules used throughout the application
│   ├── servers/        # Mock server setup for simulating APIs during development
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point for the application
├── public/             # Public files served as-is
├── package.json        # Project metadata and scripts
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

## Assumptions Made
```bash
1. A node output can only connect to only one node's input
2. The output of one node is not passed as another node's input
3. No third party library is meant to be used
```

## Key Architectural Decisions
Most components are composite components, for example Nodes have a base class
Custom Nodes: All nodes extend from a BaseNode (Node.tsx) for consistency and shared functionality. For example, EmailNode, LogNode and Math Node wrap the BaseNode (Node.tsx)
Similarly, for Edge. There is the base Edge.tsx class and there are composite versions of it for example draw edge where it tracks mouse movement to simulate drawing. There is also the NodeEdge version where we pass in the ids of the two nodes and it will get the element position and pass it to Edge. Both of these are composite components.

Modular Components: Each component (Nodes, Edges, and other sharable across pages component) are reusable and designed to follow the Single Responsibility Principle. For example, 

## Notes
Only a simple app render debug was done for the test due time constraint

## Future Improvements
1. Breaking down components further in Canvas.tsx
2. More smoother node movements
3. Bezier curve for line drawing
4. Make custom table component which takes in columns and dataSource as props (the current one is basic)
5. Auto scroll to node when executing flow
6. Pagination for logs