// Variáveis globais
let products = []
let currentPage = 1
const itemsPerPage = 10
let totalPages = 0
const apiBaseUrl = "/api"

// Carregar produtos quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar a página
    loadProducts()

    // Configurar eventos
    setupEventListeners()
})

// Configurar listeners de eventos
function setupEventListeners() {
    // Pesquisa de produtos
    const searchBtn = document.querySelector(".search-btn")
    const searchInput = document.getElementById("product-search")

    searchBtn.addEventListener("click", () => {
        searchProducts(searchInput.value)
    })

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchProducts(searchInput.value)
        }
    })

    // Paginação
    document.querySelector(".pagination-btn.prev").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--
            loadProducts(currentPage)
        }
    })

    document.querySelector(".pagination-btn.next").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++
            loadProducts(currentPage)
        }
    })

    // Delegação de eventos para botões de ação (editar/excluir)
    document.querySelector(".data-table tbody").addEventListener("click", (e) => {
        const target = e.target

        if (target.classList.contains("edit")) {
            const row = target.closest("tr")
            const productId = row.cells[0].textContent
            openEditModal(productId)
        }

        if (target.classList.contains("delete")) {
            const row = target.closest("tr")
            const productId = row.cells[0].textContent
            confirmDelete(productId)
        }
    })
}

// Carregar produtos da API
async function loadProducts(page = 1, searchTerm = "") {
    try {
        showLoader()

        // Construir URL com parâmetros de consulta
        let url = `${apiBaseUrl}/products?page=${page}&limit=${itemsPerPage}`

        if (searchTerm) {
            url += `&nome=${encodeURIComponent(searchTerm)}`
        }

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Falha ao carregar produtos")
        }

        const data = await response.json()
        products = data.data
        totalPages = data.pagination.pages
        currentPage = data.pagination.page

        renderProducts(products)
        updatePagination()
    } catch (error) {
        showNotification("Erro ao carregar produtos: " + error.message, "error")
        console.error("Erro ao carregar produtos:", error)
    } finally {
        hideLoader()
    }
}

// Renderizar produtos na tabela
function renderProducts(products) {
    const tableBody = document.querySelector(".data-table tbody")
    tableBody.innerHTML = ""

    if (products.length === 0) {
        const emptyRow = document.createElement("tr")
        emptyRow.innerHTML = `
            <td colspan="6" class="text-center">Nenhum produto encontrado</td>
        `
        tableBody.appendChild(emptyRow)
        return
    }

    products.forEach((product) => {
        const row = document.createElement("tr")

        // Formatar preço como moeda brasileira
        const formattedPrice = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(product.preco)

        row.innerHTML = `
            <td>${product.cod_prod || ""}</td>
            <td>${product.nome || ""}</td>
            <td>${product.categoria || ""}</td>
            <td>${formattedPrice}</td>
            <td><span class="status active">Ativo</span></td>
            <td class="actions">
                <button class="action-btn edit">Editar</button>
                <button class="action-btn delete">Excluir</button>
            </td>
        `

        tableBody.appendChild(row)
    })
}

// Atualizar controles de paginação
function updatePagination() {
    const prevBtn = document.querySelector(".pagination-btn.prev")
    const nextBtn = document.querySelector(".pagination-btn.next")
    const pageNumbers = document.querySelector(".page-numbers")

    // Habilitar/desabilitar botões de navegação
    prevBtn.disabled = currentPage <= 1
    nextBtn.disabled = currentPage >= totalPages

    // Atualizar números de página
    pageNumbers.innerHTML = ""

    // Determinar quais páginas mostrar
    let startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, startPage + 2)

    // Ajustar se estamos no final
    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2)
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement("button")
        pageBtn.className = "page-number" + (i === currentPage ? " active" : "")
        pageBtn.textContent = i

        pageBtn.addEventListener("click", () => {
            currentPage = i
            loadProducts(currentPage)
        })

        pageNumbers.appendChild(pageBtn)
    }
}

// Pesquisar produtos
function searchProducts(term) {
    currentPage = 1
    loadProducts(currentPage, term)
}

// Abrir modal para editar produto
function openEditModal(productId) {
    const product = products.find((p) => p.cod_prod === productId || p._id === productId)

    if (!product) {
        showNotification("Produto não encontrado", "error")
        return
    }

    // Preencher o formulário com os dados do produto
    const modal = document.getElementById("add-product-modal")
    const form = document.getElementById("add-product-form")

    // Atualizar título do modal
    modal.querySelector(".modal-header h3").textContent = "Editar Produto"

    // Preencher campos
    form.elements["nome"].value = product.nome || ""
    form.elements["categoria"].value = product.categoria || ""
    form.elements["marca"].value = product.marca || ""
    form.elements["descricao"].value = product.descricao || ""
    form.elements["preco"].value = product.preco || ""
    form.elements["cod_prod"].value = product.cod_prod || ""

    // Desabilitar campo de código se estiver editando
    form.elements["cod_prod"].disabled = true

    // Armazenar ID do produto para atualização
    form.dataset.productId = product._id
    form.dataset.isEdit = "true"

    // Abrir modal
    modal.classList.add("active")

    // Atualizar texto do botão de salvar
    document.getElementById("save-product").textContent = "Atualizar"
}

// Confirmar exclusão de produto
function confirmDelete(productId) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        deleteProduct(productId)
    }
}

// Excluir produto
async function deleteProduct(productId) {
    try {
        showLoader()

        const response = await fetch(`${apiBaseUrl}/products/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            throw new Error("Falha ao excluir produto")
        }

        showNotification("Produto excluído com sucesso", "success")
        loadProducts(currentPage)
    } catch (error) {
        showNotification("Erro ao excluir produto: " + error.message, "error")
        console.error("Erro ao excluir produto:", error)
    } finally {
        hideLoader()
    }
}

// Salvar produto (novo ou atualização)
async function saveProduct(formData, isEdit = false) {
    try {
        showLoader()

        const productData = {
            nome: formData.nome,
            categoria: formData.categoria,
            marca: formData.marca,
            descricao: formData.descricao,
            preco: Number.parseFloat(formData.preco),
            cod_prod: formData.cod_prod,
        }

        let url = `${apiBaseUrl}/products`
        let method = "POST"

        if (isEdit) {
            const productId = document.getElementById("add-product-form").dataset.productId
            url = `${apiBaseUrl}/products/${productId}`
            method = "PUT"
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Falha ao salvar produto")
        }

        showNotification(isEdit ? "Produto atualizado com sucesso" : "Produto adicionado com sucesso", "success")

        // Fechar modal e recarregar produtos
        const modal = document.getElementById("add-product-modal")
        modal.classList.remove("active")
        document.getElementById("add-product-form").reset()

        loadProducts(currentPage)
    } catch (error) {
        showNotification("Erro: " + error.message, "error")
        console.error("Erro ao salvar produto:", error)
    } finally {
        hideLoader()
    }
}

// Utilitários
function showLoader() {
    // Implementar indicador de carregamento
    console.log("Carregando...")
}

function hideLoader() {
    // Ocultar indicador de carregamento
    console.log("Carregamento concluído")
}

function showNotification(message, type = "info") {
    // Implementação simples com alert
    alert(message)

    // Uma implementação mais sofisticada poderia usar um sistema de toast/notificação
}

// Configurar o modal de adicionar/editar produto
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".add-btn")
    const modal = document.getElementById("add-product-modal")
    const closeBtn = modal.querySelector(".modal-close")
    const cancelBtn = modal.querySelector(".modal-cancel")
    const saveBtn = document.getElementById("save-product")
    const form = document.getElementById("add-product-form")

    // Abrir modal para novo produto
    addBtn.addEventListener("click", () => {
        // Resetar formulário
        form.reset()
        form.elements["cod_prod"].disabled = false
        form.dataset.isEdit = "false"
        delete form.dataset.productId

        // Atualizar título e botão
        modal.querySelector(".modal-header h3").textContent = "Adicionar Novo Produto"
        saveBtn.textContent = "Salvar"

        // Abrir modal
        modal.classList.add("active")
    })

    // Fechar modal
    function closeModal() {
        modal.classList.remove("active")
    }

    closeBtn.addEventListener("click", closeModal)
    cancelBtn.addEventListener("click", closeModal)

    // Fechar modal ao clicar fora dele
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })

    // Salvar produto
    saveBtn.addEventListener("click", () => {
        // Verificar se o formulário é válido
        if (form.checkValidity()) {
            // Coletar dados do formulário
            const formData = {
                nome: form.elements["nome"].value,
                categoria: form.elements["categoria"].value,
                marca: form.elements["marca"].value,
                descricao: form.elements["descricao"].value,
                preco: form.elements["preco"].value,
                cod_prod: form.elements["cod_prod"].value,
            }

            // Verificar se é edição ou novo produto
            const isEdit = form.dataset.isEdit === "true"

            // Salvar produto
            saveProduct(formData, isEdit)
        } else {
            // Trigger form validation
            form.reportValidity()
        }
    })

    // Validação de código de produto
    const codProdInput = document.getElementById("product-code")

    codProdInput.addEventListener("input", function () {
        const value = this.value
        const pattern = /^[A-Z]{2}-[A-Z]{3}-\d{3}$/

        if (value && !pattern.test(value)) {
            this.setCustomValidity("Formato inválido. Use o padrão: XX-XXX-000")
        } else {
            this.setCustomValidity("")
        }
    })
})
