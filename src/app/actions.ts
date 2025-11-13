'use server';

import { z } from 'zod';
import { translatePortugueseToLogic } from '@/ai/flows/translate-portuguese-to-logic';
import { translateLogicToPortuguese } from '@/ai/flows/translate-logic-to-portuguese';
import { suggestPropositionMeanings } from '@/ai/flows/suggest-proposition-meanings';

const nlToCpcSchema = z.object({
  sentence: z.string().min(1, 'A sentença não pode estar vazia.'),
});
export async function handleNlToCpc(prevState: any, formData: FormData) {
  try {
    const validatedFields = nlToCpcSchema.safeParse({
      sentence: formData.get('sentence'),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors.sentence?.[0],
      };
    }

    const result = await translatePortugueseToLogic({ sentence: validatedFields.data.sentence });
    return { data: result.formula };
  } catch (e) {
    return { error: 'Ocorreu um erro ao processar a solicitação. Tente novamente.' };
  }
}

const cpcToNlSchema = z.object({
  formula: z.string().min(1, 'A fórmula não pode estar vazia.'),
});
export async function handleCpcToNl(prevState: any, formData: FormData) {
  try {
    const validatedFields = cpcToNlSchema.safeParse({
      formula: formData.get('formula'),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors.formula?.[0],
      };
    }

    const result = await translateLogicToPortuguese({ formula: validatedFields.data.formula });
    return { data: result.translation };
  } catch (e) {
    return { error: 'Ocorreu um erro ao processar a solicitação. Tente novamente.' };
  }
}

export async function handleSuggestPropositions() {
    'use server';
    try {
        const result = await suggestPropositionMeanings({ propositions: ['P', 'Q', 'R'] });
        return { data: result };
    } catch (e) {
        return { error: 'Não foi possível gerar sugestões. Tente novamente.' };
    }
}
