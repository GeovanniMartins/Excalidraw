# Excalidraw Whiteboard - Multiplataforma (Web, Android & Windows Desktop)

Este projeto é uma aplicação de Quadro Branco Interativo (Whiteboard) desenvolvida com **React**, **Vite**, **TypeScript** e **@excalidraw/excalidraw**. Ele possui configurações e scripts prontos para ser executado e compilado em três plataformas:
1. **Web**: Navegador via Vite
2. **Mobile**: Android (APK) via Capacitor
3. **Desktop**: Windows (.exe) via Electron & electron-builder

---

## 🚀 Funcionalidades
- **Interface de Desenho Completa**: Foco em criação de esquemas, diagramas, desenhos livres e fluxogramas.
- **Customização de Cores**: Escolha de cores de traço, preenchimento e fundo do quadro canvas.
- **Importação/Exportação**: Suporte nativo para abrir e salvar arquivos no formato `.excalidraw` e carregar bibliotecas de elementos JSON (`.excalidrawlib`).

---

## 📋 Pré-requisitos
Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior) e **npm**
- **Android Studio** e SDK do Android (necessário para compilar o APK Android)
- **Java Development Kit (JDK 17+)** (necessário para build Android)

---

## 🛠️ Passo a Passo para Instalação e Execução

### 1. Instalar as Dependências
No terminal, na raiz do projeto, execute:
```bash
npm install
```

---

### 2. Rodar em Ambiente de Desenvolvimento (Web)
Para iniciar o servidor local de desenvolvimento Vite:
```bash
npm run dev
```
Acesse no seu navegador a URL exibida no terminal (geralmente `http://localhost:5173`).

---

### 3. Gerar Build para a Web
Para compilar a versão otimizada da aplicação Web:
```bash
npm run build:web
```
Os arquivos estáticos serão gerados no diretório `dist/`.

---

### 4. Gerar Build para Android (APK)

1. **Compilar e sincronizar o projeto com o Capacitor:**
   ```bash
   npm run build:android
   ```
   *Nota: Se for a primeira vez configurando o projeto Android, adicione a plataforma nativa rodando `npx cap add android` antes de executar a sincronização.*

2. **Abrir o projeto nativo no Android Studio:**
   ```bash
   npx cap open android
   ```

3. **Gerar o APK no Android Studio:**
   - No Android Studio, aguarde a indexação do Gradle terminar.
   - Vá no menu superior e selecione **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - O APK gerado estará disponível na pasta `android/app/build/outputs/apk/debug/app-debug.apk`.

---

### 5. Gerar Build para Windows Desktop (.exe)

Para gerar o executável nativo do Windows (.exe) utilizando Electron e electron-builder:
```bash
npm run build:windows
```
O arquivo de instalação `.exe` será gerado na pasta `dist-electron/`.

---

## 📁 Estrutura de Scripts (`package.json`)

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite |
| `npm run build:web` | Compila a aplicação Web estática em `dist/` |
| `npm run build:android` | Compila o projeto Web e sincroniza com o projeto Android (`cap sync`) |
| `npm run build:windows` | Compila o projeto Web e empacota o executável Windows (`electron-builder`) |

---

## 🛡️ Licença
Este projeto foi construído para fins demonstrativos e educacionais.
