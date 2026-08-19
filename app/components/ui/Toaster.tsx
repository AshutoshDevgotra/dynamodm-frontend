'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastFn: ((message: string, type?: Toast['type']) => void) | null = null;

export function toast(message: string, type: Toast['type'] = 'info') {
  toastFn?.(message, type);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    toastFn = (message, type = 'info') => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
    };
    return () => { toastFn = null; };
  }, []);

  const colors = { success: '#10b981', error: '#ef4444', info: '#2563eb' };

  if (!mounted) return null;

  return createPortal(
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: '#fff',
            border: '1px solid rgba(11,18,32,0.08)',
            borderLeft: `3px solid ${colors[t.type]}`,
            borderRadius: 12,
            padding: '12px 18px',
            color: '#0b1220',
            fontSize: 14,
            fontWeight: 500,
            maxWidth: 360,
            boxShadow: '0 12px 40px rgba(15,23,42,0.12)',
            animation: 'slideIn 0.3s ease',
          }}
        >
          {t.message}
        </div>
      ))}
      <style>{`@keyframes slideIn { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }`}</style>
    </div>,
    document.body
  );
}
