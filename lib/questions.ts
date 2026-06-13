import type { Question } from '@/types'

export const QUESTIONS: Question[] = [
  // ── CHAPTER 1: ABC of Digital Marketing ──────────────────────────────────
  {
    id: 'q1_1', chapterId: 'ch1', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'Which metric tells you how much it costs to show your ad 1,000 times?',
    options: ['CPC', 'CPM', 'CPA', 'CTR'],
    correctAnswers: [1],
    explanation: 'CPM (Cost Per Mille) measures cost per 1,000 impressions — the base metric for reach-based buying.'
  },
  {
    id: 'q1_2', chapterId: 'ch1', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What does ROAS stand for?',
    options: ['Return on Ad Spend', 'Rate of Ad Success', 'Revenue on Advertising Scale', 'Return on Asset Sales'],
    correctAnswers: [0],
    explanation: 'ROAS = Revenue generated ÷ Ad spend. A ROAS of 3x means ₹3 revenue for every ₹1 spent.'
  },
  {
    id: 'q1_3', chapterId: 'ch1', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'You run a campaign and get 500 clicks from 25,000 impressions. What is your CTR?',
    options: ['0.2%', '2%', '5%', '20%'],
    correctAnswers: [1],
    explanation: 'CTR = (Clicks ÷ Impressions) × 100 = (500 ÷ 25,000) × 100 = 2%.'
  },
  {
    id: 'q1_4', chapterId: 'ch1', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which of the following are considered "owned" media channels? (Select all that apply)',
    options: ['Your brand\'s Instagram page', 'A Google Search ad', 'Your email newsletter', 'A PR article in Forbes', 'Your website'],
    correctAnswers: [0, 2, 4],
    explanation: 'Owned media = channels you control without paying per use: your social pages, email list, and website. Paid ads and PR are "paid" and "earned" respectively.'
  },
  {
    id: 'q1_5', chapterId: 'ch1', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is the primary difference between brand marketing and performance marketing?',
    options: [
      'Brand marketing uses video; performance uses images',
      'Brand marketing builds long-term perception; performance drives measurable short-term action',
      'Brand marketing is only for large companies',
      'Performance marketing doesn\'t use social media'
    ],
    correctAnswers: [1],
    explanation: 'Brand marketing builds equity and perception over time. Performance marketing is optimized for measurable actions like purchases, leads, or clicks.'
  },
  {
    id: 'q1_6', chapterId: 'ch1', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'You launch a new D2C phone case brand with ₹50,000/month budget. You get 200 orders at ₹150 avg order value. Your CPA is ₹250. Is this sustainable?',
    options: [
      'Yes — 200 orders is a great start for any brand',
      'No — CPA (₹250) exceeds revenue per order (₹150), so you\'re losing money on each sale',
      'Yes — as long as ROAS is above 1x',
      'Cannot determine without knowing the product margin'
    ],
    correctAnswers: [1],
    explanation: 'CPA of ₹250 vs revenue of ₹150 means you spend more acquiring a customer than you make. Unless LTV is very high, this is unsustainable. Gross margin matters but even a 100% margin product can\'t overcome negative unit economics at acquisition.'
  },
  {
    id: 'q1_7', chapterId: 'ch1', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'Which of the following best describes "conversion rate"?',
    options: [
      'The percentage of people who see your ad and click it',
      'The percentage of website visitors who complete a desired action',
      'The cost to convert one lead to a sale',
      'The number of purchases divided by total impressions'
    ],
    correctAnswers: [1],
    explanation: 'Conversion rate = (Conversions ÷ Visitors) × 100. It tells you how effectively your landing page or funnel turns visitors into customers.'
  },
  {
    id: 'q1_8', chapterId: 'ch1', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What does CAC stand for and why does it matter?',
    options: [
      'Customer Acquisition Cost — the total spend to acquire one new customer',
      'Campaign Ad Count — number of ads in a campaign',
      'Cost of Ad Click — what you pay per click',
      'Customer Activity Cycle — how often someone buys'
    ],
    correctAnswers: [0],
    explanation: 'CAC is the total marketing + sales cost divided by new customers acquired. If CAC < LTV, the business model is viable. If CAC > LTV, you\'re destroying value.'
  },
  {
    id: 'q1_9', chapterId: 'ch1', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which of the following are key advantages of digital marketing over traditional marketing? (Select all that apply)',
    options: ['Precise audience targeting', 'Real-time performance data', 'Higher trust than TV ads', 'Ability to test multiple creatives quickly', 'Lower entry cost for small budgets'],
    correctAnswers: [0, 1, 3, 4],
    explanation: 'Digital marketing excels at targeting, real-time data, rapid creative testing, and accessibility for small budgets. Trust levels vary — digital ads aren\'t inherently more trusted than TV.'
  },
  {
    id: 'q1_10', chapterId: 'ch1', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'A brand spends ₹1 lakh on ads and generates ₹4 lakh in revenue. Their product costs ₹500 to make and sells for ₹2,000. What is ROAS and is the campaign profitable?',
    options: [
      'ROAS 4x — profitable since ROAS > 1',
      'ROAS 4x — but need to check if gross margin covers ad spend + COGS',
      'ROAS 2x — not profitable',
      'Cannot calculate ROAS from this data'
    ],
    correctAnswers: [1],
    explanation: 'ROAS = 4x. But profitability requires margin analysis: 200 units × ₹2,000 = ₹4L revenue. COGS = 200 × ₹500 = ₹1L. Gross profit = ₹3L. After ₹1L ad spend, net = ₹2L. So yes, profitable — but ROAS alone doesn\'t tell the full story.'
  },
  {
    id: 'q1_11', chapterId: 'ch1', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is a "funnel" in digital marketing?',
    options: [
      'A tool for filtering ad traffic',
      'The customer journey from awareness to purchase',
      'A type of landing page design',
      'A budget allocation method'
    ],
    correctAnswers: [1],
    explanation: 'A marketing funnel maps the customer journey: Awareness → Interest → Consideration → Intent → Purchase. Each stage requires different messaging and tactics.'
  },
  {
    id: 'q1_12', chapterId: 'ch1', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'Which platform is best known for "intent-based" advertising (reaching people actively searching)?',
    options: ['Meta (Facebook/Instagram)', 'Google Search Ads', 'TikTok Ads', 'Display Network'],
    correctAnswers: [1],
    explanation: 'Google Search captures demand — people are actively searching for what you sell. Meta and TikTok interrupt users who weren\'t necessarily looking, making them better for demand generation.'
  },
  {
    id: 'q1_13', chapterId: 'ch1', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which of the following are typically measured in a performance marketing campaign? (Select all that apply)',
    options: ['Impressions', 'Brand sentiment', 'Click-through rate', 'Cost per acquisition', 'Return on ad spend'],
    correctAnswers: [0, 2, 3, 4],
    explanation: 'Performance marketing tracks measurable metrics: impressions, CTR, CPA, and ROAS. Brand sentiment is harder to quantify and belongs more to brand research.'
  },
  {
    id: 'q1_14', chapterId: 'ch1', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What does "remarketing" mean in digital advertising?',
    options: [
      'Launching a campaign a second time',
      'Targeting people who have already visited your website or app',
      'Marketing to the same audience with a lower budget',
      'Reusing old creative assets'
    ],
    correctAnswers: [1],
    explanation: 'Remarketing (or retargeting) shows ads to people who have previously interacted with your brand — visited your site, viewed a product, or added to cart. These audiences convert significantly better than cold traffic.'
  },
  {
    id: 'q1_15', chapterId: 'ch1', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'Your e-commerce store has a 2% conversion rate and average order value of ₹1,500. Your ad brings 1,000 visitors at a CPC of ₹15. Is this campaign profitable if product margin is 60%?',
    options: [
      'Yes — ROAS is 2x which is acceptable',
      'Yes — contribution per order covers ad cost',
      'No — CPC is too high for this conversion rate',
      'Cannot determine without knowing total ad spend'
    ],
    correctAnswers: [1],
    explanation: '1,000 visitors × 2% CVR = 20 orders. Revenue = 20 × ₹1,500 = ₹30,000. Ad spend = 1,000 × ₹15 = ₹15,000. ROAS = 2x. Margin = 60% → gross profit = ₹18,000. After ₹15,000 ad spend, net = ₹3,000. Profitable, but thin. Optimize for scale.'
  },

  // ── CHAPTER 2: Channels & Platforms ──────────────────────────────────────
  {
    id: 'q2_1', chapterId: 'ch2', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is the main advantage of Meta advertising over Google Search?',
    options: [
      'Lower cost per click',
      'Ability to target based on interests and demographics (demand generation)',
      'Higher purchase intent',
      'Better for B2B companies'
    ],
    correctAnswers: [1],
    explanation: 'Meta excels at audience targeting based on interests, behaviors, and lookalikes. It creates demand by interrupting users, while Google Search captures existing demand from active searchers.'
  },
  {
    id: 'q2_2', chapterId: 'ch2', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What does a "lookalike audience" do on Meta?',
    options: [
      'Shows your ads to people who look like your existing customers',
      'Creates a copy of your ad campaign',
      'Automatically generates ad creatives',
      'Finds people in the same geographic area as your customers'
    ],
    correctAnswers: [0],
    explanation: 'Lookalike audiences let Meta find new users who share characteristics with your best customers (based on a seed audience). It\'s one of the most powerful prospecting tools available.'
  },
  {
    id: 'q2_3', chapterId: 'ch2', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which of the following campaign objectives are available on Meta Ads Manager? (Select all that apply)',
    options: ['Awareness', 'Traffic', 'Engagement', 'SEO', 'Sales'],
    correctAnswers: [0, 1, 2, 4],
    explanation: 'Meta offers Awareness, Traffic, Engagement, Leads, App Promotion, and Sales objectives. SEO is not a paid ads objective — it\'s an organic search strategy.'
  },
  {
    id: 'q2_4', chapterId: 'ch2', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is the key difference between Google Search Ads and Google Display Ads?',
    options: [
      'Search is more expensive; Display is free',
      'Search targets users actively searching; Display shows image ads across websites',
      'Display ads appear on YouTube only',
      'Search ads only work for retail brands'
    ],
    correctAnswers: [1],
    explanation: 'Search ads appear on Google results pages for relevant keywords (intent-based). Display ads are image/banner ads shown across Google\'s network of partner websites — better for reach and retargeting.'
  },
  {
    id: 'q2_5', chapterId: 'ch2', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'A fashion brand wants to launch a new collection. They have ₹5L budget. Which channel mix makes the most sense?',
    options: [
      '100% Google Search — highest purchase intent',
      'Meta for awareness + retargeting, Google for brand search protection',
      'YouTube only for maximum reach',
      'Equal split across all platforms without testing'
    ],
    correctAnswers: [1],
    explanation: 'Fashion is visual and impulse-driven — Meta/Instagram is ideal for creative-led prospecting and retargeting. Google Search protects brand terms from competitors. This is a classic full-funnel approach for D2C fashion.'
  },
  {
    id: 'q2_6', chapterId: 'ch2', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is a "pixel" in digital advertising?',
    options: [
      'A unit of image resolution',
      'A piece of code on your website that tracks user behavior for ad platforms',
      'A type of ad format',
      'An audience segment on Meta'
    ],
    correctAnswers: [1],
    explanation: 'The Meta Pixel (now Meta Pixel) and Google Tag are JavaScript snippets you install on your site. They track events like page views, add-to-cart, and purchases — powering conversion tracking and retargeting.'
  },
  {
    id: 'q2_7', chapterId: 'ch2', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What does "frequency" mean in ad metrics and why does it matter?',
    options: [
      'How often your ad is posted; more is always better',
      'The average number of times one person sees your ad; high frequency causes ad fatigue',
      'The speed at which your ads are delivered',
      'How frequently you change your creative'
    ],
    correctAnswers: [1],
    explanation: 'Frequency = Impressions ÷ Reach. When frequency gets too high (typically 3-5+), the same person sees your ad too many times, leading to ad fatigue — declining CTR and rising CPC. Time to refresh creatives.'
  },
  {
    id: 'q2_8', chapterId: 'ch2', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which factors affect your ad\'s auction competitiveness on Meta? (Select all that apply)',
    options: ['Bid amount', 'Estimated action rate', 'Ad quality and relevance', 'Number of followers on your page', 'Post engagement history'],
    correctAnswers: [0, 1, 2],
    explanation: 'Meta\'s auction considers: bid, estimated action rate (likelihood user takes desired action), and ad quality/relevance. Follower count and organic post history don\'t directly affect paid auction outcomes.'
  },
  {
    id: 'q2_9', chapterId: 'ch2', type: 'mcq', difficulty: 'hard', xpReward: 25,
    text: 'What is Advantage+ Shopping Campaign (ASC) on Meta, and when should you use it?',
    options: [
      'A manual campaign type for experienced buyers; use it when you want full control',
      'Meta\'s AI-driven shopping campaign; best for scaling when you have enough purchase data',
      'A free organic product listing tool similar to Google Shopping',
      'A campaign type exclusive to verified Meta Business accounts'
    ],
    correctAnswers: [1],
    explanation: 'ASC uses Meta\'s ML to automatically optimize audience, creative, and placement for shopping conversions. It performs best when you have sufficient purchase signal (50+ events/week). It\'s less controllable but often outperforms manual campaigns at scale.'
  },
  {
    id: 'q2_10', chapterId: 'ch2', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'You notice your Meta campaign CPM has increased 40% with no change in targeting or budget. What is the most likely cause?',
    options: [
      'Your pixel stopped working',
      'Increased competition in the auction (seasonal, more advertisers bidding on same audience)',
      'Meta changed its algorithm',
      'Your landing page is underperforming'
    ],
    correctAnswers: [1],
    explanation: 'CPM spikes are almost always auction-driven. More advertisers competing for the same audience = higher prices. Common during Q4, sales seasons, and major events. Solutions: expand audience, shift to less competitive placements, or increase bid/budget to stay competitive.'
  },
  {
    id: 'q2_11', chapterId: 'ch2', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is "Quality Score" in Google Ads and why does it matter?',
    options: [
      'A rating of your product quality; affects eligibility to advertise',
      'A score (1-10) based on ad relevance, CTR, and landing page quality that affects your CPC and ad rank',
      'A metric measuring your campaign\'s creative quality',
      'Google\'s rating of your domain authority'
    ],
    correctAnswers: [1],
    explanation: 'Quality Score determines your Ad Rank = Bid × Quality Score × Expected Impact of Extensions. A high QS means you pay less for the same position. Improve it by aligning keywords, ad copy, and landing page content.'
  },
  {
    id: 'q2_12', chapterId: 'ch2', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'When should you use "Broad Match" keywords in Google Ads?',
    options: [
      'Always — it gives maximum reach',
      'Never — exact match is always better',
      'When paired with Smart Bidding and sufficient conversion data, to capture broader intent signals',
      'Only for brand campaigns'
    ],
    correctAnswers: [2],
    explanation: 'Broad match + Smart Bidding is Google\'s recommended approach when you have 30+ conversions per month. Google uses intent signals to show ads to relevant searches beyond literal keyword matches. Without Smart Bidding or data, broad match wastes budget.'
  },
  {
    id: 'q2_13', chapterId: 'ch2', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which of the following are best practices for YouTube ad campaigns? (Select all that apply)',
    options: [
      'Hook viewers in the first 5 seconds before they can skip',
      'Use the same creative as your static Instagram ads',
      'Target based on audience affinities and intent signals',
      'Include a clear call-to-action',
      'Optimize for view rate rather than business outcomes'
    ],
    correctAnswers: [0, 2, 3],
    explanation: 'YouTube best practices: strong hook in first 5 seconds (skippable ads), proper audience targeting, and clear CTA. Video creative must be made for video — repurposing static images rarely works. Optimize for business outcomes (conversions), not vanity metrics like view rate.'
  },
  {
    id: 'q2_14', chapterId: 'ch2', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is the key advantage of using "Custom Audiences" on Meta over interest-based targeting?',
    options: [
      'Custom Audiences are always cheaper to reach',
      'They target your actual customer list or website visitors — known high-intent people',
      'They allow broader reach for awareness campaigns',
      'Custom Audiences are automatically updated by Meta'
    ],
    correctAnswers: [1],
    explanation: 'Custom Audiences are built from your own data (email lists, website visitors, purchase history). They represent people who already know your brand, making them higher intent and typically higher converting than cold interest-based targeting.'
  },
  {
    id: 'q2_15', chapterId: 'ch2', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'A D2C supplement brand sees great ROAS on Meta but Google Search shows near-zero volume for brand and category terms. What does this suggest?',
    options: [
      'Google Ads isn\'t working — stop Google budget',
      'Meta is creating demand but not enough brand searches — opportunity to invest in SEO and YouTube',
      'The product category is too niche for search advertising',
      'Meta\'s attribution is inflated; true ROAS is lower'
    ],
    correctAnswers: [1],
    explanation: 'Low brand search volume means Meta awareness hasn\'t converted to intent-based searching yet. This is common for new brands — Meta creates awareness, YouTube reinforces, SEO captures converting searchers. The solution is full-funnel strategy, not channel abandonment.'
  },

  // ── CHAPTER 3: Creative Strategy ─────────────────────────────────────────
  {
    id: 'q3_1', chapterId: 'ch3', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is the "hook" in a video ad?',
    options: [
      'The background music',
      'The first 3-5 seconds designed to stop the scroll and grab attention',
      'The promotional offer shown at the end',
      'The brand logo placement'
    ],
    correctAnswers: [1],
    explanation: 'The hook is the opening moments of an ad that determines whether someone keeps watching. 70% of viewers decide in the first 3 seconds. A great hook addresses a pain point, sparks curiosity, or makes a bold claim.'
  },
  {
    id: 'q3_2', chapterId: 'ch3', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is "creative fatigue" and how do you diagnose it?',
    options: [
      'When your design team is overworked — hire more designers',
      'When an ad\'s performance declines as the same audience sees it too many times — diagnosed by rising CPM/CPC and declining CTR/CVR',
      'When a campaign has been running for more than 90 days',
      'When ad quality score drops below 5'
    ],
    correctAnswers: [1],
    explanation: 'Creative fatigue occurs when audience saturation causes declining performance. Signs: CTR drops, CPC rises, CVR falls, frequency climbs. Fix: introduce new creative variations with different hooks, formats, or angles.'
  },
  {
    id: 'q3_3', chapterId: 'ch3', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which of the following are proven "hook" frameworks for video ads? (Select all that apply)',
    options: [
      'Problem-agitation-solution (PAS)',
      'Starting with the brand logo for 3 seconds',
      'Bold claim or controversial statement',
      'Social proof opening ("10,000 customers can\'t be wrong")',
      'Slow product reveal with no dialogue'
    ],
    correctAnswers: [0, 2, 3],
    explanation: 'Proven hooks: PAS (identify and amplify a problem), bold claims (creates curiosity/disagreement), social proof (builds immediate credibility). Starting with a logo or slow reveal are common mistakes — they don\'t provide a reason to watch.'
  },
  {
    id: 'q3_4', chapterId: 'ch3', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is a "creative angle" in ad strategy?',
    options: [
      'The camera angle used in video production',
      'A specific perspective or narrative framing used to position the product\'s benefit',
      'The design layout of a static ad',
      'The targeting approach used alongside the creative'
    ],
    correctAnswers: [1],
    explanation: 'A creative angle is the core message frame: e.g., "our product saves you time", "our product makes you feel confident", or "here\'s what everyone else gets wrong". Different angles resonate with different audience segments — testing angles is crucial.'
  },
  {
    id: 'q3_5', chapterId: 'ch3', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'You have 3 ads with the same offer but different hooks. Ad A: CTR 3.5%, ROAS 2.8x. Ad B: CTR 1.2%, ROAS 4.1x. Ad C: CTR 2.8%, ROAS 1.9x. Which should you scale?',
    options: [
      'Ad A — highest CTR means best creative',
      'Ad B — highest ROAS means most efficient spend on actual purchases',
      'Ad C — balanced performance',
      'All three equally to maintain diversity'
    ],
    correctAnswers: [1],
    explanation: 'ROAS is the north star for performance. Ad B delivers ₹4.10 for every ₹1 spent despite lower CTR — the audience who clicks is highly converting. High CTR + low ROAS (Ad A) suggests clicks aren\'t turning into buyers. Scale B, study A\'s landing page, pause C.'
  },
  {
    id: 'q3_6', chapterId: 'ch3', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is UGC (User Generated Content) and why is it effective in ads?',
    options: [
      'Ads created by professional agencies — higher quality',
      'Content created by real customers or creators that appears authentic and builds trust',
      'A type of interactive ad format',
      'Ad content generated automatically by AI platforms'
    ],
    correctAnswers: [1],
    explanation: 'UGC mimics organic social content — it looks and feels like a real recommendation from a peer, not a brand ad. This reduces ad blindness, increases trust, and often outperforms polished brand videos in performance campaigns.'
  },
  {
    id: 'q3_7', chapterId: 'ch3', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is "ad creative testing" and what is the correct methodology?',
    options: [
      'Running all variations simultaneously with equal budget and picking the winner after 2-3 days',
      'Testing one variable at a time (hook, format, or angle) with statistical significance before scaling winners',
      'Letting the algorithm choose the best creative automatically from day 1',
      'Testing with the maximum budget to get results faster'
    ],
    correctAnswers: [1],
    explanation: 'Proper creative testing changes one variable at a time (e.g., only the hook) so you know what caused performance differences. Wait for statistical significance (typically 100+ conversions or 7 days minimum) before declaring a winner.'
  },
  {
    id: 'q3_8', chapterId: 'ch3', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which ad formats typically work best for direct response (DR) campaigns on Meta? (Select all that apply)',
    options: ['Short-form video (15-60 seconds)', 'Carousel ads showcasing multiple products', 'Single image with strong copy', 'Long-form documentary style (5+ minutes)', 'Stories/Reels format'],
    correctAnswers: [0, 1, 2, 4],
    explanation: 'Short video, carousels, single images, and Stories are the workhorses of DR on Meta. Long-form content (5+ min) is better suited for YouTube brand storytelling or remarketing, not prospecting DR.'
  },
  {
    id: 'q3_9', chapterId: 'ch3', type: 'mcq', difficulty: 'hard', xpReward: 25,
    text: 'What is the "creative velocity" principle in performance marketing?',
    options: [
      'How fast your video loads on mobile',
      'The speed at which the creative team produces new ad variations to outpace fatigue',
      'How quickly an ad delivers results after launch',
      'The number of creatives running simultaneously in an ad set'
    ],
    correctAnswers: [1],
    explanation: 'Creative velocity is the rate at which you introduce fresh creative to beat fatigue and feed the algorithm new signals. Top performance marketers maintain 10-20+ active creative tests at any time, constantly killing losers and scaling winners.'
  },
  {
    id: 'q3_10', chapterId: 'ch3', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'Your best-performing ad has been running for 3 weeks. ROAS dropped from 4.5x to 2.1x. CPM rose 35%. Frequency is at 6.2. What is your action plan?',
    options: [
      'Increase budget — the algorithm needs more data',
      'Pause and relaunch the same ad with a new campaign',
      'Launch new creative variations with different hooks; exclude people who\'ve seen this ad 3+ times',
      'Change targeting to a new audience without touching the creative'
    ],
    correctAnswers: [2],
    explanation: 'Classic creative fatigue: high frequency (6.2), rising CPM, falling ROAS. New creative with fresh hooks is the primary fix. Frequency capping or excluding high-exposure audiences reduces waste. Relaunching the same creative doesn\'t solve the underlying saturation problem.'
  },
  {
    id: 'q3_11', chapterId: 'ch3', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What does "above the fold" mean in the context of ad creative and landing pages?',
    options: [
      'The portion of content visible before scrolling — must contain the core value proposition',
      'The top section of a social media feed',
      'The first 3 seconds of a video',
      'Ad placements at the top of search results'
    ],
    correctAnswers: [0],
    explanation: '"Above the fold" refers to what\'s visible without scrolling. On landing pages, it should immediately communicate: who it\'s for, what the offer is, and why to act now. If visitors have to scroll to understand the offer, conversion rates suffer.'
  },
  {
    id: 'q3_12', chapterId: 'ch3', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is the purpose of a "testimonial" creative in performance marketing?',
    options: [
      'To showcase product features technically',
      'To borrow social proof and reduce purchase risk through real customer stories',
      'To build brand awareness through emotion',
      'To introduce the brand to new audiences'
    ],
    correctAnswers: [1],
    explanation: 'Testimonial creatives leverage social proof — people trust other people\'s experiences more than brand claims. They reduce purchase anxiety and are especially powerful in remarketing to warm audiences who\'ve already seen the product.'
  },
  {
    id: 'q3_13', chapterId: 'ch3', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which elements make a high-converting product image ad? (Select all that apply)',
    options: ['Clear product shot on clean background', 'Benefit-focused headline overlay', 'Small, subtle brand logo', 'Price or offer prominently displayed', 'Minimal text to comply with platform guidelines'],
    correctAnswers: [0, 1, 3, 4],
    explanation: 'Strong product image ads: clear product shot, benefit headline, visible offer/price, and minimal text (platforms penalize text-heavy images). The logo can be small — the product and offer are the stars. Excessive text reduces delivery and performance.'
  },
  {
    id: 'q3_14', chapterId: 'ch3', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What does "thumb-stop rate" measure?',
    options: [
      'The number of people who save your ad',
      'The percentage of people who pause their scroll to watch your video vs total impressions',
      'How long viewers watch before skipping',
      'The ratio of reactions to total reach'
    ],
    correctAnswers: [1],
    explanation: 'Thumb-stop rate (or 3-second video view rate) = 3-second views ÷ impressions. It directly measures hook effectiveness. Industry benchmark is 25-30%. Below that, your hook isn\'t stopping the scroll.'
  },
  {
    id: 'q3_15', chapterId: 'ch3', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'You\'re launching a premium skincare product (₹2,500/unit). What creative strategy would you prioritize?',
    options: [
      'Price-led ads showing the value vs competitors',
      'Founder story + ingredient education + before/after UGC — build trust before conversion',
      'Discount ads to reduce price barrier for first purchase',
      'Product feature showcase with detailed specifications'
    ],
    correctAnswers: [1],
    explanation: 'Premium skincare requires trust-building before conversion. Founder story establishes authenticity, ingredient education justifies the price, and before/after UGC provides social proof. Leading with price or discounts undermines premium positioning and attracts deal-seekers who won\'t repurchase.'
  },

  // ── CHAPTER 4: Performance Analysis & Scaling ─────────────────────────────
  {
    id: 'q4_1', chapterId: 'ch4', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What does MER (Marketing Efficiency Ratio) measure?',
    options: [
      'The same thing as ROAS but with a different name',
      'Total revenue divided by total marketing spend across all channels — a blended view of marketing ROI',
      'The efficiency of your marketing team\'s output',
      'The ratio of paid to organic revenue'
    ],
    correctAnswers: [1],
    explanation: 'MER = Total Revenue ÷ Total Marketing Spend. Unlike ROAS (which is channel-specific), MER gives the true blended picture of marketing efficiency. It accounts for halo effects and attribution gaps. A healthy MER is typically 3-5x+ depending on margin.'
  },
  {
    id: 'q4_2', chapterId: 'ch4', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'You have a campaign delivering 4.5x ROAS. When should you scale the budget?',
    options: [
      'Immediately — 4.5x is great, always scale',
      'Never scale until ROAS exceeds 10x',
      'When ROAS is consistently above your minimum target ROAS and performance is stable for 3+ days',
      'Scale only during peak seasons'
    ],
    correctAnswers: [2],
    explanation: 'Scale when ROAS is stable above your target for several days — not on a single day\'s spike. Scaling too fast disrupts the learning phase. Best practice: increase budget by 20-30% every 3-4 days rather than doubling overnight.'
  },
  {
    id: 'q4_3', chapterId: 'ch4', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which signals indicate a campaign is ready to scale? (Select all that apply)',
    options: [
      'Consistent ROAS above target for 5+ days',
      'Frequency above 8',
      'Cost per result within acceptable range',
      'Audience size large enough to absorb more spend',
      'High click-through rate with strong landing page CVR'
    ],
    correctAnswers: [0, 2, 3, 4],
    explanation: 'Scale signals: consistent ROAS, CPA within target, large available audience, and strong CVR. High frequency (8+) is a warning sign of saturation — not a scale signal. Scale into size, not into fatigue.'
  },
  {
    id: 'q4_4', chapterId: 'ch4', type: 'mcq', difficulty: 'hard', xpReward: 25,
    text: 'What is "attribution" and why is it a persistent problem in digital marketing?',
    options: [
      'How you credit revenue to marketing channels — difficult because customers touch multiple channels before purchasing',
      'The legal responsibility of ad platforms for fraud',
      'Tracking which creative element led to a click',
      'A way to measure brand awareness'
    ],
    correctAnswers: [0],
    explanation: 'Attribution is the process of assigning credit to the touchpoints (ads, organic, email, etc.) that contributed to a sale. The problem: most customers interact with 5-7 touchpoints before buying. Each platform claims credit for the same sale, leading to double/triple counting. Solution: look at MER + incrementality testing for truth.'
  },
  {
    id: 'q4_5', chapterId: 'ch4', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'Meta reports 5.2x ROAS. Google Analytics shows 2.8x ROAS. Total revenue is ₹15L. Total ad spend is ₹4L. What is the true MER and what should you trust?',
    options: [
      'Trust Meta — it has better tracking than Google Analytics',
      'Trust Google Analytics — last-click is always most accurate',
      'MER = 15L ÷ 4L = 3.75x — this is the ground truth; platform numbers overlap due to attribution windows',
      'Average Meta and GA: (5.2 + 2.8) ÷ 2 = 4x ROAS'
    ],
    correctAnswers: [2],
    explanation: 'MER = ₹15L ÷ ₹4L = 3.75x. This is the only number that can\'t be manipulated by attribution windows. Platform ROAS numbers overlap because both Meta and Google claim credit for the same orders. MER is your north star — it reflects actual business outcomes.'
  },
  {
    id: 'q4_6', chapterId: 'ch4', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is "incrementality testing" in media measurement?',
    options: [
      'Testing small budget increments to find the ideal spend level',
      'A/B testing ad creative variations',
      'A scientific test to measure the true causal impact of your ads by comparing exposed vs unexposed groups',
      'Incrementally scaling your budget over time'
    ],
    correctAnswers: [2],
    explanation: 'Incrementality tests (lift studies, geo holdouts, ghost bidding) measure: "Would these customers have purchased without seeing our ad?" They reveal the true causal lift of advertising, independent of attribution bias. Often shows platform-reported ROAS is 30-50% inflated.'
  },
  {
    id: 'q4_7', chapterId: 'ch4', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is the "learning phase" in Meta Ads and how should you manage it?',
    options: [
      'The first day a campaign runs — irrelevant after that',
      'Meta\'s algorithm calibration period (50 optimization events needed); avoid major edits or it resets',
      'The period when your team learns which audiences work',
      'A mandatory 2-week waiting period before campaigns can deliver'
    ],
    correctAnswers: [1],
    explanation: 'The learning phase is when Meta\'s algorithm calibrates delivery. It needs ~50 optimization events (purchases, leads, etc.) within 7 days. During this phase: avoid major budget changes, targeting edits, or creative swaps — they reset the clock. Consolidate campaigns to help reach 50 events faster.'
  },
  {
    id: 'q4_8', chapterId: 'ch4', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which actions will RESET the learning phase on Meta? (Select all that apply)',
    options: ['Changing budget by more than 20-25%', 'Pausing then reactivating an ad set', 'Adding a new ad creative to an ad set', 'Changing optimization event (e.g., from Add to Cart to Purchase)', 'Editing your ad copy'],
    correctAnswers: [0, 1, 2, 3, 4],
    explanation: 'All of these reset the learning phase. Even adding a new creative or editing copy triggers a reset. This is why experienced buyers make changes deliberately and infrequently. Use Experiments for testing creative without disrupting live campaigns.'
  },
  {
    id: 'q4_9', chapterId: 'ch4', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'Campaign A: ₹50K spend, 4.2x ROAS, but only running for 2 days. Campaign B: ₹3L spend, 3.1x ROAS, running 14 days consistently. Which do you scale?',
    options: [
      'Campaign A — higher ROAS means it\'s better',
      'Campaign B — consistent performance over 14 days is more reliable; scale with confidence',
      'Neither — need more data',
      'Both equally'
    ],
    correctAnswers: [1],
    explanation: '2-day data is statistically unreliable — could be a fluke or a learning phase artifact. Campaign B has 14 days of consistent delivery, proven scaling behavior, and much higher spend volume (proving it works at scale). Scale B; let A run 7+ more days before deciding.'
  },
  {
    id: 'q4_10', chapterId: 'ch4', type: 'mcq', difficulty: 'hard', xpReward: 25,
    text: 'What is "marginal ROAS" and why does it matter more than average ROAS when scaling?',
    options: [
      'The ROAS of your lowest-performing campaign',
      'The return on the next rupee you spend — tells you if additional spend is profitable at the margin',
      'The ROAS after subtracting platform fees',
      'ROAS calculated on a weekly rather than daily basis'
    ],
    correctAnswers: [1],
    explanation: 'Average ROAS tells you historical performance. Marginal ROAS tells you what happens when you spend more. As you scale, you exhaust high-intent audiences and enter diminishing returns — marginal ROAS falls below average ROAS. Keep scaling until marginal ROAS hits your minimum threshold, not average ROAS.'
  },
  {
    id: 'q4_11', chapterId: 'ch4', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is "dayparting" in ad campaign management?',
    options: [
      'Splitting your budget by channel',
      'Scheduling ads to run only during hours or days when your audience converts best',
      'Running different ads for morning vs evening audiences',
      'A method to partition your audience by age'
    ],
    correctAnswers: [1],
    explanation: 'Dayparting (ad scheduling) lets you run or increase bids during peak conversion hours. For example, a meal-kit brand might increase bids at 5-7pm (dinner decision time). Analyze your conversion data by hour/day before applying dayparting to avoid missing conversions.'
  },
  {
    id: 'q4_12', chapterId: 'ch4', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'When you see CPC increasing but CTR staying flat, what are the likely causes? (Select all that apply)',
    options: [
      'Increased auction competition (more advertisers bidding on same audience)',
      'Your landing page conversion rate dropped',
      'Audience saturation — same people seeing your ad repeatedly',
      'Seasonal CPM increase',
      'Your creative quality declined'
    ],
    correctAnswers: [0, 2, 3],
    explanation: 'CPC = CPM ÷ CTR. If CTR is flat but CPC rises, then CPM must have risen — pointing to auction competition, audience saturation, or seasonal effects. Landing page CVR doesn\'t affect CPC. Creative quality decline would show up in falling CTR first.'
  },
  {
    id: 'q4_13', chapterId: 'ch4', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is a "holdout test" and what does it measure?',
    options: [
      'Withholding budget to see if organic sales maintain without ads',
      'A control group that doesn\'t see your ads — used to measure the true incremental lift of advertising',
      'Testing how long campaigns can run without creative refresh',
      'A method of pausing underperforming campaigns'
    ],
    correctAnswers: [1],
    explanation: 'A holdout test creates a ghost audience (ghost bidding) or geographic holdout that\'s excluded from your ads. Comparing conversion rates between the exposed group and holdout reveals your true incremental impact. This is the gold standard for measuring ad effectiveness.'
  },
  {
    id: 'q4_14', chapterId: 'ch4', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What does "pacing" mean in campaign management?',
    options: [
      'The speed at which creative assets are produced',
      'How evenly the platform distributes your daily budget throughout the day',
      'The frequency at which you review campaign performance',
      'The rate at which your audience grows'
    ],
    correctAnswers: [1],
    explanation: 'Budget pacing refers to how the platform spends your daily budget over time. "Standard delivery" spreads spend evenly. "Accelerated" spends as fast as possible (Meta removed this option). Under-pacing means lost impressions; over-pacing early can exhaust budget before peak hours.'
  },
  {
    id: 'q4_15', chapterId: 'ch4', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'You double a campaign budget from ₹20K/day to ₹40K/day. After 3 days, ROAS drops from 3.8x to 2.4x. What should you do?',
    options: [
      'Keep the doubled budget — it\'ll stabilize in a week',
      'Revert to ₹20K/day immediately and test smaller increments (20-30% at a time)',
      'Double budget again — aggressive scaling always wins long-term',
      'Pause the campaign entirely for a fresh start'
    ],
    correctAnswers: [1],
    explanation: 'Doubling budget (100% increase) almost always disrupts learning and forces the algorithm to reach lower-quality audiences. A 36% ROAS decline after 3 days confirms diminishing returns. Revert to the working budget, then scale in 20-30% increments every 3-4 days. Slow scaling preserves efficiency.'
  },

  // ── CHAPTER 5: Brand Thinking & Sr. Judgment ─────────────────────────────
  {
    id: 'q5_1', chapterId: 'ch5', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is "brand equity" and how does it affect performance marketing?',
    options: [
      'The financial value of your brand name on the balance sheet',
      'The trust, recognition, and positive associations customers hold — which reduces CAC and improves CVR over time',
      'The number of brand mentions on social media',
      'Your market share vs competitors'
    ],
    correctAnswers: [1],
    explanation: 'Brand equity is the premium customers place on your brand based on trust and recognition. Strong brand equity means: lower CPMs (algorithm recognizes quality), higher CTR (familiar brand gets clicked more), better CVR (trust reduces hesitation). Performance and brand marketing compound each other.'
  },
  {
    id: 'q5_2', chapterId: 'ch5', type: 'mcq', difficulty: 'hard', xpReward: 25,
    text: 'When should a D2C brand consider investing in brand marketing despite pressure for short-term ROAS?',
    options: [
      'Never — ROAS is always the right metric',
      'When CAC is rising, organic search is flat, and word-of-mouth is minimal — signs that paid-only isn\'t building a durable business',
      'Only when revenue exceeds ₹100 crore',
      'When competitors start brand campaigns'
    ],
    correctAnswers: [1],
    explanation: 'Rising CAC + flat organic + no word-of-mouth = you\'re renting customers, not building a brand. Brand investment creates compounding returns: lower future CAC, higher LTV, organic growth. The best brands run both simultaneously — not one or the other.'
  },
  {
    id: 'q5_3', chapterId: 'ch5', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which of the following are signs of a strong brand in D2C? (Select all that apply)',
    options: ['High branded search volume', 'Strong repeat purchase rate and NPS', 'Celebrities using the product unpaid', 'Ability to charge premium without volume loss', 'Highest social media follower count in category'],
    correctAnswers: [0, 1, 3],
    explanation: 'Strong brand signals: people searching for you by name (branded search), customers coming back (LTV/NPS), and pricing power (premium without volume loss). Unpaid celebrity use is nice but unreliable. Follower count is vanity — engagement and sales are what matter.'
  },
  {
    id: 'q5_4', chapterId: 'ch5', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'Your brand\'s Meta ROAS has declined from 4.2x to 2.8x over 6 months despite new creative. No major competitors launched. What might be happening?',
    options: [
      'Algorithm changes — nothing you can do',
      'Market saturation of your core audience + possible brand fatigue — time for brand expansion, new segments, or product innovation',
      'Creative quality has declined permanently',
      'You need to increase budget to recover ROAS'
    ],
    correctAnswers: [1],
    explanation: 'Long-term ROAS decline without competitive pressure and despite creative refresh points to market saturation. You\'ve likely exhausted the best-fit audience segment. The solution is strategic: new audience segments, new products, geographic expansion, or brand storytelling to create new demand pools.'
  },
  {
    id: 'q5_5', chapterId: 'ch5', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is "Customer Lifetime Value" (LTV) and why is it more important than CPA?',
    options: [
      'LTV = revenue from one purchase; CPA is what matters for profitability',
      'LTV = total revenue a customer generates over their relationship with you; it determines how much you can afford to pay to acquire a customer',
      'LTV and CPA are the same metric',
      'LTV only matters for subscription businesses'
    ],
    correctAnswers: [1],
    explanation: 'LTV: CPA ratio determines your acquisition business model. If LTV = ₹5,000 and CPA = ₹800, you have healthy unit economics. If LTV = ₹1,200 and CPA = ₹800, margins are razor-thin. High LTV lets you outbid competitors on acquisition while remaining profitable.'
  },
  {
    id: 'q5_6', chapterId: 'ch5', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is a "positioning statement" and why is it strategically important?',
    options: [
      'The tagline displayed on your website header',
      'A clear articulation of what you do, who you do it for, and why you\'re different — your compass for all marketing decisions',
      'Your brand\'s social media bio',
      'The mission statement published in your annual report'
    ],
    correctAnswers: [1],
    explanation: 'A positioning statement (e.g., "For ambitious Indian entrepreneurs, [Brand] is the only business education platform that combines real case studies with expert mentorship") guides all creative, messaging, and channel decisions. Without it, marketing becomes inconsistent noise.'
  },
  {
    id: 'q5_7', chapterId: 'ch5', type: 'multi_select', difficulty: 'hard', xpReward: 25,
    text: 'Which are hallmarks of senior-level marketing judgment vs junior-level execution? (Select all that apply)',
    options: [
      'Asking "why" before accepting a brief',
      'Optimizing the campaign as given without questioning objectives',
      'Connecting ad metrics to business P&L and LTV',
      'Reporting on platform ROAS as the truth',
      'Recommending channel mix based on full-funnel data, not just last-click'
    ],
    correctAnswers: [0, 2, 4],
    explanation: 'Senior marketers question briefs, connect metrics to business outcomes, and use multi-touch/blended data to make channel decisions. Junior marketers optimize within the given constraints and take platform ROAS at face value. The shift from executor to strategist is the hallmark of growth.'
  },
  {
    id: 'q5_8', chapterId: 'ch5', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'A client asks you to pause all brand campaigns because "they don\'t show ROAS." How do you respond?',
    options: [
      'Pause them — ROAS is the primary metric for all campaigns',
      'Agree to reduce, but present data on branded search volume, organic CVR lift, and CAC trends to show brand\'s halo effect on performance',
      'Refuse — brand is strategically essential',
      'Move brand budget to performance and report higher ROAS'
    ],
    correctAnswers: [1],
    explanation: 'The right answer is data-driven advocacy. Brand campaigns don\'t show direct ROAS but they do show: increased branded search, higher organic traffic CVR, lower CAC over time. Present these metrics to demonstrate brand\'s value to the performance funnel, then find the right balance — not zero brand spend.'
  },
  {
    id: 'q5_9', chapterId: 'ch5', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is "share of voice" (SOV) and how should a challenger brand use it?',
    options: [
      'Your brand\'s share of total ad impressions in the category — challengers should punch above their revenue share to gain ground',
      'The percentage of your budget spent on video ads',
      'How often your brand is mentioned vs competitors on social media',
      'Your market share as a percentage of total category sales'
    ],
    correctAnswers: [0],
    explanation: 'SOV = Your ad spend ÷ Total category ad spend. Research shows: brands that achieve SOV > Market Share (excess SOV) tend to grow market share over time. Challenger brands should aim to outspend their market share %, even if it means accepting lower short-term ROAS.'
  },
  {
    id: 'q5_10', chapterId: 'ch5', type: 'mcq', difficulty: 'hard', xpReward: 25,
    text: 'You manage ₹5 crore/month in ad spend. A new platform promises 8x ROAS in their attribution. How do you evaluate this?',
    options: [
      'Move 20% budget there immediately — high ROAS is high ROAS',
      'Run a geo-based or holdout incrementality test with limited budget before scaling; platform-reported ROAS is inherently biased',
      'Dismiss it — established platforms are always better',
      'Ask for case studies then decide'
    ],
    correctAnswers: [1],
    explanation: 'At ₹5Cr/month scale, every new channel deserves scientific evaluation. Platform-reported 8x ROAS is almost certainly overstated — every platform claims credit for sales that would have happened anyway. An incrementality test with a geographic holdout gives you the true causal impact before risking significant budget.'
  },
  {
    id: 'q5_11', chapterId: 'ch5', type: 'multi_select', difficulty: 'medium', xpReward: 20,
    text: 'Which components make up a strong brand identity? (Select all that apply)',
    options: ['Logo and visual language', 'Tone of voice and messaging principles', 'Core customer values and positioning', 'The founder\'s personal social media style', 'Product packaging design'],
    correctAnswers: [0, 1, 2, 4],
    explanation: 'Brand identity components: visual language (logo, colors, fonts), tone of voice, positioning/values, and packaging. The founder\'s personal style may influence brand but isn\'t itself a component — brands must survive beyond the founder.'
  },
  {
    id: 'q5_12', chapterId: 'ch5', type: 'mcq', difficulty: 'medium', xpReward: 15,
    text: 'What is "price elasticity" and why should marketers understand it?',
    options: [
      'How quickly you can change prices — important for agile campaigns',
      'How sensitive demand is to price changes — knowing this helps decide if promotions or premium positioning will grow revenue',
      'The difference between your price and competitors\'',
      'The flexibility of your ad budget relative to revenue'
    ],
    correctAnswers: [1],
    explanation: 'Price elasticity = % change in demand ÷ % change in price. Elastic products lose significant sales when prices rise (commodities). Inelastic products can raise prices without hurting volume (strong brands). Marketers need this to advise on discounting strategy, premium positioning, and promotional ROI.'
  },
  {
    id: 'q5_13', chapterId: 'ch5', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'Your brand has 35% market share but SOV is only 18%. A well-funded competitor just entered with aggressive spend. What is your strategic response?',
    options: [
      'Match their spend dollar for dollar',
      'Reduce ad spend and focus on product improvement',
      'Protect brand search, focus spend on highest LTV customer segments, invest in retention and loyalty to defend existing base while improving SOV efficiency',
      'Launch aggressive discount campaigns to compete on price'
    ],
    correctAnswers: [2],
    explanation: 'When outgunned on SOV, compete smarter: protect existing customers (cheaper than re-acquiring them), be precise about which segments you fight for, and improve creative efficiency so each rupee of SOV works harder. Matching spend and discounting both destroy margins — not a sustainable defense strategy.'
  },
  {
    id: 'q5_14', chapterId: 'ch5', type: 'mcq', difficulty: 'easy', xpReward: 10,
    text: 'What is "brand safety" in digital advertising?',
    options: [
      'Using strong passwords to protect your ad account',
      'Ensuring your ads don\'t appear next to content that could harm your brand reputation',
      'The process of trademarking your brand name',
      'Protecting ad creative from being copied by competitors'
    ],
    correctAnswers: [1],
    explanation: 'Brand safety tools (exclusion lists, content categories) prevent ads from appearing next to controversial content (hate speech, violence, fake news). A premium brand\'s ad appearing next to extremist content can cause serious reputational damage — brand safety controls are non-negotiable at scale.'
  },
  {
    id: 'q5_15', chapterId: 'ch5', type: 'scenario', difficulty: 'hard', xpReward: 25,
    text: 'The CEO wants to know: "Are we building a brand or just renting customers?" What metrics do you use to answer this question?',
    options: [
      'Total revenue and monthly ad spend',
      'Branded search growth, repeat purchase rate, NPS, organic traffic growth, and CAC trend over time',
      'Social media followers and engagement rate',
      'ROAS and CTR trends'
    ],
    correctAnswers: [1],
    explanation: 'Brand building shows up in: rising branded search (people looking for you by name), improving repeat rates (customers coming back), positive NPS (advocates creating word-of-mouth), organic traffic growth (content and reputation working), and declining CAC over time (trust reducing acquisition cost). These are the CEO-level brand health metrics.'
  },
]

export function getQuestionsForChapter(chapterId: string): Question[] {
  return QUESTIONS.filter(q => q.chapterId === chapterId)
}

export function getSmartRetryQuestions(
  questions: Question[],
  wrongIds: string[],
  totalCount = 15
): Question[] {
  if (wrongIds.length === 0) return questions.slice(0, totalCount)
  
  const wrong = questions.filter(q => wrongIds.includes(q.id))
  const correct = questions.filter(q => !wrongIds.includes(q.id))
  
  // Wrong questions appear more: fill 60% with wrong answers, 40% with others
  const wrongCount = Math.min(Math.ceil(totalCount * 0.6), wrong.length)
  const correctCount = totalCount - wrongCount
  
  const shuffledWrong = [...wrong].sort(() => Math.random() - 0.5).slice(0, wrongCount)
  const shuffledCorrect = [...correct].sort(() => Math.random() - 0.5).slice(0, correctCount)
  
  return [...shuffledWrong, ...shuffledCorrect].sort(() => Math.random() - 0.5)
}
