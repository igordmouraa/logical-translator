'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslatePortugueseToLogicInputSchema = z.object({
  sentence: z
    .string()
    .describe('The Portuguese sentence to translate into propositional logic.'),
});
export type TranslatePortugueseToLogicInput = z.infer<
  typeof TranslatePortugueseToLogicInputSchema
>;

const TranslatePortugueseToLogicOutputSchema = z.object({
  formula: z
    .string()
    .describe('The propositional logic formula equivalent to the input sentence.'),
});
export type TranslatePortugueseToLogicOutput = z.infer<
  typeof TranslatePortugueseToLogicOutputSchema
>;

export async function translatePortugueseToLogic(
  input: TranslatePortugueseToLogicInput
): Promise<TranslatePortugueseToLogicOutput> {
  return translatePortugueseToLogicFlow(input);
}

const translatePortugueseToLogicPrompt = ai.definePrompt({
  name: 'translatePortugueseToLogicPrompt',
  input: {schema: TranslatePortugueseToLogicInputSchema},
  output: {schema: TranslatePortugueseToLogicOutputSchema},
  prompt: `You are an expert in Classical Propositional Logic.

  Your task is to translate the given Portuguese sentence into a valid formula in Classical Propositional Logic, using the following symbols:

  - Conjunction (AND): ∧
  - Disjunction (OR): ∨
  - Negation (NOT): ¬
  - Implication (IF THEN): →
  - Equivalence (IF AND ONLY IF): ↔

  Ensure that the generated formula accurately represents the meaning of the sentence.

  Sentence: {{{sentence}}}
  `,
});

const translatePortugueseToLogicFlow = ai.defineFlow(
  {
    name: 'translatePortugueseToLogicFlow',
    inputSchema: TranslatePortugueseToLogicInputSchema,
    outputSchema: TranslatePortugueseToLogicOutputSchema,
  },
  async input => {
    const {output} = await translatePortugueseToLogicPrompt(input);
    return output!;
  }
);
