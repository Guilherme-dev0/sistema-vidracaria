import { Search, TrendingDown, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Produto {
  id: number;
  material: string;
  categoria: string;
  qtdAtual: number;
  precoUnitario: number;
  estoqueMinimo: number;
  status: 'em-estoque' | 'baixo' | 'critico';
}

const mockProdutos: Produto[] = [
  {
    id: 1,
    material: 'Vidro Temperado 8mm',
    categoria: 'Vidros',
    qtdAtual: 45,
    precoUnitario: 150.50,
    estoqueMinimo: 20,
    status: 'em-estoque',
  },
  {
    id: 2,
    material: 'Espelho 4mm',
    categoria: 'Espelhos',
    qtdAtual: 12,
    precoUnitario: 85.00,
    estoqueMinimo: 15,
    status: 'critico',
  },
  {
    id: 3,
    material: 'Vidro Laminado 10mm',
    categoria: 'Vidros',
    qtdAtual: 28,
    precoUnitario: 220.00,
    estoqueMinimo: 10,
    status: 'em-estoque',
  },
  {
    id: 4,
    material: 'Box de Banheiro Completo',
    categoria: 'Acabamentos',
    qtdAtual: 8,
    precoUnitario: 450.00,
    estoqueMinimo: 12,
    status: 'critico',
  },
  {
    id: 5,
    material: 'Silicone Estrutural 280ml',
    categoria: 'Insumos',
    qtdAtual: 65,
    precoUnitario: 35.90,
    estoqueMinimo: 30,
    status: 'em-estoque',
  },
  {
    id: 6,
    material: 'Perfil de Alumínio 2"x1"',
    categoria: 'Estruturas',
    qtdAtual: 120,
    precoUnitario: 42.50,
    estoqueMinimo: 50,
    status: 'em-estoque',
  },
  {
    id: 7,
    material: 'Vidro Fantasia 6mm',
    categoria: 'Vidros Especiais',
    qtdAtual: 5,
    precoUnitario: 195.00,
    estoqueMinimo: 8,
    status: 'critico',
  },
  {
    id: 8,
    material: 'Ferragens Inox 304',
    categoria: 'Acabamentos',
    qtdAtual: 42,
    precoUnitario: 125.50,
    estoqueMinimo: 25,
    status: 'em-estoque',
  },
  {
    id: 9,
    material: 'Borracha de Vedação',
    categoria: 'Insumos',
    qtdAtual: 18,
    precoUnitario: 28.90,
    estoqueMinimo: 20,
    status: 'baixo',
  },
  {
    id: 10,
    material: 'Vidro Fum 8mm',
    categoria: 'Vidros',
    qtdAtual: 33,
    precoUnitario: 165.00,
    estoqueMinimo: 15,
    status: 'em-estoque',
  },
];

function StatusBadge({ status }: { status: Produto['status'] }) {
  const statusConfig = {
    'em-estoque': {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      label: 'Em Estoque',
    },
    'baixo': {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      label: 'Baixo',
    },
    'critico': {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      label: 'Crítico',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
    >
      {status === 'critico' && <AlertCircle className="w-3 h-3 mr-1" />}
      {status === 'baixo' && <TrendingDown className="w-3 h-3 mr-1" />}
      {config.label}
    </span>
  );
}

export function ConsultaEstoqueContent() {
  const [searchTerm, setSearchTerm] = useState('');

  const produtosFiltrados = useMemo(() => {
    if (!searchTerm.trim()) return mockProdutos;

    return mockProdutos.filter((produto) =>
      produto.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalProdutos = produtosFiltrados.length;
  const criticos = produtosFiltrados.filter((p) => p.status === 'critico').length;
  const baixos = produtosFiltrados.filter((p) => p.status === 'baixo').length;

  return (
    <div className="space-y-6">
      {/* Header com Busca */}
      <div className="bg-white rounded-[20px] shadow-sm p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Consulta de Estoque</h1>
          <p className="text-sm text-gray-500">Busque e localize materiais no inventário</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Digite o nome do material ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1] transition-all"
          />
        </div>

        {/* Filter Summary */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-6 text-sm">
          <div>
            <span className="text-gray-500">Total encontrado: </span>
            <span className="font-semibold text-gray-800">{totalProdutos}</span>
          </div>
          {criticos > 0 && (
            <div>
              <span className="text-gray-500">Crítico: </span>
              <span className="font-semibold text-red-600">{criticos}</span>
            </div>
          )}
          {baixos > 0 && (
            <div>
              <span className="text-gray-500">Baixo: </span>
              <span className="font-semibold text-yellow-600">{baixos}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabela de Produtos */}
      {produtosFiltrados.length === 0 ? (
        <div className="bg-white rounded-[20px] shadow-sm p-12 text-center">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Nenhum material encontrado</p>
          <p className="text-sm text-gray-400">Tente ajustar os termos da busca</p>
        </div>
      ) : (
        <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Material
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Qtd Atual
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Preço Unit.
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {produtosFiltrados.map((produto) => (
                  <tr
                    key={produto.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      produto.status === 'critico' ? 'bg-red-50/30' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800">{produto.material}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{produto.categoria}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm font-semibold text-gray-800">{produto.qtdAtual}</p>
                      <p className="text-xs text-gray-500">Mín: {produto.estoqueMinimo}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-medium text-gray-800">
                        R$ {produto.precoUnitario.toFixed(2)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={produto.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View - Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className={`p-4 ${produto.status === 'critico' ? 'bg-red-50/30' : ''}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{produto.material}</p>
                    <p className="text-xs text-gray-500">{produto.categoria}</p>
                  </div>
                  <StatusBadge status={produto.status} />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Quantidade</p>
                    <p className="font-semibold text-gray-800">{produto.qtdAtual}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Preço Unit.</p>
                    <p className="font-semibold text-gray-800">
                      R$ {produto.precoUnitario.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Mínimo</p>
                    <p className="font-semibold text-gray-800">{produto.estoqueMinimo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Stats */}
      {produtosFiltrados.length > 0 && (
        <div className="bg-gradient-to-r from-[#4DD0E1]/5 to-[#4DD0E1]/10 rounded-[20px] p-6 border border-[#4DD0E1]/20">
          <p className="text-sm text-gray-600">
            Exibindo <span className="font-semibold text-gray-800">{produtosFiltrados.length}</span> de{' '}
            <span className="font-semibold text-gray-800">{mockProdutos.length}</span> materiais
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>
      )}
    </div>
  );
}
