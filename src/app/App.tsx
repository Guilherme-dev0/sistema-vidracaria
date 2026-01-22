import { useState } from "react";
import { LoginCard } from "@/app/components/LoginCard";
import { RegisterCard } from "@/app/components/RegisterCard";
import { FeedbackOverlay } from "@/app/components/FeedbackOverlay";
import { DashboardLayout } from "@/app/components/DashboardLayout";
import { DashboardContent } from "@/app/components/DashboardContent";
import { AlertasContent } from "@/app/components/AlertasContent";
import { RelatoriosContent } from "@/app/components/RelatoriosContent";
import { SaidaMaterialContent } from "@/app/components/SaidaMaterialContent";
import { UsuariosContent } from "@/app/components/UsuariosContent";
import { EntradaMaterialContent } from "@/app/components/EntradaMaterialContent";
import { ProdutosContent } from "@/app/components/ProdutosContent";
import { ConsultaEstoqueContent } from "@/app/components/ConsultaEstoqueContent";

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard'>('login');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  const handleRegisterClick = () => {
    setCurrentView('register');
  };

  const handleLoginClick = () => {
    setFeedbackMessage('ENTRANDO');
    // Simular login e redirecionar para dashboard
    setTimeout(() => {
      setFeedbackMessage(null);
      setCurrentView('dashboard');
    }, 1500);
  };

  const handleRegisterSubmit = () => {
    setFeedbackMessage('CADASTRO CONCLUÍDO');
    setTimeout(() => {
      setFeedbackMessage(null);
      setCurrentView('login');
    }, 1500);
  };

  const handleLogout = () => {
    setCurrentView('login');
    setActiveModule('dashboard');
  };

  const handleMenuChange = (menuId: string) => {
    setActiveModule(menuId);
  };

  const closeFeedback = () => {
    setFeedbackMessage(null);
    // Voltar para login após fechar o feedback de cadastro
    if (currentView === 'register') {
      setCurrentView('login');
    }
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardContent onNavigate={(target) => setActiveModule(target)} />;
      case 'alertas':
        return <AlertasContent />;
      case 'relatorios':
        return <RelatoriosContent />;
      case 'entrada':
        return <EntradaMaterialContent />;
      case 'produtos':
        return <ProdutosContent />;
      case 'saida':
        return <SaidaMaterialContent />;
      case 'usuarios':
        return <UsuariosContent />;
      case 'consulta':
        return <ConsultaEstoqueContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-[#F0F2F5]">
      {currentView === 'login' ? (
        <LoginCard 
          onRegisterClick={handleRegisterClick}
          onLoginClick={handleLoginClick}
        />
      ) : currentView === 'register' ? (
        <RegisterCard 
          onRegisterSubmit={handleRegisterSubmit}
          onGoToLogin={() => setCurrentView('login')}
        />
      ) : (
        <DashboardLayout onLogout={handleLogout} onMenuChange={handleMenuChange}>
          {renderModuleContent()}
        </DashboardLayout>
      )}
      
      {feedbackMessage && (
        <FeedbackOverlay 
          message={feedbackMessage}
          showOk={!(feedbackMessage === 'ENTRANDO' || feedbackMessage === 'CADASTRO CONCLUÍDO')}
          dismissible={feedbackMessage !== 'ENTRANDO'}
          onClose={closeFeedback}
        />
      )}
    </div>
  );
}
