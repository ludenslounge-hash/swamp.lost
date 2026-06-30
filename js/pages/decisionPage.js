/**
 * swamp.lost — Decision Page
 *
 * Prompts the player to make their choice: either follow the wisp or go on past it.
 */

import { getState, applyDecision, setCurrentStation } from '../state.js';
import { GAME_TEXTS } from '../../content/gameTexts.js';
import { renderPage, createElement, createButton } from '../renderer.js';
import { navigateTo } from '../router.js';

export function render() {
  const state = getState();
  const stationIndex = state.currentStation;
  const decisionTexts = GAME_TEXTS.decisions;

  renderPage((container) => {
    const titleEl = createElement('h1', { className: 'title' }, `Choose your path`);
    const instructionEl = createElement('p', { className: 'subtitle' }, `Do you trust the signal?`);

    // Decisions choices buttons
    const handleChoice = (choice) => {
      applyDecision(stationIndex, choice);

      if (stationIndex < 3) {
        setCurrentStation(stationIndex + 1);
        navigateTo('#/route');
      } else {
        navigateTo('#/result');
      }
    };

    const followBtn = createButton(decisionTexts.followLabel, () => handleChoice('follow'));
    const goOnBtn = createButton(decisionTexts.goOnLabel, () => handleChoice('goOn'));
    const btnGroup = createElement('div', { className: 'btn-group' }, [followBtn, goOnBtn]);

    container.append(titleEl, instructionEl, btnGroup);
  });
}
