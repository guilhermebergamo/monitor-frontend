import React from 'react';
import { DadoMonitor } from '../services/api';

interface TableProps {
  dados: DadoMonitor[];
}

const Table: React.FC<TableProps> = ({ dados }) => {
  const formatarDataHora = (dataHora: string): string => {
    const data = new Date(dataHora);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Observação
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Data/Hora
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Quantidade
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {dados.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                Nenhum dado disponível
              </td>
            </tr>
          ) : (
            dados.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.observacao}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatarDataHora(item.dataHora)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.quantidade}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
