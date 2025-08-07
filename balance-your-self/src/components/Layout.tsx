import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X, Home, User, Heart } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  currentUser?: string;
  onLogout?: () => void;
}

const Layout = ({ children, currentUser, onLogout }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleNavigation = (route: string) => {
    setActiveTab(route);
    window.dispatchEvent(new CustomEvent('navigate', { detail: route }));
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[#07B4BA] shadow-lg border-b border-border">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <img 
                src="/public/lovable-uploads/e4c15637-8aff-495d-8a19-a3a1f6c659fa-removebg-preview (2).png"
                alt="Salud en tus Manos"
                className="w-8 h-8 object-contain"
              />
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-white">
              Salud en tus Manos
            </h1>
          </div>

          {/* Desktop navigation con botones mejorados */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('dashboard')}
              className={`
                relative px-4 py-2 rounded-lg font-medium transition-all duration-200 
                ${activeTab === 'dashboard' 
                  ? 'bg-white/20 text-white shadow-md' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => handleNavigation('profile')}
              className={`
                relative px-4 py-2 rounded-lg font-medium transition-all duration-200 
                ${activeTab === 'profile' 
                  ? 'bg-white/20 text-white shadow-md' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <User className="w-4 h-4 mr-2" />
              Mi Perfil
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => handleNavigation('wellness')}
              className={`
                relative px-4 py-2 rounded-lg font-medium transition-all duration-200 
                ${activeTab === 'wellness' 
                  ? 'bg-white/20 text-white shadow-md' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Heart className="w-4 h-4 mr-2" />
              Bienestar
            </Button>
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                <span className="hidden md:block text-white text-sm">
                  ¡Hola, {currentUser}!
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-white hover:bg-white/10 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
                        
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/10 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile navigation con botones mejorados */}
        {sidebarOpen && (
          <div className="lg:hidden bg-[#07B4BA] border-t border-white/10">
            <nav className="px-4 py-4 space-y-2">
              <Button
                variant="ghost"
                onClick={() => handleNavigation('dashboard')}
                className={`
                  w-full justify-start rounded-lg font-medium transition-all duration-200
                  ${activeTab === 'dashboard' 
                    ? 'bg-white/20 text-white shadow-md' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <Home className="w-4 h-4 mr-3" />
                Inicio
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => handleNavigation('profile')}
                className={`
                  w-full justify-start rounded-lg font-medium transition-all duration-200
                  ${activeTab === 'profile' 
                    ? 'bg-white/20 text-white shadow-md' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <User className="w-4 h-4 mr-3" />
                Mi Perfil
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => handleNavigation('wellness')}
                className={`
                  w-full justify-start rounded-lg font-medium transition-all duration-200
                  ${activeTab === 'wellness' 
                    ? 'bg-white/20 text-white shadow-md' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <Heart className="w-4 h-4 mr-3" />
                Bienestar
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 lg:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;