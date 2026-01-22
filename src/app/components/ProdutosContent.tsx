import React, { useMemo, useState } from 'react';
import { Edit2, Power } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

type Status = 'Ativo' | 'Inativo';

type Produto = {
  id: string;
  nome: string;
  categoria: string;
  unidade: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  status: Status;
  observacoes?: string;
};

const base: Produto[] = [
  { id: 'p1', nome: 'Vidro Temperado 8mm', categoria: 'Vidros', unidade: 'm²', estoqueAtual: 120, estoqueMinimo: 20, status: 'Ativo' },
  { id: 'p2', nome: 'Ferragem Dobradiça Inox', categoria: 'Ferragens', unidade: 'unidade', estoqueAtual: 260, estoqueMinimo: 50, status: 'Ativo' },
  { id: 'p3', nome: 'Perfil Alumínio U 2m', categoria: 'Alumínios', unidade: 'barra', estoqueAtual: 80, estoqueMinimo: 30, status: 'Ativo' },
  { id: 'p4', nome: 'Vedação Borracha 10m', categoria: 'Insumos', unidade: 'metro', estoqueAtual: 200, estoqueMinimo: 40, status: 'Ativo' },
  { id: 'p5', nome: 'Espelho 4mm', categoria: 'Espelhos', unidade: 'm²', estoqueAtual: 35, estoqueMinimo: 15, status: 'Inativo' },
];

export function ProdutosContent() {
  const [query, setQuery] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>(base);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Produto | null>(null);
  const [form, setForm] = useState<Omit<Produto, 'id' | 'estoqueAtual'>>({
    nome: '',
    categoria: '',
    unidade: '',
    estoqueMinimo: 0,
    status: 'Ativo',
    observacoes: '',
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q.length === 0
      ? produtos
      : produtos.filter(p =>
          p.nome.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)
        );
  }, [query, produtos]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      nome: '',
      categoria: '',
      unidade: '',
      estoqueMinimo: 0,
      status: 'Ativo',
      observacoes: '',
    });
    setModalOpen(true);
  };

  const openEdit = (p: Produto) => {
    setEditing(p);
    setForm({
      nome: p.nome,
      categoria: p.categoria,
      unidade: p.unidade,
      estoqueMinimo: p.estoqueMinimo,
      status: p.status,
      observacoes: p.observacoes ?? '',
    });
    setModalOpen(true);
  };

  const toggleStatus = (p: Produto) => {
    setProdutos(prev =>
      prev.map(item =>
        item.id === p.id
          ? { ...item, status: item.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : item
      )
    );
  };

  const save = () => {
    if (!form.nome || !form.categoria || !form.unidade) return;
    if (editing) {
      setProdutos(prev =>
        prev.map(item =>
          item.id === editing.id
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      const novo: Produto = {
        id: `${Date.now()}`,
        nome: form.nome,
        categoria: form.categoria,
        unidade: form.unidade,
        estoqueAtual: 0,
        estoqueMinimo: form.estoqueMinimo,
        status: form.status,
        observacoes: form.observacoes,
      };
      setProdutos(prev => [novo, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Produtos</h2>
        <p className="text-sm text-gray-600">Cadastro e manutenção dos produtos do sistema</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Buscar produto por nome ou categoria"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 w-full border border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
        />
        <button
          onClick={openCreate}
          className="px-5 h-11 rounded-lg bg-[#4DD0E1] text-white font-semibold hover:bg-[#3FBFD1]"
        >
          Novo Produto
        </button>
      </div>

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Lista de Produtos</h3>
          <p className="text-sm text-gray-500">CRUD de cadastro sem operações de estoque</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unidade</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estoque Atual</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estoque Mínimo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-sm text-gray-500" colSpan={7}>Nenhum produto encontrado</td>
                </tr>
              ) : (
                filtered.map((p, index) => (
                  <tr
                    key={p.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 1 ? 'bg-[#F5F5F5]' : 'bg-white'}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{p.nome}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.categoria}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.unidade}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{p.estoqueAtual}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{p.estoqueMinimo}</td>
                    <td className="px-6 py-4">
                      {p.status === 'Ativo' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#4DD0E1]/10 text-[#4DD0E1]">Ativo</span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Inativo</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => openEdit(p)}
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => toggleStatus(p)}
                        >
                          <Power className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[20px] shadow-lg w-[560px] p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{editing ? 'Editar Produto' : 'Novo Produto'}</h3>
              <p className="text-sm text-gray-500">Preencha os dados cadastrais do produto</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm text-gray-700 mb-1 block">Nome do Produto</label>
                <input
                  value={form.nome}
                  onChange={(e) => setForm(s => ({ ...s, nome: e.target.value }))}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Categoria</label>
                <input
                  value={form.categoria}
                  onChange={(e) => setForm(s => ({ ...s, categoria: e.target.value }))}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Unidade de Medida</label>
                <input
                  value={form.unidade}
                  onChange={(e) => setForm(s => ({ ...s, unidade: e.target.value }))}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Estoque Mínimo</label>
                <input
                  type="number"
                  value={form.estoqueMinimo}
                  onChange={(e) => setForm(s => ({ ...s, estoqueMinimo: Number(e.target.value) }))}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm(s => ({ ...s, status: e.target.value as Status }))}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                >
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-700 mb-1 block">Observações</label>
                <textarea
                  value={form.observacoes}
                  onChange={(e) => setForm(s => ({ ...s, observacoes: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <Dialog.Close asChild>
                <button className="px-5 h-11 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancelar</button>
              </Dialog.Close>
              <button
                onClick={save}
                className="px-6 h-11 rounded-lg bg-[#4DD0E1] text-white font-semibold hover:bg-[#3FBFD1]"
              >
                Salvar Produto
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
