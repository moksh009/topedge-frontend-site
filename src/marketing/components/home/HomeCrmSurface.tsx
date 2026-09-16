import { CRM_BENTO } from '../../data/homeFeatureMedia';

type Tile = (typeof CRM_BENTO)[keyof typeof CRM_BENTO];

function TileTitle({ lead, accent }: { lead: string; accent: string }) {
  return (
    <h3 className="home-crm__tile-title">
      {lead} <span className="home-crm__tile-accent">{accent}</span>
    </h3>
  );
}

function BentoTile({ tile, className }: { tile: Tile; className: string }) {
  return (
    <article className={`home-crm__tile ${className}`} data-tile={tile.id}>
      <div className="home-crm__tile-visual">
        <img
          className="home-crm__tile-img"
          src={tile.image}
          alt=""
          width={1280}
          height={960}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="home-crm__tile-body">
        <TileTitle lead={tile.titleLead} accent={tile.titleAccent} />
        <p className="home-crm__tile-copy">{tile.body}</p>
      </div>
    </article>
  );
}

/**
 * Asymmetric 2×2 bento — wider top-right + bottom-left, no CTA links.
 */
export default function HomeCrmSurface() {
  const { identity, profiles, segments, warranty } = CRM_BENTO;

  return (
    <section className="home-crm" aria-labelledby="home-crm-title">
      <div className="home-crm__inner">
        <header className="home-crm__header">
          <h2 id="home-crm-title" className="home-crm__title">
            Identity & <span className="home-crm__title-accent">CRM</span>
          </h2>
          <p className="home-crm__sub">
            One shopper across chats, orders, segments, and care — without leaving WhatsApp or Shopify.
          </p>
        </header>

        <div className="home-crm__bento">
          <BentoTile tile={identity} className="home-crm__tile--identity" />
          <BentoTile tile={profiles} className="home-crm__tile--profiles" />
          <BentoTile tile={segments} className="home-crm__tile--segments" />
          <BentoTile tile={warranty} className="home-crm__tile--warranty" />
        </div>
      </div>
    </section>
  );
}
