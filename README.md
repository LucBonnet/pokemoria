# pokemoria

Jogo da memória com tema do Pokémon e classificação dos melhores jogadores por tempo.

## **📦 - Instalação**

```bash
git clone https://github.com/LucBonnet/pokemoria.git

cd pokemoria

npm install
```

## **💻 - Tecnologias**

- React Native
- Expo
- Firebase

## **🔨 - Uso**

### Configurações Iniciais

Primeiro, você precisa ter o <kbd>[NodeJS](https://nodejs.org/en/download/)</kbd> instalado na sua máquina.

Após ter o **Node** instalado, instale as dependências do **React e React Native (Expo)** de forma global, utilizando os comandos:

```bash
npm install -g expo-cli
```

Você precisa criar uma pasta na raiz do projeto com o nome config e dentro um arquivo chamado config.js com as informações do firebase.

Exemplo:

```js
import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
```

Iniciar:

```bash
npm start
```

Agora, abra o aplicativo do expo e faça o scan do QRCode, certifique-se que o seu celular e o seu computador estão na mesma rede.

Ou utilize um emulador de sua preferencia.

<div align="center">
  <img src="https://raw.githubusercontent.com/LucBonnet/pokemoria/main/docs/banner.png" />
</div>
