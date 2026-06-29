/**
 * swamp.lost — Application Bootstrap
 *
 * Single entry point that initializes the SPA routing on DOM load.
 */

import { initRouter } from './router.js';
import { initBackgroundAudio } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundAudio();
  initRouter();
});
