
import { ArrowRight, Image, ListOrdered, User } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BotaoAcao from '../components/BotaoAcao';
import Cabecalho from '../components/Cabecalho';
import PainelCards from '../components/PainelCards';
import TabelaFila from '../components/TabelaFIla';
import { useFila } from '../context/FilaContexto';
import useSincronizacaoFila from '../hooks/useSincronizacaoFila';

/**
 * Página principal do painel administrativo
 * Exibe estatísticas e acesso ao controle de fila
 */
const PainelAdmin: React.FC = () => {
  const { estado } = useFila();
  
  // Hook para sincronização da fila entre abas
  useSincronizacaoFila();
  
  // Monitora atualizações de estado para debug
  useEffect(() => {
    console.log("Estado atualizado no painel admin:", estado.numeroAtual);
  }, [estado.numeroAtual]);
  
  return (
    <div className="min-h-screen bg-fila-fundo">
      <Cabecalho titulo="Painel de Administração" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Cartões de estatísticas */}
        <PainelCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabela com próximos da fila */}
            <TabelaFila limitada={true} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="cartao">
              <h2 className="titulo-secao">Controle de Fila</h2>
              <p className="text-fila-texto-claro mb-6">
                Acesse o painel de controle para gerenciar chamadas e monitorar a fila em tempo real.
              </p>
              
              <Link to="/controle">
                <BotaoAcao 
                  variante="primario"
                  tamanhoCompleto
                  icone={<ListOrdered size={18} />}
                  onClick={() => {}}
                >
                  Acessar Controle de Fila
                </BotaoAcao>
              </Link>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-medium mb-4">Tela pública</h3>
                <p className="text-fila-texto-claro mb-4">
                  Abra a tela pública para exibir os números chamados em um monitor externo.
                </p>
                
                <Link to="/publica" target="_blank" className="text-fila-secundaria flex items-center gap-1 hover:underline">
                  <span>Abrir em nova janela</span> 
                  <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-medium mb-4">Gerenciamento de Anúncios</h3>
                <p className="text-fila-texto-claro mb-4">
                  Configure os anúncios exibidos na tela pública, incluindo opções de integração com Google AdSense.
                </p>
                
                <Link to="/anuncios">
                  <BotaoAcao 
                    variante="secundario"
                    tamanhoCompleto
                    icone={<Image size={18} />}
                    onClick={() => {}}
                  >
                    Gerenciar Anúncios
                  </BotaoAcao>
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-medium mb-4">Meu Perfil e Assinatura</h3>
                <p className="text-fila-texto-claro mb-4">
                  Visualize e gerencie suas informações pessoais, plano de assinatura e status de pagamentos.
                </p>
                
                <Link to="/perfil">
                  <BotaoAcao 
                    variante="sucesso"
                    tamanhoCompleto
                    icone={<User size={18} />}
                    onClick={() => {}}
                  >
                    Acessar Meu Perfil
                  </BotaoAcao>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PainelAdmin;
