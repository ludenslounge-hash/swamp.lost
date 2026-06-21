/**
 * swamp.lost — Intro Page
 *
 * Starting screen displaying game title, mission briefing, and a start button.
 */

import { GAME_TEXTS } from '../../content/gameTexts.js';
import { renderPage, createElement, createButton } from '../renderer.js';
import { resetState } from '../state.js';
import { navigateTo } from '../router.js';

export function render() {
  const intro = GAME_TEXTS.intro;

  renderPage((container) => {
    container.classList.add('page-intro');

    // Title & Subtitle
    const titleEl = createElement('h1', { className: 'title' }, intro.title);
    const subtitleEl = createElement('p', { className: 'subtitle' }, intro.subtitle);

    // Mission List Briefing
    const missionItems = intro.mission.map(text => createElement('li', {}, text));
    const missionList = createElement('ul', { className: 'intro-list' }, missionItems);

    // Start Button
    const startBtn = createButton(intro.startButton, () => {
      resetState();
      navigateTo('#/route');
    });

    container.append(titleEl, subtitleEl, missionList, startBtn);
  });
}
