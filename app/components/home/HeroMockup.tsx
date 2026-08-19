export default function HeroMockup() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-[720px]">
      <div className="overflow-hidden rounded-[28px] border border-white/30 bg-white/15 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-md">
        <div className="grid gap-3 rounded-[22px] bg-white p-4 sm:grid-cols-[1fr_1.1fr] sm:p-5">
          <div className="rounded-2xl bg-[#f6f7fb] p-4">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400" />
              <div>
                <div className="text-xs font-semibold">@priya.creates</div>
                <div className="text-[11px] text-zinc-400">New comment</div>
              </div>
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm shadow-sm">
              SIP ✨
            </div>
            <div className="mt-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400">Trigger matched</div>
          </div>

          <div className="rounded-2xl bg-[#0b1220] p-4 text-white">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400">Auto DM sent</div>
            <div className="rounded-2xl rounded-tr-sm bg-blue-500 px-3 py-2.5 text-sm leading-relaxed">
              Hey! Here is the sip recipe + the shoppable kit 💛
            </div>
            <div className="mt-3 rounded-xl bg-white/8 p-3">
              <div className="text-xs font-semibold">Free recipe PDF</div>
              <div className="mt-1 text-[11px] text-zinc-400">dynamodm.io/priya</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Delivered in 1.2s</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">Lead captured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
