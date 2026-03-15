/* global topojson */
/* ╔══════════════════════════════════════════════════╗
   ║  РЕДАКТИРУЕМЫЕ ДАННЫЕ — МЕНЯЙТЕ ЗДЕСЬ!         ║
   ╠══════════════════════════════════════════════════╣
   ║  Все графики и таблицы автоматически обновятся   ║
   ╚══════════════════════════════════════════════════╝ */

// === НОВОСТИ: ДОБАВЛЯЙТЕ СЮДА ===
// Формат: { title: "Заголовок", date: "ДД.ММ.ГГГГ", category: "Категория", summary: "Краткое описание", analysisText: "Аналитический комментарий", imageUrl: "" (опционально) }
// Доступные категории: "Олимпиада", "Футбол", "Медиаправа", "Массовый спорт", "Экономика"
const NEWS_DATA = [
  {
    title: "Париж-2024: Счётная палата Франции оценила расходы в €6,6 млрд",
    date: "15.01.2025",
    category: "Олимпиада",
    summary: "Отчёт Счётной палаты Франции показал, что государственные расходы на Олимпиаду превысили первоначальный бюджет на €690 млн. Экономический эффект оценён в скромные +0,07 п.п. ВВП.",
    analysisText: "Парижский кейс подтверждает тренд: даже развитые страны с существующей инфраструктурой получают скромную экономическую отдачу от мега-событий. Интересно, что «эффект вытеснения» в туризме (–1,7% ночёвок) оказался сопоставим с позитивным эффектом от самих Игр. Это ставит под вопрос стратегию проведения крупных событий в уже популярных туристических направлениях."
  },
  {
    title: "Премьер-лига заключила рекордную сделку на £6,7 млрд за медиаправа",
    date: "20.12.2024",
    category: "Медиаправа",
    summary: "Английская Премьер-лига подписала крупнейший контракт на внутренние медиаправа в истории Великобритании — £6,7 млрд на 2025–2029 годы (£1,67 млрд/сезон).",
    analysisText: "Рост стоимости медиаправ Премьер-лиги отражает устойчивый спрос на премиальный спортивный контент. При этом конкуренция стриминговых платформ (Amazon Prime, DAZN) с традиционными вещателями (Sky Sports) продолжает толкать цены вверх. Глобально спортивные медиаправа в 2024 году впервые превысили $60 млрд."
  },
  {
    title: "Выручка женского спорта достигла $1,88 млрд в 2024 году",
    date: "05.03.2025",
    category: "Экономика",
    summary: "По данным Deloitte, глобальная выручка женского элитного спорта практически удвоилась — с $981 млн в 2023 до $1,88 млрд в 2024 году. Прогноз на 2025 — $2,35 млрд.",
    analysisText: "Женский спорт — один из самых быстрорастущих сегментов индустрии. Баскетбол ($1,03 млрд) и футбол ($820 млн) лидируют. Коммерческая выручка впервые превысила $1 млрд. Этот рост обусловлен не только увеличением аудитории, но и активным входом крупных спонсоров и вещателей."
  },
  {
    title: "Сочи принял 7,6 млн туристов в 2023 году — рекорд за 10 лет после Олимпиады",
    date: "07.02.2024",
    category: "Олимпиада",
    summary: "За 10 лет после Олимпиады-2014 Сочи принял 64 млн туристов. Турпоток вырос с 4,3 млн (2012) до 7,6 млн (2023), подтвердив превращение города в круглогодичный курорт.",
    analysisText: "Сочинский кейс — один из немногих примеров, когда олимпийская инфраструктура продолжает приносить экономическую отдачу. Ключевой фактор — создание горнолыжного кластера (177 км трасс) решило проблему сезонности. Однако ежегодные расходы на содержание инфраструктуры (~60–80 млрд ₽) остаются серьёзной нагрузкой."
  },
  {
    title: "Саудовская Аравия получила право на проведение ЧМ-2034 по футболу",
    date: "11.12.2024",
    category: "Футбол",
    summary: "FIFA официально утвердила Саудовскую Аравию в качестве хозяйки ЧМ-2034. Инвестиции в спорт являются частью программы «Видение 2030» по диверсификации экономики страны.",
    analysisText: "ЧМ-2034 в Саудовской Аравии — продолжение тренда проведения мега-событий на Ближнем Востоке (после Катара-2022). Для Саудовской Аравии это инструмент экономической диверсификации: спортивные инвестиции создают рабочие места, развивают туризм и улучшают международный имидж. Региональный спортивный рынок оценивается в $600 млрд."
  },
  {
    title: "ВОЗ: к 2030 году физическая неактивность обойдётся в $300 млрд",
    date: "19.10.2024",
    category: "Массовый спорт",
    summary: "По прогнозу ВОЗ, к 2030 году 499 млн новых случаев НИЗ будут связаны с физической неактивностью. Стоимость лечения достигнет $300 млрд ($27 млрд ежегодно).",
    analysisText: "Данные ВОЗ подчёркивают экономическую целесообразность инвестиций в массовый спорт. Исследование Sport England показало, что каждый £1 в массовый спорт даёт £3,91 возврата. Это делает программы физической активности одной из наиболее эффективных форм государственных инвестиций в здравоохранение."
  }
];

// === ДАННЫЕ ДЛЯ КАРТЫ ===
// Формат: "ISO2_CODE": { name: "Название", sportGDPShare: "X%", keyFacts: "...", megaEvents: "...", marketSize: "..." }
const COUNTRIES_DATA = {
  "US": {
    "name": "США",
    "flag": "🇺🇸",
    "region": "americas",
    "sportGDPShare": "2.4%",
    "keyFacts": "Крупнейший спортивный рынок мира. Медиаправа — $29.25 млрд (2025). NFL, NBA, MLB, NHL — крупнейшие профессиональные лиги. Суперкубок генерирует ~$500 млн для принимающего города.",
    "megaEvents": "Лос-Анджелес-1984 (прибыльная Олимпиада), ЧМ-2026 (совместно с Канадой и Мексикой)",
    "marketSize": "$150+ млрд"
  },
  "CA": {
    "name": "Канада",
    "flag": "🇨🇦",
    "region": "americas",
    "sportGDPShare": "~1.8%",
    "keyFacts": "Монреаль-1976 — выплачивал олимпийский долг 30 лет до 2006. Стадион «Большое О» требует $870 млн на крышу (2024). Переход к высокой активности даёт +10–20% к заработку.",
    "megaEvents": "Монреаль-1976 (30 лет долга), Ванкувер-2010, ЧМ-2026 (совместно)",
    "marketSize": "~C$35 млрд"
  },
  "BR": {
    "name": "Бразилия",
    "flag": "🇧🇷",
    "region": "americas",
    "sportGDPShare": "~1.0%",
    "keyFacts": "ЧМ-2014 — $11.5 млрд, массовые социальные протесты. Рио-2016 — затраты $20 млрд, возврат $4–4.5 млрд. Олимпийский парк заброшен.",
    "megaEvents": "ЧМ-2014 (социальные протесты), Рио-2016 (заброшенные объекты)",
    "marketSize": "~$15 млрд"
  },
  "GB": {
    "name": "Великобритания",
    "flag": "🇬🇧",
    "region": "europe",
    "sportGDPShare": "3.4%",
    "keyFacts": "Спортивный сектор — £100 млрд, 1.25 млн рабочих мест (3.9% занятости). Премьер-лига — рекордные £6.7 млрд за медиаправа на 2025–2029.",
    "megaEvents": "Лондон-2012 — регенерация восточного Лондона, эффект £28–41 млрд",
    "marketSize": "£100 млрд"
  },
  "DE": {
    "name": "Германия",
    "flag": "🇩🇪",
    "region": "europe",
    "sportGDPShare": "~2.5%",
    "keyFacts": "Бундеслига — одна из прибыльных лиг мира. ЧМ-2006 — «летняя сказка»: эффект $11–12 млрд, 50 000 рабочих мест.",
    "megaEvents": "ЧМ-2006 — один из самых успешных чемпионатов",
    "marketSize": "~€60 млрд"
  },
  "FR": {
    "name": "Франция",
    "flag": "🇫🇷",
    "region": "europe",
    "sportGDPShare": "~1.8%",
    "keyFacts": "Париж-2024 — государственные расходы >€6 млрд. Воздействие на ВВП — скромные +0.07 п.п. Туризм снизился на 1.7% (эффект вытеснения).",
    "megaEvents": "Париж-2024 — скромный экономический эффект",
    "marketSize": "~€40 млрд"
  },
  "ES": {
    "name": "Испания",
    "flag": "🇪🇸",
    "region": "europe",
    "sportGDPShare": "~2.0%",
    "keyFacts": "Барселона-1992 — эталон успеха: рост турпотока с 1.7 до 8 млн. Безработица снизилась с 18.4% до 9.6%. Реал Мадрид — первый клуб с выручкой €1 млрд.",
    "megaEvents": "Барселона-1992 — классический пример успешной трансформации",
    "marketSize": "~€30 млрд"
  },
  "IT": {
    "name": "Италия",
    "flag": "🇮🇹",
    "region": "europe",
    "sportGDPShare": "~1.9%",
    "keyFacts": "Серия А — одна из топ-5 лиг. Рим отказался от заявки на 2024 из-за экономических рисков.",
    "megaEvents": "Рим-1960, Турин-2006, Милан-Кортина-2026",
    "marketSize": "~€25 млрд"
  },
  "GR": {
    "name": "Греция",
    "flag": "🇬🇷",
    "region": "europe",
    "sportGDPShare": "~1.2%",
    "keyFacts": "Афины-2004 — хрестоматийный провал: $11 млрд (2× бюджет). Половина объектов заброшена. Символ «белых слонов».",
    "megaEvents": "Афины-2004 — классический пример «белых слонов»",
    "marketSize": "~€3 млрд"
  },
  "RU": {
    "name": "Россия",
    "flag": "🇷🇺",
    "region": "europe",
    "sportGDPShare": "0.3%",
    "keyFacts": "Доля спорта в ВВП значительно ниже среднеевропейского (2.12%). Фитнес-рынок растёт на 24%. ЧМ-2018 дал эффект $15 млрд (1% ВВП).",
    "megaEvents": "Сочи-2014 ($50 млрд инвестиций, турпоток 2×), ЧМ-2018 ($15 млрд эффект)",
    "marketSize": "~640 млрд ₽"
  },
  "ZA": {
    "name": "ЮАР",
    "flag": "🇿🇦",
    "region": "africa",
    "sportGDPShare": "~2.0%",
    "keyFacts": "ЧМ-2010 — >$4 млрд расходов, 130 000 строительных рабочих мест. Добавил 0.5% к ВВП.",
    "megaEvents": "ЧМ-2010 — первый ЧМ в Африке, смешанные результаты",
    "marketSize": "~$5 млрд"
  },
  "CN": {
    "name": "Китай",
    "flag": "🇨🇳",
    "region": "asia",
    "sportGDPShare": "~1.5%",
    "keyFacts": "Пекин-2008 — $40 млрд инфраструктурных инвестиций. Прирост спортивного потребления на 1 п.п. = рост ВВП на 0.186 п.п.",
    "megaEvents": "Пекин-2008 (лето), Пекин-2022 (зима) — единственный город с обоими типами Олимпиад",
    "marketSize": "~$300 млрд"
  },
  "JP": {
    "name": "Япония",
    "flag": "🇯🇵",
    "region": "asia",
    "sportGDPShare": "~1.5%",
    "keyFacts": "Токио-2020 — самые дорогие Игры ($13–28 млрд). Пандемия лишила $800 млн от билетов.",
    "megaEvents": "Токио-2020/2021 — пандемические потери, убыточный проект",
    "marketSize": "~$40 млрд"
  },
  "KR": {
    "name": "Южная Корея",
    "flag": "🇰🇷",
    "region": "asia",
    "sportGDPShare": "~1.7%",
    "keyFacts": "ЧМ-2002 — один из рекордных дефицитов. Активное развитие киберспорта как экономического сектора.",
    "megaEvents": "ЧМ-2002, Пхёнчхан-2018",
    "marketSize": "~$20 млрд"
  },
  "IN": {
    "name": "Индия",
    "flag": "🇮🇳",
    "region": "asia",
    "sportGDPShare": "~0.5%",
    "keyFacts": "IPL (крикет) — одна из самых дорогих лиг мира. Население 1.4 млрд — огромный потенциал.",
    "megaEvents": "ЧМ по крикету (многократно), потенциальная заявка на Олимпиаду",
    "marketSize": "~$25 млрд"
  },
  "QA": {
    "name": "Катар",
    "flag": "🇶🇦",
    "region": "asia",
    "sportGDPShare": "н/д",
    "keyFacts": "ЧМ-2022 — самый дорогой чемпионат ($200–300 млрд инфра). Часть «Видение 2030» — диверсификация экономики.",
    "megaEvents": "ЧМ-2022 — рекордные инвестиции, диверсификация экономики",
    "marketSize": "н/д"
  },
  "SA": {
    "name": "Саудовская Аравия",
    "flag": "🇸🇦",
    "region": "asia",
    "sportGDPShare": "н/д",
    "keyFacts": "Масштабные инвестиции в спорт как часть «Видение 2030». Привлечение мировых звёзд. Заявка на ЧМ-2034.",
    "megaEvents": "ЧМ-2034 (планируется), Ближний Восток — рынок $600 млрд",
    "marketSize": "Часть рынка $600 млрд"
  },
  "AU": {
    "name": "Австралия",
    "flag": "🇦🇺",
    "region": "asia",
    "sportGDPShare": "~2.5%",
    "keyFacts": "Спорт — важная часть национальной идентичности. CGE-анализ Игр Содружества 2018 — прирост ~A$2.5 млрд.",
    "megaEvents": "Сидней-2000 (успешная Олимпиада), Игры Содружества 2018",
    "marketSize": "~A$30 млрд"
  },
  "MX": {
    "name": "Мексика",
    "flag": "🇲🇽",
    "region": "americas",
    "sportGDPShare": "~1.2%",
    "keyFacts": "Соорганизатор ЧМ-2026. Футбол — главный вид спорта. Gp Формулы-1 в Мехико приносит ~$600 млн/год.",
    "megaEvents": "ЧМ-1970, ЧМ-1986, ЧМ-2026 (совместно)",
    "marketSize": "~$8 млрд"
  },
  "AR": {
    "name": "Аргентина",
    "flag": "🇦🇷",
    "region": "americas",
    "sportGDPShare": "~1.8%",
    "keyFacts": "Футбол — национальная страсть. Чемпион мира 2022. Аргентинская лига — одна из крупнейших в Южной Америке.",
    "megaEvents": "ЧМ-1978, Олимпиада молодёжи-2018",
    "marketSize": "~$4 млрд"
  },
  "CO": {
    "name": "Колумбия",
    "flag": "🇨🇴",
    "region": "americas",
    "sportGDPShare": "~0.8%",
    "keyFacts": "Быстрорастущий спортивный рынок. Велоспорт и футбол — ключевые виды. Copa América-2001 принесла экономический эффект.",
    "marketSize": "~$2 млрд"
  },
  "CL": {
    "name": "Чили",
    "flag": "🇨🇱",
    "region": "americas",
    "sportGDPShare": "~0.7%",
    "keyFacts": "Футбол, теннис, родео. Панамериканские игры 2023 в Сантьяго.",
    "marketSize": "~$1.5 млрд"
  },
  "NL": {
    "name": "Нидерланды",
    "flag": "🇳🇱",
    "region": "europe",
    "sportGDPShare": "~2.3%",
    "keyFacts": "Высокий уровень массового спорта: 65% населения занимается спортом. Футбольная система — эталон подготовки кадров.",
    "megaEvents": "Евро-2000 (совместно с Бельгией)",
    "marketSize": "~€15 млрд"
  },
  "BE": {
    "name": "Бельгия",
    "flag": "🇧🇪",
    "region": "europe",
    "sportGDPShare": "~2.0%",
    "keyFacts": "Велоспорт — национальный вид спорта. Футбольная сборная в топ-10 мира.",
    "megaEvents": "Евро-2000 (совместно с Нидерландами)",
    "marketSize": "~€8 млрд"
  },
  "SE": {
    "name": "Швеция",
    "flag": "🇸🇪",
    "region": "europe",
    "sportGDPShare": "~2.2%",
    "keyFacts": "Одна из самых спортивных наций. Хоккей, футбол, лёгкая атлетика. Сильная модель господдержки спорта.",
    "megaEvents": "Стокгольм-1912, ЧМ по хоккею (многократно)",
    "marketSize": "~€12 млрд"
  },
  "NO": {
    "name": "Норвегия",
    "flag": "🇳🇴",
    "region": "europe",
    "sportGDPShare": "~2.4%",
    "keyFacts": "Лидер зимних олимпийских видов спорта. 93% населения занимается физактивностью.",
    "megaEvents": "Лиллехаммер-1994 (успешная зимняя Олимпиада)",
    "marketSize": "~€10 млрд"
  },
  "PL": {
    "name": "Польша",
    "flag": "🇵🇱",
    "region": "europe",
    "sportGDPShare": "~1.3%",
    "keyFacts": "Быстрорастущий спортивный рынок Восточной Европы. Футбол и волейбол наиболее популярны.",
    "megaEvents": "Евро-2012 (совместно с Украиной)",
    "marketSize": "~€6 млрд"
  },
  "PT": {
    "name": "Португалия",
    "flag": "🇵🇹",
    "region": "europe",
    "sportGDPShare": "~1.5%",
    "keyFacts": "Футбол — национальная страсть. Лиссабон — европейский центр сёрфинга. Чемпион Европы 2016.",
    "megaEvents": "Евро-2004",
    "marketSize": "~€5 млрд"
  },
  "AT": {
    "name": "Австрия",
    "flag": "🇦🇹",
    "region": "europe",
    "sportGDPShare": "~3.0%",
    "keyFacts": "Одна из самых высоких долей спорта в ВВП в Европе. Горнолыжный туризм — ключевой сектор. Формула-1 Red Bull Ring.",
    "megaEvents": "Евро-2008 (совместно со Швейцарией)",
    "marketSize": "~€12 млрд"
  },
  "CH": {
    "name": "Швейцария",
    "flag": "🇨🇭",
    "region": "europe",
    "sportGDPShare": "~2.6%",
    "keyFacts": "Штаб-квартира МОК (Лозанна), ФИФА (Цюрих), УЕФА (Ньон). Горнолыжный туризм ~CHF 5 млрд/год.",
    "megaEvents": "Евро-2008 (совместно с Австрией)",
    "marketSize": "~CHF 25 млрд"
  },
  "TR": {
    "name": "Турция",
    "flag": "🇹🇷",
    "region": "europe",
    "sportGDPShare": "~1.0%",
    "keyFacts": "Амбициозные спортивные инвестиции. Стамбул многократно претендовал на Олимпиаду. Футбольная Суперлига растёт.",
    "megaEvents": "Финал ЛЧ 2023, заявка на Олимпиаду 2036",
    "marketSize": "~$10 млрд"
  },
  "UA": {
    "name": "Украина",
    "flag": "🇺🇦",
    "region": "europe",
    "sportGDPShare": "~0.5%",
    "keyFacts": "Соорганизатор Евро-2012 с Польшей. Сильные традиции в боксе, лёгкой атлетике, футболе.",
    "megaEvents": "Евро-2012 (совместно с Польшей)",
    "marketSize": "~$2 млрд"
  },
  "DK": {
    "name": "Дания",
    "flag": "🇩🇰",
    "region": "europe",
    "sportGDPShare": "~2.1%",
    "keyFacts": "Одна из самых спортивных наций Европы. Футбол, гандбол, велоспорт. Копенгаген — велосипедная столица мира.",
    "marketSize": "~€7 млрд"
  },
  "FI": {
    "name": "Финляндия",
    "flag": "🇫🇮",
    "region": "europe",
    "sportGDPShare": "~2.0%",
    "keyFacts": "Сильные традиции в зимних видах спорта и хоккее. Олимпиада Хельсинки-1952.",
    "megaEvents": "Хельсинки-1952, ЧМ по хоккею (многократно)",
    "marketSize": "~€5 млрд"
  },
  "IE": {
    "name": "Ирландия",
    "flag": "🇮🇪",
    "region": "europe",
    "sportGDPShare": "~1.7%",
    "keyFacts": "Уникальные национальные виды спорта: хёрлинг и гэльский футбол. Регби — ключевой экономический драйвер.",
    "marketSize": "~€5 млрд"
  },
  "AE": {
    "name": "ОАЭ",
    "flag": "🇦🇪",
    "region": "asia",
    "sportGDPShare": "~1.0%",
    "keyFacts": "Дубай и Абу-Даби — мировые спортивные хабы. GP Формулы-1 в Абу-Даби. Dubai World Cup (скачки).",
    "megaEvents": "GP Ф-1 Абу-Даби, Кубок мира по крикету",
    "marketSize": "~$5 млрд"
  },
  "ID": {
    "name": "Индонезия",
    "flag": "🇮🇩",
    "region": "asia",
    "sportGDPShare": "~0.5%",
    "keyFacts": "Население 280 млн — огромный потенциал. Бадминтон — национальный вид спорта. Быстрый рост киберспорта.",
    "megaEvents": "Азиатские игры 2018",
    "marketSize": "~$4 млрд"
  },
  "TH": {
    "name": "Таиланд",
    "flag": "🇹🇭",
    "region": "asia",
    "sportGDPShare": "~0.6%",
    "keyFacts": "Муай-тай — культурный экспорт. Бокс и футбол популярны. Растущий рынок гольф-туризма.",
    "marketSize": "~$3 млрд"
  },
  "SG": {
    "name": "Сингапур",
    "flag": "🇸🇬",
    "region": "asia",
    "sportGDPShare": "~1.2%",
    "keyFacts": "GP Формулы-1 ночью — знаковое событие. Спортивный хаб Юго-Восточной Азии.",
    "megaEvents": "GP Ф-1 Сингапура, Юношеские Олимпийские игры 2010",
    "marketSize": "~$3 млрд"
  },
  "MY": {
    "name": "Малайзия",
    "flag": "🇲🇾",
    "region": "asia",
    "sportGDPShare": "~0.8%",
    "keyFacts": "GP Формулы-1 в Сепанге (1999–2017). Бадминтон и футбол популярны.",
    "megaEvents": "Игры Содружества 1998, Игры ЮВА (многократно)",
    "marketSize": "~$3 млрд"
  },
  "PH": {
    "name": "Филиппины",
    "flag": "🇵🇭",
    "region": "asia",
    "sportGDPShare": "~0.4%",
    "keyFacts": "Баскетбол — самый популярный вид спорта (НБА в топ-5 лиг Азии). Бокс — культурный феномен.",
    "megaEvents": "ЧМ по баскетболу 2023, Игры ЮВА 2019",
    "marketSize": "~$2 млрд"
  },
  "EG": {
    "name": "Египет",
    "flag": "🇪🇬",
    "region": "africa",
    "sportGDPShare": "~0.6%",
    "keyFacts": "Футбол — главный вид спорта. Аль-Ахли — один из крупнейших клубов Африки. 7-кратный чемпион Кубка Африки.",
    "megaEvents": "Кубок Африки (многократно), ЧМ по гандболу 2021",
    "marketSize": "~$3 млрд"
  },
  "NG": {
    "name": "Нигерия",
    "flag": "🇳🇬",
    "region": "africa",
    "sportGDPShare": "~0.3%",
    "keyFacts": "Население 220 млн — крупнейший рынок Африки. Футбол и лёгкая атлетика. Быстрый рост ставок на спорт.",
    "marketSize": "~$2 млрд"
  },
  "KE": {
    "name": "Кения",
    "flag": "🇰🇪",
    "region": "africa",
    "sportGDPShare": "~0.4%",
    "keyFacts": "Мировой лидер в марафонском беге. Лёгкая атлетика приносит значительный доход от спонсоров.",
    "marketSize": "~$500 млн"
  },
  "MA": {
    "name": "Марокко",
    "flag": "🇲🇦",
    "region": "africa",
    "sportGDPShare": "~0.8%",
    "keyFacts": "Соорганизатор ЧМ-2030 с Испанией и Португалией. Полуфинал ЧМ-2022 усилил инвестиции в спорт.",
    "megaEvents": "ЧМ-2030 (совместно с Испанией и Португалией)",
    "marketSize": "~$2 млрд"
  },
  "NZ": {
    "name": "Новая Зеландия",
    "flag": "🇳🇿",
    "region": "asia",
    "sportGDPShare": "~2.8%",
    "keyFacts": "Регби All Blacks — национальный символ. Крикет и парусный спорт (Кубок Америки).",
    "megaEvents": "ЧМ по регби 2011, ЧМ среди женщин 2023",
    "marketSize": "~NZ$6 млрд"
  },
  "PE": {
    "name": "Перу",
    "flag": "🇵🇪",
    "region": "americas",
    "sportGDPShare": "~0.5%",
    "keyFacts": "Футбол — главный вид спорта. Панамериканские игры 2019 в Лиме.",
    "megaEvents": "Панамериканские игры 2019",
    "marketSize": "~$1 млрд"
  },
  "VN": {
    "name": "Вьетнам",
    "flag": "🇻🇳",
    "region": "asia",
    "sportGDPShare": "~0.4%",
    "keyFacts": "Быстрорастущий рынок. Футбол и киберспорт популярны. Население 100 млн.",
    "megaEvents": "Игры ЮВА 2003, 2021",
    "marketSize": "~$2 млрд"
  }
};

// === ДАННЫЕ ОТЧЁТА ===
const REPORT_DATA = {
  megaEvents: [
    {event: "Барселона-1992", type: "Олимпиада", cost: 9.7, costUnit: "$ млрд", effect: "Рост туризма на 335%", tourism: "1.7→7+ млн", result: "Трансформация города", success: true},
    {event: "Афины-2004", type: "Олимпиада", cost: 11, costUnit: "$ млрд", effect: "Дефицит 6.1% ВВП", tourism: "Кратковременный", result: "«Белые слоны»", success: false},
    {event: "Пекин-2008", type: "Олимпиада", cost: 40, costUnit: "$ млрд", effect: "+2.5% ВВП Пекина/год", tourism: "Устойчивый рост", result: "Масштабная модернизация", success: true},
    {event: "Лондон-2012", type: "Олимпиада", cost: 13.3, costUnit: "$ млрд", effect: "£28–41 млрд к 2020", tourism: "Рост", result: "Регенерация востока", success: true},
    {event: "Сочи-2014", type: "Олимпиада", cost: 50, costUnit: "$ млрд", effect: "Рост турпотока 2×", tourism: "3.5→6.5+ млн", result: "Круглогодичный курорт", success: true},
    {event: "Рио-2016", type: "Олимпиада", cost: 20, costUnit: "$ млрд", effect: "Возврат $4–4.5 млрд", tourism: "Кратковременный", result: "Заброшенные объекты", success: false},
    {event: "Токио-2020", type: "Олимпиада", cost: 28, costUnit: "$ млрд", effect: "Потеря $800 млн", tourism: "Нулевой (COVID)", result: "Убыточный", success: false},
    {event: "Париж-2024", type: "Олимпиада", cost: 6.6, costUnit: "€ млрд", effect: "+0.07 п.п. ВВП", tourism: "Вытеснение –1.7%", result: "Скромный эффект", success: false},
    {event: "Германия-2006", type: "ЧМ", cost: 3, costUnit: "$ млрд", effect: "$11–12 млрд, 50К мест", tourism: "Рост", result: "Успешный кейс", success: true},
    {event: "ЮАР-2010", type: "ЧМ", cost: 4, costUnit: "$ млрд", effect: "+0.5% ВВП, 415К мест", tourism: "Рост", result: "Смешанный", success: false},
    {event: "Россия-2018", type: "ЧМ", cost: 11.3, costUnit: "$ млрд", effect: "$15 млрд (1% ВВП)", tourism: "Рост", result: "Окупаемость?", success: true},
    {event: "Катар-2022", type: "ЧМ", cost: 6.5, costUnit: "$ млрд", effect: "Часть «Видение 2030»", tourism: "Рост", result: "Диверсификация", success: true}
  ],
  mediaRights: [
    {year: 2015, value: 14.6, note: "только США"},
    {year: 2022, value: 54.7, note: "Глобально"},
    {year: 2023, value: 56.0, note: "Без мега-событий"},
    {year: 2024, value: 60.0, note: "Олимпиада + Евро"},
    {year: 2025, value: 57.2, note: "Нечётный год"},
    {year: 2030, value: 73.0, note: "Прогноз"}
  ],
  inactivityCost: [
    {indicator: "Глобальная стоимость", value: "$67.5 млрд", year: 2013},
    {indicator: "Прямые затраты", value: "$53.8 млрд", year: 2013},
    {indicator: "Потери производительности", value: "$13.7 млрд", year: 2013},
    {indicator: "Прогноз к 2030", value: "$300 млрд", year: 2030},
    {indicator: "Доля расходов (развитые страны)", value: "70%", year: 2022},
    {indicator: "Возврат на £1 в спорт", value: "£3.91", year: 2018}
  ],
  sochi: [
    {year: 2012, tourists: 4.3},
    {year: 2013, tourists: 4.1},
    {year: 2014, tourists: 5.6},
    {year: 2016, tourists: 6.5},
    {year: 2021, tourists: 6.5},
    {year: 2023, tourists: 7.6}
  ],
  sportGDP: [
    {region: "Евросоюз", gdpShare: 2.12, employment: "5.67 млн (2.72%)"},
    {region: "Великобритания", gdpShare: 3.4, employment: "1.25 млн (3.9%)"},
    {region: "Россия", gdpShare: 0.3, employment: "н/д"},
    {region: "Глобальный рынок", gdpShare: null, employment: null, marketSize: "$600 млрд"}
  ],
  clubRevenue: [
    {source: "Коммерческая выручка", share: 44, volume: 4.93},
    {source: "Трансляции", share: 38, volume: 4.26},
    {source: "Матчевый день", share: 18, volume: 2.01}
  ],
  roiData: {averageROI: -38, averageCost: 2.8, averageRevenue: 1.7},
  womenSport: [
    {year: 2023, revenue: 0.981},
    {year: 2024, revenue: 1.88},
    {year: 2025, revenue: 2.35}
  ]
};

// === ВОПРОСЫ ВИКТОРИНЫ ===
// Формат: { question: "Вопрос", options: ["A", "B", "C", "D"], correct: 0-3 (индекс правильного ответа), explanation: "Пояснение" }
const QUIZ_QUESTIONS = [
  {
    question: "Какой средний ROI мега-спортивных событий (Олимпиады + ЧМ)?",
    options: ["+12%", "–38%", "–15%", "+5%"],
    correct: 1,
    explanation: "Исследование 2022 года (PMC/PLOS ONE) показало, что средний ROI мега-событий составляет –38%: средние затраты $2,8 млрд при средних доходах $1,7 млрд."
  },
  {
    question: "Какой город считается эталоном успеха олимпийской трансформации?",
    options: ["Лондон (2012)", "Барселона (1992)", "Пекин (2008)", "Сидней (2000)"],
    correct: 1,
    explanation: "Барселона-1992 — классический пример: рост турпотока с 1,7 до 7+ млн, снижение безработицы с 18,4% до 9,6%, 60% инвестиций в долгосрочную инфраструктуру."
  },
  {
    question: "Сколько стоила физическая неактивность мировой экономике в 2013 году?",
    options: ["$12 млрд", "$67,5 млрд", "$300 млрд", "$150 млрд"],
    correct: 1,
    explanation: "Исследование The Lancet (2016) впервые подсчитало полную стоимость: $67,5 млрд ($53,8 млрд прямых затрат + $13,7 млрд потерь производительности)."
  },
  {
    question: "Какова доля спортивной индустрии в ВВП России?",
    options: ["2.12%", "1.5%", "0.3%", "3.4%"],
    correct: 2,
    explanation: "По данным Министра спорта О.В. Матыцина, доля спорта в ВВП России — 0,3% (2023). Это значительно ниже среднеевропейского уровня (2,12% в ЕС)."
  },
  {
    question: "Сколько инвестировал Китай в инфраструктуру для Олимпиады в Пекине-2008?",
    options: ["$20 млрд", "$40 млрд", "$10 млрд", "$50 млрд"],
    correct: 1,
    explanation: "Китай инвестировал около $40 млрд в инфраструктуру за период 2002–2006: 37 стадионов, 59 тренировочных центров, новый терминал аэропорта, расширенное метро."
  },
  {
    question: "Какой возврат даёт £1, вложенный в массовый спорт в Великобритании?",
    options: ["£1.50", "£2.20", "£3.91", "£5.00"],
    correct: 2,
    explanation: "Исследование Sport England / Sheffield Hallam University показало: каждый £1 в массовый спорт генерирует £3,91 для экономики и общества."
  },
  {
    question: "Каков средний перерасход бюджета Олимпийских игр с 1960 года?",
    options: ["50%", "100%", "172%", "250%"],
    correct: 2,
    explanation: "Исследование Оксфордского университета (2024): каждая Олимпиада с 1960 года превышала бюджет, средний перерасход — 172%. 13 из 23 городов превысили бюджет более чем на 100%."
  },
  {
    question: "Какова глобальная стоимость спортивных медиаправ в 2024 году?",
    options: ["$30 млрд", "Более $60 млрд", "$45 млрд", "$80 млрд"],
    correct: 1,
    explanation: "Глобальная стоимость спортивных медиаправ в 2024 году впервые превысила $60 млрд благодаря Олимпиаде в Париже и Евро-2024."
  },
  {
    question: "Какой город выплачивал олимпийский долг 30 лет — до 2006 года?",
    options: ["Афины", "Рио-де-Жанейро", "Монреаль", "Токио"],
    correct: 2,
    explanation: "Монреаль (Олимпиада-1976) выплачивал олимпийский долг 30 лет — до 2006 года. Стадион «Большое О» до сих пор требует сотен миллионов на содержание."
  },
  {
    question: "На сколько процентов занятия спортом повышают заработок работников?",
    options: ["1–3%", "4–17%", "20–30%", "Менее 1%"],
    correct: 1,
    explanation: "Обзор IZA World of Labor показывает: занятия спортом повышают заработок на 4–17% в зависимости от интенсивности. Этот эффект связан с улучшением здоровья и развитием soft skills."
  }
];

// ═══════════════════════════════════════════════════════
// КОНЕЦ РЕДАКТИРУЕМЫХ ДАННЫХ
// ═══════════════════════════════════════════════════════

// ── ISO ALPHA-2 → NUMERIC MAPPING (TopoJSON feature.id) ──
var ISO_ALPHA2_TO_NUMERIC = {
  'US':'840','CA':'124','BR':'076','GB':'826','DE':'276','FR':'250',
  'ES':'724','IT':'380','GR':'300','RU':'643','ZA':'710','CN':'156',
  'JP':'392','KR':'410','IN':'356','QA':'634','SA':'682','AU':'036',
  'MX':'484','AR':'032','CO':'170','CL':'152',
  'NL':'528','BE':'056','SE':'752','NO':'578','PL':'616','PT':'620',
  'AT':'040','CH':'756','TR':'792','UA':'804','DK':'208','FI':'246','IE':'372',
  'AE':'784','ID':'360','TH':'764','SG':'702','MY':'458','PH':'608',
  'EG':'818','NG':'566','KE':'404','MA':'504',
  'NZ':'554','PE':'604','VN':'704'
};

var ISO_NUMERIC_TO_ALPHA2 = {};
Object.keys(ISO_ALPHA2_TO_NUMERIC).forEach(function(a2) {
  ISO_NUMERIC_TO_ALPHA2[ISO_ALPHA2_TO_NUMERIC[a2]] = a2;
});

// ── THEME TOGGLE ──
(function initTheme() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcon(toggle, theme);

  if (toggle) {
    toggle.addEventListener('click', function() {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateToggleIcon(toggle, theme);
      // Re-render charts for new theme colors
      renderAllCharts();
    });
  }
})();

function updateToggleIcon(toggle, theme) {
  if (!toggle) return;
  toggle.setAttribute('aria-label', theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему');
  toggle.innerHTML = theme === 'dark'
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// ── MOBILE NAV ──
(function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      mobileNav.classList.toggle('open');
      overlay.classList.toggle('open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileNav);
  }

  document.querySelectorAll('.mobile-nav .nav-link').forEach(function(link) {
    link.addEventListener('click', closeMobileNav);
  });
})();

// ── HASH ROUTING ──
function getActiveSection() {
  return window.location.hash.slice(1) || 'news';
}

function navigateTo(sectionId) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(function(sec) {
    sec.style.display = 'none';
  });

  // Show target section
  var target = document.getElementById('section-' + sectionId);
  if (target) {
    target.style.display = 'block';
  }

  // Show hero banner only on news section
  var hero = document.getElementById('hero');
  if (hero) {
    hero.style.display = sectionId === 'news' ? 'block' : 'none';
  }

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + sectionId) {
      link.classList.add('active');
    }
  });

  // Scroll to top
  window.scrollTo({top: 0, behavior: 'smooth'});

  // Init section-specific content on first view
  initSectionContent(sectionId);
}

function initSectionContent(sectionId) {
  switch (sectionId) {
    case 'report':
      if (!window._chartsInitialized) {
        window._chartsInitialized = true;
        setTimeout(renderAllCharts, 100);
      }
      break;
    case 'map':
      renderMap();
      break;
    case 'calculator':
      calculateResults();
      break;
  }
}

window.addEventListener('hashchange', function() {
  navigateTo(getActiveSection());
});

// ── NEWS SECTION ──
function renderNews(filter) {
  var container = document.getElementById('news-list');
  if (!container) return;
  var filtered = filter === 'Все' ? NEWS_DATA : NEWS_DATA.filter(function(n) { return n.category === filter; });
  container.innerHTML = filtered.map(function(item, i) {
    return '<article class="news-card fade-in">' +
      '<div class="news-meta">' +
        '<span class="news-tag">' + item.category + '</span>' +
        '<span class="news-date">' + item.date + '</span>' +
      '</div>' +
      '<h3>' + item.title + '</h3>' +
      '<p class="news-summary">' + item.summary + '</p>' +
      '<button class="analytics-toggle" onclick="toggleAnalytics(this)" aria-expanded="false">' +
        'Аналитика <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
      '</button>' +
      '<div class="analytics-content">' +
        '<p class="analytics-text">' + item.analysisText + '</p>' +
      '</div>' +
    '</article>';
  }).join('');
}

function toggleAnalytics(btn) {
  var content = btn.nextElementSibling;
  var isOpen = btn.classList.contains('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', !isOpen);
  content.classList.toggle('open');
}

function initNewsFilters() {
  var categories = ['Все', 'Олимпиада', 'Футбол', 'Медиаправа', 'Массовый спорт', 'Экономика'];
  var filterBar = document.getElementById('news-filters');
  if (!filterBar) return;
  filterBar.innerHTML = categories.map(function(cat) {
    return '<button class="filter-btn' + (cat === 'Все' ? ' active' : '') + '" data-filter="' + cat + '">' + cat + '</button>';
  }).join('');

  filterBar.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      filterBar.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      e.target.classList.add('active');
      renderNews(e.target.getAttribute('data-filter'));
    }
  });

  renderNews('Все');
}

// ── MAP SECTION (D3.js Interactive World Map) ──
var mapTooltip = null;
var mapSvg = null;

function renderMap() {
  var container = document.getElementById('world-map');
  if (!container || container.querySelector('svg')) return;

  mapTooltip = document.getElementById('map-tooltip');

  // Ensure container has width (may be 0 if section was just shown)
  var width = container.clientWidth;
  if (width < 100) {
    setTimeout(renderMap, 50);
    return;
  }
  var height = Math.min(width * 0.55, 600);

  mapSvg = d3.select('#world-map')
    .append('svg')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .style('display', 'block');

  var projection = d3.geoNaturalEarth1()
    .scale(width / 5.5)
    .translate([width / 2, height / 2]);

  var path = d3.geoPath().projection(projection);

  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(function(world) {
    var countries = topojson.feature(world, world.objects.countries).features;

    mapSvg.selectAll('path.country')
      .data(countries)
      .enter()
      .append('path')
      .attr('class', function(d) {
        var alpha2 = ISO_NUMERIC_TO_ALPHA2[d.id];
        var cData = alpha2 ? COUNTRIES_DATA[alpha2] : null;
        // Original 18 countries with full analysis
        var DETAILED_COUNTRIES = ['US','CA','BR','GB','DE','FR','ES','IT','GR','RU','ZA','CN','JP','KR','IN','QA','SA','AU'];
        var isDetailed = cData && DETAILED_COUNTRIES.indexOf(alpha2) !== -1;
        var isBasic = cData && DETAILED_COUNTRIES.indexOf(alpha2) === -1;
        return 'country' + (isDetailed ? ' country-detailed' : '') + (isBasic ? ' country-basic' : '');
      })
      .attr('d', path)
      .attr('data-id', function(d) { return d.id; })
      .on('mouseover', handleMapMouseOver)
      .on('mousemove', handleMapMouseMove)
      .on('mouseout', handleMapMouseOut)
      .on('click', handleMapClick);

    mapSvg.append('path')
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr('class', 'country-border')
      .attr('d', path);
  });
}

function handleMapMouseOver(event, d) {
  var alpha2 = ISO_NUMERIC_TO_ALPHA2[d.id];
  var cData = alpha2 ? COUNTRIES_DATA[alpha2] : null;
  d3.select(this).classed('country-hover', true);

  if (mapTooltip) {
    var label = cData ? (cData.flag + ' ' + cData.name) : '';
    var stat = cData ? ('Доля спорта в ВВП: ' + cData.sportGDPShare) : '';
    if (label) {
      mapTooltip.innerHTML = '<strong>' + label + '</strong>' + (stat ? '<br>' + stat : '');
      mapTooltip.classList.add('visible');
    }
  }
}

function handleMapMouseMove(event) {
  if (mapTooltip && mapTooltip.classList.contains('visible')) {
    var mapWrap = document.getElementById('map-container');
    var rect = mapWrap.getBoundingClientRect();
    var x = event.clientX - rect.left + 12;
    var y = event.clientY - rect.top - 28;
    if (x + 200 > rect.width) x = x - 220;
    if (y < 0) y = event.clientY - rect.top + 16;
    mapTooltip.style.left = x + 'px';
    mapTooltip.style.top = y + 'px';
  }
}

function handleMapMouseOut() {
  d3.select(this).classed('country-hover', false);
  if (mapTooltip) {
    mapTooltip.classList.remove('visible');
  }
}

function handleMapClick(event, d) {
  var alpha2 = ISO_NUMERIC_TO_ALPHA2[d.id];
  var cData = alpha2 ? COUNTRIES_DATA[alpha2] : null;
  if (cData) {
    openCountryModal(alpha2);
  }
}

function openCountryModal(code) {
  var c = COUNTRIES_DATA[code];
  if (!c) return;

  document.getElementById('modal-country-title').innerHTML = c.flag + ' ' + c.name;
  document.getElementById('modal-gdp').textContent = c.sportGDPShare;
  document.getElementById('modal-market').textContent = c.marketSize || 'н/д';
  document.getElementById('modal-facts').textContent = c.keyFacts;
  document.getElementById('modal-events').textContent = c.megaEvents || 'Нет данных';

  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// ── REPORT SECTION ──
var reportCharts = {};

function initReportTabs() {
  var tabs = document.querySelectorAll('.report-tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      document.querySelectorAll('.report-panel').forEach(function(p) { p.classList.remove('active'); });
      var target = document.getElementById('panel-' + tab.getAttribute('data-panel'));
      if (target) target.classList.add('active');

      // Re-render charts when switching tabs (Chart.js needs this)
      setTimeout(function() {
        Object.keys(reportCharts).forEach(function(key) {
          if (reportCharts[key]) reportCharts[key].resize();
        });
      }, 50);
    });
  });
}

function getChartColors() {
  var style = getComputedStyle(document.documentElement);
  return {
    red: '#e10600',
    teal: '#00d2be',
    dark: style.getPropertyValue('--color-text').trim() || '#1a1a1a',
    muted: style.getPropertyValue('--color-text-muted').trim() || '#666',
    surface: style.getPropertyValue('--color-surface').trim() || '#fff',
    border: style.getPropertyValue('--color-border').trim() || '#e0e0dc',
    bg: style.getPropertyValue('--color-bg').trim() || '#f5f5f0'
  };
}

function renderAllCharts() {
  var colors = getChartColors();

  // Destroy existing charts
  Object.keys(reportCharts).forEach(function(key) {
    if (reportCharts[key]) {
      reportCharts[key].destroy();
      reportCharts[key] = null;
    }
  });

  Chart.defaults.color = colors.muted;
  Chart.defaults.borderColor = colors.border;
  Chart.defaults.font.family = "'General Sans', sans-serif";

  renderMegaEventsChart(colors);
  renderMediaRightsChart(colors);
  renderClubRevenueChart(colors);
  renderWomenSportChart(colors);
  renderGDPChart(colors);
  renderSochiChart(colors);
  renderCalcChart(colors);
}

function renderMegaEventsChart(colors) {
  var ctx = document.getElementById('chart-mega-events');
  if (!ctx) return;
  var data = REPORT_DATA.megaEvents;
  reportCharts.megaEvents = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(function(d) { return d.event; }),
      datasets: [{
        label: 'Затраты ($ млрд)',
        data: data.map(function(d) { return d.cost; }),
        backgroundColor: data.map(function(d) { return d.success ? colors.teal : colors.red; }),
        borderRadius: 4,
        barPercentage: 0.7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {display: false},
        tooltip: {
          callbacks: {
            afterLabel: function(ctx2) {
              var item = data[ctx2.dataIndex];
              return 'Эффект: ' + item.effect + '\nРезультат: ' + item.result;
            }
          }
        }
      },
      scales: {
        x: {title: {display: true, text: 'Затраты ($ млрд)'}},
        y: {ticks: {font: {size: 11}}}
      }
    }
  });
}

function renderMediaRightsChart(colors) {
  var ctx = document.getElementById('chart-media-rights');
  if (!ctx) return;
  var data = REPORT_DATA.mediaRights;
  reportCharts.mediaRights = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(function(d) { return d.year; }),
      datasets: [{
        label: 'Стоимость медиаправ ($ млрд)',
        data: data.map(function(d) { return d.value; }),
        borderColor: colors.red,
        backgroundColor: colors.red + '20',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: colors.red,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        tooltip: {
          callbacks: {
            afterLabel: function(ctx2) {
              return data[ctx2.dataIndex].note;
            }
          }
        }
      },
      scales: {
        y: {beginAtZero: true, title: {display: true, text: '$ млрд'}}
      }
    }
  });
}

function renderClubRevenueChart(colors) {
  var ctx = document.getElementById('chart-club-revenue');
  if (!ctx) return;
  var data = REPORT_DATA.clubRevenue;
  reportCharts.clubRevenue = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(function(d) { return d.source; }),
      datasets: [{
        data: data.map(function(d) { return d.share; }),
        backgroundColor: [colors.red, colors.teal, '#666666'],
        borderWidth: 2,
        borderColor: colors.surface
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {position: 'bottom'},
        tooltip: {
          callbacks: {
            label: function(ctx2) {
              var d = data[ctx2.dataIndex];
              return d.source + ': ' + d.share + '% (€' + d.volume + ' млрд)';
            }
          }
        }
      }
    }
  });
}

function renderWomenSportChart(colors) {
  var ctx = document.getElementById('chart-women-sport');
  if (!ctx) return;
  var data = REPORT_DATA.womenSport;
  reportCharts.womenSport = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(function(d) { return d.year; }),
      datasets: [{
        label: 'Выручка ($ млрд)',
        data: data.map(function(d) { return d.revenue; }),
        backgroundColor: [colors.red + 'AA', colors.red, colors.teal],
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {legend: {display: false}},
      scales: {
        y: {beginAtZero: true, title: {display: true, text: '$ млрд'}}
      }
    }
  });
}

function renderGDPChart(colors) {
  var ctx = document.getElementById('chart-gdp');
  if (!ctx) return;
  var data = REPORT_DATA.sportGDP.filter(function(d) { return d.gdpShare !== null; });
  reportCharts.gdp = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(function(d) { return d.region; }),
      datasets: [{
        label: 'Доля спорта в ВВП (%)',
        data: data.map(function(d) { return d.gdpShare; }),
        backgroundColor: data.map(function(d) { return d.gdpShare < 1 ? colors.red : colors.teal; }),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {legend: {display: false}},
      scales: {
        x: {beginAtZero: true, title: {display: true, text: 'Доля ВВП (%)'}}
      }
    }
  });
}

function renderSochiChart(colors) {
  var ctx = document.getElementById('chart-sochi');
  if (!ctx) return;
  var data = REPORT_DATA.sochi;
  reportCharts.sochi = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(function(d) { return d.year; }),
      datasets: [{
        label: 'Турпоток (млн чел.)',
        data: data.map(function(d) { return d.tourists; }),
        borderColor: colors.teal,
        backgroundColor: colors.teal + '20',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: colors.teal,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {legend: {display: false}},
      scales: {
        y: {beginAtZero: false, title: {display: true, text: 'Млн туристов'}}
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: 2,
            xMax: 2,
            borderColor: colors.red,
            borderWidth: 2,
            borderDash: [5, 5],
            label: {content: 'Олимпиада', display: true}
          }
        }
      }
    }
  });
}

// ── QUIZ SECTION ──
var quizState = {
  currentQuestion: 0,
  score: 0,
  answered: false
};

function renderQuiz() {
  var container = document.getElementById('quiz-content');
  if (!container) return;

  if (quizState.currentQuestion >= QUIZ_QUESTIONS.length) {
    renderQuizResults(container);
    return;
  }

  var q = QUIZ_QUESTIONS[quizState.currentQuestion];
  var letters = ['А', 'Б', 'В', 'Г'];
  var progress = ((quizState.currentQuestion) / QUIZ_QUESTIONS.length) * 100;

  container.innerHTML =
    '<div class="quiz-progress">' +
      '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>' +
      '<div class="quiz-progress-text">' + (quizState.currentQuestion + 1) + '/' + QUIZ_QUESTIONS.length + '</div>' +
    '</div>' +
    '<p class="quiz-question">' + q.question + '</p>' +
    '<div class="quiz-options">' +
      q.options.map(function(opt, i) {
        return '<button class="quiz-option" data-index="' + i + '" onclick="answerQuiz(' + i + ')">' +
          '<span class="opt-letter">' + letters[i] + '</span>' +
          '<span>' + opt + '</span>' +
        '</button>';
      }).join('') +
    '</div>' +
    '<div id="quiz-feedback"></div>';
}

function answerQuiz(index) {
  if (quizState.answered) return;
  quizState.answered = true;

  var q = QUIZ_QUESTIONS[quizState.currentQuestion];
  var isCorrect = index === q.correct;
  if (isCorrect) quizState.score++;

  var buttons = document.querySelectorAll('.quiz-option');
  buttons.forEach(function(btn, i) {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === index && !isCorrect) btn.classList.add('incorrect');
  });

  var feedback = document.getElementById('quiz-feedback');
  feedback.innerHTML =
    '<div class="quiz-explanation ' + (isCorrect ? '' : 'wrong') + '">' +
      '<strong>' + (isCorrect ? '✓ Правильно!' : '✗ Неправильно!') + '</strong> ' + q.explanation +
    '</div>' +
    '<button class="quiz-next-btn" onclick="nextQuestion()">' +
      (quizState.currentQuestion < QUIZ_QUESTIONS.length - 1 ? 'Следующий вопрос →' : 'Результаты →') +
    '</button>';
}

function nextQuestion() {
  quizState.currentQuestion++;
  quizState.answered = false;
  renderQuiz();
}

function renderQuizResults(container) {
  var pct = Math.round((quizState.score / QUIZ_QUESTIONS.length) * 100);
  var rating, ratingEmoji;
  if (quizState.score <= 3) { rating = 'Новичок'; ratingEmoji = '🏁'; }
  else if (quizState.score <= 6) { rating = 'Знаток'; ratingEmoji = '🏅'; }
  else if (quizState.score <= 9) { rating = 'Эксперт'; ratingEmoji = '🏆'; }
  else { rating = 'Профессионал'; ratingEmoji = '🥇'; }

  container.innerHTML =
    '<div class="quiz-results">' +
      '<div class="result-score">' + quizState.score + '/' + QUIZ_QUESTIONS.length + '</div>' +
      '<div class="result-title">' + ratingEmoji + ' ' + rating + '</div>' +
      '<p class="result-desc">Вы правильно ответили на ' + pct + '% вопросов о влиянии спорта на экономику.</p>' +
      '<button class="quiz-restart-btn" onclick="restartQuiz()">Начать заново</button>' +
    '</div>';
}

function restartQuiz() {
  quizState.currentQuestion = 0;
  quizState.score = 0;
  quizState.answered = false;
  renderQuiz();
}

// ── CALCULATOR SECTION ──
function calculateResults() {
  var eventType = document.getElementById('calc-event-type');
  var budget = document.getElementById('calc-budget');
  var tourists = document.getElementById('calc-tourists');
  var dailySpend = document.getElementById('calc-daily-spend');
  var duration = document.getElementById('calc-duration');
  var multiplierEl = document.getElementById('calc-multiplier');

  if (!eventType || !budget) return;

  var budgetVal = parseFloat(budget.value) || 0;
  var touristsVal = parseFloat(tourists.value) || 0;
  var dailySpendVal = parseFloat(dailySpend.value) || 150;
  var durationVal = parseFloat(duration.value) || 16;
  var multiplierVal = parseFloat(multiplierEl.value) || 1.5;

  // Update range display
  var rangeDisplay = document.getElementById('multiplier-display');
  if (rangeDisplay) rangeDisplay.textContent = multiplierVal.toFixed(1);

  // Calculate
  var directEffect = (touristsVal * 1000 * dailySpendVal * durationVal) / 1e9; // in $ billions
  var indirectEffect = directEffect * (multiplierVal - 1);
  var totalEffect = directEffect + indirectEffect;
  var roiEstimate = (totalEffect - budgetVal) / (budgetVal || 1) * 100;

  // Adjust ROI based on event type averages
  if (budgetVal > 0) {
    roiEstimate = Math.max(roiEstimate, -60);
  }

  // Display results
  var directEl = document.getElementById('result-direct');
  var indirectEl = document.getElementById('result-indirect');
  var totalEl = document.getElementById('result-total');
  var roiEl = document.getElementById('result-roi');
  var comparisonEl = document.getElementById('result-comparison');

  if (directEl) directEl.textContent = '$' + directEffect.toFixed(2) + ' млрд';
  if (indirectEl) indirectEl.textContent = '$' + indirectEffect.toFixed(2) + ' млрд';
  if (totalEl) totalEl.textContent = '$' + totalEffect.toFixed(2) + ' млрд';
  if (roiEl) roiEl.textContent = (roiEstimate >= 0 ? '+' : '') + roiEstimate.toFixed(0) + '%';

  // Find closest comparison
  if (comparisonEl && budgetVal > 0) {
    var closest = REPORT_DATA.megaEvents.reduce(function(prev, curr) {
      return Math.abs(curr.cost - budgetVal) < Math.abs(prev.cost - budgetVal) ? curr : prev;
    });
    comparisonEl.textContent = 'Ваш проект по масштабу сопоставим с ' + closest.event + ' (затраты: ' + closest.cost + ' ' + closest.costUnit + ', результат: ' + closest.result + ')';
  }

  // Render calculator chart
  renderCalcChart(getChartColors(), directEffect, indirectEffect);
}

function renderCalcChart(colors, direct, indirect) {
  var ctx = document.getElementById('chart-calculator');
  if (!ctx) return;

  if (reportCharts.calculator) {
    reportCharts.calculator.destroy();
  }

  direct = direct || 0;
  indirect = indirect || 0;

  reportCharts.calculator = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Прямой эффект', 'Косвенный эффект', 'Совокупный'],
      datasets: [{
        data: [direct, indirect, direct + indirect],
        backgroundColor: [colors.red, colors.teal, '#666666'],
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {legend: {display: false}},
      scales: {
        y: {beginAtZero: true, title: {display: true, text: '$ млрд'}}
      }
    }
  });
}

// ── MEGA EVENTS TABLE ──
function renderMegaEventsTable() {
  var tbody = document.getElementById('mega-events-tbody');
  if (!tbody) return;
  tbody.innerHTML = REPORT_DATA.megaEvents.map(function(d) {
    return '<tr class="' + (d.success ? 'success-row' : 'fail-row') + '">' +
      '<td><strong>' + d.event + '</strong></td>' +
      '<td>' + d.type + '</td>' +
      '<td>' + d.cost + ' ' + d.costUnit + '</td>' +
      '<td>' + d.effect + '</td>' +
      '<td>' + d.tourism + '</td>' +
      '<td class="' + (d.success ? 'tag-success' : 'tag-fail') + '">' + d.result + '</td>' +
    '</tr>';
  }).join('');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
  initNewsFilters();
  initReportTabs();
  renderMegaEventsTable();
  renderQuiz();

  // Calculator inputs
  document.querySelectorAll('#section-calculator input, #section-calculator select').forEach(function(el) {
    el.addEventListener('input', calculateResults);
    el.addEventListener('change', calculateResults);
  });

  // Navigate to initial section
  navigateTo(getActiveSection());

  // Close modal on ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
});
