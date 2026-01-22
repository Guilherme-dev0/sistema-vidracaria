# 🚀 Deploy no Vercel - Guia Completo

## ✅ Pré-requisitos

- ✅ Projeto no GitHub: https://github.com/Guilherme-dev0/sistema-vidracaria
- ✅ Código testado e funcional
- ✅ Todas as alterações commitadas (`git status` = clean)
- ✅ Node.js + npm instalados localmente
- ✅ Vite rodando sem erros em `http://localhost:5173`

---

## 📋 Checklist de Testes

### ✅ Teste 1: Login/Register
- [x] Página de login carrega
- [x] Página de registro funciona
- [x] Transições entre telas funcionam

### ✅ Teste 2: Dashboard Principal
- [x] Dashboard carrega com KPI cards
- [x] Alertas de estoque aparecem
- [x] Atalhos rápidos funcionam

### ✅ Teste 3: Navegação por Atalhos
- [x] Clique em "Produtos" → Menu destaca + Tela muda
- [x] Clique em "Entrada" → Menu destaca + Tela muda
- [x] Clique em "Saída" → Menu destaca + Tela muda
- [x] Clique em "Relatórios" → Menu destaca + Tela muda

### ✅ Teste 4: Navegação pelo Menu
- [x] Menu lateral responde a cliques
- [x] Ícones e labels aparecem corretamente
- [x] Destaque de item ativo funciona

### ✅ Teste 5: Consulta de Estoque
- [x] Barra de busca funciona
- [x] Tabela responde aos filtros
- [x] Status colorido aparece (Verde, Amarelo, Vermelho)
- [x] Mobile view (cards) funciona

### ✅ Teste 6: Storybook
- [x] `npm run storybook` funciona na porta 6007
- [x] Stories aparecem
- [x] Componentes interativos funcionam

### ✅ Teste 7: Responsividade
- [x] Layout desktop funciona
- [x] Layout tablet funciona
- [x] Layout mobile funciona
- [x] Menu não quebra em telas pequenas

---

## 🌐 Deployar no Vercel (Passo a Passo)

### Passo 1: Acessar o Vercel
1. Abra https://vercel.com
2. Clique em **"Sign in with GitHub"**
3. Autorize a conexão

### Passo 2: Criar Novo Projeto
1. Clique em **"New Project"**
2. Selecione o repositório: **`Guilherme-dev0/sistema-vidracaria`**
3. Vercel detectará automaticamente que é um projeto Vite

### Passo 3: Configurar Build
O Vercel deve detectar automaticamente:
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Se precisar ajustar:**
1. Build Command: `npm run build`
2. Output Directory: `dist`
3. Install Command: `npm install`
4. Environment Variables: (deixe em branco por enquanto)

### Passo 4: Deploy
1. Clique em **"Deploy"**
2. Vercel iniciará o build
3. Espere 2-3 minutos
4. ✅ Seu app estará online!

---

## 📱 URLs Geradas

Após o deploy, você terá URLs assim:

```
Production: https://sistema-vidracaria.vercel.app
Preview: https://sistema-vidracaria-[random].vercel.app
Git Branch: https://sistema-vidracaria-[branch].vercel.app
```

---

## 🔄 Próximas Alterações (Como Atualizar)

### Método 1: Automático (Recomendado)
Simplesmente faça `git push`:
```bash
cd "C:\Users\Guilherme\Downloads\Login and Signup Modal Card (1)"
git add .
git commit -m "Nova feature"
git push
```
✅ Vercel detecta automaticamente e faz deploy em segundos

### Método 2: Manual
1. Acesse https://vercel.com
2. Vá para seu projeto
3. Clique em **"Redeploy"**
4. Selecione o branch
5. Deploy

---

## 🔑 Variáveis de Ambiente

Se precisar de variáveis de ambiente (.env):
1. No Vercel: **Settings → Environment Variables**
2. Adicione as variáveis
3. Redeploy

Exemplo:
```
VITE_API_URL=https://api.example.com
VITE_ENV=production
```

---

## 🐛 Troubleshooting

### ❌ Build falha
**Erro comum:**
```
npm ERR! Cannot find module 'react'
```
**Solução:**
```bash
# Local
npm install
npm run build

# Depois push
git push
```

### ❌ Site branco após deploy
**Verificar:**
1. Abra DevTools (F12)
2. Veja Console para erros
3. Clique em "Deployments" no Vercel
4. Veja os logs

### ❌ Recursos CSS não carregando
**Solução:**
Adicione ao `vite.config.ts`:
```typescript
server: {
  middlewareMode: true,
}
```

---

## 📊 Status do Projeto

| Item | Status |
|------|--------|
| Código local | ✅ Funcionando |
| GitHub | ✅ Sincronizado |
| npm run dev | ✅ Rodando porta 5173 |
| npm run build | ✅ Pronto |
| Storybook | ✅ Rodando porta 6007 |
| Vercel | ⏳ Aguardando deploy |

---

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- LoginCard
- RegisterCard
- FeedbackOverlay

### ✅ Dashboard
- KPI Cards (Total, Valor, Alertas)
- Alertas de Estoque
- Atalhos Rápidos

### ✅ Gestão de Estoque
- Entrada de Material (multi-item)
- Saída de Material (multi-item)
- Consulta de Estoque (com busca)
- Produtos

### ✅ Inteligência
- Alertas
- Relatórios
- Consulta de Estoque

### ✅ Usuários
- Gestão de Usuários

### ✅ Navegação
- Menu Lateral Responsivo
- Sincronização Menu/Tela
- Breadcrumb Dinâmico
- Topbar com Notificações

---

## 📖 Documentação Disponível

1. **README.md** - Visão geral
2. **ATTRIBUTIONS.md** - Créditos e licenças
3. **STORYBOOK.md** - Como usar Storybook
4. **PUBLICAR_STORYBOOK.md** - Publicar no Chromatic
5. **USAR_NO_FIGMA.md** - Integração com Figma
6. **CORRIGINDO_ERROS.md** - Erros encontrados e soluções
7. **DASHBOARD_VS_CONSULTA.md** - Diferença entre módulos
8. **CORRIGINDO_NAVEGACAO.md** - Sincronização de navegação
9. **README_STORYBOOK.md** - Resumo do Storybook

---

## 🚀 Depois do Deploy

### 1. Compartilhar URL
Distribua a URL do Vercel para seu time!

### 2. Configurar Domínio Customizado (Opcional)
1. Vercel → Settings → Domains
2. Adicione seu domínio
3. Configure DNS

### 3. Monitorar Performance
1. Vercel → Analytics
2. Veja carregamento, visitors, etc

### 4. Configurar CI/CD Avançado (Opcional)
1. Vercel → Settings → Git
2. Configure branch staging/production

---

## 💡 Pro Tips

### Tip 1: Preview Antes de Merge
Clique no link de preview de uma Pull Request no GitHub para testar antes de fazer merge.

### Tip 2: Revert Rápido
Se algo der errado:
1. Vercel → Deployments
2. Clique nos 3 pontinhos do deployment anterior
3. "Promote to Production"

### Tip 3: Logs em Tempo Real
```bash
# Instalar Vercel CLI (opcional)
npm install -g vercel

# Ver logs
vercel logs [seu-projeto]
```

### Tip 4: Variáveis Sensíveis
Nunca commit `.env` files. Use:
- Variables no Vercel
- Ou crie `.env.local` (adicionado ao .gitignore)

---

## 📞 Próximas Ações

1. [ ] Deploy no Vercel (Este guia)
2. [ ] Testar app online
3. [ ] Compartilhar URL com equipe
4. [ ] Publicar Storybook no Chromatic
5. [ ] Integrar com Figma
6. [ ] Conectar banco de dados (fase 2)
7. [ ] Adicionar autenticação real (fase 2)

---

## ✨ Checklist Final Antes do Deploy

- [x] Código testado localmente
- [x] Sem erros de console
- [x] Sem warnings de React
- [x] Responsivo em desktop, tablet, mobile
- [x] Navegação funciona
- [x] Buscas funcionam
- [x] Atalhos sincronizam menu
- [x] Tudo commitado no Git
- [x] GitHub sincronizado
- [x] Documentação completa
- [ ] Deploy no Vercel (próximo passo)

---

**Pronto para subir para o Vercel!** 🎉

Acesse https://vercel.com e comece o deployment!
