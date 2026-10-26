import { useMemo, useState } from 'react';
import qrcode from 'qrcode-generator';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';
import '../../styles/tools.css';

const COUNTRIES = [
  { code: '91', label: 'India +91', digits: 10 },
  { code: '971', label: 'UAE +971', digits: 9 },
  { code: '1', label: 'US/CA +1', digits: 10 },
  { code: '44', label: 'UK +44', digits: 10 },
  { code: '65', label: 'Singapore +65', digits: 8 },
  { code: '61', label: 'Australia +61', digits: 9 },
];

const PRESETS = [
  'Hi! I have a question about my order.',
  'Hi! I’d like to know more about your products.',
  'Hi! I want to place an order.',
  'Hi! I need help with a return or exchange.',
];

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };
  return { copied, copy };
}

function download(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function buttonSnippet(link: string) {
  return `<!-- WhatsApp chat button: paste just before </body> in theme.liquid -->
<a href="${link}" target="_blank" rel="noopener"
   aria-label="Chat with us on WhatsApp"
   style="position:fixed;right:20px;bottom:20px;z-index:9999;width:56px;height:56px;
          border-radius:50%;background:#25D366;display:flex;align-items:center;
          justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,.2);">
  <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true">
    <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.9 1.1 3.5.9 4.1.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
  </svg>
</a>`;
}

export default function WhatsAppLinkGenerator() {
  const [country, setCountry] = useState(COUNTRIES[0].code);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(PRESETS[0]);
  const { copied, copy } = useCopy();

  const spec = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];
  const digits = phone.replace(/\D/g, '').replace(/^0+/, '');
  const valid = digits.length === spec.digits;
  const touched = phone.length > 0;

  const link = useMemo(() => {
    const base = `https://wa.me/${country}${digits || 'XXXXXXXXXX'}`;
    const text = message.trim();
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
  }, [country, digits, message]);

  const qrSvg = useMemo(() => {
    if (!valid) return '';
    const qr = qrcode(0, 'M');
    qr.addData(link);
    qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
  }, [link, valid]);

  const downloadSvg = () => download('whatsapp-qr.svg', new Blob([qrSvg], { type: 'image/svg+xml' }));

  const downloadPng = () => {
    const img = new Image();
    img.onload = () => {
      const size = 1024;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((b) => b && download('whatsapp-qr.png', b), 'image/png');
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrSvg)}`;
  };

  const snippet = buttonSnippet(valid ? link : 'https://wa.me/91XXXXXXXXXX');

  return (
    <>
      <div className="mkt-wlg">
        <div>
          <label className="mkt-wlg__field">
            <span className="mkt-wlg__label">Your WhatsApp number</span>
            <span className="mkt-wlg__phone">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                aria-label="Country code"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder={'9'.repeat(spec.digits)}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={touched && !valid}
              />
            </span>
            <span className={`mkt-wlg__hint${touched && !valid ? ' is-error' : ''}`}>
              {touched && !valid
                ? `Enter the ${spec.digits}-digit number, without the country code.`
                : 'The number customers will message. Use your WhatsApp Business number.'}
            </span>
          </label>

          <label className="mkt-wlg__field">
            <span className="mkt-wlg__label">Pre-filled message (optional)</span>
            <textarea
              value={message}
              maxLength={500}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I have a question about my order."
            />
            <span className="mkt-wlg__hint">
              This text is already typed in the chat when the customer opens your link.
            </span>
          </label>
          <div className="mkt-wlg__presets" aria-label="Message ideas">
            {PRESETS.map((p) => (
              <button key={p} type="button" onClick={() => setMessage(p)}>
                {p.replace(/^Hi! /, '')}
              </button>
            ))}
          </div>
        </div>

        <div className="mkt-wlg__out" aria-live="polite">
          <div>
            <p className="mkt-wlg__out-label">Your WhatsApp link</p>
            <p className="mkt-wlg__link">{link}</p>
          </div>
          <div className="mkt-wlg__btns">
            <button
              type="button"
              className="mkt-wlg__btn is-primary"
              disabled={!valid}
              onClick={() => copy('link', link)}
            >
              {copied === 'link' ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
              {copied === 'link' ? 'Copied' : 'Copy link'}
            </button>
            <a
              className="mkt-wlg__btn"
              href={valid ? link : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!valid}
            >
              <ExternalLink size={15} aria-hidden />
              Test it
            </a>
          </div>

          <div>
            <p className="mkt-wlg__out-label">QR code</p>
            <div className="mkt-wlg__qr" style={{ marginTop: '0.5rem' }}>
              <div
                className="mkt-wlg__qr-box"
                role="img"
                aria-label={valid ? 'QR code for your WhatsApp link' : 'QR code appears here'}
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <div>
                <p className="mkt-wlg__qr-text">
                  {valid
                    ? 'Print it on packaging, invoices or your shop counter. Scanning opens a chat with you.'
                    : 'Enter your number to create the QR code.'}
                </p>
                <div className="mkt-wlg__btns" style={{ marginTop: '0.6rem' }}>
                  <button type="button" className="mkt-wlg__btn" disabled={!valid} onClick={downloadPng}>
                    <Download size={15} aria-hidden />
                    PNG
                  </button>
                  <button type="button" className="mkt-wlg__btn" disabled={!valid} onClick={downloadSvg}>
                    <Download size={15} aria-hidden />
                    SVG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mkt-wlg__snippet" aria-labelledby="wlg-snippet">
        <h2 id="wlg-snippet">Add a WhatsApp chat button to your Shopify store</h2>
        <ol>
          <li>In Shopify admin, go to Online Store, then Themes.</li>
          <li>Click the three dots next to your theme and choose Edit code.</li>
          <li>Open theme.liquid and paste the code just before the closing &lt;/body&gt; tag.</li>
          <li>Save. A green chat button now sits in the bottom-right corner of every page.</li>
        </ol>
        <div className="mkt-wlg__snippet-head">
          <p>Code for your button{valid ? '' : ' (enter your number above first)'}</p>
          <button
            type="button"
            className="mkt-wlg__btn"
            disabled={!valid}
            onClick={() => copy('snippet', snippet)}
          >
            {copied === 'snippet' ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
            {copied === 'snippet' ? 'Copied' : 'Copy code'}
          </button>
        </div>
        <pre className="mkt-wlg__code">{snippet}</pre>
      </section>
    </>
  );
}
