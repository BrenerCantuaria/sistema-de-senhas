
import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatarData } from '../../utils/formatadores';

/**
 * Componente que exibe os detalhes da assinatura do usuário,
 * incluindo nome do plano, recursos, datas e opções de alteração
 */
const DetalhesAssinatura: React.FC = () => {
  // Dados simulados de assinatura
  const assinatura = {
    nomePlano: 'PRO',
    recursos: [
      'Até 5 telas públicas',
      'Sem anúncios',
      'Acesso a todos os relatórios',
      'Suporte prioritário',
    ],
    dataInicio: new Date('2024-11-15'),
    dataExpiracao: new Date('2025-11-15'),
    status: 'ativo', // ativo, pendente, expirado
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-fila-primaria" />
            <span>Meu Plano</span>
          </CardTitle>
          <Badge 
            variant={assinatura.status === 'ativo' ? 'default' : 'destructive'}
            className={assinatura.status === 'ativo' ? 'bg-fila-sucesso' : ''}
          >
            {assinatura.status === 'ativo' ? 'Ativo' : 'Expirado'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-fila-primaria mb-2">Plano {assinatura.nomePlano}</h3>
          
          <div className="grid gap-4 my-4">
            <div className="flex flex-col">
              <div className="text-sm text-fila-texto-claro">Validade</div>
              <div>
                {formatarData(assinatura.dataInicio)} até {formatarData(assinatura.dataExpiracao)}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm text-fila-texto-claro mb-2">Recursos inclusos</h4>
            <ul className="space-y-2">
              {assinatura.recursos.map((recurso, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-fila-sucesso flex-shrink-0 mt-0.5" />
                  <span>{recurso}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button variant="outline" className="w-full">Visualizar ou Alterar Plano</Button>
      </CardFooter>
    </Card>
  );
};

export default DetalhesAssinatura;
