// Elementos do DOM
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');
const showFiltersBtn = document.getElementById('show-filters');
const filtersPanel = document.getElementById('filters-panel');
const resetFiltersBtn = document.getElementById('reset-filters');
const applyFiltersBtn = document.getElementById('apply-filters');
const loadMoreJobsBtn = document.getElementById('load-more-jobs');
const modal = document.getElementById('confirmation-modal');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');

// Verificar tema preferido do usuário
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// Aplicar tema salvo ou preferido
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Alternar menu mobile
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Acessibilidade: atualizar aria-expanded
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Alternar tema claro/escuro
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Mostrar/ocultar filtros
showFiltersBtn.addEventListener('click', () => {
    filtersPanel.classList.toggle('active');
    
    // Acessibilidade: anunciar mudança para leitores de tela
    const isExpanded = filtersPanel.classList.contains('active');
    showFiltersBtn.setAttribute('aria-expanded', isExpanded);
    
    if (isExpanded) {
        showFiltersBtn.innerHTML = '<i class="ti ti-filter-off"></i> Ocultar Filtros';
    } else {
        showFiltersBtn.innerHTML = '<i class="ti ti-filter"></i> Filtros Avançados';
    }
});

// Resetar filtros
resetFiltersBtn.addEventListener('click', () => {
    const selects = filtersPanel.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Feedback visual
    showToast('Filtros resetados com sucesso!');
});

// Aplicar filtros
applyFiltersBtn.addEventListener('click', () => {
    // Aqui seria onde você aplicaria os filtros na busca
    // Por enquanto, apenas um feedback visual
    showToast('Filtros aplicados com sucesso!');
    filtersPanel.classList.remove('active');
    showFiltersBtn.innerHTML = '<i class="ti ti-filter"></i> Filtros Avançados';
    showFiltersBtn.setAttribute('aria-expanded', 'false');
});

// Carregar mais vagas (simulação)
loadMoreJobsBtn?.addEventListener('click', () => {
    // Simular carregamento
    loadMoreJobsBtn.disabled = true;
    loadMoreJobsBtn.innerHTML = '<i class="ti ti-loader"></i> Carregando...';
    
    setTimeout(() => {
        // Adicionar 3 novas vagas
        const jobsGrid = document.querySelector('.jobs-grid');
        
        const newJobs = [
            {
                title: "Analista de Dados Pleno",
                company: "Data Insights",
                location: "Belo Horizonte, MG",
                type: "remote",
                description: "Vaga para analista de dados com experiência em Python e SQL.",
                skills: ["Python", "SQL", "Pandas", "Visualização de Dados"],
                salary: "R$ 6.500 - R$ 8.000",
                contract: "PJ"
            },
            {
                title: "Designer UX/UI",
                company: "Creative Solutions",
                location: "Porto Alegre, RS",
                type: "hybrid",
                description: "Procuramos designer com portfólio e experiência em Figma.",
                skills: ["Figma", "UI Design", "UX Research", "Prototipação"],
                salary: "R$ 5.200 - R$ 6.800",
                contract: "CLT"
            },
            {
                title: "Engenheiro de Software Sênior",
                company: "Tech Innovations",
                location: "São Paulo, SP",
                type: "presencial",
                description: "Vaga para sênior com experiência em arquitetura de sistemas.",
                skills: ["Java", "Spring Boot", "Microserviços", "AWS"],
                salary: "R$ 12.000 - R$ 15.000",
                contract: "CLT"
            }
        ];
        
        newJobs.forEach(job => {
            const jobCard = document.createElement('article');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <div class="job-header">
                    <h3>${job.title}</h3>
                    <span class="badge ${job.type}">${
                        job.type === 'remote' ? 'Remoto' : 
                        job.type === 'hybrid' ? 'Híbrido' : 'Presencial'
                    }</span>
                </div>
                <div class="job-company">
                    <i class="ti ti-building"></i>
                    <div class="company-info">
                        <span class="company-name">${job.company}</span>
                        <small class="company-location">${job.location}</small>
                    </div>
                </div>
                <p class="job-description">${job.description}</p>
                <div class="job-skills">
                    <i class="ti ti-tags"></i>
                    ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="job-footer">
                    <div class="job-meta">
                        <span class="job-salary">${job.salary}</span>
                        <small class="job-type">${job.contract}</small>
                    </div>
                    <button class="btn-secondary apply-btn">
                        <i class="ti ti-send"></i> Candidatar-se
                    </button>
                </div>
            `;
            jobsGrid.appendChild(jobCard);
        });
        
        // Adicionar eventos aos novos botões
        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
                showConfirmation(
                    'Confirmar candidatura',
                    `Tem certeza que deseja se candidatar à vaga "${jobTitle}"?`,
                    () => {
                        showToast(`Candidatura para "${jobTitle}" enviada com sucesso!`);
                    }
                );
            });
        });
        
        showToast('Mais 3 vagas carregadas com sucesso!');
        loadMoreJobsBtn.disabled = false;
        loadMoreJobsBtn.innerHTML = '<i class="ti ti-arrows-down-up"></i> Carregar mais vagas';
    }, 1000);
});

// Candidatar-se a vagas
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('apply-btn') || e.target.closest('.apply-btn')) {
        const button = e.target.classList.contains('apply-btn') ? e.target : e.target.closest('.apply-btn');
        const jobTitle = button.closest('.job-card').querySelector('h3').textContent;
        showConfirmation(
            'Confirmar candidatura',
            `Tem certeza que deseja se candidatar à vaga "${jobTitle}"?`,
            () => {
                showToast(`Candidatura para "${jobTitle}" enviada com sucesso!`);
            }
        );
    }
});

// Modal de confirmação
function showConfirmation(title, message, confirmCallback) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('active');
    
    // Fechar modal ao clicar fora
    const closeModal = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.removeEventListener('click', closeModal);
        }
    };
    
    modal.addEventListener('click', closeModal);
    
    // Cancelar
    modalCancel.onclick = () => {
        modal.classList.remove('active');
        modal.removeEventListener('click', closeModal);
    };
    
    // Confirmar
    modalConfirm.onclick = () => {
        confirmCallback();
        modal.classList.remove('active');
        modal.removeEventListener('click', closeModal);
    };
}

// Toast de feedback
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <i class="ti ti-circle-check"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    // Animação de entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});

// Melhorar acessibilidade para formulários
document.querySelectorAll('input, select, button').forEach(el => {
    el.addEventListener('focus', () => {
        el.style.outline = `2px solid var(--primary-color)`;
        el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
        el.style.outline = 'none';
    });
});

// Placeholder para futura integração com Python
function sendDataToPython(data) {
    console.log('Dados que seriam enviados para Python:', data);
    // No futuro, aqui seria uma chamada AJAX ou similar para o backend Python
}
// Novas variáveis para login/cadastro
const showLoginBtn = document.getElementById('show-login-btn');
const showRegisterBtn = document.getElementById('show-register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeLogin = document.getElementById('close-login');
const closeRegister = document.getElementById('close-register');
const showLoginLink = document.getElementById('show-login');
const showRegisterLink = document.getElementById('show-register');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Mostrar modal de login
showLoginBtn?.addEventListener('click', () => {
    loginModal.classList.add('active');
});

// Mostrar modal de cadastro
showRegisterBtn?.addEventListener('click', () => {
    registerModal.classList.add('active');
});

// Fechar modais
closeLogin?.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

closeRegister?.addEventListener('click', () => {
    registerModal.classList.remove('active');
});

// Alternar entre login e cadastro
showLoginLink?.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('active');
    loginModal.classList.add('active');
});

showRegisterLink?.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
});

// Fechar modais ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
    }
});

// Simular login
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validação simples
    if (!email || !password) {
        showToast('Por favor, preencha todos os campos');
        return;
    }
    
    // Simular autenticação
    setTimeout(() => {
        loginModal.classList.remove('active');
        showToast('Login realizado com sucesso!');
        
        // Simular usuário logado
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <button class="btn-primary" id="user-profile">
                    <i class="ti ti-user"></i> Meu Perfil
                </button>
                <button class="btn-secondary" id="logout-btn">
                    <i class="ti ti-logout"></i> Sair
                </button>
            `;
            
            // Adicionar evento de logout
            document.getElementById('logout-btn').addEventListener('click', () => {
                showToast('Você saiu da sua conta');
                authButtons.innerHTML = `
                    <button class="btn-secondary" id="show-login-btn">
                        <i class="ti ti-login"></i> Entrar
                    </button>
                    <button class="btn-primary" id="show-register-btn">
                        <i class="ti ti-user-plus"></i> Cadastrar
                    </button>
                `;
                
                // Reatribuir eventos
                document.getElementById('show-login-btn').addEventListener('click', () => {
                    loginModal.classList.add('active');
                });
                document.getElementById('show-register-btn').addEventListener('click', () => {
                    registerModal.classList.add('active');
                });
            });
        }
    }, 1000);
});

// Simular cadastro
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const phone = document.getElementById('register-phone').value;
    
    // Validações
    if (!name || !email || !password || !confirmPassword || !phone) {
        showToast('Por favor, preencha todos os campos');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('As senhas não coincidem');
        return;
    }
    
    if (password.length < 8) {
        showToast('A senha deve ter pelo menos 8 caracteres');
        return;
    }
    
    // Simular cadastro
    setTimeout(() => {
        registerModal.classList.remove('active');
        showToast('Cadastro realizado com sucesso! Faça login para continuar.');
        
        // Preencher automaticamente o login
        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = password;
        loginModal.classList.add('active');
    }, 1000);
});

// Restante do código JavaScript anterior permanece igual...