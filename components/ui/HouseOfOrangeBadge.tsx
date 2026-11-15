'use client';

import { Crown, Sparkles } from 'lucide-react';

interface HouseOfOrangeBadgeProps {
  variant?: 'compact' | 'full' | 'pill';
  className?: string;
}

export function HouseOfOrangeBadge({ variant = 'compact', className = '' }: HouseOfOrangeBadgeProps) {
  if (variant === 'compact') {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg ${className}`}
        style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          color: '#fff',
          border: '2px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Crown size={13} className="animate-pulse" />
        <span>House of Orange</span>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div 
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow ${className}`}
        style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          color: '#fff',
        }}
      >
        <Crown size={10} />
        <span>Member</span>
      </div>
    );
  }

  // full variant
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl p-5 shadow-xl ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF6B35 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient 3s ease infinite',
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
          >
            <Crown size={24} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white">House of Orange</h3>
              <Sparkles size={16} className="text-yellow-200 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-white/90 uppercase tracking-wider">Exclusive Member</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-1.5 rounded-xl bg-white/10 backdrop-blur-sm p-3 border border-white/20">
          <p className="text-sm font-bold text-white">✨ Your Benefits:</p>
          <ul className="space-y-1 text-xs text-white/95 font-medium">
            <li>• Unlimited Instagram accounts (up to 5)</li>
            <li>• Unlimited automations & leads</li>
            <li>• Unlimited DM sending</li>
            <li>• All premium features included</li>
            <li>• No subscription required</li>
          </ul>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-xs font-bold text-white/80 italic">
            "Exclusive access for valued partners"
          </p>
        </div>
      </div>

      {/* Animated sparkles background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
