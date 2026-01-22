# 🚀 Guia: Publicar Storybook no Chromatic e Integrar com Figma

## Passo 1: Criar Conta no Chromatic

1. Acesse: https://www.chromatic.com/
2. Clique em "Sign up for free"
3. Autentique com GitHub (recomendado)
4. Autorize o Chromatic

## Passo 2: Obter Token do Projeto

1. Após criar conta, você será direcionado ao dashboard
2. Clique em "Create a new project"
3. Selecione seu repositório GitHub (ou use URL)
4. Copie o **Project Token** exibido

## Passo 3: Publicar Storybook

Execute no terminal:

```bash
cd "C:\Users\Guilherme\Downloads\Login and Signup Modal Card (1)"
npx chromatic --project-token=YOUR_PROJECT_TOKEN_HERE
```

**Exemplo com token fictício:**
```bash
npx chromatic --project-token=chpt_1a2b3c4d5e6f7g8h9i
```

### O que acontece:
- ✅ Storybook é compilado
- ✅ Upload para Chromatic
- ✅ URL de acesso é gerada
- ✅ Histórico de versões mantido

## Passo 4: Acessar Storybook Publicado

Após executar, você receberá um link assim:
```
✓ Build 1 published to https://xxxxx.chromatic.com
```

**Compartilhe este link com a equipe de design!**

---

## 🎨 Integrar com Figma (Plugin Storybook)

### Opção A: Plugin Storybook (Recomendado)

1. **Abrir Figma**
   - Vá para seu arquivo/projeto

2. **Instalar Plugin**
   - Menu: "Plugins" → "Browse all plugins"
   - Procure: "Storybook"
   - Clique em "Install"

3. **Configurar URL**
   - Abra o plugin (Menu → Plugins → Storybook)
   - Cole a URL do Chromatic: `https://xxxxx.chromatic.com`
   - Clique em "Connect"

4. **Visualizar Componentes**
   - Lista de stories aparecerá
   - Arraste componentes para o canvas
   - Sincronize com código automaticamente

### Opção B: Embed em Página Colaborativa

1. Crie página no Figma chamada "Design System"
2. Clique em "+" → "Embed"
3. Cole URL do Chromatic Storybook
4. Todos podem ver na página

---

## 📊 Workflow Sugerido

### Para Desenvolvedores:
```bash
# 1. Desenvolver localmente
npm run dev

# 2. Testar componentes no Storybook
npm run storybook

# 3. Após commitar:
npx chromatic --project-token=YOUR_TOKEN

# 4. Novo link gerado automaticamente
```

### Para Designers:
```
1. Abrir Figma
2. Visualizar componentes atualizados no plugin Storybook
3. Sincronizar designs com código
4. Colaborar em real-time
```

---

## 🔄 Atualizar Storybook (Automático ou Manual)

### Manual (a cada mudança):
```bash
npx chromatic --project-token=YOUR_TOKEN
```

### Automático (via GitHub Actions):
Crie `.github/workflows/chromatic.yml`:

```yaml
name: Chromatic
on: [push]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx chromatic --project-token=${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

---

## 📱 URLs Úteis

- **Storybook Local**: http://localhost:6006
- **Chromatic Dashboard**: https://www.chromatic.com/builds
- **Figma Plugin**: https://www.figma.com/community/plugin/1337799895957424387/Storybook

---

## ✅ Checklist

- [ ] Conta criada no Chromatic
- [ ] Project Token obtido
- [ ] `npm install chromatic` executado
- [ ] Storybook publicado com `npx chromatic`
- [ ] URL do Chromatic copiada
- [ ] Plugin Storybook instalado no Figma
- [ ] URL configurada no plugin
- [ ] Componentes visíveis no Figma
- [ ] Compartilhado com equipe de design

---

## 🆘 Troubleshooting

### Erro: "Project token not found"
```bash
# Verifique se está usando o token correto
npx chromatic --project-token=YOUR_CORRECT_TOKEN
```

### Erro: "Build failed"
```bash
# Limpe cache e tente novamente
rm -rf node_modules/.cache
npm run build-storybook
npx chromatic --project-token=YOUR_TOKEN
```

### Plugin não conecta no Figma
- Verifique se URL está correta (sem `/` no final)
- Tente atualizar o plugin
- Reinicie Figma

---

**Pronto para compartilhar com a equipe!** 🎉
