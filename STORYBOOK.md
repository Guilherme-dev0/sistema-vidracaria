# 📚 Storybook - Sistema de Design Vidraçaria

Storybook foi implementado para documentar e compartilhar componentes com a equipe de design.

## 🚀 Como Usar

### Iniciar Storybook
```bash
npm run storybook
```
Acesse: `http://localhost:6006`

### Compilar para Produção
```bash
npm run build-storybook
```

## 📁 Estrutura de Stories

```
src/app/components/
├── LoginCard.stories.tsx
├── RegisterCard.stories.tsx
├── EntradaMaterialContent.stories.tsx
├── SaidaMaterialContent.stories.tsx
└── DashboardLayout.stories.tsx
```

## 🎨 Stories Disponíveis

### Auth Components
- **LoginCard**: Tela de login
- **RegisterCard**: Tela de cadastro

### Stock Management
- **EntradaMaterialContent**: Entrada de materiais
- **SaidaMaterialContent**: Saída de materiais

### Layout
- **DashboardLayout**: Layout do dashboard

## 🔗 Integração com Figma

### Opção 1: Usar Plugin Storybook (Recomendado)
1. Abra Figma
2. Vá para "Plugins" → "Browse all plugins"
3. Procure por "Storybook"
4. Instale e configure com a URL do Storybook publicado

### Opção 2: Publicar no Chromatic
```bash
npm install --save-dev chromatic
npx chromatic --project-token=YOUR_TOKEN
```

### Opção 3: Deploy Manual
1. Compile: `npm run build-storybook`
2. Deploy na plataforma (Vercel, Netlify, GitHub Pages)
3. Compartilhe o link com a equipe de design

## 📊 Componentes Documentados

### LoginCard
- Campos: E-mail, Senha
- Ações: Entrar, Cadastrar
- Estados: Default, Com erros

### RegisterCard
- Campos: Nome, E-mail, Senha
- Validação: E-mail e campos obrigatórios
- Ações: Cadastrar, Voltar

### EntradaMaterialContent
- Fornecedor/Cliente
- Múltiplos itens
- Cálculo automático de estoque
- Histórico

### SaidaMaterialContent
- Fornecedor/Cliente
- Motivo da saída
- Validação de estoque mínimo
- Histórico

### DashboardLayout
- Sidebar com menu
- Topbar com notificações
- Área de conteúdo

## 🎯 Próximos Passos

1. ✅ Executar `npm run storybook`
2. ✅ Validar stories no navegador
3. ✅ Publicar no Chromatic ou Vercel
4. ✅ Compartilhar link com design no Figma
5. ✅ Sincronizar componentes no Figma

## 📝 Notas

- Todas as histórias incluem documentação automática (autodocs)
- Stories estão organizadas por categoria
- Cada story inclui diferentes variantes
- Componentes reutilizáveis do Radix UI

---

**Pronto para colaborar com a equipe de design!** 🎨
