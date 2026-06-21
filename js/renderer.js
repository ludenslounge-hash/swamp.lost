/**
 * swamp.lost — DOM Renderer Utilities
 *
 * Centralized DOM construction and transitions.
 */

let isTransitioning = false;

/**
 * Clear all contents inside the main #app container.
 */
export function clearApp() {
  const app = document.getElementById('app');
  if (app) app.innerHTML = '';
}

/**
 * Helper to build DOM elements quickly and clearly.
 * @param {string} tag 
 * @param {object} attrs 
 * @param {Array|string|HTMLElement} children 
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);
  
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className') {
      element.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (value !== null && value !== undefined) {
      element.setAttribute(key, value);
    }
  }
  
  const appendChild = (child) => {
    if (child === null || child === undefined) return;
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(child.toString()));
    } else if (child instanceof HTMLElement || child instanceof SVGElement) {
      element.appendChild(child);
    }
  };

  if (Array.isArray(children)) {
    children.forEach(appendChild);
  } else {
    appendChild(children);
  }
  
  return element;
}

/**
 * Perform an atmospheric fade-out/fade-in page transition.
 * @param {function} buildFn - Receive the page container and appends elements to it.
 */
export function renderPage(buildFn) {
  const app = document.getElementById('app');
  if (!app) return;

  const currentPage = app.querySelector('.page');
  
  const performRender = () => {
    app.innerHTML = '';
    
    // Create new page container
    const newPage = document.createElement('div');
    newPage.className = 'page page--entering';
    
    // Call buildFn on the new page container
    buildFn(newPage);
    
    app.appendChild(newPage);
    
    // Clean up animation classes once fade-in completes (transition speed is 0.6s)
    setTimeout(() => {
      newPage.classList.remove('page--entering');
      isTransitioning = false;
    }, 600);
  };

  if (currentPage && !isTransitioning) {
    isTransitioning = true;
    currentPage.classList.add('page--exiting');
    // Wait for transition-page (0.6s) before updating content
    setTimeout(performRender, 600);
  } else {
    performRender();
  }
}

/**
 * Helper to create a styled button.
 * @param {string} text 
 * @param {function} onClick 
 * @returns {HTMLElement}
 */
export function createButton(text, onClick) {
  return createElement('button', { className: 'btn', onClick }, text);
}

/**
 * Helper to create a styled text box (question/answer).
 * @param {string} text 
 * @param {string} type - 'question' | 'answer'
 * @returns {HTMLElement}
 */
export function createTextBox(text, type) {
  const className = `text-box text-box--${type}`;
  return createElement('div', { className }, text);
}
