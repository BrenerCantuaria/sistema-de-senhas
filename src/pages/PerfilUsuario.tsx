
import React from 'react';
import Cabecalho from '../components/Cabecalho';
import DetalhesAssinatura from '../components/perfil/DetalhesAssinatura';
import HistoricoPagamentos from '../components/perfil/HistoricoPagamentos';
import InformacaoPerfil from '../components/perfil/InformacaoPerfil';
import PreferenciasUsuario from '../components/perfil/PreferenciasUsuario';

/**
 * Página de perfil do usuário mostrando informações pessoais, 
 * dados de assinatura, status de pagamento e preferências
 */
const PerfilUsuario: React.FC = () => {
  return (
    <div className="min-h-screen bg-fila-fundo">
      <Cabecalho titulo="Meu Perfil" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da esquerda - Informações do usuário */}
          <div className="lg:col-span-1">
            <InformacaoPerfil />
            <div className="mt-8">
              <PreferenciasUsuario />
            </div>
          </div>
          
          {/* Coluna da direita - Assinatura e pagamentos */}
          <div className="lg:col-span-2">
            <DetalhesAssinatura />
            <div className="mt-8">
              <HistoricoPagamentos />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerfilUsuario;
