export default function BrandDashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Brand dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: 'Active campaigns', value: '0' },
          { label: 'Pending proposals', value: '0' },
          { label: 'Total spend', value: '₹0' },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-black/6 bg-white p-6">
            <h3 className="text-sm font-medium text-zinc-500">{card.label}</h3>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
