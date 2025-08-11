# Build an Android APK (CI)
This repo includes a GitHub Actions workflow that builds a **debug** APK.

## Steps
1. Push this folder to a GitHub repo.
2. Go to **Actions** → run **Android APK (Debug)** (or push to `main`).
3. After it finishes, download `app-debug.apk` from the workflow artifacts.

## Local build
Prereqs: Node.js 18+, Java 17, Android SDK / platform tools.
```bash
bash scripts/build-android.sh
```
APK path (after build):
`android/app/build/outputs/apk/debug/app-debug.apk`
