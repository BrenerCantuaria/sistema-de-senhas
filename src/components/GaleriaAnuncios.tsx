
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Edit, X, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

/**
 * Componente de Galeria para gerenciamento dos anúncios do usuário
 * Permite visualizar, ativar/desativar, editar e excluir anúncios
 */
const GaleriaAnuncios: React.FC = () => {
  // Estado para armazenar os anúncios do usuário
  const [anuncios, setAnuncios] = useState([
    { 
      id: 1, 
      nome: "promocao-maio.jpg", 
      url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", 
      ativo: true,
      citacao: "Seja a melhor versão de si mesmo."
    },
    { 
      id: 2, 
      nome: "servicos-especiais.jpg", 
      url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", 
      ativo: true,
      citacao: "Cuidar da saúde é investir no futuro."
    },
    { 
      id: 3, 
      nome: "campanha-saude.jpg", 
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", 
      ativo: false,
      citacao: "Sua saúde é nossa prioridade."
    },
  ]);
  
  // Função para alternar o status de um anúncio (ativo/inativo)
  const alternarStatusAnuncio = (id: number) => {
    setAnuncios(anuncios.map(anuncio => 
      anuncio.id === id ? { ...anuncio, ativo: !anuncio.ativo } : anuncio
    ));
    
    // Encontra o anúncio para mostrar a mensagem apropriada
    const anuncio = anuncios.find(a => a.id === id);
    if (anuncio) {
      const novoStatus = !anuncio.ativo;
      toast({
        title: `Anúncio ${novoStatus ? 'ativado' : 'desativado'}`,
        description: `O anúncio "${anuncio.nome}" foi ${novoStatus ? 'ativado' : 'desativado'} com sucesso.`,
      });
    }
  };
  
  // Função para remover um anúncio
  const removerAnuncio = (id: number) => {
    const anuncio = anuncios.find(a => a.id === id);
    if (anuncio) {
      setAnuncios(anuncios.filter(anuncio => anuncio.id !== id));
      toast({
        title: "Anúncio removido",
        description: `O anúncio "${anuncio.nome}" foi removido com sucesso.`,
      });
    }
  };
  
  // Função para simular o upload de um novo anúncio
  const uploadNovoAnuncio = () => {
    // Aqui seria implementada a lógica real de upload
    // Para demonstração, apenas adicionamos um anúncio fixo
    const novoAnuncio = {
      id: anuncios.length + 1,
      nome: `novo-anuncio-${anuncios.length + 1}.jpg`,
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      ativo: true,
      citacao: "Atendimento de qualidade é nosso compromisso."
    };
    
    setAnuncios([...anuncios, novoAnuncio]);
    toast({
      title: "Anúncio adicionado",
      description: "Seu novo anúncio foi carregado com sucesso.",
    });
  };
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Meus Anúncios</h2>
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          onClick={uploadNovoAnuncio}
        >
          <Upload className="mr-2 h-5 w-5" />
          Carregar Novo Anúncio
        </button>
      </div>
      
      <p className="text-gray-600 mb-4">
        Gerencie as imagens que serão exibidas em sua tela pública. Formatos aceitos: JPG, PNG. 
        Tamanho máximo: 5MB. Proporção recomendada: 16:9.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {anuncios.map(anuncio => (
          <Card key={anuncio.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={anuncio.url} 
                alt={anuncio.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${anuncio.ativo 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                  }
                `}>
                  {anuncio.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm truncate" title={anuncio.nome}>
                  {anuncio.nome}
                </p>
                <div className="flex space-x-2">
                  <button 
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={() => toast({
                      title: "Função indisponível",
                      description: "A edição de anúncios estará disponível em breve.",
                    })}
                    title="Editar anúncio"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    className={`p-1 ${anuncio.ativo ? 'text-green-600' : 'text-gray-400'} hover:text-green-700 transition-colors`}
                    onClick={() => alternarStatusAnuncio(anuncio.id)}
                    title={anuncio.ativo ? "Desativar anúncio" : "Ativar anúncio"}
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    onClick={() => removerAnuncio(anuncio.id)}
                    title="Remover anúncio"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Citação: "{anuncio.citacao}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GaleriaAnuncios;
