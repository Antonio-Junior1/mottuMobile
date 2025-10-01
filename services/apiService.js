import axios from 'axios';

// Configuração base da API
// Use o IP da sua máquina ao invés de localhost para funcionar no dispositivo móvel
const API_BASE_URL = 'http://10.0.2.2:5102/api'; // Para Android Emulator
// Para dispositivo físico, use: 'http://SEU_IP_LOCAL:5102/api'

// Criar instância do Axios com configurações padrão
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 Fazendo requisição: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta recebida: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.data || error.message);
    
    // Tratamento de erros específicos
    if (error.response) {
      // Erro do servidor (4xx, 5xx)
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(data?.message || 'Dados inválidos enviados para o servidor');
        case 404:
          throw new Error('Recurso não encontrado');
        case 500:
          throw new Error('Erro interno do servidor. Tente novamente mais tarde');
        default:
          throw new Error(data?.message || `Erro do servidor: ${status}`);
      }
    } else if (error.request) {
      // Erro de rede
      throw new Error('Erro de conexão. Verifique sua internet e tente novamente');
    } else {
      // Outros erros
      throw new Error('Erro inesperado. Tente novamente');
    }
  }
);

// Serviços da API
export const motoService = {
  // Listar todas as motos
  async getAll() {
    const response = await apiClient.get('/motos');
    return response.data;
  },

  // Buscar moto por ID
  async getById(id) {
    const response = await apiClient.get(`/motos/${id}`);
    return response.data;
  },

  // Criar nova moto
  async create(motoData) {
    const response = await apiClient.post("/motos", {
      placa: motoData.placa,
      modelo: motoData.modelo,
    });
    return response.data;
  },

  // Atualizar moto existente
  async update(id, motoData) {
    const response = await apiClient.put(`/motos/${id}`, {
      modelo: motoData.modelo,
      marca: motoData.marca,
      ano: motoData.ano ? parseInt(motoData.ano) : null,
      filial: motoData.filial
    });
    return response.data;
  },

  // Deletar moto
  async delete(id) {
    await apiClient.delete(`/motos/${id}`);
    return true;
  },

  // Mover moto para pátio
  async moveToPatios(id, patioId) {
    await apiClient.post(`/motos/${id}/mover`, {
      patioId: patioId
    });
    return true;
  }
};

export const patioService = {
  // Listar todos os pátios
  async getAll() {
    const response = await apiClient.get('/patios');
    return response.data;
  },

  // Buscar pátio por ID
  async getById(id) {
    const response = await apiClient.get(`/patios/${id}`);
    return response.data;
  },

  // Criar novo pátio
  async create(patioData) {
    const response = await apiClient.post('/patios', patioData);
    return response.data;
  }
};

// Utilitário para configurar URL base dinamicamente
export const setApiBaseUrl = (url) => {
  apiClient.defaults.baseURL = url;
};

export default apiClient;
