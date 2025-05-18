
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

/**
 * Componente para exibir as métricas e estatísticas do Google AdSense
 */
const RelatorioAdSense: React.FC = () => {
  // Dados de exemplo para o relatório
  const dadosReceita = [
    { data: '14/05', valor: 35 },
    { data: '15/05', valor: 42 },
    { data: '16/05', valor: 38 },
    { data: '17/05', valor: 45 },
    { data: '18/05', valor: 40 },
    { data: '19/05', valor: 52 },
    { data: '20/05', valor: 48 },
  ];
  
  // Estatísticas gerais
  const estatisticas = {
    receitaEstimada: {
      diaria: "R$ 45,20",
      semanal: "R$ 316,40",
      mensal: "R$ 1.356,00"
    },
    impressoes: {
      total: 12845,
      mediaDiaria: 428
    },
    ctr: "2.3%"
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500">
          Dados aproximados baseados no desempenho recente. Para informações detalhadas e precisas, 
          acesse o painel do Google AdSense.
        </p>
      </div>
      
      {/* Cards de métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Receita Estimada (Mês)</h3>
            <p className="text-3xl font-bold text-green-600">{estatisticas.receitaEstimada.mensal}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total de Impressões</h3>
            <p className="text-3xl font-bold text-blue-600">{estatisticas.impressoes.total.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">CTR (Taxa de Clique)</h3>
            <p className="text-3xl font-bold text-purple-600">{estatisticas.ctr}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráfico de receita */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Tendência de Receita (7 dias)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosReceita}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value},00`, 'Receita']} />
                <Legend />
                <Bar dataKey="valor" fill="#10b981" name="Receita Diária (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Detalhes adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Receita por Período</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Hoje</span>
                <span className="font-medium">{estatisticas.receitaEstimada.diaria}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Esta semana</span>
                <span className="font-medium">{estatisticas.receitaEstimada.semanal}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Este mês</span>
                <span className="font-medium">{estatisticas.receitaEstimada.mensal}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Métricas de Impressão</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Total de impressões</span>
                <span className="font-medium">{estatisticas.impressoes.total.toLocaleString()}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Média diária</span>
                <span className="font-medium">{estatisticas.impressoes.mediaDiaria.toLocaleString()}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Taxa de clique (CTR)</span>
                <span className="font-medium">{estatisticas.ctr}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Link para relatório completo */}
      <div className="flex justify-center mt-6">
        <Button variant="outline" className="flex items-center gap-2">
          <span>Ver relatório completo no AdSense</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default RelatorioAdSense;
