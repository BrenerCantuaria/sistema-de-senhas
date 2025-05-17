import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import type { ReactNode } from 'react';
import { toast } from "sonner";

// Definição de tipos para o contexto da fila
interface ItemFila {
  id: number;
  numero: number;
  horaCriacao: Date;
}

// Item para o histórico de chamadas
interface ItemHistorico {
  id: number;
  numero: number;
  horaChamada: Date;
}

interface EstadoFila {
  numeroAtual: number | null;
  fila: ItemFila[];
  totalChamadasHoje: number;
  tempoEsperaMedio: number;
  usuariosNaFila: number;
  ultimaChamada: Date | null;
  historicoNumeros: ItemHistorico[]; // Adicionado histórico de chamadas
}

interface ContextoFila {
  estado: EstadoFila;
  chamarProximo: () => void;
  repetirChamada: () => void;
  pularNumero: () => void;
  reiniciarFila: () => void;
  adicionarNaFila: () => void;
  chamarNumeroEspecifico: (numero: number) => void;
  chamarNumeroAnterior: (numero: number) => void; // Nova função para chamar número já chamado antes
  atualizarEstadoCompleto: (novoEstado: EstadoFila) => void;
}

// Criação do contexto com valores padrão
const FilaContexto = createContext<ContextoFila | undefined>(undefined);

/**
 * Provedor de contexto para gerenciamento da fila
 * Fornece funções e estado para controlar a fila de atendimento
 */
export const FilaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado inicial da fila
  const [estado, setEstado] = useState<EstadoFila>({
    numeroAtual: null,
    fila: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      numero: i + 1,
      horaCriacao: new Date(Date.now() - Math.random() * 3600000),
    })),
    totalChamadasHoje: 0,
    tempoEsperaMedio: 0,
    usuariosNaFila: 10,
    ultimaChamada: null,
    historicoNumeros: [], // Inicializa histórico vazio
  });

  // Efeito para calcular o tempo médio de espera
  useEffect(() => {
    // Simulação de cálculo de tempo médio de espera
    if (estado.fila.length > 0) {
      const agora = new Date();
      const tempoTotal = estado.fila.reduce((total, item) => {
        return total + (agora.getTime() - item.horaCriacao.getTime());
      }, 0);

      const tempoMedio = tempoTotal / estado.fila.length / 60000; // Converte para minutos
      setEstado((prevEstado) => ({
        ...prevEstado,
        tempoEsperaMedio: parseFloat(tempoMedio.toFixed(1)),
        usuariosNaFila: estado.fila.length,
      }));
    }
  }, [estado.fila]);

  /**
   * Registra um número chamado no histórico
   */
  const registrarChamadaHistorico = (numero: number) => {
    // Evita duplicatas consecutivas no histórico
    if (
      estado.historicoNumeros.length > 0 &&
      estado.historicoNumeros[0].numero === numero
    ) {
      return;
    }

    const novoHistorico = [
      {
        id: Date.now(),
        numero: numero,
        horaChamada: new Date(),
      },
      ...estado.historicoNumeros.slice(0, 19),
    ]; // Mantém no máximo 20 itens

    setEstado((prevEstado) => ({
      ...prevEstado,
      historicoNumeros: novoHistorico,
    }));
  };

  /**
   * Chama o próximo número na fila
   */
  const chamarProximo = () => {
    if (estado.fila.length === 0) {
      toast.warning("Não há mais números na fila!");
      return;
    }

    const proximoItem = estado.fila[0];
    const novaFila = estado.fila.slice(1);

    setEstado((prevEstado) => ({
      ...prevEstado,
      numeroAtual: proximoItem.numero,
      fila: novaFila,
      totalChamadasHoje: prevEstado.totalChamadasHoje + 1,
      ultimaChamada: new Date(),
      usuariosNaFila: novaFila.length,
    }));

    // Registra no histórico
    registrarChamadaHistorico(proximoItem.numero);

    toast.success(`Chamando número ${proximoItem.numero}`);
  };

  /**
   * Repete a chamada do número atual
   */
  const repetirChamada = () => {
    if (estado.numeroAtual === null) {
      toast.warning("Nenhum número foi chamado ainda!");
      return;
    }

    setEstado((prevEstado) => ({
      ...prevEstado,
      ultimaChamada: new Date(),
    }));

    // Registra no histórico novamente
    registrarChamadaHistorico(estado.numeroAtual);

    toast.info(`Repetindo chamada do número ${estado.numeroAtual}`);
  };

  /**
   * Chama um número que já foi chamado anteriormente
   * @param {number} numero - O número a ser chamado novamente
   */
  const chamarNumeroAnterior = (numero: number) => {
    setEstado((prevEstado) => ({
      ...prevEstado,
      numeroAtual: numero,
      ultimaChamada: new Date(),
    }));

    // Registra no histórico
    registrarChamadaHistorico(numero);

    toast.info(`Chamando novamente o número ${numero}`);
  };

  /**
   * Pula o número atual e chama o próximo
   */
  const pularNumero = () => {
    if (estado.fila.length === 0) {
      toast.warning("Não há mais números na fila!");
      return;
    }

    const proximoItem = estado.fila[0];
    const novaFila = estado.fila.slice(1);

    setEstado((prevEstado) => ({
      ...prevEstado,
      numeroAtual: proximoItem.numero,
      fila: novaFila,
      totalChamadasHoje: prevEstado.totalChamadasHoje + 1,
      ultimaChamada: new Date(),
      usuariosNaFila: novaFila.length,
    }));

    // Registra no histórico
    registrarChamadaHistorico(proximoItem.numero);

    toast.info(`Pulando para o número ${proximoItem.numero}`);
  };

  /**
   * Reinicia a fila, gerando novos números
   */
  const reiniciarFila = () => {
    const novaFila = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      numero: i + 1,
      horaCriacao: new Date(),
    }));

    setEstado({
      numeroAtual: null,
      fila: novaFila,
      totalChamadasHoje: 0,
      tempoEsperaMedio: 0,
      usuariosNaFila: novaFila.length,
      ultimaChamada: null,
      historicoNumeros: [], // Limpa o histórico também
    });

    toast.success("Fila reiniciada com sucesso!");
  };

  /**
   * Adiciona um novo número à fila
   */
  const adicionarNaFila = () => {
    const ultimoNumero =
      estado.fila.length > 0
        ? Math.max(...estado.fila.map((item) => item.numero))
        : estado.numeroAtual || 0;

    const novoItem = {
      id: Date.now(),
      numero: ultimoNumero + 1,
      horaCriacao: new Date(),
    };

    setEstado((prevEstado) => ({
      ...prevEstado,
      fila: [...prevEstado.fila, novoItem],
      usuariosNaFila: prevEstado.fila.length + 1,
    }));

    toast.success(`Número ${novoItem.numero} adicionado à fila`);
  };

  /**
   * Chama um número específico da fila (fora de ordem)
   * @param {number} numero - O número específico a ser chamado
   */
  const chamarNumeroEspecifico = (numero: number) => {
    // Procura o número na fila
    const indiceItem = estado.fila.findIndex((item) => item.numero === numero);

    if (indiceItem === -1) {
      toast.warning(`Número ${numero} não encontrado na fila!`);
      return;
    }

    // Remove o item da fila
    const itemChamado = estado.fila[indiceItem];
    const novaFila = [...estado.fila];
    novaFila.splice(indiceItem, 1);

    setEstado((prevEstado) => ({
      ...prevEstado,
      numeroAtual: itemChamado.numero,
      fila: novaFila,
      totalChamadasHoje: prevEstado.totalChamadasHoje + 1,
      ultimaChamada: new Date(),
      usuariosNaFila: novaFila.length,
    }));

    // Registra no histórico
    registrarChamadaHistorico(itemChamado.numero);

    toast.success(`Chamando número ${numero} fora de ordem`);
  };

  /**
   * Atualiza o estado completo da fila
   * Usado para sincronização entre diferentes abas/janelas
   * @param {EstadoFila} novoEstado - O novo estado completo da fila
   */
  const atualizarEstadoCompleto = (novoEstado: EstadoFila) => {
    // Previne atualizações desnecessárias que podem causar ciclos
    if (
      novoEstado.numeroAtual === estado.numeroAtual &&
      novoEstado.fila.length === estado.fila.length &&
      novoEstado.historicoNumeros.length === estado.historicoNumeros.length
    ) {
      return;
    }

    // Converte as strings ISO de volta para objetos Date
    const estadoProcessado = {
      ...novoEstado,
      ultimaChamada: novoEstado.ultimaChamada
        ? new Date(novoEstado.ultimaChamada)
        : null,
      fila: novoEstado.fila.map((item) => ({
        ...item,
        horaCriacao: new Date(item.horaCriacao),
      })),
      historicoNumeros: novoEstado.historicoNumeros
        ? novoEstado.historicoNumeros.map((item) => ({
            ...item,
            horaChamada: new Date(item.horaChamada),
          }))
        : [],
    };

    setEstado(estadoProcessado);
  };

  // Valor do contexto a ser fornecido
  const valorContexto = {
    estado,
    chamarProximo,
    repetirChamada,
    pularNumero,
    reiniciarFila,
    adicionarNaFila,
    chamarNumeroEspecifico,
    chamarNumeroAnterior,
    atualizarEstadoCompleto,
  };

  return (
    <FilaContexto.Provider value={valorContexto}>
      {children}
    </FilaContexto.Provider>
  );
};

/**
 * Hook personalizado para utilizar o contexto da fila
 */
export const useFila = () => {
  const contexto = useContext(FilaContexto);

  if (contexto === undefined) {
    throw new Error("useFila deve ser usado dentro de um FilaProvider");
  }

  return contexto;
};
