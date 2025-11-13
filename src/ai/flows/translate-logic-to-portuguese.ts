'use server';
/**
 * @fileOverview Translates a formula in Classical Propositional Logic into a sentence in Portuguese.
 *
 * - translateLogicToPortuguese - A function that translates a logical formula to Portuguese.
 * - TranslateLogicToPortugueseInput - The input type for the translateLogicToPortuguese function.
 * - TranslateLogicToPortugueseOutput - The return type for the translateLogicToPortuguese function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateLogicToPortugueseInputSchema = z.object({
  formula: z
    .string()
    .describe(
      'A formula in Classical Propositional Logic using symbols like ∧, ∨, ¬, →, ↔.'
    ),
});
export type TranslateLogicToPortugueseInput = z.infer<typeof TranslateLogicToPortugueseInputSchema>;

const TranslateLogicToPortugueseOutputSchema = z.object({
  translation: z
    .string()
    .describe('The translation of the input formula into a Portuguese sentence.'),
});
export type TranslateLogicToPortugueseOutput = z.infer<typeof TranslateLogicToPortugueseOutputSchema>;

export async function translateLogicToPortuguese(
  input: TranslateLogicToPortugueseInput
): Promise<TranslateLogicToPortugueseOutput> {
  return translateLogicToPortugueseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateLogicToPortuguesePrompt',
  input: {schema: TranslateLogicToPortugueseInputSchema},
  output: {schema: TranslateLogicToPortugueseOutputSchema},
  prompt: `Translate the following formula in Classical Propositional Logic into a natural and understandable sentence in Portuguese:

Formula: {{{formula}}}

Translation:`, // The output schema description should guide the model, no need to include it in the prompt itself.
});

const translateLogicToPortugueseFlow = ai.defineFlow(
  {
    name: 'translateLogicToPortugueseFlow',
    inputSchema: TranslateLogicToPortugueseInputSchema,
    outputSchema: TranslateLogicToPortugueseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
