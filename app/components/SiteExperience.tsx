"use client";

import {
  ArrowDown,
  ArrowRight,
  CirclePlay,
  ExternalLink,
  Heart,
  Menu,
  MessageCircle,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MEDIA, SITE_DETAILS, SITE_LINKS } from "../config/site";

const navItems = [
  ["Início", "inicio"],
  ["Quem Somos", "quem-somos"],
  ["Para Todas as Idades", "idades"],
  ["Redes", "redes"],
  ["Programações", "programacoes"],
  ["Escolas", "escolas"],
  ["Online", "online"],
  ["Nossa História", "historia"],
  ["Conecte-se", "conecte-se"],
] as const;

const ministryCards = [
  {
    id: "kids",
    age: "0—10",
    eyebrow: "Para as crianças",
    title: "Kids & Mundo Kids",
    text: "Ambientes seguros, alegres e preparados para receber cada criança de forma especial.",
    image: MEDIA.kids,
    tone: "sky",
    highlights: ["Salas por faixa etária", "A partir dos 8 meses", "Brinquedão", "Quartas e domingos"],
  },
  {
    id: "seeds",
    age: "11—13",
    eyebrow: "Pré-adolescentes",
    title: "Seeds",
    text: "Amizades, identidade e crescimento espiritual na transição para a adolescência.",
    image: MEDIA.seeds,
    tone: "cream",
    highlights: ["Programações mensais", "Comunhão", "Acampamentos semestrais"],
  },
  {
    id: "winners",
    age: "14—17",
    eyebrow: "Adolescentes",
    title: "Winners",
    text: "Uma geração que vive sua fé com convicção, propósito e relacionamento verdadeiro com Deus.",
    image: MEDIA.winners,
    tone: "dark",
    highlights: ["Programações semanais", "Palavra", "Acampamentos semestrais"],
  },
  {
    id: "jovens",
    age: "18—35",
    eyebrow: "Jovens",
    title: "Jovens",
    text: "Um espaço para construir relacionamentos, amadurecer na fé e viver o propósito de Deus.",
    image: MEDIA.youngAdults,
    tone: "blue",
    highlights: ["Programações quinzenais", "Comunhão e discipulado", "Acampamentos semestrais"],
  },
] as const;

const schools = [
  {
    number: "01",
    title: "Curso de Maturidade",
    format: "Fundamentos bíblicos + vida prática",
    text: "Uma jornada de desenvolvimento pessoal e maturidade espiritual.",
    detail: "Espírito, Alma e Corpo · Deus Residente · Caráter de Cristo · Ser e Fazer Discípulos",
    href: SITE_LINKS.schools.maturity,
  },
  {
    number: "02",
    title: "EBM",
    format: "Híbrido · presencial e online",
    text: "Ensino sistemático das Escrituras e prática da vida cristã e da Igreja, desde 2020.",
    detail: "Escola Bíblica Mananciais",
    href: SITE_LINKS.schools.ebm,
  },
  {
    number: "03",
    title: "Turma Especial",
    format: "Seminário integral · 2 anos",
    text: "Formação de discípulos que fazem da vontade de Deus uma prioridade.",
    detail: "Conhecimento bíblico aplicado à vida, à igreja e à sociedade",
    href: SITE_LINKS.schools.specialClass,
  },
] as const;

function useActiveSection() {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return active;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MediaPlaceholder({
  src,
  label,
  dark = false,
  className = "",
}: {
  src: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`media-placeholder ${dark ? "dark" : ""} ${className}`} role="img" aria-label={label}>
      <div className="media-grid" />
      <div className="media-label">
        <span>{label}</span>
        <code>{src}</code>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Igreja Mananciais — início">
          <span className="brand-mark">
            <img src="/images/logo-m-branca.png" alt="" />
          </span>
          <span>MANANCIAIS</span>
        </a>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open}>
          <span>Menu</span>
          <Menu size={19} />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(145% at 90% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-top">
              <span className="menu-logo-frame">
                <img src="/images/logo-mananciais.png" alt="Igreja Mananciais" />
              </span>
              <button className="menu-button inverse" onClick={() => setOpen(false)} aria-label="Fechar menu">
                <span>Fechar</span><X size={19} />
              </button>
            </div>
            <nav aria-label="Navegação principal">
              {navItems.map(([label, id], index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className={active === id ? "active" : ""}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.045 }}
                >
                  <span>0{index + 1}</span>{label}<ArrowRight />
                </motion.a>
              ))}
            </nav>
            <p>Há um lugar para você.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FloatingConnectButton() {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => setScrolling(false), 220);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <motion.a
      className={`floating-connect ${scrolling ? "compact" : ""}`}
      href={SITE_LINKS.connect}
      target="_blank"
      rel="noreferrer"
      aria-label="Quero me conectar a um facilitador"
      layout
    >
      <MessageCircle size={19} />
      <span>Quero me conectar <em>a um facilitador</em></span>
      <ArrowRight size={17} />
    </motion.a>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [0, 34]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  return (
    <section className="hero-wrap" id="inicio" ref={ref}>
      <motion.div className="hero" style={{ scale, borderRadius: radius }}>
        <div className="hero-video">
          <video autoPlay muted loop playsInline preload="metadata" poster={MEDIA.heroPoster} aria-label="Cenas da Igreja Mananciais">
            <source src={MEDIA.heroVideo} type="video/mp4" />
          </video>
          <MediaPlaceholder src={MEDIA.heroVideo} label="VÍDEO PRINCIPAL · substitua este arquivo" dark />
        </div>
        <div className="hero-overlay" />
        <motion.div className="hero-copy" style={{ y: titleY }}>
          <p className="eyebrow light">Igreja Mananciais · desde 2004</p>
          <h1><span className="gradient-word">Bem-vindo</span><br />à Igreja Mananciais!</h1>
          <p className="hero-subtitle">É um prazer ter você aqui.</p>
        </motion.div>
        <a className="scroll-cue" href="#quem-somos">
          Conheça a Mananciais <ArrowDown size={18} />
        </a>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const moments = [
    ["2004", "Uma história que começou com Ricardo e Aline Carvalho."],
    ["CHAMADO", "Nascemos para responder ao chamado de Deus, salvar vidas e vê-las transformadas."],
    ["CENTRO", "A Palavra e a Presença têm primazia em nosso jeito de viver."],
    ["HOJE", "Vivemos para manifestar o Reino de Deus em indivíduos, famílias e na sociedade."],
  ];
  return (
    <section className="about section-pad" id="quem-somos">
      <div className="about-intro">
        <Reveal><p className="eyebrow">Quem somos</p></Reveal>
        <Reveal delay={0.08}><h2>Uma igreja feita de <span>presença,</span><br /> propósito e pessoas.</h2></Reveal>
      </div>
      <div className="about-story">
        <div className="pastors-sticky">
          <MediaPlaceholder src={MEDIA.pastors} label="FOTO DOS PASTORES" />
          <div className="pastor-caption"><strong>Ricardo e Aline Carvalho</strong><span>Pastores e fundadores da Igreja Mananciais</span></div>
        </div>
        <div className="story-moments">
          <div className="timeline"><span>2004</span><i /><span>hoje</span></div>
          {moments.map(([tag, text], index) => (
            <Reveal className="story-moment" key={tag}>
              <span>0{index + 1} / {tag}</span>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgeJourneySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const ages = ["0", "8 meses", "10", "11", "14", "18", "35+"];
  return (
    <section className="age-journey section-pad" id="idades" ref={ref}>
      <Reveal><p className="eyebrow light">Para todas as idades</p></Reveal>
      <Reveal><h2>Há um lugar<br />para <em>você.</em></h2></Reveal>
      <Reveal><p className="age-lead">Em cada fase da vida, queremos caminhar ao seu lado.</p></Reveal>
      <div className="age-line">
        <motion.div className="age-progress" style={{ scaleX: lineScale }} />
        {ages.map((age, i) => <span key={age} className={i === 0 || i === ages.length - 1 ? "major" : ""}>{age}</span>)}
      </div>
    </section>
  );
}

function MinistrySection({ item }: { item: (typeof ministryCards)[number] }) {
  return (
    <section className={`ministry ministry-${item.tone}`} id={item.id}>
      <div className="ministry-media">
        <MediaPlaceholder src={item.image} label={`MÍDIA · ${item.title}`} dark={item.tone === "dark"} />
      </div>
      <div className="ministry-copy">
        <Reveal>
          <p className="eyebrow ministry-eyebrow">
            {item.id === "jovens" ? `${item.age} anos` : <>{item.eyebrow} <span>{item.age} anos</span></>}
          </p>
        </Reveal>
        <Reveal><h2>{item.title}</h2></Reveal>
        <Reveal><p className="ministry-text">{item.text}</p></Reveal>
        <div className="chip-row">
          {item.highlights.map((highlight, i) => (
            <Reveal key={highlight} delay={i * 0.06}><span>{highlight}</span></Reveal>
          ))}
        </div>
        {item.id === "kids" && (
          <Reveal className="nursery">
            <Heart size={22} />
            <div><strong>Berçário</strong><p>Para bebês com menos de 8 meses: troca, amamentação e transmissão ao vivo do culto em um espaço reservado.</p></div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function NetworksSection() {
  const networkImages = [
    ["/images/redes-01.jpg", "Comunhão"],
    ["/images/redes-02.jpg", "Cuidado"],
    ["/images/redes-03.jpg", "Discipulado"],
    ["/images/redes-04.jpg", "Conexão"],
  ] as const;
  return (
    <section className="networks section-pad" id="redes">
      <div className="network-copy">
        <p className="eyebrow">Redes</p>
        <h2>Mais do que frequentar, queremos <em>caminhar juntos.</em></h2>
        <p>As redes são ambientes de comunhão, cuidado, discipulado e conexão. Pessoas em diferentes fases da vida constroem relacionamentos e participam mais de perto da vida da igreja.</p>
        <small>As programações acontecem mensalmente, de acordo com a agenda geral da igreja.</small>
        <a className="button button-dark" href={SITE_LINKS.networks} target="_blank" rel="noreferrer">Quero conhecer uma rede <ArrowRight /></a>
      </div>
      <div className="network-marquee" aria-label="Imagens das redes da Igreja Mananciais">
        <div className="network-track">
          {[...networkImages, ...networkImages].map(([src, label], index) => (
            <div className="network-slide" key={`${src}-${index}`}>
              <MediaPlaceholder src={src} label={label.toUpperCase()} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <div id="programacoes">
      <section className="press-power section-pad">
        <MediaPlaceholder src={MEDIA.pressPower} label="VÍDEO / FOTO · PRESS POWER" dark />
        <div className="press-overlay" />
        <div className="press-copy">
          <Reveal><p className="eyebrow light">Nosso culto profético</p></Reveal>
          <Reveal><h2>PRESS<br /><span>POWER</span></h2></Reveal>
          <Reveal><p>Nasceu do anseio de ver a igreja se movendo da mesma forma como começou: <strong>com poder.</strong></p></Reveal>
          <div className="press-facts">
            <span>{SITE_DETAILS.pressPower.frequency}</span>
            <span>{SITE_DETAILS.pressPower.time}</span>
            <span>{SITE_DETAILS.pressPower.location}</span>
          </div>
        </div>
      </section>
      <section className="prayer section-pad">
        <div>
          <p className="eyebrow">Sala de oração</p>
          <h2>Uma casa<br />de <em>oração.</em></h2>
          <p>A Sala de Oração está aberta todos os dias como um ambiente de busca, adoração e relacionamento com Deus.</p>
          <a className="text-link" href={SITE_LINKS.connect}>Ver horários da Sala de Oração <ArrowRight /></a>
        </div>
        <div className="prayer-card">
          <div className="prayer-day"><span>QUA</span><strong>08:00</strong><small>Reunião de oração</small></div>
          <MediaPlaceholder src={MEDIA.prayerRoom} label="FOTO · SALA DE ORAÇÃO" />
        </div>
      </section>
    </div>
  );
}

function SchoolsSection() {
  return (
    <section className="schools section-pad" id="escolas">
      <div className="schools-heading">
        <p className="eyebrow">Escolas</p>
        <h2>Crescer também<br />é <em>aprender.</em></h2>
      </div>
      <div className="school-list">
        {schools.map((school) => (
          <article className="school-card" key={school.number}>
            <span className="school-number">{school.number}</span>
            <div>
              <p className="eyebrow">{school.format}</p>
              <h3>{school.title}</h3>
              <p>{school.text}</p>
              <small>{school.detail}</small>
            </div>
            <a href={school.href} aria-label={`Saiba mais sobre ${school.title}`}>Saiba mais <ArrowRight /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function OnlineSection() {
  return (
    <section className="online section-pad" id="online">
      <div className="phone-mockup">
        <div className="phone-camera" />
        <MediaPlaceholder src="/videos/transmissao-online.mp4" label="TRANSMISSÃO ONLINE" dark />
        <span className="live-pill"><i /> AO VIVO</span>
        <button aria-label="Reproduzir transmissão"><Play fill="currentColor" /></button>
      </div>
      <div className="online-copy">
        <p className="eyebrow light">Mananciais Online</p>
        <h2>A Mananciais também está <em>online.</em></h2>
        <p>Grande parte das nossas programações é transmitida ao vivo. Acompanhe cultos, mensagens e momentos especiais de onde você estiver.</p>
        <div className="button-row">
          <a className="button button-light" href={SITE_LINKS.youtube} target="_blank" rel="noreferrer"><CirclePlay /> Assistir agora</a>
          <a className="button button-outline" href={SITE_LINKS.youtube} target="_blank" rel="noreferrer">Conhecer nosso canal <ExternalLink /></a>
        </div>
      </div>
    </section>
  );
}

function MamaAlineSection() {
  return (
    <section className="mama section-pad">
      <div className="mama-copy">
        <p className="eyebrow">Família · conteúdo</p>
        <h2>Mama<br /><em>Aline</em></h2>
        <p>Princípios e valores cristãos, conselhos práticos e histórias para tornar a maternidade e a paternidade mais leves e sábias.</p>
        <a className="button button-dark" href={SITE_LINKS.mamaAline}>Conhecer o projeto <ArrowRight /></a>
      </div>
      <div className="mama-editorial">
        <MediaPlaceholder src="/images/mama-aline.jpg" label="FOTO · MAMA ALINE" />
        <blockquote>“Famílias mais leves, presentes e sábias.”</blockquote>
        <span>FOTO · VÍDEOS · EPISÓDIOS</span>
      </div>
    </section>
  );
}

function DocumentarySection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="documentary section-pad" id="historia">
      <div className="documentary-heading">
        <p className="eyebrow">Nossa história</p>
        <h2>Uma história construída por <em>muitas vidas.</em></h2>
        <p>Conheça um pouco da trajetória da Igreja Mananciais e de tudo o que Deus tem construído ao longo dos anos.</p>
      </div>
      <div className="documentary-player">
        {playing && SITE_LINKS.documentary !== "YOUTUBE_DOCUMENTARY_URL" ? (
          <iframe src={SITE_LINKS.documentary} title="Mini documentário da Igreja Mananciais" allow="autoplay; encrypted-media" allowFullScreen />
        ) : (
          <>
            <MediaPlaceholder src="/images/documentario-capa.jpg" label="CAPA DO MINI DOCUMENTÁRIO" dark />
            <button onClick={() => setPlaying(true)} aria-label="Assistir à nossa história"><Play fill="currentColor" /></button>
            <span>Assista à nossa história</span>
          </>
        )}
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="social section-pad">
      <div>
        <p className="eyebrow">Redes sociais</p>
        <h2>Continue perto<br />da <em>gente.</em></h2>
        <p>Acompanhe nossas programações, mensagens e tudo o que acontece na Igreja Mananciais.</p>
      </div>
      <div className="social-links">
        <a href={SITE_LINKS.instagram} target="_blank" rel="noreferrer"><ExternalLink /><span>Instagram</span><ArrowRight /></a>
        <a href={SITE_LINKS.youtube} target="_blank" rel="noreferrer"><CirclePlay /><span>YouTube</span><ArrowRight /></a>
      </div>
      <div className="social-strip" aria-label="Espaço para publicações recentes">
        {["ENCONTROS", "MENSAGENS", "FAMÍLIA"].map((label) => <span key={label}>{label}</span>)}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta section-pad" id="conecte-se">
      <Sparkles className="cta-spark" />
      <p className="eyebrow">Próximos passos</p>
      <h2>Você não precisa<br />caminhar <em>sozinho.</em></h2>
      <p>Queremos conhecer você, ouvir sua história e ajudar nos seus próximos passos.</p>
      <div className="button-row">
        <a className="button button-dark" href={SITE_LINKS.connect} target="_blank" rel="noreferrer"><MessageCircle /> Quero me conectar</a>
        <a className="button button-outline-dark" href={SITE_LINKS.maps} target="_blank" rel="noreferrer">Como chegar <ArrowRight /></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand"><span className="brand-mark">M</span><strong>MANANCIAIS</strong><p>Há um lugar para você.</p></div>
      <div><span>Visite</span><p>{SITE_DETAILS.address}</p><p>{SITE_DETAILS.mainHours}</p></div>
      <div><span>Fale com a gente</span><p>{SITE_DETAILS.phone}</p><a href={SITE_LINKS.instagram}>Instagram</a><a href={SITE_LINKS.youtube}>YouTube</a></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Igreja Mananciais</p><a href="#POLITICA_DE_PRIVACIDADE">Política de privacidade</a></div>
    </footer>
  );
}

export function SiteExperience() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AgeJourneySection />
        {ministryCards.map((item) => <MinistrySection key={item.id} item={item} />)}
        <NetworksSection />
        <ProgramsSection />
        <SchoolsSection />
        <OnlineSection />
        <MamaAlineSection />
        <DocumentarySection />
        <SocialSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingConnectButton />
    </>
  );
}
