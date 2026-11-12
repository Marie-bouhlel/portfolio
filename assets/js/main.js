/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TEXT CIRCULAR ===============*/

/*=============== HERO PIXEL GRID WAVE ===============*/
const pixelCanvas = document.querySelector('.home__pixel-grid')
const pixelSection = document.querySelector('.home')

if (pixelCanvas && pixelSection) {
   const pixelContext = pixelCanvas.getContext('2d')
   const pixelColor = '#ff4fa3'
   let particles = []
   let pixelWidth = 0
   let pixelHeight = 0
   let pixelRatio = 1
   let animationStart = 0
   let animationFrame
   let lastTime = 0

   const resizePixelGrid = () => {
      const bounds = pixelSection.getBoundingClientRect()
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      pixelWidth = bounds.width
      pixelHeight = bounds.height
      pixelCanvas.width = pixelWidth * pixelRatio
      pixelCanvas.height = pixelHeight * pixelRatio
      pixelContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      particles = Array.from({ length: 130 }, (_, index) => ({
         x: (index * 97) % pixelWidth,
         y: (index * 53) % pixelHeight,
         size: 2 + (index % 3),
         speed: 10 + (index % 5) * 5,
         phase: index * 0.73
      }))
   }

   const drawPixelGrid = (time) => {
      const elapsed = (time - animationStart) / 1000
      pixelContext.clearRect(0, 0, pixelWidth, pixelHeight)

      particles.forEach((particle) => {
         const x = (particle.x - elapsed * particle.speed + pixelWidth) % pixelWidth
         const pulse = (Math.sin(elapsed * 1.8 + particle.phase) + 1) / 2
         const opacity = 0.08 + pulse * 0.62
         pixelContext.fillStyle = pixelColor
         pixelContext.globalAlpha = opacity
         pixelContext.shadowBlur = pulse * 28
         pixelContext.shadowColor = pixelColor
         pixelContext.fillRect(x, particle.y, particle.size, particle.size)
      })

      pixelContext.globalAlpha = 1
      pixelContext.shadowBlur = 0
      animationFrame = requestAnimationFrame(drawPixelGrid)
   }

   const startPixelGrid = (time) => {
      if (!lastTime) {
         animationStart = time
      }
      lastTime = time
      drawPixelGrid(time)
   }

   resizePixelGrid()
   window.addEventListener('resize', resizePixelGrid)

   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawPixelGrid(0)
      cancelAnimationFrame(animationFrame)
   } else {
      animationFrame = requestAnimationFrame(startPixelGrid)
   }
}

/*=============== HOME TYPED JS ===============*/
const typedElement = document.getElementById('home-typed')
if (typedElement && window.Typed) {
   new Typed('#home-typed', {
      strings: ['Engineer', 'Developer', 'Problem solver'],
      typeSpeed: 70,
      backSpeed: 45,
      backDelay: 1600,
      loop: true
   })
}

/*=============== CHANGE HEADER STYLES ===============*/
const changeHeader = () => {
   const header = document.getElementById('header')
   header.classList.toggle('header-scrolled', window.scrollY >= 40)
}
window.addEventListener('scroll', changeHeader)
changeHeader()

/*=============== SWIPER WORK ===============*/ 


/*=============== SERVICES ACCORDION ===============*/ 


/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/ 


/*=============== CONTACT EMAIL JS ===============*/ 
const contactForm = document.getElementById('contact-form')
const contactMessage = document.getElementById('contact-message')
if (contactForm) {
   contactForm.addEventListener('submit', (event) => {
      event.preventDefault()
      contactMessage.textContent = 'Thanks! Your message is ready to be sent.'
      contactForm.reset()
   })
}

/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== CUSTOM CURSOR ===============*/


/*=============== SMOOTH SCROLL & GSAP MOTION ===============*/
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (window.Lenis && !reducedMotion) {
   const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      anchors: true
   })

   if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update)
   }

   const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
   }
   requestAnimationFrame(raf)
}

if (window.gsap && !reducedMotion) {
   if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger)
   }

   const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
   intro
      .from('.home__content > *', {
         y: 55,
         x: -18,
         autoAlpha: 0,
         duration: 1.1,
         stagger: 0.1
      })
      .from('.home__image-wrap', {
         x: 55,
         scale: 0.92,
         autoAlpha: 0,
         duration: 1.2
      }, '-=0.8')

   const revealTargets = gsap.utils.toArray(
      '.about__container, .work__card, .contact__container'
   )

   revealTargets.forEach((target) => {
      if (window.ScrollTrigger) {
         gsap.from(target, {
            y: 70,
            scale: 0.96,
            autoAlpha: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
               trigger: target,
               start: 'top 90%',
               once: true
            }
         })
      }
   })

   const servicesGrid = document.querySelector('.services__grid')
   if (servicesGrid) {
      const serviceCards = gsap.utils.toArray('.service__card')
      const servicesTimeline = gsap.timeline({
         scrollTrigger: {
            trigger: servicesGrid,
            start: 'top 75%',
            once: true
         }
      })

      serviceCards.forEach((card) => {
         servicesTimeline
            .to(card, {
               y: -18,
               x: -10,
               scale: 1.04,
               borderColor: '#ff4fa3',
               boxShadow: '0 16px 35px rgba(255, 79, 163, .22)',
               duration: 0.7,
               ease: 'power3.out'
            })
            .to({}, { duration: 1.8 })
            .to(card, {
               y: 0,
               x: 0,
               scale: 1,
               borderColor: 'var(--border-color)',
               boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
               duration: 0.7,
               ease: 'power2.inOut'
            })
      })

      servicesTimeline.repeat(-1)
   }

   const skillsGrid = document.querySelector('.skills__grid')
   if (skillsGrid) {
      const skillGroups = gsap.utils.toArray('.skills__group')
      const skillsTimeline = gsap.timeline({
         scrollTrigger: {
            trigger: skillsGrid,
            start: 'top 78%',
            once: true
         }
      })

      skillGroups.forEach((group) => {
         const tags = gsap.utils.toArray(group.querySelectorAll('.skills__tags span'))

         skillsTimeline
            .to(group, {
               y: -10,
               x: -6,
               scale: 1.02,
               borderColor: '#fff8fd',
               boxShadow: '0 14px 30px rgba(255, 248, 253, .16)',
               duration: 0.7,
               ease: 'power3.out'
            })
            .to(tags, {
               color: '#fff8fd',
               borderColor: '#fff8fd',
               boxShadow: '0 0 14px rgba(255, 248, 253, .38)',
               duration: 0.3,
               stagger: 0.12,
               ease: 'power2.out'
            })
            .to({}, { duration: 1.2 })
            .to(tags, {
               color: 'var(--text-color)',
               borderColor: 'var(--border-color)',
               boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
               duration: 0.3,
               stagger: 0.08,
               ease: 'power2.inOut'
            })
            .to(group, {
               y: 0,
               x: 0,
               scale: 1,
               borderColor: 'var(--border-color)',
               boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
               duration: 0.7,
               ease: 'power2.inOut'
            })
      })

      skillsTimeline.repeat(-1)
   }

   gsap.utils.toArray('.section__eyebrow, .section__title').forEach((target) => {
      gsap.from(target, {
         y: 25,
         autoAlpha: 0,
         duration: 0.75,
         ease: 'power2.out',
         scrollTrigger: {
            trigger: target,
            start: 'top 92%',
            once: true
         }
      })
   })
}
