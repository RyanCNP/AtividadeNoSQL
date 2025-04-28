// Script principal para a página inicial

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar componentes
    initializeComponents()

    // Configurar animações
    setupAnimations()

    // Configurar navegação
    setupNavigation()
})

// Inicializar componentes da página
function initializeComponents() {
    // Formulário de newsletter
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault()
            const emailInput = this.querySelector('input[type="email"]')

            if (emailInput && emailInput.value) {
                // Simular envio do formulário
                alert(`Obrigado por se inscrever com o email: ${emailInput.value}`)
                emailInput.value = ""
            }
        })
    }

    // Links de contato
    const contactLinks = document.querySelectorAll('a[href="#contact"]')
    contactLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault()
            const contactSection = document.getElementById("contact")
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
            }
        })
    })
}

// Configurar animações
function setupAnimations() {
    // Animação de fade-in para elementos quando entram na viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".feature-card, .about-content, .hero-content")

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top
            const screenPosition = window.innerHeight / 1.3

            if (elementPosition < screenPosition) {
                element.classList.add("animated")
            }
        })
    }

    // Adicionar classe para elementos que serão animados
    const elementsToAnimate = document.querySelectorAll(".feature-card, .about-content, .hero-content")
    elementsToAnimate.forEach((element) => {
        element.classList.add("animate-on-scroll")
    })

    // Executar animação no carregamento e no scroll
    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll() // Executar uma vez no carregamento
}

// Configurar navegação
function setupNavigation() {
    // Destacar link ativo no menu de navegação
    const navLinks = document.querySelectorAll("nav ul li a")
    const currentPage = window.location.pathname.split("/").pop() || "index.html"

    navLinks.forEach((link) => {
        const href = link.getAttribute("href")
        if (href === currentPage) {
            link.classList.add("active")
        } else {
            link.classList.remove("active")
        }
    })

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            if (targetId === "#") return

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }
        })
    })

    // Botão "Comece Agora" na seção hero
    const startNowBtn = document.querySelector(".hero-content .btn-primary")
    if (startNowBtn) {
        startNowBtn.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault()
                const targetId = this.getAttribute("href")
                const targetElement = document.querySelector(targetId)

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    })
                }
            }
        })
    }
}

// Adicionar efeito de hover nos cards de recursos
function setupFeatureCards() {
    const featureCards = document.querySelectorAll(".feature-card")

    featureCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px)"
            this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)"
        })

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)"
            this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)"
        })
    })
}

// Executar setup de cards quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    setupFeatureCards()
})
