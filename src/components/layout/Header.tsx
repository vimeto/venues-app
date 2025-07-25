import React from 'react';
import { SunIcon, MoonIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../contexts/AppContext';
import { Button } from '../ui/button';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      {/* Glass morphism container */}
      <div className="relative rounded-2xl glass glass-border glass-shadow overflow-hidden">
        <div className="relative container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 bg-primary/20 blur-2xl animate-pulse" />
                <AcademicCapIcon className="relative h-8 w-8 text-primary animate-fade-in" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  <span className="bg-linear-to-r from-primary via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    ML Venues
                  </span>
                </h1>
                <p className="mt-0.5 text-sm md:text-base text-muted-foreground/80">
                  Track upcoming machine learning conferences
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2 hover:bg-white/10 dark:hover:bg-white/5 border border-white/10 backdrop-blur-xs transition-all hover:scale-105"
                onClick={() => window.open('https://github.com/vimeto/venues-app', '_blank')}
              >
                <CodeBracketIcon className="h-4 w-4" />
                <span className="font-medium">Contribute</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="hover:bg-white/10 dark:hover:bg-white/5 border border-white/10 backdrop-blur-xs transition-all hover:scale-105 hover:rotate-12"
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
