import { CRM_BENTO } from '../../data/homeFeatureMedia';

type Tile = (typeof CRM_BENTO)[keyof typeof CRM_BENTO];

function TileTitle({ lead, accent }: { lead: string; accent: string }) {
  return (
    <h3 className="home-crm__tile-title">
      {lead} <span className="home-crm__tile-accent">{accent}</span>
    </h3>
  );
}

function BentoTile({ tile }: { tile: Tile }) {
  return (
    <article className={`home-crm__tile home-crm__tile--${tile.id}`} data-tile={tile.id}>
      <div className="home-crm__tile-visual">
        <img
          className="home-crm__tile-img"
          src={tile.image}
          alt={`TopEdge ${tile.titleLead} ${tile.titleAccent} product screenshot`}
          width={1400}
          height={1400}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div className="home-crm__tile-body">
        <TileTitle lead={tile.titleLead} accent={tile.titleAccent} />
        <p className="home-crm__tile-copy">{tile.body}</p>
      </div>
    </article>
  );
}

/** CRM bento, Orders · Profiles · Stock (Codex-style showcase tiles). */
export default function HomeCrmSurface() {
  const { orders, profiles, stock } = CRM_BENTO;

  return (
    <section className="home-crm" aria-labelledby="home-crm-title">
      <div className="home-crm__inner">
        <header className="home-crm__header">
          <h2 id="home-crm-title" className="home-crm__title">
            Identity & <span className="home-crm__title-accent">CRM</span>
          </h2>
          <p className="home-crm__sub">
            Orders, profiles, and stock, the ops surface your team opens every day.
          </p>
        </header>

        <div className="home-crm__bento home-crm__bento--three">
          <BentoTile tile={orders} />
          <BentoTile tile={profiles} />
          <BentoTile tile={stock} />
        </div>
      </div>
    </section>
  );
}
