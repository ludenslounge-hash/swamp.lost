/**
 * swamp.lost — State Management
 *
 * Centralized game state object with persistence across page refreshes.
 */

import { calculateScoreChange, determineResult, getStationConfig } from './gameLogic.js';

export const STORAGE_KEY = 'swamp_lost_state';

const INITIAL_STATE = {
  currentStation: 1,          // 1–3
  phase: 'intro',             // 'intro'|'route'|'gate'|'question'|'answer'|'decision'|'result'
  score: 0,                   // cumulative score
  expectedGateId: 'bad',      // current expected gate ID
  stations: {
    1: { selectedQuestion: null, playerAnswer: null, decision: null },
    2: { selectedQuestion: null, playerAnswer: null, decision: null },
    3: { selectedQuestion: null, playerAnswer: null, decision: null }
  }
};

let state = loadState();

function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load state from sessionStorage', e);
  }
  return JSON.parse(JSON.stringify(INITIAL_STATE));
}

function saveState() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to sessionStorage', e);
  }
}

/**
 * Return a frozen snapshot of the current state.
 */
export function getState() {
  return JSON.parse(JSON.stringify(state));
}

/**
 * Reset to initial state and clear sessionStorage.
 */
export function resetState() {
  state = JSON.parse(JSON.stringify(INITIAL_STATE));
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear state from sessionStorage', e);
  }
  saveState();
  return getState();
}

/**
 * Set the current phase in the game flow.
 * @param {string} phase 
 */
export function setPhase(phase) {
  state.phase = phase;
  saveState();
}

/**
 * Set the current active station.
 * @param {number} n 
 */
export function setCurrentStation(n) {
  if (n >= 1 && n <= 3) {
    state.currentStation = n;
    const config = getStationConfig(n);
    if (config) {
      state.expectedGateId = config.gateId;
    }
    saveState();
  }
}

/**
 * Set the selected question index for a station.
 * @param {number} stationIndex 
 * @param {number} questionIndex 
 */
export function setSelectedQuestion(stationIndex, questionIndex) {
  if (state.stations[stationIndex]) {
    state.stations[stationIndex].selectedQuestion = questionIndex;
    saveState();
  }
}

/**
 * Set the player's written answer for a station.
 * @param {number} stationIndex 
 * @param {string} answerText 
 */
export function setPlayerAnswer(stationIndex, answerText) {
  if (state.stations[stationIndex]) {
    state.stations[stationIndex].playerAnswer = answerText;
    saveState();
  }
}

/**
 * Apply the player's choice for a station and update the score.
 * @param {number} stationIndex 
 * @param {string} choice - 'follow' | 'goOn'
 */
export function applyDecision(stationIndex, choice) {
  if (state.stations[stationIndex]) {
    const scoreChange = calculateScoreChange(stationIndex, choice);
    state.score += scoreChange;
    state.stations[stationIndex].decision = choice;
    saveState();
  }
}

/**
 * Retrieve the current expected gate ID.
 * @returns {string}
 */
export function getExpectedGateId() {
  return state.expectedGateId;
}

/**
 * Determine the final result category of the game.
 * @returns {string} - 'lost' | 'drift' | 'community'
 */
export function getFinalResult() {
  return determineResult(state.score);
}
