-- ============================================================
-- Katalon Content CMS — Seed Data
-- All 50 articles from the content plan
-- Run after schema.sql
-- ============================================================

insert into public.articles
  (number, title, pillar, funnel_stage, article_type, track, competitors, launch_wave, publish_by)
values

-- ─── TOFU — Awareness (01–12) ───────────────────────────────

(1,
 'What is AI-powered test automation? A complete guide for engineering leaders',
 'ai_quality', 'tofu', 'hub', 'both', '{}', 'ongoing', null),

(2,
 'How AI is transforming software quality assurance in 2026',
 'ai_quality', 'tofu', 'thought_leadership', null, '{}', 'ongoing', null),

(3,
 'What is an AI testing agent — and why QA teams need one',
 'ai_quality', 'tofu', 'use_case', 'track_2', '{}', 'ongoing', null),

(4,
 'The hidden cost of fragmented QA tooling — and what to do about it',
 'unified', 'tofu', 'data_driven', null, '{}', 'ongoing', null),

(5,
 'What is a unified quality platform? Why point solutions fail enterprise teams',
 'unified', 'tofu', 'hub', 'both', '{}', 'launch_day', '2026-04-07'),

(6,
 'From test automation tool to quality platform: what engineering leaders need to know',
 'unified', 'tofu', 'thought_leadership', null, '{}', 'ongoing', null),

(7,
 'How to build a scalable QA strategy for enterprise engineering teams',
 'enterprise', 'tofu', 'guide', null, '{}', 'ongoing', null),

(8,
 'What is continuous testing — and how to implement it in your CI/CD pipeline',
 'enterprise', 'tofu', 'guide', null, '{}', 'ongoing', null),

(9,
 'Shift-left testing explained: a practical guide for modern dev teams',
 'enterprise', 'tofu', 'guide', null, '{}', 'ongoing', null),

(10,
 'State of software quality 2026: key trends shaping enterprise QA',
 'enterprise', 'tofu', 'original_research', null, '{}', 'ongoing', null),

(11,
 'Why QA teams spend 40% of their time managing tools instead of testing',
 'unified', 'tofu', 'data_driven', null, '{}', 'ongoing', null),

(12,
 'The real cost of software defects reaching production: a data-backed analysis',
 'ai_quality', 'tofu', 'data_driven', null, '{}', 'ongoing', null),

-- ─── MOFU — Consideration (13–32) ───────────────────────────

(13,
 'Best enterprise test automation platforms in 2026: a comprehensive comparison',
 'enterprise', 'mofu', 'hub', null, '{}', 'launch_day', '2026-04-07'),

(14,
 'Best AI testing tools for enterprise teams: how to evaluate and choose',
 'enterprise', 'mofu', 'hub', null, '{}', 'launch_day', '2026-04-07'),

(15,
 'How to consolidate your QA toolstack: a practical buyer''s guide',
 'enterprise', 'mofu', 'guide', null, '{}', 'ongoing', null),

(16,
 'Test automation platform buyer''s guide for engineering directors and VPs',
 'enterprise', 'mofu', 'guide', 'track_1', '{}', 'launch_day', '2026-04-07'),

(17,
 'Tricentis alternatives: 7 platforms worth considering in 2026',
 'competitive', 'mofu', 'alternatives_plural', null, '{tricentis}', 'displacement_wave', '2026-04-14'),

(18,
 'Katalon vs Tricentis: which AI quality platform is right for your team?',
 'competitive', 'mofu', 'vs_competitor', null, '{tricentis}', 'displacement_wave', '2026-04-14'),

(19,
 'Tricentis qTest vs Katalon: enterprise test management compared',
 'competitive', 'mofu', 'vs_competitor', null, '{tricentis}', 'ongoing', null),

(20,
 'Tricentis vs BrowserStack: a head-to-head comparison (and the third option)',
 'competitive', 'mofu', 'competitor_vs_competitor', null, '{tricentis,browserstack}', 'ongoing', null),

(21,
 'BrowserStack alternatives: 6 platforms for unified enterprise testing in 2026',
 'competitive', 'mofu', 'alternatives_plural', null, '{browserstack}', 'displacement_wave', '2026-04-14'),

(22,
 'Katalon vs BrowserStack: which is better for enterprise test automation?',
 'competitive', 'mofu', 'vs_competitor', null, '{browserstack}', 'displacement_wave', '2026-04-14'),

(23,
 'BrowserStack vs Selenium: when to upgrade to a full quality platform',
 'competitive', 'mofu', 'competitor_vs_competitor', null, '{browserstack}', 'ongoing', null),

(24,
 'SmartBear TestComplete alternatives: what enterprise teams are switching to',
 'competitive', 'mofu', 'alternatives_plural', null, '{smartbear}', 'displacement_wave', '2026-04-14'),

(25,
 'Katalon vs SmartBear TestComplete: AI-powered vs legacy test automation',
 'competitive', 'mofu', 'vs_competitor', null, '{smartbear}', 'displacement_wave', '2026-04-14'),

(26,
 'SmartBear TestComplete vs Tricentis: a head-to-head comparison',
 'competitive', 'mofu', 'competitor_vs_competitor', null, '{smartbear,tricentis}', 'ongoing', null),

(27,
 'TestMu alternatives: AI testing platforms compared for enterprise teams',
 'competitive', 'mofu', 'alternatives_plural', null, '{testmu}', 'ongoing', null),

(28,
 'Katalon vs TestMu: which AI testing platform scales with enterprise needs?',
 'competitive', 'mofu', 'vs_competitor', null, '{testmu}', 'ongoing', null),

(29,
 'Playwright vs Katalon: when open-source isn''t enough for enterprise quality',
 'competitive', 'mofu', 'displacement', null, '{}', 'ongoing', null),

(30,
 'TestRail vs Zephyr vs Katalon: enterprise test management compared',
 'competitive', 'mofu', 'displacement', null, '{}', 'ongoing', null),

(31,
 'AI-powered vs rule-based test automation: which approach is right for your team?',
 'unified', 'mofu', 'comparison', null, '{}', 'ongoing', null),

(32,
 'Best test management tools for enterprise teams in 2026',
 'enterprise', 'mofu', 'roundup', null, '{}', 'ongoing', null),

-- ─── BOFU — Decision (33–42) ────────────────────────────────

(33,
 'Katalon True Platform pricing: what to expect and how it compares to alternatives',
 'enterprise', 'bofu', 'pricing', 'both', '{}', 'launch_day', '2026-04-07'),

(34,
 'Total cost of ownership: unified quality platform vs paying for four point solutions',
 'enterprise', 'bofu', 'tco_analysis', 'track_1', '{}', 'ongoing', null),

(35,
 'ROI of AI test automation: a calculation framework for QA leaders',
 'enterprise', 'bofu', 'calculator', 'both', '{}', 'ongoing', null),

(36,
 'Migrating from Tricentis to Katalon: what to expect and how to plan',
 'competitive', 'bofu', 'migration_guide', 'track_1', '{tricentis}', 'displacement_wave', '2026-04-14'),

(37,
 'Migrating from SmartBear TestComplete to Katalon: a step-by-step guide',
 'competitive', 'bofu', 'migration_guide', 'track_1', '{smartbear}', 'displacement_wave', '2026-04-14'),

(38,
 'Switching from BrowserStack to Katalon True Platform: what teams need to know',
 'competitive', 'bofu', 'migration_guide', 'track_1', '{browserstack}', 'displacement_wave', '2026-04-14'),

(39,
 'Katalon True Platform security and compliance: what enterprise teams need to know',
 'enterprise', 'bofu', 'product_page', 'track_1', '{}', 'ongoing', null),

(40,
 'Katalon True Platform customer reviews: what engineering teams say after 6 months',
 'enterprise', 'bofu', 'social_proof', null, '{}', 'ongoing', null),

(41,
 'Why enterprise teams choose Katalon True Platform over legacy testing tools',
 'competitive', 'bofu', 'positioning', 'track_1', '{}', 'ongoing', null),

(42,
 'How to prepare for a Katalon True Platform demo: questions to bring',
 'enterprise', 'bofu', 'conversion', 'track_1', '{}', 'ongoing', null),

-- ─── Implementation (43–50) ─────────────────────────────────

(43,
 'Getting started with Katalon True Platform: a 30-day implementation guide',
 'practitioner', 'implementation', 'tutorial', 'track_2', '{}', 'ongoing', null),

(44,
 'How to migrate existing test scripts to Katalon True Platform',
 'practitioner', 'implementation', 'tutorial', null, '{}', 'ongoing', null),

(45,
 'Integrating Katalon with your CI/CD pipeline: GitHub Actions, Azure DevOps, Jenkins',
 'practitioner', 'implementation', 'tutorial', 'track_2', '{}', 'ongoing', null),

(46,
 'Katalon + Jira integration: setting up end-to-end quality tracking',
 'practitioner', 'implementation', 'tutorial', null, '{}', 'ongoing', null),

(47,
 'Building AI-assisted test cases in Katalon True Platform: a step-by-step guide',
 'ai_quality', 'implementation', 'tutorial', 'track_2', '{}', 'ongoing', null),

(48,
 'How Katalon''s AI heals broken test scripts automatically',
 'ai_quality', 'implementation', 'feature_explainer', null, '{}', 'ongoing', null),

(49,
 'Setting up cross-browser and mobile testing in Katalon True Platform',
 'practitioner', 'implementation', 'tutorial', null, '{}', 'ongoing', null),

(50,
 'Katalon True Platform API testing: getting started guide',
 'practitioner', 'implementation', 'tutorial', null, '{}', 'ongoing', null);
