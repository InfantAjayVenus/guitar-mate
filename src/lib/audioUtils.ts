const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
let activeOscillator: OscillatorNode | null = null;
let activeGainNode: GainNode | null = null;

export function stopSound() {
  if (activeGainNode) {
    activeGainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.02);
    setTimeout(() => {
      if (activeOscillator) {
        activeOscillator.stop();
        activeOscillator.disconnect();
        activeOscillator = null;
      }
      if (activeGainNode) {
        activeGainNode.disconnect();
        activeGainNode = null;
      }
    }, 50);
  }
}

export function playSound(type: 'accent' | 'normal') {
  // Stop any currently playing sound
  stopSound();
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // Set frequency and type based on accent or normal beat
  oscillator.frequency.value = type === 'accent' ? 1000 : 800;
  oscillator.type = 'sine';
  
  // Set gain value based on beat type
  gainNode.gain.value = type === 'accent' ? 0.3 : 0.2;
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Quick attack
  gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
  
  // Quick decay
  gainNode.gain.exponentialRampToValueAtTime(
    0.001, 
    audioContext.currentTime + 0.05
  );
  
  // Store active nodes
  activeOscillator = oscillator;
  activeGainNode = gainNode;
  
  // Start the oscillator
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.05);
}

export function initAudio() {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}