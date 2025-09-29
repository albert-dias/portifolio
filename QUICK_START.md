# 🚀 Quick Start Guide

## Configuração Rápida (5 minutos)

### 1. Adicionar Sua Foto
```bash
# Substitua o placeholder pela sua foto
cp /caminho/para/sua/foto.jpg images/profile.jpg
```

### 2. Atualizar Informações Pessoais
Edite `i18n/en.json` e `i18n/pt.json`:
- Nome, profissão, descrição
- Links de contato (GitHub, LinkedIn, email, WhatsApp)
- Experiências profissionais
- Habilidades

### 3. Adicionar Projetos
Edite `content/projects.en.json` e `content/projects.pt.json`:
- Título, descrição, tecnologias
- URLs do projeto e repositório
- Screenshots (adicione em `projects/`)

### 4. Configurar Formulário de Contato
**Opção A - Formspree (Recomendado)**:
1. Acesse [formspree.io](https://formspree.io)
2. Crie um formulário
3. No `scripts/main.js`, substitua `YOUR_FORM_ID` pelo ID do seu formulário

**Opção B - Email direto**:
No `index.html`, altere o `action` do formulário para `mailto:seu@email.com`

### 5. Deploy no GitHub Pages
```bash
# Inicializar repositório
git init
git add .
git commit -m "Initial commit"

# Conectar ao GitHub
git remote add origin https://github.com/SEU-USUARIO/portifolio.git
git branch -M main
git push -u origin main

# Configurar GitHub Pages
# Vá em Settings > Pages > Source: Deploy from a branch > main
```

## ✅ Checklist de Verificação

- [ ] Foto de perfil adicionada (`images/profile.jpg`)
- [ ] Informações pessoais atualizadas nos arquivos JSON
- [ ] Projetos adicionados com screenshots
- [ ] Links de contato atualizados
- [ ] Formulário de contato configurado
- [ ] Teste local funcionando
- [ ] Deploy no GitHub Pages ativo
- [ ] Teste em diferentes dispositivos

## 🎨 Personalização Rápida

### Cores
Edite `styles/tokens.css`:
```css
:root {
  --color-primary: #SUA_COR_PRINCIPAL;
  --color-accent: #SUA_COR_SECUNDARIA;
}
```

### Fontes
No `index.html`, altere as URLs do Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=SUA_FONTE:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## 🐛 Problemas Comuns

**Imagens não carregam**: Verifique se os caminhos estão corretos
**Traduções não funcionam**: Verifique se os arquivos JSON estão válidos
**Tema não persiste**: Limpe o localStorage e recarregue a página

## 📞 Precisa de Ajuda?

- Leia o [README.md](README.md) completo
- Abra uma issue no GitHub
- Entre em contato via email

---

**Tempo estimado de configuração: 5-10 minutos** ⏱️

