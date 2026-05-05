export const CV_DATA = {
  profile: {
    name: "Матвей",
    surname: "Борисов",
    roles: ["Senior PM", "AI Architect", "ИИ-инженер"],
    status: "Открыт для предложений · Senior/Lead",
    quote: "Impact Engineering: проектирование LLM/RAG-систем, агентной оркестрации и автоматизации, напрямую влияющих на прибыль.",
    links: [
      { label: "Telegram", url: "https://t.me/MentalProtector" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/matvei-borisov-a0a4a5123/" }
    ]
  },
  experience: [
    {
      id: "now",
      company: "alfatapes",
      period: "2025 — н.в.",
      role: "Сооснователь & AI Engineer",
      desc: "Проектирование автономных ИИ-агентов, RAG-пайплайнов и LLM-оркестрации для автоматизации коммуникаций и бизнес-процессов. IT-консалтинг и быстрый запуск MVP.",
      tags: ["RAG", "LangGraph", "LLM"],
      theme: "c-cream",
      navLabel: "Сейчас",
      bentoDesc: "ИИ-агенты, RAG-пайплайны, IT-консалтинг и запуск MVP."
    },
    {
      id: "qugo",
      company: "Qugo",
      period: "2020 — 2024",
      role: "Project Manager / Product Delivery",
      desc: "Провёл продукт от сырого MVP до высоконагруженной системы с миллиардными оборотами. Масштабировал процессы и устранял технические затыки.",
      tags: ["Product Delivery", "Масштабирование", "Финтех"],
      theme: "c-green",
      navLabel: "Qugo",
      bentoTitle: "PM Qugo Fintech",
      bentoDesc: "Развитие процессов в условиях быстрого роста и реструктуризаций. Обеспечение высокого темпа поставки фич."
    },
    {
      id: "earlier",
      title: "Ранний опыт",
      period: "2016–2020",
      theme: "c-cream",
      navLabel: "Опыт",
      items: [
        {
          period: "2019–2020",
          role: "Менеджер международных проектов",
          company: "Axmit OÜ",
          desc: "Поставка 3 международных сервисов (США, Франция, Эстония)."
        },
        {
          period: "2018–2019",
          role: "Оптимизатор рекламы",
          company: "Adsterra",
          desc: "Оптимизация рекламных кампаний, работа с ClickHouse и NoSQL для анализа трафика."
        },
        {
          period: "2016–2017",
          role: "Медиабайер",
          company: "BigDealAgency",
          desc: "CPA-кампании, арбитраж трафика и техническая настройка пикселей/постбэков."
        }
      ]
    }
  ],
  competencies: {
    id: "comp",
    title: "Сильные стороны",
    navLabel: "Скиллы",
    theme: "c-slate",
    list: [
      { name: "Impact Engineering", desc: "Внедрение ИИ-решений, напрямую влияющих на выручку, операционные затраты и KPI бизнеса." },
      { name: "RAG и LLM-архитектура", desc: "Проектирование retrieval-пайплайнов с reranking, Qdrant, оценкой качества через RAGAS и агентной оркестрацией." },
      { name: "Масштабирование продуктов", desc: "Развитие MVP до систем с миллиардными оборотами и адаптация процессов под рост." },
      { name: "Стратегия на данных", desc: "Глубокая аналитика для поиска точек роста и формирования продуктового вектора." },
      { name: "Оптимизация систем", desc: "Перевод сложных монолитов на надежные микросервисы и современные стеки." },
      { name: "Техническое лидерство", desc: "Синхронизация бизнес-целей с реализацией: от бэкенда и данных до DevOps и AI-инфраструктуры." }
    ]
  },
  stack: {
    id: "stack",
    title: "Стек · Tools & Technologies",
    navLabel: "Стек",
    theme: "c-cream",
    footerNote: "Если нужной технологии нет в списке — быстро освою под проект.",
    categories: [
      {
        name: "ИИ и Данные",
        tools: ["Python", "LLM", "RAG", "LangGraph", "RAGAS", "Qdrant", "Cross-Encoder", "Reranking", "PyTorch", "Fine-tuning (learning)", "PostgreSQL", "Redis"]
      },
      {
        name: "Инфраструктура",
        tools: ["Next.js", "React Native", "Docker", "CI/CD", "Microservices", "RabbitMQ"]
      },
      {
        name: "Управление",
        tools: ["Agile / Scrum", "Kanban", "Jira / Confluence", "BPMN / UML", "MiniApps", "Product Analytics"]
      }
    ]
  }
};
