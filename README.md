# Kindness Atlas™ · Atlas da Bondade — Landing Page

Landing page estática (HTML + CSS + JavaScript puro). Não precisa de instalação, build, npm ou servidor.

## Estrutura de pastas

```
kindness-atlas/
├── index.html        → página completa (17 seções)
├── styles.css        → todo o visual (mobile first)
├── script.js         → interações, idioma PT/EN, Lista de Desejo (Formspree)
├── .nojekyll         → evita processamento extra no GitHub Pages
├── README.md         → este arquivo
└── assets/
    ├── favicon.svg   → ícone da aba do navegador
    ├── logo.svg      → logotipo com nome
    └── og-image.svg  → imagem de compartilhamento (placeholder)
```

## Testar no computador

Dê dois cliques em `index.html`. Pronto — a página abre no navegador.

## Publicar no GitHub Pages (passo a passo)

1. Acesse https://github.com e faça login (ou crie uma conta gratuita).
2. Clique no botão **+** (canto superior direito) → **New repository**.
3. Dê um nome, por exemplo `kindness-atlas`, deixe como **Public** e clique em **Create repository**.
4. Na página do repositório, clique em **uploading an existing file** (ou **Add file → Upload files**).
5. Arraste **todo o conteúdo** desta pasta (`index.html`, `styles.css`, `script.js`, a pasta `assets` e o arquivo `.nojekyll`).
   - Importante: o `index.html` deve ficar na raiz do repositório, não dentro de outra pasta.
6. Clique em **Commit changes**.
7. Vá em **Settings → Pages**.
8. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
9. Em **Branch**, selecione **main** e a pasta **/ (root)**. Clique em **Save**.
10. Aguarde 1 a 2 minutos e atualize a página. O endereço aparecerá no topo, no formato:
    `https://SEU-USUARIO.github.io/kindness-atlas/`

Para atualizar o site depois, basta enviar os arquivos novamente (Add file → Upload files) e confirmar.

## Recursos

- Idiomas: Português (Brasil) e Inglês (EUA), com botão PT/EN no topo. A escolha fica salva no navegador.
- Botões "Baixar Aplicativo" e "Entrar na Lista de Desejo" abrem um modal. O e-mail é enviado para o **Formspree**, que entrega as inscrições no seu e-mail e no painel dele. O site continua 100% estático, sem backend.

## Ativar a Lista de Desejo (Formspree) — 5 minutos

1. Acesse https://formspree.io e crie uma conta gratuita.
2. Clique em **+ New Form**, dê um nome (ex.: "Lista de Desejo") e informe o e-mail que vai receber as inscrições.
3. Copie o endereço do formulário, no formato `https://formspree.io/f/abcdwxyz`.
4. Abra o `index.html`, procure por `formspree.io/f/` e troque o ID, se quiser usar outro formulário. O ID atual é `xljjdryq`. Exemplo:
   `action="https://formspree.io/f/abcdwxyz"`
5. Envie o `index.html` atualizado ao GitHub. Pronto.
6. Na primeira inscrição, o Formspree pode pedir para você confirmar o formulário pelo e-mail.

Campos enviados: `email`, `platform` (android), `language` (pt-BR/en-US), `source` (botão de origem). Há um campo oculto anti-spam (`_gotcha`).
Enquanto o ID não for configurado, as inscrições ficam salvas apenas no navegador do visitante (localStorage).
- Rolagem suave com Lenis (carregado por CDN). Sem internet, a página continua funcionando com rolagem normal.
- Fontes Poppins e Inter via Google Fonts.
- Respeita a preferência "reduzir movimento" do sistema.

## Personalizar

- Textos em português: edite direto no `index.html`.
- Textos em inglês: edite o objeto `EN` no início do `script.js` (cada chave corresponde ao atributo `data-i18n` do HTML).
- Cores: variáveis no topo do `styles.css` (`--blue`, `--green`, `--gold`, `--bg`).

Conteúdos de notícias, arquivo e mapa são ilustrativos.
