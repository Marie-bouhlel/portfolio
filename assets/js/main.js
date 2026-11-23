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
         { type: 'Co-Founder / Product development', title: 'My Stay - Hotel Guest Application', preview: 'A white-label hotel guest application for hotel services and experiences.', description: 'A white-label hotel guest application connecting visitors with services, experiences, reservations and personalised support. I co-founded My Stay and lead the product development as Co-Founder & Developer.', media: 'mystay-product', sources: ['assets/img/mystay-app.webp', 'assets/img/mystay-explore.webp', 'assets/img/mystay-dashboard.webp'], link: 'https://mystay.dev', clickAnimation: true },
         { type: '01 / Angular', title: 'Event Management Application', description: 'Web application for organizing events, registrations and participants.', media: 'video', source: 'assets/img/work-img-1.mp4' },
         { type: '02 / Software engineering', title: 'CMMS - Maintenance System', description: 'Maintenance management system for tracking equipment and interventions.', media: 'video', source: 'assets/img/CMMS.mp4', link: 'https://github.com/Marie-bouhlel/CMMS' },
         { type: '03 / Full-stack web application', title: 'MoleculeScope - Molecular Research Platform', description: 'Full-stack platform for biology students and researchers to explore proteins, documented variants and scientific research projects. Stack: MongoDB, Express.js, React.js, Node.js and JWT. Features: authentication, role management, research projects, protein exploration, variants and scientific analysis reports. Status: under development.', media: 'video', source: 'assets/img/molecule.mp4', link: 'https://github.com/Marie-bouhlel/MoleculeScope' }
      ],
      ai: [
         { type: '01 / Machine learning', title: 'Classification Automatique du Statut Tensionnel MAPA', description: 'Automatic classification using Tunisian health data.', media: 'video', source: 'assets/img/work-img-3.mp4', link: 'https://github.com/Marie-bouhlel/Classification-Automatique-du-Statut-Tensionnel-MAPA' },
         { type: '02 / Deep learning', title: 'OPHAI - RetinAI Diagnostic App', description: 'Diabetic retinopathy diagnosis assistant using deep learning, Grad-CAM and Streamlit.', media: 'video', source: 'assets/img/OPHtAI.mp4', link: 'https://github.com/Marie-bouhlel/OPHAI' },
         { type: '03 / Deep learning', title: 'Epilepsy EEG Classification', description: 'Classification of EEG signals to support epilepsy analysis.', media: 'video', source: 'assets/img/EEG.mp4' }
      ]
   }
   const media = projectBrowser.querySelector('[data-project-media]')
   const kicker = projectBrowser.querySelector('[data-project-kicker]')
   const title = projectBrowser.querySelector('[data-project-title]')
   const description = projectBrowser.querySelector('[data-project-description]')
   const readMoreButton = projectBrowser.querySelector('[data-project-read-more]')
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

   readMoreButton.addEventListener('click', () => {
      const expanded = description.classList.toggle('is-expanded')
      readMoreButton.setAttribute('aria-expanded', String(expanded))
      description.textContent = expanded ? description.dataset.fullDescription : (description.dataset.preview || description.dataset.fullDescription)
      readMoreButton.innerHTML = `${expanded ? 'View less' : 'View more'} <i class="ri-arrow-down-s-line"></i>`
   })

   const renderProject = (project) => {
      window.clearInterval(carouselTimer)
      media.innerHTML = project.media === 'mystay-product'
         ? `<div class="mystay-product"><div class="mystay-product__desktop"><img src="${project.sources[2]}" alt="My Stay hotel operations dashboard"></div><div class="mystay-product__phone"><span class="mystay-product__phone-speaker"></span><div class="mystay-product__phone-screen"><img src="${project.sources[0]}" alt="My Stay guest mobile application"></div></div></div>`
         : project.media === 'gallery'
         ? `<div class="work__showcase-gallery">${project.sources.map((source) => `<img src="${source}" alt="${project.title} screenshot">`).join('')}</div>`
         : project.media === 'video'
         ? `<div class="work__video-frame"><video src="${project.source}" autoplay muted loop playsinline preload="metadata" aria-label="${project.title} preview">Your browser does not support the video.</video></div>`
         : `<img src="${project.source}" alt="${project.title} preview">`
      kicker.textContent = project.type
      title.textContent = project.title
      description.textContent = project.preview || project.description
      description.dataset.fullDescription = project.description
      description.dataset.preview = project.preview || project.description
      description.classList.remove('is-expanded')
      readMoreButton.setAttribute('aria-expanded', 'false')
      readMoreButton.innerHTML = `View more <i class="ri-arrow-down-s-line"></i>`
      requestAnimationFrame(() => {
         readMoreButton.hidden = description.scrollHeight <= description.clientHeight
      })
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

         const communitySlideshow = document.querySelector('[data-community-slideshow]')
         if (communitySlideshow && !communitySlideshow.dataset.initialized) {
            communitySlideshow.dataset.initialized = 'true'
            const slideImage = communitySlideshow.querySelector('[data-community-slide]')
            const slides = [
               { src: 'assets/img/community-first-place.jpg', alt: 'Team receiving the first-place award' },
               { src: 'assets/img/community-impact.jpg', alt: 'Mental health project team and certificates' },
               { src: 'assets/img/community-ieee.jpg', alt: 'IEEE community activity' },
               { src: 'assets/img/community-techx.jpg', alt: 'TECHX event activity' },
               { src: 'assets/img/community-root-access.jpg', alt: 'Root Access hackathon activity' },
               { src: 'assets/img/community-securinets.jpg', alt: 'Securinets EPS information session' },
               { src: 'assets/img/community-ieee-event.jpg', alt: 'IEEE Computer Society event' }
            ]
            const dotsContainer = communitySlideshow.querySelector('[data-community-dots]')
            let slideIndex = 0
            let slideTimer
            dotsContainer.innerHTML = ''
            slides.forEach((slide, index) => {
               const dot = document.createElement('button')
               dot.type = 'button'
               dot.className = `community__slide-dot${index === 0 ? ' is-active' : ''}`
               dot.setAttribute('aria-label', `Show community photo ${index + 1}`)
               dot.addEventListener('click', () => showCommunitySlide(index))
               dotsContainer.appendChild(dot)
            })

            const showCommunitySlide = (index) => {
               slideIndex = (index + slides.length) % slides.length
               slideImage.classList.add('is-changing')
               window.setTimeout(() => {
                  slideImage.src = slides[slideIndex].src
                  slideImage.alt = slides[slideIndex].alt
                  slideImage.classList.remove('is-changing')
               }, 220)
               dotsContainer.querySelectorAll('.community__slide-dot').forEach((dot, dotIndex) => {
                  dot.classList.toggle('is-active', dotIndex === slideIndex)
               })
            }

            communitySlideshow.querySelector('[data-community-prev]').addEventListener('click', () => showCommunitySlide(slideIndex - 1))
            communitySlideshow.querySelector('[data-community-next]').addEventListener('click', () => showCommunitySlide(slideIndex + 1))
            slideTimer = window.setInterval(() => showCommunitySlide(slideIndex + 1), 3500)
            communitySlideshow.addEventListener('mouseenter', () => window.clearInterval(slideTimer))
            communitySlideshow.addEventListener('mouseleave', () => {
               slideTimer = window.setInterval(() => showCommunitySlide(slideIndex + 1), 3500)
            })
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
