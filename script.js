// Microchip Cursor Trail
(() => {
  const canvas = document.getElementById('sword-trail');
  const ctx = canvas.getContext('2d');
  let width, height;
  const chipImg = new Image();
  chipImg.src = 'https://cdn.custom-cursor.com/db/22094/32/tech-microchip-pointer.png'; // Microchip PNG
  const trail = [];
  const maxTrail = 15;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => {
    trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
    if (trail.length > maxTrail) trail.shift();
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    trail.forEach(t => {
      ctx.globalAlpha = t.alpha;
      ctx.drawImage(chipImg, t.x - 12, t.y - 12, 24, 24);
      t.alpha -= 0.07;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  chipImg.onload = draw;
})();

// Terminal Hover Beep (Optional)
(() => {
  const links = document.querySelectorAll('nav ul li a');
  const beep = new Audio('https://www.soundjay.com/button/sounds/button-16.mp3');

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      beep.currentTime = 0;
      beep.play().catch(() => {});
    });
  });
})();

// Smooth Scroll with Glitch Animation
(() => {
  const navLinks = document.querySelectorAll('nav ul li a');
  const body = document.body;

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const section = document.getElementById(targetId);
      if (!section) return;

      body.classList.add('gate-opening');
      setTimeout(() => section.scrollIntoView({ behavior: 'smooth' }), 500);
      setTimeout(() => body.classList.remove('gate-opening'), 1200);
    });
  });
})();
