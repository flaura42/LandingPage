//----- event listeners -----//

// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
  addSections(8);
  fillNav();
})

// make nav li clickable
document.getElementById('nav-list').addEventListener('click', (event) => {
  const id = event.target.firstChild.innerText;
  scrollSection(id);
})

// handle scrolling event
window.addEventListener('scroll', (event) => {
  // setTimeout(setActive(), 3000);
  setActive();
})


//----- functions -----//

// location test function
function testLoc(i) {
  const sections = document.getElementsByTagName('section');
  const section = sections[i];
  const coord = section.getBoundingClientRect();
  console.log(section.id, coord);
}

// scroll window to selected section
function scrollSection(id) {
  const section = document.getElementById(`section-${id}`);
  const top = section.getBoundingClientRect().y + window.scrollY - 109;
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
  addActive(section, id);
}

// remove active class
function removeActive(section, id) {
  section.classList.remove('active-section');
  const navs = document.getElementsByTagName('li');
  const links = document.getElementsByTagName('a');
  const nav = navs[id - 1];
  const link = navs[id - 1].firstChild;
  nav.classList.remove('active-nav');
  link.classList.remove('active-link');
}

// change section/nav to active
function addActive(dest, id) {
  const navs = document.getElementsByTagName('li');
  const links = document.getElementsByTagName('a');
  const nav = navs[id - 1];
  const link = navs[id - 1].firstChild;
  dest.classList.add('active-section');
  nav.className = 'active-nav';
  link.className = 'active-link';
}

// TODO: Have active update when scrolling backwards
// set which section is active from scrolling
function setActive() {
  const sections = document.getElementsByTagName('section');
  for (const i in sections) {
    const section = sections[i];
    const rect = section.getBoundingClientRect();
    const id = section.getAttribute('data-section');
    if (rect.bottom < 110 || rect.top > 110) {
      removeActive(section, id);
    } else {
      addActive(section, id);
    }
  }
}

// add sections to the page
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
    // give first section active class
    if (i === 1) {
      section.className = 'active-section';
    }
    section.setAttribute('style', `background-color: ${color};`);
    section.setAttribute('data-section', i);
    const p = document.createElement('p');
    p.className = 'section-text';
    p.innerText = 'This is content for a section. If this were a proper webpage, it would have interesting content.  Since it is not a proper webpage, it just has this filler text.  Rather boring, right?';
    section.appendChild(p);
    fragment.appendChild(section);
  }
  main.insertBefore(fragment, main.firstChild)
}

// fill nav menu
function fillNav() {
  const sections = document.getElementsByTagName('section');
  const nav = document.getElementById('nav-list');
  const fragment = document.createDocumentFragment();

  for (const section of sections) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    // give first nav active class
    if (section.id === 'section-1') {
      li.className = 'active-nav';
      a.className = 'active-link'
    }
    a.href = `#${section.id}`;
    a.addEventListener('click', (event) => {
      event.preventDefault();
      scrollSection(event.target.innerText);
    })
    a.innerText = section.dataset.section;
    li.appendChild(a);
    fragment.appendChild(li);
  }
  nav.appendChild(fragment);
}
