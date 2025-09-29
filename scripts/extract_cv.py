#!/usr/bin/env python3
"""
Script para extrair informações do CV PDF e converter para JSON
"""

import json
import re
from pathlib import Path

def extract_cv_info():
    """
    Extrai informações do CV PDF (simulado - você precisará ajustar com base no conteúdo real)
    """
    
    # Como não posso ler o PDF diretamente, vou criar um template baseado no que seria esperado
    # Você pode ajustar estas informações com base no seu CV real
    
    cv_data = {
        "personal_info": {
            "name": "Albert A. Dias",
            "headline": "Analista Desenvolvedor Sênior - React & React Native",
            "email": "dias.albertdias@gmail.com",
            "phone": "+55 84 99231-3523",
            "location": "Parnamirim, RN, Brasil",
            "summary": "Analista Desenvolvedor Sênior com mais de 10 anos de experiência em desenvolvimento mobile e web. Especializado em React, React Native, TypeScript e Node.js, com atuação em projetos de médio e grande porte para empresas como Volvo, Sicredi, Caixa Consórcio e Natura & Co."
        },
        "experience": [
            {
                "company": "Topaz Technology",
                "position": "Analista Desenvolvedor Sênior - React, React Native",
                "period": "Nov 2023 - Presente",
                "location": "São José do Rio Preto, BR (Remote)",
                "description": "Atuação no desenvolvimento de aplicativos mobile com React Native, criação de módulos e portais de vendas, além da sustentação de aplicações existentes. Apoio contínuo à equipe para garantir entregas pontuais e com alto padrão de qualidade. Passei por clientes como Volvo, Sicredi e atualmente alocado no time da Caixa Consórcio.",
                "technologies": ["React", "React Native", "Javascript", "TypeScript"],
                "highlights": [
                    "Desenvolvimento de aplicativos mobile para clientes como Volvo, Sicredi e Caixa Consórcio",
                    "Criação de módulos e portais de vendas com React Native",
                    "Sustentação de aplicações existentes com alto padrão de qualidade"
                ]
            },
            {
                "company": "Youhull",
                "position": "Analista Desenvolvedor - React Native",
                "period": "Jan 2021 - Jul 2025",
                "location": "Brasília, BR (Remote)",
                "description": "Desenvolvimento de aplicativos de clubes de vantagens, integrações com SSOs privados, google maps, check ins por geolocalização, atuando com um whitelabel para mais de 100 aplicativos. CI/CD desses aplicativos.",
                "technologies": ["React Native", "TypeScript", "Javascript"],
                "highlights": [
                    "Desenvolvimento de whitelabel para mais de 100 aplicativos",
                    "Integrações com SSOs privados e Google Maps",
                    "Implementação de check-ins por geolocalização"
                ]
            },
            {
                "company": "Compass Uol",
                "position": "Analista Desenvolvedor Pleno - React, React Native",
                "period": "Mar 2023 - Nov 2023",
                "location": "Passo Fundo, BR (Remote)",
                "description": "Desenvolvimento de novas funcionalidades para o cliente Natura & Co, com foco no módulo financeiro da aplicação web e do aplicativo mobile, garantindo performance, usabilidade e manutenção da base de código.",
                "technologies": ["React", "React Native", "TypeScript", "Javascript"],
                "highlights": [
                    "Refatoração do módulo financeiro do aplicativo da Natura & Co",
                    "Desenvolvimento de funcionalidades para milhares de usuários",
                    "Garantia de performance e usabilidade"
                ]
            },
            {
                "company": "Corpstek Technology",
                "position": "Analista Desenvolvedor Full Stack - React, React Native, Node",
                "period": "Mar 2021 - Mar 2023",
                "location": "Natal, BR",
                "description": "Atuação no desenvolvimento de aplicativos mobile e websites, com participação em atividades de DevOps utilizando AWS e Node.js. Liderança técnica de uma equipe com 6 desenvolvedores, promovendo boas práticas, alinhamento técnico e entregas de alta qualidade.",
                "technologies": ["Javascript", "React", "React Native", "Node", "AWS-S3", "AWS-EC2", "Postgres", "Mysql", "TypeORM", "Socket.io"],
                "highlights": [
                    "Liderança técnica de equipe com 6 desenvolvedores",
                    "Atividades de DevOps utilizando AWS",
                    "Promoção de boas práticas e alinhamento técnico"
                ]
            },
            {
                "company": "Freelancer",
                "position": "Analista Desenvolvedor Full Stack",
                "period": "Mar 2018 - Mar 2021",
                "location": "Natal, BR",
                "description": "Desenvolvimento de sistemas de gestão para diferentes segmentos, como academias, lava-rápidos e salgaterias. Criação de sites institucionais e sistemas personalizados, com foco em automação de processos e experiência do usuário.",
                "technologies": ["Javascript", "React", "React Native", "Node", "Postgres", "Mysql", "TypeORM", "Socket.io"],
                "highlights": [
                    "Desenvolvimento de sistemas de gestão para diversos segmentos",
                    "Criação de sites institucionais e sistemas personalizados",
                    "Foco em automação de processos e UX"
                ]
            },
            {
                "company": "Velty",
                "position": "Desenvolvedor Front End",
                "period": "Mar 2012 - Nov 2016",
                "location": "Natal, BR",
                "description": "Desenvolvimento de site e integração com o framework proprietário da empresa, garantindo compatibilidade e performance.",
                "technologies": ["HTML", "CSS", "PHP", "Javascript"],
                "highlights": [
                    "Desenvolvimento de sites institucionais",
                    "Integração com framework proprietário",
                    "Garantia de compatibilidade e performance"
                ]
            }
        ],
        "education": [
            {
                "institution": "Estácio",
                "degree": "Análise e desenvolvimento de software",
                "period": "Jan 2022 - Set 2025",
                "description": "Formação em análise e desenvolvimento de sistemas"
            },
            {
                "institution": "Universidade Federal do Tocantins",
                "degree": "Ciências da computação",
                "period": "Jan 2007 - Set 2010",
                "description": "Formação em ciências da computação"
            }
        ],
        "certifications": [
            {
                "name": "Rocketseat Ignite 2024",
                "issuer": "Rocketseat",
                "date": "Jan 2022 - Dec 2022",
                "description": "Programa de especialização em desenvolvimento full-stack"
            },
            {
                "name": "Rocketseat Ignite 2022",
                "issuer": "Rocketseat",
                "date": "Jan 2022 - Dec 2022",
                "description": "Programa de especialização em desenvolvimento full-stack"
            },
            {
                "name": "Rocketseat GoStack 2020",
                "issuer": "Rocketseat",
                "date": "Jan 2020 - Dec 2020",
                "description": "Programa de especialização em desenvolvimento full-stack"
            }
        ],
        "skills": {
            "frontend": ["React", "React Native", "TypeScript", "Javascript", "HTML", "CSS"],
            "backend": ["Node.js", "Express", "PostgreSQL", "MySQL", "TypeORM", "Prisma.io"],
            "devops": ["AWS-S3", "AWS-EC2", "CI/CD", "Socket.io"],
            "mobile": ["React Native", "Geolocalização", "Google Maps", "SSO"],
            "tools": ["Git", "VS Code", "Postman", "Figma"]
        },
        "projects": [
            {
                "id": "getap",
                "title": "GETAP",
                "description": "Plataforma de gerenciamento de colheita de milho e sorgo.",
                "technologies": ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Zustand"],
                "images": ["/projects/getap-1.jpg"],
                "liveUrl": "https://app.getap.agr.br",
                "repoUrl": "#",
                "featured": True
            },
            {
                "id": "aprender-capacitar",
                "title": "Aprender e Capacitar Brasil",
                "description": "Plataforma de gerenciamento de eventos e cursos para servidores públicos.",
                "technologies": ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Zustand"],
                "images": ["/projects/aprender-1.jpg"],
                "liveUrl": "https://aprenderecapacitarbrasil.com.br",
                "repoUrl": "#",
                "featured": True
            },
            {
                "id": "wendell-passeios",
                "title": "Wendell Passeios",
                "description": "Plataforma de gerenciamento de passeios em Fernando de Noronha.",
                "technologies": ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Zustand"],
                "images": ["/projects/wendell-1.jpg"],
                "liveUrl": "https://www.wendellpasseios.com.br",
                "repoUrl": "#",
                "featured": True
            },
            {
                "id": "yazon-tech",
                "title": "Yazon Tech Solutions",
                "description": "Site da Yazon Tech Solutions.",
                "technologies": ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Zustand"],
                "images": ["/projects/yazon-1.jpg"],
                "liveUrl": "https://yazon.com.br/",
                "repoUrl": "#",
                "featured": True
            },
            {
                "id": "youhull",
                "title": "Youhull",
                "description": "Desenvolvimento de aplicativos de clubes de vantagens, integrações com SSOs privados, google maps, check ins por geolocalização, atuando com um whitelabel para mais de 100 aplicativos. CI/CD desses aplicativos.",
                "technologies": ["React Native", "TypeScript", "Zustand"],
                "images": ["/projects/youhull-1.jpg"],
                "liveUrl": "https://youhuul.com.br/",
                "repoUrl": "#",
                "featured": True
            }
        ],
        "awards": [
            {
                "name": "Desenvolvimento e Liderança no B2B migração da plataforma kki.autonorte.com.br",
                "issuer": "Corpstek Technology",
                "date": "2021-2023",
                "description": "Liderança técnica na migração completa da plataforma B2B"
            },
            {
                "name": "Serviço de check-in via geolocalização para o app Uzeh",
                "issuer": "Freelancer",
                "date": "2018-2021",
                "description": "Desenvolvimento inovador de sistema de geolocalização para coleta de resíduos"
            },
            {
                "name": "Refatoração do módulo financeiro do aplicativo da Natura & Co",
                "issuer": "Compass Uol",
                "date": "2023",
                "description": "Refatoração crítica utilizada diariamente por milhares de usuários"
            },
            {
                "name": "Módulo de consórcio para o app do banco Volvo",
                "issuer": "Topaz Technology",
                "date": "2023-2024",
                "description": "Desenvolvimento de módulo completo de consórcio em React Native"
            }
        ],
        "languages": [
            {"name": "Português", "level": "Nativo"},
            {"name": "Inglês", "level": "Intermediário"},
            {"name": "Espanhol", "level": "Intermediário"}
        ]
    }
    
    return cv_data

def save_cv_data():
    """Salva os dados do CV em arquivos JSON"""
    
    cv_data = extract_cv_info()
    
    # Salvar dados completos
    with open('cv_data.json', 'w', encoding='utf-8') as f:
        json.dump(cv_data, f, ensure_ascii=False, indent=2)
    
    # Atualizar arquivos de tradução
    update_translations(cv_data)
    
    # Atualizar projetos
    update_projects(cv_data)
    
    print("✅ Dados do CV extraídos e salvos com sucesso!")
    print("📁 Arquivos criados:")
    print("   - cv_data.json (dados completos)")
    print("   - i18n/en.json (atualizado)")
    print("   - i18n/pt.json (atualizado)")
    print("   - content/projects.en.json (atualizado)")
    print("   - content/projects.pt.json (atualizado)")

def update_translations(cv_data):
    """Atualiza os arquivos de tradução com dados reais do CV"""
    
    # Dados em inglês
    en_data = {
        "nav": {
            "logo": cv_data["personal_info"]["name"],
            "home": "Home",
            "about": "About",
            "experience": "Experience",
            "projects": "Projects",
            "skills": "Skills",
            "contact": "Contact"
        },
        "hero": {
            "name": cv_data["personal_info"]["name"],
            "headline": cv_data["personal_info"]["headline"],
            "description": cv_data["personal_info"]["summary"],
            "downloadCv": "Download CV",
            "contact": "Get in Touch"
        },
        "about": {
            "title": "About Me",
            "description": cv_data["personal_info"]["summary"],
            "passion": "I love turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.",
            "techStack": "Tech Stack"
        },
        "experience": {
            "title": "Experience",
            "current": {
                "description": cv_data["experience"][0]["description"],
                "highlight1": cv_data["experience"][0]["highlights"][0],
                "highlight2": cv_data["experience"][0]["highlights"][1],
                "highlight3": cv_data["experience"][0]["highlights"][2]
            },
            "previous": {
                "description": cv_data["experience"][1]["description"],
                "highlight1": cv_data["experience"][1]["highlights"][0],
                "highlight2": cv_data["experience"][1]["highlights"][1],
                "highlight3": cv_data["experience"][1]["highlights"][2]
            }
        },
        "projects": {
            "title": "Featured Projects",
            "viewLive": "View Live",
            "viewRepo": "View Repo"
        },
        "skills": {
            "title": "Skills",
            "frontend": "Frontend",
            "backend": "Backend",
            "devops": "DevOps",
            "testing": "Testing",
            "data": "Data",
            "tools": "Tools"
        },
        "contact": {
            "title": "Get In Touch",
            "info": {
                "title": "Let's work together",
                "description": "I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to collaborate!"
            },
            "form": {
                "name": "Name",
                "email": "Email",
                "subject": "Subject",
                "message": "Message",
                "submit": "Send Message",
                "success": "Message sent successfully!",
                "error": "Failed to send message. Please try again."
            }
        },
        "footer": {
            "rights": "All rights reserved.",
            "source": "View Source"
        }
    }
    
    # Dados em português
    pt_data = {
        "nav": {
            "logo": cv_data["personal_info"]["name"],
            "home": "Início",
            "about": "Sobre",
            "experience": "Experiência",
            "projects": "Projetos",
            "skills": "Habilidades",
            "contact": "Contato"
        },
        "hero": {
            "name": cv_data["personal_info"]["name"],
            "headline": cv_data["personal_info"]["headline"],
            "description": cv_data["personal_info"]["summary"],
            "downloadCv": "Baixar CV",
            "contact": "Entre em Contato"
        },
        "about": {
            "title": "Sobre Mim",
            "description": cv_data["personal_info"]["summary"],
            "passion": "Adoro transformar problemas complexos em soluções simples, bonitas e intuitivas. Quando não estou programando, você pode me encontrar explorando novas tecnologias, contribuindo para projetos open source ou compartilhando conhecimento com a comunidade de desenvolvedores.",
            "techStack": "Stack Tecnológico"
        },
        "experience": {
            "title": "Experiência",
            "current": {
                "description": cv_data["experience"][0]["description"],
                "highlight1": cv_data["experience"][0]["highlights"][0],
                "highlight2": cv_data["experience"][0]["highlights"][1],
                "highlight3": cv_data["experience"][0]["highlights"][2]
            },
            "previous": {
                "description": cv_data["experience"][1]["description"],
                "highlight1": cv_data["experience"][1]["highlights"][0],
                "highlight2": cv_data["experience"][1]["highlights"][1],
                "highlight3": cv_data["experience"][1]["highlights"][2]
            }
        },
        "projects": {
            "title": "Projetos em Destaque",
            "viewLive": "Ver Online",
            "viewRepo": "Ver Repositório"
        },
        "skills": {
            "title": "Habilidades",
            "frontend": "Frontend",
            "backend": "Backend",
            "devops": "DevOps",
            "testing": "Testes",
            "data": "Dados",
            "tools": "Ferramentas"
        },
        "contact": {
            "title": "Entre em Contato",
            "info": {
                "title": "Vamos trabalhar juntos",
                "description": "Estou sempre interessado em novas oportunidades e projetos emocionantes. Sinta-se à vontade para entrar em contato se quiser colaborar!"
            },
            "form": {
                "name": "Nome",
                "email": "Email",
                "subject": "Assunto",
                "message": "Mensagem",
                "submit": "Enviar Mensagem",
                "success": "Mensagem enviada com sucesso!",
                "error": "Falha ao enviar mensagem. Tente novamente."
            }
        },
        "footer": {
            "rights": "Todos os direitos reservados.",
            "source": "Ver Código Fonte"
        }
    }
    
    # Salvar arquivos de tradução
    with open('i18n/en.json', 'w', encoding='utf-8') as f:
        json.dump(en_data, f, ensure_ascii=False, indent=2)
    
    with open('i18n/pt.json', 'w', encoding='utf-8') as f:
        json.dump(pt_data, f, ensure_ascii=False, indent=2)

def update_projects(cv_data):
    """Atualiza os arquivos de projetos com dados reais do CV"""
    
    # Projetos em inglês
    en_projects = []
    for project in cv_data["projects"]:
        en_projects.append({
            "id": project["id"],
            "title": project["title"],
            "description": project["description"],
            "technologies": project["technologies"],
            "images": project["images"],
            "liveUrl": project["liveUrl"],
            "repoUrl": project["repoUrl"],
            "featured": project["featured"]
        })
    
    # Projetos em português (mesmo conteúdo, mas com títulos traduzidos)
    pt_projects = []
    for project in cv_data["projects"]:
        pt_title = project["title"]
        if project["id"] == "ecommerce-platform":
            pt_title = "Plataforma E-commerce"
        elif project["id"] == "task-management-app":
            pt_title = "App de Gerenciamento de Tarefas"
        
        pt_projects.append({
            "id": project["id"],
            "title": pt_title,
            "description": project["description"],
            "technologies": project["technologies"],
            "images": project["images"],
            "liveUrl": project["liveUrl"],
            "repoUrl": project["repoUrl"],
            "featured": project["featured"]
        })
    
    # Salvar arquivos de projetos
    with open('content/projects.en.json', 'w', encoding='utf-8') as f:
        json.dump(en_projects, f, ensure_ascii=False, indent=2)
    
    with open('content/projects.pt.json', 'w', encoding='utf-8') as f:
        json.dump(pt_projects, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    save_cv_data()
