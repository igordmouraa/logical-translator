import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LogicTranslator } from '@/components/logic-translator';
import { PropositionManager } from '@/components/proposition-manager';


export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="grid gap-8">
            <LogicTranslator />
            <PropositionManager />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
