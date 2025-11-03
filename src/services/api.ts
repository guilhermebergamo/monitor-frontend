// Obter a URL da API das variáveis de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5063';

export interface DadoMonitor {
  observacao: string;
  dataHora: string;
  quantidade: number;
}

export interface ApiResponse {
  registros: DadoMonitor[];
  totalRegistros: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  success: boolean;
  message: string;
}

export const registrarAcesso = async (
  observacao: string,
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/registros/acesso?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ observacao }),
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao registrar acesso');
    }
    
    const dados: ApiResponse = await response.json();
    
    if (!dados.success) {
      throw new Error(dados.message || 'Erro ao registrar acesso');
    }
    
    return dados;
  } catch (error) {
    console.error('Erro ao registrar acesso:', error);
    throw error;
  }
};

export const fetchDadosPaginados = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/registros?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    
    const dados: ApiResponse = await response.json();
    
    if (!dados.success) {
      throw new Error(dados.message || 'Erro ao buscar dados');
    }
    
    return dados;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};
