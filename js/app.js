
// Fill Nav menu
const sections = document.getElementsByTagName('section');
console.log(sections.length);

const nav = document.getElementById('nav-list');
const fragment = document.createDocumentFragment();
for (const section of sections) {
  console.log(section);
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = `#${section.id}`;
  a.innerText = section.dataset.section;

  li.appendChild(a);

  console.log(li);
  fragment.appendChild(li);
}

nav.appendChild(fragment);
