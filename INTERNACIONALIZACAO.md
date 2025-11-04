# Implementação de Internacionalização (i18n)

## Resumo das Alterações

Foi implementado um sistema completo de internacionalização (i18n) no aplicativo Mottu Mobile, permitindo a troca entre **Português** e **Espanhol** através do botão de idioma na tela Home.

## Arquivos Criados

### 1. `contexts/LanguageContext.js`
Contexto React criado para gerenciar o estado do idioma globalmente em toda a aplicação. Isso garante que todas as telas sejam atualizadas automaticamente quando o idioma for alterado.

**Funcionalidades:**
- `currentLanguage`: Estado atual do idioma (pt ou es)
- `changeLanguage(newLang)`: Função para alterar o idioma globalmente

## Arquivos Modificados

### 1. `i18n.js`
Expandido com todas as traduções necessárias para cobrir todas as telas do aplicativo.

**Traduções adicionadas:**
- Textos de autenticação (login, registro)
- Textos da tela Home
- Textos da tela de Filiais/Pátios
- Textos da tela de Cadastro de Motos
- Textos da tela de Lista de Motos
- Mensagens de erro e sucesso
- Confirmações de ações
- Títulos de telas

### 2. `App.js`
- Integrado o `LanguageProvider` para envolver toda a aplicação
- Atualizado para usar traduções nos títulos das tabs do navegador
- Adicionado suporte para atualização dinâmica dos títulos quando o idioma muda

### 3. `screens/HomeScreen.js`
- Integrado o hook `useLanguage()` do contexto
- Botão de idioma agora usa a função `changeLanguage()` do contexto
- Todos os textos foram substituídos por `i18n.t('chave')`
- Alerta de mudança de idioma traduzido

### 4. `screens/LoginScreen.js`
- Todos os textos estáticos substituídos por traduções
- Placeholders dos inputs traduzidos
- Mensagens de erro traduzidas

### 5. `screens/RegisterScreen.js`
- Todos os textos estáticos substituídos por traduções
- Placeholders dos inputs traduzidos
- Mensagens de erro traduzidas

### 6. `screens/BranchesScreen.js`
- Integrado o hook `useLanguage()` do contexto
- Todos os textos substituídos por traduções
- Mensagens de confirmação traduzidas
- Adicionado `extraData={currentLanguage}` no FlatList para forçar re-render

### 7. `screens/MotorcycleRegisterScreen.js`
- Integrado o hook `useLanguage()` do contexto
- Todos os textos e labels substituídos por traduções
- Placeholders traduzidos

### 8. `screens/MotorcyclesListScreen.js`
- Integrado o hook `useLanguage()` do contexto
- Todos os textos substituídos por traduções
- Títulos dinâmicos traduzidos
- Adicionado `extraData={currentLanguage}` no FlatList para forçar re-render

## Como Funciona

### Fluxo de Troca de Idioma

1. **Usuário clica no botão de idioma** na tela Home
2. A função `toggleLanguage()` é chamada
3. O novo idioma é determinado (pt ↔ es)
4. A função `changeLanguage(newLang)` do contexto é chamada
5. O contexto atualiza o estado `currentLanguage`
6. O i18n.locale é atualizado
7. **Todas as telas que usam o hook `useLanguage()` são re-renderizadas automaticamente**
8. Um alerta confirma a mudança de idioma

### Estrutura de Traduções

```javascript
const translations = {
  pt: {
    home: 'Início',
    branches: 'Filiais',
    // ... mais traduções
  },
  es: {
    home: 'Inicio',
    branches: 'Sucursales',
    // ... mais traduções
  }
};
```

### Uso nas Telas

```javascript
import i18n from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const MyScreen = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <Text>{i18n.t('home')}</Text>
  );
};
```

## Como Testar

### 1. Iniciar o Aplicativo
```bash
cd /home/ubuntu/mottuMobile-main
npx expo start
```

### 2. Fazer Login
- Use suas credenciais de teste

### 3. Testar a Troca de Idioma
1. Na tela Home, localize o botão **"Idioma: PT 🌍"** (ou ES se já estiver em espanhol)
2. Clique no botão
3. Observe o alerta confirmando a mudança
4. **Navegue pelas diferentes telas** para verificar que todos os textos foram traduzidos:
   - Home
   - Filiais
   - Cadastro de Moto
   - Lista de Motos
   - Pátio

### 4. Verificar Traduções

#### Português (PT)
- Início, Filiais, Pátio, Cadastro, Motos
- Ver Filiais, Cadastrar Moto, Lista de Motos
- Sair, Salvar, Cancelar, Excluir, Editar

#### Espanhol (ES)
- Inicio, Sucursales, Patio, Registro, Motos
- Ver Sucursales, Registrar Moto, Lista de Motos
- Salir, Guardar, Cancelar, Eliminar, Editar

## Idiomas Suportados

- **Português (pt)**: Idioma padrão
- **Espanhol (es)**: Idioma alternativo

## Características Implementadas

✅ Troca dinâmica de idioma sem necessidade de reiniciar o app
✅ Todas as telas traduzidas (Login, Registro, Home, Filiais, Motos, Cadastro)
✅ Mensagens de erro e sucesso traduzidas
✅ Placeholders de inputs traduzidos
✅ Títulos de navegação traduzidos
✅ Confirmações de ações traduzidas
✅ Contexto global para gerenciamento de idioma
✅ Atualização automática de todas as telas ao trocar idioma

## Observações

- O idioma padrão é detectado automaticamente do dispositivo
- Se o dispositivo não estiver em PT ou ES, o padrão será PT
- O estado do idioma é mantido enquanto o app estiver aberto
- Ao fechar e reabrir o app, o idioma volta ao padrão do dispositivo

## Próximos Passos

Após testar a funcionalidade de troca de idiomas, você pode prosseguir com a publicação do aplicativo conforme orientado.
