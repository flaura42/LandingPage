// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
  addSections(8);
  fillNav();
})

// Make nav li clickable
const nav = document.getElementById('nav-list');
nav.addEventListener('click', (items) => {
  const item = items.target.firstChild;
  location.href = item.href;
})

// Add sections to the page
function addSections(num) {
  const main = document.getElementsByTagName('main')[0];
  const fragment = document.createDocumentFragment();

  for (let i=1; i<=num; i++) {
    // pick random colors for sections
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let color = `rgb(${r}, ${g}, ${b})`;

    // create sections
    const section = document.createElement('section');
    section.id = `section-${i}`;
    section.setAttribute('style', `background-color: ${color};`);
    section.setAttribute('data-section', i);
    const p = document.createElement('p');
    p.className = 'section-text';
    p.innerText = 'This is content for a section. If this were a proper webpage, it would have interesting content.  Since it is not a proper webpage, it just has this filler text.  Rather boring, right?';
    section.appendChild(p);
    fragment.appendChild(section);
  }
  main.appendChild(fragment);
}

// fill nav menu
function fillNav() {
  const sections = document.getElementsByTagName('section');
  const nav = document.getElementById('nav-list');
  const fragment = document.createDocumentFragment();

  for (const section of sections) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${section.id}`;
    a.innerText = section.dataset.section;
    li.appendChild(a);
    fragment.appendChild(li);
  }
  nav.appendChild(fragment);
}
