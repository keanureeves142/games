import React, { ReactNode } from 'react';
import Header from './Header';
import { Edit2 } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [userName, setUserName] = React.useState('Guest');
  const [isEditingName, setIsEditingName] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer with Username */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4">
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
              className="border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2">
              <span>Hi, {userName}</span>
              <button onClick={() => setIsEditingName(true)}>
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Layout; 