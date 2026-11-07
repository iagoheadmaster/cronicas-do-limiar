# Crônicas do Limiar // Neon

RPG de vida real com estética cyberpunk. Uma campanha individual, aberta ao público para jogar no navegador, com missões do cotidiano, experiência (XP), níveis, classes, moedas fictícias, conquistas e batalhas com D20.

## Como jogar

1. Abra o jogo no navegador.
2. Siga o tutorial interativo de 7 etapas que aparece na primeira visita.
3. Escolha um nome e uma classe no perfil.
4. Registre ações reais na Central de Missões.
5. Ganhe XP, suba de nível, resgate desafios e enfrente os chefes simbólicos.
6. Consulte **Como jogar** para rever o tutorial.

O jogo contempla rotinas de trabalho, estudo, busca de oportunidades, autocuidado, amizades e hobbies. Não pune dias sem atividade.

## Arquivos

- `index.html`: página principal
- `styles.css`: aparência visual
- `app.js`: motor de jogo, regras e tutorial
- `manifest.webmanifest`: metadados do aplicativo web
- `sw.js`: cache para operação offline
- `icons/icon.svg`: ícone vetorial

## Privacidade e segurança

O site é estático: não tem contas, banco de dados nem API própria. O progresso e o diário são armazenados no navegador de cada jogador por `localStorage`; não são sincronizados entre pessoas e dispositivos. O projeto não carrega bibliotecas externas nem faz requisições de dados pessoais. A hospedagem pode manter registros técnicos de acesso. Evite incluir informações sensíveis no diário ou compartilhar arquivos de backup contendo relatos pessoais.

A importação de saves deve ser feita somente com arquivos de origem confiável.

## Publicar e atualizar no Netlify

**Importante:** conectar este repositório deve ser feito no projeto existente, para preservar o URL público.

1. No Netlify, abra o projeto que já usa `https://gleaming-fudge-828c6a.netlify.app/`.
2. Procure a área de configuração de build/deploy e a opção de conectar o repositório Git (os nomes podem variar).
3. Conecte o GitHub `iagoheadmaster/cronicas-do-limiar` na branch `main`.
4. Como é um site estático, a pasta publicada é a raiz (`.`) e não há comando de build obrigatório.
5. Revise a configuração, autorize a integração e acompanhe o primeiro deploy.
6. Teste em aba anônima e num celular antes de convidar mais pessoas.

Depois da conexão, novos commits na branch de publicação podem gerar deploy automático. O mesmo URL público é mantido ao usar o projeto Netlify existente. Se uma atualização estrutural mudar o formato do save, será necessária uma migração para preservar o progresso.

## Limites atuais

O jogo é single-player, embora qualquer pessoa possa acessar o link. Não existe ranking compartilhado, autenticação ou sincronização entre dispositivos. O jogo usa a hora e o armazenamento do navegador, então não deve ser tratado como plataforma competitiva antifraude.
