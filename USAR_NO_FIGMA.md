# 🎨 Usando o Sistema no Figma

## ✅ Status Atual
- ✅ **Storybook rodando** em `http://localhost:6007`
- ✅ **Componentes documentados** com stories
- ✅ **Pronto para Figma** via Chromatic

---

## 📱 Opção 1: Storybook Local (Desenvolvimento)

### Passo 1: Iniciar Storybook
```bash
npm run storybook
```

### Passo 2: Acessar no Navegador
- URL: `http://localhost:6007`
- Verá todos os componentes documentados
- Pode testar interações em tempo real

### Passo 3: Visualizar Componentes
1. **LoginCard** - Tela de login
2. **RegisterCard** - Tela de cadastro
3. **EntradaMaterialContent** - Entrada de materiais
4. **SaidaMaterialContent** - Saída de materiais
5. **DashboardLayout** - Layout principal

---

## 🚀 Opção 2: Figma Design System (Recomendado para Equipes)

### Passo 1: Gerar URL Pública no Chromatic

#### A) Criar conta no Chromatic
1. Acesse: https://www.chromatic.com/
2. Clique em **"Sign in with GitHub"**
3. Autorize a conexão
4. Crie um novo projeto

#### B) Obter Token do Projeto
1. Após criar projeto, copie o **Project Token**
2. Guarde em local seguro

#### C) Publicar Storybook
```bash
npx chromatic --project-token=SEU_TOKEN_AQUI
```

**Resultado:**
```
✓ Build passed
✓ Chromatic URL: https://xxxx.chromatic.com
```

### Passo 2: Instalar Plugin no Figma

#### A) Abrir Figma
1. Abra Figma (web ou desktop)
2. Menu: **Plugins** → **Browse**
3. Pesquise: **"Storybook"**
4. Instale o plugin oficial

#### B) Configurar Plugin
1. Abra seu arquivo de design no Figma
2. **Plugins** → **Storybook**
3. Cole a URL do Chromatic:
   ```
   https://xxxx.chromatic.com
   ```
4. Pronto! Verá todos os componentes disponíveis

### Passo 3: Usar Componentes no Figma

1. **Procurar componentes** na sidebar do plugin
2. **Clicar** para inserir no canvas
3. **Editar** conforme necessário
4. **Sincronizar** mudanças com o código

---

## 📋 Guia Rápido: Qual Opção Usar?

| Cenário | Ferramenta | URL |
|---------|-----------|-----|
| **Desenvolvimento local** | Storybook | `http://localhost:6007` |
| **Prévia rápida** | Storybook | `http://localhost:6007` |
| **Compartilhar com time** | Chromatic | `https://xxxx.chromatic.com` |
| **Designer no Figma** | Plugin Storybook | URL do Chromatic |
| **Criar componentes** | Figma | URL do Chromatic |

---

## 🔄 Fluxo Completo

```
1. Desenvolvedor
   ↓
2. Escreve componente React
   ↓
3. Cria story (.stories.tsx)
   ↓
4. Testa em Storybook local
   ↓
5. Publica no Chromatic (npm chromatic)
   ↓
6. Designer abre no Figma
   ↓
7. Usa plugin Storybook
   ↓
8. Insere componentes no design
   ↓
9. Equipe vê design final
```

---

## 🎯 Componentes Disponíveis

### 📝 Autenticação
```
LoginCard
  ├─ Default (Estado inicial)
  └─ WithCallbacks (Com interações)

RegisterCard
  ├─ Default (Estado inicial)
  └─ FormValidation (Com validação)
```

### 📦 Gestão de Estoque
```
EntradaMaterialContent
  ├─ Default (Vazio)
  └─ WithData (Com dados de exemplo)

SaidaMaterialContent
  ├─ Default (Vazio)
  └─ WithMotivo (Com motivo selecionado)
```

### 🏗️ Layout
```
DashboardLayout
  ├─ Default (Layout vazio)
  └─ WithChildren (Com conteúdo)
```

---

## ⚙️ Troubleshooting

### "Porta 6006 já está em uso"
A porta padrão está ocupada. O Storybook usa automaticamente a **6007** ou próxima disponível.

### "Erro ao conectar ao Chromatic"
1. Verifique o token: `npx chromatic --list-projects`
2. Token expirado? Gere novo no dashboard
3. Internet conectada?

### "Plugin Figma não funciona"
1. Recarregue Figma (F5)
2. Reinstale o plugin
3. Certifique-se de usar a URL correta

### "Componentes não aparecem"
1. Verifique se `.stories.tsx` estão em `src/app/components/`
2. Padrão deve ser: `NomeDoComponente.stories.tsx`
3. Recompile: `npm run storybook`

---

## 📚 Recursos

| Recurso | Link |
|---------|------|
| **Storybook Docs** | https://storybook.js.org/ |
| **Chromatic** | https://www.chromatic.com/ |
| **Figma Plugin** | https://www.figma.com/community/plugin/1337799895957424387/Storybook |
| **Radix UI** | https://www.radix-ui.com/ |
| **Tailwind CSS** | https://tailwindcss.com/ |

---

## 💡 Pro Tips

### Tip 1: Compartilhar URL
Após publicar no Chromatic, compartilhe a URL com o time:
```
https://xxxx.chromatic.com
```

### Tip 2: Auto-Publicar (CI/CD)
Configure GitHub Actions para publicar automaticamente:
```yaml
name: Chromatic
on: [push]
jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx chromatic --project-token=${{ secrets.CHROMATIC_TOKEN }}
```

### Tip 3: Manter Sincronizado
Sempre que mudar um componente:
1. Atualize a story correspondente
2. Teste localmente: `npm run storybook`
3. Publique: `npx chromatic --project-token=TOKEN`
4. Figma atualiza automaticamente!

### Tip 4: Versionar Componentes
Use a pasta `guidelines/` para documentar:
- Padrões de design
- Regras de spacing
- Paleta de cores
- Tipografia

---

## 🎉 Começar Agora!

### Começar Imediatamente (Local)
```bash
npm run storybook
```
Abra: `http://localhost:6007`

### Compartilhar com Time (Chromatic)
```bash
npx chromatic --project-token=YOUR_TOKEN
```

### Usar no Figma
1. Instale plugin Storybook no Figma
2. Cole URL do Chromatic
3. Comece a usar componentes!

---

## 📊 Status do Projeto

| Item | Status |
|------|--------|
| Storybook instalado | ✅ |
| Componentes documentados | ✅ |
| Stories criadas | ✅ |
| Pronto para Chromatic | ✅ |
| Compatível com Figma | ✅ |

---

**Sucesso!** 🚀 Seu sistema está pronto para ser usado no Figma!
