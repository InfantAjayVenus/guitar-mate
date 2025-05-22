# Guitar Mate

A metronome app with additional features for guitar practice. The app includes a visual metronome, adjustable time signatures, and a timer feature.

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/InfantAjayVenus/guitar-mate)

## Features

- **Metronome**: Visual and audio metronome with adjustable BPM
- **Time Signatures**: Support for various time signatures (2/4, 3/4, 4/4, etc.)
- **Timer**: Practice timer that can be used alongside the metronome
- **Tap Tempo**: Set the tempo by tapping a button
- **Progressive Web App**: Install on your device and use offline

## PWA Features

Guitar Mate is a Progressive Web App (PWA), which means you can:

- Install it on your device (mobile or desktop)
- Use it offline without an internet connection
- Receive notifications for updates
- Get an app-like experience 

For details on how to test PWA functionality, see [PWA-TESTING.md](PWA-TESTING.md).

## Development

This project is built with React, TypeScript, and Vite. To run it locally:

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

You can also trigger a manual deployment from the GitHub Actions tab.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.