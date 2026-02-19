# Pikmin Manager 🍃

A high-performance, mobile-first collection tracker for **Pikmin Bloom**, designed with a clean, modern aesthetic inspired by high-end analytics dashboards and study trackers.

## ✨ Features

- **Responsive UI/UX**: Seamless transitions between a desktop sidebar and a mobile-friendly bottom navigation bar.
- **Smart Data Entry**:
    - Complete support for all Decor Categories (30+ types).
    - **Yellow Pikmin Pun Generator**: Automatically suggests "Yell-" puns when naming yellow seedlings.
    - Status tracking: Manage lifecycle from Seedling to Pikmin to full Decor.
- **Analytics Dashboard**:
    - Real-time metric cards showing Total Count, Seedling Count, and Decor Completion %.
    - Advanced filtering by Color, Decor Category, and Current Status.
- **Data Management**:
    - Full Edit/Delete functionality via modern modals.
    - Persistent data using `localStorage` (no backend required).
- **Aesthetic Design**: Built with Tailwind CSS, Font Awesome, and the "Plus Jakarta Sans" typeface for a premium look and feel.

## 🛠️ Technical Stack

- **Framework**: [React 19](https://react.dev/) (loaded via ESM modules)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Font Awesome 6](https://fontawesome.com/)
- **State Management**: React Hooks (`useState`, `useMemo`, `useEffect`)
- **Persistence**: Browser `localStorage` API

## 🚀 Getting Started

Since this project uses modern ES modules and Import Maps, it is best viewed via a local development server.

### Option 1: Using a local server (Recommended)
If you have Python or Node.js installed, run one of the following in the project root:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```
Then visit `http://localhost:8000` (or the port provided).

### Option 2: Direct Open
In some modern browsers, you can simply open `index.html` directly, though some features related to ES modules might require a server context depending on your security settings.

## 📱 Mobile Optimization
The app is specifically tuned for iPhone and Android devices. For the best experience on mobile:
1. Open the URL in Safari or Chrome.
2. Use "Add to Home Screen" to use it like a native Progressive Web App (PWA).

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---
*Disclaimer: This is a fan-made tool and is not affiliated with Nintendo or Niantic.*
