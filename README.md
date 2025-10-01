# MobileMottu - Gerenciador de Motos e Pátios com API REST + Firebase

Link para api necessario para funcionamento: https://github.com/CarlosCampos84/CP4.MotoSecurityX.git

## Integrantes

*   RM - 555223 Carlos Eduardo 
*   RM - 554518 Antônio Júnior 
*   RM - 554600 Caio Henrique 

## Visão Geral do Projeto

O MobileMottu é um aplicativo móvel desenvolvido para auxiliar no gerenciamento de motocicletas, permitindo o cadastro de novas motos, sua listagem (geral ou filtrada por filial) e a visualização de informações sobre o pátio de cada filial. Este projeto foi construído utilizando React Native com Expo, **integrando Firebase para autenticação e API REST (.NET) para operações CRUD**, focando em uma interface intuitiva e funcionalidades essenciais para o controle de frotas de motocicletas distribuídas em diferentes filiais.

## 🆕 Novas Funcionalidades (API REST)

- ✅ **CRUD Completo via API**: Todas as operações de motos migradas para API REST .NET
- ✅ **Axios Integration**: Cliente HTTP configurado com interceptors e tratamento de erros
- ✅ **Feedback Visual**: Loading states, mensagens de sucesso/erro e confirmações
- ✅ **Configuração Dinâmica**: URL da API configurável através do app
- ✅ **Validações**: Backend com Data Annotations e frontend com validações robustas

## Funcionalidades Implementadas

1.  **Sistema de Autenticação com Firebase (`LoginScreen`, `RegisterScreen`):**
    *   **Tela de Login:** Permite que usuários existentes acessem o aplicativo. Inclui validação de formulário e feedback ao usuário.
    *   **Tela de Cadastro:** Permite que novos usuários criem uma conta. Inclui validação de formulário e confirmação de senha.
    *   **Logout Funcional:** Lógica para desautenticação utilizando Firebase Authentication.

2.  **Estilização com Tema Dinâmico:**
    *   O aplicativo agora suporta **modo claro e modo escuro**, adaptando-se às preferências do sistema do usuário.
    *   Personalização visual consistente com o tema do app: cores, fontes e imagens são ajustadas dinamicamente.
    *   Aderência às guidelines de design para uma experiência de usuário coerente.

3.  **Tela Inicial (`HomeScreen`):**
    *   Apresenta uma introdução ao aplicativo e opções de navegação.

4.  **Cadastro de Motos com API REST (`MotorcycleRegisterScreen`):**
    *   Permite o registro de novas motocicletas informando modelo, marca, ano, placa e **selecionando a filial à qual pertence a partir de uma lista de opções (Picker)**.
    *   **Os dados das motos são salvos via API REST (.NET) usando Axios**, garantindo persistência e validação no backend.
    *   **Feedback visual com loading states** durante o processo de cadastro.
    *   **Tratamento de erros** com mensagens específicas para diferentes tipos de falha.
    *   Após o cadastro, o usuário é automaticamente redirecionado para a lista de motos.

5.  **Listagem de Motos com API REST (`MotorcyclesListScreen`):**
    *   **Exibe as motocicletas cadastradas, buscando os dados via API REST (.NET)**.
    *   Pode exibir todas as motos ou filtrar a lista para mostrar apenas as motos de uma filial específica.
    *   O título da tela é atualizado dinamicamente para indicar o filtro aplicado (nome da filial ou "Todas as Motos").
    *   **A lista é atualizada automaticamente sempre que a tela é visualizada**, refletindo novos cadastros ou alterações.
    *   Apresenta informações como modelo, marca, ano, placa e filial de cada moto.
    *   **Permite a edição e exclusão de motos via API REST**, com confirmações e feedback visual.
    *   **Loading states durante operações** e tratamento de erros de rede.

6.  **Tela de Filiais (Pátios) com Firebase Firestore (`BranchesScreen`):**
    *   Lista os pátios (filiais) cadastrados no Firebase Firestore.
    *   Permite a **criação**, **edição** e **exclusão** de pátios.
    *   Ao selecionar um pátio, o usuário pode optar por:
        *   **Ver Pátio:** Navega para a tela de visualização do pátio selecionado.
        *   **Ver Motos da Filial:** Navega para a tela de listagem de motos, filtrada pelo pátio selecionado.

7.  **Visualização do Pátio da Filial (`PatioMapScreen`):**
    *   Exibe informações detalhadas sobre o pátio da filial selecionada.
    *   Mostra o nome da filial no título.
    *   Apresenta uma imagem de **mapa de pátio de exemplo** (a mesma para todas as filiais, conforme solicitado).
    *   Exibe **imagens de exemplo do local** do pátio (as mesmas para todas as filiais).
    *   Mostra a **contagem dinâmica de motocicletas** atualmente cadastradas para aquela filial específica.

8.  **🆕 Configuração da API (`ApiConfig`):**
    *   **Modal de configuração** acessível através da tela inicial.
    *   Permite **configurar dinamicamente a URL base da API REST**.
    *   **Salva a configuração localmente** usando AsyncStorage.
    *   **Validação de URL** e feedback visual durante o processo.
    *   **URL padrão**: `http://localhost:5102/api` (configurável).

## Estrutura de Arquivos do Projeto

O projeto está organizado da seguinte forma:

```
/mottuMobile-main/
├── assets/
│   ├── images/
│   │   ├── patios/               # Imagens dos pátios (mapa e locais de exemplo)
│   │   │   ├── mapa_patio_exemplo.png
│   │   │   ├── local_exemplo_1.png
│   │   │   └── local_exemplo_2.png
│   │   ├── E-1.webp             # Outras imagens de exemplo
│   │   ├── pop.webp
│   │   └── sport-2.webp
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── components/                   # Componentes React reutilizáveis
│   ├── ApiConfig.js             # 🆕 Modal de configuração da API
│   ├── Button.js
│   └── CardMoto.js
├── hooks/                        # 🆕 Hooks customizados
│   └── useApiState.js           # Hook para gerenciamento de estado da API
├── services/                     # 🆕 Serviços de integração
│   └── apiService.js            # Cliente HTTP com Axios
├── models/                       # Modelos de dados
│   ├── Moto.js
│   └── Patio.js
├── screens/                      # Telas da aplicação
│   ├── BranchesScreen.js
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── MotorcycleRegisterScreen.js
│   ├── MotorcyclesListScreen.js
│   ├── PatioMapScreen.js
│   └── RegisterScreen.js
├── theme/                        # Configurações de tema (cores, fontes)
│   ├── colors.js
│   ├── fonts.js
│   └── index.js
├── .gitignore
├── App.js                        # Ponto de entrada principal, configuração da navegação (Bottom Tab Navigator)
├── app.json                      # Configurações do Expo
├── firebaseConfig.js             # Configurações do Firebase
├── index.js                      # Ponto de entrada do React Native (gerenciado pelo Expo)
├── package-lock.json
├── package.json                  # Dependências e scripts do projeto
├── README.md                     # Este arquivo
└── RESUMO_ALTERACOES.md          # Resumo das últimas alterações implementadas
```

*   **`screens/`**: Contém os arquivos JavaScript para cada tela principal da aplicação, incluindo as novas telas de autenticação.
*   **`components/`**: Contém componentes de UI reutilizáveis, como botões personalizados e cards de moto.
*   **`models/`**: Contém as classes de modelo de dados (`Moto` e `Patio`).
*   **`assets/`**: Armazena recursos estáticos como imagens (ícones, logos, imagens de exemplo para os pátios) e fontes.
*   **`theme/`**: Define as paletas de cores e estilos de fontes utilizados consistentemente em toda a aplicação, agora com suporte a temas claro e escuro.
*   **`App.js`**: É o componente raiz que configura o container de navegação e o `TabNavigator` para a navegação entre as telas principais, gerenciando a alternância entre as telas de autenticação e as telas do aplicativo principal com base no estado de autenticação.
*   **`firebaseConfig.js`**: Contém as configurações do Firebase.
*   **`RESUMO_ALTERACOES.md`**: Documento que detalha as modificações mais recentes realizadas no projeto.

## Tecnologias Utilizadas

*   **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
*   **Expo:** Plataforma e conjunto de ferramentas sobre React Native para facilitar o desenvolvimento, build e deploy de apps.
*   **Firebase:** Plataforma do Google para desenvolvimento de aplicativos, utilizada para:
    *   **Firebase Authentication:** Para autenticação de usuários.
    *   **Firebase Firestore:** Para dados de pátios (mantido para compatibilidade).
*   **🆕 API REST (.NET):** Backend para operações CRUD de motos com:
    *   **Endpoints RESTful:** GET, POST, PUT, DELETE
    *   **Validações:** Data Annotations e business rules
    *   **CORS:** Configurado para integração com frontend
*   **🆕 Axios:** Cliente HTTP para React Native com:
    *   **Interceptors:** Para request/response
    *   **Tratamento de Erros:** Automático e customizado
    *   **Timeout:** Configurável
*   **React Navigation:** Biblioteca para gerenciamento de navegação entre telas (`@react-navigation/native`, `@react-navigation/bottom-tabs`).
*   **Expo Linear Gradient:** Para criar fundos com gradiente.
*   **Expo Vector Icons (`@expo/vector-icons`):** Para utilizar ícones (Ionicons) na interface.
*   **`useColorScheme` (React Native):** Hook para detectar o esquema de cores preferido do usuário (claro/escuro).

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento:

### Pré-requisitos

*   **Node.js:** Versão LTS recomendada (inclui npm). [Baixe aqui](https://nodejs.org/)
*   **Expo CLI:** Interface de linha de comando do Expo. Instale globalmente via npm:
    ```bash
    npm install -g expo-cli
    ```
*   **Expo Go App:** Aplicativo móvel (Android/iOS) para visualizar e testar o projeto em um dispositivo físico. Disponível nas lojas de aplicativos.
*   (Opcional) Emulador Android (configurado com Android Studio) ou Simulador iOS (configurado com Xcode em macOS).

### Passos para Instalação

1.  **Clone ou baixe o projeto:**
    Obtenha os arquivos do projeto e navegue até o diretório raiz do projeto no seu terminal.

2.  **Instale as dependências:**
    No diretório raiz do projeto, execute o comando para instalar todas as dependências listadas no `package.json`:
    ```bash
    npm install
    ```
    ou, se você utiliza Yarn:
    ```bash
    yarn install
    ```

### 🆕 Configuração da API REST

**Antes de iniciar o projeto, certifique-se de que a API .NET esteja rodando:**

1.  **Execute a API .NET:**
    ```bash
    # No projeto da API .NET
    dotnet run --project CP4.MotoSecurityX.Api
    ```
    A API estará disponível em: `http://localhost:5102`

2.  **Verifique os endpoints:**
    - Swagger UI: `http://localhost:5102/swagger`
    - API Base: `http://localhost:5102/api`

### Iniciando o Projeto

1.  **Inicie o servidor de desenvolvimento Expo:**
    Ainda no diretório raiz do projeto, execute:
    ```bash
    npx expo start
    # ou
    npm start
    ```
    Este comando iniciará o Metro Bundler e exibirá um QR Code no terminal, além de abrir uma página no navegador com opções para rodar o aplicativo.

2.  **Configure a API no App:**
    - Faça login no aplicativo
    - Vá em "Configurar API" na tela inicial
    - Configure a URL: `http://localhost:5102/api`
    - Salve a configuração

3.  **Execute no dispositivo ou emulador/simulador:**
    *   **Dispositivo Físico:** Abra o aplicativo Expo Go em seu smartphone e escaneie o QR Code exibido no terminal ou na página do navegador.
    *   **Emulador/Simulador:** Na página do navegador aberta pelo Expo, ou no terminal (pressionando `a` para Android ou `i` para iOS), você pode iniciar o aplicativo no emulador/simulador, desde que estejam configurados e em execução.

### 🔧 Resolução de Problemas

**Erro "Unable to resolve @react-navigation/stack":**
```bash
npm install @react-navigation/stack
```

**Problemas de conexão com API:**
- Verifique se a API está rodando na porta 5102
- Use `http://` (não `https://`) para localhost
- Configure a URL correta no app através de "Configurar API"

