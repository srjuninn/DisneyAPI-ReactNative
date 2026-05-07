# 🏰 Disney Characters App - React Native

Um aplicativo mobile desenvolvido em **React Native** com **Expo** que consome a **Disney API** para exibir e gerenciar personagens Disney com funcionalidades de busca e favoritos.

---

## 📋 Situação de Aprendizagem

### Contexto do Projeto

**Desenvolvimento de App com React Native & API**

Você foi contratado por uma Software House para desenvolver um MVP (Produto Mínimo Viável) de uma aplicação mobile moderna. O objetivo é criar um ecossistema funcional que consuma dados de uma API REST externa, garantindo performance, usabilidade e uma arquitetura de pastas escalável.

**Duração:** 8 Horas

**Ferramentas Obrigatórias:** React Native, Expo, Axios, Android Studio (Emulator) e GitHub.

---

## 1️⃣ Fase de Planejamento e Requisitos (15%)

### 📌 Tema: Disney API

A aplicação consome dados da **Disney API** (https://api.disneyapi.dev), uma API REST pública que fornece informações sobre personagens, filmes, séries e parques temáticos Disney.

### ✅ Requisitos Funcionais (RF)

| ID | Funcionalidade | Descrição |
|---|---|---|
| RF-001 | Listagem de Personagens | Exibe uma lista de todos os personagens Disney com nome e imagem |
| RF-002 | Busca por Nome | Permite filtrar personagens digitando o nome em tempo real |
| RF-003 | Visualização de Detalhes | Mostra informações completas do personagem (filmes, séries, parques) |
| RF-004 | Favoritar/Desfavoritar | Permite salvar personagens favoritos em armazenamento local |
| RF-005 | Gerenciar Favoritos | Tela dedicada para visualizar e remover favoritos |

### 🔧 Requisitos Não-Funcionais (RNF)

| ID | Requisito | Descrição |
|---|---|---|
| RNF-001 | Tratamento de Erros | Mensagens amigáveis para falhas de conexão e timeouts |
| RNF-002 | Carregamento | ActivityIndicator enquanto dados são obtidos da API |
| RNF-003 | Persistência | AsyncStorage para salvar favoritos localmente |
| RNF-004 | Responsividade | Interface adaptável para diferentes tamanhos de tela |
| RNF-005 | Segurança | SafeAreaView para evitar sobreposição com barra de status |
| RNF-006 | Performance | Uso otimizado de FlatList para listas grandes |

### 🎨 Style Guide

#### Paleta de Cores
```javascript
- Primary: #4CAF50 (Verde) - Ações principais
- Secondary: #2196F3 (Azul) - Destaque secundário
- Background: #F5F5F5 (Cinza claro) - Fundo
- Text: #212121 (Cinza escuro) - Texto principal
- White: #FFFFFF - Cartões e superfícies
```

#### Tipografia
```javascript
- Título (22px, bold, #4CAF50)
- Subtítulo (18px, semibold, #2196F3)
- Body (16px, regular, #212121)
```

#### Componentes Principais
- **Cards:** Exibem personagens com imagem, nome e ação
- **Buttons:** Primárias (#2196F3) com texto branco
- **Inputs:** TextInput com borda azul, placeholder cinza
- **FlatList:** Para renderização eficiente de listas

---

## 2️⃣ Configuração e Estrutura de Pastas (20%)

### 📂 Arquitetura Clean Architecture Simplificada

```
DisneyAPI-ReactNative/
├── src/
│   ├── layouts/               # Telas principais da aplicação
│   │   ├── Home.js           # Tela inicial com lista e busca
│   │   ├── Favorites.js      # Tela de favoritos
│   │   └── details/
│   │       └── LayoutDetails.js  # Detalhes do personagem
│   │
│   ├── routes/               # Configuração de navegação
│   │   └── AppNavigator.js   # Stack Navigator com rotas
│   │
│   ├── services/             # Chamadas de API e persistência
│   │   ├── api.js            # Configuração Axios
│   │   └── storage.js        # AsyncStorage para favoritos
│   │
│   ├── styles/               # Estilização global
│       └── global.js         # Cores, espaçamento, tipografia
│   
│
├── App.js                     # Componente raiz
├── index.js                   # Entry point
├── app.json                   # Configurações Expo
├── package.json               # Dependências
└── README.md                  # Este arquivo
```

### 📝 Explicação de Cada Pasta

| Pasta | Responsabilidade | Por quê? |
|---|---|---|
| **src/layouts** | Armazena as telas principais | Separação de responsabilidades; fácil localizar telas |
| **src/routes** | Define navegação entre telas | Centraliza lógica de roteamento; facilita manutenção |
| **src/services** | API e persistência de dados | Isolamento de efeitos colaterais; reutilizabilidade |
| **src/styles** | Tokens de design (cores, fonts) | Consistência visual; alterações globais sem duplicação |
| **src/assets** | Recursos estáticos | Fácil acesso a imagens e ícones |

---

## 3️⃣ Desenvolvimento Técnico (40%)

### 🌐 Consumo de API

#### Configuração Axios (`src/services/api.js`)

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.disneyapi.dev",
});

export default api;
```

**Endpoints Utilizados:**
- `GET /character` - Lista todos os personagens (com paginação)
- `GET /character?name={name}` - Busca personagem por nome

#### Exemplo de Requisição (`src/layouts/Home.js`)

```javascript
useEffect(() => {
    const fetchCharacters = async () => {
        try {
            const response = await api.get("/character");
            setCharacters(response.data.data);
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
        } finally {
            setLoading(false);
        }
    };
    
    fetchCharacters();
}, []);
```

### 📱 Interface de Usuário (UI)

#### FlatList para Renderização Eficiente

```javascript
<FlatList
    data={characters}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Details", { character: item })}>
            <View style={styles.card}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <Text style={typography.body}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )}
/>
```

**Vantagens:**
- Renderiza apenas itens visíveis
- Reutiliza componentes desmontados
- Performance em listas grandes

### 🗺️ Navegação

#### React Navigation Stack (`src/routes/AppNavigator.js`)

```javascript
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: "Disney Characters" }}
                />
                <Stack.Screen
                    name="Details"
                    component={LayoutDetails}
                    options={{ title: "Detalhes" }}
                />
                <Stack.Screen
                    name="Favorites"
                    component={Favorites}
                    options={{ title: "Favoritos" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
```

### 🎨 Estilização com StyleSheet

```javascript
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: colors.background, 
        padding: spacing.small 
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.medium,
        backgroundColor: colors.white,
        padding: spacing.small,
        borderRadius: 8,
    },
    image: { 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        marginRight: 15 
    },
});
```

---

## 📁 Explicação Detalhada dos Arquivos

### **App.js** - Componente Raiz
Importa o navegador principal e inicia a aplicação.

```javascript
import React from "react";
import AppNavigator from "./src/routes/AppNavigator";

export default function App() {
  return <AppNavigator />;
}
```

---

### **src/routes/AppNavigator.js** - Navegação
Define as rotas e transições entre telas usando React Navigation Stack.

**Responsabilidades:**
- Importar todas as telas
- Configurar opções de header (título, alinhamento)
- Estruturar o fluxo de navegação

---

### **src/layouts/Home.js** - Tela Principal
Exibe lista de personagens com busca em tempo real.

**Funcionalidades:**
- Carregamento inicial de personagens via API
- Busca dinâmica conforme digita (mínimo 3 caracteres)
- ActivityIndicator durante carregamento
- Botão de acesso a Favoritos
- Navegação para tela de detalhes

---

### **src/layouts/details/LayoutDetails.js** - Detalhes do Personagem
Mostra informações completas do personagem selecionado.

**Informações Exibidas:**
- Imagem do personagem
- Nome
- Filmes em que aparece
- Séries em que aparece
- Parques temáticos
- Botão "Favoritar"

---

### **src/layouts/Favorites.js** - Tela de Favoritos
Gerencia personagens marcados como favoritos.

**Funcionalidades:**
- Lista personagens salvos localmente
- Remover favorito com um clique
- Navegação para detalhes do favorito
- Mensagem quando lista vazia

---

### **src/services/api.js** - Configuração Axios
Cria instância centralizada do Axios.

**Benefícios:**
- Baseado configurado uma única vez
- Headers globais (se necessário)
- Interceptadores para tratamento de erros

---

### **src/services/storage.js** - Persistência Local
Gerencia salvamento de favoritos com AsyncStorage.

```javascript
// Salvar favorito
export const saveFavorite = async (character) => {
    try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        const favorites = stored ? JSON.parse(stored) : [];
        if (!favorites.find((item) => item._id === character._id)) {
            favorites.push(character);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
    } catch (error) {
        console.error("Erro ao salvar favorito:", error);
    }
};

// Obter favoritos
export const getFavorites = async () => {
    try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        return [];
    }
};

// Remover favorito
export const removeFavorite = async (id) => {
    try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        let favorites = stored ? JSON.parse(stored) : [];
        favorites = favorites.filter((item) => item._id !== id);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Erro ao remover favorito:", error);
    }
};
```

---

### **src/styles/global.js** - Design Tokens
Centraliza cores, espaçamento e tipografia.

```javascript
export const colors = {
    primary: "#4CAF50",
    secondary: "#2196F3",
    background: "#F5F5F5",
    text: "#212121",
    white: "#FFFFFF",
};

export const spacing = {
    small: 8,
    medium: 16,
    large: 24,
};

export const typography = {
    title: { fontSize: 22, fontWeight: "bold", color: colors.primary },
    subtitle: { fontSize: 18, fontWeight: "600", color: colors.secondary },
    body: { fontSize: 16, color: colors.text },
};
```

---

## 🚀 Como Usar a API Disney

### Base URL
```
https://api.disneyapi.dev
```

### Endpoints Principais

#### 1. Listar Todos os Personagens
```
GET /character
```

**Resposta:**
```json
{
  "data": [
    {
      "_id": 1,
      "name": "Elmo",
      "imageUrl": "https://...",
      "films": ["Sesame Street"],
      "tvShows": ["Sesame Street"],
      "parkAttractions": ["Magic Kingdom"]
    }
  ],
  "count": 5000
}
```

#### 2. Buscar Personagem por Nome
```
GET /character?name=Mickey
```

### Tratamento de Erros

```javascript
try {
    const response = await api.get("/character");
    setCharacters(response.data.data);
} catch (error) {
    if (error.response) {
        // API retornou erro (4xx, 5xx)
        console.error("Erro:", error.response.status);
    } else if (error.request) {
        // Sem resposta do servidor
        console.error("Sem resposta do servidor");
    } else {
        // Erro na configuração da requisição
        console.error("Erro:", error.message);
    }
}
```

---

## 📲 Instalação e Execução

### Pré-requisitos
- **Node.js** v16+ instalado
- **Expo CLI** instalado globalmente: `npm install -g expo-cli`
- **Android Studio** com emulador configurado (ou **Expo Go** no celular)

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/DisneyAPI-ReactNative.git
cd DisneyAPI-ReactNative
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Executar o Projeto

#### Via Expo (Windows/Mac/Linux)
```bash
npm start
```
Escaneie o QR code com **Expo Go** no celular.

#### Via Android Studio (Emulator)
```bash
npm run android
```

#### Via iOS (Mac)
```bash
npm run ios
```

#### Via Web (Navegador)
```bash
npm run web
```

---

## ✅ Testes e Validação (10%)

### Checklist de Testes

- ✅ App inicia sem erros
- ✅ Lista de personagens carrega corretamente
- ✅ Busca funciona em tempo real (3+ caracteres)
- ✅ Detalhes do personagem exibem corretamente
- ✅ Botão "Favoritar" salva localmente
- ✅ Tela de Favoritos exibe itens salvos
- ✅ Remover favorito funciona
- ✅ App adapta em orientação portrait e landscape
- ✅ ActivityIndicator aparece durante carregamento
- ✅ Mensagens de erro aparecem se API falhar
- ✅ SafeAreaView previne sobreposição com status bar

### Validação em Diferentes Dispositivos

```javascript
// Considere testar em:
- Emulador Android padrão (Pixel 4)
- Emulador Android pequeno (Pixel 3a)
- Emulador Android grande (Tablet)
- Dispositivo físico via Expo Go
```

---

## 📦 Dependências do Projeto

| Dependência | Versão | Propósito |
|---|---|---|
| react-native | 0.81.5 | Framework mobile |
| expo | ~54.0.33 | Plataforma Expo |
| @react-navigation/native | ^7.2.2 | Navegação básica |
| @react-navigation/native-stack | ^7.14.12 | Stack Navigator |
| axios | ^1.15.2 | Cliente HTTP |
| @react-native-async-storage/async-storage | 2.2.0 | Persistência local |
| react-native-safe-area-context | ~5.6.0 | SafeArea |
| styled-components | ^6.4.1 | Estilização avançada |

---

## 🔧 Scripts Disponíveis

```bash
# Inicia o aplicativo
npm start

# Executa no Android
npm run android

# Executa no iOS (Mac)
npm run ios

# Executa na Web
npm run web
```

---

## 📝 Commits Semânticos

### Padrão de Commits

```
<tipo>(<escopo>): <descrição>

<corpo>
```

### Tipos Utilizados
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `refactor:` Reorganização de código
- `style:` Alterações de estilo
- `docs:` Alterações na documentação
- `chore:` Tarefas de build, dependências

### Exemplos
```bash
git commit -m "feat(home): adicionar busca em tempo real"
git commit -m "fix(favorites): corrigir remoção de favorito"
git commit -m "docs(readme): atualizar instruções de instalação"
git commit -m "refactor(api): centralizar tratamento de erros"
```

---

## 🏗️ Entrega e Versionamento (15%)

### Repositório GitHub

O projeto está versionado no GitHub com:
- ✅ Código limpo e indentado
- ✅ Sem erros no console
- ✅ Tratamento de estados (Carregando, Erro)
- ✅ README completo
- ✅ Commits semânticos

### Como Compartilhar

1. Realize um push para o repositório
2. Compartilhe o link do repositório
3. O avaliador pode clonar e executar sem problemas

```bash
# Verificar status
git status

# Adicionar mudanças
git add .

# Commit com mensagem semântica
git commit -m "feat: adicionar sessão de favoritos"

# Push para main
git push origin main
```

---

## 📊 Matriz de Pontuação

| Fase | Critério | Pontos |
|---|---|---|
| **Planejamento (15%)** | RF, RNF, Style Guide | 15 |
| **Estrutura (20%)** | Organização de pastas, README | 20 |
| **Técnica (40%)** | API, UI, Navegação, Estilo | 40 |
| **Testes (10%)** | Validação em emulador/dispositivo | 10 |
| **Entrega (15%)** | GitHub, commits, documentação | 15 |
| **TOTAL** | | **100** |

---

## 🐛 Troubleshooting

### Problema: App não conecta à API
**Solução:** Verifique a conexão internet. Teste no navegador: `https://api.disneyapi.dev/character`

### Problema: Favoritos não salvam
**Solução:** Verifique permissões de armazenamento no Android. Em dados do app, limpe cache.

### Problema: Emulador não abre
**Solução:** Reinicie o Android Studio e o Expo: `expo prebuild --clean`

### Problema: Imagens não carregam
**Solução:** Verifique HTTPS da URL da imagem. Pode estar bloqueado no emulador.

---

## 📞 Contato e Suporte

Para dúvidas sobre o projeto:
- Consulte a documentação oficial: [React Native Docs](https://reactnative.dev)
- Disney API: [api.disneyapi.dev](https://api.disneyapi.dev)
- React Navigation: [react-navigation.org](https://react-navigation.org)

---

## 📄 Licença

Este projeto é fornecido como material de aprendizagem.

---

## ✨ Conclusão

Este aplicativo demonstra as competências essenciais em desenvolvimento mobile:
- ✅ Consumo de APIs REST com Axios
- ✅ Gerenciamento de estado com Hooks (useState, useEffect)
- ✅ Navegação entre telas
- ✅ Persistência de dados local
- ✅ Estilização responsiva
- ✅ Tratamento de erros
- ✅ Arquitetura escalável

**Tempo de desenvolvimento:** ~8 horas
**Próximos passos:** Implementar autenticação, testes unitários, CI/CD

---

**Desenvolvido com ❤️ usando React Native e Expo**
