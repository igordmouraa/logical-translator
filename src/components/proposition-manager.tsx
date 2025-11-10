'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { handleSuggestPropositions } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export function PropositionManager() {
  const [propositions, setPropositions] = useState({ P: '', Q: '', R: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropositions(prev => ({ ...prev, [name]: value }));
  };

  const onSuggest = async () => {
    setIsLoading(true);
    const result = await handleSuggestPropositions();
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: result.error,
      });
    } else if (result.data) {
      // Ensure the data from AI is not null or undefined before setting state
      const suggestions = {
        P: result.data.P ?? '',
        Q: result.data.Q ?? '',
        R: result.data.R ?? '',
      };
      setPropositions(suggestions);
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Definição de Proposições</CardTitle>
        <CardDescription>
          Defina o significado das proposições (P, Q, R) ou clique em "Sugerir" para obter ideias. Este é um rascunho para seu auxílio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
             <div className="space-y-4">
              <div className="space-y-1.5"><Skeleton className="h-5 w-5" /><Skeleton className="h-10 w-full" /></div>
              <div className="space-y-1.5"><Skeleton className="h-5 w-5" /><Skeleton className="h-10 w-full" /></div>
              <div className="space-y-1.5"><Skeleton className="h-5 w-5" /><Skeleton className="h-10 w-full" /></div>
            </div>
          ) : (
            (['P', 'Q', 'R'] as const).map(prop => (
              <div key={prop} className="grid w-full items-center gap-1.5">
                <Label htmlFor={prop} className="font-bold text-lg font-mono text-primary">{prop}</Label>
                <Input
                  type="text"
                  id={prop}
                  name={prop}
                  placeholder={`Significado de ${prop}...`}
                  value={propositions[prop]}
                  onChange={handleInputChange}
                  className="text-base"
                />
              </div>
            ))
          )}
        </div>
        <Button onClick={onSuggest} disabled={isLoading} className="mt-6 w-full sm:w-auto">
          <Lightbulb className="mr-2 h-4 w-4" />
          {isLoading ? 'Sugerindo...' : 'Sugerir'}
        </Button>
      </CardContent>
    </Card>
  );
}
