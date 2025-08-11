#!/usr/bin/env bash
set -e
# Fast path to produce a debug APK locally.
# Prereqs: Node.js (18+), Java 17, Android SDK, Capacitor CLI.
npm i @capacitor/core @capacitor/cli --no-audit --no-fund
npx cap sync android
cd android
./gradlew assembleDebug
echo "APK should be at android/app/build/outputs/apk/debug/app-debug.apk"
