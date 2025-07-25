import React from 'react';
import { EnvelopeIcon, HeartIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto relative border-t">
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="space-y-3 relative md:after:absolute md:after:right-0 md:after:top-0 md:after:h-full md:after:w-px md:after:bg-border">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed pr-8">
              A curated list of upcoming machine learning conferences to help researchers track important deadlines.
            </p>
          </div>
          
          <div className="space-y-3 relative md:after:absolute md:after:right-0 md:after:top-0 md:after:h-full md:after:w-px md:after:bg-border">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Contact</h3>
            <a 
              href="mailto:vilhelm.toivonen@helsinki.fi"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <EnvelopeIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
              vilhelm.toivonen@helsinki.fi
            </a>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Contribute</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-accent transition-all hover:scale-105"
                onClick={() => window.open('https://github.com/vimeto/venues-app', '_blank')}
              >
                <CodeBracketIcon className="h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-accent transition-all hover:scale-105"
                onClick={() => window.open('https://github.com/vimeto/venues-app/issues/new', '_blank')}
              >
                <HeartIcon className="h-4 w-4" />
                Report Issue
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} ML Venues. Built with{' '}
            <span className="bg-linear-to-r from-primary to-violet-600 bg-clip-text text-transparent font-semibold">♥</span> for the ML research community.
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
};