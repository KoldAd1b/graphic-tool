# Graphic Design Editor

A powerful, browser-based **Graphic Design Editor** built with **TypeScript** and **SQL** for intuitive graphic creation and manipulation. This editor allows users to create, edit, and save graphic designs with a smooth, user-friendly interface.

## Features

- **Customizable Canvas**: Resize and customize your canvas with ease.
- **Shape and Text Tools**: Add and edit shapes, text, and images.
- **Layer Management**: Intuitive layer system for precise design control.
- **Save and Load Designs**: Save your work to a database and reload it anytime.
- **Export Designs**: Export your designs to popular formats like PNG, JPG, or SVG.
- **Undo/Redo System**: Effortlessly undo and redo actions to improve your workflow.
- **SQL Backend**: Store user data and designs in a robust postgres database.

## Tech Stack

- **Backend**: NextJS
- **Database**: SQL (Neon-Postgres)
- **Authentication**: Auth-js
- **Hosting**: Deployed on Vercel

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KoldAd1b/graphic-tool.git
   ```

2. Navigate to the project directory:

   ```bash
   cd graphic-tool
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the database:

   - Create a SQL database (e.g., PostgreSQL).
   - Run the SQL migration files located in the `db/schema` directory to set up the necessary tables.

5. Set up environment variables:

   Create a `.env` file in the root directory with the configurations available the example.env file

6. Start the application:

   ```bash
   npm run dev
   ```

## Deployment

Application deployed on : `https://graphic-tool.vercel.app`

## Usage

1. Open your browser and navigate to `http://localhost:your-port`.
2. Create an account or log in.
3. Start designing by selecting tools from the toolbar.
4. Save your work to the database and export your designs!
