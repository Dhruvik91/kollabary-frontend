import React from 'react';

export default function ShareableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
          {children}
        </div>
      </main>
    </div>
  );
}
