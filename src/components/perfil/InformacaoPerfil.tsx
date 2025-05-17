
import React from 'react';
import { User, Mail, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatarData } from '../../utils/formatadores';

/**
 * Componente que exibe informações básicas do usuário
 * como nome, email, data de registro e último acesso
 */
const InformacaoPerfil: React.FC = () => {
  // Normalmente estes dados viriam de um contexto de autenticação
  // ou de uma chamada de API para obter os dados do usuário
  const dadosUsuario = {
    nome: 'Ana Silva',
    email: 'ana.silva@exemplo.com',
    dataRegistro: new Date('2023-02-15'),
    ultimoAcesso: new Date('2025-05-16T14:30:00'),
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-fila-primaria" />
          <span>Informações do Usuário</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div className="flex flex-col">
            <div className="text-sm text-fila-texto-claro">Nome completo</div>
            <div className="font-medium text-lg">{dadosUsuario.nome}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm text-fila-texto-claro flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </div>
            <div>{dadosUsuario.email}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm text-fila-texto-claro flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Data de registro</span>
            </div>
            <div>{formatarData(dadosUsuario.dataRegistro)}</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm text-fila-texto-claro flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Último acesso</span>
            </div>
            <div>{formatarData(dadosUsuario.ultimoAcesso, true)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformacaoPerfil;
