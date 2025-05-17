/**
 * Utilitários para formatação de dados no sistema
 */

/**
 * Formata uma data para exibição no formato brasileiro
 * @param data - A data a ser formatada
 * @param incluirHora - Se deve incluir a hora na formatação
 * @returns String formatada com a data
 */
export const formatarData = (data: Date, incluirHora = false): string => {
  if (!data) return "-";

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (incluirHora) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(data));
};

/**
 * Formata um valor monetário para exibição no formato brasileiro
 * @param valor - O valor a ser formatado
 * @returns String formatada com o valor monetário
 */
export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

/**
 * Trunca um texto para um tamanho máximo, adicionando reticências
 * @param texto - O texto a ser truncado
 * @param tamanhoMaximo - Tamanho máximo do texto
 * @returns String truncada
 */
export const truncarTexto = (texto: string, tamanhoMaximo: number): string => {
  if (!texto || texto.length <= tamanhoMaximo) return texto || "";
  return texto.substring(0, tamanhoMaximo) + "...";
};
