import type { Metadata } from "next";

import { FooterSection } from "@/components/layout/sections/footer";
import { buildMetadata } from "@/lib/seo";

import { CleaningCalculator } from "./calculator";

export const metadata: Metadata = buildMetadata({
  title: "House Cleaning Price Calculator (2026) — Deep Clean vs Routine | Alliances",
  description:
    "Free house cleaning price calculator for 2026. See what counts as a deep clean vs routine clean, estimate quotes by size & add-ons, in USD or EUR.",
  path: "/tools/cleaning-price-calculator",
  type: "article"
});

const PAGE_CSS = `
  .ccp-root {
    --bg: #f4f1ea;
    --bg-card: #fffdf8;
    --ink: #1f2a24;
    --ink-soft: #5c685f;
    --line: #ddd6c8;
    --accent: #1f6f54;
    --accent-soft: #e3efe7;
    --accent-deep: #14503c;
    --gold: #c98a3a;
    --shadow: 0 1px 2px rgba(31,42,36,.04), 0 8px 28px rgba(31,42,36,.08);
    --radius: 16px;
    font-family: 'Spline Sans', -apple-system, sans-serif;
    background: var(--bg);
    color: var(--ink);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    background-image: radial-gradient(circle at 12% 18%, rgba(31,111,84,.05), transparent 42%), radial-gradient(circle at 88% 8%, rgba(201,138,58,.06), transparent 38%);
  }
  .ccp-root *, .ccp-root *::before, .ccp-root *::after { box-sizing: border-box; }
  .ccp-root .wrap { max-width: 820px; margin: 0 auto; padding: 0 22px; }

  .ccp-root header.hero { padding: 70px 0 36px; }
  .ccp-root .eyebrow {
    font-size: 13px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 18px;
  }
  .ccp-root h1 {
    font-family: 'Fraunces', serif; font-weight: 800; font-size: clamp(34px, 6vw, 56px);
    line-height: 1.04; letter-spacing: -.02em; margin-bottom: 20px; color: var(--ink);
  }
  .ccp-root h1 em { font-style: italic; color: var(--accent); }
  .ccp-root .lede { font-size: 19px; color: var(--ink-soft); max-width: 60ch; }
  .ccp-root .meta {
    margin-top: 26px; font-size: 14px; color: var(--ink-soft);
    display: flex; gap: 18px; flex-wrap: wrap; align-items: center;
    border-top: 1px solid var(--line); padding-top: 20px;
  }
  .ccp-root .meta strong { color: var(--ink); font-weight: 600; }

  .ccp-root .calc {
    background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius);
    box-shadow: var(--shadow); margin: 14px 0 50px; overflow: hidden;
  }
  .ccp-root .calc-head {
    background: var(--accent-deep); color: #fff; padding: 26px 30px;
    display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
  }
  .ccp-root .calc-head h2 { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; color: #fff; margin: 0; }
  .ccp-root .calc-head p { font-size: 14px; opacity: .82; margin-top: 3px; margin-bottom: 0; }
  .ccp-root .cur-switch { display: flex; background: rgba(255,255,255,.12); border-radius: 10px; padding: 4px; }
  .ccp-root .cur-switch button {
    border: 0; background: transparent; color: #fff; font-family: inherit; font-size: 14px;
    font-weight: 600; padding: 7px 15px; border-radius: 7px; cursor: pointer; transition: .18s;
  }
  .ccp-root .cur-switch button.on { background: #fff; color: var(--accent-deep); }
  .ccp-root .calc-body { padding: 30px; }
  .ccp-root .field { margin-bottom: 26px; }
  .ccp-root .field > label {
    display: block; font-weight: 600; font-size: 15px; margin-bottom: 4px;
  }
  .ccp-root .field .hint { font-size: 13px; color: var(--ink-soft); margin-bottom: 12px; }

  .ccp-root .seg { display: flex; gap: 8px; flex-wrap: wrap; }
  .ccp-root .seg button {
    flex: 1 1 auto; min-width: 90px; border: 1.5px solid var(--line); background: #fff;
    font-family: inherit; font-size: 14px; font-weight: 600; color: var(--ink);
    padding: 12px 10px; border-radius: 11px; cursor: pointer; transition: .16s;
  }
  .ccp-root .seg button:hover { border-color: var(--accent); }
  .ccp-root .seg button.on { background: var(--accent); border-color: var(--accent); color: #fff; }
  .ccp-root .seg button .sub { display: block; font-size: 11px; font-weight: 500; opacity: .8; margin-top: 2px; }

  .ccp-root .stepper-row { display: flex; gap: 14px; }
  .ccp-root .stepper { flex: 1; }
  .ccp-root .stepper .box {
    display: flex; align-items: center; justify-content: space-between;
    border: 1.5px solid var(--line); border-radius: 11px; padding: 6px 8px; background: #fff;
  }
  .ccp-root .stepper button {
    width: 34px; height: 34px; border: 0; border-radius: 8px; background: var(--accent-soft);
    color: var(--accent-deep); font-size: 20px; font-weight: 700; cursor: pointer; transition: .15s;
  }
  .ccp-root .stepper button:hover { background: var(--accent); color: #fff; }
  .ccp-root .stepper .val { font-size: 18px; font-weight: 700; }
  .ccp-root .stepper .cap { font-size: 12px; color: var(--ink-soft); font-weight: 600; text-align: center; margin-bottom: 6px; text-transform: uppercase; letter-spacing: .06em; }

  .ccp-root input[type=range] { width: 100%; accent-color: var(--accent); height: 6px; margin-top: 6px; }
  .ccp-root .sqft-val { font-weight: 700; color: var(--accent-deep); }

  .ccp-root .addons { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media (max-width: 560px){ .ccp-root .addons { grid-template-columns: 1fr; } }
  .ccp-root .addon {
    display: flex; align-items: center; gap: 11px; border: 1.5px solid var(--line);
    border-radius: 11px; padding: 12px 13px; cursor: pointer; background: #fff; transition: .15s;
    font-size: 14px; user-select: none;
  }
  .ccp-root .addon:hover { border-color: var(--accent); }
  .ccp-root .addon.on { border-color: var(--accent); background: var(--accent-soft); }
  .ccp-root .addon .check {
    width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--line);
    display: grid; place-items: center; flex-shrink: 0; transition: .15s;
  }
  .ccp-root .addon.on .check { background: var(--accent); border-color: var(--accent); }
  .ccp-root .addon .check svg { opacity: 0; transition: .15s; }
  .ccp-root .addon.on .check svg { opacity: 1; }
  .ccp-root .addon .nm { flex: 1; font-weight: 500; }
  .ccp-root .addon .pr { font-size: 13px; color: var(--ink-soft); font-weight: 600; }

  .ccp-root .result {
    background: linear-gradient(160deg, var(--accent-deep), var(--accent));
    color: #fff; border-radius: 14px; padding: 28px 30px; margin-top: 8px;
  }
  .ccp-root .result .rlabel { font-size: 13px; letter-spacing: .1em; text-transform: uppercase; opacity: .8; }
  .ccp-root .result .range { font-family: 'Fraunces', serif; font-size: clamp(38px,9vw,54px); font-weight: 800; line-height: 1.05; margin: 6px 0 4px; color: #fff; }
  .ccp-root .result .note { font-size: 14px; opacity: .85; }
  .ccp-root .breakdown { margin-top: 20px; border-top: 1px solid rgba(255,255,255,.18); padding-top: 16px; font-size: 14px; }
  .ccp-root .breakdown .br { display: flex; justify-content: space-between; padding: 4px 0; opacity: .92; }
  .ccp-root .breakdown .br span:last-child { font-weight: 600; }
  .ccp-root .disc { font-size: 12px; opacity: .7; margin-top: 14px; line-height: 1.5; }

  .ccp-root article { padding-bottom: 90px; }
  .ccp-root article h2 {
    font-family: 'Fraunces', serif; font-size: clamp(26px,4vw,34px); font-weight: 700;
    letter-spacing: -.01em; margin: 52px 0 16px; line-height: 1.12; color: var(--ink);
  }
  .ccp-root article h3 { font-family: 'Fraunces', serif; font-size: 21px; font-weight: 600; margin: 32px 0 10px; color: var(--ink); }
  .ccp-root article p { margin-bottom: 16px; font-size: 17px; color: #2c352e; }
  .ccp-root article ul { margin: 0 0 18px 2px; list-style: none; padding: 0; }
  .ccp-root article ul li { position: relative; padding-left: 26px; margin-bottom: 10px; font-size: 17px; }
  .ccp-root article ul li::before {
    content: ""; position: absolute; left: 4px; top: 11px; width: 8px; height: 8px;
    border-radius: 2px; background: var(--accent); transform: rotate(45deg);
  }
  .ccp-root article strong { color: var(--ink); }
  .ccp-root .callout {
    background: var(--accent-soft); border-left: 4px solid var(--accent);
    border-radius: 0 12px 12px 0; padding: 18px 22px; margin: 24px 0; font-size: 16px;
  }
  .ccp-root .callout b { color: var(--accent-deep); }

  .ccp-root .tbl-scroll { overflow-x: auto; margin: 22px 0; border: 1px solid var(--line); border-radius: 14px; }
  .ccp-root table { width: 100%; border-collapse: collapse; min-width: 520px; background: var(--bg-card); }
  .ccp-root th, .ccp-root td { text-align: left; padding: 14px 18px; font-size: 15px; border-bottom: 1px solid var(--line); }
  .ccp-root th { background: var(--accent-deep); color: #fff; font-weight: 600; font-size: 13px; letter-spacing: .04em; text-transform: uppercase; }
  .ccp-root tr:last-child td { border-bottom: 0; }
  .ccp-root td:first-child { font-weight: 600; }
  .ccp-root .tag { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; letter-spacing: .03em; }
  .ccp-root .tag.deep { background: #e9dcc4; color: #7a5418; }
  .ccp-root .tag.routine { background: var(--accent-soft); color: var(--accent-deep); }
  .ccp-root .tag.addon { background: #f3d9d4; color: #9a3b29; }

  .ccp-root footer.foot {
    border-top: 1px solid var(--line); padding: 30px 0 60px; font-size: 14px; color: var(--ink-soft);
  }
  .ccp-root .toc {
    background: var(--bg-card); border: 1px solid var(--line); border-radius: 14px;
    padding: 22px 26px; margin: 8px 0 20px;
  }
  .ccp-root .toc strong { font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); }
  .ccp-root .toc a { display: block; color: var(--ink); text-decoration: none; padding: 7px 0; border-bottom: 1px solid var(--line); font-size: 15px; transition: .15s; }
  .ccp-root .toc a:last-child { border: 0; }
  .ccp-root .toc a:hover { color: var(--accent); padding-left: 6px; }
`;

export default function CleaningPriceCalculatorPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,800;1,9..144,500&family=Spline+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      <div className="ccp-root">
        <header className="hero">
          <div className="wrap">
            <div className="eyebrow">Pricing Guide · Updated 2026</div>
            <h1>
              What should you charge for a <em>deep clean</em>?
            </h1>
            <p className="lede">
              A realistic, no-fluff price calculator for cleaning business owners — plus a clear
              breakdown of what belongs in a deep clean, a routine clean, and what should always be
              a paid add-on.
            </p>
            <div className="meta">
              <span>
                <strong>10 min read</strong>
              </span>
              <span>·</span>
              <span>For new &amp; growing cleaning businesses</span>
              <span>·</span>
              <span>USD / EUR</span>
            </div>
          </div>
        </header>

        <div className="wrap">
          <CleaningCalculator />

          <article>
            <div className="toc">
              <strong>In this guide</strong>
              <a href="#what-counts">What counts as a deep clean vs a routine clean</a>
              <a href="#addons">Add-ons you should always charge separately</a>
              <a href="#how-to-price">How to actually price a job (3 methods)</a>
              <a href="#example">A real example: 3 bed / 2 bath, 1,100 sq ft</a>
              <a href="#mistakes">5 pricing mistakes new owners make</a>
            </div>

            <h2 id="what-counts">Deep clean vs routine clean: where&apos;s the line?</h2>
            <p>
              This is the question that trips up almost every new cleaning business owner. A client
              asks for baseboards wiped, walls spot-cleaned, and vents done — and you&apos;re left
              wondering whether that&apos;s part of the deep clean or something extra. Here&apos;s
              the simplest way to think about it.
            </p>
            <p>
              A <strong>routine clean</strong> (also called maintenance or recurring) keeps an
              already-clean home looking good. A <strong>deep clean</strong> tackles everything that
              gets skipped week to week — the buildup, the edges, the reachable-but-ignored
              surfaces. A <strong>move-out clean</strong> behaves more like an empty-home project
              than a regular visit.
            </p>

            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Routine</th>
                    <th>Deep clean</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dusting reachable surfaces</td>
                    <td>
                      <span className="tag routine">Included</span>
                    </td>
                    <td>
                      <span className="tag deep">Included</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Vacuum &amp; mop floors</td>
                    <td>
                      <span className="tag routine">Included</span>
                    </td>
                    <td>
                      <span className="tag deep">Included</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Bathroom &amp; kitchen reset</td>
                    <td>
                      <span className="tag routine">Included</span>
                    </td>
                    <td>
                      <span className="tag deep">Included</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Baseboards</td>
                    <td>—</td>
                    <td>
                      <span className="tag deep">Included</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Wall spot-cleaning</td>
                    <td>—</td>
                    <td>
                      <span className="tag deep">Included</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Vents &amp; ceiling fans</td>
                    <td>—</td>
                    <td>
                      <span className="tag deep">Included</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Grout, edges, trim, window tracks</td>
                    <td>—</td>
                    <td>
                      <span className="tag deep">Included</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Behind / under furniture</td>
                    <td>—</td>
                    <td>
                      <span className="tag deep">Included</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Inside oven</td>
                    <td>—</td>
                    <td>
                      <span className="tag addon">Add-on</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Inside fridge</td>
                    <td>—</td>
                    <td>
                      <span className="tag addon">Add-on</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Interior windows (full)</td>
                    <td>—</td>
                    <td>
                      <span className="tag addon">Add-on</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Carpet shampoo</td>
                    <td>—</td>
                    <td>
                      <span className="tag addon">Add-on</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="callout">
              <b>The short answer to the client&apos;s question:</b> baseboards, wall wiping, and
              vents are part of a standard deep clean. Inside the oven and fridge are not — those
              are paid add-ons, even on a deep clean. List them as separate lines so the client sees
              exactly what they&apos;re paying for.
            </div>

            <h2 id="addons">Add-ons you should always charge separately</h2>
            <p>
              The fastest way to lose money is to quietly fold high-effort tasks into your base
              rate. Keep these as visible line items. It protects your base price and makes
              upselling feel natural instead of pushy.
            </p>
            <ul>
              <li>
                <strong>Inside oven</strong> — roughly $25–$50 (€25–€45). High effort, low
                frequency.
              </li>
              <li>
                <strong>Inside fridge</strong> — roughly $20–$40 (€20–€35).
              </li>
              <li>
                <strong>Interior windows</strong> — priced per window or per home, depending on
                count.
              </li>
              <li>
                <strong>Carpet shampoo</strong> — often around $0.18/sq ft or a flat per-room rate.
              </li>
              <li>
                <strong>Wall washing (full, not spot)</strong> — when walls need real scrubbing, not
                a wipe.
              </li>
            </ul>

            <h2 id="how-to-price">How to actually price a job: 3 methods</h2>
            <p>
              There&apos;s no single &quot;right&quot; number — but there are three reliable
              methods. Most experienced owners blend them rather than relying on one.
            </p>
            <h3>1. By room count (fastest)</h3>
            <p>
              Assign a rate per bedroom and per bathroom, then add a base for the kitchen and living
              areas. Simple and quick for quotes over the phone, but it ignores condition.
            </p>
            <h3>2. By square footage (standardized)</h3>
            <p>
              Typical rates run about $0.10–$0.17/sq ft for routine and $0.11–$0.30/sq ft for deep
              cleans. Good for consistency across homes, but a clean 1,500 sq ft home and a filthy
              one shouldn&apos;t cost the same.
            </p>
            <h3>3. By estimated labor hours (most accurate)</h3>
            <p>
              Estimate how long the job takes, multiply by your target hourly rate per cleaner, then
              add supplies and profit. This is the method that actually protects your margin — the
              other two are shortcuts that should land near this number.
            </p>

            <div className="callout">
              <b>Rule of thumb:</b> price deep cleans by the home&apos;s <i>condition</i>, not just
              its size. A neglected 1,100 sq ft home can take longer than a well-kept 2,000 sq ft
              one. And always charge more for first-time visits — they&apos;re slower, every time.
            </div>

            <h2 id="example">A real example: 3 bed / 2 bath, ~1,100 sq ft</h2>
            <p>
              Say a client wants a first-time deep clean with baseboards, wall wiping, and vents.
              Those are all standard deep-clean tasks, so they don&apos;t need to be add-ons. Across
              2026 US market data, a job like this typically lands in the <strong>$250–$320</strong>{" "}
              range, with published rates from real cleaning businesses for a comparable 3-bed home
              sitting right around <strong>$315 for roughly 3.5 hours</strong> of work.
            </p>
            <p>
              If the same client also wanted the inside of the oven and fridge done, you&apos;d add
              those as two separate lines (about $25–$50 and $20–$40) on top of the base — bringing
              the quote to roughly $300–$400 without ever discounting your core work.
            </p>

            <h2 id="mistakes">5 pricing mistakes new owners make</h2>
            <ul>
              <li>
                <strong>Racing to the bottom.</strong> Lowballing attracts price-sensitive clients
                who leave the moment someone cheaper appears. Compete on quality.
              </li>
              <li>
                <strong>Pricing the first clean like a recurring one.</strong> First-time and deep
                cleans should be 1.5–2× a routine visit.
              </li>
              <li>
                <strong>Burying add-ons.</strong> Folding oven/fridge/windows into the base rate
                silently destroys your hourly earnings.
              </li>
              <li>
                <strong>Quoting by size alone.</strong> Condition drives labor time more than square
                footage does.
              </li>
              <li>
                <strong>Never raising rates.</strong> Build a price review into your calendar — most
                early-stage owners go too long without one.
              </li>
            </ul>

            <footer className="foot">
              <div className="wrap" style={{ padding: 0 }}>
                Estimates are based on 2026 US and European market averages and are intended as a
                starting point for your own pricing. Local market, travel time, supplies, insurance,
                and your experience level should all factor into your final quote.
              </div>
            </footer>
          </article>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
