
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ListOrdered, Monitor, MonitorSmartphone, Image, User } from 'lucide-react';

/**
 * Componente de cabeçalho para navegação no sistema
 * @param {string} titulo - Título da página atual
 */
const Cabecalho: React.FC<{ titulo: string }> = ({ titulo }) => {
  const localizacao = useLocation();
  
  return (
    <header className="bg-fila-primaria text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">{titulo}</h1>
        </div>
        
        <nav className="flex flex-wrap gap-1">
          <NavItem 
            href="/" 
            icone={<Home size={20} />}
            texto="Painel"
            ativo={localizacao.pathname === '/'} 
          />
          <NavItem 
            href="/controle" 
            icone={<ListOrdered size={20} />}
            texto="Controle"
            ativo={localizacao.pathname === '/controle'} 
          />
          <NavItem 
            href="/publica" 
            icone={<Monitor size={20} />}
            texto="Tela Pública"
            ativo={localizacao.pathname === '/publica'} 
          />
          <NavItem 
            href="/anuncios" 
            icone={<Image size={20} />}
            texto="Anúncios"
            ativo={localizacao.pathname === '/anuncios'} 
          />
          <NavItem 
            href="/perfil" 
            icone={<User size={20} />}
            texto="Meu Perfil"
            ativo={localizacao.pathname === '/perfil'} 
          />
        </nav>
      </div>
    </header>
  );
};

/**
 * Componente de item de navegação
 * @param {string} href - Link de navegação
 * @param {ReactNode} icone - Ícone do item
 * @param {string} texto - Texto do item
 * @param {boolean} ativo - Se o item está ativo
 */
const NavItem: React.FC<{ 
  href: string; 
  icone: React.ReactNode; 
  texto: string; 
  ativo: boolean 
}> = ({ href, icone, texto, ativo }) => {
  return (
    <Link 
      to={href} 
      className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors
        ${ativo 
          ? 'bg-white text-fila-primaria font-medium' 
          : 'text-white hover:bg-white/10'
        }`}
    >
      {icone}
      <span className="hidden sm:inline">{texto}</span>
    </Link>
  );
};

export default Cabecalho;
