# All‑in‑One Calculator (Web)

A clean, responsive calculator app with these modules:

- Basic Calculator
- Unit Converter
- Currency Converter (via exchangerate.host)
- Discount Calculator
- Tip Calculator
- Date Calculator
- GPA Calculator (4.0 scale)
- Loan Calculator
- BMI Calculator

## Quick Start (Web)
No build step required — it's a static site.

1. Open `index.html` directly in your browser **or**
2. Serve locally:
   ```bash
   cd simple-calculator-app
   python3 -m http.server 5173
   # then open http://localhost:5173
   ```

## Ship as Android APK (Optional, with Capacitor)
This wraps the web app in a native WebView. You need Node.js, Capacitor CLI, and Android Studio.

```bash
# From this folder
npm init -y  # if package.json is missing
npm i @capacitor/core @capacitor/cli
npx cap init all-in-one-calculator com.example.calculator --web-dir=.
npx cap add android
npx cap sync

# Open the Android project in Android Studio
npx cap open android
# Build an APK from Android Studio: Build > Build Bundle(s)/APK(s) > Build APK(s)
```

Tips:
- Replace app icon by updating `android/app/src/main/res/mipmap-*` assets in Android Studio.
- Enable internet permission in `AndroidManifest.xml` for live currency rates (usually added by default).

## Notes
- Currency rates require an internet connection.
- GPA mapping uses a 4.0 scale; adjust in `js/modules/gpa.js` if needed.
- The whole app runs client-side and stores nothing on a server.
