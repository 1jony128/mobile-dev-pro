  // Burger Menu Toggle
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');

  function toggleMobileNav() {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mobileNav.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
      }
  }

  function closeMobileNav() {
      burger.classList.remove('active');
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
  }

  burger.addEventListener('click', toggleMobileNav);
  overlay.addEventListener('click', closeMobileNav);

  // Close mobile nav when clicking on links
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
  });

  // Handle example CTA buttons
  document.querySelectorAll('.example-cta').forEach(button => {
      button.addEventListener('click', function() {
          // Smooth scroll to contact section
          document.querySelector('#contact').scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // Header background on scroll
  window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
          header.style.background = 'rgba(10, 10, 10, 0.95)';
      } else {
          header.style.background = 'rgba(10, 10, 10, 0.9)';
      }
  });

  // Form submission via Formspree
  document.querySelector('.contact-form').addEventListener('submit', async function(e) {
      e.preventDefault();

      const form = this;
      const inputs = form.querySelectorAll('input, textarea');
      let valid = true;

      inputs.forEach(input => {
          if (!input.value.trim()) {
              valid = false;
              input.style.borderColor = '#ff4444';
          } else {
              input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }
      });

      if (!valid) return;

      const button = form.querySelector('button');
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = 'Отправка...';

      try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
              method: 'POST',
              headers: { 'Accept': 'application/json' },
              body: formData
          });

          if (response.ok) {
              button.textContent = 'Сообщение отправлено!';
              button.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
              form.reset();
          } else {
              button.textContent = 'Ошибка отправки';
              button.style.background = 'linear-gradient(135deg, #ff4444, #ff00aa)';
          }
      } catch (err) {
          button.textContent = 'Ошибка сети';
          button.style.background = 'linear-gradient(135deg, #ff4444, #ff00aa)';
      } finally {
          setTimeout(() => {
              button.disabled = false;
              button.textContent = originalText;
              button.style.background = 'linear-gradient(135deg, #00d4ff, #ff00ff)';
          }, 3000);
      }
  });

  // Add floating animation to service cards
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.animation = 'slideInUp 0.6s ease forwards';
          }
      });
  }, observerOptions);

  document.querySelectorAll('.service-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      observer.observe(card);
  });

  // Add hover effects for footer contacts
  document.querySelectorAll('.footer-contact-item a').forEach(link => {
      link.addEventListener('mouseenter', function() {
          this.style.color = '#00d4ff';
          this.style.transform = 'translateY(-2px)';
      });
      
      link.addEventListener('mouseleave', function() {
          this.style.color = 'rgba(255, 255, 255, 0.8)';
          this.style.transform = 'translateY(0)';
      });
  });

  // Add hover effects for contact items
  document.querySelectorAll('.contact-item a').forEach(link => {
      link.addEventListener('mouseenter', function() {
          this.style.color = '#00d4ff';
          this.style.transform = 'scale(1.05)';
      });
      
      link.addEventListener('mouseleave', function() {
          this.style.color = 'rgba(255, 255, 255, 0.8)';
          this.style.transform = 'scale(1)';
      });
  });
  const style = document.createElement('style');
  style.textContent = `
      @keyframes slideInUp {
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }
  `;
  document.head.appendChild(style);