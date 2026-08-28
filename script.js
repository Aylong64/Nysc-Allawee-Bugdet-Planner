const { useState, useMemo } = React;

const CATEGORIES = [
  { id: 'lodge', label: 'Lodge / Accommodation' },
  { id: 'feeding', label: 'Feeding' },
  { id: 'transport', label: 'Transport to PPA' },
  { id: 'data', label: 'Data & Airtime' },
  { id: 'cds', label: 'CDS Dues' },
  { id: 'savings', label: 'Savings' },
  {id: 'Miscellaneous', label: 'Miscellaneous'},
];

const MAX_ALLOWEE = 77000;

const DEFAULT_ALLOCATIONS = { lodge: 0, feeding: 0, transport: 0, data: 0, cds: 0, savings: 0 };

function naira(amount) {
  const sign = amount < 0 ? '\u2212' : '';
  return `${sign}\u20A6${Math.abs(amount).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function nairaAlert(amount) {
  const sign = amount < 0 ? '-' : '';
  return `${sign}NGN${Math.abs(amount).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function BudgetPlanner() {
  const [salary, setSalary] = useState(MAX_ALLOWEE);
  const [allocations, setAllocations] = useState(DEFAULT_ALLOCATIONS);

  function updateAllocation(id, value) {
    setAllocations(prev => ({ ...prev, [id]: value }));
  }

  return (
    <div className="wrap">
      <header className="page-head">
        <div className="crest">NYSC</div>
        <div>
          <h1>Allawee Budget Planner</h1>
          <p className="subtitle">Plan your service year, one alert at a time</p>
        </div>
      </header>

      <section className="alert-card">
        <div className="alert-card-top">
          <span className="alert-label">Monthly Allawee</span>
          <span className="alert-tag">Scroll</span>
        </div>
        <div className="salary-figure">
          <span className="currency-mark">&#8358;</span>
          <input
            type="number"
            inputMode="numeric"
            className="salary-input"
            value={salary}
            min="0"
            max={MAX_ALLOWEE}
            step="1000"
            onChange={e => setSalary(Math.min(MAX_ALLOWEE, Math.max(0, Number(e.target.value) || 0)))}
          />
        </div>
        <input
          type="range"
          className="salary-slider"
          min="0"
          max={MAX_ALLOWEE}
          step="1000"
          value={salary}
          onChange={e => setSalary(Number(e.target.value))}
        />
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<BudgetPlanner />);
