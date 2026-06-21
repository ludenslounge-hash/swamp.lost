/**
 * swamp.lost — Route Page
 *
 * Displays atmospheric lore texts specific to the current swamp region (station 1, 2, or 3).
 */

import { GAME_TEXTS } from '../../content/gameTexts.js';
import { renderPage, createElement, createButton } from '../renderer.js';
import { getState } from '../state.js';
import { navigateTo } from '../router.js';

const SHADOW_MODIFIERS = {
  1: 'irrlicht-shadow--slop-seas',
  2: 'irrlicht-shadow--fog-bank',
  3: 'irrlicht-shadow--corpse-reefs'
};

export function render() {
  const state = getState();
  const stationIndex = state.currentStation;
  const route = GAME_TEXTS.routes[stationIndex];
  const irrlicht = GAME_TEXTS.irrlichter[stationIndex];

  renderPage((container) => {
    // Ghostly background shadow element
    const shadowModifier = SHADOW_MODIFIERS[stationIndex] || '';
    const shadowImg = createElement('img', {
      className: `irrlicht-shadow ${shadowModifier}`,
      src: irrlicht.image,
      alt: '' // Decorative, hidden from assistive tech
    });

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

    container.append(shadowImg, titleEl, subtitleEl, bodyContainer, nextBtn);
  });
}
