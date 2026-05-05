# Design do Meet & Dungeon

## Visão Geral
Meet & Dungeon é um aplicativo móvel para sessões de RPG de mesa que integra videoconferência via Jitsi Meet, mapas virtuais interativos, sincronização de vídeos, chat em tempo real e sistema de campanhas. O design segue as diretrizes de interface do iOS com cores preto, vermelho e cinza.

## Paleta de Cores
- **Primária**: Vermelho (#DC143C - Crimson)
- **Secundária**: Preto (#1A1A1A)
- **Neutra**: Cinza (#808080)
- **Fundo Claro**: Branco (#FFFFFF)
- **Fundo Escuro**: Preto (#0F0F0F)
- **Acentos**: Cinza Claro (#E5E5E5)

## Telas Principais

### 1. Autenticação
- **Login**: Email/senha com opção de OAuth
- **Cadastro**: Nome, email, senha, confirmação
- **Perfil**: Editar informações, foto de perfil, preferências

### 2. Home (Dashboard)
- Sessões próximas (agenda)
- Campanhas ativas
- Botão flutuante para criar nova sessão
- Notificações de convites
- Histórico recente de sessões

### 3. Campanhas
- Lista de campanhas do usuário
- Criar nova campanha
- Detalhes da campanha (descrição, membros, sessões)
- Editar/deletar campanha (apenas criador)
- Convidar membros

### 4. Sessões
- Lista de sessões (próximas, ativas, passadas)
- Criar nova sessão
- Detalhes da sessão:
  - Data/hora agendada
  - Membros participantes
  - Mapas associados
  - Status (agendada, em andamento, finalizada)
  - Botão para iniciar videoconferência

### 5. Sala de Sessão (Durante Sessão)
- Videoconferência Jitsi Meet (topo)
- Mapas virtuais (centro)
- Chat por sessão (lateral/abaixo)
- Controles de mapa (zoom, pan, marcadores)
- Sincronização de vídeos
- Arquivos da sessão

### 6. Mapas Virtuais
- Galeria de mapas
- Upload de mapas (imagens)
- Visualizador de mapas com:
  - Zoom e pan
  - Marcadores/anotações
  - Compartilhamento em tempo real
  - Sincronização entre participantes

### 7. Chat
- Chat por sessão
- Mensagens em tempo real
- Suporte a emoji e formatação básica
- Histórico de mensagens

### 8. Configurações
- Perfil do usuário
- Preferências de notificação
- Tema (claro/escuro)
- Privacidade e segurança
- Logout

## Fluxos de Usuário Principais

### Fluxo 1: Criar e Participar de Sessão
1. Usuário faz login
2. Clica em "Nova Sessão"
3. Seleciona campanha
4. Define data/hora
5. Convida membros
6. Sessão criada
7. Membros recebem notificação
8. Clicam para entrar na sessão
9. Videoconferência + mapas + chat iniciam

### Fluxo 2: Gerenciar Campanhas
1. Usuário acessa "Campanhas"
2. Clica em "Nova Campanha"
3. Preenche nome, descrição, imagem
4. Convida mestres/jogadores
5. Cria sessões dentro da campanha
6. Gerencia membros e arquivos

### Fluxo 3: Usar Mapas Virtuais
1. Usuário em sessão ativa
2. Clica em "Mapas"
3. Seleciona mapa da campanha ou faz upload
4. Visualiza mapa com zoom/pan
5. Adiciona marcadores/anotações
6. Compartilha com outros participantes
7. Sincronização em tempo real

### Fluxo 4: Chat e Comunicação
1. Usuário em sessão ativa
2. Acessa aba de chat
3. Digita mensagem
4. Mensagem aparece para todos em tempo real
5. Suporta histórico de conversa

## Estrutura de Navegação

```
Home (Dashboard)
├── Campanhas
│   ├── Nova Campanha
│   ├── Detalhes Campanha
│   └── Gerenciar Membros
├── Sessões
│   ├── Nova Sessão
│   ├── Detalhes Sessão
│   └── Sala de Sessão
│       ├── Videoconferência
│       ├── Mapas
│       └── Chat
├── Mapas
│   ├── Galeria
│   ├── Upload
│   └── Visualizador
└── Configurações
    ├── Perfil
    ├── Notificações
    ├── Tema
    └── Privacidade
```

## Componentes de UI

### Botões
- Primário (Vermelho): Ações principais
- Secundário (Cinza): Ações alternativas
- Terciário (Texto): Ações menores

### Cards
- Sessão: Data, hora, membros, status
- Campanha: Nome, descrição, membros
- Mapa: Thumbnail, nome, tamanho

### Inputs
- Text fields com validação
- Date/time pickers
- File pickers para mapas

### Feedback
- Loading spinners
- Toast notifications
- Confirmação de ações destrutivas

## Considerações de Design

### Performance
- Lazy loading de mapas
- Paginação de listas
- Cache de imagens

### Acessibilidade
- Contraste adequado (WCAG AA)
- Tamanho de toque mínimo (44pt)
- Suporte a leitura de tela

### Responsividade
- Design mobile-first
- Orientação portrait (9:16)
- Suporte a tablets (landscape)

### Segurança
- Sessões privadas por padrão
- Convites com tokens
- Permissões granulares (visualizar, editar, deletar)
