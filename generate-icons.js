import { generateImages } from 'pwa-asset-generator';

async function generateIcons() {
  try {
    console.log('Generating PWA icons...');
    
    // Generate standard icons
    await generateImages('./public/icon.svg', './public/icons', {
      scrape: false,
      background: '#1a1a1a',
      splashOnly: false,
      iconOnly: true,
      log: false,
      padding: '10%',
      type: 'png',
      quality: 100,
      manifest: false,
      index: false,
      manifestJsonIcon: false,
    });
    
    // Generate Apple specific assets
    await generateImages('./public/icon.svg', './public/icons', {
      scrape: false,
      background: '#1a1a1a',
      splashOnly: false,
      iconOnly: false,
      log: false,
      padding: '10%',
      type: 'png',
      quality: 100,
      manifest: false,
      index: false,
      manifestJsonIcon: false,
      favicon: true,
      pathOverride: '.'
    });

    console.log('✅ PWA icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
  }
}

generateIcons();
