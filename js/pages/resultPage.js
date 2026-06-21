/**
 * swamp.lost — Result Page
 *
 * Displays the ending of the player's journey based on their score and decisions.
 * Offers a detailed verification log download and restart functionality.
 */

import { getState, resetState, getFinalResult } from '../state.js';
import { GAME_TEXTS } from '../../content/gameTexts.js';
import { renderPage, createElement, createButton } from '../renderer.js';
import { navigateTo } from '../router.js';

export function render() {
  const state = getState();
  const resultType = getFinalResult(); // 'lost' | 'drift' | 'community'
  const resultText = GAME_TEXTS.results[resultType];

  renderPage((container) => {
    // Ending Title
    const titleEl = createElement('h1', { className: 'title result-title' }, resultText.title);

    // Glowing status label
    const glowClass = `result-glow result-glow--${resultType}`;
    let displayType = 'Lost';
    if (resultType === 'drift') displayType = 'Drift';
    if (resultType === 'community') displayType = 'Community';
    const glowEl = createElement('div', { className: glowClass }, displayType);

    // Ending body text description
    const bodyEl = createElement('p', { className: 'result-body' }, resultText.body);

    // Action buttons: Download Journal and Restart
    const handleDownload = () => {
      triggerLogDownload(state, resultType);
    };

    const handleRestart = () => {
      resetState();
      navigateTo('#/intro');
    };

    const downloadBtn = createButton(GAME_TEXTS.ui.download, handleDownload);
    const restartBtn = createButton(GAME_TEXTS.ui.restart, handleRestart);
    const btnGroup = createElement('div', { className: 'btn-group' }, [downloadBtn, restartBtn]);

    container.append(titleEl, glowEl, bodyEl, btnGroup);
  });
}

/**
 * Generate and trigger download of the player's verification log as a text file.
 * @param {object} state 
 * @param {string} resultType 
 */
function triggerLogDownload(state, resultType) {
  let log = `SWAMP.LOST — VERIFICATION JOURNAL\n`;
  log += `================================\n\n`;
  log += `STATUS:      ${resultType.toUpperCase()}\n`;
  log += `FINAL SCORE: ${state.score}\n`;
  log += `DATE:        ${new Date().toLocaleString()}\n\n`;
  log += `--------------------------------------------------\n\n`;

  for (let i = 1; i <= 3; i++) {
    const station = state.stations[i];
    const route = GAME_TEXTS.routes[i];
    const irrlicht = GAME_TEXTS.irrlichter[i];
    const qa = irrlicht.questions[station.selectedQuestion] || { question: "N/A", answer: "N/A" };

    log += `STATION ${i}:    ${route.title}\n`;
    log += `Gate ID:      ${irrlicht.gateId}\n`;
    log += `Question:     "${qa.question}"\n`;
    log += `Your Answer:  "${station.playerAnswer || 'Skipped'}"\n`;
    log += `Wisp Answer:  "${qa.answer}"\n`;
    log += `Your Path:    ${station.decision === 'follow' ? 'Followed Wisp (-1)' : 'Passed Wisp (+1)'}\n`;
    log += `\n--------------------------------------------------\n\n`;
  }

  log += `EOF - Verification complete.\n`;

  const blob = new Blob([log], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `swamp_lost_verification_log.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
