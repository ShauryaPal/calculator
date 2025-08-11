# GitHub Setup & Android APK CI

This repo is ready to build an **Android debug APK** via GitHub Actions.

## 1) Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
# create an empty repo on GitHub, then:
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 2) Build the APK in GitHub Actions
- Go to your repo → **Actions** → run **Android APK (Debug)**.
- After it finishes, download the artifact: `app-debug.apk`.

## Local Build (optional)
```bash
npm i @capacitor/core @capacitor/cli
npx cap sync android
npx cap open android
# In Android Studio: Build → Build Bundle(s)/APK(s) → Build APK(s)
# Or CLI: cd android && ./gradlew assembleDebug
```

## Customization
- Change app id/name in `capacitor.config.json`
- Change package name in Capacitor (`appId`), then `npx cap sync android`
- Replace icons in `android/app/src/main/res/mipmap-*` after Android project is generated
