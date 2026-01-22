import { useMemo, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';

type Produto = {
  id: string;
  nome: string;
  categoria: string;
  estoqueAtual: number;
  estoqueMinimo: number;
};

type Fornecedor = {
  id: string;
  nome: string;
};

type ItemSaida = {
  id: string;
  produto: Produto | null;
  quantidade: number;
};

type HistoricoItem = {
  id: string;
  fornecedor: string;
  produto: string;
  quantidade: number;
  data: string;
  responsavel: string;
};

const produtosBase: Produto[] = [
  { id: 'p1', nome: 'Vidro Temperado 8mm', categoria: 'Vidros', estoqueAtual: 120, estoqueMinimo: 40 },
  { id: 'p2', nome: 'Ferragem Dobradiça Inox', categoria: 'Ferragens', estoqueAtual: 260, estoqueMinimo: 80 },
  { id: 'p3', nome: 'Perfil Alumínio U 2m', categoria: 'Alumínios', estoqueAtual: 80, estoqueMinimo: 30 },
  { id: 'p4', nome: 'Vedação Borracha 10m', categoria: 'Insumos', estoqueAtual: 200, estoqueMinimo: 50 },
];

const fornecedoresBase: Fornecedor[] = [
  { id: 'f1', nome: 'Vidros Brasil LTDA' },
  { id: 'f2', nome: 'Ferragens Premium' },
  { id: 'f3', nome: 'Alumínios do Sul' },
  { id: 'f4', nome: 'Insumos Gerais' },
  { id: 'f5', nome: 'Cliente Padrão' },
];

export function SaidaMaterialContent() {
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<Fornecedor | null>(null);
  const [queryFornecedor, setQueryFornecedor] = useState('');
  const [mostraFornecedores, setMostraFornecedores] = useState(false);

  const [itens, setItens] = useState<ItemSaida[]>([]);
  const [motivoSaida, setMotivoSaida] = useState<string>('Venda');
  const [observacoes, setObservacoes] = useState<string>('');
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);

  // Estado para campos de busca de produtos por item
  const [queryPorItem, setQueryPorItem] = useState<Record<string, string>>({});
  const [mostraApenasItem, setMostraApenasItem] = useState<string | null>(null);

  const sugestoesFornecedor = useMemo(() => {
    const q = queryFornecedor.trim().toLowerCase();
    return q.length === 0
      ? fornecedoresBase
      : fornecedoresBase.filter(f => f.nome.toLowerCase().includes(q));
  }, [queryFornecedor]);

  const sugestoesProduto = (query: string) => {
    const q = query.trim().toLowerCase();
    return q.length === 0
      ? []
      : produtosBase.filter(p => p.nome.toLowerCase().includes(q));
  };

  const adicionarItem = () => {
    const novoId = `item-${Date.now()}`;
    setItens(prev => [...prev, { id: novoId, produto: null, quantidade: 0 }]);
    setQueryPorItem(prev => ({ ...prev, [novoId]: '' }));
  };

  const atualizarItem = (id: string, produto: Produto | null, quantidade: number) => {
    setItens(prev =>
      prev.map(item =>
        item.id === id ? { ...item, produto, quantidade } : item
      )
    );
  };

  const removerItem = (id: string) => {
    setItens(prev => prev.filter(item => item.id !== id));
    const novaQuery = { ...queryPorItem };
    delete novaQuery[id];
    setQueryPorItem(novaQuery);
  };

  const podeConfirmar =
    !!fornecedorSelecionado && 
    itens.length > 0 && 
    itens.every(item => 
      item.produto && 
      item.quantidade > 0 && 
      item.quantidade <= item.produto.estoqueAtual
    ) &&
    motivoSaida.length > 0;

  const confirmarSaida = () => {
    if (!podeConfirmar || !fornecedorSelecionado) return;

    const novoHistorico = itens.map(item => ({
      id: `${Date.now()}-${item.id}`,
      fornecedor: fornecedorSelecionado.nome,
      produto: item.produto?.nome || '',
      quantidade: item.quantidade,
      data: new Date().toLocaleDateString(),
      responsavel: 'Operador',
    }));

    setHistorico(prev => [...novoHistorico, ...prev].slice(0, 15));
    
    // Atualizar estoque dos produtos
    const novosProdutos = produtosBase.map(p => {
      const totalSaida = itens
        .filter(item => item.produto?.id === p.id)
        .reduce((sum, item) => sum + item.quantidade, 0);
      
      if (totalSaida > 0) {
        p.estoqueAtual = Math.max(0, p.estoqueAtual - totalSaida);
      }
      return p;
    });

    limparCampos();
  };

  const limparCampos = () => {
    setFornecedorSelecionado(null);
    setQueryFornecedor('');
    setMostraFornecedores(false);
    setItens([]);
    setQueryPorItem({});
    setMostraApenasItem(null);
    setMotivoSaida('Venda');
    setObservacoes('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Saída de Material</h2>
        <p className="text-sm text-gray-600">Registrar saída e consumo de materiais do estoque</p>
      </div>

      {/* Dados Gerais da Saída */}
      <div className="bg-white rounded-[20px] shadow-sm p-6 max-w-3xl mx-auto w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados Gerais da Saída</h3>
        <div className="grid grid-cols-1 gap-4">
          {/* Fornecedor / Cliente */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Fornecedor / Cliente</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Selecione o fornecedor ou cliente"
                value={fornecedorSelecionado?.nome || queryFornecedor}
                onChange={(e) => setQueryFornecedor(e.target.value)}
                onFocus={() => setMostraFornecedores(true)}
                className="h-12 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
              />
              {mostraFornecedores && (
                <div className="absolute top-full left-0 right-0 mt-2 border border-gray-200 rounded-lg bg-white shadow-lg max-h-44 overflow-y-auto z-10">
                  {sugestoesFornecedor.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">Sem resultados</div>
                  ) : (
                    sugestoesFornecedor.map((f) => (
                      <button
                        key={f.id}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                        onClick={() => {
                          setFornecedorSelecionado(f);
                          setQueryFornecedor(f.nome);
                          setMostraFornecedores(false);
                        }}
                      >
                        <p className="text-sm text-gray-800">{f.nome}</p>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Motivo da Saída */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Motivo da Saída</label>
            <select
              value={motivoSaida}
              onChange={(e) => setMotivoSaida(e.target.value)}
              className="h-12 w-full border border-gray-200 rounded-lg px-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
            >
              <option>Venda</option>
              <option>Uso Interno</option>
              <option>Perda / Quebra</option>
              <option>Ajuste</option>
              <option>Devolução</option>
            </select>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Observações</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
              placeholder="Opcional"
            />
          </div>
        </div>
      </div>

      {/* Lista de Itens */}
      <div className="bg-white rounded-[20px] shadow-sm p-6 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Itens da Saída</h3>
          <span className="text-sm text-gray-500">{itens.length} item(ns)</span>
        </div>

        <div className="space-y-4">
          {itens.map((item, index) => {
            const queryAtual = queryPorItem[item.id] || '';
            const sugestoesAtual = sugestoesProduto(queryAtual);
            const mostraDropdown = mostraApenasItem === item.id && queryAtual.length > 0;
            const excedeEstoque = item.produto && item.quantidade > item.produto.estoqueAtual;
            const estoqueFinal = item.produto ? Math.max(0, item.produto.estoqueAtual - item.quantidade) : 0;
            const abaixoMinimo = item.produto ? estoqueFinal < item.produto.estoqueMinimo : false;

            return (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Item #{index + 1}</span>
                  <button
                    onClick={() => removerItem(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-12 gap-3">
                  {/* Produto - Coluna larga */}
                  <div className="col-span-6">
                    <label className="block text-xs text-gray-600 mb-1">Produto</label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar produto"
                        value={item.produto?.nome || queryAtual}
                        onChange={(e) => setQueryPorItem(prev => ({ ...prev, [item.id]: e.target.value }))}
                        onFocus={() => setMostraApenasItem(item.id)}
                        className="pl-10 pr-3 h-10 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                      />
                      {mostraDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-lg max-h-36 overflow-y-auto z-10">
                          {sugestoesAtual.length === 0 ? (
                            <div className="px-3 py-2 text-xs text-gray-500">Sem resultados</div>
                          ) : (
                            sugestoesAtual.map((p) => (
                              <button
                                key={p.id}
                                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                                onClick={() => {
                                  atualizarItem(item.id, p, item.quantidade);
                                  setQueryPorItem(prev => ({ ...prev, [item.id]: p.nome }));
                                  setMostraApenasItem(null);
                                }}
                              >
                                <p className="text-xs text-gray-800">{p.nome}</p>
                                <p className="text-xs text-gray-500">{p.categoria}</p>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantidade */}
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-600 mb-1">Quantidade de Saída</label>
                    <input
                      type="number"
                      min={0}
                      value={item.quantidade}
                      onChange={(e) => atualizarItem(item.id, item.produto, Number(e.target.value))}
                      className="h-10 w-full border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                    />
                    {excedeEstoque && (
                      <div className="mt-1 text-xs text-red-600 font-medium">
                        Quantidade maior que o estoque
                      </div>
                    )}
                  </div>

                  {/* Estoque Atual - Readonly */}
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-600 mb-1">Estoque Atual</label>
                    <input
                      type="number"
                      readOnly
                      value={item.produto?.estoqueAtual || 0}
                      className="h-10 w-full border border-gray-200 rounded-lg px-3 bg-gray-50 text-gray-700 text-sm"
                    />
                  </div>

                  {/* Estoque Final */}
                  <div className="col-span-12">
                    <label className="block text-xs text-gray-600 mb-1">Estoque Após Saída</label>
                    <div className={`h-10 w-full border rounded-lg px-3 flex items-center font-semibold text-sm ${
                      abaixoMinimo 
                        ? 'border-red-300 bg-red-50 text-red-700' 
                        : 'border-[#4DD0E1]/30 bg-[#4DD0E1]/5 text-[#4DD0E1]'
                    }`}>
                      {estoqueFinal}
                      {abaixoMinimo && <span className="text-xs ml-2">(Abaixo do mínimo)</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Botão Adicionar Item */}
          <button
            onClick={adicionarItem}
            className="w-full h-10 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-[#4DD0E1] hover:text-[#4DD0E1] transition-colors"
          >
            + Adicionar Item
          </button>
        </div>

        {/* Botões de Ação */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={limparCampos}
            className="px-4 h-11 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={confirmarSaida}
            disabled={!podeConfirmar}
            className="px-6 h-11 rounded-lg bg-[#4DD0E1] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3FBFD1]"
          >
            Confirmar Saída
          </button>
        </div>
      </div>

      {/* Histórico de Saídas - MANTIDO E APRIMORADO */}
      <div className="bg-white rounded-[20px] shadow-sm p-6 max-w-3xl mx-auto w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimas Saídas</h3>
        <div className="max-h-64 overflow-y-auto border border-gray-100 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm text-gray-600 font-medium">Fornecedor / Cliente</th>
                <th className="px-4 py-3 text-sm text-gray-600 font-medium">Produto</th>
                <th className="px-4 py-3 text-sm text-gray-600 font-medium">Quantidade</th>
                <th className="px-4 py-3 text-sm text-gray-600 font-medium">Data</th>
                <th className="px-4 py-3 text-sm text-gray-600 font-medium">Responsável</th>
              </tr>
            </thead>
            <tbody>
              {historico.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-gray-500" colSpan={5}>
                    Sem registros recentes
                  </td>
                </tr>
              ) : (
                historico.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-800">{item.fornecedor}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{item.produto}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 font-semibold">{item.quantidade}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.data}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.responsavel}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
