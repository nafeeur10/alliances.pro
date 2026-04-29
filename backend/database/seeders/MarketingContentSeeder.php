<?php

namespace Database\Seeders;

use App\Models\Marketing\Comparison;
use App\Models\Marketing\Faq;
use App\Models\Marketing\Feature;
use App\Models\Marketing\Industry;
use App\Models\Marketing\Page;
use App\Models\Marketing\PageSection;
use App\Models\Marketing\PricingPlan;
use App\Models\Marketing\SiteSetting;
use App\Models\Marketing\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class MarketingContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedHomepage();
        $this->seedFeatures();
        $this->seedIndustries();
        $this->seedPricingPlans();
        $this->seedFaqs();
        $this->seedSettings();
        $this->seedComparisons();
        $this->seedTestimonialPlaceholder();
    }

    protected function seedHomepage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Alliances PRO — The CRM Platform for Service Businesses',
                'meta_title' => 'Alliances PRO — The CRM Platform for Service Businesses',
                'meta_description' => 'One CRM, every vertical. Flat $19/mo for 10 users or $39/mo unlimited — never per-seat. 14-day free trial, no credit card. Sales CRM live, Education CRM in beta.',
                'og_image' => '/og/home.png',
                'is_published' => true,
                'published_at' => Carbon::now(),
            ],
        );

        $sections = [
            [
                'key' => 'hero',
                'type' => 'hero',
                'payload' => [
                    'eyebrow' => 'Multi-vertical CRM platform · Trusted by Shopify agencies, sales teams & freelancers',
                    'headline' => 'The CRM platform built for service businesses that grow sideways.',
                    'subheadline' => 'One login. One inbox. One bill. Sales CRM today, Education CRM tomorrow, more verticals as you scale. No bloated tooling, no surprise pricing.',
                    'primary_cta' => ['label' => 'Start 14-day free trial — no credit card', 'url' => 'https://app.alliances.pro/signup'],
                    'secondary_cta' => ['label' => 'Watch 2-min product tour', 'url' => '#tour'],
                    'trust_strip' => 'Used by 1,200+ teams across 30 countries',
                ],
            ],
            [
                'key' => 'sponsors',
                'type' => 'sponsors',
                'payload' => [
                    'headline' => 'Trusted by service teams who outgrew spreadsheets, not budgets.',
                    'logos' => ['Shopify Partners', 'Indie Hackers', 'Beta agencies'],
                ],
            ],
            [
                'key' => 'benefits',
                'type' => 'benefits',
                'payload' => [
                    'eyebrow' => 'Why Alliances PRO',
                    'headline' => 'Stop paying for five tools to manage one client.',
                    'items' => [
                        [
                            'headline' => "Sales today. Education tomorrow. Whatever's next, next.",
                            'body' => 'Most CRMs lock you into one industry shape. Alliances PRO is a platform — switch verticals from a workspace dropdown. Your data, your team, one bill.',
                            'icon' => 'layers',
                        ],
                        [
                            'headline' => 'Follow the customer past the deal close.',
                            'body' => "Capture leads, run pipelines, log calls, send campaigns, track project delivery — all in the same workspace. The handoff between sales and delivery isn't a tool switch.",
                            'icon' => 'workflow',
                        ],
                        [
                            'headline' => 'The price you see is the price you pay.',
                            'body' => 'No "starts at" sleight of hand. No per-seat surprises. No mandatory onboarding fees. $19/mo for up to 10 users. $39/mo for unlimited.',
                            'icon' => 'scale',
                        ],
                        [
                            'headline' => 'Vertical-aware data, not endless custom fields.',
                            'body' => 'Shopify-aware lead capture for agencies. Program + applicant tracking for education. Real fields for real workflows.',
                            'icon' => 'target',
                        ],
                    ],
                ],
            ],
            [
                'key' => 'features',
                'type' => 'features',
                'payload' => [
                    'eyebrow' => 'Everything in one workspace',
                    'headline' => "All the CRM you'll need. None of the add-ons you don't.",
                ],
            ],
            [
                'key' => 'services',
                'type' => 'services',
                'payload' => [
                    'headline' => 'A CRM tuned to your business — not the average of all businesses.',
                ],
            ],
            [
                'key' => 'trust',
                'type' => 'trust',
                'payload' => [
                    'headline' => 'Your data. Your team. Your control.',
                    'columns' => [
                        ['title' => 'Workspace isolation', 'body' => "Row-level data separation. Members in workspace A can't see workspace B — ever."],
                        ['title' => 'Granular roles', 'body' => 'Define exactly who sees what. Built on Spatie permissions, configurable per workspace.'],
                        ['title' => 'Yours to leave with', 'body' => "CSV export on every object. We don't hold your data hostage. Ever."],
                    ],
                ],
            ],
            [
                'key' => 'testimonial',
                'type' => 'testimonial',
                'payload' => [
                    'headline' => 'Operators trust us with their pipelines.',
                ],
            ],
            [
                'key' => 'team',
                'type' => 'team',
                'payload' => ['headline' => 'Built by operators, for operators.'],
            ],
            [
                'key' => 'pricing',
                'type' => 'pricing',
                'payload' => [
                    'eyebrow' => 'Honest pricing — flat per workspace, never per seat',
                    'headline' => 'Two plans. No surprises. Cancel anytime.',
                    'sub' => 'Every plan includes leads, deals, pipelines, tasks, calls, email campaigns, and multi-workspace. Start with a 14-day free trial — no credit card required. Annual billing = 2 months free.',
                    'enterprise_cta' => 'Need SSO, audit logs, dedicated support, or a custom SLA? Talk to us about Enterprise →',
                    'enterprise_email' => 'sales@alliances.pro',
                    'trust_microcopy' => [
                        'Cancel anytime, no questions',
                        'Export every record to CSV — your data is yours',
                        'No mandatory onboarding fee. Ever.',
                        'Free migration help on Business plan',
                    ],
                ],
            ],
            [
                'key' => 'community',
                'type' => 'community',
                'payload' => [
                    'headline' => 'Built today. Built bigger tomorrow.',
                    'cards' => [
                        [
                            'title' => 'Education CRM (Beta)',
                            'body' => 'Admissions, programs, applicants, enrollments, communications. Same Alliances PRO workspace, education-shaped data.',
                            'cta' => ['label' => 'Join the Education CRM waitlist', 'url' => '/industries/education'],
                        ],
                        [
                            'title' => 'Roadmap',
                            'body' => 'Real Estate, Healthcare, Legal verticals on the roadmap. Vote for what comes next.',
                            'cta' => ['label' => 'Vote on the roadmap', 'url' => '/roadmap'],
                        ],
                    ],
                ],
            ],
            [
                'key' => 'contact',
                'type' => 'contact',
                'payload' => [
                    'headline' => 'Talk to a real human.',
                    'channels' => [
                        ['label' => 'Sales', 'email' => 'sales@alliances.pro', 'sla' => 'Response within 4 business hours'],
                        ['label' => 'Support', 'email' => 'support@alliances.pro', 'sla' => 'Response within 24h (free) / 4h (Pro)'],
                        ['label' => 'Press', 'email' => 'press@alliances.pro', 'sla' => null],
                    ],
                ],
            ],
            [
                'key' => 'faq',
                'type' => 'faq',
                'payload' => ['headline' => 'Real questions, real answers.'],
            ],
            [
                'key' => 'newsletter',
                'type' => 'newsletter',
                'payload' => [
                    'headline' => 'Get the CRM playbook in your inbox.',
                    'sub' => 'Monthly: one practical playbook (pipelines, campaigns, agency ops), one product update, zero fluff.',
                ],
            ],
        ];

        foreach ($sections as $idx => $row) {
            PageSection::updateOrCreate(
                ['page_id' => $page->id, 'key' => $row['key']],
                [
                    'order' => $idx,
                    'type' => $row['type'],
                    'payload' => $row['payload'],
                    'is_visible' => true,
                ],
            );
        }
    }

    protected function seedFeatures(): void
    {
        $features = [
            ['name' => 'Lead management', 'icon' => 'inbox', 'tagline' => 'Capture from web, social, Shopify stores. Score, assign, follow up.'],
            ['name' => 'Deal pipeline', 'icon' => 'kanban-square', 'tagline' => 'Drag-and-drop Kanban with custom stages, probabilities, expected close.'],
            ['name' => 'Email campaigns', 'icon' => 'mail', 'tagline' => 'Templates, contact lists, send-tracking, bounce/open events — included.'],
            ['name' => 'Call logs', 'icon' => 'phone', 'tagline' => 'Log every call, link to leads or deals, attach recordings, see the timeline.'],
            ['name' => 'Tasks & projects', 'icon' => 'check-square', 'tagline' => 'Assign, prioritize, deadline. Bulk update. Personal + shared views.'],
            ['name' => 'Multi-workspace', 'icon' => 'layers', 'tagline' => 'Separate workspaces per brand, client, or vertical. Per-workspace SMTP.'],
        ];
        foreach ($features as $idx => $row) {
            $slug = str($row['name'])->slug()->toString();
            Feature::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $row['name'],
                    'tagline' => $row['tagline'],
                    'icon' => $row['icon'],
                    'order' => $idx,
                    'is_published' => true,
                    'seo_title' => "{$row['name']} — Alliances PRO",
                    'seo_description' => $row['tagline'],
                ],
            );
        }
    }

    protected function seedIndustries(): void
    {
        $industries = [
            [
                'slug' => 'shopify-agencies', 'name' => 'Shopify agencies', 'icon' => 'shopping-bag',
                'headline' => 'For Shopify agencies',
                'subheadline' => 'Shopify-aware lead capture, agency project tracking, agency-friendly pricing.',
                'body' => "Shopify-aware lead capture (store URL, GMV bracket, app stack). Track retainer + project revenue side-by-side. Built by founders who've actually run Shopify agencies.",
                'is_published' => true,
            ],
            [
                'slug' => 'sales-teams', 'name' => 'SMB sales teams', 'icon' => 'briefcase',
                'headline' => 'For SMB sales teams',
                'subheadline' => "The pipeline you'd build in Pipedrive, the campaigns you'd build in Mailchimp, all in one workspace.",
                'body' => "The pipeline you'd build in Pipedrive, the campaigns you'd build in Mailchimp, the calls you'd log in Close — all in one workspace, one bill.",
                'is_published' => true,
            ],
            [
                'slug' => 'freelancers', 'name' => 'Freelancers & solopreneurs', 'icon' => 'user',
                'headline' => 'For freelancers & solo operators',
                'subheadline' => '$19/mo for everything you need. Same tool keeps working when you hire.',
                'body' => '$19/mo for everything you need to run a one-person shop — leads, deals, calls, email, projects. Same tool keeps working when you hire your first three teammates (Pro includes 10 users).',
                'is_published' => true,
            ],
            [
                'slug' => 'education', 'name' => 'Education CRM', 'icon' => 'graduation-cap',
                'headline' => 'Education CRM (Beta)',
                'subheadline' => 'Admissions, programs, applicants, enrollments — coming soon.',
                'body' => 'Same Alliances PRO platform, education-shaped data. Programs, applicants, enrollments, and admissions workflows. Currently in private beta — join the waitlist.',
                'is_published' => false,
            ],
        ];
        foreach ($industries as $idx => $row) {
            Industry::updateOrCreate(
                ['slug' => $row['slug']],
                array_merge($row, [
                    'order' => $idx,
                    'seo_title' => "{$row['name']} — Alliances PRO",
                    'seo_description' => $row['subheadline'],
                ]),
            );
        }
    }

    protected function seedPricingPlans(): void
    {
        PricingPlan::updateOrCreate(
            ['slug' => 'pro'],
            [
                'name' => 'Pro',
                'monthly_price_cents' => 1900,
                'yearly_price_cents' => 19000,
                'currency' => 'USD',
                'description' => 'Growing teams up to 10 people. 14-day free trial — no credit card required.',
                'cta_label' => 'Start 14-day trial',
                'cta_url' => 'https://app.alliances.pro/signup?plan=pro',
                'is_featured' => false,
                'is_published' => true,
                'order' => 1,
                'features' => [
                    'Up to 10 team members',
                    'Up to 10 projects',
                    'Up to 500 organizations / clients',
                    'Up to 1,000 leads',
                    'Unlimited tasks',
                    'Deal pipelines (Kanban)',
                    'Email campaigns + lists',
                    'Call logs + recordings',
                    'Multi-workspace',
                    'Per-workspace SMTP',
                    'Custom roles & permissions',
                ],
                'limits' => [
                    'team_members' => 10,
                    'projects' => 10,
                    'organizations' => 500,
                    'leads' => 1000,
                    'tasks' => 'unlimited',
                ],
                'comparison_note' => '$19/mo flat for 10 users. Pipedrive Essential for 10 users would be $140/mo.',
                'external_signup_url' => 'https://app.alliances.pro/signup?plan=pro',
            ],
        );

        PricingPlan::updateOrCreate(
            ['slug' => 'business'],
            [
                'name' => 'Business',
                'monthly_price_cents' => 3900,
                'yearly_price_cents' => 39000,
                'currency' => 'USD',
                'description' => 'Established teams that want zero limits. 14-day free trial — no credit card required.',
                'cta_label' => 'Start 14-day trial',
                'cta_url' => 'https://app.alliances.pro/signup?plan=business',
                'is_featured' => true,
                'is_published' => true,
                'order' => 2,
                'features' => [
                    'Unlimited team members',
                    'Unlimited projects',
                    'Unlimited organizations',
                    'Unlimited leads',
                    'Unlimited tasks',
                    'Deal pipelines (Kanban)',
                    'Email campaigns + lists',
                    'Call logs + recordings',
                    'Multi-workspace',
                    'Per-workspace SMTP',
                    'Custom roles & permissions',
                    'API access',
                    'Priority support',
                ],
                'limits' => [
                    'team_members' => 'unlimited',
                    'projects' => 'unlimited',
                    'organizations' => 'unlimited',
                    'leads' => 'unlimited',
                    'tasks' => 'unlimited',
                ],
                'comparison_note' => '$39/mo for unlimited team. HubSpot Sales Pro for 10 users would be $1,000/mo.',
                'external_signup_url' => 'https://app.alliances.pro/signup?plan=business',
            ],
        );
    }

    protected function seedFaqs(): void
    {
        $faqs = [
            ['Is there a free trial?', 'Yes — 14 days, no credit card required. Use Pro or Business in full during the trial.', 'Trial'],
            ['What happens after the trial?', "You pick Pro (\$19/mo) or Business (\$39/mo). If you don't pick, your account pauses (data preserved) until you choose. We never auto-charge a card you didn't give us.", 'Trial'],
            ['Do you charge per user?', '**No.** Pro is $19/mo flat for up to 10 users. Business is $39/mo for unlimited users. The price you see is the price you pay — no surprise per-seat math.', 'Pricing'],
            ['How does pricing compare to HubSpot or Pipedrive?', 'For a 10-person team, Business at $39/mo replaces Pipedrive Essential ($140/mo), HubSpot Sales Starter (~$200/mo), or HubSpot Sales Pro (~$1,000/mo). Full breakdown at /compare/hubspot.', 'Pricing'],
            ['Can I import data from HubSpot / Pipedrive / Zoho?', 'Yes — CSV import on every object. Free guided migration included with the Business plan; available as a one-time service ($199) on Pro.', 'Migration'],
            ["What's the difference between Alliances PRO Sales and Education?", 'Same platform, different vertical-shaped data. Sales focuses on leads/deals/pipelines. Education adds programs, applicants, enrollments, and admissions workflows. Education CRM is currently in private beta — join the waitlist.', 'Product'],
            ['Can I run multiple workspaces under one account?', 'Yes — both Pro and Business include multi-workspace. Switch instantly from a dropdown. Use it to separate brands, clients, or future verticals.', 'Product'],
            ['What happens to my data if I cancel?', 'Export everything to CSV any time, no questions. We retain your data for 30 days post-cancellation in case you come back.', 'Data'],
            ['Where is my data stored?', 'Encrypted at rest (MySQL) and in transit (TLS 1.3), backed up daily, hosted on DigitalOcean. Detailed answer at /security.', 'Security'],
            ['Do you offer discounts for non-profits or education?', 'Yes — 50% off any tier for verified non-profits and educational institutions. Email sales@alliances.pro.', 'Pricing'],
        ];
        foreach ($faqs as $idx => [$q, $a, $cat]) {
            Faq::updateOrCreate(
                ['question' => $q],
                ['answer' => $a, 'category' => $cat, 'order' => $idx, 'is_published' => true],
            );
        }
    }

    protected function seedSettings(): void
    {
        $settings = [
            ['site_name', 'Alliances PRO', 'general', 'text'],
            ['site_tagline', 'The CRM platform built for service businesses that grow sideways.', 'general', 'text'],
            ['support_email', 'support@alliances.pro', 'contact', 'text'],
            ['sales_email', 'sales@alliances.pro', 'contact', 'text'],
            ['press_email', 'press@alliances.pro', 'contact', 'text'],
            ['twitter_url', 'https://twitter.com/alliancespro', 'social', 'url'],
            ['linkedin_url', 'https://linkedin.com/company/alliancespro', 'social', 'url'],
            ['github_url', 'https://github.com/alliancespro', 'social', 'url'],
            ['youtube_url', 'https://youtube.com/@alliancespro', 'social', 'url'],
            ['footer_copyright', '© Alliances PRO ' . date('Y') . '. All rights reserved.', 'footer', 'text'],
            ['address', 'Alliances PRO Inc.', 'footer', 'text'],
        ];
        foreach ($settings as [$key, $value, $group, $type]) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => $group, 'type' => $type],
            );
        }
    }

    protected function seedComparisons(): void
    {
        $comparisons = [
            ['hubspot', 'HubSpot', 'Why Alliances PRO beats HubSpot at SMB scale.'],
            ['pipedrive', 'Pipedrive', 'Same pipeline UX. Built-in marketing & calling. No per-seat math.'],
            ['zoho-crm', 'Zoho CRM', 'Modern UX, transparent pricing, multi-vertical platform.'],
            ['salesforce', 'Salesforce', 'For service businesses that need a CRM, not a 6-month implementation.'],
            ['close', 'Close', 'Sales-ops power without the $49/seat math.'],
            ['monday-crm', 'Monday CRM', 'Real CRM features, not work-management dressed as a CRM.'],
        ];
        foreach ($comparisons as [$slug, $name, $headline]) {
            Comparison::updateOrCreate(
                ['slug' => $slug],
                [
                    'competitor_name' => $name,
                    'headline' => $headline,
                    'is_published' => false,
                    'seo_title' => "Alliances PRO vs {$name}",
                    'seo_description' => $headline,
                ],
            );
        }
    }

    protected function seedTestimonialPlaceholder(): void
    {
        Testimonial::updateOrCreate(
            ['author_name' => 'Migration Customer'],
            [
                'quote' => "We migrated from HubSpot Pro and cut our SaaS bill from \$2,400/mo to \$39/mo — without losing a single workflow. Alliances PRO's pipeline is what HubSpot's *should* be.",
                'author_role' => 'Founder',
                'author_company' => 'Agency',
                'rating' => 5,
                'industry_tag' => 'shopify-agencies',
                'is_published' => false,
                'order' => 0,
            ],
        );
    }
}
