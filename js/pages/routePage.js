/**
 * swamp.lost — Route Page
 *
 * Displays atmospheric lore texts specific to the current swamp region (station 1, 2, or 3).
 */

import { GAME_TEXTS } from '../../content/gameTexts.js';
import { renderPage, createElement, createButton } from '../renderer.js';
import { getState } from '../state.js';
import { navigateTo } from '../router.js';

export function render() {
  const state = getState();
  const stationIndex = state.currentStation;
  const route = GAME_TEXTS.routes[stationIndex];

  renderPage((container) => {
    // Header Info
    const titleEl = createElement('h1', { className: 'title' }, route.title);
    const subtitleEl = createElement('p', { className: 'subtitle' }, route.mainText);

    // Lore Body
    const bodyParagraphs = route.body.map(text => createElement('p', {}, text));
    const bodyContainer = createElement('div', { className: 'route-body' }, bodyParagraphs);

    // Next Action Button
    const nextBtn = createButton(GAME_TEXTS.ui.approachIrrlicht, () => {
      navigateTo('#/gate');
    });

    container.append(titleEl, subtitleEl, bodyContainer, nextBtn);
  });
}
