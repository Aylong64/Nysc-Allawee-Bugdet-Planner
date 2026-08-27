const { useState } = React;

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

const DEFAULT_ALLOCATIONS = { lodge: 0, feeding: 0, transport: 0, data: 0, cds: 0, savings: 0, Miscellaneous: 0, };

function naira(amount) {
  const sign = amount < 0 ? '\u2212' : '';
  return `${sign}\u20A6${Math.abs(amount).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
