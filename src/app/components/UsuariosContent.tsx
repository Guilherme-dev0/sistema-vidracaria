import { useMemo, useState } from 'react';
import { Search, User, Edit2, KeyRound, Power } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

type Perfil = 'Administrador' | 'Operador' | 'Visualização';
type Status = 'Ativo' | 'Inativo';

type Usuario = {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  status: Status;
  ultimoAcesso: string;
};

export function UsuariosContent() {
  const [query, setQuery] = useState('');
  const [perfilFiltro, setPerfilFiltro] = useState<'Todos' | Perfil>('Todos');
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 'u1', nome: 'Administrador', email: 'admin@empresa.com', perfil: 'Administrador', status: 'Ativo', ultimoAcesso: '2026-01-18 09:42' },
    { id: 'u2', nome: 'Maria Santos', email: 'maria.santos@empresa.com', perfil: 'Operador', status: 'Ativo', ultimoAcesso: '2026-01-20 14:05' },
    { id: 'u3', nome: 'João Pereira', email: 'joao.pereira@empresa.com', perfil: 'Visualização', status: 'Inativo', ultimoAcesso: '2025-12-04 10:12' },
    { id: 'u4', nome: 'Carlos Lima', email: 'carlos.lima@empresa.com', perfil: 'Operador', status: 'Ativo', ultimoAcesso: '2026-01-21 11:28' },
  ]);
  const loggedEmail = 'admin@empresa.com';

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [form, setForm] = useState<{ nome: string; email: string; perfil: Perfil; status: Status; senha?: string; confirmarSenha?: string }>({
    nome: '',
    email: '',
    perfil: 'Operador',
    status: 'Ativo',
    senha: '',
    confirmarSenha: '',
  });
  const isCreate = editing === null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return usuarios.filter(u => {
      const matchesQuery = q.length === 0 || u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesPerfil = perfilFiltro === 'Todos' ? true : u.perfil === perfilFiltro;
      return matchesQuery && matchesPerfil;
    });
  }, [query, perfilFiltro, usuarios]);

  const openCreate = () => {
    setEditing(null);
    setForm({ nome: '', email: '', perfil: 'Operador', status: 'Ativo', senha: '', confirmarSenha: '' });
    setModalOpen(true);
  };

  const openEdit = (u: Usuario) => {
    setEditing(u);
    setForm({ nome: u.nome, email: u.email, perfil: u.perfil, status: u.status });
    setModalOpen(true);
  };

  const salvarUsuario = () => {
    if (isCreate) {
      if (!form.nome || !form.email) return;
      if ((form.senha || '').length < 6) return;
      if (form.senha !== form.confirmarSenha) return;
      const novo: Usuario = {
        id: `${Date.now()}`,
        nome: form.nome,
        email: form.email,
        perfil: form.perfil,
        status: form.status,
        ultimoAcesso: '-',
      };
      setUsuarios(prev => [novo, ...prev]);
    } else if (editing) {
      setUsuarios(prev => prev.map(u => (u.id === editing.id ? { ...u, nome: form.nome, email: form.email, perfil: form.perfil, status: form.status } : u)));
    }
    setModalOpen(false);
  };

  const toggleStatus = (u: Usuario) => {
    if (u.email === loggedEmail) return;
    setUsuarios(prev => prev.map(x => (x.id === u.id ? { ...x, status: x.status === 'Ativo' ? 'Inativo' : 'Ativo' } : x)));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Gestão de Usuários</h2>
        <p className="text-sm text-gray-600">Controle de acesso e permissões do sistema</p>
      </div>

      <div className="bg-white rounded-[20px] shadow-sm p-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar usuário por nome ou email"
            className="pl-12 pr-4 h-11 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
          />
        </div>
        <select
          value={perfilFiltro}
          onChange={(e) => setPerfilFiltro(e.target.value as any)}
          className="h-11 border border-gray-200 rounded-lg px-3 bg-white text-sm"
        >
          <option>Todos</option>
          <option>Administrador</option>
          <option>Operador</option>
          <option>Visualização</option>
        </select>
        <button
          onClick={openCreate}
          className="ml-auto px-5 h-11 rounded-lg bg-[#4DD0E1] text-white font-semibold hover:bg-[#3FBFD1]"
        >
          Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Usuários</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Perfil</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Último Acesso</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-sm text-gray-800">{u.nome}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{u.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={
                        u.perfil === 'Administrador'
                          ? 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#4DD0E1]/10 text-[#4DD0E1]'
                          : u.perfil === 'Operador'
                          ? 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700'
                          : 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600'
                      }
                    >
                      {u.perfil}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={
                        u.status === 'Ativo'
                          ? 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'
                          : 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600'
                      }
                    >
                      {u.status}
                    </span>
                    {u.email === loggedEmail && u.status === 'Ativo' && (
                      <p className="text-xs text-gray-500 mt-1">Você não pode se desativar</p>
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{u.ultimoAcesso}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                        onClick={() => openEdit(u)}
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => toggleStatus(u)}
                        disabled={u.email === loggedEmail}
                        title={u.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                      >
                        <Power className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                        onClick={() => {}}
                        title="Resetar Senha"
                      >
                        <KeyRound className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-6 py-6 text-sm text-gray-500" colSpan={6}>
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/20" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[20px] shadow-lg w-[560px] p-6 outline-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#4DD0E1]/10 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-[#4DD0E1]" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  {isCreate ? 'Criar Usuário' : 'Editar Usuário'}
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-500">
                  {isCreate ? 'Preencha os campos para cadastrar um novo usuário' : 'Atualize os dados do usuário selecionado'}
                </Dialog.Description>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-700 mb-2">Nome Completo</label>
                <input
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Perfil</label>
                <select
                  value={form.perfil}
                  onChange={(e) => setForm({ ...form, perfil: e.target.value as Perfil })}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                >
                  <option>Administrador</option>
                  <option>Operador</option>
                  <option>Visualização</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                  className="h-11 w-full border border-gray-200 rounded-lg px-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                >
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
              </div>

              {isCreate && (
                <>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Senha</label>
                    <input
                      type="password"
                      value={form.senha}
                      onChange={(e) => setForm({ ...form, senha: e.target.value })}
                      className="h-11 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Confirmar Senha</label>
                    <input
                      type="password"
                      value={form.confirmarSenha}
                      onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })}
                      className="h-11 w-full border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 focus:border-[#4DD0E1]"
                    />
                  </div>
                  {form.senha && form.senha !== form.confirmarSenha && (
                    <p className="col-span-2 text-xs text-red-600">As senhas não coincidem</p>
                  )}
                </>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Dialog.Close asChild>
                <button className="px-4 h-11 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                onClick={salvarUsuario}
                className="px-6 h-11 rounded-lg bg-[#4DD0E1] text-white font-semibold hover:bg-[#3FBFD1]"
              >
                Salvar Usuário
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
