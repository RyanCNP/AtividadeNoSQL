// Configuração da API
const API_URL = 'https://backend-geo-kappa.vercel.app/api';

// Estado da aplicação
let estado = {
    municipios: {
        pagina: 1,
        limite: 10,
        ordenacao: '_id',
        ordem: 'asc',
        filtroNome: '',
        total: 0,
        dados: []
    },
    municipioAtual: null,
    municipioExcluir: null
};

// Elementos DOM
const elementos = {
    // Tabs
    tabButtons: document.querySelectorAll('.tab-button'),
    tabContents: document.querySelectorAll('.tab-content'),

    // Listagem
    tabelaMunicipios: document.getElementById('tabela-municipios'),
    totalRegistros: document.getElementById('total-registros'),
    paginaAtual: document.getElementById('pagina-atual'),
    btnAnterior: document.getElementById('btn-anterior'),
    btnProximo: document.getElementById('btn-proximo'),
    filtroNome: document.getElementById('filtro-nome'),
    ordenarPor: document.getElementById('ordenar-por'),
    ordem: document.getElementById('ordem'),
    btnFiltrar: document.getElementById('btn-filtrar'),

    // Formulário
    formMunicipio: document.getElementById('form-municipio'),
    formTitulo: document.getElementById('form-titulo'),
    municipioId: document.getElementById('municipio-id'),
    municipioNome: document.getElementById('municipio-nome'),
    municipioCodigoIbge: document.getElementById('municipio-codigo-ibge'),
    municipioCodigoUf: document.getElementById('municipio-codigo-uf'),
    municipioCapital: document.getElementById('municipio-capital'),
    municipioLatitude: document.getElementById('municipio-latitude'),
    municipioLongitude: document.getElementById('municipio-longitude'),
    btnCancelar: document.getElementById('btn-cancelar'),
    btnSalvar: document.getElementById('btn-salvar'),
    formErrors: document.getElementById('form-errors'),
    errorList: document.getElementById('error-list'),

    // Proximidade
    proximidadeLatitude: document.getElementById('proximidade-latitude'),
    proximidadeLongitude: document.getElementById('proximidade-longitude'),
    proximidadeDistancia: document.getElementById('proximidade-distancia'),
    btnUsarLocalizacao: document.getElementById('btn-usar-localizacao'),
    btnBuscarProximidade: document.getElementById('btn-buscar-proximidade'),
    tabelaProximidade: document.getElementById('tabela-proximidade'),

    // Modal de confirmação
    modalConfirmacao: document.getElementById('modal-confirmacao'),
    municipioExcluirNome: document.getElementById('municipio-excluir-nome'),
    btnCancelarExclusao: document.getElementById('btn-cancelar-exclusao'),
    btnConfirmarExclusao: document.getElementById('btn-confirmar-exclusao'),

    // Toast
    toast: document.getElementById('toast'),
    toastIcon: document.getElementById('toast-icon'),
    toastTitulo: document.getElementById('toast-titulo'),
    toastMensagem: document.getElementById('toast-mensagem'),

    // Menu mobile
    mobileMenuButton: document.getElementById('mobile-menu-button'),
    mobileMenu: document.getElementById('mobile-menu'),

    // Links de navegação
    navMunicipios: document.getElementById('nav-municipios'),
    navMunicipiosMobile: document.getElementById('nav-municipios-mobile'),
    btnGerenciarMunicipios: document.getElementById('btn-gerenciar-municipios')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tabs
    inicializarTabs();

    // Inicializar menu mobile
    inicializarMenuMobile();

    // Carregar municípios
    carregarMunicipios();

    // Adicionar event listeners
    adicionarEventListeners();

    // Corrigir navegação por âncoras
    corrigirNavegacaoAncoras();
});

// Funções de inicialização
function inicializarTabs() {
    elementos.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.id.replace('tab-', '');

            // Remover classe active de todos os botões
            elementos.tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-primary-500', 'text-primary-500');
                btn.classList.add('border-transparent', 'hover:text-primary-400', 'hover:border-primary-400');
            });

            // Adicionar classe active ao botão clicado
            button.classList.add('active', 'border-primary-500', 'text-primary-500');
            button.classList.remove('border-transparent', 'hover:text-primary-400', 'hover:border-primary-400');

            // Esconder todos os conteúdos
            elementos.tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Mostrar o conteúdo correspondente
            document.getElementById(`content-${tabId}`).classList.remove('hidden');
        });
    });
}

function inicializarMenuMobile() {
    elementos.mobileMenuButton.addEventListener('click', () => {
        elementos.mobileMenu.classList.toggle('hidden');
    });
}

function corrigirNavegacaoAncoras() {
    // Corrigir navegação para a seção de municípios
    const handleMunicipiosClick = (e) => {
        e.preventDefault();

        // Rolar até a seção
        const secaoMunicipios = document.getElementById('municipios');
        secaoMunicipios.scrollIntoView({ behavior: 'smooth' });

        // Garantir que a tab "Listar" esteja ativa
        document.getElementById('tab-listar').click();

        // Recarregar os dados
        carregarMunicipios();
    };

    // Adicionar event listeners para os links de municípios
    if (elementos.navMunicipios) {
        elementos.navMunicipios.addEventListener('click', handleMunicipiosClick);
    }

    if (elementos.navMunicipiosMobile) {
        elementos.navMunicipiosMobile.addEventListener('click', handleMunicipiosClick);
    }

    if (elementos.btnGerenciarMunicipios) {
        elementos.btnGerenciarMunicipios.addEventListener('click', handleMunicipiosClick);
    }
}

function adicionarEventListeners() {
    // Filtros e paginação
    elementos.btnFiltrar.addEventListener('click', () => {
        estado.municipios.pagina = 1;
        estado.municipios.filtroNome = elementos.filtroNome.value;
        estado.municipios.ordenacao = elementos.ordenarPor.value;
        estado.municipios.ordem = elementos.ordem.value;
        carregarMunicipios();
    });

    elementos.btnAnterior.addEventListener('click', () => {
        if (estado.municipios.pagina > 1) {
            estado.municipios.pagina--;
            carregarMunicipios();
        }
    });

    elementos.btnProximo.addEventListener('click', () => {
        const totalPaginas = Math.ceil(estado.municipios.total / estado.municipios.limite);
        if (estado.municipios.pagina < totalPaginas) {
            estado.municipios.pagina++;
            carregarMunicipios();
        }
    });

    // Formulário
    elementos.formMunicipio.addEventListener('submit', (e) => {
        e.preventDefault();
        salvarMunicipio();
    });

    elementos.btnCancelar.addEventListener('click', () => {
        limparFormulario();
        // Voltar para a tab de listagem
        document.getElementById('tab-listar').click();
    });

    // Proximidade
    elementos.btnUsarLocalizacao.addEventListener('click', () => {
        obterLocalizacaoAtual();
    });

    elementos.btnBuscarProximidade.addEventListener('click', () => {
        buscarMunicipiosPorProximidade();
    });

    // Modal de confirmação
    elementos.btnCancelarExclusao.addEventListener('click', () => {
        fecharModalConfirmacao();
    });

    elementos.btnConfirmarExclusao.addEventListener('click', () => {
        excluirMunicipio();
    });
}

// Funções de API
async function carregarMunicipios() {
    try {
        const url = `${API_URL}/municipios?page=${estado.municipios.pagina}&limit=${estado.municipios.limite}&sort=${estado.municipios.ordenacao}&order=${estado.municipios.ordem}&nome=${estado.municipios.filtroNome}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.data) {
            estado.municipios.dados = data.data;
            estado.municipios.total = data.pagination.total;

            renderizarTabelaMunicipios();
            atualizarPaginacao();
        } else {
            mostrarToast('Erro', 'Erro ao carregar municípios', false);
        }
    } catch (error) {
        console.error('Erro ao carregar municípios:', error);
        mostrarToast('Erro', 'Não foi possível carregar os municípios', false);
    }
}

async function buscarMunicipioPorId(id) {
    try {
        const response = await fetch(`${API_URL}/municipios/${id}`);
        const data = await response.json();

        if (data) {
            return data
        } else {
            mostrarToast('Erro', 'Erro ao buscar município', false);
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar município:', error);
        mostrarToast('Erro', 'Não foi possível buscar o município', false);
        return null;
    }
}

async function salvarMunicipio() {
    try {
        // Esconder mensagens de erro anteriores
        elementos.formErrors.classList.add('hidden');
        elementos.errorList.innerHTML = '';

        const municipio = {
            nome: elementos.municipioNome.value,
            codigo_ibge: parseInt(elementos.municipioCodigoIbge.value),
            codigo_uf: parseInt(elementos.municipioCodigoUf.value),
            capital: elementos.municipioCapital.value === 'true',
            local: {
                type: 'Point',
                coordinates: [
                    parseFloat(elementos.municipioLongitude.value),
                    parseFloat(elementos.municipioLatitude.value)
                ]
            }
        };

        let url = `${API_URL}/municipios`;
        let method = 'POST';
        let mensagemSucesso = 'Município adicionado com sucesso!';

        // Se tiver ID, é uma edição
        if (elementos.municipioId.value) {
            url = `${API_URL}/municipios/${elementos.municipioId.value}`;
            method = 'PUT';
            mensagemSucesso = 'Município atualizado com sucesso!';
        }

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(municipio)
        });

        const data = await response.json();

        if (response.ok) {
            mostrarToast('Sucesso', mensagemSucesso, true);
            limparFormulario();

            // Voltar para a tab de listagem e recarregar
            document.getElementById('tab-listar').click();
            carregarMunicipios();
        } else {
            // Exibir erros de validação
            if (data.error && data.errors) {
                mostrarErrosValidacao(data.errors);
            } else {
                mostrarToast('Erro', data.message || 'Erro ao salvar município', false);
            }
        }
    } catch (error) {
        console.error('Erro ao salvar município:', error);
        mostrarToast('Erro', 'Não foi possível salvar o município', false);
    }
}

function mostrarErrosValidacao(erros) {
    elementos.formErrors.classList.remove('hidden');
    elementos.errorList.innerHTML = erros.map(erro => `<li>${erro.msg}</li>`).join('');
    mostrarToast('Erro', 'Existem erros de validação no formulário', false);
}

async function excluirMunicipio() {
    try {
        if (!estado.municipioExcluir) return;

        const response = await fetch(`${API_URL}/municipios/${estado.municipioExcluir}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            mostrarToast('Sucesso', 'Município excluído com sucesso!', true);
            fecharModalConfirmacao();
            carregarMunicipios();
        } else {
            mostrarToast('Erro', data.message || 'Erro ao excluir município', false);
        }
    } catch (error) {
        console.error('Erro ao excluir município:', error);
        mostrarToast('Erro', 'Não foi possível excluir o município', false);
    }
}

async function buscarMunicipiosPorProximidade() {
    try {
        const latitude = elementos.proximidadeLatitude.value;
        const longitude = elementos.proximidadeLongitude.value;
        const distancia = elementos.proximidadeDistancia.value;

        if (!latitude || !longitude || !distancia) {
            mostrarToast('Atenção', 'Preencha todos os campos para buscar por proximidade', false);
            return;
        }

        const url = `${API_URL}/municipios/nearby?latitude=${latitude}&longitude=${longitude}&distance=${distancia}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.data) {
            renderizarTabelaProximidade(data.data);
        } else {
            mostrarToast('Erro', data.message || 'Erro ao buscar municípios próximos', false);
        }
    } catch (error) {
        console.error('Erro ao buscar municípios por proximidade:', error);
        mostrarToast('Erro', 'Não foi possível buscar municípios próximos', false);
    }
}

// Funções de UI
function renderizarTabelaMunicipios() {
    if (estado.municipios.dados.length === 0) {
        elementos.tabelaMunicipios.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-4 text-center text-gray-400">Nenhum município encontrado</td>
            </tr>
        `;
        return;
    }

    elementos.tabelaMunicipios.innerHTML = estado.municipios.dados.map(municipio => `
        <tr class="hover:bg-gray-800">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${municipio._id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-white">${municipio.nome}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${municipio.codigo_ibge || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${municipio.codigo_uf || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${municipio.local?.coordinates ?
            `${municipio.local.coordinates[1].toFixed(4)}, ${municipio.local.coordinates[0].toFixed(4)}` :
            'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-400 hover:text-primary-300 mr-3" onclick="editarMunicipio('${municipio._id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-500 hover:text-red-400" onclick="confirmarExclusao('${municipio._id}', '${municipio.nome}')">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    `).join('');

    elementos.totalRegistros.textContent = estado.municipios.total;
}

function renderizarTabelaProximidade(municipios) {
    if (municipios.length === 0) {
        elementos.tabelaProximidade.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center text-gray-400">Nenhum município encontrado na área especificada</td>
            </tr>
        `;
        return;
    }

    elementos.tabelaProximidade.innerHTML = municipios.map(municipio => `
        <tr class="hover:bg-gray-800">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-white">${municipio.nome}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${municipio.codigo_ibge || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${municipio.codigo_uf || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${municipio.local?.coordinates ?
            `${municipio.local.coordinates[1].toFixed(4)}, ${municipio.local.coordinates[0].toFixed(4)}` :
            'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${municipio.distancia ? municipio.distanceFromUser.toFixed(2) : 'N/A'}</td>
        </tr>
    `).join('');
}

function atualizarPaginacao() {
    const totalPaginas = Math.ceil(estado.municipios.total / estado.municipios.limite);

    elementos.paginaAtual.textContent = estado.municipios.pagina;

    // Habilitar/desabilitar botões de paginação
    elementos.btnAnterior.disabled = estado.municipios.pagina <= 1;
    elementos.btnProximo.disabled = estado.municipios.pagina >= totalPaginas;

    if (elementos.btnAnterior.disabled) {
        elementos.btnAnterior.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        elementos.btnAnterior.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    if (elementos.btnProximo.disabled) {
        elementos.btnProximo.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        elementos.btnProximo.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

function mostrarToast(titulo, mensagem, sucesso) {
    elementos.toastTitulo.textContent = titulo;
    elementos.toastMensagem.textContent = mensagem;

    if (sucesso) {
        elementos.toastIcon.innerHTML = '<i class="fas fa-check-circle text-xl"></i>';
        elementos.toastIcon.className = 'mr-3 text-green-500';
    } else {
        elementos.toastIcon.innerHTML = '<i class="fas fa-exclamation-circle text-xl"></i>';
        elementos.toastIcon.className = 'mr-3 text-red-500';
    }

    elementos.toast.classList.remove('translate-y-24');

    setTimeout(() => {
        elementos.toast.classList.add('translate-y-24');
    }, 3000);
}

function limparFormulario() {
    elementos.municipioId.value = '';
    elementos.municipioNome.value = '';
    elementos.municipioCodigoIbge.value = '';
    elementos.municipioCodigoUf.value = '';
    elementos.municipioCapital.value = 'false';
    elementos.municipioLatitude.value = '';
    elementos.municipioLongitude.value = '';

    elementos.formTitulo.textContent = 'Adicionar Município';
    elementos.formErrors.classList.add('hidden');
    elementos.errorList.innerHTML = '';
}

function abrirModalConfirmacao() {
    elementos.modalConfirmacao.classList.remove('hidden');
}

function fecharModalConfirmacao() {
    elementos.modalConfirmacao.classList.add('hidden');
    estado.municipioExcluir = null;
}

function obterLocalizacaoAtual() {
    if (navigator.geolocation) {
        elementos.btnUsarLocalizacao.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Obtendo localização...';
        elementos.btnUsarLocalizacao.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                elementos.proximidadeLatitude.value = position.coords.latitude;
                elementos.proximidadeLongitude.value = position.coords.longitude;

                elementos.btnUsarLocalizacao.innerHTML = '<i class="fas fa-map-marker-alt mr-2"></i>Usar Minha Localização';
                elementos.btnUsarLocalizacao.disabled = false;

                mostrarToast('Sucesso', 'Localização obtida com sucesso!', true);
            },
            (error) => {
                console.error('Erro ao obter localização:', error);
                mostrarToast('Erro', 'Não foi possível obter sua localização', false);

                elementos.btnUsarLocalizacao.innerHTML = '<i class="fas fa-map-marker-alt mr-2"></i>Usar Minha Localização';
                elementos.btnUsarLocalizacao.disabled = false;
            }
        );
    } else {
        mostrarToast('Erro', 'Seu navegador não suporta geolocalização', false);
    }
}

// Funções globais (acessíveis via onclick)
window.editarMunicipio = async function (id) {
    const municipio = await buscarMunicipioPorId(id);

    if (municipio) {
        elementos.municipioId.value = municipio._id;
        elementos.municipioNome.value = municipio.nome;
        elementos.municipioCodigoIbge.value = municipio.codigo_ibge || '';
        elementos.municipioCodigoUf.value = municipio.codigo_uf || '';
        elementos.municipioCapital.value = municipio.capital ? 'true' : 'false';

        if (municipio.local && municipio.local.coordinates) {
            elementos.municipioLongitude.value = municipio.local.coordinates[0];
            elementos.municipioLatitude.value = municipio.local.coordinates[1];
        }

        elementos.formTitulo.textContent = 'Editar Município';

        // Mudar para a tab de adicionar/editar
        document.getElementById('tab-adicionar').click();
    }
};

window.confirmarExclusao = function (id, nome) {
    estado.municipioExcluir = id;
    elementos.municipioExcluirNome.textContent = nome;
    abrirModalConfirmacao();
};
