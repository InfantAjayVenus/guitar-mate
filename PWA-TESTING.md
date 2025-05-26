# Guitar Mate PWA Testing Guide

This guide will help you test the Progressive Web App (PWA) features of Guitar Mate.

## Requirements

- A modern web browser (Chrome, Edge, Firefox, Safari)
- For full PWA functionality, use Chrome or Edge on desktop, or any modern browser on mobile

## Testing PWA Installation

1. **Desktop Installation**:
   - Open the Guitar Mate app in Chrome or Edge
   - Look for the install icon in the address bar (or the 3-dot menu)
   - Click "Install" to add Guitar Mate as a desktop app
   - Verify the app launches in its own window without browser UI

2. **Mobile Installation**:
   - Open the Guitar Mate app in your mobile browser
   - On iOS: Tap the share button, then "Add to Home Screen"
   - On Android: Look for the "Add to Home Screen" prompt or menu option
   - Verify the app launches from your home screen with a full-screen experience

## Testing Offline Functionality

1. **Offline Access**:
   - Open the Guitar Mate app while online
   - Navigate through different screens to ensure assets are cached
   - Enable airplane mode or disconnect from the internet
   - Refresh the app or close and reopen it
   - Verify the app still functions properly without an internet connection

2. **Offline Features**:
   - Test the metronome with different settings while offline
   - Test the practice timer while offline
   - Verify settings are saved while offline

## Testing Update Notifications

1. **Update Process**:
   - When a new version is deployed, open the app if it's already installed
   - Look for an update notification toast at the bottom of the screen
   - Click "Update Now" to apply the update
   - Verify the app reloads with the new version

## Known PWA Limitations

- Safari on iOS has limited support for some PWA features
- Background sync may not work on all platforms
- Push notifications are not supported in all browsers

## Reporting Issues

If you encounter any issues with the PWA functionality, please report them with:
- Device type and operating system
- Browser name and version
- Steps to reproduce the issue
- What you expected to happen
- What actually happened

## PWA Features Implemented

- ✅ Installable to home screen/desktop
- ✅ Works offline after initial load
- ✅ Update notifications
- ✅ Responsive design for all devices
- ✅ App-like experience with no browser UI when installed
