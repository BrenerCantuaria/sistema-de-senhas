
import { useEffect, useRef } from 'react';
import { useFila } from '../context/FilaContexto';

/**
 * Hook para sincronizar o estado da fila entre diferentes abas do navegador
 * Utiliza a API BroadcastChannel para comunicação em tempo real
 */
const useSincronizacaoFila = () => {
  const { estado, atualizarEstadoCompleto } = useFila();
  const canalFilaRef = useRef<BroadcastChannel | null>(null);
  const ultimaAtualizacaoExternaRef = useRef<string | null>(null);
  
  useEffect(() => {
    // Cria um canal de comunicação para a fila
    const canalFila = new BroadcastChannel('sistema-fila');
    canalFilaRef.current = canalFila;
    
    // Recebe atualizações de outras abas
    const receberAtualizacao = (evento: MessageEvent) => {
      if (evento.data.tipo === 'atualizacao-estado') {
        // Evita ciclos de atualização comparando com a última atualização
        const novoEstadoStr = JSON.stringify(evento.data.dados);
        
        // Se a atualização for idêntica à última, ignoramos para evitar loops
        if (novoEstadoStr !== ultimaAtualizacaoExternaRef.current) {
          ultimaAtualizacaoExternaRef.current = novoEstadoStr;
          atualizarEstadoCompleto(evento.data.dados);
        }
      }
    };
    
    // Adiciona escuta para eventos no canal
    canalFila.addEventListener('message', receberAtualizacao);
    
    // Limpa recursos quando o componente é desmontado
    return () => {
      canalFila.removeEventListener('message', receberAtualizacao);
      canalFila.close();
      canalFilaRef.current = null;
    };
  }, []); // Executado apenas uma vez na montagem
  
  // Efeito separado para enviar atualizações quando o estado mudar
  useEffect(() => {
    if (!canalFilaRef.current) return;
    
    // Evita enviar atualizações desnecessárias
    const estadoAtualStr = JSON.stringify(estado);
    if (estadoAtualStr === ultimaAtualizacaoExternaRef.current) return;
    
    // Envia o estado atual para outras abas quando este é alterado
    canalFilaRef.current.postMessage({
      tipo: 'atualizacao-estado',
      dados: estado
    });
  }, [estado]); // Executado quando o estado muda
};

export default useSincronizacaoFila;
