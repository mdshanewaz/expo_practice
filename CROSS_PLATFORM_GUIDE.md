# Cross-Platform Development Guide

## Your Project Setup

Your Expo project is already configured to build for:
- ✅ **iOS** (iPhone/iPad)
- ✅ **Android** (Phones/Tablets)
- ✅ **Web** (Browsers)

All platforms share the **same codebase** located in the `app/` directory!

## Running Your App

### For Development

1. **Start the development server:**
   ```bash
   npm start
   # or
   npx expo start
   ```

2. **Choose your platform:**
   - Press `w` to open in **web browser**
   - Press `a` to open in **Android emulator**
   - Press `i` to open in **iOS simulator**

### Platform-Specific Commands

```bash
# Web only
npm run web

# Android only
npm run android

# iOS only (macOS only)
npm run ios
```

## How Cross-Platform Works

Expo uses:
- **React Native** for iOS and Android (native components)
- **React Native Web** for web browsers (HTML/CSS rendering)
- **Expo Router** for file-based navigation (works on all platforms)

## Writing Cross-Platform Code

### 1. Shared Components (Recommended)

Most of your code will work on all platforms automatically:

```tsx
// app/components/Button.tsx - Works on all platforms!
import { View, Text, Pressable } from 'react-native';

export function Button({ title, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={{ padding: 16, backgroundColor: 'blue' }}>
        <Text style={{ color: 'white' }}>{title}</Text>
      </View>
    </Pressable>
  );
}
```

### 2. Platform-Specific Code

When you need platform-specific behavior, use the `Platform` API:

```tsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'web' ? 20 : 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
      },
    }),
  },
});
```

### 3. Platform-Specific Files

Create platform-specific versions using file extensions:

```
components/
  MyComponent.tsx          # Default (all platforms)
  MyComponent.ios.tsx      # iOS only
  MyComponent.android.tsx # Android only
  MyComponent.web.tsx     # Web only
```

### 4. Conditional Rendering

```tsx
import { Platform } from 'react-native';

function MyComponent() {
  return (
    <View>
      {Platform.OS === 'web' && <div>Web-specific content</div>}
      {Platform.OS !== 'web' && <NativeComponent />}
    </View>
  );
}
```

## Best Practices

### ✅ Do's

1. **Use React Native components** (`View`, `Text`, `Image`, etc.) - they work everywhere
2. **Test on all platforms** during development
3. **Use `Platform.select()`** for platform-specific styles
4. **Use Expo APIs** for features (they handle cross-platform automatically)
5. **Keep platform-specific code minimal**

### ❌ Don'ts

1. **Don't use web-only APIs** directly (use Expo's abstractions)
2. **Don't assume web behavior** on mobile (touch vs mouse)
3. **Don't use `window` or `document`** directly (use Platform checks)

## Building for Production

### Web

```bash
# Build static web files
npx expo export:web

# Or build with a bundler
npx expo export --platform web
```

Output will be in the `web-build/` directory.

### Mobile Apps

```bash
# iOS (requires macOS and Xcode)
eas build --platform ios

# Android
eas build --platform android

# Both
eas build --platform all
```

## Platform Detection Utilities

Your project already has some platform utilities. Check:
- `hooks/use-color-scheme.ts` - Has a web-specific version
- `hooks/use-color-scheme.web.ts` - Web implementation

## Common Patterns

### Responsive Design

```tsx
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isMobile = width < 768;
```

### Web-Specific Navigation

```tsx
import { Platform } from 'react-native';
import { router } from 'expo-router';

// On web, you might want to use browser history
if (Platform.OS === 'web') {
  window.history.pushState({}, '', '/new-route');
} else {
  router.push('/new-route');
}
```

### Safe Areas

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

// Works on iOS, Android, and handles web gracefully
<SafeAreaView style={{ flex: 1 }}>
  {/* Your content */}
</SafeAreaView>
```

## Testing Checklist

- [ ] Test on iOS simulator/device
- [ ] Test on Android emulator/device
- [ ] Test on web browsers (Chrome, Firefox, Safari)
- [ ] Test responsive layouts (mobile/tablet/desktop)
- [ ] Test navigation flows
- [ ] Test platform-specific features

## Resources

- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [Expo Router](https://docs.expo.dev/router/introduction/)

---

**Happy cross-platform coding! 🚀**

