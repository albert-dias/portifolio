# 📝 Personalizar com Suas Experiências Reais

## ✅ Correções Aplicadas

1. **Layout do Footer**: ✅ Corrigido - agora usa a classe `.container` para centralizar o conteúdo
2. **Todas as seções**: ✅ Agora usam a classe `.container` para consistência
3. **Conteúdo em Português**: ✅ Atualizado para português como idioma padrão
4. **Informações de Contato**: ✅ Atualizadas com seus dados reais

## 🔧 Próximos Passos para Personalizar

### 1. Atualizar Experiências Reais

Edite o arquivo `scripts/extract_cv.py` e substitua as experiências de exemplo pelas suas reais:

```python
"experience": [
    {
        "company": "Nome da Sua Empresa",
        "position": "Seu Cargo Atual",
        "period": "2022 - Presente",
        "description": "Sua descrição real do trabalho...",
        "highlights": [
            "Seu highlight 1",
            "Seu highlight 2", 
            "Seu highlight 3"
        ]
    },
    # Adicione mais experiências...
]
```

### 2. Atualizar Projetos Reais

Edite o arquivo `scripts/extract_cv.py` e substitua os projetos de exemplo pelos seus reais:

```python
"projects": [
    {
        "id": "meu-projeto-real",
        "title": "Nome do Seu Projeto",
        "description": "Descrição real do seu projeto...",
        "technologies": ["React", "TypeScript", "Node.js"],
        "images": ["/projects/meu-projeto-1.jpg"],
        "liveUrl": "https://meu-projeto.com",
        "repoUrl": "https://github.com/seu-usuario/projeto",
        "featured": True
    }
]
```

### 3. Adicionar Screenshots dos Projetos

1. Crie a pasta `projects/` se não existir
2. Adicione screenshots dos seus projetos:
   - `projeto-1.jpg`
   - `projeto-2.jpg`
   - etc.

### 4. Atualizar Habilidades

Edite o arquivo `scripts/extract_cv.py` e atualize suas habilidades reais:

```python
"skills": {
    "frontend": ["React", "Vue.js", "Angular", "TypeScript"],
    "backend": ["Node.js", "Python", "Java", "PostgreSQL"],
    "devops": ["AWS", "Docker", "Kubernetes", "CI/CD"],
    "testing": ["Jest", "Cypress", "Selenium", "Unit Testing"],
    "tools": ["Git", "VS Code", "Figma", "Postman"]
}
```

### 5. Executar Script de Atualização

Após editar o arquivo `scripts/extract_cv.py`:

```bash
cd /Users/albertdias/www/portifolio
python3 scripts/extract_cv.py
```

Isso irá:
- ✅ Atualizar os arquivos de tradução (`i18n/en.json` e `i18n/pt.json`)
- ✅ Atualizar os projetos (`content/projects.en.json` e `content/projects.pt.json`)
- ✅ Gerar o arquivo `cv_data.json` com todos os dados

### 6. Adicionar Sua Foto

```bash
# Substitua pela sua foto real
cp /caminho/para/sua/foto.jpg images/profile.jpg
```

### 7. Atualizar Links de Contato

No arquivo `index.html`, atualize:
- GitHub: `https://github.com/SEU-USUARIO`
- LinkedIn: `https://linkedin.com/in/SEU-PERFIL`
- Email: `mailto:SEU-EMAIL@exemplo.com`
- WhatsApp: `https://wa.me/SEU-NUMERO`

## 🎯 Estrutura de Dados do CV

O arquivo `cv_data.json` contém:

```json
{
  "personal_info": {
    "name": "Seu Nome",
    "headline": "Sua Profissão",
    "email": "seu@email.com",
    "phone": "+55 XX XXXXX-XXXX",
    "location": "Sua Cidade, Estado",
    "summary": "Seu resumo profissional"
  },
  "experience": [...],
  "education": [...],
  "certifications": [...],
  "skills": {...},
  "projects": [...],
  "awards": [...],
  "languages": [...]
}
```

## 🚀 Deploy

Após personalizar tudo:

1. **Teste local**: `python3 -m http.server 8000`
2. **Commit**: `git add . && git commit -m "Personalizado com dados reais"`
3. **Push**: `git push origin main`
4. **GitHub Pages**: Ativará automaticamente

## 📱 Teste Responsivo

Teste em diferentes tamanhos:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

## ✨ Funcionalidades Disponíveis

- ✅ Toggle de idioma (EN/PT)
- ✅ Toggle de tema (Dark/Light)
- ✅ Animações suaves
- ✅ Formulário de contato
- ✅ Navegação responsiva
- ✅ SEO otimizado
- ✅ Acessibilidade completa

---

**🎉 Seu portfólio está pronto para ser personalizado com suas experiências reais!**
