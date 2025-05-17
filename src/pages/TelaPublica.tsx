
import React, { useState, useEffect } from 'react';
import { useFila } from '../context/FilaContexto';
import useSincronizacaoFila from '../hooks/useSincronizacaoFila';

/**
 * Tela pública para exibição dos números chamados
 * Otimizada para visualização em monitores públicos
 * Layout moderno baseado na imagem de referência
 */
const TelaPublica: React.FC = () => {
  const { estado } = useFila();
  const [horaAtual, setHoraAtual] = useState<string>('');
  const [dataAtual, setDataAtual] = useState<string>('');
  
  // Hook para sincronização da fila entre abas
  useSincronizacaoFila();
  
  // Atualiza o título da página quando um novo número é chamado
  useEffect(() => {
    if (estado.numeroAtual) {
      document.title = `Senha: ${estado.numeroAtual} - Sistema de Fila`;
    }
    
    return () => {
      document.title = 'Sistema de Gerenciamento de Fila';
    };
  }, [estado.numeroAtual]);

  // Efeito para atualizar hora e data a cada segundo
  useEffect(() => {
    const atualizarRelogio = () => {
      const agora = new Date();
      
      // Atualiza hora
      setHoraAtual(agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }));
      
      // Atualiza data
      setDataAtual(agora.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
    };
    
    // Executa imediatamente
    atualizarRelogio();
    
    // Configura intervalo de atualização
    const intervalo = setInterval(atualizarRelogio, 1000);
    
    // Limpa intervalo ao desmontar
    return () => clearInterval(intervalo);
  }, []);

  // Dados para a área de publicidade
  const anuncios = [
    {
      imagem: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      citacao: "Seja a melhor versão de si mesmo."
    },
    {
      imagem: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      citacao: "Sua saúde é nossa prioridade."
    },
    {
      imagem: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      citacao: "Cuidar da saúde é investir no futuro."
    }
  ];
  
  // Estado para controlar o anúncio atual
  const [anuncioAtual, setAnuncioAtual] = useState(0);
  
  // Efeito para alternar os anúncios
  useEffect(() => {
    const intervalo = setInterval(() => {
      setAnuncioAtual((atual) => (atual + 1) % anuncios.length);
    }, 8000);
    
    return () => clearInterval(intervalo);
  }, [anuncios.length]);
  
  // Dados simulados para guichês
  const guiches = [
    { id: 1, numero: "001", cor: "bg-red-600" },
    { id: 2, numero: "045", cor: "bg-green-600" },
    { id: 3, numero: "023", cor: "bg-amber-500" }
  ];
  
  // Função para formatar o número da senha no histórico (adicionar zeros à esquerda)
  const formatarNumeroSenha = (numero: number): string => {
    return numero.toString().padStart(3, '0');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Área principal - Grid de duas colunas */}
      <div className="flex-1 grid grid-cols-12">
        {/* Painel esquerdo - Últimas senhas chamadas */}
        <div className="col-span-4 bg-fila-primaria text-white flex flex-col">
          <div className="p-4 border-b border-white/20">
            <h2 className="text-center text-xl font-bold">ÚLTIMAS SENHAS CHAMADAS</h2>
          </div>
          
          {/* Cabeçalho com SENHA e GUICHÊ */}
          <div className="grid grid-cols-2 p-3 border-b border-white/20 bg-fila-primaria/80">
            <div className="text-center font-bold">SENHA</div>
            <div className="text-center font-bold">GUICHÊ</div>
          </div>
          
          {/* Lista de senhas anteriores */}
          <div className="flex-1 overflow-hidden">
            {estado.historicoNumeros && estado.historicoNumeros.length > 0 ? (
              <div className="space-y-1 p-1">
                {estado.historicoNumeros.slice(0, 15).map((item, index) => (
                  <div 
                    key={item.id}
                    className={`grid grid-cols-2 p-3 ${
                      index < 3 
                        ? 'bg-white/10' 
                        : 'bg-white/5'
                    }`}
                  >
                    <div className="text-center text-2xl font-bold">
                      {formatarNumeroSenha(item.numero)}
                    </div>
                    <div className="text-center text-2xl">
                      {(item.id % 3) + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-white/70">
                <p>Nenhuma senha chamada</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Painel direito - Área de anúncios */}
        <div className="col-span-8 flex flex-col">
          {/* Área de anúncios/slides */}
          <div className="flex-1 relative overflow-hidden">
            {anuncios.map((anuncio, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 
                  ${index === anuncioAtual ? 'opacity-100' : 'opacity-0'}`}
              >
                <img 
                  src={anuncio.imagem} 
                  alt={`Anúncio ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Citação sobreposta à imagem */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <blockquote className="text-4xl font-bold text-white text-center px-12 drop-shadow-lg">
                    {anuncio.citacao}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          
          {/* Barra horizontal com guichês */}
          <div className="grid grid-cols-4 divide-x divide-white/20 bg-gray-800 text-white">
            {guiches.map((guiche) => (
              <div key={guiche.id} className="p-4 flex items-center justify-center">
                <div className={`${guiche.cor} p-3 rounded-md w-full`}>
                  <div className="text-center">
                    <span className="block text-3xl font-bold">{guiche.numero}</span>
                    <span className="block text-sm opacity-75">Guichê {guiche.id}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Relógio e data */}
            <div className="p-4 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">{horaAtual}</div>
                <div className="text-xs opacity-75 capitalize">{dataAtual}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Banner de informações no rodapé */}
      <div className="bg-fila-primaria text-white p-3">
        <div className="container mx-auto text-center">
          <p className="font-medium">
            Para agilizar seu atendimento tenha em mãos o pedido médico e um documento com foto
          </p>
        </div>
      </div>
    </div>
  );
};

export default TelaPublica;
