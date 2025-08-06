import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';
import UserProfile from '@/components/UserProfile';
import WellnessModule from '@/components/modules/WellnessModule';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<string>('dashboard');

  const handleLogin = (username: string) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleNavigateToModule = (module: string) => {
    setCurrentView(module);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Escuchar eventos de navegación del header
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setCurrentView(event.detail);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  // Si no hay usuario logueado, mostrar página de login
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Renderizar contenido según la vista actual
  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return <UserProfile onBack={handleBackToDashboard} currentUser={currentUser} />;
      case 'wellness':
        return <WellnessModule onBack={handleBackToDashboard} />;
      case 'wellness-meditation':
        return <WellnessModule onBack={handleBackToDashboard} initialTab="meditation" />;
      case 'wellness-mood':
        return <WellnessModule onBack={handleBackToDashboard} initialTab="mood" />;
      case 'wellness-sleep':
        return <WellnessModule onBack={handleBackToDashboard} initialTab="sleep" />;
      default:
        return <Dashboard onNavigateToModule={handleNavigateToModule} />;
    }
  };

  return (
    <Layout currentUser={currentUser} onLogout={handleLogout}>
      {renderCurrentView()}
    </Layout>
  );
};

export default Index;