/**
 * swamp.lost — Question Page
 *
 * Displays the Irrlicht portrait, its question, and input field for the player's philosophical response.
 */

import { getState, setPlayerAnswer } from '../state.js';
import { GAME_TEXTS } from '../../content/gameTexts.js';
import { renderPage, createElement, createButton, createTextBox } from '../renderer.js';
import { navigateTo } from '../router.js';

export function render() {
  const state = getState();
  const stationIndex = state.currentStation;
  const qIndex = state.stations[stationIndex].selectedQuestion;

  // Route guard
  if (qIndex === null || qIndex === undefined) {
    navigateTo('#/gate');
    return;
  }

  const irrlicht = GAME_TEXTS.irrlichter[stationIndex];
  const qa = irrlicht.questions[qIndex];

  renderPage((container) => {
    const titleEl = createElement('h1', { className: 'title' }, `Irrlicht ${stationIndex}`);

    // Portrait Frame
    const imgEl = createElement('img', {
      className: 'irrlicht-portrait',
      src: irrlicht.image,
      alt: `Irrlicht at Station ${stationIndex}`
    });
    const frameEl = createElement('div', { className: 'irrlicht-frame' }, imgEl);

    // Question Box
    const questionBox = createTextBox(qa.question, 'question');

    // Textarea Input
    const textareaEl = createElement('textarea', {
      className: 'answer-input',
      placeholder: 'Type your thoughts...',
      rows: 5
    });
    const inputContainer = createElement('div', { className: 'answer-input-container' }, textareaEl);

    // Submission Logic
    const submitAnswer = () => {
      const value = textareaEl.value.trim();
      setPlayerAnswer(stationIndex, value || "Skipped");
      navigateTo('#/answer');
    };

    const skipAnswer = () => {
      setPlayerAnswer(stationIndex, "Skipped");
      navigateTo('#/answer');
    };

    const submitBtn = createButton(GAME_TEXTS.ui.submitAnswer, submitAnswer);
    const skipBtn = createButton(GAME_TEXTS.ui.skip, skipAnswer);
    const btnGroup = createElement('div', { className: 'btn-group' }, [submitBtn, skipBtn]);

    container.append(titleEl, frameEl, questionBox, inputContainer, btnGroup);
    
    // Focus the input text box
    setTimeout(() => textareaEl.focus(), 100);
  });
}
