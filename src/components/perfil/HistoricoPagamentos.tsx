
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatarData, formatarMoeda } from '../../utils/formatadores';

/**
 * Componente que exibe o status de pagamento e histórico de transações
 */
const HistoricoPagamentos: React.FC = () => {
  // Dados simulados de pagamento
  const pagamento = {
    status: 'em_dia', // em_dia, pendente, expirado
    ultimoPagamento: new Date('2025-04-15'),
    proximaCobranca: new Date('2025-05-15'),
    valor: 49.90,
  };
  
  // Histórico de pagamentos simulado
  const historico = [
    { id: 1, data: new Date('2025-04-15'), valor: 49.90, metodo: 'Cartão de Crédito', status: 'confirmado' },
    { id: 2, data: new Date('2025-03-15'), valor: 49.90, metodo: 'Cartão de Crédito', status: 'confirmado' },
    { id: 3, data: new Date('2025-02-15'), valor: 49.90, metodo: 'Cartão de Crédito', status: 'confirmado' },
  ];
  
  // Define as cores e mensagens de acordo com o status
  const statusConfig = {
    em_dia: {
      mensagem: 'Pagamento em dia',
      corBadge: 'bg-fila-sucesso',
      varianteBadge: 'default',
    },
    pendente: {
      mensagem: 'Pagamento pendente',
      corBadge: 'bg-fila-alerta',
      varianteBadge: 'default',
    },
    expirado: {
      mensagem: 'Plano expirado',
      corBadge: '',
      varianteBadge: 'destructive',
    },
  };
  
  const configAtual = statusConfig['em_dia'];
  const precisaRegularizar = pagamento.status === 'pendente' || pagamento.status === 'expirado';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Status de Pagamento</span>
          <Badge 
            variant={configAtual.varianteBadge as any} 
            className={configAtual.corBadge}
          >
            {configAtual.mensagem}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="text-sm text-fila-texto-claro">Último pagamento</div>
              <div>{formatarData(pagamento.ultimoPagamento)} • {formatarMoeda(pagamento.valor)}</div>
            </div>
            
            <div className="flex flex-col">
              <div className="text-sm text-fila-texto-claro">Próxima cobrança</div>
              <div>{formatarData(pagamento.proximaCobranca)} • {formatarMoeda(pagamento.valor)}</div>
            </div>
          </div>
          
          {precisaRegularizar && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-800">Atenção</h3>
                  <p className="text-sm text-red-700 mt-1">
                    {pagamento.status === 'pendente'
                      ? 'Seu pagamento está pendente. Para evitar a interrupção do serviço, regularize seu pagamento.'
                      : 'Seu plano está expirado. Para continuar utilizando o sistema, regularize seu pagamento.'}
                  </p>
                  <Button className="mt-3 bg-red-500 hover:bg-red-600">
                    Regularizar Agora
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Histórico de Pagamentos</h3>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historico.map((pagamento) => (
                    <TableRow key={pagamento.id}>
                      <TableCell>{formatarData(pagamento.data)}</TableCell>
                      <TableCell>{formatarMoeda(pagamento.valor)}</TableCell>
                      <TableCell>{pagamento.metodo}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {pagamento.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricoPagamentos;
