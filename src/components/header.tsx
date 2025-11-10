import { LogoIcon } from '@/components/icons/logo-icon';

export function Header() {
  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <LogoIcon className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Lógica IA Web
        </h1>
      </div>
    </header>
  );
}
