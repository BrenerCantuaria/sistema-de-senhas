
import React from 'react';
import { Clock } from 'lucide-react';
import { useFila } from '../context/FilaContexto';
import BotaoAcao from './BotaoAcao';

interface HistoricoChamadasProps {
  onChamarNumeroAnterior: (numero: number) => void;
}

/**
 * Componente que exibe o histórico de números chamados anteriormente
 * Permite repetir chamadas de números específicos
 */
const HistoricoChamadas: React.FC<HistoricoChamadasProps> = ({ 
  onChamarNumeroAnterior 
}) => {
  const { estado } = useFila();
  
  // Formata a hora para exibição
  const formatarHora = (data: Date): string => {
    return data.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className="cartao">
      <h2 className="titulo-secao flex items-center gap-2">
        <Clock size={20} /> 
        Histórico de Chamadas
      </h2>
      
      {!estado.historicoNumeros || estado.historicoNumeros.length === 0 ? (
        <div className="text-center py-8 text-fila-texto-claro">
          Nenhuma chamada registrada ainda.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {estado.historicoNumeros.slice(0, 5).map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100"
            >
              <div>
                <div className="text-xl font-medium">{item.numero}</div>
                <div className="text-sm text-fila-texto-claro">
                  Chamado às {formatarHora(item.horaChamada)}
                </div>
              </div>
              <BotaoAcao
                onClick={() => onChamarNumeroAnterior(item.numero)}
                variante="secundario"
                className="text-sm py-1"
              >
                Chamar Novamente
              </BotaoAcao>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricoChamadas;
