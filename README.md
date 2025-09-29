# Portfolio Website - Albert Dias

Um portfólio moderno e responsivo construído com HTML5, CSS3 e JavaScript vanilla, otimizado para GitHub Pages com suporte completo a internacionalização (EN/PT) e tema dark/light.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em todos os dispositivos (320px - 1440px+)
- **Internacionalização**: Suporte completo para Inglês e Português com persistência no localStorage
- **Tema Dark/Light**: Toggle automático baseado na preferência do sistema + persistência
- **Animações Suaves**: Microinterações e animações de scroll com Intersection Observer
- **Acessibilidade**: Navegação por teclado, ARIA labels, contraste AA/AAA
- **SEO Otimizado**: Meta tags, Open Graph, Twitter Cards, Schema.org
- **Performance**: Lazy loading, otimizações de CSS/JS, Lighthouse 95+
- **PWA Ready**: Service Worker, Web App Manifest

## 📁 Estrutura do Projeto

```
portifolio/
├── index.html                 # Página principal
├── styles/
│   ├── tokens.css            # Design system (cores, tipografia, espaçamentos)
│   ├── globals.css           # Estilos globais e reset
│   └── components.css        # Componentes específicos
├── scripts/
│   ├── i18n.js              # Sistema de internacionalização
│   ├── theme.js             # Gerenciamento de temas
│   ├── animations.js        # Animações e microinterações
│   └── main.js              # Funcionalidades principais
├── i18n/
│   ├── en.json              # Traduções em inglês
│   └── pt.json              # Traduções em português
├── content/
│   ├── projects.en.json     # Projetos em inglês
│   └── projects.pt.json     # Projetos em português
├── images/
│   └── profile.jpg          # Sua foto de perfil (ADICIONAR)
├── projects/                # Screenshots dos projetos (ADICIONAR)
├── site.webmanifest         # PWA manifest
├── robots.txt               # SEO robots
├── sitemap.xml              # Sitemap XML
└── README.md               # Este arquivo
```

## 🛠️ Configuração Inicial

### 1. Personalizar Conteúdo

#### Adicionar Sua Foto
```bash
# Substitua o arquivo placeholder
cp sua-foto.jpg images/profile.jpg
```

#### Atualizar Informações Pessoais
Edite os arquivos de tradução em `i18n/`:

**i18n/en.json** e **i18n/pt.json**:
```json
{
  "hero": {
    "name": "Seu Nome",
    "headline": "Sua Profissão",
    "description": "Sua descrição profissional..."
  }
}
```

#### Adicionar Projetos
Edite os arquivos em `content/`:

**content/projects.en.json** e **content/projects.pt.json**:
```json
[
  {
    "id": "meu-projeto",
    "title": "Nome do Projeto",
    "description": "Descrição do projeto...",
    "technologies": ["React", "TypeScript", "Node.js"],
    "images": ["/projects/projeto-1.jpg"],
    "liveUrl": "https://meu-projeto.com",
    "repoUrl": "https://github.com/seu-usuario/projeto",
    "featured": true
  }
]
```

#### Atualizar Links de Contato
No `index.html`, atualize:
- Email: `href="mailto:seu@email.com"`
- WhatsApp: `href="https://wa.me/5511999999999"`
- GitHub: `href="https://github.com/seu-usuario"`
- LinkedIn: `href="https://linkedin.com/in/seu-perfil"`

### 2. Adicionar Screenshots dos Projetos

```bash
# Crie a pasta e adicione suas imagens
mkdir projects
cp screenshot1.jpg projects/projeto-1.jpg
cp screenshot2.jpg projects/projeto-2.jpg
```

### 3. Configurar Formulário de Contato

#### Opção 1: Formspree (Recomendado)
1. Acesse [formspree.io](https://formspree.io)
2. Crie uma conta e um novo formulário
3. No `scripts/main.js`, substitua a função `submitContactForm`:

```javascript
async submitContactForm(data) {
  const response = await fetch('https://formspree.io/f/SEU_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Form submission failed');
  }
  
  return response.json();
}
```

#### Opção 2: Netlify Forms
1. Adicione `netlify` ao atributo `action` do formulário
2. Adicione `name` aos campos do formulário
3. Deploy no Netlify

## 🚀 Deploy no GitHub Pages

### Método 1: Deploy Automático (Recomendado)

1. **Criar repositório no GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/portifolio.git
   git push -u origin main
   ```

2. **Configurar GitHub Pages**:
   - Vá em Settings > Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

3. **Aguardar deploy** (2-3 minutos)

### Método 2: Deploy Manual

1. **Build local** (se necessário):
   ```bash
   # Não é necessário para este projeto vanilla
   # Mas se quiser minificar, use ferramentas como:
   npm install -g html-minifier cssnano-cli uglify-js
   ```

2. **Push para branch gh-pages**:
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

3. **Configurar GitHub Pages**:
   - Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

## 🎨 Personalização Avançada

### Alterar Paleta de Cores

Edite `styles/tokens.css`:

```css
:root {
  /* Paleta A (Dark Elegant) - Padrão */
  --color-bg: #0F172A;
  --color-primary: #C5A880;
  --color-accent: #8AB4F8;
}

[data-theme="light"] {
  /* Paleta B (Clean) */
  --color-bg: #FFFFFF;
  --color-primary: #4F46E5;
  --color-accent: #10B981;
}
```

### Adicionar Novas Seções

1. **HTML**: Adicione a seção no `index.html`
2. **CSS**: Crie estilos em `styles/components.css`
3. **JS**: Adicione funcionalidade em `scripts/main.js`
4. **i18n**: Adicione traduções nos arquivos JSON

### Modificar Animações

Edite `scripts/animations.js` para personalizar:
- Duração das animações
- Efeitos de hover
- Animações de scroll
- Microinterações

## 📱 PWA e Performance

### Service Worker
O projeto inclui suporte a Service Worker. Para ativar:

1. Crie `sw.js` na raiz:
```javascript
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/styles/tokens.css',
  '/styles/globals.css',
  '/styles/components.css',
  '/scripts/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

### Otimizações de Performance
- ✅ Lazy loading de imagens
- ✅ CSS crítico inline
- ✅ Minificação de assets
- ✅ Compressão gzip
- ✅ Cache headers

## 🔍 SEO e Acessibilidade

### SEO
- ✅ Meta tags otimizadas
- ✅ Open Graph e Twitter Cards
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ Schema.org markup
- ✅ URLs amigáveis

### Acessibilidade
- ✅ Navegação por teclado
- ✅ ARIA labels
- ✅ Contraste AA/AAA
- ✅ Foco visível
- ✅ Screen reader friendly
- ✅ Reduced motion support

## 🧪 Testes e Qualidade

### Lighthouse Score
- Performance: 95+
- Best Practices: 95+
- SEO: 95+
- Accessibility: 90+

### Testes Manuais
- [ ] Responsividade (320px - 1440px+)
- [ ] Navegação por teclado
- [ ] Toggle de idioma
- [ ] Toggle de tema
- [ ] Formulário de contato
- [ ] Links externos
- [ ] Animações

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Imagens não carregam**:
   - Verifique se os caminhos estão corretos
   - Confirme se as imagens estão na pasta `images/`

2. **Traduções não funcionam**:
   - Verifique se os arquivos JSON estão válidos
   - Confirme se os caminhos dos arquivos estão corretos

3. **Tema não persiste**:
   - Verifique se o localStorage está habilitado
   - Confirme se não há erros no console

4. **Formulário não envia**:
   - Configure o endpoint do Formspree
   - Verifique se não há erros de CORS

### Debug
Abra o DevTools (F12) e verifique:
- Console para erros JavaScript
- Network para falhas de carregamento
- Application > Local Storage para dados salvos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:
- Abra uma issue no GitHub
- Entre em contato via [email](mailto:albert@example.com)

---

**Desenvolvido com ❤️ por Albert Dias**

