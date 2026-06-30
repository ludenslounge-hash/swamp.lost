/**
 * swamp.lost — Gate Page
 *
 * Checks player's progress by requiring the correct Gate ID associated with the current Irrlicht.
 */

import { GAME_TEXTS } from '../../content/gameTexts.js';
import { renderPage, createElement, createButton } from '../renderer.js';
import { getExpectedGateId, getState, setSelectedQuestion } from '../state.js';
import { validateGateId, selectRandomQuestion } from '../gameLogic.js';
import { navigateTo } from '../router.js';

const SHADOW_IMAGES = {
  1: 'assets/images/irrlicht-shadow-1.png',
  2: 'assets/images/irrlicht-shadow-2.png',
  3: 'assets/images/irrlicht-shadow-3.png'
};

export function render() {
  const state = getState();
  const stationIndex = state.currentStation;
  const expectedGateId = getExpectedGateId();
  const gateTexts = GAME_TEXTS.gate;

  renderPage((container) => {
    const titleEl = createElement('h1', { className: 'title' }, `Gate ${stationIndex}`);
    const instructionEl = createElement('p', { className: 'gate-instruction' }, 'Enter the correct Gate ID to connect to Irrlicht');
    const irrlichtImg = createElement('img', {
      className: 'gate-irrlicht-shadow',
      src: SHADOW_IMAGES[stationIndex],
      alt: `Irrlicht ${stationIndex}`
    });
    const irrlichtFrame = createElement('div', { className: 'gate-irrlicht-frame' }, irrlichtImg);

    // Input fields & errors
    const inputEl = createElement('input', {
      type: 'text',
      className: 'gate-input',
      placeholder: gateTexts.inputPlaceholder,
      autofocus: 'true',
      autocomplete: 'off'
    });

    const errorEl = createElement('div', { className: 'input-error' });
    const inputContainer = createElement('div', { className: 'input-container' }, [inputEl, errorEl]);

    // Submission handler
    const handleSubmit = () => {
      const value = inputEl.value;
      if (validateGateId(value, expectedGateId)) {
        // Select a random question for the station if not set
        let questionIndex = state.stations[stationIndex].selectedQuestion;
        if (questionIndex === null || questionIndex === undefined) {
          questionIndex = selectRandomQuestion(stationIndex);
          setSelectedQuestion(stationIndex, questionIndex);
        }
        navigateTo('#/question');
      } else {
        errorEl.textContent = gateTexts.errorInvalid;
        errorEl.style.opacity = '1';
        inputEl.focus();
      }
    };

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    });

    const submitBtn = createButton(gateTexts.submitButton, handleSubmit);

    container.append(titleEl, instructionEl, irrlichtFrame, inputContainer, submitBtn);
  });
}
