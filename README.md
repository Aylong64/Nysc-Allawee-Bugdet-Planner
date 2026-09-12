# NYSC Allawee Budget Planner

A single-page React app that helps NYSC corps members plan how to split their monthly allawee (allowance) across essential categories styled like a bank statement, complete with debit alerts and a running balance.

## Overview

Corps members receive a fixed monthly allowance and have to stretch it across accommodation, feeding, transport, and more. 
This app turns that budgeting exercise into something that feels like checking your bank app: sliders adjust each category's share, 
and a live "transaction ticker" shows each amount being debited from your allowance, along with your remaining balance or a "Transaction Declined" alert if you've over-allocated.

## Features

- **Allowance input & slider** — Set your monthly allawee via a number input or a slider, capped at ₦77,000.
- **Category ledger** — Adjustable percentage sliders (0–60%) for each budget category:
  - Lodge / Accommodation
  - Feeding
  - Transport to PPA
  - Data & Airtime
  - CDS Dues
  - Savings
  - Miscellaneous
- **Live calculations** — Each category shows its computed naira amount, updated instantly as sliders move.
- **Total allocation tracker** — Displays the running total percentage allocated across all categories.
- **Reset button** — Instantly clears all allocations back to 0%.
- **Debit-alert ticker** — A bank-style feed listing each category's debit and the resulting balance after each deduction.
- **Over-allocation handling** — If total allocations exceed the allowance, the ticker switches to a red "Transaction Declined" state showing how much you're over by; otherwise it shows your final available balance.
- **Bank-statement aesthetic** — Dark navy theme, cyan/blue gradient accents, monospace figures (JetBrains Mono) for amounts, and Raleway/Open Sans for headings and text.
- **Fully responsive** — Layout adapts down to small mobile screens (ledger grid collapses to a single column, crest and header resize, etc.).

## Tech Stack

- **React 18** (via `unpkg` CDN, `react.development.js` + `react-dom.development.js`)
- **Babel Standalone** — compiles the in-browser JSX in `script.js` (loaded as `type="text/babel"`), so no build step or bundler is needed
- **HTML** — page shell (`index.html`)
- **CSS** — theming and layout (`style.css`), using CSS custom properties for colors and a mobile-first responsive design
- **Google Fonts** — Raleway, Open Sans, JetBrains Mono

No npm install, bundler, or server required — everything runs directly in the browser.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Aylong64/Nysc-Allawee-Bugdet-Planner.git
   ```
2. Navigate into the project folder:
   ```bash
   cd Nysc-Allawee-Bugdet-Planner
   ```
3. Open `index.html` in your browser:
   ```bash
   open index.html   # macOS
   # or just double-click the file
   ```

An internet connection is needed on first load to fetch React, Babel, and the Google Fonts from their CDNs.

## Usage

1. Drag each category's slider to assign it a percentage of your allowance (0–60% per category).
2. Watch the **Ledger** section update each category's ₦ amount live, and check the "% allocated" total at the top of the ledger.
3. Scroll to the **Debit Alerts** ticker to see each category's amount deducted in sequence, with your balance after each one.
4. If your allocations add up to more than your allowance, the ticker turns red and shows a "Transaction Declined" message with how much you're over by. Otherwise, it shows your final **Available Balance**.
5. Click **Reset** to zero out all category allocations and start over.

## Project Structure

```
Nysc-Allawee-Bugdet-Planner/
├── index.html      # Page shell — loads React, Babel, fonts, and script.js
├── script.js       # React component: state, calculations, and JSX markup
└── style.css       # Theme, layout, and responsive styling
```

## Configuration

A couple of values are easy to tweak directly in `script.js`:

- `MAX_ALLOWEE` — the maximum allowance cap (default: `77000`)
- `CATEGORIES` — the list of budget categories and their labels
- The `max="60"` on each category slider — the per-category allocation cap (60%)

## Color Palette

The UI uses a dark financial-app theme:

| Purpose | Color |
|---|---|
| Background | Deep navy (`#181F2A`) |
| Cards | Slightly lighter navy (`#1F2937`) |
| Accent gradient | Cyan → Blue (`#65E2D9` → `#47A8D1`) |
| Text | White / muted blue-gray |
| Warning / declined | Red (`#DF5849`) |

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to fork the repo and submit a pull request.


## Acknowledgements

Built for NYSC corps members to make monthly allowance planning simpler and more visual.
