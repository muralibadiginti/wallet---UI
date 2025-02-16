# Angular Transactions Application

This project is an Angular application demonstrating a modern, professional transaction management system built with Angular and Angular Material. It includes two main components:

- **Transactions Component:** Displays a list of transactions with sorting, pagination, and chip-based styling (green for credits and red for debits).
- **Make Transaction Component:** Provides a wallet details view and a form to perform transactions. This component features advanced UI elements such as button toggles, shimmer (loading) effects, and Angular Material SnackBar notifications for success/error feedback.

---

## Features

- **Transactions Component:**
  - A responsive table displaying transaction history.
  - Sorting and pagination with a polished design.
  - Visual cues (using colored chips) to indicate credit and debit entries.
  - Hover effects and animations for an enhanced user experience.

- **Make Transaction Component:**
  - Displays wallet details (name and balance) fetched from the backend.
  - A professional, animated transaction form with input fields and toggle buttons.
  - Loading indicator (shimmer effect) during transaction processing.
  - SnackBar notifications (toasters) to inform users of transaction success or failure.
  - Modern layout and styling using Angular Material's latest design trends.

- **Technologies:**
  - Angular (with standalone components)
  - Angular Material
  - RxJS
  - Responsive CSS with animations and advanced UI effects

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Angular CLI](https://angular.io/cli) (v12 or later)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/angular-transactions-app.git
   cd angular-transactions-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   ng serve
   ```
   Open your browser and navigate to [http://localhost:4200](http://localhost:4200) to see the application in action.

---

## Project Structure

# WalletUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
