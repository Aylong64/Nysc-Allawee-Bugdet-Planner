const { useState, useMemo } = React;

const CATEGORIES = [
  { id: 'lodge', label: 'Lodge / Accommodation' },
  { id: 'feeding', label: 'Feeding' },
  { id: 'transport', label: 'Transport to PPA' },
  { id: 'data', label: 'Data & Airtime' },
  { id: 'cds', label: 'CDS Dues' },
  { id: 'savings', label: 'Savings' },
  { id: 'Miscellaneous', label: 'Miscellaneous' },
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

  function resetAllocations() {
    setAllocations(DEFAULT_ALLOCATIONS);
  }

  const rows = useMemo(() => {
    let runningBalance = salary;
    return CATEGORIES.map(cat => {
      const pct = allocations[cat.id] || 0;
      const amount = Math.round((salary * pct) / 100);
      runningBalance -= amount;
      return { ...cat, pct, amount, balanceAfter: runningBalance };
    });
  }, [salary, allocations]);

  const totalPct = useMemo(
    () => CATEGORIES.reduce((sum, c) => sum + (allocations[c.id] || 0), 0),
    [allocations]
  );
  const totalAmount = useMemo(() => rows.reduce((sum, r) => sum + r.amount, 0), [rows]);
  const availableAmount = salary - totalAmount;
  const isOverAllocated = availableAmount < 0;

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

      <section className="ledger">
        <div className="ledger-head">
          <span>Ledger</span>
          <div className="ledger-head-right">
            <span className="ledger-total-pct">{totalPct}% allocated</span>
            <button className="cta cta-ghost" onClick={resetAllocations}>Reset</button>
          </div>
        </div>

        <div className="ledger-grid">
          {rows.map(row => (
            <div className="ledger-row" key={row.id}>
              <div className="ledger-row-top">
                <span className="ledger-label">{row.label}</span>
                <span className="ledger-pct">{row.pct}%</span>
              </div>
              <span className="ledger-amount">{naira(row.amount)}</span>
              <input
                type="range"
                min="0"
                max="60"
                value={row.pct}
                onChange={e => updateAllocation(row.id, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={`ticker ${isOverAllocated ? 'ticker-declined' : ''}`}>
        <p className="ticker-kicker">{isOverAllocated ? 'Transaction Declined' : 'Debit Alerts'}</p>
        {rows.map(row => (
          <p className="ticker-line" key={row.id}>
            {nairaAlert(row.amount)} debited for {row.label}. Bal: {nairaAlert(row.balanceAfter)}
          </p>
        ))}
        <p className={`ticker-line ticker-final ${isOverAllocated ? 'declined' : 'available'}`}>
          {isOverAllocated
            ? `Insufficient allowee \u2014 over by ${nairaAlert(Math.abs(availableAmount))}`
            : `Available Balance: ${nairaAlert(availableAmount)}`}
        </p>
      </section>

      <footer className="note">
       Corper wee, you better budget your allawee
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<BudgetPlanner />);
