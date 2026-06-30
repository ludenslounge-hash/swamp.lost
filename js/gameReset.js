/**
 * swamp.lost — Game Reset
 *
 * Shared reset behavior for manual restarts and kiosk inactivity timeouts.
 */

import { resetState } from './state.js';

export const INACTIVITY_RESET_MS = 600000;

const HOME_ROUTE = '#/intro';
const ACTIVITY_EVENTS = ['mousemove', 'click', 'keydown', 'touchstart', 'scroll'];
const GAME_LOCAL_STORAGE_KEYS = ['swampLostPathSaveNumber'];

let inactivityTimeoutId = null;

/**
 * Clear all game progress and return to the homepage/start screen.
 */
export function resetGame() {
  resetState();
  clearGameLocalStorage();

  if (window.location.hash !== HOME_ROUTE) {
    window.location.hash = HOME_ROUTE;
  }
}

/**
 * Start the kiosk inactivity reset timer.
 * @returns {function} cleanup function for event listeners and timeout
 */
export function initInactivityReset() {
  const restartTimer = () => {
    if (inactivityTimeoutId !== null) {
      window.clearTimeout(inactivityTimeoutId);
    }

    inactivityTimeoutId = window.setTimeout(() => {
      resetGame();
      inactivityTimeoutId = null;
    }, INACTIVITY_RESET_MS);
  };

  ACTIVITY_EVENTS.forEach((eventName) => {
    window.addEventListener(eventName, restartTimer, { passive: true });
  });

  restartTimer();

  return () => {
    if (inactivityTimeoutId !== null) {
      window.clearTimeout(inactivityTimeoutId);
      inactivityTimeoutId = null;
    }

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.removeEventListener(eventName, restartTimer);
    });
  };
}

function clearGameLocalStorage() {
  GAME_LOCAL_STORAGE_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Failed to clear ${key} from localStorage`, e);
    }
  });
}
