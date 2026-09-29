import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { instagramChurches, instagramPastorsAndProjects } from "../config/churches";

export const metadata: Metadata = {
  title: "Instagram | Igreja Mananciais",
  description: "Acesse os perfis oficiais da Igreja Mananciais e seus projetos no Instagram.",
};

export default function InstagramPage() {
  return (
    <main className="instagram-directory">
      <header className="directory-header">
        <Link href="/" className="directory-brand" aria-label="Igreja Mananciais — início">
          <span className="brand-mark"><Image src="/images/logo-m-branca.png" alt="" width={24} height={24} /></span>
          <span>MANANCIAIS</span>
        </Link>
        <Link href="/" className="directory-back"><ArrowLeft size={16} /> Voltar ao site</Link>
      </header>

      <section className="instagram-content">
        <div className="instagram-profile-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg></div>
        <p className="eyebrow">Estamos por perto</p>
        <h1>Acompanhe<br />a <em>Mananciais.</em></h1>

        <a className="instagram-featured" href="https://www.instagram.com/mananciaisrj/" target="_blank" rel="noreferrer">
          <span className="featured-label">Conta principal</span>
          <span className="featured-handle">@mananciaisrj</span>
          <span className="featured-title">Igreja Mananciais</span>
          <ArrowUpRight size={21} />
        </a>

        <div className="instagram-links" aria-label="Perfis de pastores e projetos">
          <p className="eyebrow">Pastores e projetos</p>
          {instagramPastorsAndProjects.map((handle) => (
            <a href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" key={handle}>
              <span><strong>{handle}</strong><small>Pastor ou projeto</small></span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>

        <div className="instagram-links instagram-churches" aria-label="Perfis das congregações">
          <p className="eyebrow">Congregações</p>
          {instagramChurches.map((handle) => (
            <a href={`https://www.instagram.com/${handle.slice(1)}/`} target="_blank" rel="noreferrer" key={handle}>
              <span><strong>{handle}</strong><small>Congregação</small></span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </section>
      <footer className="directory-footer"><Link href="/">Igreja Mananciais</Link></footer>
    </main>
  );
}
