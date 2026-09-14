// Progressive enhancement: all projects remain visible without JavaScript.
(() => {
  const bar = document.querySelector('[data-project-filter-bar]');
  const collection = document.querySelector('#project-collection');
  if (!bar || !collection) return;
  const buttons = Array.from(bar.querySelectorAll('[data-filter]'));
  const cards = Array.from(collection.querySelectorAll('[data-project]'));
  const result = bar.querySelector('[data-filter-result]');
  const empty = document.querySelector('[data-project-empty]');

  function applyFilter(value) {
    let visible = 0;
    cards.forEach((card) => {
      const categories = (card.dataset.category || '').split(/\s+/);
      card.hidden = value !== 'all' && !categories.includes(value);
      if (!card.hidden) visible += 1;
    });
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === value));
    });
    if (result) result.textContent = visible + (visible === 1 ? ' project' : ' projects');
    if (empty) empty.hidden = visible !== 0;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });
  applyFilter('all');
  bar.hidden = false;
})();
