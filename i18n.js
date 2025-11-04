import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  pt: {
    // Navegação
    home: 'Início',
    branches: 'Filiais',
    patio: 'Pátio',
    register: 'Cadastro',
    motorcycles: 'Motos',
    
    // Auth
    login: 'Entrar',
    email: 'E-mail',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    fullName: 'Nome Completo',
    noAccount: 'Não tem conta?',
    registerHere: 'Cadastre-se',
    alreadyHaveAccount: 'Já tem conta?',
    loginHere: 'Faça login',
    registerButton: 'Cadastrar',
    loginButton: 'Entrar',
    
    // Home
    welcome: 'Bem-vindo ao MobileMottu',
    welcomeSubtitle: 'Gerenciador de Motos e Pátios',
    logout: 'Sair',
    mottuManager: 'Mottu Manager',
    viewBranches: 'Ver Filiais',
    registerMotorcycle: 'Cadastrar Moto',
    motorcycleList: 'Lista de Motos',
    configureApi: 'Configurar API',
    language: 'Idioma',
    
    // Filiais
    branchesTitle: 'Nossos Pátios',
    addBranch: 'Adicionar Pátio',
    branchName: 'Nome do Pátio',
    addNewBranch: 'Adicionar Novo Pátio',
    editBranch: 'Editar Pátio',
    noBranchesYet: 'Nenhum pátio cadastrado ainda.',
    loadingBranches: 'Carregando pátios...',
    branchNamePlaceholder: 'Nome do novo pátio',
    whatToDo: 'O que você gostaria de fazer para o pátio',
    viewMotorcycles: 'Ver Motos',
    
    // Motos
    motorcycleRegister: 'Cadastro de Moto',
    editMotorcycle: 'Editar Moto',
    updateMotorcycle: 'Atualizar Moto',
    model: 'Modelo',
    brand: 'Marca',
    year: 'Ano',
    plate: 'Placa',
    branch: 'Filial',
    modelPlaceholder: 'Ex: CB 600F Hornet',
    platePlaceholder: 'Ex: ABC1D23',
    allMotorcycles: 'Todas as Motos Cadastradas',
    motorcyclesIn: 'Motos em',
    totalDisplayed: 'Total exibido',
    noMotorcyclesYet: 'Nenhuma moto cadastrada ainda.',
    noMotorcyclesInBranch: 'Nenhuma moto encontrada para a filial:',
    loadingMotorcycles: 'Carregando motos...',
    
    // Pátio/Mapa
    patioOf: 'Pátio da Filial:',
    patioVisualization: 'Visualização do layout e localização das motos.',
    patioMap: 'Mapa do Pátio',
    motorcycleCountInBranch: 'Número de Motos na Filial:',
    locationImages: 'Imagens do Local',
    loadingPatioData: 'Carregando dados do pátio...',
    unknownPatio: 'Pátio Desconhecido',
    couldNotLoadMotorcycleCount: 'Não foi possível carregar o número de motos no pátio.',
    
    // API Config
    apiConfiguration: 'Configuração da API',
    apiBaseUrl: 'URL Base da API',
    apiUrlPlaceholder: 'https://sua-api.com/api',
    saveConfiguration: 'Salvar Configuração',
    saving: 'Salvando...',
    restoreDefault: 'Restaurar Padrão',
    apiConfigInfo: 'Configure a URL base da sua API REST. Esta configuração será salva localmente no dispositivo.',
    currentUrl: 'URL atual:',
    apiUrlEmpty: 'URL da API não pode estar vazia',
    apiUrlSaved: 'URL da API salva com sucesso!',
    couldNotSaveApiUrl: 'Não foi possível salvar a URL da API',
    
    // Network Helper
    networkAssistant: '🔧 Assistente de Rede',
    autoDetectApi: '🔍 Auto-detectar API',
    apiFoundAt: 'API encontrada em:',
    noApiFound: 'Nenhuma API encontrada. Tente configurar manualmente.',
    enterValidIp: 'Digite um IP válido',
    apiConfigured: 'API configurada:',
    couldNotConnect: 'Não foi possível conectar em:',
    orEnterIpManually: 'Ou digite seu IP manualmente:',
    ipPlaceholder: 'Ex: 192.168.1.100',
    testIp: '✅ Testar IP',
    howToFindIp: '💡 Como descobrir seu IP:',
    ipInstructions: '• Windows: cmd → ipconfig\n• Mac/Linux: terminal → ifconfig\n• Procure por "IPv4 Address"',
    
    // Notificações
    loginSuccess: 'Login realizado com sucesso!',
    welcomeBack: 'Bem-vindo de volta',
    registerSuccess: 'Cadastro realizado com sucesso!',
    motorcycleRegistered: 'Moto cadastrada com sucesso!',
    motorcycleUpdated: 'Moto atualizada com sucesso!',
    motorcycleDeleted: 'Moto excluída com sucesso!',
    branchAdded: 'Pátio adicionado com sucesso!',
    branchUpdated: 'Pátio atualizado com sucesso!',
    branchDeleted: 'Pátio excluído com sucesso!',
    logoutSuccess: 'Logout realizado com sucesso!',
    languageChanged: 'Idioma alterado',
    languageChangedTo: 'Idioma alterado para',
    unexpectedError: 'Erro inesperado',
    
    // Geral
    save: 'Salvar',
    saveChanges: 'Salvar Alterações',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    success: 'Sucesso',
    error: 'Erro',
    add: 'Adicionar',
    confirm: 'Confirmar',
    
    // Mensagens de erro
    fillAllFields: 'Por favor, preencha todos os campos.',
    passwordsDontMatch: 'As senhas não coincidem.',
    emailInUse: 'Este email já está em uso.',
    invalidEmail: 'Email inválido.',
    weakPassword: 'A senha deve ter pelo menos 6 caracteres.',
    registerError: 'Ocorreu um erro ao cadastrar. Tente novamente.',
    loginError: 'Ocorreu um erro ao fazer login. Tente novamente.',
    userDisabled: 'Usuário desativado.',
    userNotFound: 'Usuário não encontrado.',
    wrongPassword: 'Senha incorreta.',
    invalidCredentials: 'Credenciais inválidas. Verifique seu email e senha.',
    logoutError: 'Não foi possível fazer logout. Tente novamente.',
    emptyBranchName: 'O nome do pátio não pode ser vazio.',
    couldNotLoadBranches: 'Não foi possível carregar os pátios.',
    couldNotAddBranch: 'Não foi possível adicionar o pátio.',
    couldNotUpdateBranch: 'Não foi possível atualizar o pátio.',
    couldNotDeleteBranch: 'Não foi possível excluir o pátio.',
    modelAndPlateRequired: 'Modelo e Placa são obrigatórios.',
    
    // Confirmações
    confirmDelete: 'Confirmar Exclusão',
    confirmDeleteMotorcycle: 'Tem certeza que deseja excluir esta moto?',
    confirmDeleteBranch: 'Tem certeza que deseja excluir este pátio? Todas as motos associadas a ele podem ser afetadas.',
    
    // Títulos de tela
    registeredMotorcycles: 'Motos Cadastradas',
    loginError_title: 'Erro de Login',
    registerError_title: 'Erro de Cadastro',
  },
  es: {
    // Navegación
    home: 'Inicio',
    branches: 'Sucursales',
    patio: 'Patio',
    register: 'Registro',
    motorcycles: 'Motos',
    
    // Auth
    login: 'Entrar',
    email: 'Correo',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    fullName: 'Nombre Completo',
    noAccount: '¿No tienes cuenta?',
    registerHere: 'Regístrate',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    loginHere: 'Inicia sesión',
    registerButton: 'Registrar',
    loginButton: 'Entrar',
    
    // Home
    welcome: 'Bienvenido a MobileMottu',
    welcomeSubtitle: 'Gestor de Motos y Patios',
    logout: 'Salir',
    mottuManager: 'Mottu Manager',
    viewBranches: 'Ver Sucursales',
    registerMotorcycle: 'Registrar Moto',
    motorcycleList: 'Lista de Motos',
    configureApi: 'Configurar API',
    language: 'Idioma',
    
    // Sucursales
    branchesTitle: 'Nuestros Patios',
    addBranch: 'Agregar Patio',
    branchName: 'Nombre del Patio',
    addNewBranch: 'Agregar Nuevo Patio',
    editBranch: 'Editar Patio',
    noBranchesYet: 'Ningún patio registrado aún.',
    loadingBranches: 'Cargando patios...',
    branchNamePlaceholder: 'Nombre del nuevo patio',
    whatToDo: '¿Qué te gustaría hacer para el patio',
    viewMotorcycles: 'Ver Motos',
    
    // Motos
    motorcycleRegister: 'Registro de Moto',
    editMotorcycle: 'Editar Moto',
    updateMotorcycle: 'Actualizar Moto',
    model: 'Modelo',
    brand: 'Marca',
    year: 'Año',
    plate: 'Placa',
    branch: 'Sucursal',
    modelPlaceholder: 'Ej: CB 600F Hornet',
    platePlaceholder: 'Ej: ABC1D23',
    allMotorcycles: 'Todas las Motos Registradas',
    motorcyclesIn: 'Motos en',
    totalDisplayed: 'Total mostrado',
    noMotorcyclesYet: 'Ninguna moto registrada aún.',
    noMotorcyclesInBranch: 'No se encontraron motos para la sucursal:',
    loadingMotorcycles: 'Cargando motos...',
    
    // Patio/Mapa
    patioOf: 'Patio de la Sucursal:',
    patioVisualization: 'Visualización del diseño y ubicación de las motos.',
    patioMap: 'Mapa del Patio',
    motorcycleCountInBranch: 'Número de Motos en la Sucursal:',
    locationImages: 'Imágenes del Local',
    loadingPatioData: 'Cargando datos del patio...',
    unknownPatio: 'Patio Desconocido',
    couldNotLoadMotorcycleCount: 'No se pudo cargar el número de motos en el patio.',
    
    // API Config
    apiConfiguration: 'Configuración de la API',
    apiBaseUrl: 'URL Base de la API',
    apiUrlPlaceholder: 'https://tu-api.com/api',
    saveConfiguration: 'Guardar Configuración',
    saving: 'Guardando...',
    restoreDefault: 'Restaurar Predeterminado',
    apiConfigInfo: 'Configure la URL base de su API REST. Esta configuración se guardará localmente en el dispositivo.',
    currentUrl: 'URL actual:',
    apiUrlEmpty: 'La URL de la API no puede estar vacía',
    apiUrlSaved: '¡URL de la API guardada con éxito!',
    couldNotSaveApiUrl: 'No se pudo guardar la URL de la API',
    
    // Network Helper
    networkAssistant: '🔧 Asistente de Red',
    autoDetectApi: '🔍 Auto-detectar API',
    apiFoundAt: 'API encontrada en:',
    noApiFound: 'No se encontró ninguna API. Intente configurar manualmente.',
    enterValidIp: 'Ingrese una IP válida',
    apiConfigured: 'API configurada:',
    couldNotConnect: 'No se pudo conectar en:',
    orEnterIpManually: 'O ingrese su IP manualmente:',
    ipPlaceholder: 'Ej: 192.168.1.100',
    testIp: '✅ Probar IP',
    howToFindIp: '💡 Cómo encontrar su IP:',
    ipInstructions: '• Windows: cmd → ipconfig\n• Mac/Linux: terminal → ifconfig\n• Busque "IPv4 Address"',
    
    // Notificaciones
    loginSuccess: '¡Inicio de sesión exitoso!',
    welcomeBack: 'Bienvenido de nuevo',
    registerSuccess: '¡Registro exitoso!',
    motorcycleRegistered: '¡Moto registrada con éxito!',
    motorcycleUpdated: '¡Moto actualizada con éxito!',
    motorcycleDeleted: '¡Moto eliminada con éxito!',
    branchAdded: '¡Patio agregado con éxito!',
    branchUpdated: '¡Patio actualizado con éxito!',
    branchDeleted: '¡Patio eliminado con éxito!',
    logoutSuccess: '¡Cierre de sesión exitoso!',
    languageChanged: 'Idioma cambiado',
    languageChangedTo: 'Idioma cambiado a',
    unexpectedError: 'Error inesperado',
    
    // General
    save: 'Guardar',
    saveChanges: 'Guardar Cambios',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    success: 'Éxito',
    error: 'Error',
    add: 'Agregar',
    confirm: 'Confirmar',
    
    // Mensajes de error
    fillAllFields: 'Por favor, complete todos los campos.',
    passwordsDontMatch: 'Las contraseñas no coinciden.',
    emailInUse: 'Este correo ya está en uso.',
    invalidEmail: 'Correo inválido.',
    weakPassword: 'La contraseña debe tener al menos 6 caracteres.',
    registerError: 'Ocurrió un error al registrar. Intente nuevamente.',
    loginError: 'Ocurrió un error al iniciar sesión. Intente nuevamente.',
    userDisabled: 'Usuario deshabilitado.',
    userNotFound: 'Usuario no encontrado.',
    wrongPassword: 'Contraseña incorrecta.',
    invalidCredentials: 'Credenciales inválidas. Verifique su correo y contraseña.',
    logoutError: 'No se pudo cerrar sesión. Intente nuevamente.',
    emptyBranchName: 'El nombre del patio no puede estar vacío.',
    couldNotLoadBranches: 'No se pudieron cargar los patios.',
    couldNotAddBranch: 'No se pudo agregar el patio.',
    couldNotUpdateBranch: 'No se pudo actualizar el patio.',
    couldNotDeleteBranch: 'No se pudo eliminar el patio.',
    modelAndPlateRequired: 'Modelo y Placa son obligatorios.',
    
    // Confirmaciones
    confirmDelete: 'Confirmar Eliminación',
    confirmDeleteMotorcycle: '¿Está seguro de que desea eliminar esta moto?',
    confirmDeleteBranch: '¿Está seguro de que desea eliminar este patio? Todas las motos asociadas pueden verse afectadas.',
    
    // Títulos de pantalla
    registeredMotorcycles: 'Motos Registradas',
    loginError_title: 'Error de Inicio de Sesión',
    registerError_title: 'Error de Registro',
  },
};

const i18n = new I18n(translations);

i18n.locale = Localization.locale?.split('-')[0] || 'pt';
i18n.enableFallback = true;
i18n.defaultLocale = 'pt';

export default i18n;
