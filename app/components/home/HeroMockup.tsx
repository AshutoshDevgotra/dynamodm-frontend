export default function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[780px] pb-12 pt-8">
      {/* Outer shell — mimics a browser/app window */}
      <div className="overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_8px_40px_rgba(17,24,39,0.10)]">

        {/* Window chrome bar */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F5F7FA] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#E5E7EB]" />
          <span className="h-3 w-3 rounded-full bg-[#E5E7EB]" />
          <span className="h-3 w-3 rounded-full bg-[#E5E7EB]" />
          <span className="mx-auto rounded-md border border-[#E5E7EB] bg-white px-14 py-1 text-[11px] text-[#9ca3af]">app.orangeflow.in</span>
          <span className="h-3 w-3" />
        </div>

        {/* App content */}
        <div className="grid gap-0 sm:grid-cols-[220px_1fr]">

          {/* Left sidebar nav */}
          <div className="hidden border-r border-[#E5E7EB] bg-white p-4 sm:block">
            <div className="mb-4 flex items-center gap-2 px-2 py-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8B6B87]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span className="text-[13px] font-bold text-[#111111]">OrangeFlow</span>
            </div>
            {[
              { label: 'Dashboard',    active: false },
              { label: 'Automations',  active: true },
              { label: 'Leads',        active: false },
              { label: 'Analytics',    active: false },
              { label: 'Storefront',   active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`mb-0.5 rounded-lg px-3 py-2 text-[12px] font-medium ${
                  item.active
                    ? 'bg-[#F4ECF4] text-[#8B6B87] font-semibold'
                    : 'text-[#6B7280]'
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Main content area */}
          <div className="min-w-0 p-5">

            {/* Page title row */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[14px] font-bold text-[#111111]">Automations</div>
                <div className="text-[11px] text-[#9ca3af]">3 active rules</div>
              </div>
              <div className="rounded-full bg-[#8B6B87] px-3 py-1.5 text-[11px] font-bold text-white">+ New rule</div>
            </div>

            {/* Active automation rule card */}
            <div className="mb-3 rounded-[14px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="text-[12px] font-semibold text-[#111111]">SIP Recipe Giveaway</div>
                  <div className="text-[11px] text-[#9ca3af]">Keyword: SIP · Comment → DM</div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[#F4ECF4] px-2.5 py-1 text-[10px] font-bold text-[#8B6B87]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8B6B87]" /> Active
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Triggered', value: '248' },
                  { label: 'DMs sent',  value: '241' },
                  { label: 'Leads',     value: '189' },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-[#F5F7FA] px-2 py-2">
                    <div className="text-[14px] font-bold text-[#111111]">{s.value}</div>
                    <div className="text-[10px] text-[#9ca3af]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incoming comment → auto DM row */}
            <div className="grid gap-3 sm:grid-cols-2">

              {/* Incoming comment */}
              <div className="rounded-[14px] border border-[#E5E7EB] bg-[#F5F7FA] p-3.5">
                <div className="mb-2.5 flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C5AFC3] to-[#8B6B87]" />
                  <div>
                    <div className="text-[11px] font-semibold text-[#111111]">@priya.creates</div>
                    <div className="text-[10px] text-[#9ca3af]">commented on your reel</div>
                  </div>
                </div>
                <div className="rounded-xl rounded-tl-sm border border-[#E5E7EB] bg-white px-3 py-2 text-[12px]">
                  SIP ✨
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[#8B6B87]">
                  ✓ Trigger matched
                </div>
              </div>

              {/* Auto DM sent */}
              <div className="rounded-[14px] border border-[#705567]/15 bg-[#705567] p-3.5 text-white">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/50">Auto DM sent</div>
                <div className="rounded-xl rounded-tr-sm bg-[#8B6B87] px-3 py-2 text-[12px] leading-relaxed text-white">
                  Hey! Here&apos;s your sip recipe + shoppable kit 💛
                </div>
                <div className="mt-2.5 rounded-xl border border-white/10 bg-white/8 p-2.5">
                  <div className="text-[11px] font-semibold">Free recipe PDF</div>
                  <div className="mt-0.5 text-[10px] text-white/50">orangeflow.in/priya</div>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-white/40">
                  <span>1.2s delivery</span>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-white/70">Lead saved ✓</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
