# বাজার দর | BazarDor

### A Smarter Way to Track Everyday Market Prices

**BazarDor** is a full-stack web application designed to help users explore and track everyday market prices in one convenient place. With a Bengali-friendly experience and a clean, accessible interface, BazarDor aims to make checking product prices simpler and help users make more informed shopping decisions.

**Live Website:** [Visit BazarDor](https://bazar-dor-price-tracker.vercel.app/)

**GitHub Repository:** [View Source Code](https://github.com/tasdid-ahmed/bazar-dor-price-tracker)

---

## ✨ Key Features

- **📊 Product Price Tracking** — Browse product information and check available market prices to make better-informed purchasing decisions.
- **🔐 Secure Authentication** — Sign up and sign in using email and password, Google, or GitHub through Better Auth.
- **👤 Personalized Profile** — View and update your account information, with profile pictures supported for Google and GitHub accounts.
- **🇧🇩 Bengali-Friendly Experience** — Enjoy a localized interface designed with Bengali-speaking users in mind.
- **📱 Responsive Design** — Access the application through desktop, tablet, and mobile devices with a responsive user interface.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Full-stack React framework and application routing |
| React | Component-based user interface |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling and UI design |
| Better Auth | Authentication and session management |
| MongoDB | Database for application and user data |
| Google OAuth | Google account authentication |
| GitHub OAuth | GitHub account authentication |
| Vercel | Application deployment |

---

## 🚀 Getting Started

Follow these steps to run BazarDor locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)


 VariableEnvironments

Create a .env.local file in the project root by copying .env.example.

Fill in the required values using your own MongoDB connection string, Better Auth secret, and Google and GitHub OAuth credentials.

For OAuth authentication to work locally, configure the appropriate callback URLs in the Google Cloud Console and GitHub OAuth App settings.

Never commit .env.local or share your secret credentials publicly.


### Installation

**1. Clone the repository**

```bash
git clone https://github.com/tasdid-ahmed/bazar-dor-price-tracker.git
```

**2. Navigate to the project directory**

```bash
cd bazar-dor-price-tracker
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and configure the environment variables required by the application, including MongoDB and Better Auth settings, along with the Google and GitHub OAuth credentials.

Never commit real credentials, API secrets, or database connection strings to GitHub.

**5. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Overview

BazarDor is built with a modern full-stack architecture that combines a responsive React interface, Next.js application routing, TypeScript, database integration, and authentication.

The project emphasizes usability, account security, maintainable code, and a localized shopping experience.

---

## 👨‍💻 Author

Developed with ❤️ as a full-stack web development project.

