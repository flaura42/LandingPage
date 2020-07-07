//----- event listeners -----//

// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
  addSections(8);
  fillNav();
});

// handle click events
const nav = document.getElementById('nav-list');
nav.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const i = event.target.dataset.li;
    scrollSection(i);
  }
  if (event.target.tagName === 'A') {
    const i = event.target.dataset.a;
    scrollSection(i);
  }
});

// handle scrolling event
window.addEventListener('scroll', (event) => {
  toggleActive();
});


//----- global variables -----//
const sections = document.getElementsByTagName('section');
const fragment = document.createDocumentFragment();


//----- helper functions -----//

// location test function
function testLoc(i) {
  const section = sections[i];
  const coord = section.getBoundingClientRect();
  console.log(section.id, coord);
}

// find section location
function sectionLoc(id) {
  const section = document.getElementById(`section-${id}`);
  const loc = section.getBoundingClientRect();
  return loc;
}


//----- functions -----//

// scroll window to selected section
function scrollSection(id) {
  const section = document.getElementById(`section-${id}`);
  const loc = sectionLoc(id);
  const top = loc.y + window.scrollY - 109;
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
  for (let i=0; i<sections.length; i++) {
    const sect = sections[i];
    const classes = sect.classList.contains('active-section');
    if (classes) {
      const i = sect.getAttribute('data-section');
      removeActive(section, i);
    }
  }
  addActive(section, id);
}

// change active section when scrolling
function toggleActive() {
  for (let i=0; i<sections.length; i++) {
    const section = sections[i];
    const id = section.getAttribute('data-section');
    const rect = sectionLoc(id);
    const classes = section.classList.contains('active-section');
    if (rect.bottom < 110 || rect.top > 110) {
      if (classes) {
        removeActive(section, id);
      }
    } else {
      if (classes === false) {
        addActive(section, id);
      }
    }
  }
}

// change section/nav to active
function addActive(section, id) {
  const nav = document.querySelector(`[data-li='${id}']`);
  const link = document.querySelector(`[data-a='${id}']`);
  section.classList.add('active-section');
  nav.classList.add('active-nav');
  link.classList.add('active-link');
}

// remove active class
function removeActive(section, id) {
  const nav = document.querySelector(`[data-li='${id}']`);
  const link = document.querySelector(`[data-a='${id}']`);
  section.classList.remove('active-section');
  nav.classList.remove('active-nav');
  link.classList.remove('active-link');
}

// add sections to the page
function addSections(num) {
  const main = document.querySelector('main');
  for (let i=1; i<=num; i++) {
    // pick random colors for sections
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    const color = `rgb(${r}, ${g}, ${b})`;

    // create sections
    const section = document.createElement('section');
    section.id = `section-${i}`;
    // give first section active class
    if (i === 1) {
      section.classList.add('active-section');
    }
    section.setAttribute('style', `background-color: ${color};`);
    section.setAttribute('data-section', i);
    const p = document.createElement('p');
    p.classList.add('section-text');
    p.innerText = 'This is content for a section. If this were a proper ' +
      'webpage, it would have interesting content.  Since it is not a ' + 'proper webpage, it just has this filler text.  Rather boring, right?';
    section.appendChild(p);
    fragment.appendChild(section);
  }
  main.insertBefore(fragment, main.firstChild);
}

// fill nav menu
function fillNav() {
  const nav = document.getElementById('nav-list');
  for (let i=0; i<sections.length; i++) {
    const section = sections[i];
    const li = document.createElement('li');
    const num = section.dataset.section;
    li.setAttribute('data-li', num);
    const a = document.createElement('a');
    // give first nav active class
    if (section.id === 'section-1') {
      li.classList.add('active-nav');
      a.classList.add('active-link');
    }
    a.href = `#${section.id}`;
    a.setAttribute('data-a', num);
    // cancel the default event
    a.addEventListener('click', (event) => {
      event.preventDefault();
    });
    a.innerText = section.dataset.section;
    li.appendChild(a);
    fragment.appendChild(li);
  }
  nav.appendChild(fragment);
}
