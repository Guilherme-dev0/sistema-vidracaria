import { Package, DollarSign, AlertTriangle } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
}

function KPICard({ title, value, icon, iconBgColor }: KPICardProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-sm p-6 flex items-center gap-4">
      <div className={`w-14 h-14 ${iconBgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

interface Product {
  id: number;
  produto: string;
  categoria: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  status: 'ok' | 'alerta';
}

const mockProducts: Product[] = [
  { id: 1, produto: 'Vidro Temperado 8mm', categoria: 'Vidros', estoqueAtual: 45, estoqueMinimo: 20, status: 'ok' },
  { id: 2, produto: 'Espelho 4mm', categoria: 'Espelhos', estoqueAtual: 12, estoqueMinimo: 15, status: 'alerta' },
  { id: 3, produto: 'Vidro Laminado 10mm', categoria: 'Vidros', estoqueAtual: 28, estoqueMinimo: 10, status: 'ok' },
  { id: 4, produto: 'Box de Banheiro', categoria: 'Acabamentos', estoqueAtual: 8, estoqueMinimo: 12, status: 'alerta' },
  { id: 5, produto: 'Silicone Estrutural', categoria: 'Insumos', estoqueAtual: 65, estoqueMinimo: 30, status: 'ok' },
  { id: 6, produto: 'Perfil de Alumínio', categoria: 'Estruturas', estoqueAtual: 120, estoqueMinimo: 50, status: 'ok' },
  { id: 7, produto: 'Vidro Fantasia', categoria: 'Vidros', estoqueAtual: 5, estoqueMinimo: 8, status: 'alerta' },
  { id: 8, produto: 'Ferragens Inox', categoria: 'Acabamentos', estoqueAtual: 42, estoqueMinimo: 25, status: 'ok' },
];

type Props = {
  onNavigate?: (target: string) => void;
};

export function DashboardContent({ onNavigate }: Props) {
  const totalItens = mockProducts.reduce((sum, p) => sum + p.estoqueAtual, 0);
  const valorTotal = (totalItens * 150.50).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const itensAbaixoMinimo = mockProducts.filter(p => p.status === 'alerta').length;

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <KPICard
          title="Total de Itens em Estoque"
          value={totalItens}
          icon={<Package className="w-7 h-7 text-[#4DD0E1]" strokeWidth={1.5} />}
          iconBgColor="bg-[#4DD0E1]/10"
        />
        <KPICard
          title="Valor Total em Estoque"
          value={`R$ ${valorTotal}`}
          icon={<DollarSign className="w-7 h-7 text-green-600" strokeWidth={1.5} />}
          iconBgColor="bg-green-100"
        />
        <KPICard
          title="Itens Abaixo do Estoque Mínimo"
          value={itensAbaixoMinimo}
          icon={<AlertTriangle className="w-7 h-7 text-red-600" strokeWidth={1.5} />}
          iconBgColor="bg-red-100"
        />
      </div>

      {/* Alertas de Estoque */}
      <div className="bg-white rounded-[20px] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Alertas de Estoque</h2>
          <span className="text-sm text-gray-500">Itens abaixo do mínimo</span>
        </div>
        <div className="divide-y divide-gray-100">
          {mockProducts.filter(p => p.status === 'alerta').length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum alerta no momento</p>
          ) : (
            mockProducts
              .filter(p => p.status === 'alerta')
              .map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.produto}</p>
                    <p className="text-xs text-gray-500">Categoria: {p.categoria}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-red-600 font-semibold">
                      {p.estoqueAtual} / {p.estoqueMinimo}
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Crítico
                    </span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Links Rápidos */}
      <div className="grid grid-cols-4 gap-6">
        <button
          onClick={() => onNavigate?.('produtos')}
          className="bg-white rounded-[20px] shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm text-gray-500">Atalho</p>
          <p className="text-lg font-bold text-gray-800">Produtos</p>
        </button>
        <button
          onClick={() => onNavigate?.('entrada')}
          className="bg-white rounded-[20px] shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm text-gray-500">Atalho</p>
          <p className="text-lg font-bold text-gray-800">Entrada de Material</p>
        </button>
        <button
          onClick={() => onNavigate?.('saida')}
          className="bg-white rounded-[20px] shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm text-gray-500">Atalho</p>
          <p className="text-lg font-bold text-gray-800">Saída de Material</p>
        </button>
        <button
          onClick={() => onNavigate?.('relatorios')}
          className="bg-white rounded-[20px] shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm text-gray-500">Atalho</p>
          <p className="text-lg font-bold text-gray-800">Relatórios</p>
        </button>
      </div>
    </div>
  );
}
