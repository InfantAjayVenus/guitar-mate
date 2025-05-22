#!/usr/bin/env node

/**
 * Guitar Mate PWA Setup Script
 * 
 * This script automates the process of setting up and testing the Guitar Mate PWA.
 * It performs the following steps:
 * 1. Generates PWA icons
 * 2. Builds the PWA
 * 3. Starts a preview server
 */

const { execSync } = require('child_process');
const path = require('path');
const readline = require('readline');
const os = require('os');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('📱 Guitar Mate PWA Setup and Testing\n');

// Function to run a command and return its output
function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Step 1: Generate icons
console.log('\n🖼️  Step 1: Generating PWA Icons...');
if (!runCommand('npm run generate-icons')) {
  console.error('Failed to generate icons. Please check the error above.');
  process.exit(1);
}

// Step 2: Build PWA
console.log('\n🛠️  Step 2: Building PWA...');
if (!runCommand('npm run build:pwa')) {
  console.error('Failed to build PWA. Please check the error above.');
  process.exit(1);
}

// Step 3: Start preview server
console.log('\n🚀 Step 3: Starting Preview Server...');
console.log('The preview server will start. Use Ctrl+C to stop it when finished testing.');
console.log('');
console.log('PWA Testing Instructions:');
console.log('1. Open the URL shown in the terminal in Chrome or Edge');
console.log('2. Look for the install prompt in the address bar');
console.log('3. Test offline functionality by toggling network in DevTools');
console.log('');

// Determine the likely local IP address for testing on other devices
const networkInterfaces = os.networkInterfaces();
let localIp = 'localhost';

// Find a non-internal IPv4 address
Object.keys(networkInterfaces).forEach((ifname) => {
  networkInterfaces[ifname].forEach((iface) => {
    if (!iface.internal && iface.family === 'IPv4') {
      localIp = iface.address;
    }
  });
});

console.log(`📝 For mobile testing, use: http://${localIp}:4173`);
console.log('');

// Start the preview server
runCommand('npm run preview:pwa');
