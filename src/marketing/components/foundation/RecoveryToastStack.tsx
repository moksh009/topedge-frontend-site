import { useEffect, useState } from 'react';
import { recoveryToasts } from '../../data/home';

export default function RecoveryToastStack() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const rotate = setInterval(() => {
      setIndex((i) => (i + 1) % recoveryToasts.length);
    }, 5000);
    return () => clearInterval(rotate);
  }, [visible]);

  if (!visible) return null;

  const toast = recoveryToasts[index];

  return (
    <div className="home-recovery-toast mkt-animate" role="status" aria-live="polite">
      <p className="home-recovery-toast-label">Illustrative recovery</p>
      <p className="text-[#0c1222]">
        <span className="font-medium">{toast.store}</span> recovered{' '}
        <span className="mkt-kpi font-medium text-[#7C3AED]">{toast.amount}</span> cart , {' '}
        {toast.item}
      </p>
      <p className="mt-1 text-[11px] text-slate-400">{toast.time} · Sample merchant data</p>
    </div>
  );
}
