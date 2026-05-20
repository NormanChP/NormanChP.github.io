import { useEffect, useRef, useState, createContext, useContext } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  MapPin,
  Cpu,
  Radio,
  ShieldAlert,
  Lightbulb,
  Globe,
  TerminalIcon,
  LanguagesIcon,
} from "lucide-react";
import heroMine from "@/assets/hero-mine.jpg";
import grediseno from "@/assets/rediseno.png";
import gTruck from "@/assets/gallery-truck.jpeg";
import gtexas from "@/assets/Garland-Texas.jpeg";
import gequipo from "@/assets/control-cio.jpeg";
import gcomisionado from "@/assets/comisionado-equipo.jpeg";
import gControl from "@/assets/gallery-control.jpeg";
import gDrill from "@/assets/gallery-drill.jpeg";
import gPano from "@/assets/gallery-pano.jpeg";
import portrait from "@/assets/portrait-placeholder.png";
import ima_1 from "@/assets/ima-1.png";
import ima_2 from "@/assets/ima-2.jpeg";
import ima_3 from "@/assets/ima.jpeg";

/* ── Types ───────────────────────────────────────────────────── */
type Lang = "es" | "en" | "pt" | "qu";
type T4 = Record<Lang, string>;

/* ── i18n helpers ────────────────────────────────────────────── */
const LANG_LABELS: Record<Lang, string> = { es: "Español", en: "English", pt: "Português", qu: "Quechua" };

const imagenes: string[] = [ima_1, ima_2, ima_3];

/* ── Full translation dictionary ─────────────────────────────── */
type Dict = {
  available: string;
  navProfile: string; navProjects: string; navGallery: string;
  navTraining: string; navSkills: string;
  heroH1a: string; heroH1b: string; heroH1c: string;
  heroSub: string; heroBtn: string;
  heroStat1: string; heroStat2: string; heroStat3: string;
  heroJob: string;
  aboutLabel: string; aboutHead: string; aboutDim: string;
  aboutP1: string; aboutP2: string; aboutP3: string;
  aboutCardEye: string; aboutCardH: string;
  aboutCompany: string; aboutRole: string;
  aboutLocation: string; aboutExp: string;
  tags: string[];
  projectsLabel: string; projectsHead: string; projectsDim: string;
  addMore: string;
  galleryLabel: string; galleryHead: string; galleryDim: string;
  trainingLabel: string; trainingHead: string; trainingDim: string;
  skillsLabel: string; skillsHead: string; skillsDim: string;
  footerCopy: string;
  photoName: string; photoProfession: string;
  scrollHint: string;
};

const renderizarTextoConNegrita = (texto: string) => {
  const partes = texto.split(/\*\*([\s\S]*?)\*\*/g);
  return partes.map((parte, i) => (i % 2 === 1 ? <strong key={i} className="text-white font-bold">{parte}</strong> : parte));
};

const I18N: Record<Lang, Dict> = {
  es: {
    available: "Disponible",
    navProfile: "Perfil", navProjects: "Proyectos", navGallery: "Galería",
    navTraining: "Formación", navSkills: "Skills",
    heroH1a: "desarrollo", heroH1b: "innovación", heroH1c: "tecnología",
    heroSub: "Ingeniero Mecatrónico especializado en equipos autónomos y teleoperados, plataformas de gestión de flotas y tecnologías para el sector minero.",
    heroBtn: "Ver proyectos",
    heroStat1: "años en minería", heroStat2: "operaciones mineras", heroStat3: "enfoque principal",
    heroJob: "Perú",
    aboutLabel: "Perfil", aboutHead: "Acerca", aboutDim: "de mí",
    aboutP1: "¡Hola! Soy **Norman Chipana**, **Ingeniero Mecatrónico** apasionado por la automatización y la innovación en entornos de alta exigencia. Creo firmemente que cualquier sistema puede optimizarse y evolucionar a través de la ingeniería.",
    aboutP2: "Mi trayectoria conecta la **automatización industrial con la gran minería**. Cuento con experiencia en soporte de hardware y software para **sistemas autónomos y teleoperados**, y actualmente me desempeño como **Ingeniero de Operaciones en Hexagon Mining**, especializándome en **sistemas de gestión de flotas (FMS/AHS)**. Me fascina conectar el código con la maquinaria pesada para resolver problemas complejos desde la raíz.",
    aboutP3: "Más allá de los datos y los fierros, mi mayor motor es mi familia y asegurar el bienestar de mis padres. Soy un **fiel amante de los animales** y los viajes. Mi meta es consolidarme como **especialista internacional en minería autónoma** y, a largo plazo, llevar mi ingeniería hacia la **minería espacial**.",
    aboutCardEye: "PERFIL / META", aboutCardH: "Especialista en Soluciones Tecnológicas",
    aboutCompany: "Empresa", aboutRole: "Cargo", aboutLocation: "Ubicación", aboutExp: "Experiencia",
    tags: ["Camiones Autónomos","Perforadoras","Gestión de Flotas","Seguridad","AHS / FMS","Dispatch","Mejora Continua","Innovación"],
    projectsLabel: "Proyectos", projectsHead: "Trabajo", projectsDim: "realizado",
    addMore: "Solicitar detalle del proyecto",
    galleryLabel: "Galería", galleryHead: "En", galleryDim: "terreno",
    trainingLabel: "Formación", trainingHead: "Formación", trainingDim: "& certificaciones",
    skillsLabel: "Competencias", skillsHead: "Stack", skillsDim: "técnico",
    footerCopy: "Diseñado por",
    photoName: "Nombre", photoProfession: "Profesión",
    scrollHint: "Desplazar",
  },
  en: {
    available: "Available",
    navProfile: "Profile", navProjects: "Projects", navGallery: "Gallery",
    navTraining: "Training", navSkills: "Skills",
    heroH1a: "development", heroH1b: "innovation", heroH1c: "technology",
    heroSub: "Mechatronic Engineer specialized in autonomous and remote-controlled equipment, fleet management platforms, and technologies for the mining sector.",
    heroBtn: "View projects",
    heroStat1: "years in mining", heroStat2: "mining operations", heroStat3: "main focus",
    heroJob: "Perú",
    aboutLabel: "Profile", aboutHead: "About", aboutDim: "me",
    aboutP1: "Hi! I'm **Norman Chipana**, a **Mechatronics Engineer** passionate about automation and innovation in high-demand environments. I firmly believe that any system can be optimized and evolved through engineering.",
    aboutP2: "My career bridges **industrial automation and large-scale mining**. I have experience providing complex hardware and software support for **autonomous and teleoperated systems**, and I currently work as a **Operations Engineer at Hexagon Mining**, specializing in **Fleet Management Systems (FMS/AHS)**. I love connecting code with heavy machinery to solve complex problems from the root.",
    aboutP3: "Beyond data and machinery, my main driver is my family and ensuring my parents' well-being. I am a **loyal animal lover** and enjoy traveling. My goal is to become an **international specialist in autonomous mining** and, in the long term, take my engineering skills to the future frontier of **space mining**.",
    aboutCardEye: "PROFILE / META", aboutCardH: "Technology Solutions Specialist",
    aboutCompany: "Company", aboutRole: "Role", aboutLocation: "Location", aboutExp: "Experience",
    tags: ["Autonomous Trucks","Drill Rigs","Fleet Management","Safety","AHS / FMS","Dispatch","Continuous Improvement","Innovation"],
    projectsLabel: "Projects", projectsHead: "Work", projectsDim: "done",
    addMore: "Request project details",
    galleryLabel: "Gallery", galleryHead: "In", galleryDim: "the field",
    trainingLabel: "Training", trainingHead: "Training", trainingDim: "& certifications",
    skillsLabel: "Skills", skillsHead: "Technical", skillsDim: "stack",
    footerCopy: "Crafted by",
    photoName: "Name", photoProfession: "Profession",
    scrollHint: "Scroll",
  },
  pt: {
    available: "Disponível",
    navProfile: "Perfil", navProjects: "Projetos", navGallery: "Galeria",
    navTraining: "Formação", navSkills: "Skills",
    heroH1a: "desenvolvimento", heroH1b: "inovação", heroH1c: "tecnologia",
    heroSub: "Engenheiro Mecatrônico especializado em equipamentos autônomos e teleoperados, plataformas de gestão de frotas e tecnologias para o setor minerário.",
    heroBtn: "Ver projetos",
    heroStat1: "anos em mineração", heroStat2: "operações mineiras", heroStat3: "foco principal",
    heroJob: "Perú",
    aboutLabel: "Perfil", aboutHead: "Sobre", aboutDim: "mim",
    aboutP1: "Olá! Sou **Norman Chipana**, **Engenheiro Mecatrônico** apaixonado por automação e inovação em ambientes de alta exigência. Acredito firmemente que qualquer sistema pode ser otimizado e evoluir através da engenharia.",
    aboutP2: "Minha trajetória conecta a **automação industrial com a grande mineração**. Tenho experiência em suporte de hardware e software para **sistemas autônomos e teleoperados** e, atualmente, atuo como **Engenheiro de Operações na Hexagon Mining**, especializando-me em **sistemas de gestão de frotas (FMS/AHS)**. Fascinam-me conectar o código com o maquinário pesado para resolver problemas complexos desde a raiz.",
    aboutP3: "Além dos dados e das máquinas, meu maior motor é minha família e garantir o bem-estar dos meus pais. Sou um **fiel amante dos animais** e de viagens. Minha meta é me consolidar como **especialista internacional em mineração autônoma** e, a prazo, levar minha engenharia para a futura fronteira da **mineração espacial**.",
    aboutCardEye: "PERFIL / META", aboutCardH: "Especialista em Soluções Tecnológicas",
    aboutCompany: "Empresa", aboutRole: "Cargo", aboutLocation: "Localização", aboutExp: "Experiência",
    tags: ["Caminhões Autônomos","Perfuradoras","Gestão de Frotas","Segurança","AHS / FMS","Despacho","Melhoria Contínua","Inovação"],
    projectsLabel: "Projetos", projectsHead: "Trabalho", projectsDim: "realizado",
    addMore: "Solicitar detalhes do projeto",
    galleryLabel: "Galeria", galleryHead: "Em", galleryDim: "campo",
    trainingLabel: "Formação", trainingHead: "Formação", trainingDim: "& certificações",
    skillsLabel: "Competências", skillsHead: "Stack", skillsDim: "técnico",
    footerCopy: "Desenvolvido por",
    photoName: "Nome", photoProfession: "Profissão",
    scrollHint: "Rolar",
  },
  qu: {
    available: "Llamkay munani",
    navProfile: "Riqsiymi", navProjects: "Llamkaykuna", navGallery: "Qhawaykuna",
    navTraining: "Yachay", navSkills: "Atipaykuna",
    heroH1a: "wiñachiy", heroH1b: "musuqchay", heroH1c: "teknología",
    heroSub: "Mecatrónica Ingeniero, equipos autónomos nisqakunapi, flota manejo sistemaspi, mina sectorpi teknologíapi yachaq.",
    heroBtn: "Llamkaykuna qhaway",
    heroStat1: "wata minapiqa", heroStat2: "mina operacionkuna", heroStat3: "ñawpaq llamkay",
    heroJob: "Perú",
    aboutLabel: "Riqsiymi", aboutHead: "Ñuqamanta", aboutDim: "willakuy",
    aboutP1: "Allillanchu! Ñoqaqa **Norman Chipana** kani, **Ingeniero Mecatrónico** llamkayniypi ruraykunata kikillanmanta purichiyta ancha munaq hinaspa ingeniería yachaywan allinchasqa.",
    aboutP2: "Llamkayniyqa **hatun qoya llamkaykunawanmi** tinkan. **Sistemas autónomos y teleoperados** llikakunapim yachani, hinaspa kunanqa **Hexagon Mining nisqapim Ingeniero de Operaciones** kani, chaypim **sistemas de gestión de frotas (FMS/AHS)** qawani.",
    aboutP3: "Aswanqa, tayta-mamaypa allin kayninmi hinaspa aylluyllam kallpanchawaqniyqa. **Animalkunatam ancha munani**. Hatun suyakuyniyqa **minería autónoma** yachaq kaymi pachantinpi hinaspa kay yachayniyta **minería espacial** nisqaman apaymi.",
    aboutCardEye: "RIQSIYMI / META", aboutCardH: "Teknología Soluciones Especialista",
    aboutCompany: "Empresa", aboutRole: "Llamkay", aboutLocation: "Tiyay siti", aboutExp: "Experiencia",
    tags: ["Camiones Autónomos","Perforadoras","Flota Manejo","Seguridad","AHS / FMS","Despacho","Allichay Tukuy","Musuqchay"],
    projectsLabel: "Llamkaykuna", projectsHead: "Ruwasqa", projectsDim: "llamkaykuna",
    addMore: "Llamkay astawan qhaway",
    galleryLabel: "Qhawaykuna", galleryHead: "Chawpi", galleryDim: "llamkaypiqa",
    trainingLabel: "Yachay", trainingHead: "Yachay", trainingDim: "& certificacionkuna",
    skillsLabel: "Atipaykuna", skillsHead: "Yachay", skillsDim: "atipaykuna",
    footerCopy: "Allichasqa",
    photoName: "Suti", photoProfession: "Profesión",
    scrollHint: "Uraman",
  },
};

/* ── Data (multilingual) ─────────────────────────────────────── */
const PROJECTS: Array<{ 
  n: string; 
  cat: T4; 
  title: T4; 
  desc: T4; 
  year: string; 
  isFeatured: boolean; 
  img: string; 
  tags: string[] 
}> = [
  {
    n: "001",
    cat: { 
      es: "Digitalización · Equipos Pesados", 
      en: "Digitalization · Heavy Equipment", 
      pt: "Digitalização · Equipamentos Pesados", 
      qu: "Digitalización · Hatun Makinariya" 
    },
    title: { 
      es: "Sistema de Gestión y Control de Consumibles", 
      en: "Consumables Management and Control System", 
      pt: "Sistema de Gestão e Controle de Consumíveis", 
      qu: "Consumibles Kamachiy hinaspa Qaway Llika" 
    },
    desc: { 
      es: "Ante la falta de trazabilidad en el desgaste de componentes en perforación, diseñé e implementé un sistema integral para el registro y análisis en tiempo real de brocas y barras. La solución transformó datos operativos en métricas de rendimiento, optimizando el ciclo de vida de los consumibles y previniendo paradas imprevistas en la operación minera.", 
      en: "Due to the lack of traceability in drilling component wear, I designed and implemented an integrated system for real-time tracking and analysis of drill bits and rods. The solution transformed operational data into performance metrics, optimizing the consumables lifecycle and preventing unplanned downtime in mining operations.", 
      pt: "Diante da falta de rastreabilidade no desgaste de componentes de perfuração, projeta e implementei um sistema integrado para o registro e análise em tempo real de brocas e barras. A solução transformou dados operacionais em métricas de desempenho, otimizando o ciclo de vida dos consumíveis e prevenindo paradas imprevistas na operação mineradora.", 
      qu: "Perforación nisqapi componentes mana allin qawasqa kasqanrayku, huk llikata (sistema integral) ruwarqani brocas hinaspa barras nisqakunata tiempo real nisqapi qawanapaq. Kay allichayqa ruraykunapa datonkunatam métricas de rendimiento nisqaman tukuchirqan, consumibles nisqapa kawsayninta allinchaspa hinaspa qoya llamkaypi paradas imprevistas nisqakunata harkaspa." 
    },
    year: "2024",
    isFeatured: true,
    img: gDrill,
    tags: ["Desarrollo de Software", "Análisis de Datos", "Minería Digital"]
  },
  {
    n: "002",
    cat: { 
      es: "Telemetría · Sistemas en Tiempo Real", 
      en: "Telemetry · Real-Time Systems", 
      pt: "Telemetria · Sistemas em Tempo Real", 
      qu: "Telemetría · Tiempo Real Llikakuna" 
    },
    title: { 
      es: "Plataforma de Monitoreo y Alertas Tempranas para Flotas", 
      en: "Fleet Monitoring and Early Warning Platform", 
      pt: "Plataforma de Monitoramento e Alertas Prematuros para Frotas", 
      qu: "Flotakunapaq Monitoreo hinaspa Alertas Tempranas Plataforma" 
    },
    desc: { 
      es: "Diseñé e implementé una solución completa de telemetría orientada a la visualización geoespacial y de estado operativo de los equipos en tiempo real. El sistema integra un módulo automatizado de alertas que permite al área de mantenimiento anticipar fallas críticas de nivel base, reduciendo significativamente los tiempos de respuesta.", 
      en: "I designed and implemented a comprehensive telemetry solution focused on real-time geospatial visualization and operational status of equipment. The system integrates an automated alert module that enables the maintenance team to anticipate base-level critical failures, significantly reducing response times.", 
      pt: "Projetei e implementei uma solução completa de telemetria voltada para a visualização geoespacial e do status operacional dos equipamentos em tempo real. O sistema integra um módulo automatizado de alertas que permite à área de manutenção antecipar falhas críticas de nível base, reduzindo significativamente os tempos de resposta.", 
      qu: "Equipokunapa kawsayninta hinaspa geoespacial qawayninta tiempo real nisqapi qawanapaq telemetría allichayta ruwarqani. Kay llikaqa kikinmanta rurakuq alertakunatam kachun, chaymi mantenimiento areata yanapan sasa sasachakuykunata pacha ñawpaqman yachanapaq, kutichiy tiempokunata anchatam pisiyachispa." 
    },
    year: "2024",
    isFeatured: false,
    img: gControl,
    tags: ["Desarrollo de Software", "Análisis de Datos", "Minería Digital"]
  },
  {
    n: "003",
    cat: { 
      es: "Simulación · Sistemas Autónomos", 
      en: "Simulation · Autonomous Systems", 
      pt: "Simulação · Sistemas Autônomos", 
      qu: "Simulación · Kikillanmanta Puriq Llikakuna" 
    },
    title: { 
      es: "Simulador de Conectividad y Redes", 
      en: "Connectivity and Network Simulator", 
      pt: "Simulador de Conectividade e Redes", 
      qu: "Conectividad hinaspa Redes Simulador" 
    },
    desc: { 
      es: "Creé un entorno de simulación avanzado para replicar dinámicamente las condiciones de red y el comportamiento de la maquinaria. La herramienta permitió identificar y corregir anomalías críticas latentes en el sistema RRA que resultaban indetectables en entornos de producción, mitigando riesgos operativos antes del despliegue en campo.", 
      en: "I created an advanced simulation environment to dynamically replicate network conditions and machinery behavior. This tool enabled the identification and correction of latent critical anomalies within the RRA system that were undetectable in production environments, mitigating operational risks prior to field deployment.", 
      pt: "Criei um ambiente de simulação avançado para replicar dinamicamente as condições de rede e o comportamento do maquinário. A ferramenta permitiu identificar e corrigir anomalias críticas latentes no sistema RRA que eram indetectáveis em ambientes de produção, mitigando riscos operacionais antes da implantação em campo.", 
      qu: "Redpa kayninkunata hinaspa makinariyakunapa rurayninta kikinmanta qatichinapaq sapaq simulación suyuta paqarichirqani. Kay yanapakuywanmi RRA llikapi pakallapi kaq sasa sasachakuykunata tarirqani hinaspa allicharqani, ñawpaq ruraykunapi mana tarisqakunata, ruraykunapa riesgonta pisiyachispa campo nisqaman manaraq chayaspa." 
    },
    year: "2024",
    isFeatured: false,
    img: gPano,
    tags: ["Desarrollo de Software", "Análisis de Datos", "Minería Digital"]
  },
  {
    n: "004",
    cat: { 
      es: "Comisionamiento · Sistemas Autónomos", 
      en: "Commissioning · Autonomous Systems", 
      pt: "Comissionamento · Sistemas Autônomos", 
      qu: "Comisionamiento · Kikillanmanta Puriq Llikakuna" 
    },
    title: { 
      es: "Comisionamiento y Despliegue de Perforadoras Autónomas", 
      en: "Commissioning and Deployment of Autonomous Drills", 
      pt: "Comissionamento e Implantação de Perfuradoras Autônomas", 
      qu: "Kikillanmanta Puriq Perforadorakunapa Comisionamiento hinaspa Despliegue" 
    },
    desc: { 
      es: "Lideré el comisionamiento de perforadoras de alta tecnología a nivel de máquina base y sistemas de autonomía. Responsable de la configuración y validación del sistema de autonomía y de teleoperación, diseño de zonas de exclusión dinámica para garantizar una operación remota eficiente y sin riesgos.", 
      en: "I led the commissioning of high-tech drill rigs at the base machine and autonomy system levels. I was responsible for configuring and validating the autonomy and teleoperation systems, as well as designing dynamic exclusion zones to ensure a highly efficient, risk-free remote operation.", 
      pt: "Liderei o comissionamento de perfuradoras de alta tecnologia ao nível de máquina base e sistemas de autonomia. Fui responsável pela configuração e validação do sistema de autonomia e de teleoperação, além do design de zonas de exclusão dinâmica para garantir uma operação remota eficiente e livre de riscos.", 
      qu: "Hatun yachayniyoq perforadorakunapa comisionamientontam pusarqani máquina base hinaspa autonomía llikakunapi. Ñoqam rurarqani autonomía hinaspa teleoperación llikakunapa configuración hinaspa validación nisqanta, chaynallataq zonas de exclusión dinámica nisqakunatapas rurani karumanta allin hinaspa mana riesgoyoq llamkay kananpaq." 
    },
    year: "2025",
    isFeatured: false,
    img: gTruck,
    tags: ["Desarrollo de Software", "Análisis de Datos", "Minería Digital"]
  },
  {
    n: "005",
    cat: { 
      es: "Mejoras · Interfaces Críticas", 
      en: "Improvements · Critical Interfaces", 
      pt: "Melhorias · Interfaces Críticas", 
      qu: "Allichaykuna · Sasa Interfaces" 
    },
    title: { 
      es: "Rediseño y Optimización del Sistema de Gestión de Perforadoras", 
      en: "Redesign and Optimization of the Drill Management System", 
      pt: "Redesenho e Otimização do Sistema de Gestão de Perfuradoras", 
      qu: "Perforadorakuna Kamachiy Llikapa Rediseño hinaspa Optimización" 
    },
    desc: { 
      es: "Diseñé la plataforma de control operativa para adaptarla a los nuevos estándares de producción del cliente. Desarrollé una arquitectura modular con mayor funcionalidad técnica y rediseñé la interfaz de usuario (UX/UI), logrando reducir la complejidad operativa en campo y mejorando la velocidad de adopción por parte de los operadores.", 
      en: "I led the re-engineering of the operational control platform to align it with the client's new production standards. I developed a modular architecture featuring enhanced technical capabilities and redesigned the user interface (UX/UI), successfully reducing field operational complexity and accelerating user adoption rates among operators.", 
      pt: "Liderei a reengenharia da plataforma de controle operacional para adaptá-la aos novos padrões de produção do cliente. Desenvolvi uma arquitetura modular com maior funcionalidade técnica e redesenhei a interface do usuário (UX/UI), conseguindo reduzir a complexidade operacional em campo e melhorando a velocidade de adoção por parte dos operadores.", 
      qu: "Ruraykunata qawaq plataforma reingenieríatam pusarqani, clientepa musuq rurayninpa kamachikuyninkunaman tupanaykachispa. Huk arquitectura modular nisqatam rurarqani aswan funsión técnica nisqakunawan hinaspa interfaz de usuario (UX/UI) nisqantapas musuqmanta rurani, chaymi yanaparqan campopi sasa llamkaykunata pisiyachiyta hinaspa operadorkunapas utqayllaman yachanankunapaq." 
    },
    year: "2025",
    isFeatured: false,
    img: grediseno,
    tags: ["Desarrollo de Software", "Análisis de Datos", "Minería Digital"]
  }
];

const SKILLS_DATA: Array<{ icon: React.ElementType; name: T4; items: T4[] }> = [
  {
    icon: Cpu,
    name: { 
      es: "Automatización & Autonomía", 
      en: "Automation & Autonomy", 
      pt: "Automação & Autonomia", 
      qu: "Kikinmanta Puriy & Automatización" 
    },
    items: [
      { es: "Autonomía de perforadoras Epiroc", en: "Epiroc drill rig autonomy", pt: "Autonomia de perfuradoras Epiroc", qu: "Epiroc perforadorakunapa kikinmanta puriychanan" },
      { es: "Configuración de rutas y zonas de exclusión", en: "Route configuration and dynamic exclusion zones", pt: "Configuração de rotas e zonas de exclusão", qu: "Ñankunapa hinaspa zonas de exclusión nisqapa configuración" },
      { es: "Protocolos AHS y navegación autónoma", en: "AHS protocols and autonomous navigation", pt: "Protocolos AHS e navegação autônoma", qu: "AHS protokolokuna hinaspa kikinmanta puriq navegación" },
      { es: "Integración de sistemas hardware-software", en: "Hardware-software systems integration", pt: "Integração de sistemas hardware-software", qu: "Hardware-software llikakunapa tinkuchiyllan" },
      { es: "Soporte técnico especializado en sistemas autónomos", en: "Specialized technical support for autonomous systems", pt: "Suporte técnico especializado em sistemas autônomos", qu: "Kikinmanta puriq llikakunapi sapaq técnico yanapakuy" },
    ],
  },
  {
    icon: Radio,
    name: { 
      es: "Gestión de Flotas", 
      en: "Fleet Management", 
      pt: "Gestão de Frotas", 
      qu: "Flotakuna Kamachiy" 
    },
    items: [
      { es: "Surface Manager & Certiq", en: "Surface Manager & Certiq", pt: "Surface Manager & Certiq", qu: "Surface Manager & Certiq" },
      { es: "Op Pro", en: "Op Pro", pt: "Op Pro", qu: "Op Pro" },
      { es: "Monitoreo de condiciones operativas en tiempo real", en: "Real-time operational conditions monitoring", pt: "Monitoramento de condições operacionais em tempo real", qu: "Tiempo real nisqapi ruraykunapa kaynin qaway" },
      { es: "Telemetría de equipos", en: "Equipment telemetry", pt: "Telemetria de equipamentos", qu: "Equipokunapa telemetría nisqan" },
    ],
  },
  {
    icon: ShieldAlert,
    name: { 
      es: "Arquitectura IoT & Redes", 
      en: "IoT Architecture & Networks", 
      pt: "Arquitetura IoT & Redes", 
      qu: "IoT Arquitectura & Redes" 
    },
    items: [
      { es: "Edge Computing e IoT Industrial", en: "Edge Computing and Industrial IoT", pt: "Edge Computing e IoT Industrial", qu: "Edge Computing hinaspa Industrial IoT" },
      { es: "Protocolos: MQTT, OPC UA, Modbus, CAN", en: "Protocolos: MQTT, OPC UA, Modbus, CAN", pt: "Protocolos: MQTT, OPC UA, Modbus, CAN", qu: "Protocolos: MQTT, OPC UA, Modbus, CAN" },
      { es: "Redes Industriales: PROFINET, Ethernet, PROFIBUS", en: "Industrial Networks: PROFINET, Ethernet, PROFIBUS", pt: "Redes Industriais: PROFINET, Ethernet, PROFIBUS", qu: "Industrial Redes: PROFINET, Ethernet, PROFIBUS" },
      { es: "Lectura de P&ID y esquemas eléctricos", en: "P&ID reading and electrical schematics", pt: "Leitura de P&ID e esquemas elétricos", qu: "P&ID ñawinchay hinaspa esquemas eléctricos qaway" },
      { es: "Programación y análisis de señales de control", en: "Control signals programming and analysis", pt: "Programação e análise de sinais de controle", qu: "Control sennalkunapa programación hinaspa análisis" },
    ],
  },
  {
    icon: TerminalIcon,
    name: { 
      es: "Programación & Software", 
      en: "Programming & Software", 
      pt: "Programação & Software", 
      qu: "Programación & Software" 
    },
    items: [
      { es: "Python (Análisis de datos operativos)", en: "Python (Operational data analysis)", pt: "Python (Análise de dados operacionais)", qu: "Python (Ruraykunapa datonkunata qaway)" },
      { es: "SQL (Gestión y estructuración de bases de datos)", en: "SQL (Database management and structuring)", pt: "SQL (Gestão e estruturação de bancos de dados)", qu: "SQL (Bases de datos kamachiy hinaspa ruray)" },
      { es: "Rust, Ruby & C# (Desarrollo de aplicaciones locales/edge)", en: "Rust, Ruby & C# (Local/edge application development)", pt: "Rust, Ruby & C# (Desenvolvimento de aplicações locais/edge)", qu: "Rust, Ruby & C# (Locales/edge aplicacionkuna ruray)" },
      { es: "Desarrollo de aplicaciones multiplataforma", en: "Multiplatform application development", pt: "Desenvolvimento de aplicações multiplataforma", qu: "Multiplataforma aplicacionkunapa wiñachiyllan" },
      { es: "HTML & JavaScript (Desarrollo web y plataformas)", en: "HTML & JavaScript (Web and platform development)", pt: "HTML & JavaScript (Desenvolvimento web e plataformas)", qu: "HTML & JavaScript (Web hinaspa plataformas ruray)" },
    ],
  },
  {
    icon: Lightbulb,
    name: { 
      es: "Data Analytics & BI", 
      en: "Data Analytics & BI", 
      pt: "Data Analytics & BI", 
      qu: "Data Analytics & BI" 
    },
    items: [
      { es: "Power BI Avanzado (Dashboards técnicos de producción)", en: "Advanced Power BI (Technical production dashboards)", pt: "Power BI Avançado (Dashboards técnicos de produção)", qu: "Advanced Power BI (Ruraypaq dashboards técnicos)" },
      { es: "Tableau Avanzado & Looker Avanzado", en: "Advanced Tableau & Advanced Looker", pt: "Tableau Avançado & Looker Avançado", qu: "Advanced Tableau & Advanced Looker" },
      { es: "Modelamiento de datos operativos y detección de anomalías", en: "Operational data modeling and anomaly detection", pt: "Modelagem de dados operacionais e detecção de anomalias", qu: "Datokunapa modelamiento hinaspa sasachakuykuna tariy" },
      { es: "Transformación digital orientada a KPIs de disponibilidad", en: "Digital transformation focused on availability KPIs", pt: "Transformação digital orientada a KPIs de disponibilidade", qu: "Transformación digital availability KPIs nisqaman qawasqa" },
    ],
  },
  {
    icon: LanguagesIcon,
    name: { 
      es: "Idiomas", 
      en: "Languages", 
      pt: "Idiomas", 
      qu: "Rimaykuna" 
    },
    items: [
      { es: "Español - Nativo", en: "Spanish - Native", pt: "Espanhol - Nativo", qu: "Español - Paqarisqa rimay" },
      { es: "Inglés - Intermedio profesional", en: "English - Professional Intermediate", pt: "Inglês - Intermediário profissional", qu: "Inglés - Chawpi llamkay rimay" },
      { es: "Português - Básico conversacional", en: "Portuguese - Conversational Basic", pt: "Português - Básico conversacional", qu: "Português - Qallariy rimay" },
      { es: "Quechua - Nativo", en: "Quechua - Native", pt: "Quechua - Paqarisqa rimay", qu: "Runasimiq - Paqarisqa rimay" },
    ],
  },
];

const TRAINING_DATA: Array<{ year: string; title: string; inst: string; desc: T4; badge: T4 }> = [
  {
    year: "2021", 
    title: "Ingeniería Mecatrónica", 
    inst: "Universidad Peruana de Ciencias Aplicadas",
    desc: { 
      es: "Formación integral orientada al diseño e integración de sistemas robóticos, control de procesos industriales y automatización de maquinaria pesada.", 
      en: "Comprehensive education focused on the design and integration of robotic systems, industrial process control, and heavy machinery automation.", 
      pt: "Formação integral voltada ao design e integração de sistemas robóticos, controle de processos industriais e automação de maquinário pesado.", 
      qu: "Sistemas robóticos, industrial ruraykunapa controlnin hinaspa hatun makinariyapa automatizacionnin llikakunata tinkuchiy yachay." 
    },
    badge: { es: "Titulado", en: "Graduate", pt: "Graduado", qu: "Titulado" },
  },
  {
    year: "2024", 
    title: "Bootcamp de Autonomía", 
    inst: "Epiroc - E.E.U.U",
    desc: { 
      es: "Certificación especializada en la configuración avanzada de sistemas autónomo de equipos de perforación, diseño de rutas dinámicas mediante algoritmos de optimización, zonas de exclusión y gestión de protocolos de seguridad crítica para flotas masivas.", 
      en: "Specialized certification in advanced configuration of autonomous drilling systems, dynamic route design through optimization algorithms, exclusion zones, and critical safety protocol management for large fleets.", 
      pt: "Certificação especializada na configuração avançada de sistemas autônomos de equipamentos de perfuração, design de rotas dinâmicas por meio de algoritmos de otimização, zonas de exclusão e gestão de protocolos de segurança crítica para frotas massivas.", 
      qu: "Perforación equipokunapa kikinmanta puriq llikankunapa configuración advanced nisqapi sapaq yachay, ñankunapa ruraynin, zonas de exclusión hinaspa hatun flotakunapaq seguridad crítica protokolokuna kamachiy." 
    },
    badge: { es: "OEM Certificado", en: "OEM Certified", pt: "OEM Certificado", qu: "OEM Certificado" },
  },
  {
    year: "2025", 
    title: "Train the trainer", 
    inst: "Epiroc",
    desc: { 
      es: "Capacitación en habilidades blandas y de enseñanza dirigido para el personal especializado en productos tecnológicos de autonomía.", 
      en: "Training in soft skills and teaching methodologies designed for technical personnel specialized in autonomous technology products.", 
      pt: "Capacitação em habilidades interpessoais e metodologias de ensino voltada para o pessoal especializado em produtos tecnológicos de autonomia.", 
      qu: "Kikinmanta puriq ruraykunapi sapaq yachaq llamkaqkunapaq yachachiy yachaykunapi hinaspa habilidades blandas nisqapi yachachiy." 
    },
    badge: { es: "OEM Certificado", en: "OEM Certified", pt: "OEM Certificado", qu: "OEM Certificado" },
  },
  {
    year: "2025", 
    title: "LinkOA for Hauling", 
    inst: "Epiroc",
    desc: { 
      es: "Capacitación en el sistema de autonomía para camiones a nivel de hardware y software.", 
      en: "Training on the autonomy system for haul trucks at both hardware and software levels.", 
      pt: "Treinamento no sistema de autonomia para caminhões de transporte em nível de hardware e software.", 
      qu: "Hatun camionkunapaq kikinmanta puriq llikanpi yachachiy, hardware hinaspa software nivelpi." 
    },
    badge: { es: "OEM Certificado", en: "OEM Certified", pt: "OEM Certificado", qu: "OEM Certificado" },
  },
];

const GALLERY_DATA: Array<{ src: string; cap: T4; area: string }> = [
  { 
    src: gcomisionado, 
    cap: { 
      es: "Faena nocturna · Vista panorámica", 
      en: "Night shift · Panoramic view", 
      pt: "Turno noturno · Vista panorâmica", 
      qu: "Tuta llamkay · Panorámica qaway" 
    }, 
    area: "a" 
  },
  { 
    src: gPano,   
    cap: { 
      es: "Control Integrado · Sistemas Autónomos", 
      en: "Integrated Control · Autonomous Systems", 
      pt: "Controle Integrado · Sistemas Autônomos", 
      qu: "Control Integrado · Kikillanmanta Puriq Llikakuna" 
    }, 
    area: "b" 
  },
  { 
    src: gequipo, 
    cap: { 
      es: "Monitoreo operativo en Sala de Control", 
      en: "Operational monitoring in Control Room", 
      pt: "Monitoramento operacional na Sala de Controle", 
      qu: "Control Salapi ruraykunapa qawayllan" 
    }, 
    area: "c" 
  },
  { 
    src: gtexas,   
    cap: { 
      es: "Entrenamiento en Autonomía · Garland Texas", 
      en: "Autonomy Training · Garland Texas", 
      pt: "Treinamento em Autonomia · Garland Texas", 
      qu: "Autonomía Yachachiy · Garland Texas" 
    }, 
    area: "d" 
  },
  { 
    src: gDrill,    
    cap: { 
      es: "Tajo abierto · Vista panorámica", 
      en: "Open pit · Panoramic view", 
      pt: "Cava aberta · Vista panorâmica", 
      qu: "Tajo abierto · Panorámica qaway" 
    }, 
    area: "e" 
  },
];

/* ── Context ─────────────────────────────────────────────────── */
const LangCtx = createContext<{ lang: Lang; t: Dict }>({ lang: "es", t: I18N.es });
const useLang = () => useContext(LangCtx);

/* ────────────────────────────────────────────────────────────── */
function App() {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LangCtx.Provider value={{ lang, t: I18N[lang] }}>
      <div className="mt-bg">
        <Style />
        <Nav lang={lang} setLang={setLang} />
        <Hero />
        <About />
        <Projects />
        <Gallery />
        <Training />
        <Skills />
        <Footer />
      </div>
    </LangCtx.Provider>
  );
}

/* ── Language Switcher ───────────────────────────────────────── */
function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const LANGS: Lang[] = ["es", "en", "pt", "qu"];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="mt-lang-wrap" ref={ref}>
      <button
        className={`mt-lang-btn ${open ? "mt-lang-btn--open" : ""}`}
        onClick={() => setOpen(p => !p)}
        aria-label="Cambiar idioma"
      >
        <Globe size={13} />
        <span>{LANG_LABELS[lang]}</span>
        <span className="mt-lang-chevron">▾</span>
      </button>

      {open && (
        <div className="mt-lang-drop">
          {LANGS.map(l => (
            <button
              key={l}
              className={`mt-lang-opt ${l === lang ? "mt-lang-opt--active" : ""}`}
              onClick={() => { setLang(l); setOpen(false); }}
            >
              <span className="mt-lang-code">{LANG_LABELS[l]}</span>
              {l === lang && <span className="mt-lang-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Nav ─────────────────────────────────────────────────────── */
function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    [t.navProfile, "about"], [t.navProjects, "projects"],
    [t.navGallery, "gallery"], [t.navTraining, "training"],
    [t.navSkills, "skills"],
  ] as const;

  return (
    <nav className={`mt-nav ${scrolled ? "mt-nav--scrolled" : ""}`}>
      <a href="#top" className="mt-logo">NORMAN<span>.CHIPANA</span></a>
      <ul className="mt-nav-list">
        {links.map(([label, id]) => (
          <li key={id}><a href={`#${id}`}>{label}</a></li>
        ))}
      </ul>
      <div className="mt-nav-right">
        <LangSwitcher lang={lang} setLang={setLang} />
        <div className="mt-status">
          <span className="mt-dot" />
          <span>{t.available}</span>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="mt-hero">
      <motion.div className="mt-hero-bg" style={{ y, opacity }}>
        <img src={heroMine} alt="" width={1920} height={1280} />
        <div className="mt-hero-grad" />
        <div className="mt-grid" />
      </motion.div>

      <div className="mt-hero-split">
        <motion.div className="mt-hero-content"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <h1 className="mt-h1">
            <span>{t.heroH1a}</span>
            <span className="mt-outline">{t.heroH1b}</span>
            <span>{t.heroH1c}</span>
          </h1>
          <p className="mt-hero-sub">{t.heroSub}</p>
          <div className="mt-hero-cta">
            <a href="#projects" className="mt-btn mt-btn--primary">
              {t.heroBtn} <ArrowUpRight size={16} />
            </a>
          <div className="mt-footer-links">
            <a href="mailto:nfchipana@gmail.com" className="mt-footer-icon" aria-label="Email"><Mail size={24} /></a>
            <a href="https://www.linkedin.com/in/norman-chipana-palomino" target="_blank" rel="noopener noreferrer" className="mt-footer-icon" aria-label="LinkedIn"><Linkedin size={24} /></a>
          </div>
          </div>
          <div className="mt-hero-stats">
            {[["4+", t.heroStat1], ["4", t.heroStat2], ["AHS/FMS", t.heroStat3]].map(([k, v]) => (
              <div key={k} className="mt-stat">
                <div className="mt-stat-k">{k}</div>
                <div className="mt-stat-v">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-hero-photo"
          initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mt-photo-frame">
            <img src={portrait} alt={t.photoName} width={896} height={1280} />
            <div className="mt-photo-grain" />
            <div className="mt-photo-tag"><span className="mt-mark" />{t.heroJob}</div>
            <div className="mt-photo-meta">
              <div><div className="k">{t.photoName}</div><div className="v">Norman F. Chipana</div></div>
              <div><div className="k">{t.photoProfession}</div><div className="v">Ing. Mecatrónico</div></div>
            </div>
          </div>
          <div className="mt-photo-corner mt-photo-corner--tl" />
          <div className="mt-photo-corner mt-photo-corner--br" />
        </motion.div>
      </div>

      <div className="mt-scroll-hint">
        <div className="mt-scroll-line" />
        <span>{t.scrollHint}</span>
      </div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────────── */
function About() {
  const { t } = useLang();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(intervalo);
  }, []);

  return (
    <Section id="about" idx="01" label={t.aboutLabel}>
      <SectionHeading head={t.aboutHead} dim={t.aboutDim} />
      <div className="mt-about">
        <div className="mt-about-text">
          <p>{renderizarTextoConNegrita(t.aboutP1)}</p>
          <p>{renderizarTextoConNegrita(t.aboutP2)}</p>
          <p>{renderizarTextoConNegrita(t.aboutP3)}</p>
          <div className="mt-tags">
            {t.tags.map(tag => <span key={tag} className="mt-tag">{tag}</span>)}
          </div>
        </div>
<motion.div className="mt-hero-photo"
          initial={{ opacity: 0, scale: 0.96, y: 24 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          
          {/* Añadimos estilos inline preventivos para asegurar que el desvanecimiento no altere las dimensiones físicas del marco */}
          <div className="mt-photo-frame" style={{ position: "relative", overflow: "hidden" }}>
            
            {/* AnimatePresence gestiona la salida suave de la foto anterior */}
            <AnimatePresence mode="popLayout">
              <motion.img
                key={index} // Al cambiar el index, se dispara la animación cruzada
                src={imagenes[index]} 
                alt={t.photoName} 
                width={896} 
                height={1280}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover" // Mantiene las proporciones intactas en ambas imágenes
                }}
              />
            </AnimatePresence>

            {/* El efecto grain se queda estático arriba de la transición de imágenes */}
            <div className="mt-photo-grain" style={{ zIndex: 2, pointerEvents: "none" }} />
          </div>
          
          <div className="mt-photo-corner mt-photo-corner--tl" />
          <div className="mt-photo-corner mt-photo-corner--br" />
        </motion.div>
      </div>
    </Section>
  );
}

/* ── Projects ────────────────────────────────────────────────── */
function Projects() {
  const { t, lang } = useLang();
  return (
    <Section id="projects" idx="02" label={t.projectsLabel} tone="deep">
      <SectionHeading head={t.projectsHead} dim={t.projectsDim} />
      <div className="mt-projects">
        {PROJECTS.map((p, i) => (
          <motion.div key={p.n} className="mt-project"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay: i * 0.06 }}>
            <div className="mt-project-num">{p.n}</div>
            <div className="mt-project-img-wrap">
              <img src={p.img} alt={p.title[lang]} className="mt-project-img" loading="lazy" />
            </div>
            <div className="mt-project-body">
              <div className="mt-project-cat">{p.cat[lang]}</div>
              {p.isFeatured && (
                <div className="flex my-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber border border-primary/30 text-[10px] font-bold tracking-wider uppercase">
                    ✨ Proyecto ganador de concurso Epiroc
                  </span>
                </div>
              )}
              <h3 className="mt-project-title">{p.title[lang]}</h3>
              <p className="mt-project-desc">{p.desc[lang]}</p>
            </div>
            <div className="mt-project-right">
              <div className="mt-project-year">{p.year}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ── Gallery ─────────────────────────────────────────────────── */
function Gallery() {
  const { t, lang } = useLang();
  return (
    <Section id="gallery" idx="03" label={t.galleryLabel} wide>
      <SectionHeading head={t.galleryHead} dim={t.galleryDim} />
      <div className="mt-gallery">
        {GALLERY_DATA.map(g => (
          <figure key={g.area} className={`mt-g mt-g--${g.area}`}>
            <img src={g.src} alt={g.cap[lang]} loading="lazy" />
            <figcaption>{g.cap[lang]}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ── Training ────────────────────────────────────────────────── */
function Training() {
  const { t, lang } = useLang();
  return (
    <Section id="training" idx="04" label={t.trainingLabel} tone="deep">
      <SectionHeading head={t.trainingHead} dim={t.trainingDim} />
      <div className="mt-training">
        {TRAINING_DATA.map((item, i) => (
          <motion.article key={item.title} className="mt-t"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.05 }}>
            <div className="mt-t-year">{item.year}</div>
            <h3 className="mt-t-title">{item.title}</h3>
            <div className="mt-t-inst">{item.inst}</div>
            <p className="mt-t-desc">{item.desc[lang]}</p>
            <span className="mt-t-badge">{item.badge[lang]}</span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ── Skills ──────────────────────────────────────────────────── */
function Skills() {
  const { t, lang } = useLang();
  return (
    <Section id="skills" idx="05" label={t.skillsLabel}>
      <SectionHeading head={t.skillsHead} dim={t.skillsDim} />
      <div className="mt-skills">
        {SKILLS_DATA.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} className="mt-sk"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <div className="mt-sk-num">0{i + 1}</div>
              <div className="mt-sk-icon"><Icon size={20} /></div>
              <h3>{s.name[lang]}</h3>
              <ul>{s.items.map((it, j) => <li key={j}>{it[lang]}</li>)}</ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-footer">
      <a href="#top" className="mt-logo">NORMAN<span>.CHIPANA</span></a>
      <div className="mt-copy">© {new Date().getFullYear()} · {t.footerCopy} Norman Chipana Palomino</div>
      <div className="mt-footer-links">
        <a href="mailto:nfchipana@gmail.com" className="mt-footer-icon" aria-label="Email"><Mail size={16} /></a>
        <a href="https://www.linkedin.com/in/norman-chipana-palomino" target="_blank" rel="noopener noreferrer" className="mt-footer-icon" aria-label="LinkedIn"><Linkedin size={16} /></a>
        <a href="#about" className="mt-footer-icon" aria-label="Ubicación"><MapPin size={16} /></a>
      </div>
    </footer>
  );
}

/* ── Shared components ───────────────────────────────────────── */
function Section({ id, idx, label, tone, wide, children }: {
  id: string; idx: string; label: string; tone?: "deep"; wide?: boolean; children: React.ReactNode;
}) {
  return (
    <section id={id} className={`mt-sec ${tone === "deep" ? "mt-sec--deep" : ""} ${wide ? "mt-sec--wide" : ""}`}>
      <div className="mt-sec-label"><span>{idx}</span>{label}</div>
      {children}
    </section>
  );
}

function SectionHeading({ head, dim }: { head: string; dim: string }) {
  return <h2 className="mt-h2">{head} <span className="mt-dim">{dim}</span></h2>;
}

/* ── Styles ──────────────────────────────────────────────────── */
function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Inter:wght@200;300;400&display=swap');

      .mt-bg {
        --bg: #04050a;
        --bg-deep: #070810;
        --surface: #0b0d16;
        --surface-2: #11141f;
        --line: rgba(110,180,255,.07);
        --line-strong: rgba(110,180,255,.16);
        --accent: #f0b429;
        --accent-soft: rgba(240,180,41,.45);
        --accent-glow: rgba(240,180,41,.18);
        --cyan: #4dd8e8;
        --cyan-soft: rgba(77,216,232,.50);
        --text: #d1d5db;
        --text-2: #c8d3e0;
        --muted: #d1d5db;
        --muted-2: #d1d5db;
        background: var(--bg); color: var(--text);
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 300; letter-spacing: -0.005em;
        min-height: 100vh; overflow-x: hidden;

      }
      .mt-bg * { box-sizing: border-box; }

      /* NAV */
      .mt-nav {
        position: fixed; inset: 0 0 auto 0; z-index: 80;
        display: flex; align-items: center; justify-content: space-between;
        padding: 1.1rem 2rem;
        transition: background .35s, backdrop-filter .35s, border-color .35s, padding .25s;
        border-bottom: 1px solid transparent;
      }
      .mt-nav--scrolled {
        background: rgba(5,6,8,.72);
        backdrop-filter: blur(20px) saturate(160%);
        border-bottom-color: var(--line);
        padding: .8rem 2rem;
      }
      .mt-logo {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: .92rem; letter-spacing: .22em; text-transform: uppercase;
        color: var(--text); text-decoration: none;
      }
      .mt-logo span { color: var(--accent); }
      .mt-nav-list { display: flex; gap: 2rem; list-style: none; padding: 0; margin: 0; }
      .mt-nav-list a {
        font-family: 'JetBrains Mono', monospace; font-size: .72rem;
        letter-spacing: .12em; text-transform: uppercase;
        color: var(--muted); text-decoration: none; transition: color .2s;
      }
      .mt-nav-list a:hover { color: var(--accent); }
      .mt-nav-right { display: flex; align-items: center; gap: .75rem; }
      @media (max-width: 820px) { .mt-nav-list { display: none; } }
      @media (max-width: 560px) { .mt-status { display: none; } }

      /* LANGUAGE SWITCHER */
      .mt-lang-wrap { position: relative; }
      .mt-lang-btn {
        display: flex; align-items: center; gap: .4rem;
        font-family: 'JetBrains Mono', monospace; font-size: .68rem;
        letter-spacing: .14em; text-transform: uppercase;
        color: var(--muted-2);
        padding: .45rem .8rem;
        border: 1px solid var(--line); border-radius: 999px;
        background: rgba(94,227,255,.04);
        cursor: pointer;
        transition: color .2s, border-color .2s, background .2s;
        user-select: none;
      }
      .mt-lang-btn:hover,
      .mt-lang-btn--open {
        color: var(--accent); border-color: var(--line-strong);
        background: rgba(94,227,255,.09);
      }
      .mt-lang-chevron { font-size: .65rem; opacity: .6; }
      .mt-lang-drop {
        position: absolute; top: calc(100% + .6rem); right: 0;
        background: #0d0f15;
        border: 1px solid var(--line-strong);
        border-radius: 14px;
        backdrop-filter: blur(24px);
        min-width: 160px;
        z-index: 300;
        overflow: hidden;
        box-shadow: 0 16px 48px -8px rgba(0,0,0,.8);
        animation: mt-drop-in .18s cubic-bezier(.22,1,.36,1);
      }
      @keyframes mt-drop-in {
        from { opacity: 0; transform: translateY(-8px) scale(.97); }
        to   { opacity: 1; transform: translateY(0)   scale(1);    }
      }
      .mt-lang-opt {
        display: flex; align-items: center; gap: .75rem;
        width: 100%; padding: .75rem 1.1rem;
        background: none; border: none; cursor: pointer;
        text-align: left; transition: background .15s;
        border-bottom: 1px solid var(--line);
      }
      .mt-lang-opt:last-child { border-bottom: none; }
      .mt-lang-opt:hover { background: rgba(94,227,255,.08); }
      .mt-lang-opt--active { background: rgba(94,227,255,.12); }
      .mt-lang-code {
        font-family: 'JetBrains Mono', monospace; font-size: .7rem;
        letter-spacing: .14em; color: var(--accent); text-transform: uppercase;
        min-width: 24px;
      }
      .mt-lang-name {
        font-family: 'Inter', sans-serif; font-size: .85rem; font-weight: 300;
        color: var(--muted-2); flex: 1;
      }
      .mt-lang-check { color: var(--accent); font-size: .75rem; margin-left: auto; }

      /* STATUS */
      .mt-status {
        display: flex; align-items: center; gap: .55rem;
        font-family: 'JetBrains Mono', monospace; font-size: .68rem;
        letter-spacing: .14em; color: var(--muted-2);
        padding: .45rem .75rem;
        border: 1px solid var(--line); border-radius: 999px;
        background: rgba(94,227,255,.04);
      }
      .mt-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #3dffa0; box-shadow: 0 0 10px 2px rgba(61,255,160,.6);
        animation: mt-pulse 2.4s ease infinite;
      }
      @keyframes mt-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

      /* HERO */
      .mt-hero {
        position: relative; min-height: 100vh;
        display: flex; align-items: center; justify-content: center;
        padding: 5rem 2rem 4rem; overflow: hidden;
      }
      .mt-hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
      .mt-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.55) saturate(1.1) contrast(1.05); }
      .mt-hero-grad {
        position: absolute; inset: 0;
        background: radial-gradient(60% 60% at 50% 30%, rgba(94,227,255,.12), transparent 70%),
                    linear-gradient(180deg, rgba(5,6,8,.4) 0%, rgba(5,6,8,.85) 70%, var(--bg) 100%);
      }
      .mt-grid {
        position: absolute; inset: 0;
        background-image: linear-gradient(to right, rgba(94,227,255,.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(94,227,255,.05) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
      }
      .mt-hero-split {
        position: relative; z-index: 1; width: 100%; max-width: 1280px;
        display: grid; grid-template-columns: 1.15fr .85fr; gap: 4rem; align-items: center;
      }
      @media (max-width: 960px) { .mt-hero-split { grid-template-columns: 1fr; gap: 3rem; } }
      .mt-hero-content { display: flex; flex-direction: column; gap: 1.4rem; aling-items: center; }
      .mt-mark { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 8px var(--accent); }
      .mt-h1 {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: clamp(2.6rem, 5.6vw, 5.4rem);
        line-height: .95; letter-spacing: -0.035em; margin: 0;
        display: flex; flex-direction: column; gap: .15rem;
      }
      .mt-h1 .mt-outline { -webkit-text-stroke: 1.2px var(--accent); color: transparent; font-style: italic; }
      .mt-hero-sub { font-size: clamp(1rem, 1.4vw, 1.8rem); line-height: 1.6; max-width: 540px; color: var(--muted-2); margin: 0; }
      .mt-hero-cta { display: flex; gap: .9rem; flex-wrap: wrap; margin-top: .4rem; }
      .mt-btn {
        display: inline-flex; align-items: center; gap: .55rem;
        font-family: 'JetBrains Mono', monospace; font-size: .72rem;
        letter-spacing: .14em; text-transform: uppercase;
        padding: .95rem 1.6rem; border: 1px solid transparent;
        text-decoration: none; cursor: pointer; border-radius: 999px;
        transition: transform .2s, background .2s, color .2s, box-shadow .2s;
      }
      .mt-btn--primary { background: var(--accent); color: #00131a; box-shadow: 0 8px 32px -8px rgba(255, 212, 94, 0.55); }
      .mt-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 14px 40px -8px rgba(244, 255, 94, 0.81); }
      .mt-hero-stats {
        margin-top: 2.5rem; display: grid; grid-template-columns: repeat(3, 1fr);
        border-top: 1px solid var(--line); padding-top: 1rem;
      }
      .mt-stat { padding: 0 1rem; border-left: 1px solid var(--line); }
      .mt-stat:first-child { border-left: none; padding-left: 0; }
      .mt-stat-k { font-family: 'Syne', sans-serif; font-weight: 500; font-size: clamp(1.4rem, 2.2vw, 1.9rem); color: #fff; letter-spacing: -0.02em; }
      .mt-stat-v { font-family: 'JetBrains Mono', monospace; font-size: .65rem; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); margin-top: .3rem; }
      @media (max-width: 720px) { .mt-hero-stats { grid-template-columns: repeat(2, 1fr); gap: 1rem; } .mt-stat { border-left: none; padding-left: 0; } }

      /* Hero photo */
      .mt-hero-photo { position: relative; justify-self: center; width: 100%; max-width: 420px; }
      .mt-photo-frame {
        position: relative; aspect-ratio: 4/5; border-radius: 18px; overflow: hidden;
        border: 1px solid var(--line-strong); background: var(--surface);
        box-shadow: 0 40px 80px -30px rgba(244, 255, 94, 0.25);
      }
      .mt-photo-frame img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.92) saturate(1.05) contrast(1.02); }
      .mt-photo-grain {
        position: absolute; inset: 0; pointer-events: none;
        background: linear-gradient(180deg, transparent 55%, rgba(5,6,8,.85) 100%),
                    radial-gradient(ellipse at top right, rgba(255, 252, 94, 0.18), transparent 60%);
      }
      .mt-photo-tag {
        position: absolute; top: 1rem; left: 1rem;
        display: inline-flex; align-items: center; gap: .55rem;
        font-family: 'JetBrains Mono', monospace; font-size: .58rem;
        letter-spacing: .18em; text-transform: uppercase; color: var(--accent);
        padding: .4rem .7rem; border-radius: 999px;
        background: rgba(5,6,8,.6); border: 1px solid var(--line-strong);
        backdrop-filter: blur(8px);
      }
      .mt-photo-meta {
        position: absolute; left: 1rem; right: 1rem; bottom: 1rem;
        display: flex; gap: 1.2rem; padding: .9rem 1rem;
        background: rgba(5,6,8,.55); border: 1px solid var(--line);
        border-radius: 12px; backdrop-filter: blur(10px);
      }
      .mt-photo-meta .k { font-family: 'JetBrains Mono', monospace; font-size: .56rem; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); }
      .mt-photo-meta .v { font-family: 'Syne', sans-serif; font-size: .9rem; color: #fff; margin-top: .2rem; }
      .mt-photo-corner { position: absolute; width: 36px; height: 36px; border: 1px solid var(--accent); opacity: .8; pointer-events: none; }
      .mt-photo-corner--tl { top: -8px; left: -8px; border-right: none; border-bottom: none; }
      .mt-photo-corner--br { bottom: -8px; right: -8px; border-left: none; border-top: none; }
      .mt-scroll-hint { position: absolute; bottom: 1.6rem; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: .5rem; }
      .mt-scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--accent), transparent); animation: mt-scroll 2s ease infinite; }
      .mt-scroll-hint span { font-family: 'JetBrains Mono', monospace; font-size: .56rem; letter-spacing: .22em; text-transform: uppercase; color: var(--muted); }
      @keyframes mt-scroll { 0%,100%{opacity:.3;transform:scaleY(.5)} 50%{opacity:1;transform:scaleY(1)} }

      /* SECTIONS */
      .mt-sec { position: relative; padding: 8rem 2rem; max-width: 1380px; margin: 0 auto; }
      .mt-sec--deep { background: linear-gradient(180deg, transparent, var(--bg-deep) 8%, var(--bg-deep) 92%, transparent); max-width: none; }
      .mt-sec--deep > * { max-width: 1280px; margin-left: auto; margin-right: auto; }
      .mt-sec--wide { max-width: none; padding-left: 0; padding-right: 0; }
      .mt-sec--wide .mt-sec-label, .mt-sec--wide .mt-h2 { padding-left: 2rem; padding-right: 2rem; max-width: 1280px; margin-left: auto; margin-right: auto; }
      .mt-sec-label { display: flex; align-items: center; gap: .8rem; font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .22em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.25rem; }
      .mt-sec-label span { color: var(--muted); }
      .mt-sec-label::after { content: ''; flex: 0 0 40px; height: 1px; background: linear-gradient(to right, var(--accent), transparent); }
      .mt-h2 { font-family: 'Syne', sans-serif; font-weight: 500; font-size: clamp(2.2rem, 5vw, 4.5rem); line-height: .95; letter-spacing: -0.03em; color: #fff; margin: 0 0 3.5rem; }
      .mt-dim { color: rgba(232,240,247,.18); font-style: italic; font-weight: 400; }

      /* ABOUT */
      .mt-about { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: start; }
      .mt-about-text p { font-size: 1rem; line-height: 1.85; color: var(--muted-2); margin: 0 0 1.1rem; max-width: 580px; }
      .mt-about-text em { color: var(--accent); font-style: normal; }
      .mt-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.6rem; }
      .mt-tag { font-family: 'JetBrains Mono', monospace; font-size: .66rem; letter-spacing: .12em; text-transform: uppercase; padding: .4rem .85rem; border-radius: 999px; border: 1px solid var(--line-strong); color: var(--accent-soft); background: rgba(94,227,255,.04); transition: border-color .2s, color .2s, transform .2s; }
      .mt-tag:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-1px); }
      .mt-about-card { position: relative; border: 1px solid var(--line-strong); border-radius: 18px; padding: 2rem; background: linear-gradient(160deg, rgba(94,227,255,.05), rgba(94,227,255,0) 60%), var(--surface); overflow: hidden; }
      .mt-card-grid { position: absolute; inset: 0; opacity: .35; background-image: linear-gradient(to right, rgba(94,227,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(94,227,255,.06) 1px, transparent 1px); background-size: 28px 28px; mask-image: radial-gradient(ellipse at top, black, transparent 80%); }
      .mt-card-inner { position: relative; }
      .mt-card-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: .6rem; letter-spacing: .22em; color: var(--accent); margin-bottom: 1rem; }
      .mt-card-inner h3 { font-family: 'Syne', sans-serif; font-weight: 500; font-size: 1.5rem; color: #fff; line-height: 1.2; letter-spacing: -.02em; margin: 0 0 1.5rem; }
      .mt-row { display: grid; grid-template-columns: 120px 1fr; gap: 1rem; padding: .9rem 0; border-top: 1px solid var(--line); align-items: baseline; }
      .mt-row dt { font-family: 'JetBrains Mono', monospace; font-size: .65rem; letter-spacing: .12em; color: var(--muted); text-transform: uppercase; }
      .mt-row dd { margin: 0; font-size: .9rem; color: var(--text); }
      @media (max-width: 900px) { .mt-about { grid-template-columns: 1fr; gap: 3rem; } }

      /* PROJECTS */
      .mt-projects { display: flex; flex-direction: column; }
      .mt-project {
        display: grid; grid-template-columns: 80px 120px 1fr auto;
        gap: 2rem; align-items: center;
        padding: 2rem 1.2rem; border-top: 1px solid var(--line);
        color: inherit; position: relative; overflow: hidden;
        transition: padding-left .35s, background .35s;
        cursor: default;
      }
      .mt-project:last-of-type { border-bottom: 1px solid var(--line); }
      .mt-project::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(94,227,255,.07), transparent 70%); transform: translateX(-100%); transition: transform .5s ease; }
      .mt-project:hover { padding-left: 2.2rem; background: rgba(94,227,255,.02); }
      .mt-project:hover::before { transform: translateX(0); }
      .mt-project-num { font-family: 'JetBrains Mono', monospace; font-size: .8rem; color: var(--muted); letter-spacing: .12em; }
      .mt-project-img-wrap { width: 120px; height: 76px; border-radius: 10px; overflow: hidden; border: 1px solid var(--line-strong); flex-shrink: 0; transition: border-color .3s; }
      .mt-project:hover .mt-project-img-wrap { border-color: var(--accent); }
      .mt-project-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.75) saturate(1.1); transition: transform .6s ease, filter .4s; }
      .mt-project:hover .mt-project-img { transform: scale(1.08); filter: brightness(.9) saturate(1.3); }
      .mt-project-body { display: flex; flex-direction: column; gap: .5rem; }
      .mt-project-cat { font-family: 'JetBrains Mono', monospace; font-size: .6rem; letter-spacing: .22em; text-transform: uppercase; color: var(--accent); }
      .mt-project-title { font-family: 'Syne', sans-serif; font-weight: 500; font-size: 1.4rem; color: #fff; letter-spacing: -.01em; margin: 0; transition: color .2s; }
      .mt-project:hover .mt-project-title { color: var(--accent); }
      .mt-project-desc { font-size: .88rem; color: var(--muted); line-height: 1.65; max-width: 620px; margin: 0; transition: color .2s; }
      .mt-project:hover .mt-project-desc { color: var(--muted-2); }
      .mt-project-right { display: flex; flex-direction: column; align-items: flex-end; gap: .8rem; }
      .mt-project-year { font-family: 'JetBrains Mono', monospace; font-size: .7rem; color: var(--muted); letter-spacing: .12em; }
      .mt-project-arrow { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--line-strong); display: flex; align-items: center; justify-content: center; color: var(--accent); transition: background .25s, border-color .25s, transform .25s; }
      .mt-project:hover .mt-project-arrow { background: var(--accent); color: #00131a; border-color: var(--accent); transform: rotate(-45deg) scale(1.05); }
      @media (max-width: 900px) { .mt-project { grid-template-columns: 50px 90px 1fr; } .mt-project-right { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: space-between; } .mt-project-img-wrap { width: 90px; height: 60px; } }
      @media (max-width: 600px) { .mt-project { grid-template-columns: 1fr; } .mt-project-img-wrap { width: 100%; height: 150px; } .mt-project-num { display: none; } }

      /* GALLERY */
      .mt-gallery { display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: 220px; gap: 6px; padding: 0 2rem; max-width: 1400px; margin: 0 auto; }
      .mt-g { position: relative; overflow: hidden; border-radius: 14px; margin: 0; border: 1px solid var(--line); background: var(--surface); }
      .mt-g img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.7) saturate(1.05); transition: transform .8s ease, filter .5s; }
      .mt-g:hover img { transform: scale(1.05); filter: brightness(.95) saturate(1.2); }
      .mt-g figcaption { position: absolute; left: 0; right: 0; bottom: 0; padding: 1.4rem 1.2rem .9rem; background: linear-gradient(to top, rgba(5,6,8,.9), transparent); font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .14em; color: var(--accent); text-transform: uppercase; opacity: 0; transform: translateY(8px); transition: opacity .35s, transform .35s; }
      .mt-g:hover figcaption { opacity: 1; transform: translateY(0); }
      .mt-g--a { grid-column: span 7; grid-row: span 2; }
      .mt-g--b { grid-column: span 5; grid-row: span 1; }
      .mt-g--c { grid-column: span 5; grid-row: span 1; }
      .mt-g--d { grid-column: span 4; grid-row: span 2; }
      .mt-g--e { grid-column: span 8; grid-row: span 2; }
      @media (max-width: 800px) { .mt-gallery { grid-template-columns: 1fr 1fr; padding: 0 1rem; } .mt-g--a, .mt-g--b, .mt-g--c, .mt-g--d, .mt-g--e { grid-column: span 2; grid-row: span 1; } }

      /* TRAINING */
  .mt-training { 
    display: grid; 
    grid-template-columns: repeat(2, 1fr); 
    gap: 1rem; 
  }

  /* 1── Convertido a Flex-col para empujar el badge al fondo dinámicamente */
  .mt-t { 
    padding: 2rem; 
    border: 1px solid var(--line); 
    border-radius: 16px; 
    background: linear-gradient(160deg, var(--surface), transparent); 
    position: relative; 
    overflow: hidden; 
    transition: border-color .3s, transform .3s; 
    display: flex;
    flex-direction: column;
  }

  .mt-t::after { 
    content: ''; 
    position: absolute; 
    bottom: 0; 
    left: 0; 
    right: 0; 
    height: 1px; 
    background: linear-gradient(90deg, var(--accent), transparent); 
    transform: scaleX(0); 
    transform-origin: left; 
    transition: transform .5s; 
  }

  .mt-t:hover { 
    border-color: var(--line-strong); 
    transform: translateY(-3px); 
  }

  .mt-t:hover::after { 
    transform: scaleX(1); 
  }

  .mt-t-year { 
    font-family: 'JetBrains Mono', monospace; 
    font-size: .68rem; 
    letter-spacing: .16em; 
    color: var(--accent); 
    margin-bottom: .9rem; 
  }

  .mt-t-title { 
    font-family: 'Syne', sans-serif; 
    font-weight: 500; 
    font-size: 1.2rem; 
    color: #fff; 
    margin: 0 0 .35rem; 
  }

  /* 2── Corregido a 0.75rem (12px) y color de acento óptimo */
  .mt-t-inst { 
    font-family: 'JetBrains Mono', monospace; 
    font-size: .75rem; 
    font-weight: 500; 
    letter-spacing: .05em; 
    color: var(--accent); 
    opacity: 0.85; 
    margin-bottom: .9rem; 
    text-transform: uppercase; 
  }

  /* 3── Le damos un margin-bottom auto para empujar lo que esté abajo */
  .mt-t-desc { 
    font-size: .88rem; 
    line-height: 1.65; 
    color: var(--muted-2); 
    margin: 0 0 1.5rem; 
    flex-grow: 1; 
  }

  /* 4── Rediseñado estilo Micro-Badge de Hardware Premium */
  .mt-t-badge { 
    display: inline-block; 
    align-self:

      /* SKILLS */
      .mt-skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
      .mt-sk { padding: 2rem 1.8rem; background: var(--bg); position: relative; overflow: hidden; transition: background .3s; }
      .mt-sk:hover { background: var(--surface); }
      .mt-sk-num { position: absolute; right: 1.4rem; top: 1rem; font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: 2.6rem; color: rgba(94, 228, 255, 0.52); line-height: 1; }
      .mt-sk-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 1.1rem; background: rgba(94,227,255,.08); border: 1px solid var(--line-strong); }
      .mt-sk h3 { font-family: 'Syne', sans-serif; font-weight: 500; font-size: 1.05rem; color: #fff; margin: 0 0 1rem; }
      .mt-sk ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .45rem; }
      .mt-sk li { font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .04em; color: var(--muted-2); padding-left: 1rem; position: relative; }
      .mt-sk li::before { content: '—'; position: absolute; left: 0; color: var(--accent); opacity: .55; }
      @media (max-width: 900px) { .mt-skills { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 600px) { .mt-skills { grid-template-columns: 1fr; } }

      /* FOOTER */
      .mt-footer { border-top: 1px solid var(--line); padding: 2rem 2.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; background: var(--bg-deep); flex-wrap: wrap; }
      .mt-copy { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .12em; color: var(--muted); }
      .mt-footer-links { display: flex; gap: .6rem; align-items: center; }
      .mt-footer-icon { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--line); color: var(--muted); text-decoration: none; transition: border-color .2s, color .2s, background .2s; }
      .mt-footer-icon:hover { border-color: var(--line-strong); color: var(--accent); background: rgba(94,227,255,.06); }
    `}</style>
  );
}

export default App;