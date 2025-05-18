import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";

/**
 * Componente para simular a prévia da tela pública com os anúncios do usuário
 */
const PreviewTelaPublica: React.FC = () => {
  // Anúncios de exemplo para a prévia
  const anuncios = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      citacao: "Seja a melhor versão de si mesmo.",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      citacao: "Cuidar da saúde é investir no futuro.",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      citacao: "Sua saúde é nossa prioridade.",
    },
  ];

  // Estado para controlar o anúncio atual na prévia
  const [anuncioAtual, setAnuncioAtual] = useState(0);

  // Simulação de rotação automática dos anúncios
  useEffect(() => {
    const intervalo = setInterval(() => {
      setAnuncioAtual((atual) => (atual + 1) % anuncios.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [anuncios.length]);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
      {/* Barra superior simulando uma tela pública */}
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
        <div>
          <span className="font-bold">SIMULAÇÃO</span>
          <span className="text-xs ml-2">Tela Pública</span>
        </div>
        <div className="text-sm">12:45 • Qua, 17 Mai</div>
      </div>

      {/* Prévia do carrossel de anúncios */}
      <div className="aspect-video relative">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {anuncios.map((anuncio) => (
              <CarouselItem key={anuncio.id} className="relative">
                <img
                  src={anuncio.url}
                  alt={`Anúncio ${anuncio.id}`}
                  className="w-full h-full object-cover"
                />
                {/* Sobreposição com a citação motivacional */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                  <blockquote className="text-2xl md:text-3xl font-bold text-white text-center drop-shadow-lg">
                    {anuncio.citacao}
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Barra inferior simulando os guichês */}
      <div className="grid grid-cols-4 bg-gray-800 text-white">
        <div className="p-3 flex items-center justify-center">
          <div className="bg-red-600 p-2 rounded-md w-full">
            <div className="text-center">
              <span className="block text-xl font-bold">001</span>
              <span className="block text-xs opacity-75">Guichê 1</span>
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-center">
          <div className="bg-green-600 p-2 rounded-md w-full">
            <div className="text-center">
              <span className="block text-xl font-bold">045</span>
              <span className="block text-xs opacity-75">Guichê 2</span>
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-center">
          <div className="bg-amber-500 p-2 rounded-md w-full">
            <div className="text-center">
              <span className="block text-xl font-bold">023</span>
              <span className="block text-xs opacity-75">Guichê 3</span>
            </div>
          </div>
        </div>
        <div className="p-3 flex flex-col justify-center">
          <div className="text-center">
            <div className="text-xl font-bold">12:45</div>
            <div className="text-xs opacity-75">17 de maio</div>
          </div>
        </div>
      </div>

      {/* Banner informativo no rodapé */}
      <div className="bg-blue-600 text-white p-2">
        <div className="text-center">
          <p className="text-sm">
            Para agilizar seu atendimento tenha em mãos o pedido médico e um
            documento com foto
          </p>
        </div>
      </div>

      {/* Nota informativa sobre a simulação */}
      <div className="bg-yellow-100 text-yellow-800 p-2 text-xs text-center">
        Esta é apenas uma simulação. A aparência real pode variar conforme o
        tamanho da tela pública.
        <p className="invisible">{anuncioAtual}</p>
      </div>
    </div>
  );
};

export default PreviewTelaPublica;
