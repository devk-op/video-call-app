# Video Call App

A real-time video call application built using **FastAPI** and **WebRTC**.

## Features
- Real-time video and audio communication.
- Room-based communication for multiple users.
- WebSocket-based signaling server for peer-to-peer connection setup.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/devk-op/video-call-app.git
   cd video-call-app
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python main.py
   ```

4. Open the app in your browser:
   ```
   http://localhost:8000
   ```

## File Structure
```
video-call-app/
├── static/                 # Static files (HTML, CSS, JS)
├── main.py                 # FastAPI backend with WebSocket signaling
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```

## Technologies Used
- **FastAPI**: Backend framework for WebSocket signaling.
- **WebRTC**: Real-time video and audio communication.
- **HTML/CSS/JavaScript**: Frontend for user interaction.

## Mobile App (React Native)
A minimal React Native client is available in the `mobile` directory.

### Build
1. Install Node.js and the React Native CLI.
2. From `mobile/`, install dependencies with `npm install`.
3. Start the Metro bundler:
   ```bash
   npm start
   ```
4. In another terminal run:
   - **Android**: `npm run android`
   - **iOS**: `npm run ios`

This will build the respective native projects found in `mobile/android` and `mobile/ios`.
