
import React, { useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Componente de carrossel de imagens para exibição de anúncios
 * na tela pública do sistema de filas
 */
const CarrosselImagens: React.FC = () => {
  // Referência para controle de intervalo
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Lista de imagens para o carrossel (normalmente viria de uma API)
  const imagens = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      alt: "Anúncio 1"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      alt: "Anúncio 2"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      alt: "Anúncio 3"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      alt: "Anúncio 4"
    }
  ];

  // Referência ao componente Carousel
  const carouselRef = useRef<HTMLDivElement>(null);

  // Efeito para implementar o autoplay
  useEffect(() => {
    // Função para avançar o carrossel
    const avancarCarrossel = () => {
      const nextButton = carouselRef.current?.querySelector('[aria-label="Next slide"]') as HTMLButtonElement | null;
      if (nextButton) {
        nextButton.click();
      }
    };

    // Inicia o intervalo
    intervalRef.current = setInterval(avancarCarrossel, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full shadow-lg rounded-xl overflow-hidden">
      <Carousel className="w-full" ref={carouselRef}>
        <CarouselContent>
          {imagens.map((imagem) => (
            <CarouselItem key={imagem.id}>
              <Card className="border-0">
                <CardContent className="p-0">
                  <img 
                    src={imagem.url} 
                    alt={imagem.alt}
                    className="w-full h-[250px] object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarrosselImagens;
