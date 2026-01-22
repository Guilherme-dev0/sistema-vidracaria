# 📚 Glossário de Termos - Sistema de Gestão de Vidraçaria

## Visão Geral
Este glossário define os termos técnicos e operacionais utilizados no Sistema de Gestão de Vidraçaria (SGV), com foco em conceitos específicos do ramo de vidraçaria e operações de estoque.

---

## 📋 Tabela de Termos

### **PRODUTOS E MATERIAIS**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Vidro Temperado** | Vidro submetido a tratamento térmico que aumenta sua resistência e segurança; ao quebrar, fragmenta-se em pequenos pedaços. | Utilizado em portas, janelas e divisórias. Encontrado em `ProdutosContent.tsx` com especificação "8mm". |
| **Vidro Laminado** | Vidro composto por duas ou mais camadas unidas por uma película de polivinil, mantendo coesão quando quebrado. | Aplicado em fachadas e áreas de segurança. Registrado como "Vidro Laminado 10mm" no sistema. |
| **Espelho** | Superfície de vidro com revestimento reflexivo, utilizado em acabamentos e decoração. | Categoria "Espelhos" com várias espessuras (4mm, 6mm, etc.). Gerenciado no módulo de Produtos. |
| **Vidro Fantasia** | Vidro decorativo com padrões, texturas ou cores especiais para fins estéticos. | Aplicações em divisórias decorativas, painel de vidro artisticamente trabalhado. |
| **Ferragem** | Componentes metálicos complementares (puxadores, dobradiças, fechaduras, parafusos) para instalação de vidraçaria. | Exemplo: "Ferragem Dobradiça Inox". Gerenciada na categoria "Ferragens". |
| **Perfil de Alumínio** | Estrutura/moldura de alumínio utilizada para enquadrar e fixar vidros. | Exemplo: "Perfil Alumínio U 2m". Unidade de medida: barra ou metro. |
| **Vedação/Borracha** | Material elastômero usado para vedação, isolamento térmico e acústico em vidraçarias. | Exemplo: "Vedação Borracha 10m". Presente na categoria "Insumos". |
| **Silicone Estrutural** | Selante/adesivo de polisiloxano de alta resistência para junções estruturais permanentes. | "Silicone Estrutural 280ml" utilizado em fixações críticas. |
| **Insumo** | Matéria-prima ou componente auxiliar (cola, silicone, selante, vedação) necessário para a produção/instalação. | Categoria que agrupa produtos como silicone, borracha e acessórios gerais. |
| **Box de Banheiro** | Conjunto completo de vidro temperado ou laminado com estrutura, rodas e puxadores para boxes de chuveiro. | Produto acabado; categoria "Acabamentos". |

---

### **GESTÃO DE ESTOQUE**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Estoque Atual (Qtd Atual)** | Quantidade real de um produto disponível no inventário em um momento específico. | Exibido em `ConsultaEstoqueContent.tsx` e `DashboardContent.tsx`. Exemplo: Vidro Temperado = 45 unidades. |
| **Estoque Mínimo** | Quantidade limite estabelecida para um produto; quando atingida, dispara alerta para reposição. | No sistema: "Vidro Temperado" com mínimo de 20 unidades. Calculado em `AlertasContent.tsx`. |
| **Estoque Crítico** | Estado de alerta quando estoque atual é inferior a 50% do estoque mínimo ou cai abaixo da quantidade de segurança. | Status exibido como 🔴 "Crítico" em vermelho na Consulta de Estoque. |
| **Estoque Baixo** | Estado intermediário quando estoque atual é inferior ao mínimo, mas ainda acima da criticidade. | Status exibido como 🟡 "Baixo" em amarelo. |
| **Estoque em Ordem** | Quando estoque atual está acima ou igual ao estoque mínimo estabelecido. | Status exibido como 🟢 "Em Estoque" em verde. |
| **Movimentação de Estoque** | Registro de entrada ou saída de material no inventário. | Realizada através de "Entrada de Material" ou "Saída de Material". |
| **Entrada de Material** | Processo de recebimento e registro de novos produtos no estoque, geralmente proveniente de fornecedor. | Módulo `EntradaMaterialContent.tsx`: seleção de fornecedor + adição de itens multi-item. |
| **Saída de Material** | Processo de retirada e registro de produtos do estoque por venda, consumo ou perda. | Módulo `SaidaMaterialContent.tsx`: seleção de cliente/motivo + adição de itens. |
| **Motivo da Saída** | Classificação do tipo de saída: Venda, Uso Interno, Perda/Quebra, Ajuste, Devolução. | Dropdown no formulário de Saída de Material. |
| **Movimentação Física** | Transação real de entrada/saída que afeta o número de unidades no estoque. | Cada item adicionado na Entrada/Saída reduz/aumenta o estoque atual. |
| **Histórico de Movimentações** | Registro temporal de todas as entradas e saídas com data, responsável, quantidade e fornecedor/cliente. | Exibido em tabela em `EntradaMaterialContent.tsx` e `SaidaMaterialContent.tsx`. |
| **Responsável** | Usuário ou operador que realizou a movimentação de estoque. | Campo obrigatório em registros de Entrada/Saída para rastreabilidade. |
| **Data de Movimentação** | Timestamp do registro quando a transação foi realizada. | Armazenado em formato de string (ex: "21/01/2026"). |

---

### **RELACIONAMENTOS COMERCIAIS**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Fornecedor** | Pessoa jurídica ou pessoa física que fornece produtos/materiais para a vidraçaria. | Exemplo: "Vidros Brasil LTDA", "Ferragens Premium", "Alumínios do Sul". |
| **Cliente** | Entidade (pessoa ou empresa) que adquire produtos e serviços da vidraçaria. | No contexto de Saída de Material, pode ser um cliente ou internamente "Cliente Padrão". |
| **Categoria de Produto** | Classificação taxonômica para agrupar produtos por tipo. | Vidros, Espelhos, Ferragens, Alumínios, Insumos, Acabamentos. |
| **Unidade de Medida** | Padrão de quantificação de um produto. | m² (metro quadrado para vidros), barra, metro, unidade, metro linear. |
| **Preço Unitário** | Valor monetário de uma unidade do produto. | Exemplo: Vidro Temperado = R$ 150,50 por m². Registrado em `ConsultaEstoqueContent.tsx`. |
| **Valor Total em Estoque** | Cálculo: somatório de (Quantidade × Preço Unitário) para todos os produtos. | Exibido no KPI do Dashboard: "Valor Total em Estoque: R$ 62.457,50". |

---

### **OPERAÇÕES E PROCESSOS**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Alerta de Estoque** | Notificação automática gerada quando um produto cai abaixo do estoque mínimo. | Módulo `AlertasContent.tsx`: lista produtos em nível crítico com recomendação de reposição. |
| **Alerta Crítico** | Notificação de prioridade máxima quando estoque está criticamente baixo, com risco de ruptura. | Exibido com ícone 🔴 e cor vermelha; prioridade máxima no banner de alertas. |
| **Ruptura de Estoque** | Situação em que a quantidade disponível é zero e não há possibilidade de atender demandas. | Prevenção: sistema impede saída quando quantidade solicitada > disponível. |
| **Reposição** | Processo de adquirir novo material para restaurar estoque acima do mínimo estabelecido. | Acionada manualmente após consulta de alertas ou análise do Dashboard. |
| **Consulta de Estoque** | Consulta rápida de status de produtos com filtro por nome ou categoria. | Módulo `ConsultaEstoqueContent.tsx`: busca em tempo real + tabela com 5 colunas. |
| **Dashboard Executivo** | Painel de controle que exibe KPIs principais (total itens, valor, alertas) e atalhos para módulos. | `DashboardContent.tsx`: 3 KPI cards + alertas + 4 atalhos rápidos. |
| **KPI (Key Performance Indicator)** | Indicador de desempenho: Total de Itens, Valor em Estoque, Itens Críticos. | Exibidos em cards coloridos no Dashboard Principal. |

---

### **CARACTERÍSTICAS TÉCNICAS DOS PRODUTOS**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Espessura (mm)** | Medida de profundidade/altura do vidro, crítica para resistência e aplicação. | Vidro Temperado 8mm, Espelho 4mm, Vidro Laminado 10mm. |
| **Tratamento Térmico** | Processo que aumenta propriedades mecânicas do vidro (temperagem). | Característica de produtos como "Vidro Temperado". |
| **Composição (m²)** | Dimensão em metros quadrados, usada para quantificar vidros em folhas. | Unidade padrão para vidros: Vidro Temperado medido em m². |
| **Acabamento** | Categoria de produtos semi-acabados ou acabados (ex: box completo). | "Box de Banheiro Completo" como exemplo de produto acabado. |
| **Inoxidável (Inox)** | Material resistente à corrosão, geralmente aço inoxidável. | "Ferragem Dobradiça Inox", "Ferragens Inox 304". |

---

### **USUÁRIOS E PERMISSÕES**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Usuário** | Pessoa que acessa e utiliza o sistema. | Roles: Administrador, Gerente, Operador de Estoque. |
| **Administrador** | Usuário com permissão total no sistema (criar, editar, deletar, gerenciar usuários). | Acesso a "Gestão de Usuários" no menu lateral. |
| **Operador de Estoque** | Usuário responsável por registrar entradas/saídas e consultas de estoque. | Acesso a "Entrada de Material", "Saída de Material", "Consulta de Estoque". |
| **Gerente/Gestor** | Usuário com visão executiva (Dashboard, Relatórios, Alertas). | Acesso a Dashboard, Alertas, Relatórios, Consulta. |
| **Autenticação** | Processo de validação de credenciais (usuário + senha). | Telas LoginCard.tsx e RegisterCard.tsx. |
| **Sessão** | Período durante o qual um usuário está logado no sistema. | Mantida por FeedbackOverlay na transição login→dashboard. |

---

### **RELATÓRIOS E ANÁLISES**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Relatório** | Documento consolidado com dados de vendas, estoque, movimentações ou alertas. | Módulo `RelatoriosContent.tsx`: informações analíticas sobre operações. |
| **Histórico** | Registro cronológico de movimentações com data, hora, responsável, quantidade. | Tabelas em Entrada/Saída exibem histórico completo de transações. |
| **Filtro** | Critério de busca para refinar resultados (por nome, categoria, status). | "Consulta de Estoque" permite filtro em tempo real por material/categoria. |
| **Status de Produto** | Classificação operacional: Ativo, Inativo, Descontinuado. | Campo em `ProdutosContent.tsx`: toggle entre "Ativo"/"Inativo". |

---

### **SISTEMA E INTERFACE**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Dashboard** | Painel principal com visão consolidada de KPIs e atalhos. | Primeira tela após login; centraliza informações críticas. |
| **Sidebar** | Menu lateral de navegação com grupos: Operacional e Inteligência. | Grupos: Operacional (Dashboard, Produtos, Entrada, Saída, Usuários) e Inteligência (Consulta, Alertas, Relatórios). |
| **Topbar** | Barra superior com busca global, notificações e perfil do usuário. | Permite navegação rápida e acesso a alertas. |
| **Atalho Rápido** | Botão direto para módulo específico, resolvendo navegação linear. | Dashboard exibe 4 atalhos: Produtos, Entrada, Saída, Relatórios. |
| **Breadcrumb** | Trilha de navegação mostrando localização atual (ex: Painel > Entrada). | Exibido na Topbar após seleção de módulo. |
| **Modal/Diálogo** | Janela sobreposta para entrada de dados ou confirmações. | Usado em cadastro de produtos e edições em `ProdutosContent.tsx`. |
| **Campo Obrigatório** | Input/seleção que deve ser preenchido antes de submissão. | Fornecedor em Entrada, Motivo em Saída, Nome em Produtos. |
| **Validação** | Verificação de regras (ex: não permitir saída > estoque disponível). | Sistema valida quantidade na Saída antes de confirmar. |
| **Feedback** | Mensagem de confirmação ou erro ao usuário. | `FeedbackOverlay.tsx`: "ENTRANDO", "CADASTRO CONCLUÍDO", etc. |

---

### **ANÁLISES E MÉTRICAS**

| Termo | Definição | Exemplo/Contexto |
|-------|-----------|------------------|
| **Total de Itens em Estoque** | Somatório de quantidades de todos os produtos. | KPI do Dashboard: 415 itens. |
| **Diferença de Estoque** | Cálculo: Estoque Atual − Estoque Mínimo (pode ser negativa). | No AlertasContent, diferença de -3 ou -4 indica criticidade. |
| **Margem de Segurança** | Percentual de estoque acima do mínimo; quanto maior, melhor. | Se mínimo = 20 e atual = 40, margem = 100%. |
| **Taxa de Reposição** | Frequência com que um produto precisa ser reposto (diária, semanal, etc.). | Calculável a partir do histórico de movimentações. |
| **Análise ABC** | Classificação por valor de importância: A (alto valor), B (médio), C (baixo). | Pode ser aplicado a produtos de alto valor como vidros laminados. |

---

## 🔍 Exemplos de Uso por Módulo

### **Entrada de Material**
- **Termos principais**: Fornecedor, Produto, Quantidade, Estoque Atual, Histórico de Movimentações
- **Fluxo**: Selecionar Fornecedor → Adicionar Itens (Produto + Qtd) → Confirmar → Atualiza Estoque → Registra Histórico

### **Saída de Material**
- **Termos principais**: Cliente, Produto, Quantidade, Motivo da Saída, Validação de Estoque
- **Fluxo**: Selecionar Cliente → Adicionar Itens → Escolher Motivo → Validar (Qtd ≤ Disponível) → Confirmar → Atualiza Estoque

### **Consulta de Estoque**
- **Termos principais**: Material, Categoria, Qtd Atual, Preço Unitário, Status (Em Estoque/Baixo/Crítico)
- **Fluxo**: Buscar por Nome/Categoria → Tabela atualiza em tempo real → Visualizar Status colorido

### **Dashboard**
- **Termos principais**: KPI, Valor em Estoque, Itens Críticos, Alertas
- **Fluxo**: Exibe resumo de saúde do estoque + atalhos para operações

---

## 📊 Diagrama de Entidades

```
┌─────────────────────────────────────────────┐
│         SISTEMA VIDRAÇARIA                  │
├─────────────────────────────────────────────┤
│                                             │
│  PRODUTO                                    │
│  ├─ ID, Nome, Categoria                     │
│  ├─ Unidade de Medida                       │
│  ├─ Estoque Atual                           │
│  ├─ Estoque Mínimo                          │
│  └─ Preço Unitário                          │
│                                             │
│  MOVIMENTO (Entrada/Saída)                  │
│  ├─ Fornecedor/Cliente                      │
│  ├─ Itens (Produto + Qtd)                   │
│  ├─ Data de Movimentação                    │
│  ├─ Responsável                             │
│  └─ Motivo (para Saída)                     │
│                                             │
│  ALERTA                                     │
│  ├─ Produto em Criticidade                  │
│  ├─ Estoque Atual vs Mínimo                 │
│  └─ Status (Crítico/Baixo/OK)               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎯 Categorias de Produtos Padrão

1. **Vidros**: Temperado, Laminado, Fantasia, comum
2. **Espelhos**: Espelho liso, com tratamento
3. **Ferragens**: Dobradiças, puxadores, fechaduras, parafusos
4. **Alumínios**: Perfis, molduras, estruturas
5. **Insumos**: Silicone, borracha, cola, selante
6. **Acabamentos**: Box completo, moldura, etc.

---

## 📌 Notas Importantes

- **Unidades Multi-padrão**: O sistema suporta diferentes unidades (m², barra, metro, unidade) conforme o tipo de produto
- **Validações Críticas**: Sistema impede saída > estoque disponível e alerta antes de atingir criticidade
- **Rastreabilidade**: Cada movimento registra data, responsável e quantidade para conformidade
- **Status Automático**: Status (Em Estoque/Baixo/Crítico) é calculado automaticamente comparando Qtd Atual vs Mínimo

---

## 📖 Versão

**Glossário v1.0**  
Data: 21 de janeiro de 2026  
Domínio: Gestão de Vidraçaria  
Status: Documentação Base Completa
