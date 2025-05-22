import { ReactNode } from 'react';
import { ModeToggle } from '@/components/theme/mode-toggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-lg">Metronome</span>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        {children}
      </main>
      <footer className="border-t border-border/40 px-4 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with React, TypeScript, and shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;