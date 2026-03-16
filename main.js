/* =====================================================
   ALDEMAR BALCAZAR — PORTFOLIO
   main.js
   =====================================================
   MÓDULOS:
   1. Navbar — scroll shadow + hamburger móvil
   2. Fade-in — animaciones al hacer scroll
   3. Contadores — animación de cifras
   4. Filtros de portafolio
   5. Formulario de contacto
   ===================================================== */


/* =====================================================
   1. NAVBAR
   ===================================================== */

// Sombra al hacer scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger — abrir / cerrar menú móvil
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Cerrar menú al hacer clic en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* =====================================================
   2. FADE-IN AL SCROLL
   ===================================================== */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


/* =====================================================
   3. CONTADORES ANIMADOS
   ===================================================== */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target);
    const step   = target / (1800 / 16); // duración: ~1800ms
    let current  = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);

    counterObserver.unobserve(el); // solo animar una vez
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count').forEach(el => counterObserver.observe(el));


/* =====================================================
   4. FILTROS DE PORTAFOLIO
   =====================================================
   Para agregar una nueva categoría:
   1. Agrega un botón: <button class="filter-btn" data-filter="nueva-cat">...</button>
   2. Agrega data-category="nueva-cat" a la tarjeta correspondiente
   ===================================================== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Desactivar todos los botones
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    document.querySelectorAll('.portfolio-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});


/* =====================================================
   5. FORMULARIO DE CONTACTO
   =====================================================
   Por ahora muestra un mensaje de confirmación.
   Para conectar con un backend o servicio como Formspree,
   reemplaza el contenido de handleSubmit().
   ===================================================== */
function handleSubmit(event) {
  event.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.style.display = 'block';
  event.target.reset();
}


/* =====================================================
   UTILIDADES
   ===================================================== */

// Año actual en el footer
document.getElementById('year').textContent = new Date().getFullYear();
