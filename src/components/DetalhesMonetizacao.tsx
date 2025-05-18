
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleDollarSign, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

/**
 * Componente para detalhes de monetização quando o modo de anúncios de terceiros está ativo
 */
const DetalhesMonetizacao: React.FC = () => {
  // Função para salvar informações de pagamento
  const salvarInformacoesPagamento = () => {
    toast({
      title: "Informações de pagamento salvas",
      description: "Suas informações de pagamento foram atualizadas com sucesso.",
    });
  };
  
  // Dados simulados de pagamento
  const dadosPagamento = {
    saldoAtual: "R$ 125,80",
    totalGanho: "R$ 284,50",
    proximoPagamento: "10/06/2023",
    metodoPagamento: "Pix",
    chavePix: "exemplo@email.com",
    historicoPagamentos: [
      { id: 1, data: "05/04/2023", valor: "R$ 85,20", referencia: "Março/2023", status: "Pago" },
      { id: 2, data: "05/03/2023", valor: "R$ 76,80", referencia: "Fevereiro/2023", status: "Pago" },
      { id: 3, data: "05/02/2023", valor: "R$ 65,30", referencia: "Janeiro/2023", status: "Pago" }
    ]
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalhes de Monetização</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <CircleDollarSign className="mr-2 h-5 w-5" />
              Saldo Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-800">{dadosPagamento.saldoAtual}</p>
            <p className="text-sm text-green-600 mt-1">
              Será pago em {dadosPagamento.proximoPagamento}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700">Total Ganho</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dadosPagamento.totalGanho}</p>
            <p className="text-sm text-gray-500 mt-1">Desde o início</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-700">Método de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-medium">{dadosPagamento.metodoPagamento}</p>
            <p className="text-sm text-gray-500 mt-1">{dadosPagamento.chavePix}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Formulário para informações de pagamento */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informações de Pagamento</CardTitle>
          <CardDescription>
            Configure como deseja receber seus pagamentos pelos anúncios exibidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="metodoPagamento" className="block text-sm font-medium text-gray-700 mb-1">
                  Método de Pagamento
                </label>
                <select 
                  id="metodoPagamento" 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  defaultValue="pix"
                >
                  <option value="pix">Pix</option>
                  <option value="transferencia">Transferência Bancária</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="chavePix" className="block text-sm font-medium text-gray-700 mb-1">
                  Chave Pix
                </label>
                <input 
                  type="text" 
                  id="chavePix" 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  defaultValue={dadosPagamento.chavePix}
                  placeholder="CPF, e-mail, telefone ou chave aleatória"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button"
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                onClick={salvarInformacoesPagamento}
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Informações de Pagamento
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Histórico de pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>
            Registro de todos os pagamentos recebidos até o momento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosPagamento.historicoPagamentos.map((pagamento) => (
                <TableRow key={pagamento.id}>
                  <TableCell>{pagamento.data}</TableCell>
                  <TableCell>{pagamento.valor}</TableCell>
                  <TableCell>{pagamento.referencia}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {pagamento.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Mensagem quando não há pagamentos */}
          {dadosPagamento.historicoPagamentos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum pagamento registrado ainda. Os pagamentos serão listados aqui após o primeiro ciclo.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetalhesMonetizacao;
