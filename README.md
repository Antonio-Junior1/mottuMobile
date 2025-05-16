# MobileMottu - Gerenciador de Motos e Pátios

# integrantes 

RM - 555223 Carlos Eduardo 

RM - 554518 Antônio Júnior 

RM - 554600 Caio Henrique



## Visão Geral do Projeto




O MobileMottu é um aplicativo móvel desenvolvido para auxiliar no gerenciamento de motocicletas, permitindo o cadastro de novas motos, sua listagem (geral ou filtrada por filial) e a visualização de informações sobre o pátio de cada filial, incluindo um mapa esquemático, imagens do local e a contagem de motos presentes.

Este projeto foi construído utilizando React Native com Expo, focando em uma interface intuitiva e funcionalidades essenciais para o controle de frotas de motocicletas distribuídas em diferentes filiais.

## Funcionalidades Implementadas

1.  **Tela Inicial (`HomeScreen`):**
    *   Apresenta uma introdução ao aplicativo.

2.  **Cadastro de Motos (`MotorcycleRegisterScreen`):**
    *   Permite o registro de novas motocicletas informando modelo, marca, ano, placa e **selecionando a filial à qual pertence a partir de uma lista de opções (Picker)**.
    *   Os dados das motos cadastradas são salvos localmente no dispositivo utilizando AsyncStorage, garantindo persistência entre sessões.
    *   Após o cadastro, o usuário é automaticamente redirecionado para a lista de motos da filial informada.

3.  **Listagem de Motos (`MotorcyclesListScreen`):**
    *   Exibe as motocicletas cadastradas.
    *   Pode exibir todas as motos ou filtrar a lista para mostrar apenas as motos de uma filial específica.
    *   O título da tela é atualizado dinamicamente para indicar o filtro aplicado (nome da filial ou "Todas as Motos").
    *   A lista é atualizada automaticamente sempre que a tela é visualizada, refletindo novos cadastros ou alterações.
    *   Apresenta informações como modelo, marca, ano, placa e filial de cada moto.

4.  **Tela de Filiais (`BranchesScreen`):**
    *   Lista as filiais disponíveis (atualmente com dados mockados: Matriz - Centro, Filial - Zona Norte, Filial - Zona Sul).
    *   Ao selecionar uma filial, o usuário pode optar por:
        *   **Ver Pátio:** Navega para a tela de visualização do pátio da filial selecionada.
        *   **Ver Motos da Filial:** Navega para a tela de listagem de motos, filtrada pela filial selecionada.

5.  **Visualização do Pátio da Filial (`PatioMapScreen`):**
    *   Exibe informações detalhadas sobre o pátio da filial selecionada.
    *   Mostra o nome da filial no título.
    *   Apresenta uma imagem de **mapa de pátio de exemplo** (a mesma para todas as filiais, conforme solicitado).
    *   Exibe **imagens de exemplo do local** do pátio (as mesmas para todas as filiais).
    *   Mostra a **contagem dinâmica de motocicletas** atualmente cadastradas para aquela filial específica, lendo os dados do AsyncStorage.

## Estrutura de Arquivos do Projeto

O projeto está organizado da seguinte forma:

```
/MobileMottu_Sprint1_Entregavel_Expo_Atualizado/
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
│   ├── Button.js
│   └── CardMoto.js               # (Não utilizado nas versões mais recentes das telas modificadas)
├── screens/                      # Telas da aplicação
│   ├── BranchesScreen.js
│   ├── HomeScreen.js
│   ├── MotorcycleRegisterScreen.js
│   ├── MotorcyclesListScreen.js
│   └── PatioMapScreen.js
├── theme/                        # Configurações de tema (cores, fontes)
│   ├── colors.js
│   ├── fonts.js
│   └── index.js
├── .gitignore
├── App.js                        # Ponto de entrada principal, configuração da navegação (Bottom Tab Navigator)
├── app.json                      # Configurações do Expo
├── index.js                      # Ponto de entrada do React Native (gerenciado pelo Expo)
├── package-lock.json
├── package.json                  # Dependências e scripts do projeto
├── README.md                     # Este arquivo
└── RESUMO_ALTERACOES.md          # Resumo das últimas alterações implementadas
```

*   **`screens/`**: Contém os arquivos JavaScript para cada tela principal da aplicação.
*   **`components/`**: Contém componentes de UI reutilizáveis, como botões personalizados.
*   **`assets/`**: Armazena recursos estáticos como imagens (ícones, logos, imagens de exemplo para os pátios) e fontes.
*   **`theme/`**: Define as paletas de cores e estilos de fontes utilizados consistentemente em toda a aplicação.
*   **`App.js`**: É o componente raiz que configura o container de navegação e o `TabNavigator` para a navegação entre as telas principais.
*   **`RESUMO_ALTERACOES.md`**: Documento que detalha as modificações mais recentes realizadas no projeto.

## Tecnologias Utilizadas

*   **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
*   **Expo:** Plataforma e conjunto de ferramentas sobre React Native para facilitar o desenvolvimento, build e deploy de apps.
*   **React Navigation:** Biblioteca para gerenciamento de navegação entre telas (`@react-navigation/native`, `@react-navigation/bottom-tabs`).
*   **AsyncStorage (`@react-native-async-storage/async-storage`):** Sistema de armazenamento local persistente (chave-valor) para salvar os dados das motos.
*   **Expo Linear Gradient:** Para criar fundos com gradiente.
*   **Expo Vector Icons (`@expo/vector-icons`):** Para utilizar ícones (Ionicons) na interface.

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

### Iniciando o Projeto

1.  **Inicie o servidor de desenvolvimento Expo:**
    Ainda no diretório raiz do projeto, execute:
    ```bash
    npx expo start
    ```
    Este comando iniciará o Metro Bundler e exibirá um QR Code no terminal, além de abrir uma página no navegador com opções para rodar o aplicativo.

2.  **Execute no dispositivo ou emulador/simulador:**
    *   **Dispositivo Físico:** Abra o aplicativo Expo Go em seu smartphone e escaneie o QR Code exibido no terminal ou na página do navegador.
    *   **Emulador/Simulador:** Na página do navegador aberta pelo Expo, ou no terminal (pressionando `a` para Android ou `i` para iOS), você pode iniciar o aplicativo no emulador/simulador, desde que estejam configurados e em execução.

