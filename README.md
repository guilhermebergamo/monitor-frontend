# Monitor Frontend

Aplicação frontend para monitoramento de dados usando React + Vite + TypeScript, integrada com Azure Static Web Apps e Azure Container Apps.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS
- **Azure Static Web Apps** - Hospedagem
- **Azure Container Apps** - API Backend

## � Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Azure
- Conta no GitHub

## 🛠️ Instalação Local

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/monitor-frontend.git
cd monitor-frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env.development

# Ajustar a URL da API no .env.development
# VITE_API_URL=http://localhost:5063

# Rodar em desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

## ☁️ Deploy Automático no Azure

### Arquitetura de Branches

```
├── develop → Azure Static Web App (Desenvolvimento)
└── prod    → Azure Static Web App (Produção)
```

### Configuração Inicial

#### 1. Criar Repositório no GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M develop
git remote add origin https://github.com/seu-usuario/monitor-frontend.git
git push -u origin develop

# Criar branch de produção
git checkout -b prod
git push -u origin prod
```

#### 2. Criar Azure Static Web Apps (Desenvolvimento)

1. Acesse o [Portal Azure](https://portal.azure.com)
2. Clique em **"Create a resource"** → **"Static Web App"**
3. Preencha os dados:
   - **Subscription**: Sua subscription
   - **Resource Group**: `rg-monitor-dev` (ou criar novo)
   - **Name**: `monitor-frontend-dev`
   - **Plan type**: Free
   - **Region**: East US 2
   - **Source**: GitHub
   - **Organization**: Sua organização
   - **Repository**: monitor-frontend
   - **Branch**: `develop`
   - **Build Preset**: React
   - **App location**: `/`
   - **Output location**: `dist`
4. Clique em **"Review + create"** → **"Create"**

#### 3. Criar Azure Static Web Apps (Produção)

Repita o processo acima, mas com:
- **Name**: `monitor-frontend-prod`
- **Resource Group**: `rg-monitor-prod`
- **Branch**: `prod`

#### 4. Configurar Variáveis de Ambiente no Azure

Para cada Static Web App criado:

1. No Portal Azure, vá até o recurso
2. Clique em **"Configuration"** → **"Application settings"**
3. Adicione a variável:
   - **Name**: `VITE_API_URL`
   - **Value DEV**: `https://sua-api-dev.azurecontainerapps.io`
   - **Value PROD**: `https://sua-api-prod.azurecontainerapps.io`
4. Clique em **"Save"**

### Workflow de Deploy

O Azure automaticamente cria um GitHub Actions workflow em `.github/workflows/` para cada ambiente.

#### Push para Desenvolvimento
```bash
git checkout develop
# ... fazer alterações ...
git add .
git commit -m "feat: nova funcionalidade"
git push origin develop
```
✅ Deploy automático em `monitor-frontend-dev`

#### Push para Produção
```bash
git checkout prod
git merge develop
git push origin prod
```
✅ Deploy automático em `monitor-frontend-prod`

## 🔧 Estrutura do Projeto

```
monitor-frontend/
├── src/
│   ├── components/
│   │   └── Table.tsx          # Componente de tabela
│   ├── services/
│   │   └── api.ts             # Serviço de API
│   ├── App.tsx                # Componente principal
│   ├── main.tsx               # Entry point
│   ├── index.css              # Estilos globais
│   └── vite-env.d.ts          # Tipagens Vite
├── .env.development           # Variáveis de dev (não commitado)
├── .env.production            # Variáveis de prod (não commitado)
├── .env.example               # Exemplo de variáveis
├── staticwebapp.config.json   # Configuração Azure
├── tailwind.config.js         # Configuração Tailwind
├── vite.config.ts             # Configuração Vite
├── package.json
└── README.md
```

## 📊 Funcionalidades

- ✅ Tabela paginada com 3 colunas (Observação, Data/Hora, Quantidade)
- ✅ Registro automático de acesso ao carregar (F5)
- ✅ Botão para registro manual
- ✅ Paginação com navegação entre páginas
- ✅ Formatação de data/hora em padrão brasileiro
- ✅ Loading states e tratamento de erros
- ✅ Design responsivo com TailwindCSS

## 🌐 Endpoints da API

### POST `/api/registros/acesso`
Registra um acesso e retorna dados paginados
```json
{
  "observacao": "Request enviado via humano"
}
```

### GET `/api/registros`
Busca registros paginados (usado na navegação)
```
?pageNumber=1&pageSize=10
```

## 🔍 Monitoramento

Após o deploy, você pode visualizar:
- **URL do site**: No Portal Azure → Static Web App → Overview → URL
- **Logs de build**: GitHub → Actions
- **Logs de runtime**: Portal Azure → Static Web App → Application Insights

## 🐛 Troubleshooting

### Build falha no GitHub Actions
- Verifique se `package.json` tem os scripts corretos
- Confirme que `output_location: "dist"` está no workflow

### Variáveis de ambiente não funcionam
- No Azure Portal, verifique se `VITE_API_URL` está configurada
- Lembre-se: variáveis `VITE_*` são expostas no browser
- Após alterar, faça redeploy

### CORS errors
- Configure CORS no backend para aceitar a URL do Static Web App
- Exemplo: `https://monitor-frontend-prod.azurestaticapps.net`

## 📝 Próximos Passos

- [ ] Adicionar testes automatizados
- [ ] Configurar Application Insights
- [ ] Implementar autenticação (Azure AD B2C)
- [ ] Adicionar CI/CD para API backend

## 📄 Licença

Este projeto é parte de um estudo sobre Azure Static Web Apps e Container Apps.

## 👥 Autor

Desenvolvido como projeto de estudo de arquitetura cloud no Azure.
