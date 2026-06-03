"use client";

import { useMemo, useState } from "react";

type CleanType = "routine" | "deep" | "moveout";
type Currency = "USD" | "EUR";

interface TypeConfig {
  lo: number;
  hi: number;
  bed: number;
  bath: number;
  base: number;
  label: string;
  note: string;
}

interface AddonConfig {
  id: string;
  nm: string;
  lo: number;
  hi: number;
}

const CURRENCY: Record<Currency, { sym: string; mult: number }> = {
  USD: { sym: "$", mult: 1 },
  EUR: { sym: "€", mult: 0.92 }
};

const TYPES: Record<CleanType, TypeConfig> = {
  routine: {
    lo: 0.07,
    hi: 0.12,
    bed: 8,
    bath: 14,
    base: 40,
    label: "Routine / maintenance clean",
    note: "Recurring homes can run 10–15% below the first-clean price."
  },
  deep: {
    lo: 0.11,
    hi: 0.2,
    bed: 12,
    bath: 20,
    base: 55,
    label: "First-time deep clean",
    note: "Price toward the top if the home is neglected."
  },
  moveout: {
    lo: 0.15,
    hi: 0.26,
    bed: 15,
    bath: 24,
    base: 70,
    label: "Move-out / move-in clean",
    note: "Empty, neglected homes need detailed work on every surface."
  }
};

const ADDONS: AddonConfig[] = [
  { id: "oven", nm: "Inside oven", lo: 25, hi: 50 },
  { id: "fridge", nm: "Inside fridge", lo: 20, hi: 40 },
  { id: "windows", nm: "Interior windows", lo: 40, hi: 90 },
  { id: "carpet", nm: "Carpet shampoo", lo: 75, hi: 200 },
  { id: "walls", nm: "Full wall washing", lo: 50, hi: 120 },
  { id: "laundry", nm: "Laundry / linens", lo: 20, hi: 45 }
];

const TYPE_BUTTONS: { key: CleanType; label: string; sub: string }[] = [
  { key: "routine", label: "Routine", sub: "maintenance / recurring" },
  { key: "deep", label: "Deep clean", sub: "detailed, first-time" },
  { key: "moveout", label: "Move-out", sub: "empty / neglected" }
];

export function CleaningCalculator() {
  const [cur, setCur] = useState<Currency>("USD");
  const [type, setType] = useState<CleanType>("deep");
  const [bed, setBed] = useState(3);
  const [bath, setBath] = useState(2);
  const [sqft, setSqft] = useState(1100);
  const [addons, setAddons] = useState<Set<string>>(new Set());

  const fmt = (n: number) => `${CURRENCY[cur].sym}${Math.round(n).toLocaleString()}`;
  const conv = (n: number) => n * CURRENCY[cur].mult;

  const calc = useMemo(() => {
    const t = TYPES[type];
    const loBase = sqft * t.lo + bed * t.bed + bath * t.bath + t.base;
    const hiBase = sqft * t.hi + bed * t.bed * 1.1 + bath * t.bath * 1.1 + t.base;
    let loAdd = 0;
    let hiAdd = 0;
    ADDONS.forEach((a) => {
      if (addons.has(a.id)) {
        loAdd += a.lo;
        hiAdd += a.hi;
      }
    });
    return {
      lo: conv(loBase + loAdd),
      hi: conv(hiBase + hiAdd),
      loBase: conv(loBase),
      hiBase: conv(hiBase),
      label: t.label,
      note: t.note
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, bed, bath, sqft, addons, cur]);

  const toggleAddon = (id: string) => {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const stepBed = (d: number) => setBed((v) => Math.max(1, v + d));
  const stepBath = (d: number) => setBath((v) => Math.max(1, v + d));

  return (
    <section className="calc" id="calculator">
      <div className="calc-head">
        <div>
          <h2>Cleaning Price Calculator</h2>
          <p>Estimate a fair quote in seconds. Adjust to match your market.</p>
        </div>
        <div className="cur-switch">
          {(["USD", "EUR"] as Currency[]).map((c) => (
            <button
              key={c}
              type="button"
              className={cur === c ? "on" : ""}
              onClick={() => setCur(c)}
            >
              {c === "USD" ? "$ USD" : "€ EUR"}
            </button>
          ))}
        </div>
      </div>

      <div className="calc-body">
        <div className="field">
          <label>Type of clean</label>
          <div className="hint">
            Deep cleans take 1.5–2× longer than routine, so they&apos;re priced higher.
          </div>
          <div className="seg">
            {TYPE_BUTTONS.map((b) => (
              <button
                key={b.key}
                type="button"
                className={type === b.key ? "on" : ""}
                onClick={() => setType(b.key)}
              >
                {b.label}
                <span className="sub">{b.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Home size</label>
          <div className="stepper-row">
            <div className="stepper">
              <div className="cap">Bedrooms</div>
              <div className="box">
                <button type="button" onClick={() => stepBed(-1)}>
                  –
                </button>
                <span className="val">{bed}</span>
                <button type="button" onClick={() => stepBed(1)}>
                  +
                </button>
              </div>
            </div>
            <div className="stepper">
              <div className="cap">Bathrooms</div>
              <div className="box">
                <button type="button" onClick={() => stepBath(-1)}>
                  –
                </button>
                <span className="val">{bath}</span>
                <button type="button" onClick={() => stepBath(1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <label>
            Square footage — <span className="sqft-val">{sqft.toLocaleString()}</span> sq ft
          </label>
          <div className="hint">
            Condition matters more than size. Heavier buildup = top of the range.
          </div>
          <input
            type="range"
            min={500}
            max={4000}
            step={50}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label>Paid add-ons</label>
          <div className="hint">
            Keep these as visible line items — never bury them in the base price.
          </div>
          <div className="addons">
            {ADDONS.map((a) => {
              const on = addons.has(a.id);
              return (
                <div
                  key={a.id}
                  className={`addon${on ? "on" : ""}`}
                  onClick={() => toggleAddon(a.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleAddon(a.id);
                    }
                  }}
                >
                  <div className="check">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path
                        d="M1 5l3.5 3.5L11 1"
                        stroke="#fff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nm">{a.nm}</span>
                  <span className="pr">+{fmt(conv(a.lo))}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="result">
          <div className="rlabel">Suggested quote range</div>
          <div className="range">
            {fmt(calc.lo)} – {fmt(calc.hi)}
          </div>
          <div className="note">
            {calc.label} · {calc.note}
          </div>
          <div className="breakdown">
            <div className="br">
              <span>
                Base {bed} bed / {bath} bath · {sqft.toLocaleString()} sq ft
              </span>
              <span>
                {fmt(calc.loBase)} – {fmt(calc.hiBase)}
              </span>
            </div>
            {ADDONS.filter((a) => addons.has(a.id)).map((a) => (
              <div className="br" key={a.id}>
                <span>+ {a.nm}</span>
                <span>
                  {fmt(conv(a.lo))} – {fmt(conv(a.hi))}
                </span>
              </div>
            ))}
          </div>
          <div className="disc">
            Estimates use 2026 US/EU market averages: routine ≈ base rate, deep ≈ +50–100%, move-out
            ≈ +50–70%. Always adjust for your local market, travel, and supplies. This is a starting
            point, not a fixed rate.
          </div>
        </div>
      </div>
    </section>
  );
}
