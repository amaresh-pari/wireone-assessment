# Wireone Assessment

## Prerequisites

To run the project locally or generate APK/IPA, ensure you have the following installed:

- Node.js
- npm or yarn
- Android Studio (for Android emulator) and Xcode (for iOS simulator)
- Expo CLI and EAS CLI (for builds)

---

## Running the Project Locally

### Clone the repository and Install dependencies

npm install

### Start the development server

npx expo start

## Generating APK/IPA

### Install the required global dependencies

npm install -g expo-cli
npm install -g eas-cli

### Log in to your Expo account

eas login

### Generate the APK (Android)

eas build --platform android --profile production

### Generate the IPA (iOS)

eas build --platform ios --profile production

## Screenshot

<img width="1440" alt="Screenshot 2024-11-15 at 7 10 51 PM" src="https://github.com/user-attachments/assets/a6d0b401-a1e4-432b-84ae-8614e52b997f">

<img width="1440" alt="Screenshot 2024-11-15 at 7 11 12 PM" src="https://github.com/user-attachments/assets/26033664-0bdb-4dcf-824d-e689b24766fc">
