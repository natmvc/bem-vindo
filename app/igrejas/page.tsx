import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { churches } from "../config/churches";

export const metadata: Metadata = {
  title: "Nossas Igrejas | Igreja Mananciais",
  description: "Encontre uma Igreja Mananciais, confira os endereços e horários de cultos e programações.",
};

export default function ChurchesPage() {
  return (
    <main className="directory-page">
      <header className="directory-header">
        <Link href="/" className="directory-brand" aria-label="Igreja Mananciais — início">
          <span className="brand-mark"><Image src="/images/logo-m-branca.png" alt="" width={24} height={24} /></span>
          <span>MANANCIAIS</span>
        </Link>
        <Link href="/" className="directory-back"><ArrowLeft size={16} /> Voltar ao site</Link>
      </header>

      <section className="directory-intro">
        <p className="eyebrow">Há um lugar para você</p>
        <h1>Nossas <em>igrejas.</em></h1>
        <p>Escolha uma de nossas igrejas para ver o endereço e as programações. Será um prazer receber você.</p>
        <a className="directory-main-cta" href="#unidades">Ver endereços e horários <ArrowDown size={16} /></a>
      </section>

      <section className="church-directory" id="unidades" aria-label="Endereços e programações das igrejas">
        {churches.map((church) => (
          <article className={`church-card${"featured" in church && church.featured ? " featured" : ""}`} key={church.name}>
            <div className="church-card-heading">
              <span className="church-pin"><MapPin size={17} /></span>
              <div>
                <p className="eyebrow">Igreja Mananciais</p>
                <h2>{church.name}</h2>
              </div>
            </div>
            <p className="church-address">{church.address}</p>
            <div className="church-schedule">
              <p><Clock3 size={16} /> Programações</p>
              <ul>{church.schedule.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <a
              className="church-map-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              Abrir no mapa <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </section>

      <footer className="directory-footer">
        <p>Os horários podem ser atualizados. Consulte a unidade antes de sua visita.</p>
        <Link href="/">Igreja Mananciais · Há um lugar para você</Link>
      </footer>
    </main>
  );
}
