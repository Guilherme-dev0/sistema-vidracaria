import { AlertTriangle, Package } from 'lucide-react';

interface AlertProduct {
  id: number;
  produto: string;
  categoria: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  diferenca: number;
}

const alertProducts: AlertProduct[] = [
  { id: 2, produto: 'Espelho 4mm', categoria: 'Espelhos', estoqueAtual: 12, estoqueMinimo: 15, diferenca: -3 },
  { id: 4, produto: 'Box de Banheiro', categoria: 'Acabamentos', estoqueAtual: 8, estoqueMinimo: 12, diferenca: -4 },
  { id: 7, produto: 'Vidro Fantasia', categoria: 'Vidros', estoqueAtual: 5, estoqueMinimo: 8, diferenca: -3 },
];

export function AlertasContent() {
  return (
    <div className="space-y-6">
      {/* Banner de Alerta */}
      {alertProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-[20px] p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-800 mb-1">
                Atenção: Produtos abaixo do estoque mínimo
              </h3>
              <p className="text-sm text-red-700">
                Existem {alertProducts.length} produto(s) que necessitam de reposição urgente para evitar rupturas de estoque.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Card de Alertas Críticos */}
      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Alertas Críticos de Estoque</h2>
          <p className="text-sm text-gray-500 mt-1">
            Produtos com estoque atual abaixo do nível mínimo recomendado
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {alertProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-xl hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-red-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{product.produto}</h4>
                    <p className="text-sm text-gray-500">{product.categoria}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Estoque Atual</p>
                    <p className="text-lg font-bold text-red-600">{product.estoqueAtual}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Estoque Mínimo</p>
                    <p className="text-lg font-bold text-gray-700">{product.estoqueMinimo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Diferença</p>
                    <p className="text-lg font-bold text-red-700">{product.diferenca}</p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                    Solicitar Reposição
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumo Estatístico */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-[20px] shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Total de Alertas</p>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">{alertProducts.length}</p>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Unidades em Falta</p>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-orange-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {Math.abs(alertProducts.reduce((sum, p) => sum + p.diferenca, 0))}
          </p>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Prioridade</p>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-red-600">!</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-red-600">Alta</p>
        </div>
      </div>
    </div>
  );
}
