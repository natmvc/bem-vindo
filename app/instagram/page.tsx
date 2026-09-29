import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Camera } from "lucide-react";
import { instagramProfiles } from "../config/churches";

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
        <div className="instagram-profile-icon"><Camera size={28} /></div>
        <p className="eyebrow">Estamos por perto</p>
        <h1>Acompanhe<br />a <em>Mananciais.</em></h1>
        <p className="instagram-lead">Encontre a igreja, os pastores e os projetos da nossa família nas redes.</p>

        <a className="instagram-featured" href="https://www.instagram.com/mananciaisrj/" target="_blank" rel="noreferrer">
          <span className="featured-label">Conta principal</span>
          <span className="featured-handle">@mananciaisrj</span>
          <span className="featured-title">Igreja Mananciais</span>
          <ArrowUpRight size={21} />
        </a>

        <div className="instagram-links" aria-label="Outros perfis oficiais">
          <p className="eyebrow">Pastores e projetos</p>
          {instagramProfiles.map((profile) => (
            <a href={profile.url} target="_blank" rel="noreferrer" key={profile.handle}>
              <span><strong>{profile.title}</strong><small>{profile.handle}</small></span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
        <p className="instagram-note">Esta página reúne os perfis públicos da igreja e de seus projetos.</p>
      </section>
      <footer className="directory-footer"><Link href="/">Igreja Mananciais · Há um lugar para você</Link></footer>
    </main>
  );
}
