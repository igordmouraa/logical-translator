'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest meanings for propositions (P, Q, R).
 *
 * - suggestPropositionMeanings - A function that generates suggestions for proposition meanings.
 * - SuggestPropositionMeaningsInput - The input type for the suggestPropositionMeanings function.
 * - SuggestPropositionMeaningsOutput - The return type for the suggestPropositionMeanings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPropositionMeaningsInputSchema = z.object({
  propositions: z
    .array(
      z.string().regex(/^[PQR]$/).describe('A proposition represented by P, Q, or R.')
    )
    .describe('An array of propositions for which to generate meanings.'),
});
export type SuggestPropositionMeaningsInput = z.infer<
  typeof SuggestPropositionMeaningsInputSchema
>;

const SuggestPropositionMeaningsOutputSchema = z.record(z.string(), z.string()).describe(
  'A map of proposition (P, Q, or R) to its suggested meaning.'
);
export type SuggestPropositionMeaningsOutput = z.infer<
  typeof SuggestPropositionMeaningsOutputSchema
>;

export async function suggestPropositionMeanings(
  input: SuggestPropositionMeaningsInput
): Promise<SuggestPropositionMeaningsOutput> {
  return suggestPropositionMeaningsFlow(input);
}

const suggestPropositionMeaningsPrompt = ai.definePrompt({
  name: 'suggestPropositionMeaningsPrompt',
  input: {schema: SuggestPropositionMeaningsInputSchema},
  output: {schema: SuggestPropositionMeaningsOutputSchema},
  prompt: `You are an AI assistant specialized in suggesting meanings for propositional logic variables. 
Given the following propositions, generate a concise and relevant meaning for each.

{% each propositions %}Proposition {{this}} meaning suggestion:{% endeach %}`,
});

const suggestPropositionMeaningsFlow = ai.defineFlow(
  {
    name: 'suggestPropositionMeaningsFlow',
    inputSchema: SuggestPropositionMeaningsInputSchema,
    outputSchema: SuggestPropositionMeaningsOutputSchema,
  },
  async input => {
    const {output} = await suggestPropositionMeaningsPrompt(input);
    return output!;
  }
);
