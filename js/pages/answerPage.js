/**
 * swamp.lost — Answer Page
 *
 * Compares the player's thoughts with the Irrlicht's predefined revelation, providing cognitive friction.
 */

import { getState } from '../state.js';
import { GAME_TEXTS } from '../../content/gameTexts.js';
import { renderPage, createElement, createButton, createTextBox } from '../renderer.js';
import { navigateTo } from '../router.js';

export function render() {
  const state = getState();
  const stationIndex = state.currentStation;
  const qIndex = state.stations[stationIndex].selectedQuestion;
  const playerAnswerText = state.stations[stationIndex].playerAnswer;

  // Route guard
  if (qIndex === null || qIndex === undefined) {
    navigateTo('#/gate');
    return;
  }

  const irrlicht = GAME_TEXTS.irrlichter[stationIndex];
  const qa = irrlicht.questions[qIndex];

  renderPage((container) => {
    const titleEl = createElement('h1', { className: 'title' }, `Revelation ${stationIndex}`);

    // Section 1: The Question
    const qHeader = createElement('h2', { className: 'section-title' }, "The Question");
    const qBox = createTextBox(qa.question, 'question');

    // Section 2: Player's response
    const pHeader = createElement('h2', { className: 'section-title' }, "Your Reflections");
    const pBox = createTextBox(playerAnswerText || "Skipped", 'answer');

    // Section 3: Irrlicht Answer
    const iHeader = createElement('h2', { className: 'section-title' }, "The Irrlicht's Truth");
    const iBox = createTextBox(qa.answer, 'question'); // standard color text-box

    // Action button to continue to decision
    const nextBtn = createButton(GAME_TEXTS.ui.continueButton, () => {
      navigateTo('#/decision');
    });

    container.append(titleEl, qHeader, qBox, pHeader, pBox, iHeader, iBox, nextBtn);
  });
}
