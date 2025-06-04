# React Native Mobile App

This directory contains a minimal React Native client for the FastAPI video call backend.

## Setup

1. Ensure you have the React Native CLI installed and Android/iOS development environments configured. Refer to the [React Native docs](https://reactnative.dev/docs/environment-setup).
2. Install dependencies:
   ```bash
   npm install
   ```

## Running

- **Android**: from this directory, run:
  ```bash
  npm run android
  ```
- **iOS** (macOS only):
  ```bash
  npm run ios
  ```

The app expects the FastAPI server to be running locally at `ws://localhost:8000`. Update `SIGNAL_URL` in `App.js` if your backend runs elsewhere.
