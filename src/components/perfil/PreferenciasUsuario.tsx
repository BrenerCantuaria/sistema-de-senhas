
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * Componente de preferências do usuário para gerenciar configurações
 * como notificações e tema
 */
const PreferenciasUsuario: React.FC = () => {
  // Estado para controlar as preferências
  const [preferencias, setPreferencias] = useState({
    notificacaoEmail: true,
    notificacaoSistema: true,
    boletimInformativo: false,
  });
  
  // Atualiza uma preferência específica
  const alterarPreferencia = (chave: keyof typeof preferencias) => {
    setPreferencias(prev => ({
      ...prev,
      [chave]: !prev[chave]
    }));
  };
  
  // Salva as preferências (simulado)
  const salvarPreferencias = () => {
    // Aqui seria feita uma chamada para salvar no backend
    toast.success("Preferências atualizadas com sucesso!");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-fila-primaria" />
          <span>Minhas Preferências</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notificacao-email" className="flex-grow cursor-pointer">
              Notificações por email
            </Label>
            <Switch
              id="notificacao-email"
              checked={preferencias.notificacaoEmail}
              onCheckedChange={() => alterarPreferencia('notificacaoEmail')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notificacao-sistema" className="flex-grow cursor-pointer">
              Notificações no sistema
            </Label>
            <Switch
              id="notificacao-sistema"
              checked={preferencias.notificacaoSistema}
              onCheckedChange={() => alterarPreferencia('notificacaoSistema')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="boletim" className="flex-grow cursor-pointer">
              Receber boletim informativo
            </Label>
            <Switch
              id="boletim"
              checked={preferencias.boletimInformativo}
              onCheckedChange={() => alterarPreferencia('boletimInformativo')}
            />
          </div>
          
          <Button 
            onClick={salvarPreferencias}
            className="w-full mt-4"
            variant="outline"
          >
            Salvar Preferências
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferenciasUsuario;
