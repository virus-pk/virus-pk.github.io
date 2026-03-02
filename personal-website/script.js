// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle')
  const body = document.body

  if (!darkModeToggle) {
    return
  }

  const icon = darkModeToggle.querySelector('i')

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode')
    icon.classList.remove('fa-moon')
    icon.classList.add('fa-sun')
  } else {
    // Ensure light mode by default
    body.classList.remove('dark-mode')
    icon.classList.remove('fa-sun')
    icon.classList.add('fa-moon')
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
    const isDarkMode = body.classList.contains('dark-mode')

    if (isDarkMode) {
      icon.classList.remove('fa-moon')
      icon.classList.add('fa-sun')
      localStorage.setItem('theme', 'dark')
    } else {
      icon.classList.remove('fa-sun')
      icon.classList.add('fa-moon')
      localStorage.setItem('theme', 'light')
    }
  })
})

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle')
  const mobileMenu = document.getElementById('mobileMenu')

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a')
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden')
      })
    })
  }
})

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
})

// Navbar background on scroll
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('nav')
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg')
      } else {
        navbar.classList.remove('shadow-lg')
      }
    })
  }
})

// Animate skill bars when they come into view
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  }

  const skillBarObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.skill-bar')
        skillBars.forEach(bar => {
          const width = bar.style.width
          bar.style.width = '0%'
          setTimeout(() => {
            bar.style.width = width
          }, 200)
        })
      }
    })
  }, observerOptions)

  const skillsSection = document.querySelector('#skills')
  if (skillsSection) {
    skillBarObserver.observe(skillsSection)
  }
})

// Fade in animation for sections
document.addEventListener('DOMContentLoaded', () => {
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in')
        }
      })
    },
    {
      threshold: 0.1
    }
  )

  document.querySelectorAll('section').forEach(section => {
    fadeObserver.observe(section)
  })
})

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm')
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault()
      void document.getElementById('name').value
      void document.getElementById('email').value
      void document.getElementById('message').value
      showNotification("Message sent successfully! I'll get back to you soon.")
      contactForm.reset()
    })
  }
})

// Notification system
function showNotification(message) {
  const notification = document.createElement('div')
  notification.className =
    'fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300'
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 100)

  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Add typing effect restart on visibility
const typingElement = document.querySelector('.typing-effect')
if (typingElement) {
  const typingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'none'
        setTimeout(() => {
          entry.target.style.animation = ''
        }, 10)
      }
    })
  })

  typingObserver.observe(typingElement)
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset
  const heroSection = document.querySelector('#home')
  if (heroSection) {
    heroSection.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add hover effect to cards
document.querySelectorAll('.card-hover').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)'
  })

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)'
  })
})

// Active navigation highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('nav a[href^="#"]')

  let current = ''
  sections.forEach(section => {
    const sectionTop = section.offsetTop
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id')
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('text-purple-600')
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('text-purple-600')
    }
  })
})

// Loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded')
})

// Add some interactive particles to hero section (optional enhancement)
function createParticle() {
  const particle = document.createElement('div')
  particle.className = 'particle'
  particle.style.cssText = `
        position: fixed;
        pointer-events: none;
        opacity: 0.5;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        z-index: 1;
        animation: float 6s ease-in-out infinite;
    `

  const size = Math.random() * 5 + 2
  particle.style.width = size + 'px'
  particle.style.height = size + 'px'

  particle.style.left = Math.random() * window.innerWidth + 'px'
  particle.style.top = Math.random() * window.innerHeight + 'px'

  document.body.appendChild(particle)

  setTimeout(() => {
    particle.remove()
  }, 6000)
}

// Create particles periodically (only on hero section for performance)
setInterval(() => {
  const heroSection = document.querySelector('#home')
  const rect = heroSection.getBoundingClientRect()
  if (rect.top <= 0 && rect.bottom >= 0) {
    createParticle()
  }
}, 500)

// Add floating animation CSS
const style = document.createElement('style')
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
`
document.head.appendChild(style)
