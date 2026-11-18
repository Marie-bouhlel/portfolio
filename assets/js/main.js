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

const projectBrowser = document.querySelector('[data-project-browser]')
if (projectBrowser) {
   const projects = {
      development: [
         { type: 'Featured / Product development', title: 'My Stay - Hotel Guest Application', description: 'A white-label hotel guest application connecting visitors with services, experiences, reservations and personalised support. My role: Co-Founder & Developer.', media: 'mystay-product', sources: ['assets/img/mystay-app.webp', 'assets/img/mystay-explore.webp', 'assets/img/mystay-dashboard.webp'], link: 'https://mystay.dev', clickAnimation: true },
         { type: '01 / Angular', title: 'Event Management Application', description: 'Web application for organizing events, registrations and participants.', media: 'video', source: 'assets/img/work-img-1.webm', poster: 'assets/img/work-img-2.png' },
         { type: '02 / Flutter', title: 'Movie Discovery & Recommendation App', description: 'Mobile application for discovering films and receiving personalized recommendations.', media: 'phone-gallery', sources: ['assets/img/movie-login.jpg'], link: '#contact', internal: true },
         { type: '03 / Software engineering', title: 'CMMS - Maintenance System', description: 'Maintenance management system for tracking equipment and interventions.', media: 'video', source: 'assets/img/CMMS.webm', poster: 'assets/img/work-img-4.png', link: 'https://github.com/Marie-bouhlel/CMMS' },
         { type: '04 / Full-stack web application', title: 'MoleculeScope - Molecular Research Platform', description: 'Full-stack platform for biology students and researchers to explore proteins, documented variants and scientific research projects. Stack: MongoDB, Express.js, React.js, Node.js and JWT. Features: authentication, role management, research projects, protein exploration, variants and scientific analysis reports. Status: under development.', media: 'video', source: 'assets/img/molecule.webm', poster: 'assets/img/work-img-5.png', link: 'https://github.com/Marie-bouhlel/MoleculeScope' }
      ],
      ai: [
         { type: '01 / Machine learning', title: 'Classification Automatique du Statut Tensionnel MAPA', description: 'Automatic classification using Tunisian health data.', media: 'video', source: 'assets/img/work-img-3.webm', link: 'https://github.com/Marie-bouhlel/Classification-Automatique-du-Statut-Tensionnel-MAPA' },
         { type: '02 / Deep learning', title: 'OPHAI - RetinAI Diagnostic App', description: 'Diabetic retinopathy diagnosis assistant using deep learning, Grad-CAM and Streamlit.', media: 'video', source: 'assets/img/OPHtAI.webm', link: 'https://github.com/Marie-bouhlel/OPHAI' },
         { type: '03 / Deep learning', title: 'Epilepsy EEG Classification', description: 'Classification of EEG signals to support epilepsy analysis.', media: 'video', source: 'assets/img/EEG.webm' }
      ]
   }
   const media = projectBrowser.querySelector('[data-project-media]')
   const kicker = projectBrowser.querySelector('[data-project-kicker]')
   const title = projectBrowser.querySelector('[data-project-title]')
   const description = projectBrowser.querySelector('[data-project-description]')
   const link = projectBrowser.querySelector('[data-project-link]')
   const showcase = projectBrowser.querySelector('[data-project-showcase]')
   const previousButton = projectBrowser.querySelector('[data-project-prev]')
   const nextButton = projectBrowser.querySelector('[data-project-next]')
   const dots = projectBrowser.querySelector('[data-project-dots]')
   const counter = projectBrowser.querySelector('[data-project-counter]')
   let currentDomain = 'development'
   let currentIndex = 0
   let carouselTimer

   link.addEventListener('click', () => {
      if (!link.classList.contains('work__link--click-animation')) {
         return
      }
      link.classList.remove('is-clicking')
      requestAnimationFrame(() => link.classList.add('is-clicking'))
   })

   const renderProject = (project) => {
      window.clearInterval(carouselTimer)
      media.innerHTML = project.media === 'mystay-product'
         ? `<div class="mystay-product"><div class="mystay-product__desktop"><img src="${project.sources[2]}" alt="My Stay hotel operations dashboard"></div><div class="mystay-product__phones"><div class="mystay-product__phone"><span></span><img src="${project.sources[0]}" alt="My Stay guest mobile application home"></div><div class="mystay-product__phone mystay-product__phone--back"><span></span><img src="${project.sources[1]}" alt="My Stay guest mobile application explore screen"></div></div></div>`
         : project.media === 'phone-gallery'
         ? `<div class="movie-devices" aria-label="${project.title} screenshots"><div class="movie-phone"><div class="movie-phone__speaker"></div><div class="movie-phone__screen"><div class="movie-phone__slides"><img class="is-visible" src="${project.sources[0]}" alt="${project.title} login screen"></div></div></div></div>`
         : project.media === 'gallery'
         ? `<div class="work__showcase-gallery">${project.sources.map((source) => `<img src="${source}" alt="${project.title} screenshot">`).join('')}</div>`
         : project.media === 'video'
         ? `<div class="work__video-frame"><video autoplay muted loop playsinline preload="metadata" poster="${project.poster || ''}" aria-label="${project.title} preview"><source src="${project.source}" type="video/webm">Your browser does not support the video.</video></div>`
         : `<img src="${project.source}" alt="${project.title} preview">`
      kicker.textContent = project.type
      title.textContent = project.title
      description.textContent = project.description
      link.href = project.link || '#contact'
      link.target = project.internal ? '_self' : '_blank'
      link.innerHTML = `${project.internal ? 'Discuss this project' : 'View project'} <i class="ri-arrow-right-up-line"></i>`
      link.classList.toggle('work__link--click-animation', Boolean(project.clickAnimation))

   }

   const selectProject = (project, index, animate = true) => {
      renderProject(project)
      currentIndex = index
      dots.querySelectorAll('[data-project-dot]').forEach((dot, dotIndex) => {
         dot.classList.toggle('is-active', dotIndex === index)
         dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false')
      })
      counter.textContent = `${index + 1} / ${projects[currentDomain].length}`
      if (animate) {
         showcase.classList.remove('is-changing')
         void showcase.offsetWidth
         showcase.classList.add('is-changing')
         window.setTimeout(() => showcase.classList.remove('is-changing'), 420)
      }
   }

   const renderDomain = (domain) => {
      currentDomain = domain
      currentIndex = 0
      dots.innerHTML = ''
      projects[domain].forEach((project, index) => {
         const button = document.createElement('button')
         button.className = `work__project-dot${index === 0 ? ' is-active' : ''}`
         button.type = 'button'
         button.dataset.projectDot = ''
         button.setAttribute('aria-label', `Show project ${index + 1}: ${project.title}`)
         button.setAttribute('aria-current', index === 0 ? 'true' : 'false')
         button.addEventListener('click', () => {
            selectProject(projects[currentDomain][index], index)
         })
         dots.appendChild(button)
      })
      selectProject(projects[domain][0], 0)
   }

   const showAdjacentProject = (direction) => {
      const projectList = projects[currentDomain]
      currentIndex = (currentIndex + direction + projectList.length) % projectList.length
      selectProject(projectList[currentIndex], currentIndex)
   }

   previousButton.addEventListener('click', () => showAdjacentProject(-1))
   nextButton.addEventListener('click', () => showAdjacentProject(1))
   projectBrowser.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') showAdjacentProject(-1)
      if (event.key === 'ArrowRight') showAdjacentProject(1)
   })

   projectBrowser.querySelectorAll('.work__domain').forEach((button) => {
      button.addEventListener('click', () => {
         projectBrowser.querySelectorAll('.work__domain').forEach((item) => {
            item.classList.remove('is-active')
            item.setAttribute('aria-selected', 'false')
         })
         button.classList.add('is-active')
         button.setAttribute('aria-selected', 'true')
         renderDomain(button.dataset.domain)
      })
   })
   renderDomain('development')
}


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
      '.about__container, .publication__card, .contact__container'
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

         const communitySection = document.querySelector('.community')
         if (communitySection && window.ScrollTrigger) {
            const communityTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: communitySection,
                  start: 'top 78%',
                  once: true
               },
               defaults: { ease: 'power2.out' }
            })

            communityTimeline
               .from('.community__clubs .community__club', {
                  y: 55,
                  x: -24,
                  scale: 0.96,
                  autoAlpha: 0,
                  duration: 0.75,
                  stagger: 0.28
               })
               .from('.community__award-copy', {
                  y: 35,
                  autoAlpha: 0,
                  duration: 0.65
               }, '-=0.15')
               .from('.community__gallery img', {
                  y: 45,
                  scale: 0.94,
                  autoAlpha: 0,
                  duration: 0.65,
                  stagger: 0.16
               }, '-=0.25')
         }
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
