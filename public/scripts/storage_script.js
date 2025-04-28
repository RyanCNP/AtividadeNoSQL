// Variáveis globais
let storageItems = []
let currentPage = 1
const itemsPerPage = 10
let totalPages = 0
const apiBaseUrl = "/api"

// Carregar dados de estoque quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar a página
    loadStorageItems()

    // Configurar eventos
    setupEventListeners()
})

// Configurar listeners de eventos
function setupEventListeners() {
    // Pesquisa de itens no estoque
    const searchBtn = document.querySelector(".search-btn")
    const searchInput = document.getElementById("inventory-search")

    searchBtn.addEventListener("click", () => {
        searchStorage(searchInput.value)
    })

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchStorage(searchInput.value)
        }
    })

    // Paginação
    document.querySelector(".pagination-btn.prev").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--
            loadStorageItems(currentPage)
        }
    })

    document.querySelector(".pagination-btn.next").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++
            loadStorageItems(currentPage)
        }
    })

    // Delegação de eventos para botões de ação (adicionar/remover)
    document.querySelector(".data-table tbody").addEventListener("click", (e) => {
        const target = e.target

        if (target.classList.contains("add")) {
            const row = target.closest("tr")
            const productId = row.cells[0].textContent
            openAddStockModal(productId)
        }

        if (target.classList.contains("remove")) {
            const row = target.closest("tr")
            const productId = row.cells[0].textContent
            openRemoveStockModal(productId)
        }
    })
}

// Carregar itens de estoque da API
async function loadStorageItems(page = 1, searchTerm = "") {
    try {
        showLoader()

        // Construir URL com parâmetros de consulta
        let url = `${apiBaseUrl}/storage?page=${page}&limit=${itemsPerPage}`

        if (searchTerm) {
            url += `&search=${encodeURIComponent(searchTerm)}`
        }

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Falha ao carregar dados de estoque")
        }

        const data = await response.json()

        // Se a API retornar um objeto com paginação
        if (data.pagination) {
            storageItems = data.data
            totalPages = data.pagination.pages
            currentPage = data.pagination.page
        } else {
            // Se a API retornar apenas um array
            storageItems = data
            totalPages = Math.ceil(data.length / itemsPerPage)
        }

        renderStorageItems(storageItems)
        updatePagination()
    } catch (error) {
        showNotification("Erro ao carregar dados de estoque: " + error.message, "error")
        console.error("Erro ao carregar dados de estoque:", error)
    } finally {
        hideLoader()
    }
}

// Renderizar itens de estoque na tabela
function renderStorageItems(items) {
    const tableBody = document.querySelector(".data-table tbody")
    tableBody.innerHTML = ""

    if (items.length === 0) {
        const emptyRow = document.createElement("tr")
        emptyRow.innerHTML = `
            <td colspan="6" class="text-center">Nenhum item encontrado no estoque</td>
        `
        tableBody.appendChild(emptyRow)
        return
    }

    items.forEach((item) => {
        const row = document.createElement("tr")

        // Determinar o status do estoque
        let stockStatus = "out-of-stock"
        let stockText = "Sem Estoque"

        if (item.qtd > 0) {
            if (item.qtd <= 10) {
                stockStatus = "low-stock"
                stockText = "Estoque Baixo"
            } else {
                stockStatus = "in-stock"
                stockText = "Em Estoque"
            }
        }

        // Formatar data
        const updateDate = item.upDate ? new Date(item.upDate).toLocaleDateString("pt-BR") : ""

        row.innerHTML = `
            <td>${item.cod_prod || ""}</td>
            <td>${item.descricao || ""}</td>
            <td>${item.qtd || 0}</td>
            <td><span class="stock ${stockStatus}">${stockText}</span></td>
            <td>${updateDate}</td>
            <td class="actions">
                <button class="action-btn add">+ Adicionar</button>
                <button class="action-btn remove" ${item.qtd <= 0 ? "disabled" : ""}>- Remover</button>
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
            loadStorageItems(currentPage)
        })

        pageNumbers.appendChild(pageBtn)
    }
}

// Pesquisar itens no estoque
function searchStorage(term) {
    currentPage = 1
    loadStorageItems(currentPage, term)
}

// Abrir modal para adicionar ao estoque
function openAddStockModal(productId) {
    const item = storageItems.find((i) => i.cod_prod === productId)

    // Preencher o formulário com os dados do produto
    const modal = document.getElementById("add-stock-modal")
    const form = document.getElementById("add-stock-form")

    // Atualizar título do modal
    let title = "Adicionar ao Estoque"
    if (item) {
        title += `: ${item.descricao || productId}`
    }
    modal.querySelector(".modal-header h3").textContent = title

    // Preencher campo de código do produto
    form.elements["cod_prod"].value = productId

    // Definir operação como adição
    form.dataset.operation = "add"

    // Abrir modal
    modal.classList.add("active")
}

// Abrir modal para remover do estoque
function openRemoveStockModal(productId) {
    const item = storageItems.find((i) => i.cod_prod === productId)

    if (!item || item.qtd <= 0) {
        showNotification("Não é possível remover itens de um estoque vazio", "error")
        return
    }

    // Preencher o formulário com os dados do produto
    const modal = document.getElementById("add-stock-modal")
    const form = document.getElementById("add-stock-form")

    // Atualizar título do modal
    let title = "Remover do Estoque"
    if (item) {
        title += `: ${item.descricao || productId}`
    }
    modal.querySelector(".modal-header h3").textContent = title

    // Preencher campo de código do produto
    form.elements["cod_prod"].value = productId

    // Definir quantidade máxima que pode ser removida
    form.elements["qtd"].max = item.qtd

    // Definir operação como remoção
    form.dataset.operation = "remove"

    // Abrir modal
    modal.classList.add("active")
}

// Atualizar estoque (adicionar ou remover)
async function updateStock(formData, operation = "add") {
    try {
        showLoader()

        const cod_prod = formData.cod_prod
        let qtd = Number.parseInt(formData.qtd)

        // Se for remoção, converter para número negativo
        if (operation === "remove") {
            qtd = -qtd
        }

        const stockData = {
            qtd: qtd,
            descricao: formData.descricao,
            exitDate: operation === "remove" ? new Date().toISOString() : null,
        }

        const response = await fetch(`${apiBaseUrl}/storage/${cod_prod}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stockData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Falha ao atualizar estoque")
        }

        showNotification(operation === "add" ? "Estoque adicionado com sucesso" : "Estoque removido com sucesso", "success")

        // Fechar modal e recarregar dados
        const modal = document.getElementById("add-stock-modal")
        modal.classList.remove("active")
        document.getElementById("add-stock-form").reset()

        loadStorageItems(currentPage)
    } catch (error) {
        showNotification("Erro: " + error.message, "error")
        console.error("Erro ao atualizar estoque:", error)
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

// Configurar o modal de atualizar estoque
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".add-btn")
    const modal = document.getElementById("add-stock-modal")
    const closeBtn = modal.querySelector(".modal-close")
    const cancelBtn = modal.querySelector(".modal-cancel")
    const saveBtn = document.getElementById("save-stock")
    const form = document.getElementById("add-stock-form")

    // Definir a data de hoje como padrão
    const today = new Date().toISOString().split("T")[0]
    document.getElementById("stock-date").value = today

    // Abrir modal para nova entrada de estoque
    addBtn.addEventListener("click", () => {
        // Resetar formulário
        form.reset()
        document.getElementById("stock-date").value = today
        form.dataset.operation = "add"

        // Atualizar título
        modal.querySelector(".modal-header h3").textContent = "Atualizar Estoque"

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

    // Salvar atualização de estoque
    saveBtn.addEventListener("click", () => {
        // Verificar se o formulário é válido
        if (form.checkValidity()) {
            // Coletar dados do formulário
            const formData = {
                cod_prod: form.elements["cod_prod"].value,
                qtd: form.elements["qtd"].value,
                entryDate: form.elements["entryDate"].value,
                descricao: form.elements["descricao"].value,
                status: form.elements["status"].value,
            }

            // Verificar operação (adicionar ou remover)
            const operation = form.dataset.operation || "add"

            // Atualizar estoque
            updateStock(formData, operation)
        } else {
            // Trigger form validation
            form.reportValidity()
        }
    })

    // Validação de código de produto
    const codProdInput = document.getElementById("stock-product-code")

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

// Função para pesquisa (chamada pelo botão de busca)
function searchInventory() {
    const searchTerm = document.getElementById("inventory-search").value
    searchStorage(searchTerm)
}
