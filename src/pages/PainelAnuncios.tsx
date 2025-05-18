import Cabecalho from "@/components/Cabecalho";
import ConfiguracaoAdSense from "@/components/ConfiguracaoAdSense";
import ConfiguracoesAvancadas from "@/components/ConfiguracoesAvancadas";
import GaleriaAnuncios from "@/components/GaleriaAnuncios";
import PreviewTelaPublica from "@/components/PreviewTelaPublica";
import RelatorioAdSense from "@/components/RelatorioAdSense";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Painel de Administração para Gerenciamento de Anúncios e Análise de Desempenho
 * Permite ao usuário configurar preferências de exibição de anúncios e visualizar métricas
 */
const PainelAnuncios: React.FC = () => {
  // Estado para rastrear o modo de exibição de anúncios selecionado
  const [modoAnuncio, setModoAnuncio] = useState<"proprios" | "adsense">(
    "proprios"
  );

  //@ts-ignore
  // Estado para simulação de dados analíticos
  const [dadosAnaliticos, setDadosAnaliticos] = useState({
    tempoAtivo: {
      total: "382 horas",
      mediaDiaria: "8.2 horas",
      sessoesAtivas: 14,
    },
  });

  // Função para salvar as configurações
  const salvarConfiguracoes = () => {
    toast({
      title: "Configurações salvas",
      description: `Suas preferências de anúncios foram atualizadas para modo: ${
        modoAnuncio === "proprios" ? "Anúncios próprios" : "Google AdSense"
      }.`,
    });
  };

  // Alternar modo de exibição de anúncios
  const alternarModoAnuncio = (valor: "proprios" | "adsense") => {
    setModoAnuncio(valor);
  };

  return (
    <div className="min-h-screen bg-fila-fundo">
      <Cabecalho titulo="Configurações & Análise de Anúncios" />

      <div className="container mx-auto py-6 px-4 max-w-7xl">
        {/* Botão para voltar ao início */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>Voltar ao Painel</span>
            </Button>
          </Link>
        </div>

        {/* Cabeçalho da página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Configurações & Análise de Anúncios
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Monitore o desempenho de sua tela pública e configure suas
            preferências de exibição de anúncios.
          </p>
        </div>

        {/* Seletor de Modo de Anúncios */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Modo de Exibição de Anúncios</CardTitle>
            <CardDescription>
              Escolha como você deseja que os anúncios sejam exibidos na sua
              tela pública.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={modoAnuncio}
              onValueChange={(valor) =>
                alternarModoAnuncio(valor as "proprios" | "adsense")
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div
                className={`border rounded-lg p-4 ${
                  modoAnuncio === "proprios"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="proprios" id="proprios" />
                  <div className="grid gap-1.5">
                    <label htmlFor="proprios" className="text-lg font-medium">
                      Exibir Meus Próprios Anúncios
                    </label>
                    <p className="text-sm text-gray-500">
                      Tenha controle total sobre o conteúdo exibido em sua tela
                      pública. Carregue suas próprias imagens promocionais.
                    </p>
                    <div className="mt-2 text-sm font-medium text-blue-600">
                      Impressões estimadas: ~450 diárias
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 ${
                  modoAnuncio === "adsense"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="adsense" id="adsense" />
                  <div className="grid gap-1.5">
                    <label htmlFor="adsense" className="text-lg font-medium">
                      Integrar com Google AdSense
                    </label>
                    <p className="text-sm text-gray-500">
                      Permita que o Google AdSense exiba anúncios em sua tela e
                      ganhe uma comissão por impressão e clique.
                    </p>
                    <div className="mt-2 text-sm font-medium text-green-600">
                      Ganho potencial: R$ 250-500 por mês
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Seção de Análise */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Análise de Desempenho
          </h2>

          {/* Visão Geral do Engajamento - comum a ambos os modos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tempo de Exibição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-700 font-medium">Tempo Total Ativo</p>
                  <p className="text-3xl font-bold text-blue-800">
                    {dadosAnaliticos.tempoAtivo.total}
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-indigo-700 font-medium">Média Diária</p>
                  <p className="text-3xl font-bold text-indigo-800">
                    {dadosAnaliticos.tempoAtivo.mediaDiaria}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-700 font-medium">Sessões Ativas</p>
                  <p className="text-3xl font-bold text-purple-800">
                    {dadosAnaliticos.tempoAtivo.sessoesAtivas}
                  </p>
                  <p className="text-xs text-purple-600">Últimos 7 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conteúdo condicional com base no modo selecionado */}
          {modoAnuncio === "proprios" ? (
            <>
              {/* Galeria de Anúncios do Usuário */}
              <GaleriaAnuncios />

              {/* Preview da Tela Pública */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Prévia da Tela Pública
                </h2>
                <p className="text-gray-600 mb-4">
                  Esta é uma simulação de como seus anúncios aparecerão na tela
                  pública:
                </p>
                <PreviewTelaPublica />
              </div>
            </>
          ) : (
            <>
              {/* Componentes específicos de AdSense */}
              <ConfiguracaoAdSense />

              {/* Relatório do AdSense */}
              <div className="mt-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Relatório de Desempenho do AdSense
                </h2>
                <RelatorioAdSense />
              </div>
            </>
          )}
        </div>

        {/* Configurações Avançadas de Exibição */}
        <ConfiguracoesAvancadas />

        {/* Área de Ação e Feedback */}
        <div className="flex justify-end mt-8">
          <Button
            className="flex items-center px-6 py-3 gap-2"
            onClick={salvarConfiguracoes}
          >
            <Save className="h-5 w-5" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PainelAnuncios;
