<?php

namespace Database\Seeders;

use App\Models\Marketing\BlogPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class MarketingBlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $posts = [
            // ----- FEATURED (Product Update) ----------------------------------
            [
                'title' => 'Introducing Alliances PRO Workspace v2',
                'category' => 'Product Update',
                'is_featured' => true,
                'cover' => '/blog/cover-workspace-v2.svg',
                'weeks_ago' => 0,
                'reading_minutes' => 7,
                'excerpt' => 'A faster pipeline view, redesigned lead drawer, and a new Activity timeline that finally makes "what happened with this account?" a one-glance answer.',
                'body' => <<<'MD'
Workspace v2 is the biggest single release we've shipped since launch. Three things changed and one thing — the price — pointedly did not.

![Workspace v2 dashboard preview](/blog/cover-workspace-v2.svg)

## Pipeline, redrawn

The new pipeline view holds twice as many cards in the same vertical space, supports bulk stage moves with shift-click, and finally remembers the filter you set yesterday. The old "where did my filter go" complaint is gone.

| Behavior | v1 | v2 |
|---|---|---|
| Cards visible per column (1080p) | 6 | 12 |
| Filters persist after reload | No | Yes |
| Bulk move via shift-click | No | Yes |
| Card density toggle | No | Compact / Comfy / Spacious |

## Lead drawer, rebuilt

Open any lead and the drawer now shows the AI summary, the next follow-up, and the last three touchpoints above the fold. Scrolling through history is opt-in, not the default.

## Activity timeline

Every email sent, call logged, deal stage moved, and note added rolls up into one timeline per account — and per organization. So "what happened with Acme last quarter?" is one click, not a five-tab investigation.

```text
Cards rendered per second (median, M2 MacBook Pro)
v1  ████████░░░░░░░░░░░░  240
v2  █████████████████░░░  520
```

No new SKU. No paid add-on. v2 ships to every workspace this week.
MD,
            ],

            // ----- CASE STUDIES ----------------------------------------------
            [
                'title' => 'How a 12-person agency cut their CRM bill 64% without losing pipeline',
                'category' => 'Case Study',
                'cover' => '/blog/cover-agency-bill.svg',
                'weeks_ago' => 1,
                'reading_minutes' => 6,
                'excerpt' => 'Northbeam Marketing was paying $1,840/month across HubSpot, Mailchimp, and a dialer. They consolidated to a flat $39/month and kept every workflow that mattered.',
                'body' => <<<'MD'
Northbeam is a paid-media agency in Austin running 40-ish active engagements at any time. Their old stack was the textbook "we grew into our tools" problem.

## The before bill

| Tool | Monthly | Notes |
|---|---:|---|
| HubSpot Pro | $1,200 | 8 paid seats |
| Mailchimp Standard | $135 | 50k contacts |
| Aircall (3 seats) | $180 | Sales-only dialer |
| Calendly Teams | $96 | 4 round-robin links |
| Zapier Pro | $229 | Glue between Mailchimp ↔ HubSpot |
| **Total** | **$1,840** | |

That's $1,840/month before they moved a single deal. The kicker: the Mailchimp ↔ HubSpot sync was broken half the time, and reps copied lead notes by hand into Slack.

![Stack cost before vs after](/blog/cover-agency-bill.svg)

## What they kept after migrating

Pipelines (3 of them — discovery, mid-funnel, retainer), email sequences, the dialer integration, automated follow-up reminders, and the team report their CFO wanted weekly.

## What they dropped

Two pipelines that nobody had touched in six months. The "lead scoring" model that scored every lead 6/10. A Zapier flow that sent Slack pings nobody read.

## Result after 90 days

| Metric | Before | After |
|---|---:|---:|
| Monthly CRM/email/dialer spend | $1,840 | $39 |
| Time to onboard a new rep | 2.5 days | 4 hours |
| Open rate (rolling 30-day avg) | 31% | 34% |
| Reps using the CRM daily | 6 of 8 | 8 of 8 |

The full migration ran one Saturday afternoon plus three days of clean-up.
MD,
            ],
            [
                'title' => 'Inside a B2B consultancy: from spreadsheets to a real pipeline in 14 days',
                'category' => 'Case Study',
                'cover' => '/blog/cover-spreadsheet-pipeline.svg',
                'weeks_ago' => 3,
                'reading_minutes' => 5,
                'excerpt' => 'Sterling Advisors managed 60 active clients in a single Google Sheet. Two weeks of structured migration later, every renewal date and follow-up is wired into the CRM.',
                'body' => <<<'MD'
Sterling Advisors had been "we should get a CRM" for 18 months. The blocker wasn't budget — it was the migration.

The old way: one Sheet per partner, one tab per client, follow-up dates in the cell color. The new partner who joined last quarter said the quiet part out loud: "I have no idea who's overdue."

![Spreadsheet to pipeline migration](/blog/cover-spreadsheet-pipeline.svg)

## The 14-day plan

| Days | Focus | Output |
|---|---|---|
| 1–3 | Schema mapping | Org → contacts → renewals model agreed |
| 4–7 | CSV imports | 220 organizations, 480 contacts, 60 renewals |
| 8–10 | Reminder rules | 14/7/1-day reminders before each renewal |
| 11–14 | Live shadow week | Three issues caught and fixed in-flight |

Days 1–3 mapped the existing tabs to records: one row per organization, multiple contacts per organization, every renewal as a deal in a "Renewal" pipeline.

Days 4–7 imported organizations and contacts via CSV. Two passes — the second cleaned phone-number formats.

Days 8–10 wired every renewal date into the deal record's `next_step_date`. Set up reminders 14, 7, and 1 days before.

Days 11–14 ran a full week of normal client work in the CRM. Three issues surfaced and got fixed live.

The partner who said "no idea who's overdue" said it again after week two — but this time as a joke. The dashboard answered it.
MD,
            ],
            [
                'title' => 'A solo coach running 80 active clients explains her pipeline',
                'category' => 'Case Study',
                'cover' => '/blog/cover-solo-coach.svg',
                'weeks_ago' => 5,
                'reading_minutes' => 4,
                'excerpt' => 'Mira coaches operations leaders 1:1. She has no team, no SDRs, no manager — and an 80-client active load. Here is exactly how she uses Alliances PRO.',
                'body' => <<<'MD'
Mira's setup is interesting because it's stripped to the studs. No automations. No fancy reporting. One pipeline. Three saved views.

![Solo coach client network](/blog/cover-solo-coach.svg)

## The pipeline

`Prospect → Discovery scheduled → Active → Paused → Wrapped`. That's it.

## The three saved views

| View | What it shows | When she opens it |
|---|---|---|
| Replies needed today | Last activity = "they replied", reply > 24h old | Every morning |
| Follow-up due this week | `next_step_date` within 7 days | Mondays |
| Quiet for 30 days | Active clients with no touch in a month | Fridays |

She lives in those three views. The pipeline itself she opens maybe twice a week, mostly to drag someone from Discovery to Active.

## Why it works

She's not optimizing for "scale." She's optimizing for "I never want a client to feel forgotten." The three views answer that question every morning before coffee.
MD,
            ],

            // ----- MARKETING TIPS --------------------------------------------
            [
                'title' => 'Pause-on-reply: the one cadence rule that fixes most "creepy CRM" complaints',
                'category' => 'Marketing Tips',
                'cover' => '/blog/cover-pause-on-reply.svg',
                'weeks_ago' => 0,
                'reading_minutes' => 4,
                'excerpt' => 'A "Day 3 follow-up" landing 24 hours after the prospect already replied is the single biggest tell that a sequence is on autopilot. Pause-on-reply is the one-line fix.',
                'body' => <<<'MD'
The complaint sounds like this: "Why is your tool sending me marketing emails after I already booked a call?"

The fix is mechanical, not magical:

1. In your sequence config, set **stop on inbound reply = true**.
2. Set the same flag for **stop on calendar booking**.
3. (Bonus) Set **stop on opportunity created**.

![Pause-on-reply flow](/blog/cover-pause-on-reply.svg)

## The flag matrix

| Trigger | Default | Recommended |
|---|---|---|
| Inbound reply | Off | **On** |
| Calendar booked | Off | **On** |
| Opportunity created | Off | **On** |
| Email opened | n/a | Leave off — opens are noisy |
| Link clicked | n/a | Leave off — clicks aren't intent |

You will still need a human to read the reply and either resume or kill the sequence. That's the right tradeoff. The wrong tradeoff is "let the cadence run and apologize later."

**A small extra rule.** If a lead replies and you resume the sequence, restart from step 1, not from where it left off. The original step 4 was written assuming three earlier touches that no longer match the new conversation.
MD,
            ],
            [
                'title' => 'The two-line cold email subject that stopped getting auto-archived',
                'category' => 'Marketing Tips',
                'cover' => '/blog/cover-cold-email-subject.svg',
                'weeks_ago' => 2,
                'reading_minutes' => 3,
                'excerpt' => 'A boring observation: prospects archive on subject line alone. Six weeks of A/B tests on 4,200 sends turned up one format that consistently beat everything.',
                'body' => <<<'MD'
We tested twelve subject-line formats across 4,200 cold sends to operations leaders at 50–500 person companies. Most variants were within noise of each other. One pulled away.

![Inbox with subject lines that worked](/blog/cover-cold-email-subject.svg)

## The format

`<Specific observation about their company> — <one-word ask>`

Examples that worked:

- *Saw your hiring page jumped from 14 to 28 roles — quick question*
- *Your Q3 case study mentions 6-week onboarding — coffee?*
- *Two of your AEs moved to Pendo last quarter — chat?*

## The numbers

| Subject format | Open rate | Reply rate |
|---|---:|---:|
| `{{first_name}}, quick question` | 19% | 0.4% |
| Generic value prop | 23% | 0.7% |
| One-word ask only ("Coffee?") | 28% | 1.1% |
| **Specific observation + one-word ask** | **41%** | **3.8%** |

## What didn't work

Anything with `{{first_name}}` in the subject. Anything with the word "quick" in the first three words. Anything that started with "I noticed."

Specificity earns one extra second of attention. The one-word ask reframes the email from "pitch" to "question," which lowers the perceived cost of replying.
MD,
            ],
            [
                'title' => 'Stop A/B testing send time. Test send-day instead.',
                'category' => 'Marketing Tips',
                'cover' => '/blog/cover-send-day.svg',
                'weeks_ago' => 4,
                'reading_minutes' => 4,
                'excerpt' => 'Send-time tests usually show 1–2% lifts inside the noise band. Send-day tests routinely show 15–20% deltas — and almost no marketing team runs them.',
                'body' => <<<'MD'
Most "best time to send" content is downstream of one Mailchimp blog post from 2014. The findings rarely replicate on B2B audiences.

**What does replicate.** Send-day deltas are real and they are large.

![Open rate by send-day](/blog/cover-send-day.svg)

## Last 6 months, B2B operations buyers, n = 38,400

| Day | Open rate | Reply rate |
|---|---:|---:|
| Monday | 32% | 1.6% |
| **Tuesday** | **38%** | **2.1%** |
| Wednesday | 36% | 1.9% |
| **Thursday** | **41%** | **2.4%** |
| Friday | 27% | 0.9% |
| Saturday | 19% | 0.3% |
| Sunday | 19% | 0.3% |

Friday and Sunday have a third the open rate of Tuesday. That's not a "tweak the send time" effect — that's a "do not send on Friday" effect.

## Recipe

Pick two send-days inside your audience's working week. Split your list 50/50. Run for four weeks. The winner is usually obvious by week two.
MD,
            ],

            // ----- PRODUCT UPDATES -------------------------------------------
            [
                'title' => 'Bulk stage moves are now shift-click in pipeline view',
                'category' => 'Product Update',
                'cover' => '/blog/cover-bulk-stage.svg',
                'weeks_ago' => 1,
                'reading_minutes' => 3,
                'excerpt' => 'Power-users have been asking for two years. Click the first deal, shift-click the last, drag the range to a new stage. That is it.',
                'body' => <<<'MD'
Small change, weirdly satisfying.

![Bulk shift-click stage moves](/blog/cover-bulk-stage.svg)

In any pipeline view, click a deal card to select it, then shift-click another card. Every card between them gets selected. Drag the selection to a different stage column and they all move together.

## What you can do in bulk

| Action | Supported | Triggers automations? |
|---|---|---|
| Move stage | ✅ | ❌ (intentional — see below) |
| Assign rep | ✅ | ❌ |
| Add tag | ✅ | ❌ |
| Archive | ✅ (with confirm) | ❌ |
| Delete | ❌ | n/a |

**One caveat.** Bulk moves don't trigger per-card automations. If you're moving 30 cards into "Closed Won" and you have a "send onboarding email" automation on that stage, the automation will not fire 30 times. It fires zero times. This is intentional — bulk moves are usually clean-up, not real stage changes — but a "fire automations" toggle is on the roadmap.
MD,
            ],
            [
                'title' => 'Two-way Gmail sync now exposes labels and stars',
                'category' => 'Product Update',
                'cover' => '/blog/cover-gmail-sync.svg',
                'weeks_ago' => 2,
                'reading_minutes' => 4,
                'excerpt' => 'Gmail labels were a pain point — reps wanted CRM activity to reflect what they had already filed in Gmail. v1.18 closes that loop in both directions.',
                'body' => <<<'MD'
The Gmail integration was one-way for the first year: emails synced into the lead record, but anything you did in Gmail after that (label, star, archive) didn't reflect back.

![Two-way Gmail sync](/blog/cover-gmail-sync.svg)

## What flows where now

| Action in Gmail | Effect in CRM |
|---|---|
| Apply a label | Email gains a matching tag |
| Star an email | Surfaces at top of lead's activity timeline |
| Remove label | Tag removed in CRM |
| Archive | **No-op** (we tested both ways) |
| Delete | **No-op** (intentional) |

The Gmail token scope didn't change. If your Gmail integration was already authorized, this just lights up after the next sync cycle.

We made the deliberate call to *not* mirror archive/delete from Gmail to the CRM. The complaints from the alpha cohort were unanimous: "where did my email go?" is a worse problem than "I have to archive twice."
MD,
            ],

            // (one Product Update post is the FEATURED entry above — total 3)

            // ----- CRM ANALYSIS ----------------------------------------------
            [
                'title' => 'Per-seat pricing is a tax on hiring. Here is the math.',
                'category' => 'CRM Analysis',
                'cover' => '/blog/cover-per-seat-tax.svg',
                'weeks_ago' => 0,
                'reading_minutes' => 6,
                'excerpt' => 'When your CRM bill grows linearly with hires, every new SDR costs the seat plus the CRM. Here is the curve, and where flat-rate stops being a gimmick.',
                'body' => <<<'MD'
The standard B2B CRM is priced per seat per month. That math is fine for a 10-person team. It's a different conversation at 40.

![Per-seat vs flat-rate cost curve](/blog/cover-per-seat-tax.svg)

## The list price reality

| Tool | List per seat | 10 reps | 50 reps | 100 reps |
|---|---:|---:|---:|---:|
| Salesforce Sales Cloud Pro | $165 | $1,650 | $8,250 | $16,500 |
| HubSpot Sales Pro | $100 | $1,000 | $5,000 | $10,000 |
| Pipedrive Pro | $49 | $490 | $2,450 | $4,900 |
| **Alliances PRO (flat)** | **n/a** | **$39** | **$39** | **$39** |

The CRM cost grows with headcount, not with revenue. Hiring a $70k SDR isn't a $70k decision — it's a $70k + $1,200/yr decision. Across a year of growth, the CRM tax compounds quietly into the kind of line item that gets a hard look at the next budget review.

## Where flat-rate breaks even

```text
Per-seat $100/mo vs flat $39/mo, monthly cost
1 rep   ░░░░░░░░░░  $100   vs  ███  $39
2 reps  ████░░░░░░  $200   vs  ███  $39
5 reps  █████████░  $500   vs  ███  $39
10 reps ████████████ $1,000 vs ███  $39
```

The break-even versus a $100/seat tool is at one seat. Versus a $25/seat tool, it's at two. The arithmetic is unflattering for per-seat pricing the moment you have more than two reps.

## The hidden second cost

Per-seat tools also gate features behind tiers. "We need lead scoring" upgrades the whole team. That's a multiplier on the multiplier.
MD,
            ],
            [
                'title' => 'What "AI in your CRM" actually means in 2026',
                'category' => 'CRM Analysis',
                'cover' => '/blog/cover-ai-in-crm.svg',
                'weeks_ago' => 2,
                'reading_minutes' => 5,
                'excerpt' => 'Every CRM ships an "AI" feature this year. Three patterns are real and useful. Two are demos that would not survive a quarterly review.',
                'body' => <<<'MD'
![AI summary and reply draft inside a CRM](/blog/cover-ai-in-crm.svg)

## Useful patterns

**1. Per-record summaries.** A two-sentence summary at the top of a lead, deal, or organization. Generated from the activity stream. Refreshed when activity changes. This is the single highest-utility AI feature in any modern CRM — it removes the "scroll through six months of email to prep for a call" tax.

**2. Draft replies.** Open the email composer, AI suggests a draft based on the conversation. Accept, edit, or ignore. Critically: it does not send for you.

**3. Silent enrichment.** New lead arrives, AI fills in industry, headcount, and a one-line description. No agent, no chat, no "Hi I'm your AI assistant" UI. Just data quietly populated.

## Demo-only patterns

**1. "AI agents that do your job."** They do not. They produce confident-sounding nonsense in low-stakes demos and embarrass you in high-stakes ones.

**2. AI lead scoring.** The model is a logistic regression in a wig. Real lead scoring needs ground-truth label data your CRM does not have.

## A useful filter

| Question | Pattern |
|---|---|
| Would it embarrass you if it ran without supervision? | Don't let it run without supervision. |
| Is the output a draft for a human to accept? | Probably useful. |
| Is the marketing word "agentic"? | Probably a demo. |

If the AI feature would be embarrassing if it ran without supervision, do not let it run without supervision.
MD,
            ],
            [
                'title' => 'Why "all-in-one CRM" usually means "five mediocre apps under one login"',
                'category' => 'CRM Analysis',
                'cover' => '/blog/cover-all-in-one.svg',
                'weeks_ago' => 6,
                'reading_minutes' => 5,
                'excerpt' => 'The "do everything" pitch hides a structural problem: the same engineering team cannot build the best pipeline view AND the best email composer AND the best dialer.',
                'body' => <<<'MD'
The "all-in-one CRM" category exists because consolidating your stack saves money and reduces context switching. Both real benefits.

![Five primitives, one login](/blog/cover-all-in-one.svg)

## The structural tradeoff

| Primitive | Best-in-class specialist | All-in-one rating |
|---|---|---|
| Email composer | Superhuman | Acceptable |
| Outbound dialer | Aircall, Dialpad | Acceptable |
| Reporting | Looker, Metabase | Acceptable |
| Marketing automation | Customer.io, Iterable | Acceptable |
| Calendar / scheduling | Calendly, Cal.com | Acceptable |

The team building the email composer is also building the pipeline view, the dialer, the reporting layer, the campaign editor, and the marketing automation engine. They will not all be the best in their category. The math doesn't work.

## What "all-in-one" actually buys you

Acceptable versions of every primitive. One bill. One login. One data model. No glue work between products.

## What it doesn't buy you

The best email composer. The best dialer. The best reporting.

## The honest tradeoff

Most service businesses don't need the *best* email composer. They need a competent one wired into the same record as the call log and the deal. The all-in-one wins on coupling, not on per-feature excellence.

The pitch worth being skeptical of is "we beat the specialist tools at their own game." Almost nobody does. The pitch worth taking seriously is "we are better than spreadsheets-plus-glue, at half the cost of buying five specialists."
MD,
            ],
        ];

        foreach ($posts as $i => $post) {
            $publishedAt = $now->copy()->subWeeks($post['weeks_ago'])->subDays($i);

            BlogPost::updateOrCreate(
                ['slug' => Str::slug($post['title'])],
                [
                    'title' => $post['title'],
                    'excerpt' => $post['excerpt'],
                    'body' => $post['body'],
                    'cover_image' => $post['cover'] ?? null,
                    'author_name' => 'Alliances PRO Team',
                    'category' => $post['category'],
                    'tags' => [],
                    'reading_minutes' => $post['reading_minutes'],
                    'is_published' => true,
                    'is_featured' => $post['is_featured'] ?? false,
                    'published_at' => $publishedAt,
                    'seo_title' => $post['title'].' — Alliances PRO',
                    'seo_description' => $post['excerpt'],
                ]
            );
        }
    }
}
