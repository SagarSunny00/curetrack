
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function PageLayout({ children, className, noPadding = false }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={cn(
        "flex-grow pt-20",
        !noPadding && "py-8 md:py-12",
        className
      )}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
