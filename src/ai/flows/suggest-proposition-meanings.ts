'use server';

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

// const SuggestPropositionMeaningsOutputSchema = z.object(z.string(), z.string()).describe(
//   'A map of proposition (P, Q, or R) to its suggested meaning.'
// );

const SuggestPropositionMeaningsOutputSchema = z.object({
    P: z.string().describe('Suggested meaning for proposition P.'),
    Q: z.string().describe('Suggested meaning for proposition Q.'),
    R: z.string().describe('Suggested meaning for proposition R.'),
}).describe('An object containing suggested meanings for propositions P, Q, and R.');
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
