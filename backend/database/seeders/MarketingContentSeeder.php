<?php

namespace Database\Seeders;

use App\Models\Marketing\BlogPost;
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
        $this->seedBlogPosts();
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
                    'eyebrow' => 'New · Client Management Reinvented',
                    'headline' => 'The CRM platform built for service businesses that grow sideways.',
                    'subheadline' => 'One login. One inbox. One bill. Sales CRM today, Education CRM tomorrow, more verticals as you scale. No bloated tooling, no surprise pricing.',
                    'image_url' => '/hero.png',
                    'primary_cta' => ['label' => 'Start Free Trial', 'url' => 'https://app.alliances.pro/signup'],
                    'secondary_cta' => ['label' => 'Book a Demo', 'url' => '/contact?intent=demo'],
                    'trust_checks' => [
                        ['label' => 'No credit card'],
                        ['label' => '14-day trial'],
                        ['label' => 'Cancel anytime'],
                    ],
                ],
            ],
            [
                'key' => 'sponsors',
                'type' => 'sponsors',
                'payload' => [
                    'headline' => 'Trusted by service teams who outgrew spreadsheets, not budgets.',
                    'logos' => [
                        ['name' => 'Amazon', 'icon' => 'Crown', 'image_url' => null],
                        ['name' => 'Linkedin', 'icon' => 'Vegan', 'image_url' => null],
                        ['name' => 'Google', 'icon' => 'Ghost', 'image_url' => null],
                        ['name' => 'Apple', 'icon' => 'Puzzle', 'image_url' => null],
                        ['name' => 'Android', 'icon' => 'Squirrel', 'image_url' => null],
                        ['name' => 'Acmee', 'icon' => 'Cookie', 'image_url' => null],
                        ['name' => 'Shadcn', 'icon' => 'Drama', 'image_url' => null],
                    ],
                ],
            ],
            [
                'key' => 'benefits',
                'type' => 'benefits',
                'payload' => [
                    'eyebrow' => 'Benefits',
                    'headline' => 'Why Choose Alliances PRO?',
                    'description' => 'Everything you need to streamline client relationships and grow your service business. Our platform helps you manage clients effortlessly, automate repetitive tasks, and deliver exceptional service every time.',
                    'items' => [
                        [
                            'headline' => 'Centralized Client Management',
                            'body' => 'Keep all client information, communication history, and project details in one unified platform for easy access and management.',
                            'icon' => 'Users',
                        ],
                        [
                            'headline' => 'Automated Workflows',
                            'body' => 'Streamline repetitive tasks with intelligent automation. From follow-ups to invoicing, let Alliances PRO handle the routine work.',
                            'icon' => 'Workflow',
                        ],
                        [
                            'headline' => 'Smart Scheduling & Appointments',
                            'body' => 'Effortlessly manage appointments, bookings, and service schedules with integrated calendar tools and automated reminders.',
                            'icon' => 'CalendarClock',
                        ],
                        [
                            'headline' => 'Performance Analytics',
                            'body' => 'Track business metrics, client satisfaction, revenue trends, and service performance with comprehensive real-time dashboards.',
                            'icon' => 'ChartLine',
                        ],
                    ],
                ],
            ],
            [
                'key' => 'features',
                'type' => 'features',
                'payload' => [
                    'eyebrow' => 'Features',
                    'headline' => 'Everything You Need to Succeed',
                    'sub' => 'Our comprehensive CRM platform provides all the tools you need to manage clients, streamline operations, and grow your service business.',
                ],
            ],
            [
                'key' => 'services',
                'type' => 'services',
                'payload' => [
                    'eyebrow' => 'Services',
                    'headline' => 'Comprehensive Service Solutions',
                    'sub' => 'From client onboarding to advanced analytics, we provide everything you need to deliver exceptional service and scale your business.',
                    'items' => [
                        ['title' => 'Client Onboarding', 'description' => 'Streamlined onboarding workflows to get new clients set up quickly with automated welcome emails and document collection.', 'pro' => false],
                        ['title' => 'Service Delivery Management', 'description' => 'Track service delivery milestones, manage deliverables, and ensure consistent quality across all client projects.', 'pro' => false],
                        ['title' => 'Custom Reporting', 'description' => 'Generate detailed reports on client activity, revenue, service performance, and team productivity.', 'pro' => false],
                        ['title' => 'API Access', 'description' => 'Connect your CRM to bespoke tools and internal dashboards via our REST API.', 'pro' => true],
                    ],
                ],
            ],
            [
                'key' => 'trust',
                'type' => 'trust',
                'payload' => [
                    'eyebrow' => 'Why Trust Us',
                    'headline' => 'Built Different. Built to Last.',
                    'sub' => 'Most CRMs look great in demos. Alliances PRO is engineered to hold up in production — with the security, reliability, and architecture your business actually needs.',
                    'items' => [
                        ['icon' => 'ShieldCheck', 'badge' => 'Workspace isolation', 'problem' => 'Shared tenant, leaky data', 'solution' => "Row-level data separation. Members in workspace A can't see workspace B — ever."],
                        ['icon' => 'KeyRound', 'badge' => 'Granular roles', 'problem' => 'Admin or nothing', 'solution' => 'Define exactly who sees what. Built on Spatie permissions, configurable per workspace.'],
                        ['icon' => 'Download', 'badge' => 'Yours to leave with', 'problem' => 'Data lock-in', 'solution' => "CSV export on every object. We don't hold your data hostage. Ever."],
                    ],
                ],
            ],
            [
                'key' => 'testimonial',
                'type' => 'testimonial',
                'payload' => [
                    'eyebrow' => 'Testimonials',
                    'headline' => 'Loved by Teams Worldwide',
                    'sub' => "Don't just take our word for it. See what our customers have to say about their experience.",
                ],
            ],
            [
                'key' => 'team',
                'type' => 'team',
                'payload' => [
                    'eyebrow' => 'Team',
                    'headline' => 'The Company Dream Team',
                    'sub' => 'Built by operators, for operators.',
                    'members' => [],
                ],
            ],
            [
                'key' => 'pricing',
                'type' => 'pricing',
                'payload' => [
                    'eyebrow' => 'Pricing',
                    'headline' => 'Simple pricing that scales with your pipeline.',
                    'sub' => 'Start with a 14-day free trial — no credit card required. Switch or cancel anytime.',
                    'compare_eyebrow' => 'Compare plans',
                    'compare_title' => 'All the details, side by side.',
                    'faq_eyebrow' => 'FAQ',
                    'faq_title' => 'Questions, answered.',
                    'compare_rows' => [
                        ['feature' => 'Contacts & Call Logs', 'values' => [
                            ['plan' => 'Pro', 'value' => 'yes'],
                            ['plan' => 'Business', 'value' => 'yes'],
                        ]],
                        ['feature' => 'Email automation', 'values' => [
                            ['plan' => 'Pro', 'value' => 'no'],
                            ['plan' => 'Business', 'value' => 'yes'],
                        ]],
                        ['feature' => 'Follow-up automation', 'values' => [
                            ['plan' => 'Pro', 'value' => 'no'],
                            ['plan' => 'Business', 'value' => 'yes'],
                        ]],
                        ['feature' => 'Support', 'values' => [
                            ['plan' => 'Pro', 'value' => 'Email'],
                            ['plan' => 'Business', 'value' => 'Priority (12h) + WhatsApp'],
                        ]],
                        ['feature' => 'Free trial', 'values' => [
                            ['plan' => 'Pro', 'value' => '14 days'],
                            ['plan' => 'Business', 'value' => '14 days'],
                        ]],
                    ],
                ],
            ],
            [
                'key' => 'community',
                'type' => 'community',
                'payload' => [
                    'headline_lead' => 'Ready to join this',
                    'headline_highlight' => 'Community?',
                    'body' => 'Join our vibrant Discord community! Connect, share, and grow with like-minded enthusiasts.',
                    'cta' => ['label' => 'Click to dive in!', 'url' => 'https://discord.com/'],
                ],
            ],
            [
                'key' => 'contact',
                'type' => 'contact',
                'payload' => [
                    'eyebrow' => 'Contact',
                    'headline' => 'Get Connect With Us',
                    'sub' => "Stay in touch with us for updates, support, and valuable insights. We're here to help you every step of the way!",
                    'location' => '123 Maple Lane, Springfield, IL 62704',
                    'phone' => '+1 (555) 987-6543',
                    'email' => 'contact@alliances.pro',
                    'hours' => 'Monday to Friday, 9 AM - 5 PM',
                ],
            ],
            [
                'key' => 'faq',
                'type' => 'faq',
                'payload' => [
                    'eyebrow' => 'FAQS',
                    'headline' => 'Common Questions',
                    'sub' => 'Real questions, real answers.',
                ],
            ],
            [
                'key' => 'newsletter',
                'type' => 'newsletter',
                'payload' => [
                    'title_lead' => 'Get the CRM playbook in your',
                    'title_highlight' => 'inbox.',
                    'sub' => 'Monthly: one practical playbook (pipelines, campaigns, agency ops), one product update, zero fluff.',
                    'placeholder' => 'you@example.com',
                    'cta_label' => 'Subscribe',
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
                // Published so the page renders the "coming soon" waitlist variant.
                'is_published' => true,
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
                'description' => 'For solo operators and small teams getting organized.',
                'cta_label' => 'Start Pro trial',
                'cta_url' => 'https://app.alliances.pro/signup?plan=pro',
                'is_featured' => false,
                'is_published' => true,
                'order' => 1,
                'features' => [
                    'Track up to 1,000 leads',
                    '10 projects, 500 organizations',
                    'Up to 10 team members',
                    'Contacts & call logs included',
                    'Email support',
                    '14-day free trial',
                ],
                'limits' => [
                    'leads' => 1000,
                    'tasks' => 'unlimited',
                    'projects' => 10,
                    'organizations' => 500,
                    'team_members' => 10,
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
                'description' => 'For growing teams that need automation and unlimited scale.',
                'cta_label' => 'Start Business trial',
                'cta_url' => 'https://app.alliances.pro/signup?plan=business',
                'is_featured' => true,
                'is_published' => true,
                'order' => 2,
                'features' => [
                    'Unlimited leads, deals, orgs',
                    'Unlimited projects & members',
                    'Email automation',
                    'Automated follow-up sequences',
                    'Priority support (12h) + WhatsApp',
                    'Everything in Pro',
                ],
                'limits' => [
                    'leads' => 'unlimited',
                    'tasks' => 'unlimited',
                    'projects' => 'unlimited',
                    'organizations' => 'unlimited',
                    'team_members' => 'unlimited',
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
        $navLinks = json_encode([
            ['href' => '/pricing', 'label' => 'Pricing'],
            ['href' => '/about', 'label' => 'About Us'],
            ['href' => '#contact', 'label' => 'Contact Us'],
        ], JSON_UNESCAPED_SLASHES);

        $navResources = json_encode([
            [
                'label' => 'Get help',
                'items' => [
                    ['title' => 'Help Center', 'icon' => 'LifeBuoy', 'description' => 'Browse guides, FAQs and how-tos.', 'href' => '/help'],
                    ['title' => 'Docs', 'icon' => 'BookOpen', 'description' => 'Developer & integration documentation.', 'href' => '/docs'],
                    ['title' => 'Changelog', 'icon' => 'GitCommitHorizontal', 'description' => "What we've shipped, version by version.", 'href' => '/changelog'],
                ],
            ],
            [
                'label' => 'Stay updated',
                'items' => [
                    ['title' => 'Announcements', 'icon' => 'Megaphone', 'description' => 'Product news and important updates.', 'href' => '/announcements'],
                    ['title' => 'Blog', 'icon' => 'Newspaper', 'description' => 'Playbooks, deep dives and field notes.', 'href' => '/blog'],
                    ['title' => 'Career', 'icon' => 'Briefcase', 'description' => 'Open roles at Alliances PRO.', 'href' => '/careers'],
                ],
            ],
        ], JSON_UNESCAPED_SLASHES);

        $settings = [
            ['site_name', 'Alliances PRO', 'general', 'text'],
            ['site_tagline', 'The CRM platform built for service businesses that grow sideways.', 'general', 'text'],

            // Brand / logo
            ['logo_text', 'Alliances PRO', 'brand', 'text'],
            ['logo_icon', 'SunDim', 'brand', 'text'],
            ['logo_image_url', '', 'brand', 'image'],

            // Navigation
            ['nav_links', $navLinks, 'nav', 'json'],
            ['nav_resources', $navResources, 'nav', 'json'],

            // Header CTAs
            ['cta_login_label', 'Log in', 'cta', 'text'],
            ['cta_login_url', 'https://app.alliances.pro/login', 'cta', 'url'],
            ['cta_signup_label', 'Get Started', 'cta', 'text'],
            ['cta_signup_url', 'https://app.alliances.pro/signup', 'cta', 'url'],

            // Contact
            ['support_email', 'support@alliances.pro', 'contact', 'text'],
            ['sales_email', 'sales@alliances.pro', 'contact', 'text'],
            ['press_email', 'press@alliances.pro', 'contact', 'text'],

            // Social
            ['twitter_url', 'https://twitter.com/alliancespro', 'social', 'url'],
            ['linkedin_url', 'https://linkedin.com/company/alliancespro', 'social', 'url'],
            ['github_url', 'https://github.com/alliancespro', 'social', 'url'],
            ['youtube_url', 'https://youtube.com/@alliancespro', 'social', 'url'],

            // Footer
            ['footer_copyright', '© Alliances PRO ' . date('Y') . '. All rights reserved.', 'footer', 'text'],
            ['address', 'Alliances PRO Inc.', 'footer', 'text'],
            [
                'footer_blurb',
                'Meet our AI-powered CRM solution to lighten your workload, increase efficiency and make more accurate decisions.',
                'footer',
                'longtext',
            ],
            [
                'footer_columns',
                json_encode([
                    [
                        'heading' => 'Product',
                        'links' => [
                            ['label' => 'Features', 'url' => '#features'],
                            ['label' => 'Pricing', 'url' => '#pricing'],
                            ['label' => 'FAQ', 'url' => '#faq'],
                        ],
                    ],
                    [
                        'heading' => 'Company',
                        'links' => [
                            ['label' => 'Team', 'url' => '#team'],
                            ['label' => 'Contact', 'url' => '#contact'],
                            ['label' => 'Blog', 'url' => '/blog'],
                        ],
                    ],
                    [
                        'heading' => 'Legal',
                        'links' => [
                            ['label' => 'Privacy', 'url' => '/privacy'],
                            ['label' => 'Terms', 'url' => '/terms'],
                        ],
                    ],
                    [
                        'heading' => 'Resources',
                        'links' => [
                            ['label' => 'Docs', 'url' => '/docs'],
                            ['label' => 'Changelog', 'url' => '/changelog'],
                        ],
                    ],
                ], JSON_UNESCAPED_SLASHES),
                'footer',
                'json',
            ],
            ['facebook_url', 'https://facebook.com/alliancespro', 'social', 'url'],
            ['dribbble_url', 'https://dribbble.com/alliancespro', 'social', 'url'],
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
                    // Published so /compare/{slug} routes render. Admins fill in the
                    // body + winner_summary + comparison_table over time.
                    'is_published' => true,
                    'winner_summary' => "Alliances PRO costs less, runs flat per-workspace, and bundles email + calls + projects in one tool. Pick {$name} only if a specific {$name} workflow is already irreplaceable for your team.",
                    'comparison_table' => [
                        ['feature' => 'Pricing model', 'alliances_value' => 'Flat per workspace', 'competitor_value' => 'Per seat'],
                        ['feature' => 'Bill for 10 users', 'alliances_value' => '$39/mo', 'competitor_value' => 'Varies — typically $140–$1,000+/mo'],
                        ['feature' => 'Email campaigns included', 'alliances_value' => 'yes', 'competitor_value' => 'Add-on'],
                        ['feature' => 'Call logs included', 'alliances_value' => 'yes', 'competitor_value' => 'Add-on'],
                        ['feature' => 'Multi-vertical platform', 'alliances_value' => 'yes', 'competitor_value' => 'no'],
                        ['feature' => '14-day trial, no card', 'alliances_value' => 'yes', 'competitor_value' => 'Varies'],
                        ['feature' => 'CSV export everywhere', 'alliances_value' => 'yes', 'competitor_value' => 'Varies'],
                    ],
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

    protected function seedBlogPosts(): void
    {
        $posts = [
            [
                'slug' => 'how-to-choose-a-crm-for-a-small-agency',
                'title' => 'How to choose a CRM for a small agency',
                'category' => 'Playbooks',
                'tags' => ['crm', 'agencies', 'shopify'],
                'reading_minutes' => 7,
                'excerpt' => 'A practical 5-step framework for picking a CRM as a 2–30 person agency, without paying for HubSpot at agency scale.',
                'body' => <<<'MD'
# How to choose a CRM for a small agency

Most CRMs were built for two-person sales teams at venture-backed startups, not
small agencies juggling retainers, projects, and client inboxes. Here's a
framework we use with our own customers.

## 1. Map your client journey first, tool second

Before evaluating any CRM, write down the *actual* path a lead takes from
"first inquiry" to "renewed retainer." Most agencies skip this and end up
buying tools that solve the wrong problem.

Typical agency flow:

- Lead capture (web form, referral, Shopify Partners directory)
- Qualifying call
- Proposal + negotiation
- Project kickoff
- Delivery + retainer
- Upsell / cross-sell

Your CRM has to handle every step, or you'll bolt on three more tools.

## 2. Watch out for "starts at" pricing

If the marketing page says **"starts at $X/mo"**, assume you'll pay 5×–10× that
within 18 months. HubSpot's price ladder is the most aggressive in the
industry: their "free" tier limits send-volume and contact-list size, then
once you hit those limits the cheapest paid tier *quintuples* the bill.

> **Rule of thumb:** if pricing is per-seat and you have 10+ teammates, the
> CRM will eventually be your second-largest SaaS spend after payroll software.

## 3. Insist on flat per-workspace pricing

The single fastest way to keep your CRM bill predictable is to pick one with
flat pricing. **Alliances PRO Pro is $19/mo for up to 10 users. Business is
$39/mo for unlimited users.** That's it. The price you see is the price you
pay.

## 4. Look for industry-specific data shapes

Generic CRMs treat every record as "a contact" or "a deal." That's fine until
you realize your agency lives and dies on Shopify-specific signals (store URL,
GMV bracket, app stack, theme vendor). If your CRM doesn't have those fields
out of the box, you'll re-invent them as custom fields — and lose them every
time you migrate.

## 5. Run a real 14-day trial

Don't trust the demo. Run an actual lead through the full pipeline. Send a
campaign. Log a call. Track a project. If anything feels like work that
shouldn't be work, that's the CRM telling you it doesn't fit your shape.

---

If you're a Shopify agency, [see our agency-specific
workflow](/industries/shopify-agencies). If you've outgrown HubSpot, the
[HubSpot comparison](/compare/hubspot) might be useful.
MD,
                'author_name' => 'Alliances PRO Team',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(14),
                'seo_title' => 'How to choose a CRM for a small agency (5-step framework)',
                'seo_description' => 'A practical 5-step framework for picking a CRM as a 2–30 person agency, without paying for HubSpot at agency scale.',
            ],
            [
                'slug' => 'crm-vs-project-management-tool',
                'title' => 'CRM vs project management tool — what each is for',
                'category' => 'Playbooks',
                'tags' => ['crm', 'project-management', 'tools'],
                'reading_minutes' => 5,
                'excerpt' => 'Two of the most-confused tool categories in service businesses. Here\'s how to think about the line between them.',
                'body' => <<<'MD'
# CRM vs project management tool — what each is for

A CRM and a project management tool look like they overlap. They don't, and
mixing them up is one of the most expensive mistakes service businesses
make. Here's the line.

## CRM: anything pre-contract

A CRM owns everything that happens **before** a contract is signed:

- Lead capture
- Qualification
- Proposal + pricing negotiation
- Pipeline tracking
- Sales forecasting
- Email campaigns to prospects

Its job is to answer the question: *"Who might give us money soon, and what
should we do next?"*

## Project management tool: anything post-contract

A project management tool owns everything **after** a contract is signed:

- Task assignment
- Sprints / phases / milestones
- Resource allocation
- Time tracking
- Delivery hand-off
- QA and approval cycles

Its job is to answer: *"What does the team need to do this week, and is it on
track?"*

## Where the line blurs

The grey zone is **delivery handoff** — the moment a deal closes. Most teams
fumble it because:

1. The salesperson knows the client's expectations, but those notes live in
   the CRM.
2. The delivery team is in the project management tool, blind to the deal
   notes.
3. The client experience suffers.

The cleanest fix: **one tool that does both, with a clear deal-→-project link
when a deal closes.** Alliances PRO does this — every won deal can spawn a
project automatically, carrying the notes and contacts forward.

## When you should run two tools

If your team is large enough that the salespeople and delivery team are fully
separate functions, two tools is fine. The hand-off needs to be tight (a
shared CRM record, an automated trigger) but the surfaces can be split.

If you're under 50 people, one tool is almost always the right answer.

---

Curious what fields a unified CRM + delivery tool actually looks like?
[See the features tour](/#features).
MD,
                'author_name' => 'Alliances PRO Team',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(7),
                'seo_title' => 'CRM vs project management tool — when to pick which',
                'seo_description' => 'A CRM and a project management tool look similar but solve different problems. Here\'s the line, and when to run one tool vs two.',
            ],
            [
                'slug' => 'how-much-should-a-crm-cost-for-a-10-person-team',
                'title' => 'How much should a CRM cost for a 10-person team?',
                'category' => 'Pricing',
                'tags' => ['crm', 'pricing', 'sales'],
                'reading_minutes' => 6,
                'excerpt' => 'A side-by-side breakdown of what 10-person sales teams actually pay across HubSpot, Pipedrive, Salesforce, and the flat-pricing alternatives.',
                'body' => <<<'MD'
# How much should a CRM cost for a 10-person team?

The marketing pages all show entry prices. The real bills look very different.
Here's what 10-person sales teams actually pay each month, with sources.

## The price comparison table

| CRM                       | Tier             | Per-seat | Bill for 10 |
|---------------------------|------------------|---------:|------------:|
| **Alliances PRO Pro**     | Pro (flat)       |       — |   **$19**   |
| **Alliances PRO Business**| Business (flat)  |       — |   **$39**   |
| Pipedrive                 | Essential        |     $14 |     $140    |
| HubSpot Sales Starter     | Starter          |     $20 |     $200    |
| Zoho CRM                  | Standard         |     $14 |     $140    |
| Salesforce                | Starter          |     $25 |     $250    |
| Close                     | Startup          |     $49 |     $490    |
| HubSpot Sales Pro         | Pro              |    ~$100|   ~$1,000   |

(All prices monthly, billed annually, as of 2026 pricing pages.)

## What's not on the marketing page

The entry-level prices are the *sticker* price. Every per-seat CRM has
upsells you'll trip over within months:

- **Email send limits.** HubSpot Starter caps marketing emails at 1,000/mo.
  Pipedrive Essential doesn't include email campaigns at all.
- **Workflow automation.** HubSpot's good automation is in Pro+ ($1,000+/mo).
- **Reports / forecasting.** Salesforce Starter caps custom reports at 10.
- **Integrations.** Some "free" CRMs gate webhooks and API access.

## What to actually budget

For a 10-person SMB sales team that needs a CRM with email campaigns, call
logs, pipeline, and reporting, the realistic monthly bills are:

- **Alliances PRO Business:** $39 flat, everything included.
- **Pipedrive Essential + Mailchimp + Aircall:** ~$280/mo combined.
- **HubSpot Sales Pro:** ~$1,000/mo.
- **Salesforce + add-ons:** $1,650+/mo.

The structural fact is this: **per-seat pricing punishes growth.** Every new
hire costs you another $14–$100/mo, forever. Flat per-workspace pricing
doesn't.

---

If you want the full breakdown by competitor, see our [HubSpot
comparison](/compare/hubspot) and [Pipedrive comparison](/compare/pipedrive).
MD,
                'author_name' => 'Alliances PRO Team',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(2),
                'seo_title' => 'How much should a CRM cost for a 10-person team in 2026?',
                'seo_description' => 'Side-by-side bill comparison for 10-person sales teams across HubSpot, Pipedrive, Salesforce, and flat-pricing alternatives.',
            ],
        ];

        foreach ($posts as $row) {
            BlogPost::updateOrCreate(
                ['slug' => $row['slug']],
                $row,
            );
        }
    }
}
