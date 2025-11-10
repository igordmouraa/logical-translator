'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { ArrowRightLeft, Copy, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleCpcToNl, handleNlToCpc } from '@/app/actions';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'

const initialState = {
  data: '',
  error: undefined,
};

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Languages className="mr-2 h-4 w-4 animate-spin" />
          Traduzindo...
        </>
      ) : (
        <>
          <Languages className="mr-2 h-4 w-4" />
          {children}
        </>
      )}
    </Button>
  );
}

function ResultDisplay({ result }: { result: string }) {
  const { toast } = useToast();

  const onCopy = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: 'Copiado!',
      description: 'O resultado foi copiado para a área de transferência.',
    });
  };

  return (
    <div className="mt-6 space-y-2">
      <Label>Resultado</Label>
      <div className="relative">
        <Textarea
          readOnly
          value={result}
          className="bg-muted font-mono text-base"
          rows={3}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-7 w-7"
          onClick={onCopy}
          aria-label="Copiar resultado"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}


function NlToCpcTab() {
  const [state, formAction] = useActionState(handleNlToCpc, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Erro na Tradução',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="sentence">Sentença em Português</Label>
        <Textarea
          id="sentence"
          name="sentence"
          placeholder="Ex: Se chove, então a rua está molhada."
          rows={4}
          className="text-base"
          required
        />
      </div>
      <div className="mt-4">
        <SubmitButton>Traduzir para Lógica</SubmitButton>
      </div>
      {state.data && <ResultDisplay result={state.data} />}
    </form>
  );
}

function CpcToNlTab() {
  const [state, formAction] = useActionState(handleCpcToNl, initialState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Erro na Tradução',
        description: state.error,
      });
    }
  }, [state, toast]);


  const connectives = ['∧', '∨', '¬', '→', '↔', '(', ')'];

  const insertConnective = (symbol: string) => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd, value } = textareaRef.current;
      const newValue = value.substring(0, selectionStart) + symbol + value.substring(selectionEnd);
      textareaRef.current.value = newValue;

      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);

      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + symbol.length;
    }
  };

  return (
    <form action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="formula">Fórmula Lógica</Label>
        <Textarea
          id="formula"
          name="formula"
          ref={textareaRef}
          placeholder="Ex: P → Q"
          rows={4}
          className="font-mono text-base"
          required
        />
      </div>
      <div className="my-3 space-y-2">
        <Label className="text-sm">Inserir conectivo</Label>
        <div className="flex flex-wrap gap-2">
          {connectives.map(conn => (
            <Button
              key={conn}
              type="button"
              variant="outline"
              size="sm"
              className="font-mono text-lg"
              onClick={() => insertConnective(conn)}
              aria-label={`Inserir ${conn}`}
            >
              {conn}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <SubmitButton>Traduzir para Português</SubmitButton>
      </div>
      {state.data && <ResultDisplay result={state.data} />}
    </form>
  );
}

export function LogicTranslator() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ArrowRightLeft className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle>Tradutor Lógico</CardTitle>
                <CardDescription>
                  Alterne entre traduzir de português para lógica e vice-versa.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nl-to-cpc">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nl-to-cpc">Português → Lógica</TabsTrigger>
            <TabsTrigger value="cpc-to-nl">Lógica → Português</TabsTrigger>
          </TabsList>
          <TabsContent value="nl-to-cpc" className="mt-6">
            <NlToCpcTab />
          </TabsContent>
          <TabsContent value="cpc-to-nl" className="mt-6">
            <CpcToNlTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
