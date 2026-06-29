/**
 * swamp.lost — Background Audio
 *
 * Starts the ambient loop after the first user gesture so browsers allow playback.
 */

const BACKGROUND_AUDIO_SRC = 'assets/images/05.wav';
const BACKGROUND_AUDIO_VOLUME = 0.45;

let backgroundAudio;
let hasStarted = false;

function removeStartListeners() {
  window.removeEventListener('pointerdown', startBackgroundAudio);
  window.removeEventListener('keydown', startBackgroundAudio);
  window.removeEventListener('touchstart', startBackgroundAudio);
}

async function startBackgroundAudio() {
  if (!backgroundAudio || hasStarted) return;

  try {
    await backgroundAudio.play();
    hasStarted = true;
    removeStartListeners();
  } catch (error) {
    // Keep the listeners active so another user gesture can retry playback.
  }
}

/**
 * Prepare the looping background audio for the whole SPA.
 */
export function initBackgroundAudio() {
  if (backgroundAudio) return;

  backgroundAudio = new Audio(BACKGROUND_AUDIO_SRC);
  backgroundAudio.loop = true;
  backgroundAudio.preload = 'auto';
  backgroundAudio.volume = BACKGROUND_AUDIO_VOLUME;
  backgroundAudio.setAttribute('playsinline', '');

  window.addEventListener('pointerdown', startBackgroundAudio);
  window.addEventListener('keydown', startBackgroundAudio);
  window.addEventListener('touchstart', startBackgroundAudio, { passive: true });
}
