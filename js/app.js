/**
 * swamp.lost — Application Bootstrap
 *
 * Single entry point that initializes the SPA routing on DOM load.
 */

import { initRouter } from './router.js';
import { initBackgroundAudio } from './audio.js';
import { initInactivityReset, resetGame } from './gameReset.js';

const HOME_ROUTE = '#/intro';

function initResetButton() {
  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.className = 'reset-game-button';
  resetButton.textContent = 'Reset Game';
  resetButton.addEventListener('click', resetGame);
  document.body.appendChild(resetButton);

  const updateResetButtonVisibility = () => {
    resetButton.hidden = (window.location.hash || HOME_ROUTE) === HOME_ROUTE;
  };

  window.addEventListener('hashchange', updateResetButtonVisibility);
  updateResetButtonVisibility();
}

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundAudio();
  initResetButton();
  initInactivityReset();
  initRouter();
});
