import type { DocDiagramName } from '../types';

/**
 * Inline SVG diagrams for the docs.
 *
 * Inline rather than <img>: they inherit the page's type and colour tokens, cost
 * no extra request, stay sharp at any width, and keep their labels in the
 * prerendered HTML where crawlers can read them. Each one carries role="img"
 * with an aria-label and a <desc>, which is the accessible-name equivalent of
 * alt text for inline SVG. Deliberately NOT an SVG <title> element: the
 * prerender head audit counts <title> tags to catch duplicate document titles,
 * and an inline one reads as a second title on the page.
 */

type Node = { label: string; sub?: string; tone?: Tone };
type Tone = 'source' | 'core' | 'out' | 'warn' | 'muted';

const FILL: Record<Tone, string> = {
  source: '#f5f3ff',
  core: '#7c3aed',
  out: '#ecfdf5',
  warn: '#fff7ed',
  muted: '#f8fafc',
};
const STROKE: Record<Tone, string> = {
  source: '#ddd6fe',
  core: '#6d28d9',
  out: '#a7f3d0',
  warn: '#fed7aa',
  muted: '#e2e8f0',
};
const TEXT: Record<Tone, string> = {
  source: '#4c1d95',
  core: '#ffffff',
  out: '#065f46',
  warn: '#9a3412',
  muted: '#334155',
};

/** Break a label onto at most two lines so boxes keep a fixed height. */
function wrap(label: string, max = 18): string[] {
  const words = label.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

function Box({
  x,
  y,
  w,
  h,
  node,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  node: Node;
}) {
  const tone = node.tone || 'muted';
  const lines = wrap(node.label);
  const hasSub = Boolean(node.sub);
  // Title block is centred on the box, nudged up when a sub-label follows.
  const titleTop = y + h / 2 - (lines.length - 1) * 7 - (hasSub ? 7 : 0);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={FILL[tone]}
        stroke={STROKE[tone]}
        strokeWidth={1.25}
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + w / 2}
          y={titleTop + i * 14}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11.5}
          fontWeight={600}
          fill={TEXT[tone]}
        >
          {line}
        </text>
      ))}
      {node.sub ? (
        <text
          x={x + w / 2}
          y={titleTop + lines.length * 14 + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={9.5}
          fill={tone === 'core' ? '#ede9fe' : '#64748b'}
        >
          {node.sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#cbd5e1"
        strokeWidth={1.5}
        markerEnd="url(#docs-arrowhead)"
      />
      {label ? (
        <text
          x={(x1 + x2) / 2}
          y={y1 === y2 ? y1 - 7 : (y1 + y2) / 2}
          textAnchor="middle"
          fontSize={9}
          fill="#7c3aed"
          fontWeight={600}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

/** Deterministic id so the prerendered HTML and the hydrated DOM agree. */
function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function Svg({
  width,
  height,
  title,
  desc,
  children,
}: {
  width: number;
  height: number;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  const descId = `docs-diagram-desc-${slugifyTitle(title)}`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="docs-diagram__svg"
      role="img"
      aria-label={title}
      aria-describedby={descId}
      preserveAspectRatio="xMidYMid meet"
    >
      {/*
        The accessible name comes from aria-label, not an SVG <title>: an
        inline <title> element is indistinguishable from the document title to
        the prerender head audit, which then reports two titles on the page.
        <desc> carries the long description and has no such clash.
      */}
      <desc id={descId}>{desc}</desc>
      <defs>
        <marker
          id="docs-arrowhead"
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={5}
          markerHeight={5}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

/** Horizontal chain of boxes joined by arrows. */
function Chain({
  nodes,
  title,
  desc,
  arrowLabels = [],
  boxW = 128,
  boxH = 58,
  gap = 34,
}: {
  nodes: Node[];
  title: string;
  desc: string;
  arrowLabels?: (string | undefined)[];
  boxW?: number;
  boxH?: number;
  gap?: number;
}) {
  const pad = 8;
  const width = pad * 2 + nodes.length * boxW + (nodes.length - 1) * gap;
  const height = boxH + 34;
  const y = 22;
  return (
    <Svg width={width} height={height} title={title} desc={desc}>
      {nodes.map((node, i) => {
        const x = pad + i * (boxW + gap);
        return (
          <g key={i}>
            <Box x={x} y={y} w={boxW} h={boxH} node={node} />
            {i < nodes.length - 1 ? (
              <Arrow
                x1={x + boxW + 5}
                y1={y + boxH / 2}
                x2={x + boxW + gap - 5}
                y2={y + boxH / 2}
                label={arrowLabels[i]}
              />
            ) : null}
          </g>
        );
      })}
    </Svg>
  );
}

/** One source fanning into several outputs. */
function Fan({
  source,
  outputs,
  title,
  desc,
  reverse = false,
}: {
  source: Node;
  outputs: Node[];
  title: string;
  desc: string;
  /** true = many inputs collapsing into one box on the right. */
  reverse?: boolean;
}) {
  const boxW = 152;
  const boxH = 46;
  const vGap = 14;
  const colGap = 72;
  const stackH = outputs.length * boxH + (outputs.length - 1) * vGap;
  const height = Math.max(stackH, boxH) + 26;
  const width = boxW * 2 + colGap + 16;
  const srcX = reverse ? width - boxW - 8 : 8;
  const outX = reverse ? 8 : boxW + colGap + 8;
  const srcY = (height - boxH) / 2;
  const top = (height - stackH) / 2;
  return (
    <Svg width={width} height={height} title={title} desc={desc}>
      <Box x={srcX} y={srcY} w={boxW} h={boxH} node={source} />
      {outputs.map((node, i) => {
        const y = top + i * (boxH + vGap);
        return (
          <g key={i}>
            <Box x={outX} y={y} w={boxW} h={boxH} node={node} />
            <Arrow
              x1={reverse ? outX + boxW + 5 : srcX + boxW + 5}
              y1={reverse ? y + boxH / 2 : srcY + boxH / 2}
              x2={reverse ? srcX - 5 : outX - 5}
              y2={reverse ? srcY + boxH / 2 : y + boxH / 2}
            />
          </g>
        );
      })}
    </Svg>
  );
}

/** Time-ordered ladder: a marker per beat with the elapsed time above it. */
function Ladder({
  beats,
  title,
  desc,
}: {
  beats: { at: string; label: string; sub?: string; tone?: Tone }[];
  title: string;
  desc: string;
}) {
  const boxW = 126;
  const gap = 26;
  const pad = 8;
  const width = pad * 2 + beats.length * boxW + (beats.length - 1) * gap;
  const railY = 30;
  const height = 132;
  return (
    <Svg width={width} height={height} title={title} desc={desc}>
      <line
        x1={pad}
        y1={railY}
        x2={width - pad}
        y2={railY}
        stroke="#e2e8f0"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      {beats.map((beat, i) => {
        const x = pad + i * (boxW + gap);
        const cx = x + boxW / 2;
        return (
          <g key={i}>
            <text x={cx} y={14} textAnchor="middle" fontSize={10} fontWeight={700} fill="#7c3aed">
              {beat.at}
            </text>
            <circle cx={cx} cy={railY} r={5} fill="#7c3aed" stroke="#ffffff" strokeWidth={2} />
            <line x1={cx} y1={railY + 6} x2={cx} y2={48} stroke="#cbd5e1" strokeWidth={1.25} />
            <Box
              x={x}
              y={48}
              w={boxW}
              h={62}
              node={{ label: beat.label, sub: beat.sub, tone: beat.tone || 'muted' }}
            />
          </g>
        );
      })}
    </Svg>
  );
}

/** A decision box splitting into a yes path and a no path. */
function Split({
  input,
  test,
  yes,
  no,
  title,
  desc,
}: {
  input: Node;
  test: string;
  yes: Node;
  no: Node;
  title: string;
  desc: string;
}) {
  const boxW = 140;
  const boxH = 50;
  const width = boxW * 3 + 140 + 16;
  const height = 150;
  const midY = (height - boxH) / 2;
  const testX = boxW + 60 + 8;
  const outX = testX + boxW + 70;
  return (
    <Svg width={width} height={height} title={title} desc={desc}>
      <Box x={8} y={midY} w={boxW} h={boxH} node={input} />
      <Arrow x1={8 + boxW + 5} y1={midY + boxH / 2} x2={testX - 5} y2={midY + boxH / 2} />
      <g>
        <rect
          x={testX}
          y={midY - 4}
          width={boxW}
          height={boxH + 8}
          rx={10}
          fill="#fffbeb"
          stroke="#fde68a"
          strokeWidth={1.25}
        />
        {wrap(test, 20).map((line, i) => (
          <text
            key={i}
            x={testX + boxW / 2}
            y={midY + boxH / 2 - (wrap(test, 20).length - 1) * 7 + i * 14}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fontWeight={600}
            fill="#92400e"
          >
            {line}
          </text>
        ))}
      </g>
      <Box x={outX} y={14} w={boxW} h={boxH} node={yes} />
      <Box x={outX} y={height - boxH - 14} w={boxW} h={boxH} node={no} />
      <Arrow x1={testX + boxW + 5} y1={midY + boxH / 2} x2={outX - 5} y2={14 + boxH / 2} label="Yes" />
      <Arrow
        x1={testX + boxW + 5}
        y1={midY + boxH / 2}
        x2={outX - 5}
        y2={height - boxH / 2 - 14}
        label="No"
      />
    </Svg>
  );
}

/** Stacked layers that all have to be in place before the outcome fires. */
function Layers({
  layers,
  outcome,
  title,
  desc,
}: {
  layers: Node[];
  outcome: Node;
  title: string;
  desc: string;
}) {
  const boxW = 220;
  const boxH = 44;
  const vGap = 10;
  const width = boxW + 200;
  const height = layers.length * (boxH + vGap) + boxH + 20;
  return (
    <Svg width={width} height={height} title={title} desc={desc}>
      {layers.map((layer, i) => (
        <Box key={i} x={8} y={8 + i * (boxH + vGap)} w={boxW} h={boxH} node={layer} />
      ))}
      <Box
        x={width - 180}
        y={(height - boxH) / 2 - 8}
        w={172}
        h={boxH + 16}
        node={outcome}
      />
      {layers.map((_, i) => (
        <Arrow
          key={i}
          x1={8 + boxW + 5}
          y1={8 + i * (boxH + vGap) + boxH / 2}
          x2={width - 185}
          y2={(height - boxH) / 2}
        />
      ))}
    </Svg>
  );
}

/** Two labelled columns for an "X vs Y" distinction. */
function Versus({
  left,
  right,
  title,
  desc,
}: {
  left: { heading: string; items: string[] };
  right: { heading: string; items: string[] };
  title: string;
  desc: string;
}) {
  const colW = 240;
  const width = colW * 2 + 40;
  const rows = Math.max(left.items.length, right.items.length);
  const height = 54 + rows * 24 + 14;
  const col = (
    side: { heading: string; items: string[] },
    x: number,
    tone: 'source' | 'out',
  ) => (
    <g>
      <rect
        x={x}
        y={8}
        width={colW}
        height={height - 16}
        rx={12}
        fill={FILL[tone]}
        stroke={STROKE[tone]}
        strokeWidth={1.25}
      />
      <text x={x + 16} y={32} fontSize={12.5} fontWeight={700} fill={TEXT[tone]}>
        {side.heading}
      </text>
      {side.items.map((item, i) => (
        <text key={i} x={x + 16} y={58 + i * 24} fontSize={11} fill="#334155">
          · {item}
        </text>
      ))}
    </g>
  );
  return (
    <Svg width={width} height={height} title={title} desc={desc}>
      {col(left, 8, 'source')}
      {col(right, colW + 32, 'out')}
    </Svg>
  );
}

const DIAGRAMS: Record<DocDiagramName, () => JSX.Element> = {
  'platform-map': () => (
    <Fan
      source={{ label: 'TopEdge workspace', sub: 'one customer timeline', tone: 'core' }}
      outputs={[
        { label: 'Shopify', sub: 'orders · products · checkouts', tone: 'source' },
        { label: 'WhatsApp Cloud API', sub: 'inbox · templates · journeys', tone: 'source' },
        { label: 'Gmail', sub: 'optional email channel', tone: 'source' },
        { label: 'Storefront pixel', sub: 'carts · browse events', tone: 'source' },
      ]}
      reverse
      title="How TopEdge connects Shopify, WhatsApp, Gmail and your storefront"
      desc="Shopify, the WhatsApp Cloud API, Gmail and the storefront pixel all feed one TopEdge workspace, which keeps a single timeline per customer."
    />
  ),
  'message-lifecycle': () => (
    <Chain
      nodes={[
        { label: 'Approved template', tone: 'source' },
        { label: 'Queued', sub: 'worker picks it up', tone: 'muted' },
        { label: 'Sent to Meta', tone: 'core' },
        { label: 'Delivered', tone: 'muted' },
        { label: 'Read', tone: 'muted' },
        { label: 'Click / reply', tone: 'out' },
      ]}
      title="Lifecycle of one WhatsApp message, from approved template to reply"
      desc="A message moves from an approved template, through the dispatch queue, to Meta, then collects delivered, read and click or reply receipts that TopEdge writes back onto the customer."
      boxW={116}
      gap={26}
    />
  ),
  'journey-runtime': () => (
    <Chain
      nodes={[
        { label: 'Trigger fires', sub: 'Shopify event or cron', tone: 'source' },
        { label: 'Filters checked', sub: 'all rules must pass', tone: 'warn' },
        { label: 'Graph compiled', sub: 'nodes → timed steps', tone: 'muted' },
        { label: 'Steps dispatched', sub: 'WhatsApp · email', tone: 'core' },
        { label: 'Receipts + revenue', sub: 'last touch, 7 days', tone: 'out' },
      ]}
      title="What happens between a Shopify event and a sent journey step"
      desc="A trigger fires, trigger filters are evaluated, the published graph compiles into timed steps, the dispatch worker sends each step, and delivery receipts plus recovered revenue flow back into analytics."
      boxW={134}
      gap={28}
    />
  ),
  'cart-recovery-ladder': () => (
    <Ladder
      beats={[
        { at: '0 min', label: 'Checkout abandoned', sub: 'phone captured', tone: 'source' },
        { at: '+25 min', label: 'Reminder 1', sub: 'cart contents', tone: 'core' },
        { at: '+6 hr', label: 'Reminder 2', sub: 'objection handling' },
        { at: '+24 hr', label: 'Reminder 3', sub: 'last nudge' },
        { at: 'On order', label: 'Marked recovered', sub: 'revenue attributed', tone: 'out' },
      ]}
      title="A three-message cart recovery ladder on the default timings"
      desc="The cart is captured at abandonment, reminders go out after about 25 minutes, 6 hours and 24 hours, and the cart is marked recovered with attributed revenue when the customer orders."
    />
  ),
  'cod-prepaid-switch': () => (
    <Chain
      nodes={[
        { label: 'COD order placed', tone: 'source' },
        { label: 'Confirm on WhatsApp', sub: 'buttons', tone: 'core' },
        { label: 'Draft invoice created', sub: 'in Shopify', tone: 'muted' },
        { label: 'Pay link injected', tone: 'muted' },
        { label: 'Prepaid order', sub: 'COD order voided', tone: 'out' },
      ]}
      title="How a COD order is switched to prepaid over WhatsApp"
      desc="A COD order triggers a confirmation message with buttons; choosing to prepay creates a Shopify draft invoice, injects the payment link into the reply, and Shopify replaces the COD order with a paid one."
      boxW={130}
      gap={26}
    />
  ),
  'order-status-triggers': () => (
    <Fan
      source={{ label: 'Journey trigger', sub: 'matched on publish', tone: 'core' }}
      outputs={[
        { label: 'orders/create', sub: '→ order placed', tone: 'source' },
        { label: 'orders/fulfilled', sub: '→ order shipped', tone: 'source' },
        { label: 'fulfillments/update', sub: '→ shipped or delivered', tone: 'source' },
        { label: 'Dashboard status change', sub: '→ shipped or delivered', tone: 'source' },
        { label: 'orders/cancelled', sub: '→ cancels enrollments', tone: 'warn' },
      ]}
      reverse
      title="Which Shopify events map to which journey trigger"
      desc="Shopify order and fulfilment webhooks, plus manual status changes in the dashboard, each map to a journey trigger type; a cancelled order cancels any enrollments for that order."
    />
  ),
  'service-window': () => (
    <Split
      input={{ label: 'You want to message a customer', tone: 'source' }}
      test="Did they message you in the last 24 hours?"
      yes={{ label: 'Free-form reply', sub: 'any text or media', tone: 'out' }}
      no={{ label: 'Approved template only', sub: 'reopens the window', tone: 'warn' }}
      title="When you can send free text and when you need a template"
      desc="Inside 24 hours of the customer's last message you can send free-form replies. Outside it, only an approved template will send, and the customer's reply reopens the window."
    />
  ),
  'flow-vs-journey': () => (
    <Versus
      left={{
        heading: 'Flow Builder — they message you',
        items: [
          'Welcome menu and FAQ replies',
          'Buttons and list pickers',
          'Capture answers into variables',
          'Hand off to a human agent',
          'Runs inside the 24-hour window',
        ],
      }}
      right={{
        heading: 'Journeys — something happens in Shopify',
        items: [
          'Order placed, shipped, delivered',
          'Cart abandoned ladders',
          'COD confirmation and prepaid switch',
          'Waits measured in hours and days',
          'Sends approved templates',
        ],
      }}
      title="Flow Builder versus Journeys"
      desc="Flow Builder handles inbound conversations — menus, replies and handover inside the 24-hour window. Journeys handle outbound automation on Shopify events, with waits and approved templates."
    />
  ),
  'opt-in-sources': () => (
    <Fan
      source={{ label: 'Audience', sub: 'consent + source recorded', tone: 'core' }}
      outputs={[
        { label: 'Website popup', sub: 'spin wheel · mystery', tone: 'source' },
        { label: 'Checkout consent', sub: 'marketing opt-in', tone: 'source' },
        { label: 'WhatsApp widget', sub: 'customer messages first', tone: 'source' },
        { label: 'CSV import', sub: 'you attest consent', tone: 'warn' },
      ]}
      reverse
      title="The four ways a contact can opt in to WhatsApp marketing"
      desc="Website popups, checkout consent, the WhatsApp widget and attested CSV imports all write into Audience with the consent source recorded against the contact."
    />
  ),
  'tracking-layers': () => (
    <Layers
      layers={[
        { label: 'Theme app embed', sub: 'storefront events', tone: 'source' },
        { label: 'Web pixel extension', sub: 'cart + browse', tone: 'source' },
        { label: 'Checkout extension', sub: 'phone at checkout', tone: 'source' },
      ]}
      outcome={{ label: 'Cart lead with a phone number', tone: 'out' }}
      title="The three tracking layers that produce a recoverable cart"
      desc="The theme app embed, web pixel extension and checkout extension each have to be installed and healthy before an abandoned cart arrives with a phone number attached."
    />
  ),
  'inbox-handover': () => (
    <Chain
      nodes={[
        { label: 'Customer messages', tone: 'source' },
        { label: 'Bot replies', sub: 'flow or AI', tone: 'muted' },
        { label: 'Agent takes control', sub: 'bot pauses', tone: 'core' },
        { label: 'Agent resolves', tone: 'muted' },
        { label: 'Released to bot', sub: 'automation resumes', tone: 'out' },
      ]}
      title="Handing a WhatsApp conversation from the bot to a human and back"
      desc="An inbound message is answered by the flow or AI until an agent takes control, which pauses the bot; once the agent resolves and releases the thread, automation resumes on the next inbound message."
      boxW={126}
      gap={26}
    />
  ),
  'template-approval': () => (
    <Chain
      nodes={[
        { label: 'Draft in Meta Manager', tone: 'source' },
        { label: 'Submitted to Meta', sub: 'status pending', tone: 'warn' },
        { label: 'Approved', tone: 'out' },
        { label: 'Mapped in a journey', tone: 'muted' },
        { label: 'Sends live', tone: 'core' },
      ]}
      arrowLabels={[undefined, 'minutes–24 h', undefined, undefined]}
      title="A WhatsApp template from draft to live send"
      desc="Templates are drafted in Meta Manager, submitted to Meta for review, and only once approved can they be mapped onto a journey step and sent to customers."
      boxW={128}
      gap={30}
    />
  ),
};

export default function DocDiagram({
  name,
  title,
  caption,
}: {
  name: DocDiagramName;
  title: string;
  caption?: string;
}) {
  const Render = DIAGRAMS[name];
  if (!Render) return null;
  return (
    <figure className="docs-diagram">
      <div className="docs-diagram__frame">
        <Render />
      </div>
      <figcaption className="docs-diagram__caption">
        <span className="docs-diagram__label">{title}</span>
        {caption ? <span className="docs-diagram__note">{caption}</span> : null}
      </figcaption>
    </figure>
  );
}
