
import React, { useState, useEffect } from 'react';
import { 
  SkipForward, 
  Repeat, 
  RotateCw, 
  MessageSquarePlus,
  ArrowRight
} from 'lucide-react';
import { useFila } from '../context/FilaContexto';
import Cabecalho from '../components/Cabecalho';
import TabelaFila from '../components/TabelaFIla';
import BotaoAcao from '../components/BotaoAcao';
import HistoricoChamadas from '../components/HistoricoChamadas';
import useSincronizacaoFila from '../hooks/useSincronizacaoFila';

/**
 * Tela de controle da fila para administradores
 * Permite chamar, repetir, pular e reiniciar a fila
 */
const TelaControle: React.FC = () => {
  const { estado, chamarProximo, repetirChamada, pularNumero, reiniciarFila, adicionarNaFila, chamarNumeroEspecifico, chamarNumeroAnterior } = useFila();
  const [numeroParaChamar, setNumeroParaChamar] = useState<string>('');
  
  // Hook para sincronização da fila entre abas
  useSincronizacaoFila();
  
  // Formata a hora da última chamada para exibição
  const formatarHoraUltimaChamada = () => {
    if (!estado.ultimaChamada) return 'Nenhuma chamada ainda';
    
    return estado.ultimaChamada.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // Manipulador para chamar número específico
  const handleChamarNumeroEspecifico = () => {
    const numero = parseInt(numeroParaChamar);
    if (isNaN(numero) || numero <= 0) {
      return;
    }
    
    chamarNumeroEspecifico(numero);
    setNumeroParaChamar('');
  };
  
  // Monitora mudanças no título para debug - usando useRef para evitar logs duplicados
  const ultimoNumeroRef = React.useRef<number | null>(null);
  useEffect(() => {
    if (estado.numeroAtual !== ultimoNumeroRef.current) {
      console.log("Estado atualizado na tela de controle:", estado.numeroAtual);
      ultimoNumeroRef.current = estado.numeroAtual;
    }
  }, [estado.numeroAtual]);
  
  return (
    <div className="min-h-screen bg-fila-fundo">
      <Cabecalho titulo="Controle de Fila" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna de controle */}
          <div className="lg:col-span-1 space-y-8">
            {/* Painel de número atual */}
            <div className="cartao text-center">
              <h2 className="titulo-secao">Número Atual</h2>
              
              <div className="py-8">
                {estado.numeroAtual ? (
                  <div className="animate-pulse-scale">
                    <div className="numero-chamado">{estado.numeroAtual}</div>
                    <p className="text-fila-texto-claro mt-2">
                      Chamado às {formatarHoraUltimaChamada()}
                    </p>
                  </div>
                ) : (
                  <div className="text-fila-texto-claro py-4">
                    Nenhum número chamado
                  </div>
                )}
              </div>
            </div>
            
            {/* Chamar número específico */}
            <div className="cartao">
              <h2 className="titulo-secao">Chamar Número Específico</h2>
              <div className="flex space-x-2 mt-4">
                <input
                  type="number"
                  value={numeroParaChamar}
                  onChange={(e) => setNumeroParaChamar(e.target.value)}
                  placeholder="Digite o número"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-fila-primaria/50"
                  min="1"
                />
                <BotaoAcao 
                  onClick={handleChamarNumeroEspecifico} 
                  variante="secundario"
                  desabilitado={!numeroParaChamar}
                >
                  Chamar
                </BotaoAcao>
              </div>
            </div>
            
            {/* Botões de ação */}
            <div className="cartao">
              <h2 className="titulo-secao">Ações</h2>
              
              <div className="space-y-4">
                <BotaoAcao 
                  onClick={chamarProximo}
                  variante="primario"
                  tamanhoCompleto
                  icone={<ArrowRight size={18} />}
                >
                  Chamar Próximo
                </BotaoAcao>
                
                <BotaoAcao 
                  onClick={repetirChamada}
                  variante="secundario"
                  tamanhoCompleto
                  icone={<Repeat size={18} />}
                  desabilitado={estado.numeroAtual === null}
                >
                  Repetir Chamada
                </BotaoAcao>
                
                <BotaoAcao 
                  onClick={pularNumero}
                  variante="alerta"
                  tamanhoCompleto
                  icone={<SkipForward size={18} />}
                  desabilitado={estado.fila.length === 0}
                >
                  Pular Número
                </BotaoAcao>
                
                <BotaoAcao 
                  onClick={adicionarNaFila}
                  variante="sucesso"
                  tamanhoCompleto
                  icone={<MessageSquarePlus size={18} />}
                >
                  Adicionar Número
                </BotaoAcao>
                
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <BotaoAcao 
                    onClick={reiniciarFila}
                    variante="erro"
                    tamanhoCompleto
                    icone={<RotateCw size={18} />}
                  >
                    Reiniciar Fila
                  </BotaoAcao>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lado direito - Tabela e histórico */}
          <div className="lg:col-span-2 space-y-8">
            {/* Próximos na fila */}
            <TabelaFila />
            
            {/* Histórico de chamadas */}
            <HistoricoChamadas onChamarNumeroAnterior={chamarNumeroAnterior} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TelaControle;
