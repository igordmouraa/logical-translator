import { config } from 'dotenv';
config();

import '@/ai/flows/translate-logic-to-portuguese.ts';
import '@/ai/flows/suggest-proposition-meanings.ts';
import '@/ai/flows/translate-portuguese-to-logic.ts';
import '@/ai/flows/process-compound-logical-sentences.ts';