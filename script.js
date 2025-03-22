document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX
      const posY = e.clientY

      cursorDot.style.left = `${posX}px`
      cursorDot.style.top = `${posY}px`

      // Add delay to outline cursor with animation
      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" },
      )
    })
  }

  // Check if device is touch screen and disable custom cursor
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  }

  if (isTouchDevice()) {
    document.body.classList.add("touch-device")

    if (cursorDot) cursorDot.style.display = "none"
    if (cursorOutline) cursorOutline.style.display = "none"
  }

  // Menú transparente con efecto de scroll
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled")
    } else {
      header.classList.remove("header-scrolled")
    }
  })

  // Menú móvil
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Cerrar menú al hacer clic en un enlace
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (menuToggle && menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  })

  // Scroll indicator functionality
  const scrollIndicator = document.querySelector(".hero-scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const nextSection = document.querySelector("section:not(#hero)")
      if (nextSection) {
        window.scrollTo({
          top: nextSection.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  }

  // Biografia modular navigation
  const biografiaModules = document.querySelectorAll(".biografia-module")
  const biografiaIndicators = document.querySelectorAll(".biografia-indicator")
  const prevBiografiaBtn = document.querySelector(".biografia-navigation .prev")
  const nextBiografiaBtn = document.querySelector(".biografia-navigation .next")
  let currentBiografiaIndex = 0

  function showBiografiaModule(index) {
    biografiaModules.forEach((module, i) => {
      if (i === index) {
        module.classList.add("active")
      } else {
        module.classList.remove("active")
      }
    })

    biografiaIndicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })

    currentBiografiaIndex = index
  }

  // Initialize first module as active
  if (biografiaModules.length > 0) {
    showBiografiaModule(0)
  }

  if (prevBiografiaBtn && nextBiografiaBtn) {
    prevBiografiaBtn.addEventListener("click", () => {
      let newIndex = currentBiografiaIndex - 1
      if (newIndex < 0) newIndex = biografiaModules.length - 1
      showBiografiaModule(newIndex)
    })

    nextBiografiaBtn.addEventListener("click", () => {
      let newIndex = currentBiografiaIndex + 1
      if (newIndex >= biografiaModules.length) newIndex = 0
      showBiografiaModule(newIndex)
    })
  }

  // Biography indicator click events
  biografiaIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showBiografiaModule(index)
    })
  })

  // Frases carousel functionality
  const fraseSlides = document.querySelectorAll(".frase-slide")
  const fraseDots = document.querySelectorAll(".frase-dot")
  const prevFraseBtn = document.querySelector(".frases-arrows .prev")
  const nextFraseBtn = document.querySelector(".frases-arrows .next")
  let currentFraseIndex = 0

  function showFraseSlide(index) {
    fraseSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active")
      } else {
        slide.classList.remove("active")
      }
    })

    fraseDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })

    currentFraseIndex = index
  }

  if (fraseSlides.length > 0) {
    // Initialize first slide as active
    showFraseSlide(0)
  }

  if (prevFraseBtn && nextFraseBtn) {
    prevFraseBtn.addEventListener("click", () => {
      let newIndex = currentFraseIndex - 1
      if (newIndex < 0) newIndex = fraseSlides.length - 1
      showFraseSlide(newIndex)
    })

    nextFraseBtn.addEventListener("click", () => {
      let newIndex = currentFraseIndex + 1
      if (newIndex >= fraseSlides.length) newIndex = 0
      showFraseSlide(newIndex)
    })
  }

  // Frase dot click events
  fraseDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number.parseInt(dot.getAttribute("data-index"))
      showFraseSlide(index)
    })
  })

  // Auto-rotate frases
  if (fraseSlides.length > 0) {
    setInterval(() => {
      let newIndex = currentFraseIndex + 1
      if (newIndex >= fraseSlides.length) newIndex = 0
      showFraseSlide(newIndex)
    }, 8000)
  }

  // Timeline functionality
  const timelineMoments = document.querySelectorAll(".timeline-moment")
  const timelineIndicators = document.querySelectorAll(".timeline-indicator")
  const prevTimelineBtn = document.querySelector(".timeline-control.prev")
  const nextTimelineBtn = document.querySelector(".timeline-control.next")
  const timelineProgress = document.querySelector(".timeline-progress")
  let currentTimelineIndex = 0

  function showTimelineMoment(index) {
    timelineMoments.forEach((moment, i) => {
      if (i === index) {
        moment.classList.add("active")
      } else {
        moment.classList.remove("active")
      }
    })

    timelineIndicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })

    if (timelineProgress) {
      // Calculate progress as percentage of timeline completed
      const progressPercentage = (index / (timelineMoments.length - 1)) * 100
      timelineProgress.style.width = `${progressPercentage}%`
    }

    currentTimelineIndex = index
  }

  // Initialize first moment as active
  if (timelineMoments.length > 0) {
    showTimelineMoment(0)
  }

  if (prevTimelineBtn && nextTimelineBtn) {
    prevTimelineBtn.addEventListener("click", () => {
      let newIndex = currentTimelineIndex - 1
      if (newIndex < 0) newIndex = timelineMoments.length - 1
      showTimelineMoment(newIndex)
    })

    nextTimelineBtn.addEventListener("click", () => {
      let newIndex = currentTimelineIndex + 1
      if (newIndex >= timelineMoments.length) newIndex = 0
      showTimelineMoment(newIndex)
    })
  }

  // Timeline indicator click events
  timelineIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showTimelineMoment(index)
    })
  })

  // Frases aleatorias para la sección "Frase del día"
  const fraseElement = document.getElementById("frase-canserbero")
  const nuevaFraseBtn = document.getElementById("nueva-frase")
  const currentDateElement = document.getElementById("current-date")

  const frases = [
    '"Es muy fácil criticar y juzgar sin antes caminar con los zapatos del otro." - C\'est La Mort',
    '"La vida es un ciclo y el mundo es una bola que gira en un círculo vicioso." - Jeremías 17:5',
    '"Yo solo soy un simple mortal, con defectos y errores como cualquiera." - Maquiavélico',
    '"Cuando el dinero habla, la verdad calla." - Vida',
    '"Nadie sabe lo que tiene hasta que lo ve perdido." - Es épico',
    '"Hay que morir para vivir, hay que vivir para morir." - Muerte',
    '"Soy un simple mortal, con defectos y errores como cualquiera." - Maquiavélico',
    '"Soy un hombre, no un santo." - Llovía',
    '"Soy un ser humano, no un robot." - Pensando',
    '"La vida es un préstamo y la muerte un cobrador." - Vida',
  ]

  function mostrarFraseAleatoria() {
    if (fraseElement) {
      const indiceAleatorio = Math.floor(Math.random() * frases.length)
      fraseElement.textContent = frases[indiceAleatorio]
    }
  }

  // Display current date
  if (currentDateElement) {
    const now = new Date()
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    currentDateElement.textContent = now.toLocaleDateString("es-ES", options)
  }

  // Mostrar una frase aleatoria al cargar la página
  if (fraseElement) {
    mostrarFraseAleatoria()
  }

  // Cambiar la frase al hacer clic en el botón
  if (nuevaFraseBtn) {
    nuevaFraseBtn.addEventListener("click", () => {
      mostrarFraseAleatoria()

      // Add rotation animation to button icon
      const btnIcon = nuevaFraseBtn.querySelector(".btn-icon")
      if (btnIcon) {
        btnIcon.classList.add("rotate")
        setTimeout(() => {
          btnIcon.classList.remove("rotate")
        }, 500)
      }
    })
  }

  // Gallery hover effect
  const galeriaItems = document.querySelectorAll(".galeria-item")

  galeriaItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      galeriaItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.add("dimmed")
        }
      })
    })

    item.addEventListener("mouseleave", () => {
      galeriaItems.forEach((otherItem) => {
        otherItem.classList.remove("dimmed")
      })
    })
  })

  // Parallax effect for hero section
  const heroContent = document.querySelector(".hero-content")

  if (heroContent) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY

      if (scrollPosition < window.innerHeight) {
        const translateY = scrollPosition * 0.4
        const opacity = 1 - scrollPosition / (window.innerHeight * 0.8)

        heroContent.style.transform = `translateY(${translateY}px)`
        heroContent.style.opacity = Math.max(0, opacity)
      }
    })
  }

  // Animación de aparición al hacer scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const sections = document.querySelectorAll("section:not(#hero)")
  sections.forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })

  // Añadir clase para animación de aparición
  document.head.insertAdjacentHTML(
    "beforeend",
    `
      <style>
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      </style>
    `,
  )

  // Animación de conteo para las estadísticas
  const statNumbers = document.querySelectorAll(".stat-number[data-count]")

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-count"))
      const duration = 2000 // 2 segundos para la animación
      const startTime = Date.now()

      const updateCount = () => {
        const currentTime = Date.now()
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const currentCount = Math.floor(progress * target)

        stat.textContent = currentCount

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else {
          stat.textContent = target
        }
      }

      stat.classList.add("animate")
      updateCount()
    })
  }

  // Usar Intersection Observer para activar la animación cuando las estadísticas son visibles
  const statsSection = document.querySelector(".sobre-canserbero-stats")
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(statsSection)
  }

  // Efecto para los botones de navegación en el hero
  const heroNavButtons = document.querySelectorAll(".hero-nav-button")

  heroNavButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const icon = button.querySelector(".btn-icon")
      if (icon) {
        icon.style.transform = "translateX(-3px)"
      }
    })

    button.addEventListener("mouseleave", () => {
      const icon = button.querySelector(".btn-icon")
      if (icon) {
        icon.style.transform = "translateX(0)"
      }
    })
  })

  // Asegurarse de que el atributo data-text del título hero-v2 esté configurado correctamente
  const heroTitle = document.querySelector(".hero-title-v2")
  if (heroTitle) {
    // Asegurarse de que el texto del data-attribute coincida con el contenido
    const titleText = heroTitle.textContent.trim()
    heroTitle.setAttribute("data-text", titleText)
  }

  // Funcionalidad específica para la sección Top Tracks - Hall of Fame
  const legendaryTracks = document.querySelectorAll(".legendary-track")
  if (legendaryTracks.length > 0) {
    // Añadir animación de entrada para los tracks
    legendaryTracks.forEach((track, index) => {
      track.style.opacity = "0"
      track.style.transform = "translateY(30px)"
      track.style.transition = "opacity 0.5s ease, transform 0.5s ease"

      setTimeout(
        () => {
          track.style.opacity = "1"
          track.style.transform = "translateY(0)"
        },
        300 + index * 150,
      )
    })

    // Funcionalidad para las barras de forma de onda
    const waveformBars = document.querySelectorAll(".waveform-bar")
    waveformBars.forEach((bar) => {
      const randomDelay = Math.random() * 1.5
      bar.style.animationDelay = `${randomDelay}s`
    })
  }

  // Añadir código específico para la sección Top Tracks - Hall of Fame
  // Agregar este código al final del evento DOMContentLoaded

  // Funcionalidad específica para la sección Top Tracks - Hall of Fame
  const legendaryTracks2 = document.querySelectorAll(".legendary-track")
  if (legendaryTracks2.length > 0) {
    // Añadir animación de entrada para los tracks
    legendaryTracks2.forEach((track, index) => {
      track.style.opacity = "0"
      track.style.transform = "translateY(30px)"
      track.style.transition = "opacity 0.5s ease, transform 0.5s ease"

      setTimeout(
        () => {
          track.style.opacity = "1"
          track.style.transform = "translateY(0)"
        },
        300 + index * 150,
      )
    })

    // Funcionalidad para expandir/colapsar tracks
    /*const expandButtons = document.querySelectorAll(".expand-btn")
    expandButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const track = this.closest(".legendary-track")
        track.classList.toggle("expanded")

        // Cambiar el ícono del botón
        const icon = this.querySelector("i")
        if (track.classList.contains("expanded")) {
          icon.classList.remove("fa-chevron-down")
          icon.classList.add("fa-chevron-up")
        } else {
          icon.classList.remove("fa-chevron-up")
          icon.classList.add("fa-chevron-down")
        }
      })
    })*/

    // Añadir efectos de hover para los iconos de plataforma
    const platformIcons = document.querySelectorAll(".platform-icon")
    platformIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px) scale(1.1)"
      })

      icon.addEventListener("mouseleave", function () {
        this.style.transform = ""
      })
    })

    // Añadir efecto de pulsación al hacer clic en los iconos
    platformIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        // Crear efecto de pulsación
        this.style.transform = "scale(0.95)"
        setTimeout(() => {
          this.style.transform = "translateY(-3px) scale(1.1)"
        }, 100)

        // Registrar analítica (simulado)
        const platform = this.classList.contains("spotify")
          ? "Spotify"
          : this.classList.contains("youtube")
            ? "YouTube"
            : "Apple Music"
        const track = this.closest(".legendary-track").getAttribute("data-track")
        console.log(`Abriendo ${track} en ${platform}`)
      })
    })

    // Funcionalidad para reproducir/pausar tracks
    const playButtons = document.querySelectorAll(".play-btn")
    playButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const track = this.closest(".legendary-track")
        const isPlaying = track.classList.contains("playing")

        // Pausar todos los tracks primero
        document.querySelectorAll(".legendary-track").forEach((t) => {
          t.classList.remove("playing")
          const playIcon = t.querySelector(".play-btn i")
          if (playIcon) {
            playIcon.classList.remove("fa-pause")
            playIcon.classList.add("fa-play")
          }
        })

        // Si no estaba reproduciendo, iniciar reproducción
        if (!isPlaying) {
          track.classList.add("playing")
          const icon = this.querySelector("i")
          icon.classList.remove("fa-play")
          icon.classList.add("fa-pause")

          // Simular reproducción de audio (en un sitio real, aquí se reproduciría el audio)
          console.log(`Reproduciendo: ${track.getAttribute("data-track")}`)

          // Animar las barras de forma de onda
          const waveformBars = track.querySelectorAll(".waveform-bar")
          waveformBars.forEach((bar) => {
            // Asignar alturas aleatorias para simular la visualización de audio
            const randomHeight = Math.floor(Math.random() * 100) + 10
            bar.style.height = `${randomHeight}%`

            // Asignar delays aleatorios para la animación
            const randomDelay = Math.random() * 1.5
            bar.style.animationDelay = `${randomDelay}s`
          })
        }
      })
    })

    // Efecto hover para los tracks
    legendaryTracks2.forEach((track) => {
      track.addEventListener("mouseenter", () => {
        const waveformBars = track.querySelectorAll(".waveform-bar")
        waveformBars.forEach((bar) => {
          // Cambiar ligeramente las alturas al hacer hover
          const currentHeight = Number.parseInt(bar.style.height || "50%")
          const newHeight = Math.min(100, currentHeight + Math.floor(Math.random() * 20))
          bar.style.height = `${newHeight}%`
        })
      })
    })

    // Hacer que las barras de forma de onda sean interactivas
    const waveformContainers = document.querySelectorAll(".waveform-container")
    waveformContainers.forEach((container) => {
      container.addEventListener("click", function (e) {
        const track = this.closest(".legendary-track")
        const containerWidth = this.offsetWidth
        const clickPosition = e.offsetX
        const progressPercentage = (clickPosition / containerWidth) * 100

        // Actualizar visualmente la "reproducción"
        const bars = this.querySelectorAll(".waveform-bar")
        bars.forEach((bar, index) => {
          const barPosition = (index / bars.length) * 100
          if (barPosition < progressPercentage) {
            bar.style.backgroundColor = "rgba(255, 0, 0, 0.6)"
          } else {
            bar.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
          }
        })

        // Simular salto en la reproducción
        console.log(`Saltando a: ${Math.round(progressPercentage)}% en ${track.getAttribute("data-track")}`)
      })
    })
  }
})

