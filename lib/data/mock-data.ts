// Define consistent image URLs for posts
export const POST_IMAGES = {
  webDev: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop",
  design: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop",
  photography: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  accessibility: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
  psychology: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=1200&auto=format&fit=crop",
  ai: "https://images.unsplash.com/photo-1677442135436-58d84b05258d?q=80&w=800&auto=format&fit=crop",
  newsletter: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=300&auto=format&fit=crop",
  crypto: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=300&auto=format&fit=crop",
  accessibility2: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=300&auto=format&fit=crop",
  wellness: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
  finance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
  digitalArt: "https://images.unsplash.com/photo-1561373926-76300a3c34f9?q=80&w=1200&auto=format&fit=crop",
  travel: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
  coding: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
}

// Define avatar URLs - using direct URLs that are guaranteed to work
export const AVATARS = {
  default: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop",
  sam: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
  jamie: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
  james: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
}

// Mock users data
export const USERS = [
  {
    id: 1,
    name: "Jamie Smith",
    username: "jamiesmith",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Tech enthusiast and writer. I love exploring new technologies and sharing my insights.",
    email: "jamie@example.com",
  },
  {
    id: 2,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Software developer with a passion for clean code and user experience.",
    email: "alex@example.com",
  },
  {
    id: 3,
    username: "samchen",
    name: "Sam Chen",
    avatar: AVATARS.sam,
    role: "UX Designer",
    bio: "Designer focused on creating intuitive user experiences",
  },
  {
    id: 4,
    username: "jamesmiller",
    name: "James Miller",
    avatar: AVATARS.james,
    role: "Travel Writer",
    bio: "Explorer and storyteller documenting adventures around the world",
  },
]

// Mock posts data
export const POSTS = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js",
    content:
      "<p>Next.js is a powerful React framework that makes building web applications simple and efficient...</p>",
    date: "Mar 10, 2025",
    author: USERS[0], // Reference the actual user object
    category: "Development",
    tags: ["react", "nextjs", "webdev"],
    image: "/placeholder.svg?height=600&width=800",
    views: 1243,
    likes: 89,
    comments: 24,
    readTime: 6,
    isSubscriberOnly: false,
    slug: "future-of-ai-content-creation",
    content: `
<p>The landscape of content creation is rapidly evolving with artificial intelligence at the forefront of this transformation. AI tools are now capable of generating articles, editing content, and even distributing it strategically across platforms.</p>

<h2>AI-Powered Writing Assistants</h2>
<p>Modern AI writing tools can now generate complete articles, suggest edits, and help creators overcome writer's block. These tools analyze vast amounts of data to understand context, tone, and audience preferences, making content more targeted and effective.</p>

<h2>Personalization at Scale</h2>
<p>One of the most significant advantages of AI in content creation is the ability to personalize content for different audience segments simultaneously. This level of customization was previously impossible at scale but is now becoming standard practice.</p>

<h2>Content Distribution and Analytics</h2>
<p>AI algorithms can determine the optimal time to publish content, the best platforms to use, and even predict how well certain pieces will perform. This data-driven approach maximizes reach and engagement.</p>

<h2>Ethical Considerations</h2>
<p>As AI becomes more integrated into content creation, ethical questions arise about originality, authenticity, and the role of human creativity. Finding the right balance between AI assistance and human input will be crucial moving forward.</p>

<h2>Conclusion</h2>
<p>The future of content creation will be a collaborative process between humans and AI. By embracing these technologies thoughtfully, creators can enhance their productivity, reach wider audiences, and focus more on creative strategy rather than routine tasks.</p>
`,
    timestamp: new Date("2025-03-15").getTime(),
    standingOvations: 12,
    comments: 23,
    featured: true,
    staffPick: false,
    image: POST_IMAGES.ai,
    isSubscriberOnly: false,
  },
  {
    id: 2,
    slug: "successful-newsletter-2025",
    title: "How to Build a Successful Newsletter in 2025",
    excerpt: "Strategies for growing and monetizing your newsletter in the age of information overload.",
    content: `
<p>Newsletters have evolved from simple email updates to powerful media platforms in their own right. In 2025, building a successful newsletter requires strategic thinking and consistent execution.</p>

<h2>Finding Your Niche</h2>
<p>The most successful newsletters serve specific communities with targeted content. Identifying an underserved niche or bringing a unique perspective to a popular topic can help you stand out in crowded inboxes.</p>

<h2>Building Your Audience</h2>
<p>Growing your subscriber base requires a multi-channel approach. Leverage social media, partnerships with complementary creators, and SEO-optimized landing pages to attract new readers consistently.</p>

<h2>Monetization Strategies</h2>
<p>Modern newsletters have diverse revenue streams beyond subscriptions, including sponsored content, affiliate marketing, digital products, and community memberships. The key is aligning monetization with your audience's needs and expectations.</p>

<h2>Automation and Personalization</h2>
<p>Utilizing AI tools for segmentation, personalization, and automated workflows can significantly improve engagement rates while reducing the time spent on administrative tasks.</p>

<h2>Conclusion</h2>
<p>The newsletter landscape continues to evolve, but the fundamentals remain: deliver consistent value, respect your readers' time and attention, and build genuine connections with your audience. With these principles as your foundation, your newsletter can thrive in 2025 and beyond.</p>
`,
    date: "Mar 10, 2025",
    timestamp: new Date("2025-03-10").getTime(),
    author: USERS[2],
    category: "Marketing",
    views: 982,
    likes: 64,
    standingOvations: 8,
    comments: 18,
    featured: true,
    staffPick: true,
    tags: ["newsletter", "marketing", "monetization", "content"],
    image: POST_IMAGES.newsletter,
    readTime: 6,
    isSubscriberOnly: false,
  },
  {
    id: 3,
    slug: "decentralized-social-media",
    title: "The Rise of Decentralized Social Media",
    excerpt: "How blockchain technology is changing the landscape of social networking platforms.",
    content: `
<p>Decentralized social media platforms built on blockchain technology are challenging the dominance of traditional centralized networks, offering users greater control over their data and content.</p>

<h2>The Problem with Centralization</h2>
<p>Conventional social media platforms control user data, content moderation, and monetization policies. This centralized power has led to concerns about privacy, censorship, and the exploitation of creator value.</p>

<h2>Blockchain-Based Alternatives</h2>
<p>Decentralized platforms distribute control across the network, allowing users to own their content, control their data, and participate in governance decisions. These platforms often incorporate tokenomics to reward users for their contributions.</p>

<h2>User-Owned Economies</h2>
<p>Many decentralized platforms feature native tokens that give users ownership stakes and governance rights. Content creators can receive direct compensation from other users without platform intermediaries taking large cuts.</p>

<h2>Challenges and Limitations</h2>
<p>Despite their promise, decentralized platforms face obstacles including scalability issues, user experience limitations, and the difficulty of moderating harmful content without centralized authority.</p>

<h2>The Future Landscape</h2>
<p>Rather than a complete replacement of existing platforms, we're likely to see a hybrid ecosystem where decentralized and centralized platforms coexist, each serving different user needs and preferences.</p>
`,
    date: "Mar 5, 2025",
    timestamp: new Date("2025-03-05").getTime(),
    author: USERS[1],
    category: "Crypto",
    views: 756,
    likes: 52,
    standingOvations: 5,
    comments: 14,
    featured: true,
    staffPick: false,
    tags: ["blockchain", "crypto", "social-media", "web3"],
    image: POST_IMAGES.crypto,
    readTime: 5,
    isSubscriberOnly: false,
  },
  {
    id: 4,
    slug: "accessibility-design-practices",
    title: "Designing for Accessibility: Best Practices",
    excerpt: "How to create inclusive digital experiences that work for everyone.",
    content: `
<p>Accessible design isn't just a nice-to-have—it's essential for creating truly inclusive digital products that serve all users, regardless of their abilities or circumstances.</p>

<h2>Understanding Accessibility</h2>
<p>Accessibility in digital design means ensuring that people with disabilities can perceive, understand, navigate, and interact with your product. This includes considerations for visual, auditory, motor, and cognitive impairments.</p>

<h2>Key Design Principles</h2>
<p>Effective accessible design follows principles like providing sufficient color contrast, offering text alternatives for non-text content, ensuring keyboard navigability, and creating predictable, consistent interfaces.</p>

<h2>Testing and Validation</h2>
<p>Regular accessibility testing should be integrated into your design and development process. This includes automated testing tools, manual checks, and ideally, user testing with people who have disabilities.</p>

<h2>Legal and Ethical Considerations</h2>
<p>Beyond being good practice, accessibility is increasingly a legal requirement in many jurisdictions. More importantly, it's an ethical obligation to ensure digital products don't exclude people based on disabilities.</p>

<h2>Business Benefits</h2>
<p>Accessible design often leads to better products for everyone. The same features that help users with disabilities frequently improve usability for all users, especially in challenging contexts like poor lighting or noisy environments.</p>
`,
    date: "Feb 28, 2025",
    timestamp: new Date("2025-02-28").getTime(),
    author: USERS[3],
    category: "Design",
    views: 2341,
    likes: 112,
    standingOvations: 15,
    comments: 32,
    featured: true,
    staffPick: false,
    tags: ["accessibility", "a11y", "design", "inclusion"],
    image: POST_IMAGES.accessibility2,
    readTime: 7,
    isSubscriberOnly: false,
  },
  {
    id: 5,
    slug: "mindfulness-digital-age",
    title: "Mindfulness in the Digital Age: Finding Balance in a Connected World",
    excerpt: "Techniques for maintaining mental health while staying productive in an always-on environment.",
    content: `
<p>In our hyperconnected world, finding moments of true presence and mental clarity has become increasingly challenging yet more important than ever for our wellbeing.</p>

<h2>The Digital Overwhelm</h2>
<p>Constant notifications, information overload, and the pressure to always be available are taking a toll on our mental health. Many people report increased anxiety, decreased attention spans, and difficulty being present in their daily lives.</p>

<h2>Mindfulness Practices</h2>
<p>Simple techniques like meditation, deep breathing exercises, and scheduled digital detoxes can help reclaim mental space. Even brief moments of mindfulness throughout the day can significantly reduce stress and improve focus.</p>

<h2>Digital Boundaries</h2>
<p>Creating clear boundaries around technology use—such as designated device-free times and spaces—helps maintain a healthier relationship with our digital tools. These boundaries should be personalized to fit individual needs and circumstances.</p>

<h2>Mindful Technology Use</h2>
<p>We can use technology itself more mindfully by being intentional about what we consume, utilizing focus modes and screen time limits, and choosing tools that enhance rather than detract from our wellbeing.</p>

<h2>The Productivity Paradox</h2>
<p>Counter to common belief, constant connectivity often reduces productivity. Regular breaks and periods of deep focus without digital interruptions typically lead to higher quality work and greater creative insights.</p>
`,
    date: "Feb 25, 2025",
    timestamp: new Date("2025-02-25").getTime(),
    author: USERS[2],
    category: "Wellness Journal",
    views: 1876,
    likes: 95,
    standingOvations: 10,
    comments: 27,
    featured: true,
    staffPick: true,
    tags: ["mindfulness", "wellness", "productivity", "mental-health"],
    image: POST_IMAGES.wellness,
    readTime: 6,
    isSubscriberOnly: false,
  },
  {
    id: 6,
    slug: "investing-uncertain-markets",
    title: "Investing Strategies for Uncertain Markets: Building Resilient Portfolios",
    excerpt: "How to protect and grow your investments during economic volatility and market downturns.",
    content: `
<p>Market uncertainty is inevitable, but with the right strategies, investors can build portfolios that not only withstand volatility but potentially benefit from it.</p>

<h2>Understanding Market Cycles</h2>
<p>Markets move in cycles, and recognizing the current phase can inform better investment decisions. While timing the market perfectly is impossible, understanding broader economic indicators provides valuable context for investment choices.</p>

<h2>Diversification Beyond the Basics</h2>
<p>True diversification goes beyond simply owning stocks and bonds. Consider allocations across geographies, sectors, asset classes, and investment styles to create truly resilient portfolios that can weather different economic conditions.</p>

<h2>Risk Management Techniques</h2>
<p>Implementing strategies like position sizing, stop-loss orders, and regular rebalancing helps control risk exposure. The goal isn't to eliminate risk entirely but to ensure it's intentional and aligned with your investment objectives.</p>

<h2>Alternative Investments</h2>
<p>Assets like real estate, commodities, private equity, and even certain digital assets can provide diversification benefits during market stress. These alternatives often have different correlation patterns with traditional markets.</p>

<h2>Psychological Preparedness</h2>
<p>Perhaps the most important aspect of navigating uncertain markets is managing your own psychology. Having a clear investment plan and the discipline to stick with it during volatility is crucial for long-term success.</p>
`,
    date: "Feb 20, 2025",
    timestamp: new Date("2025-02-20").getTime(),
    author: USERS[0],
    category: "Financial Freedom",
    views: 1987,
    likes: 93,
    standingOvations: 7,
    comments: 21,
    featured: true,
    staffPick: false,
    tags: ["investing", "finance", "markets", "portfolio"],
    image: POST_IMAGES.finance,
    readTime: 7,
    isSubscriberOnly: false,
  },
  {
    id: 7,
    slug: "renaissance-digital-art-nfts",
    title: "The Renaissance of Digital Art: NFTs and the Creator Economy",
    excerpt: "How blockchain technology is transforming the art world and empowering digital creators.",
    content: `
<p>Digital art has undergone a remarkable transformation in recent years, with blockchain technology and NFTs (Non-Fungible Tokens) creating new possibilities for artists and collectors alike.</p>

<h2>The NFT Revolution</h2>
<p>NFTs have solved the longstanding problem of digital scarcity, allowing digital artworks to have verifiable uniqueness and provenance. This technological innovation has created a new market for digital art that previously couldn't exist.</p>

<h2>Empowering Digital Artists</h2>
<p>For the first time, digital artists can sell their work directly to collectors without traditional gatekeepers. Smart contracts enable artists to receive royalties on secondary sales, creating ongoing revenue streams from their most successful works.</p>

<h2>Beyond Static Images</h2>
<p>The NFT space has expanded beyond simple images to include interactive experiences, generative art, virtual reality installations, and other innovative formats that push the boundaries of what digital art can be.</p>

<h2>Challenges and Criticisms</h2>
<p>The NFT art world faces legitimate challenges including environmental concerns (though many platforms have moved to more efficient systems), market volatility, and questions about long-term value preservation.</p>

<h2>The Future of Digital Art</h2>
<p>As the technology matures, we're likely to see greater integration between digital and traditional art worlds, with museums, galleries, and established institutions embracing these new forms alongside their traditional collections.</p>
`,
    date: "Feb 15, 2025",
    timestamp: new Date("2025-02-15").getTime(),
    author: USERS[1],
    category: "Creative Canvas",
    views: 1654,
    likes: 88,
    standingOvations: 9,
    comments: 19,
    featured: true,
    staffPick: true,
    tags: ["nft", "digital-art", "creator-economy", "blockchain"],
    image: POST_IMAGES.digitalArt,
    readTime: 4,
    isSubscriberOnly: false,
  },
  {
    id: 8,
    slug: "hidden-travel-gems",
    title: "Hidden Gems: Exploring the World's Most Underrated Travel Destinations",
    excerpt: "Discover breathtaking locations off the beaten path that deserve a spot on your travel bucket list.",
    content: `
<p>While popular destinations have their appeal, some of the most memorable travel experiences come from exploring lesser-known locations that offer authentic cultural immersion and natural beauty without the crowds.</p>

<h2>Eastern Europe's Treasures</h2>
<p>Countries like Georgia, Albania, and North Macedonia offer stunning landscapes, rich history, and warm hospitality at a fraction of the cost of Western European destinations. Ancient monasteries, pristine beaches, and mountain villages await intrepid travelers.</p>

<h2>Asia's Overlooked Wonders</h2>
<p>Beyond the tourist hotspots of Japan and Thailand lie destinations like Kyrgyzstan's nomadic highlands, Taiwan's east coast, and the ancient temples of Central Java—each offering unique experiences for travelers willing to venture further.</p>

<h2>Africa's Diverse Landscapes</h2>
<p>From the otherworldly landscapes of Socotra Island to the lush rainforests of São Tomé and Príncipe, Africa contains some of the world's most spectacular yet least-visited natural wonders and wildlife habitats.</p>

<h2>South America's Hidden Corners</h2>
<p>While Machu Picchu draws crowds, places like Colombia's Tatacoa Desert, Uruguay's Atlantic coast, and Bolivia's Jesuit Missions offer equally compelling experiences with far fewer visitors.</p>

<h2>Responsible Discovery</h2>
<p>As these destinations gain attention, responsible tourism becomes crucial. Supporting local businesses, respecting cultural norms, and minimizing environmental impact ensures these hidden gems remain special for generations to come.</p>
`,
    date: "Feb 10, 2025",
    timestamp: new Date("2025-02-10").getTime(),
    author: USERS[3],
    category: "Wanderlust",
    views: 1432,
    likes: 76,
    standingOvations: 6,
    comments: 16,
    featured: true,
    staffPick: false,
    tags: ["travel", "destinations", "adventure", "tourism"],
    image: POST_IMAGES.travel,
    readTime: 5,
    isSubscriberOnly: false,
  },
  {
    id: 9,
    slug: "future-web-development",
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    content: `
<p>The landscape of web development is constantly evolving, with new technologies and methodologies emerging at a rapid pace. As we look to the future, several key trends are shaping how we build and interact with the web.</p>

<h2>AI-Driven Development</h2>
<p>Artificial intelligence is revolutionizing how we approach web development. From code generation to automated testing, AI tools are enhancing developer productivity and enabling more sophisticated applications.</p>

<h2>WebAssembly</h2>
<p>WebAssembly (Wasm) continues to gain traction, allowing high-performance applications to run in the browser. This technology bridges the gap between web and native applications, opening new possibilities for web-based software.</p>

<h2>Edge Computing</h2>
<p>The shift toward edge computing is changing how we architect web applications. By moving computation closer to the user, we can achieve lower latency and better performance, especially for global applications.</p>

<h2>Conclusion</h2>
<p>The future of web development is bright, with technologies that enable more powerful, accessible, and performant applications. By staying informed about these trends, developers can position themselves at the forefront of innovation.</p>
`,
    date: "Feb 5, 2025",
    timestamp: new Date("2025-02-05").getTime(),
    author: USERS[0],
    category: "Technology",
    views: 1243,
    likes: 87,
    standingOvations: 12,
    comments: 23,
    featured: false,
    staffPick: false,
    tags: ["webdev", "future", "ai", "wasm", "edge"],
    image: POST_IMAGES.coding,
    readTime: 7,
    isSubscriberOnly: false,
  },
  {
    id: 10,
    slug: "minimalism-ui-design",
    title: "Minimalism in UI Design",
    excerpt: "How embracing minimalism can create more effective and beautiful user interfaces.",
    content: `
<p>Minimalism has become a dominant force in UI design, emphasizing simplicity, clarity, and functionality. This approach strips away unnecessary elements to focus on what truly matters to users.</p>

<h2>The Power of White Space</h2>
<p>White space, or negative space, is a fundamental element of minimalist design. It gives content room to breathe, improves readability, and creates a sense of elegance and sophistication.</p>

<h2>Typography as a Design Element</h2>
<p>In minimalist interfaces, typography often takes center stage. Careful selection of fonts, sizes, and spacing can communicate hierarchy and guide users through an interface without relying on decorative elements.</p>

<h2>Color with Purpose</h2>
<p>Minimalist color palettes are typically restrained, using color strategically to highlight important elements or convey meaning. This focused approach to color enhances usability and aesthetic appeal.</p>

<h2>Conclusion</h2>
<p>Embracing minimalism in UI design leads to interfaces that are not only visually appealing but also more functional and user-friendly. By focusing on what's essential, designers can create experiences that truly resonate with users.</p>
`,
    date: "Jan 30, 2025",
    timestamp: new Date("2025-01-30").getTime(),
    author: USERS[1],
    category: "Design",
    views: 982,
    likes: 64,
    standingOvations: 8,
    comments: 18,
    featured: false,
    staffPick: true,
    tags: ["design", "minimalism", "ui", "ux"],
    image: POST_IMAGES.design,
    readTime: 5,
    isSubscriberOnly: false,
  },
]

// Get featured posts
export const getFeaturedPosts = () => POSTS.filter((post) => post.featured)

// Get post by slug
export const getPostBySlug = (slug: string) => POSTS.find((post) => post.slug === slug)

// Get post by ID
export const getPostById = (id: number) => POSTS.find((post) => post.id === id)

// Get user by username
export const getUserByUsername = (username: string) => USERS.find((user) => user.username === username)

// Helper function to get a user by ID
export function getUserById(id: number) {
  return USERS.find((user) => user.id === id)
}

