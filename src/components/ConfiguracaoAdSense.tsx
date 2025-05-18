
import React, { useState } from 'react';
import { Check, Info, Link, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

/**
 * Componente para configuração da integração com o Google AdSense
 * Permite conectar conta, verificar status e requisitos
 */
const ConfiguracaoAdSense: React.FC = () => {
  // Estado para controlar se a conta está conectada
  const [contaConectada, setContaConectada] = useState(false);
  const [codigoAdSense, setCodigoAdSense] = useState('');
  const [dominioVerificado, setDominioVerificado] = useState(false);
  
  // Lista de requisitos para ativação do AdSense
  const requisitos = [
    { id: 1, descricao: "Verificação de domínio", completo: dominioVerificado },
    { id: 2, descricao: "Política de conteúdo em conformidade", completo: true },
    { id: 3, descricao: "Conta do Google AdSense ativa", completo: contaConectada },
    { id: 4, descricao: "Anúncios configurados na plataforma", completo: false }
  ];
  
  // Função para conectar conta AdSense
  const conectarConta = () => {
    if (!codigoAdSense.trim()) {
      toast({
        title: "Erro na conexão",
        description: "Por favor, insira um código de publicador válido.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulando conexão com AdSense
    setContaConectada(true);
    toast({
      title: "Conta conectada com sucesso",
      description: "Sua conta Google AdSense foi vinculada à tela pública.",
    });
  };
  
  // Função para verificar domínio
  const verificarDominio = () => {
    // Simulando processo de verificação
    setDominioVerificado(true);
    toast({
      title: "Domínio verificado",
      description: "Seu domínio foi verificado com sucesso no Google AdSense.",
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Mensagem explicativa */}
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-blue-700">Como funciona o Google AdSense</AlertTitle>
        <AlertDescription className="text-blue-600">
          O Google AdSense gerenciará quais anúncios serão exibidos em sua tela pública.
          Todas as receitas de anúncios são processadas diretamente pelo Google, e você
          receberá pagamentos conforme as políticas da plataforma.
        </AlertDescription>
      </Alert>
      
      {/* Configuração da conta */}
      <div className="border rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium mb-4">Conectar conta do Google AdSense</h3>
        
        {!contaConectada ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adsense-code">Código de publicador do AdSense</Label>
              <Input 
                id="adsense-code" 
                placeholder="pub-0000000000000000" 
                value={codigoAdSense}
                onChange={(e) => setCodigoAdSense(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Encontre seu código de publicador no painel do Google AdSense
              </p>
            </div>
            
            <Button onClick={conectarConta} className="flex items-center gap-2">
              <Link size={18} />
              <span>Conectar Conta</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Check size={20} />
              <span>Conta conectada: {codigoAdSense}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setContaConectada(false);
                setCodigoAdSense('');
              }}
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <X size={18} />
              <span>Desconectar</span>
            </Button>
          </div>
        )}
      </div>
      
      {/* Status e verificação */}
      <div className="border rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium mb-4">Status e verificação</h3>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Lista de requisitos */}
          <div className="flex-1">
            <h4 className="text-md font-medium mb-3">Requisitos mínimos</h4>
            <ul className="space-y-2">
              {requisitos.map(req => (
                <li key={req.id} className="flex items-center gap-2">
                  {req.completo ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <X size={18} className="text-gray-400" />
                  )}
                  <span className={req.completo ? "text-gray-800" : "text-gray-500"}>
                    {req.descricao}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Ações de verificação */}
          <div className="flex-1">
            <h4 className="text-md font-medium mb-3">Verificações adicionais</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Button 
                  variant={dominioVerificado ? "outline" : "default"}
                  onClick={verificarDominio}
                  disabled={dominioVerificado}
                >
                  {dominioVerificado ? "Domínio Verificado" : "Verificar Domínio"}
                </Button>
                {dominioVerificado && <Check size={18} className="text-green-500" />}
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Link size={18} />
                  <span>Abrir Painel do AdSense</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracaoAdSense;
