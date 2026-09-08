const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  // Toggle the 'expanded' class to show or hide the menu
  navLinks.classList.toggle('expanded');

  // Toggle the 'active' class for the hamburger icon
  hamburger.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  const isMenuOpen = navLinks.classList.contains('expanded');
  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedHamburger = hamburger.contains(event.target);

  if (isMenuOpen && !clickedInsideMenu && !clickedHamburger) {
    navLinks.classList.remove('expanded');
    hamburger.classList.remove('active');
  }
});


