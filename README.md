# Wireone Assessment

## Prerequisites
To run the project locally or generate APK/IPA, ensure you have the following installed:
- Node.js
- npm or yarn
- Android Studio (for Android emulator) and Xcode (for iOS simulator)
- Expo CLI and EAS CLI (for builds)

---

## Running the Project Locally

#Clone the repository and Install dependencies
npm install

# Start the development server
npx expo start

## Generating APK/IPA

# Install the required global dependencies
npm install -g expo-cli
npm install -g eas-cli

# Log in to your Expo account
eas login

# Generate the APK (Android)
eas build --platform android

# Generate the IPA (iOS)
eas build --platform ios
