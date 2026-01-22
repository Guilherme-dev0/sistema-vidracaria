import { 
  LayoutDashboard, 
  Package, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Search, 
  Bell, 
  FileText, 
  LogOut, 
  User,
  ChevronRight
} from 'lucide-react';
import { ReactNode, useState } from 'react';

interface DashboardLayoutProps {
  children?: ReactNode;
  onLogout?: () => void;
  onMenuChange?: (menuId: string) => void;
  activeModule?: string;
}

export function DashboardLayout({ children, onLogout, onMenuChange, activeModule }: DashboardLayoutProps) {
  const [localActiveMenu, setLocalActiveMenu] = useState('dashboard');
  // Usar activeModule da prop se fornecido, caso contrário usar estado local
  const activeMenu = activeModule || localActiveMenu;

  const handleMenuClick = (menuId: string) => {
    // Atualizar estado local se activeModule não for fornecido
    if (!activeModule) {
      setLocalActiveMenu(menuId);
    }
    onMenuChange?.(menuId);
  };

  const menuGroups = [
    {
      title: 'Operacional',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'produtos', label: 'Produtos', icon: Package },
        { id: 'entrada', label: 'Entrada de Material', icon: ArrowDownToLine },
        { id: 'saida', label: 'Saída de Material', icon: ArrowUpFromLine },
        { id: 'usuarios', label: 'Gestão de Usuários', icon: User },
      ]
    },
    {
      title: 'Inteligência',
      items: [
        { id: 'consulta', label: 'Consulta de Estoque', icon: Search },
        { id: 'alertas', label: 'Alertas', icon: Bell },
        { id: 'relatorios', label: 'Relatórios', icon: FileText }
      ]
    }
  ];

  // Get active menu label for breadcrumb
  const activeMenuItem = menuGroups.flatMap(g => g.items).find(item => item.id === activeMenu);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F2F5]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#4DD0E1] h-full fixed left-0 top-0 flex flex-col">
        {/* Logo/Brand */}
        <div className="px-6 py-6 border-b border-white/20">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
            <Package className="w-7 h-7 text-[#4DD0E1]" />
          </div>
          <h1 className="text-white text-lg font-bold">Vidraçaria System</h1>
          <p className="text-white/70 text-xs mt-1">Gestão de Estoque</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuGroups.map((group, groupIndex) => (
            <div key={group.title}>
              {/* Group Title */}
              <div className="px-6 py-2">
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                  {group.title}
                </span>
              </div>

              {/* Group Items */}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-6 py-3 text-left transition-all
                      ${isActive 
                        ? 'bg-white/20 text-white border-l-4 border-white' 
                        : 'text-white/90 hover:bg-white/10 border-l-4 border-transparent hover:border-white/30'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}

              {/* Separator between groups */}
              {groupIndex < menuGroups.length - 1 && (
                <div className="my-4 mx-6 border-t border-white/20"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-6 py-3 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[260px]">
        {/* Topbar */}
        <header className="h-16 bg-white fixed top-0 right-0 left-[260px] flex items-center justify-between px-8 shadow-sm z-10">
          {/* Left Side - Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Painel</span>
            {activeMenu !== 'dashboard' && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700 font-medium">
                  {activeMenuItem?.label}
                </span>
              </>
            )}
          </div>

          {/* Right Side - Search, Notifications, User */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Busca global indisponível"
                disabled
                className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1] transition-all"
              />
            </div>

            {/* Notifications */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => handleMenuClick('alertas')}
              title="Ver alertas de estoque"
            >
              <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Usuário</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <div className="w-9 h-9 bg-[#4DD0E1] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Canvas (Scrollable Content Area) */}
        <main className="flex-1 overflow-y-auto mt-16 p-8">
          {children || (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Bem-vindo ao Dashboard
              </h3>
              <p className="text-gray-600">
                Esta é a área principal onde os módulos do sistema serão carregados.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
