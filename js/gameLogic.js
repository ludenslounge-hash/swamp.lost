/**
 * swamp.lost — Game Logic
 *
 * Pure functions for all game mechanics. No DOM access, no side effects.
 */

// Station configuration (centralized)
// 1-indexed stations map to array indices 0, 1, 2
const STATION_CONFIG = [
  { gateId: 'bad', scoring: { follow: -1, goOn: 1 }, nextGateId: 'hag' },
  { gateId: 'hag', scoring: { follow: 1, goOn: -1 }, nextGateId: 'fed' },
  { gateId: 'fed', scoring: { follow: -1, goOn: 1 }, nextGateId: null  }
];

/**
 * Get the configuration for a given station.
 * @param {number} stationIndex - 1-based station index (1, 2, or 3)
 * @returns {object|null}
 */
export function getStationConfig(stationIndex) {
  if (stationIndex < 1 || stationIndex > STATION_CONFIG.length) {
    return null;
  }
  return STATION_CONFIG[stationIndex - 1];
}

/**
 * Validate the player's gate ID input against the expected ID.
 * Case-insensitive so kiosk players do not get blocked by capitalization.
 * @param {string} input 
 * @param {string} expected 
 * @returns {boolean}
 */
export function validateGateId(input, expected) {
  if (!input || !expected) return false;
  return input.trim().toLowerCase() === expected.trim().toLowerCase();
}

/**
 * Randomly select a question index (0, 1, or 2).
 * @param {number} stationIndex 
 * @returns {number}
 */
export function selectRandomQuestion(stationIndex) {
  return Math.floor(Math.random() * 3);
}

/**
 * Calculate the score change based on the station and choice.
 * @param {number} stationIndex - 1, 2, or 3
 * @param {string} choice - 'follow' or 'goOn'
 * @returns {number}
 */
export function calculateScoreChange(stationIndex, choice) {
  const config = getStationConfig(stationIndex);
  if (!config) return 0;
  return config.scoring[choice] || 0;
}

/**
 * Retrieve the next gate ID after the specified station.
 * @param {number} stationIndex 
 * @returns {string|null}
 */
export function getNextGateId(stationIndex) {
  const config = getStationConfig(stationIndex);
  return config ? config.nextGateId : null;
}

/**
 * Central logic mapping total score to ending result.
 * @param {number} score 
 * @returns {string} - 'lost' | 'drift' | 'community'
 */
export function determineResult(score) {
  if (score >= 3) return 'community';
  if (score >= 1) return 'drift';
  return 'lost';
}
