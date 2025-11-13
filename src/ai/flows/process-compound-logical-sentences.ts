'use server';
/**
 * @fileOverview Converts and translates compound logical sentences, including those with negation.
 *
 * - processCompoundLogicalSentences - A function that handles the conversion and translation process.
 * - ProcessCompoundLogicalSentencesInput - The input type for the processCompoundLogicalSentences function.
 * - ProcessCompoundLogicalSentencesOutput - The return type for the processCompoundLogicalSentences function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessCompoundLogicalSentencesInputSchema = z.object({
  sentence: z
    .string()
    .describe(
      'The compound logical sentence in Portuguese to be converted and translated.'
    ),
});
export type ProcessCompoundLogicalSentencesInput = z.infer<
  typeof ProcessCompoundLogicalSentencesInputSchema
>;

const ProcessCompoundLogicalSentencesOutputSchema = z.object({
  propositionalLogicFormula: z
    .string()
    .describe('The equivalent formula in Propositional Logic.'),
  englishTranslation: z
    .string()
    .describe('The translation of the formula into English.'),
});
export type ProcessCompoundLogicalSentencesOutput = z.infer<
  typeof ProcessCompoundLogicalSentencesOutputSchema
>;

export async function processCompoundLogicalSentences(
  input: ProcessCompoundLogicalSentencesInput
): Promise<ProcessCompoundLogicalSentencesOutput> {
  return processCompoundLogicalSentencesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processCompoundLogicalSentencesPrompt',
  input: {schema: ProcessCompoundLogicalSentencesInputSchema},
  output: {schema: ProcessCompoundLogicalSentencesOutputSchema},
  prompt: `You are an expert in translating Portuguese sentences into Propositional Logic and then translating the Propositional Logic into English.

Convert the following Portuguese sentence into Propositional Logic, using the following symbols:

*   ∧ (and)
*   ∨ (or)
*   ¬ (not)
*   → (implies)
*   ↔ (if and only if)

After converting to Propositional Logic, translate the Propositional Logic into English.

Sentence: {{{sentence}}}
`,
});

const processCompoundLogicalSentencesFlow = ai.defineFlow(
  {
    name: 'processCompoundLogicalSentencesFlow',
    inputSchema: ProcessCompoundLogicalSentencesInputSchema,
    outputSchema: ProcessCompoundLogicalSentencesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
