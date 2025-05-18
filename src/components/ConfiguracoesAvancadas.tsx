
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings } from "lucide-react";

/**
 * Componente de configurações avançadas para a exibição de anúncios na tela pública
 */
const ConfiguracoesAvancadas: React.FC = () => {
  // Estados para as diferentes configurações
  const [velocidadeSlide, setVelocidadeSlide] = useState('5');
  const [estiloTransicao, setEstiloTransicao] = useState('fade');
  const [ordemExibicao, setOrdemExibicao] = useState('sequencial');
  const [loopContinuo, setLoopContinuo] = useState(true);
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5 text-blue-600" />
          Configurações Avançadas de Exibição
        </CardTitle>
        <CardDescription>
          Personalize como os anúncios são exibidos em sua tela pública
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* Velocidade do Slide */}
        <div>
          <h3 className="text-lg font-medium mb-2">Velocidade do Slideshow</h3>
          <p className="text-sm text-gray-500 mb-3">
            Tempo de exibição para cada imagem antes de passar para a próxima
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-2">
            {['3', '5', '8', '10', '15'].map((segundos) => (
              <button
                key={segundos}
                className={`py-2 px-4 rounded-lg border ${
                  velocidadeSlide === segundos 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setVelocidadeSlide(segundos)}
              >
                {segundos} segundos
              </button>
            ))}
          </div>
        </div>
        
        {/* Estilo de Transição */}
        <div>
          <h3 className="text-lg font-medium mb-2">Estilo de Transição</h3>
          <p className="text-sm text-gray-500 mb-3">
            Como as imagens mudam de uma para outra
          </p>
          <RadioGroup 
            value={estiloTransicao}
            onValueChange={setEstiloTransicao}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              {valor: 'fade', nome: 'Fade'},
              {valor: 'slide', nome: 'Deslizar'},
              {valor: 'zoom', nome: 'Zoom'},
              {valor: 'flip', nome: 'Virar'}
            ].map((estilo) => (
              <div 
                key={estilo.valor}
                className={`border rounded-lg p-3 ${
                  estiloTransicao === estilo.valor 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={estilo.valor} id={estilo.valor} />
                  <label htmlFor={estilo.valor} className="text-sm font-medium">
                    {estilo.nome}
                  </label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* Ordem de Exibição */}
        <div>
          <h3 className="text-lg font-medium mb-2">Ordem dos Anúncios</h3>
          <p className="text-sm text-gray-500 mb-3">
            Como seus anúncios são ordenados durante a exibição
          </p>
          <RadioGroup 
            value={ordemExibicao}
            onValueChange={setOrdemExibicao}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {valor: 'sequencial', nome: 'Sequencial', desc: 'Exibir na ordem em que foram carregados'},
              {valor: 'aleatorio', nome: 'Aleatório', desc: 'Ordem aleatória a cada ciclo'},
              {valor: 'personalizado', nome: 'Personalizado', desc: 'Ordem definida manualmente pelo usuário'}
            ].map((ordem) => (
              <div 
                key={ordem.valor}
                className={`border rounded-lg p-3 ${
                  ordemExibicao === ordem.valor 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value={ordem.valor} id={ordem.valor} />
                  <div>
                    <label htmlFor={ordem.valor} className="text-sm font-medium block">
                      {ordem.nome}
                    </label>
                    <p className="text-xs text-gray-500">{ordem.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* Loop Contínuo */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <h3 className="text-lg font-medium">Loop Contínuo</h3>
            <p className="text-sm text-gray-500">
              Exibir anúncios continuamente em ciclo sem pausas
            </p>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={loopContinuo} 
                onChange={() => setLoopContinuo(!loopContinuo)} 
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfiguracoesAvancadas;
