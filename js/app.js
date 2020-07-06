//----- event listeners -----//

// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
  addSections(8);
  fillNav();
})

// make nav li clickable
document.getElementById('nav-list').addEventListener('click', (event) => {
  console.log('been clicked, yo');
  const id = event.target.firstChild.innerText;
  scrollLink(id);
})

//----- functions -----//

// FIXME: Adjust 'top' to work going up and down.
// scroll window to selected section
function scrollLink(id) {
  console.log('scroll to', id);
  const dest = document.getElementById(`section-${id}`);
  const top = dest.getBoundingClientRect().y + window.scrollY - 116;
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
  activeSection(dest, id);
}

// change active section
function activeSection(dest, id) {
  console.log(dest);
  const sections = document.getElementsByTagName('section');
  const navs = document.getElementsByTagName('li');
  const links = document.getElementsByTagName('a');
  for (let i in sections) {
    const sect = sections[i];
    if (sect.className == 'active-section') {
      sect.classList.remove('active-section');
    }
    for (let i in navs) {
      if (navs[i].className == 'active-nav') {
        navs[i].classList.remove('active-nav');
      }
    }
    for (let i in links) {
      if (links[i].className == 'active-link') {
        links[i].classList.remove('active-link');
      }
    }
  }
  const nav = navs[id - 1];
  const link = navs[id - 1].firstChild;
  console.log('testing', navs[id - 1].firstChild);
  dest.className = 'active-section';
  nav.className = 'active-nav';
  link.className = 'active-link';
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
    // give first nav active class
    if (section.id === 'section-1') {
      li.className = 'active-nav';
      a.className = 'active-link'
    }
    a.href = `#${section.id}`;
    a.addEventListener('click', (event) => {
      console.log('hear ya', event.target.innerText);
      event.preventDefault();
      scrollLink(event.target.innerText);
    })
    a.innerText = section.dataset.section;
    li.appendChild(a);
    fragment.appendChild(li);
  }
  nav.appendChild(fragment);
}
