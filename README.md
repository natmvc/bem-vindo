# Igreja Mananciais — site institucional

Landing page mobile-first em Next.js, TypeScript, Tailwind CSS e Framer Motion.

## Conteúdo e links

- Textos e links editáveis: `app/config/site.ts`
- Componentes e seções: `app/components/SiteExperience.tsx`
- Estilos e responsividade: `app/globals.css`
- SEO e dados estruturados: `app/layout.tsx`

Substitua os valores em maiúsculas ou entre colchetes, especialmente telefone, endereço, horários, WhatsApp, Instagram, YouTube, Google Maps, escolas, Mama Aline, Press Power e Sala de Oração. O número `5500000000000` é apenas um marcador: troque-o antes da publicação oficial.

## Imagens

Crie a pasta `public/images` e adicione:

- `hero-fallback.jpg` — capa do vídeo principal
- `pastores.jpg`
- `kids.jpg`
- `seeds.jpg`
- `winners.jpg`
- `jovens.jpg`
- `redes.jpg`
- `press-power.jpg`
- `sala-oracao.jpg`
- `mama-aline.jpg`
- `documentario-capa.jpg`

Use AVIF ou WebP quando possível. Imagens de tela cheia devem ter aproximadamente 1920×1080 px e, preferencialmente, menos de 500 KB. Thumbnails devem ficar abaixo de 200 KB. Mantenha as proporções sugeridas pelos placeholders para evitar cortes inesperados.

## Vídeos

Crie a pasta `public/videos` e adicione:

- `hero-igreja.mp4` — vídeo principal, preferencialmente abaixo de 8 MB
- `ministerios.mp4` — compilado opcional, abaixo de 5 MB
- `transmissao-online.mp4` — demonstração da transmissão

Use MP4/H.264 sem áudio automático. Comprima os arquivos antes de publicar. O hero usa `preload="metadata"` e as mídias posteriores devem continuar com carregamento sob demanda.

## Documentário

Em `app/config/site.ts`, substitua `YOUTUBE_DOCUMENTARY_URL` pela URL de incorporação do YouTube, no formato `https://www.youtube.com/embed/ID_DO_VIDEO`.

## Executar

1. Instale Node.js 22 ou superior.
2. Execute `pnpm install`.
3. Execute `pnpm dev`.
4. Abra `http://localhost:3000`.

Para validar a versão final, execute `pnpm build`.

## Publicar na Vercel

Importe o repositório no painel da Vercel, mantenha o preset Next.js e publique. Nenhuma variável de ambiente é necessária nesta primeira versão. Antes da publicação oficial, confirme todos os placeholders e links em `app/config/site.ts`.
