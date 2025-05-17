
import React from 'react';
import { useFila } from '../context/FilaContexto';

/**
 * Interface de propriedades para o componente TabelaFila
 */
interface TabelaFilaProps {
  limitada?: boolean;
  mostrarAcoes?: boolean;
}

/**
 * Tabela que mostra os próximos números na fila
 */
const TabelaFila: React.FC<TabelaFilaProps> = ({ 
  limitada = false,
  mostrarAcoes = true
}) => {
  const { estado, chamarNumeroEspecifico } = useFila();
  
  // Formata a hora de criação para exibição
  const formatarHora = (data: Date): string => {
    return data.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Limita a quantidade de itens mostrados na tabela se necessário
  const itensMostrados = limitada ? estado.fila.slice(0, 5) : estado.fila;
  
  // Handler para chamar um número específico ao clicar
  const handleChamarNumero = (numero: number) => {
    if (mostrarAcoes) {
      chamarNumeroEspecifico(numero);
    }
  };
  
  return (
    <div className="cartao overflow-hidden">
      <h2 className="titulo-secao">Próximos na Fila</h2>
      
      {estado.fila.length === 0 ? (
        <div className="text-center py-8 text-fila-texto-claro">
          Não há números na fila no momento.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left text-sm font-semibold text-fila-texto">Número</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-fila-texto">Hora de Entrada</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-fila-texto">Tempo de Espera</th>
              </tr>
            </thead>
            <tbody>
              {itensMostrados.map((item) => {
                // Calcula o tempo de espera em minutos
                const agora = new Date();
                const esperaMs = agora.getTime() - item.horaCriacao.getTime();
                const esperaMinutos = Math.floor(esperaMs / 60000);
                
                return (
                  <tr 
                    key={item.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors
                      ${mostrarAcoes ? 'cursor-pointer' : ''}
                    `}
                    onClick={() => handleChamarNumero(item.numero)}
                  >
                    <td className="py-3 px-4 font-medium">{item.numero}</td>
                    <td className="py-3 px-4 text-fila-texto-claro">
                      {formatarHora(item.horaCriacao)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${esperaMinutos > 10 
                          ? 'bg-fila-erro/10 text-fila-erro' 
                          : esperaMinutos > 5 
                            ? 'bg-fila-alerta/10 text-fila-alerta' 
                            : 'bg-fila-sucesso/10 text-fila-sucesso'
                        }
                      `}>
                        {esperaMinutos} min
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      {limitada && estado.fila.length > 5 && (
        <div className="text-center mt-4 text-sm text-fila-texto-claro">
          Mostrando 5 de {estado.fila.length} números na fila
        </div>
      )}
      
      {mostrarAcoes && estado.fila.length > 0 && (
        <div className="text-center text-sm text-fila-texto-claro mt-4 italic">
          Clique em um número para chamá-lo diretamente
        </div>
      )}
    </div>
  );
};

export default TabelaFila;
