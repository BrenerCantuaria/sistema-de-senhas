
import React from 'react';

/**
 * Tipos de variantes disponíveis para os botões
 */
type VarianteBotao = 'primario' | 'secundario' | 'sucesso' | 'alerta' | 'erro';

/**
 * Mapeamento de variantes para classes Tailwind
 */
const estiloVariante: Record<VarianteBotao, string> = {
  primario: 'bg-fila-primaria hover:bg-fila-primaria/90 text-white',
  secundario: 'bg-fila-secundaria hover:bg-fila-secundaria/90 text-white',
  sucesso: 'bg-fila-sucesso hover:bg-fila-sucesso/90 text-white',
  alerta: 'bg-fila-alerta hover:bg-fila-alerta/90 text-white',
  erro: 'bg-fila-erro hover:bg-fila-erro/90 text-white',
};

/**
 * Propriedades do componente BotaoAcao
 */
export interface BotaoAcaoProps {
  children: React.ReactNode;
  onClick: () => void;
  variante?: VarianteBotao;
  tamanhoCompleto?: boolean;
  icone?: React.ReactNode;
  desabilitado?: boolean;
  className?: string;
}

/**
 * Componente de botão de ação com variantes de estilo
 */
const BotaoAcao: React.FC<BotaoAcaoProps> = ({ 
  children, 
  onClick, 
  variante = 'primario', 
  tamanhoCompleto = false,
  icone,
  desabilitado = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={desabilitado}
      className={`
        flex items-center justify-center gap-2 font-medium px-4 py-2 rounded-md
        shadow-sm transition-all duration-200 transform
        active:scale-95 
        ${estiloVariante[variante]}
        ${tamanhoCompleto ? 'w-full' : ''}
        ${desabilitado ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
        ${className}
      `}
    >
      {icone && <span className="flex-shrink-0">{icone}</span>}
      {children}
    </button>
  );
};

export default BotaoAcao;
