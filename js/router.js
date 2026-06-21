/**
 * swamp.lost — Router
 *
 * Hash-based client-side routing. Works locally (file://) and keeps state sync.
 */

import { getState, setPhase } from './state.js';
import * as introPage from './pages/introPage.js';
import * as routePage from './pages/routePage.js';
import * as gatePage from './pages/gatePage.js';
import * as questionPage from './pages/questionPage.js';
import * as answerPage from './pages/answerPage.js';
import * as decisionPage from './pages/decisionPage.js';
import * as resultPage from './pages/resultPage.js';

const routes = {
  '#/intro': introPage,
  '#/route': routePage,
  '#/gate': gatePage,
  '#/question': questionPage,
  '#/answer': answerPage,
  '#/decision': decisionPage,
  '#/result': resultPage
};

/**
 * Navigate to a specific hash route.
 * @param {string} hash 
 */
export function navigateTo(hash) {
  window.location.hash = hash;
}

/**
 * Handle routing when hash changes.
 */
function handleRouteChange() {
  const hash = window.location.hash || '#/intro';
  const pageModule = routes[hash];
  
  if (pageModule && typeof pageModule.render === 'function') {
    const phase = hash.replace('#/', '');
    setPhase(phase);
    pageModule.render();
  } else {
    // Fallback to intro
    navigateTo('#/intro');
  }
}

/**
 * Initialize the router and sync current view with stored state phase.
 */
export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  
  const state = getState();
  const targetHash = `#/${state.phase || 'intro'}`;
  
  if (window.location.hash !== targetHash) {
    navigateTo(targetHash);
  } else {
    handleRouteChange();
  }
}
