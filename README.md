# Mongoose Associations & Testing Sandbox

A Node.js application demonstrating MongoDB relational data modeling using Mongoose schemas (Users, BlogPosts, and Comments). This project features a robust automated testing suite managed via Mocha and continuous integration through GitHub Actions.

## 🚀 Key Features

- **Data Relations**: Deep population graphs mapping Users ➔ BlogPosts ➔ Comments.
- **Cascading Deletes**: Mongoose middleware (`pre-deleteOne`) to automatically clean up dangling database references.
- **Continuous Integration**: GitHub Actions workflow to automatically test every Pull Request before merging.
- **Live Test Bed**: Configured with automated file-watching for rapid local development.

---

## 🛠️ Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org) (v20 or higher recommended)
- [MongoDB](https://mongodb.com) (Running locally on port `27017`)

---

## 📦 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/robinjos333/mongo-schema-tests.git>
   cd users
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 💻 Available Scripts

Run these commands from the root directory of your project:

### Run Tests (Once)

Executes the Mocha test suite a single time and exits. Used by the CI pipeline.

```bash
npm test
```

### Run Tests (Watch Mode)

Keeps the terminal open and automatically reruns your tests every time you save a file. Ideal for active development.

```bash
npm run test:watch
```

---

## 🧪 CI/CD Automation

This project uses **GitHub Actions** to enforce code quality:

- **Trigger**: Every Pull Request targeted at the `main` or `master` branches.
- **Environment**: Automatically provisions an isolated Ubuntu runner with a live MongoDB test database instance.
- **Protection**: Branch protection rules block merging if the test runner returns a failing state.
