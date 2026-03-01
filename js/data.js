export const CV_DATA = {
  profile: {
    name: "Матвей",
    surname: "Борисов",
    roles: ["Senior PM", "AI Architect", "Продуктовый аналитик"],
    status: "Открыт для предложений · Senior/Lead",
    quote: "Impact Engineering: проектирование ИИ-решений и автоматизации, напрямую влияющих на прибыль.",
    links: [
      { label: "Telegram", url: "https://t.me/MentalProtector" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/matvei-borisov-a0a4a5123/" }
    ]
  },
  experience: [
    {
      id: "now",
      company: "Alfatapes",
      period: "2025 — н.в.",
      role: "Cofounder & AI Automation Lead",
      desc: "Проектирование автономных ИИ-агентов для CRM и контента. IT-консалтинг и запуск MVP для сторонних заказчиков.",
      tags: ["ИИ-оркестрация", "Python", "LLM", "Consulting"],
      theme: "c-cream",
      navLabel: "Сейчас"
    },
    {
      id: "qugo",
      company: "Qugo",
      period: "2020 — 2024",
      role: "Project Manager / Product Delivery",
      desc: "Провёл продукт от сырого MVP до высоконагруженной системы с миллиардными оборотами. Масштабировал процессы и устранял технические затыки.",
      details: [
        { title: "Process Evolution", text: "Развитие продуктовых процессов в условиях 5-кратного роста штата и регулярных структурных изменений." },
        { title: "Delivery Excellence", text: "Сохранение высокого темпа поставки фич при переходе продукта от MVP к сложной высоконагруженной системе." }
      ],
      tags: ["Product Delivery", "Масштабирование", "Финтех"],
      theme: "c-green",
      navLabel: "Qugo"
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
          role: "International PM",
          company: "Axmit OÜ",
          desc: "Поставка 3 международных сервисов (США, Франция, Эстония)."
        },
        {
          period: "2018–2019",
          role: "Ad Optimizer",
          company: "Adsterra",
          desc: "Оптимизация рекламных кампаний, работа с ClickHouse и NoSQL для анализа трафика."
        },
        {
          period: "2016–2017",
          role: "Affiliate Manager",
          company: "Big Deal Agency",
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
      { name: "Impact Engineering", desc: "Внедрение ИИ-решений, напрямую влияющих на выручку и KPI бизнеса." },
      { name: "AI & Agent Architecture", desc: "Проектирование автономных мультиагентных систем и LLM-пайплайнов." },
      { name: "Product Delivery & Scaling", desc: "Масштабирование MVP до систем с миллиардными оборотами. Адаптация процессов под рост команды." },
      { name: "Data-Driven Strategy", desc: "Аналитика и дашборды чтобы понять что происходит с бизнесом и сформировать продуктовый вектор." },
      { name: "System Optimization", desc: "Переход с монолита на микросервисы (Redis, RabbitMQ, шардирование)." },
      { name: "Technical Leadership", desc: "Связка бизнес-целей с технической реализацией: Backend, Frontend, QA, DevOps." }
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
        name: "AI & Data",
        tools: ["Python", "LLM Frameworks", "Agentic Workflows", "PyTorch", "PostgreSQL", "Redis"]
      },
      {
        name: "Web & Infra",
        tools: ["Next.js", "React Native", "Docker", "CI/CD", "Microservices", "RabbitMQ"]
      },
      {
        name: "Product / Analytics",
        tools: ["Agile / Scrum / Kanban", "Jira / Confluence", "BPMN", "UML", "MiniApps", "Product Analytics"]
      }
    ]
  }
};
