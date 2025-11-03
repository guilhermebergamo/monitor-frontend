import { useState, useEffect, useRef } from 'react';
import Table from './components/Table';
import { DadoMonitor, registrarAcesso, fetchDadosPaginados } from './services/api';
import './index.css';

function App() {
  const [dados, setDados] = useState<DadoMonitor[]>([]);
  const [totalRegistros, setTotalRegistros] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const inicializado = useRef(false);

  // Registrar acesso automaticamente ao carregar a página (F5)
  useEffect(() => {
    if (!inicializado.current) {
      inicializado.current = true;
      registrarAcessoWorker();
    }
  }, []);

  const registrarAcessoWorker = async () => {
    setLoading(true);
    setErro(null);
    
    try {
      const response = await registrarAcesso('Request enviado via worker', pageNumber, pageSize);
      setDados(response.registros);
      setTotalRegistros(response.totalRegistros);
      setPageNumber(response.pageNumber);
      setTotalPages(response.totalPages);
    } catch (error) {
      setErro('Erro ao registrar acesso via worker.');
      console.error('Erro ao registrar acesso:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarRequest = async () => {
    setLoading(true);
    setErro(null);
    
    try {
      const response = await registrarAcesso('Request enviado via humano', pageNumber, pageSize);
      setDados(response.registros);
      setTotalRegistros(response.totalRegistros);
      setPageNumber(response.pageNumber);
      setTotalPages(response.totalPages);
    } catch (error) {
      setErro('Erro ao registrar acesso via humano.');
      console.error('Erro ao registrar acesso:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    setLoading(true);
    setErro(null);
    
    try {
      const response = await fetchDadosPaginados(newPage, pageSize);
      setDados(response.registros);
      setTotalRegistros(response.totalRegistros);
      setPageNumber(response.pageNumber);
      setTotalPages(response.totalPages);
    } catch (error) {
      setErro('Erro ao carregar página.');
      console.error('Erro ao carregar página:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Monitor de Dados
          </h1>
          <p className="text-gray-600">
            Azure Static Web Apps + Container Apps
          </p>
        </div>

        <div className="mb-6 text-center">
          <button
            onClick={handleEnviarRequest}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {loading ? 'Carregando...' : 'Enviar Request'}
          </button>
        </div>

        {erro && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-center">
            {erro}
          </div>
        )}

        <Table dados={dados} />
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={pageNumber === 1 || loading}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ««
            </button>
            <button
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber === 1 || loading}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ‹
            </button>
            
            <span className="px-4 py-2 text-sm text-gray-700">
              Página {pageNumber} de {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber === totalPages || loading}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ›
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={pageNumber === totalPages || loading}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              »»
            </button>
          </div>
          
          <div className="flex-1 flex justify-end">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-2">
              <span className="text-blue-700 font-semibold text-sm">
                Total: {totalRegistros}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Endpoint: http://localhost:5063/api/registros/acesso</p>
        </div>
      </div>
    </div>
  );
}

export default App;
