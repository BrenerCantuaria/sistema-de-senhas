
import React from 'react';
import { Clock, Users, BarChart } from 'lucide-react';
import { useFila } from '../context/FilaContexto';

/**
 * Componente de card de estatística para o painel
 * @param {ReactNode} icone - Ícone do card
 * @param {string} titulo - Título do card
 * @param {string|number} valor - Valor principal a ser exibido
 * @param {string} descricao - Descrição complementar
 * @param {string} cor - Cor do ícone
 */
const CardEstatistica: React.FC<{
  icone: React.ReactNode;
  titulo: string;
  valor: string | number;
  descricao?: string;
  cor: string;
}> = ({ icone, titulo, valor, descricao, cor }) => {
  return (
    <div className="cartao flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{titulo}</h3>
          <p className="text-3xl font-bold">{valor}</p>
          {descricao && (
            <p className="text-sm text-fila-texto-claro mt-1">{descricao}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${cor}`}>
          {icone}
        </div>
      </div>
    </div>
  );
};

/**
 * Componente de painel com cards de estatísticas
 */
const PainelCards: React.FC = () => {
  const { estado } = useFila();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <CardEstatistica
        icone={<BarChart size={24} className="text-white" />}
        titulo="Total de Chamadas Hoje"
        valor={estado.totalChamadasHoje}
        cor="bg-fila-primaria/90"
      />
      
      <CardEstatistica
        icone={<Clock size={24} className="text-white" />}
        titulo="Tempo Médio de Espera"
        valor={estado.tempoEsperaMedio}
        descricao="minutos"
        cor="bg-fila-acento/90"
      />
      
      <CardEstatistica
        icone={<Users size={24} className="text-white" />}
        titulo="Usuários na Fila"
        valor={estado.usuariosNaFila}
        descricao="pessoas aguardando"
        cor="bg-fila-secundaria/90"
      />
    </div>
  );
};

export default PainelCards;
