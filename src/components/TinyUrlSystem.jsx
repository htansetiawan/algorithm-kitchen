import React, { useState } from 'react';
import { 
  Book, 
  Target, 
  Database, 
  Lightbulb, 
  ExternalLink, 
  Link2,
  Shield,
  BarChart3,
  Zap,
  Globe
} from 'lucide-react';

const TinyUrlSystem = () => {
  const [activeSection, setActiveSection] = useState('story');
  const [showUrlSchema, setShowUrlSchema] = useState(false);
  const [showAnalyticsSchema, setShowAnalyticsSchema] = useState(false);

  const sections = [
    { id: 'story', name: 'The Story', icon: Book },
    { id: 'requirements', name: 'Requirements', icon: Target },
    { id: 'data-model', name: 'Data Model', icon: Database },
    { id: 'topics', name: 'Important Topics', icon: Lightbulb },
    { id: 'references', name: 'References', icon: ExternalLink }
  ];

  const requirements = [
    {
      id: 'functional',
      title: 'Functional Requirements',
      color: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
      items: [
        { 
          id: 'url-shortening', 
          title: 'URL Shortening & Encoding', 
          description: 'Users should be able to shorten long URLs into compact, shareable links. The system must generate unique short codes using Base62 encoding (a-z, A-Z, 0-9) to maximize the number of possible combinations in minimal characters. Each shortened URL should be guaranteed unique and collision-free. The encoding algorithm must be deterministic and reversible, allowing for efficient lookup and retrieval of original URLs.'
        },
        { 
          id: 'url-redirection', 
          title: 'Fast URL Redirection', 
          description: 'When users click a shortened URL, they should be redirected to the original URL instantly. The system must support HTTP 301 (permanent) and 302 (temporary) redirects based on user preferences. Redirection should happen within 100ms globally, requiring aggressive caching and geographic distribution. The system must handle edge cases like expired URLs, deleted URLs, and malicious URLs gracefully.'
        },
        { 
          id: 'custom-aliases', 
          title: 'Custom Short URLs', 
          description: 'Premium users should be able to create custom aliases for their shortened URLs (e.g., tiny.ly/my-blog instead of tiny.ly/xK9mL2). The system must validate custom aliases for uniqueness, check against reserved keywords, and prevent abuse. Custom URLs should follow the same performance characteristics as auto-generated ones, with additional validation layers for brand safety and content appropriateness.'
        },
        { 
          id: 'analytics', 
          title: 'Comprehensive Analytics', 
          description: 'Users need detailed analytics about their shortened URLs including click counts, geographic distribution, referrer data, device types, and temporal patterns. The system should provide real-time analytics for active campaigns and historical analytics for trend analysis. Data should be aggregated efficiently to support dashboard queries without impacting core redirection performance.'
        },
        { 
          id: 'expiration', 
          title: 'URL Lifecycle Management', 
          description: 'URLs should support expiration dates, allowing users to create time-limited links for campaigns or temporary content. The system must handle bulk operations for enterprise users, support URL editing (updating the destination), and provide soft deletion with recovery options. Expired URLs should show appropriate error pages with optional redirection to fallback URLs.'
        }
      ]
    },
    {
      id: 'non-functional',
      title: 'Non-Functional Requirements',
      color: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
      items: [
        { 
          id: 'scale', 
          title: 'Massive Scale Operations', 
          description: 'The system must handle 1 billion URL shortenings per month and 10 billion redirections per month. This requires horizontal scaling across multiple data centers, efficient database sharding, and intelligent load balancing. The architecture must support 10x growth without major redesign, handling traffic spikes during viral campaigns or major events. Peak traffic can reach 100,000+ requests per second.'
        },
        { 
          id: 'availability', 
          title: '99.9% Uptime Guarantee', 
          description: 'URL redirection is mission-critical for businesses and marketing campaigns. The system must maintain 99.9% availability with automatic failover, health checks, and redundant infrastructure. Downtime during peak business hours can cost customers millions in lost revenue, making reliability the top priority. The system should gracefully degrade functionality rather than completely fail.'
        },
        { 
          id: 'latency', 
          title: 'Sub-100ms Global Response', 
          description: 'Users expect instant redirection when clicking shortened URLs. The system must achieve sub-100ms response times globally through aggressive caching, CDN utilization, and geographic distribution. Slow redirections hurt user experience and SEO rankings. The 95th percentile response time should be under 50ms for cache hits.'
        },
        { 
          id: 'security', 
          title: 'Enterprise-Grade Security', 
          description: 'The system must prevent abuse, detect malicious URLs, and protect against spam and phishing attacks. Rate limiting, IP blocking, and ML-based content analysis are essential. URLs should be scanned for malware and inappropriate content. The system must comply with data protection regulations and provide audit trails for enterprise customers.'
        },
        { 
          id: 'durability', 
          title: 'Permanent Data Retention', 
          description: 'Once created, URLs should work indefinitely unless explicitly deleted by users. This requires robust backup strategies, cross-region replication, and disaster recovery plans. Data loss is unacceptable as it breaks existing links across the internet. The system must handle hardware failures, data center outages, and human errors without losing URL mappings.'
        }
      ]
    }
  ];

  const importantTopics = [
    {
      id: 'encoding-algorithm',
      title: 'Base62 Encoding: The Mathematics of Short URLs',
      description: 'How to generate billions of unique short codes efficiently',
      details: [
        'Base62 encoding is the foundation of URL shortening systems. Unlike hexadecimal (Base16) or binary (Base2), Base62 uses 62 characters: lowercase letters (a-z), uppercase letters (A-Z), and digits (0-9). This gives us the maximum character density while maintaining URL-safe characters that work across all systems.',
        'With 6 characters in Base62, we can generate 62^6 = 56.8 billion unique combinations. This might seem like a lot, but at scale, this becomes a constraint. Twitter\'s t.co uses 10 characters, giving them 62^10 = 839 quadrillion combinations - effectively unlimited for practical purposes.',
        'The encoding algorithm is surprisingly simple: take a unique integer ID from your database, and convert it to Base62. For example, ID 125 becomes "CB" in Base62. The beauty is that this is completely reversible - "CB" always maps back to 125, eliminating the need for database lookups during encoding.',
        'However, sequential IDs create predictable URLs (1, 2, 3 become "b", "c", "d"), which poses security risks. Users could enumerate all URLs by incrementing the short code. The solution is to either use a large random number space or apply a reversible hash function to scramble the sequence while maintaining uniqueness.',
        'Modern implementations use techniques like consistent hashing or pseudo-random number generation with collision detection. The key insight is balancing simplicity (mathematical conversion) with security (unpredictable URLs) while maintaining the reversibility that makes lookups fast.',
        'At massive scale, even collision detection becomes expensive. Some systems pre-generate millions of short codes during off-peak hours, storing them in a queue for instant allocation. This trades storage space for computation time, enabling sub-millisecond URL generation even under heavy load.'
      ]
    },
    {
      id: 'database-design',
      title: 'Database Architecture: Handling Billions of URLs',
      description: 'Scaling data storage for global URL shortening service',
      details: [
        'The core challenge in TinyURL\'s database design is the read-to-write ratio. For every URL created, it might be accessed thousands of times. This 1000:1 read ratio drives fundamental architectural decisions toward read optimization, even at the cost of write complexity.',
        'Sharding becomes essential beyond a few million URLs. The most effective strategy is sharding by the short URL hash. Since lookups always include the short URL, this ensures single-shard queries. A simple hash function like CRC32(short_url) % num_shards distributes load evenly and allows for consistent shard targeting.',
        'The database schema is deceptively simple but highly optimized. The URLs table contains: short_url (primary key), long_url, created_at, expires_at, and user_id. The short_url as primary key eliminates the need for additional indexes on the most frequent query pattern. Secondary indexes on user_id enable user dashboard queries.',
        'Write operations are batch-optimized. Instead of individual INSERT statements, the system buffers URL creations and commits them in batches of 1000-10000. This reduces database connection overhead and transaction costs. For high-volume enterprise customers, we maintain separate write queues to prevent interference with real-time redirection performance.',
        'Read replicas are crucial for global distribution. Master databases handle writes, while read replicas in different geographic regions serve redirection requests. The challenge is maintaining consistency - a newly created URL must be available for redirection immediately, even if replica lag exists.',
        'Archival strategies prevent database bloat. URLs older than 2 years with no recent access are moved to cold storage (like Amazon S3), keeping the active database lean and fast. A sophisticated tiered storage system ensures that viral content remains accessible while rarely-used URLs are archived without impacting performance.'
      ]
    },
    {
      id: 'caching-strategy',
      title: 'Multi-Layer Caching: Achieving Microsecond Lookups',
      description: 'How aggressive caching enables global sub-100ms redirections',
      details: [
        'Caching is the secret weapon that makes TinyURL systems feel instant. The most frequently accessed URLs are cached at multiple layers: in-memory application cache, Redis clusters, and CDN edge servers. Popular URLs like those shared on social media might be cached at all layers simultaneously.',
        'The application-layer cache uses LRU (Least Recently Used) eviction to keep the hottest URLs in memory. This cache typically holds 100,000-1,000,000 URLs, serving lookups in microseconds. For URLs not in application cache, Redis clusters provide the next layer with sub-millisecond access times.',
        'CDN caching is the most aggressive layer. Popular URLs are cached at hundreds of edge locations worldwide, enabling geographic proximity to users. The challenge is cache invalidation - when a user updates their URL destination, the change must propagate to all cache layers. CDN invalidation can take minutes, creating temporary inconsistency.',
        'Cache warming strategies pre-populate caches with likely-to-be-accessed URLs. Machine learning models analyze traffic patterns to predict which URLs will trend. For example, URLs shared by verified social media accounts or those in trending topics are automatically warmed across all cache layers.',
        'The 80/20 rule applies strongly to URL access patterns. Roughly 20% of URLs receive 80% of traffic, making caching extremely effective. Some viral URLs might be accessed millions of times from cache for every database query, creating dramatic performance and cost improvements.',
        'Cache coherence becomes complex in a distributed system. When a URL is updated or deleted, the system must invalidate caches across all layers and regions. This is typically done through event-driven cache invalidation, where database changes trigger cache flush operations across the entire infrastructure.'
      ]
    },
    {
      id: 'security-considerations',
      title: 'Security & Abuse Prevention: Protecting the Open Web',
      description: 'Preventing malicious use while maintaining service accessibility',
      details: [
        'URL shortening services are attractive targets for abuse because they obscure the final destination. Malicious actors use them to hide phishing sites, malware downloads, and inappropriate content. The system must balance openness with security, screening content without becoming a censorship bottleneck.',
        'Real-time URL scanning is the first line of defense. Every URL submitted for shortening is checked against blacklists of known malicious domains, phishing sites, and malware hosts. This happens in milliseconds using efficient data structures like Bloom filters that can quickly determine if a URL is definitely safe or potentially dangerous.',
        'Machine learning models analyze URL patterns to detect sophisticated attacks. Features include domain age, WHOIS information, subdomain patterns, and URL structure. For example, URLs with many subdomains, random character patterns, or newly registered domains receive higher suspicion scores and additional scrutiny.',
        'Rate limiting prevents automated abuse while allowing legitimate usage. The system implements multiple rate limiting strategies: per-IP limits for anonymous users, per-account limits for registered users, and adaptive limits that increase for trusted users. Sophisticated attackers using botnets require IP reputation scoring and geographic analysis.',
        'Link preview generation adds transparency without compromising performance. When users hover over shortened URLs, the system shows previews of the destination page title, description, and screenshot. This is computationally expensive, so previews are generated asynchronously and cached aggressively.',
        'Compliance and reporting systems handle abuse complaints and legal requests. The system maintains detailed logs of URL creation, including IP addresses, timestamps, and user agents. Enterprise customers get additional features like bulk URL analysis, whitelist management, and integration with corporate security tools.'
      ]
    },
    {
      id: 'analytics-system',
      title: 'Real-Time Analytics: Understanding Click Behavior at Scale',
      description: 'Building comprehensive analytics without impacting core performance',
      details: [
        'Analytics in URL shortening systems face a unique challenge: they must be comprehensive and real-time without slowing down redirections. Every click generates analytics data, but users expect instant redirections. The solution is asynchronous analytics processing that happens after the redirect.',
        'Event-driven architecture enables real-time analytics without performance impact. When a URL is accessed, the redirection happens immediately while click data is asynchronously written to analytics queues. This ensures that analytics never block user experience, even under extreme load.',
        'Geographic analytics provide valuable insights about global reach. The system captures IP addresses and uses GeoIP databases to determine country, region, and city-level statistics. This data helps marketers understand campaign reach and optimize content for different regions.',
        'Referrer analysis shows how users discover shortened URLs. The system captures and categorizes referrers: direct access, social media platforms, search engines, email clients, and messaging apps. This provides crucial insights into content distribution patterns and marketing effectiveness.',
        'Device and browser analytics help optimize user experience. The system analyzes User-Agent strings to determine device types (mobile, desktop, tablet), operating systems, and browser versions. This data informs decisions about mobile optimization and browser compatibility.',
        'Time-series analytics enable trend analysis and campaign optimization. Click data is aggregated into hourly, daily, and monthly buckets, allowing users to identify peak traffic times, seasonal patterns, and campaign performance trends. The challenge is maintaining query performance as historical data grows.',
        'Privacy considerations are increasingly important in analytics. The system must balance detailed insights with user privacy, implementing features like IP anonymization, data retention limits, and GDPR compliance. Users should have control over their data while still enabling valuable analytics for content creators.'
      ]
    },
    {
      id: 'global-distribution',
      title: 'Global Infrastructure: Serving URLs from Every Corner of Earth',
      description: 'Building a worldwide distributed system for universal accessibility',
      details: [
        'Global distribution is essential for TinyURL systems because users expect fast access regardless of their location. A user in Singapore clicking a URL should experience the same sub-100ms response time as a user in Silicon Valley. This requires sophisticated geographic distribution of both data and computation.',
        'DNS-based traffic routing is the foundation of global distribution. The system uses GeoDNS to direct users to the nearest data center based on their geographic location. This happens transparently - users always access the same domain, but DNS resolves to different IP addresses based on proximity.',
        'Data replication strategies balance consistency with performance. Critical data like URL mappings is replicated to all regions for fast local access. Analytics data might use eventual consistency, accepting temporary delays in exchange for better performance. The challenge is determining which data needs immediate consistency versus eventual consistency.',
        'Edge computing brings URL processing closer to users. Instead of routing all requests to central data centers, popular URLs are cached and processed at edge locations. This is particularly effective for viral content that generates massive traffic spikes from specific geographic regions.',
        'Cross-region failover ensures availability during regional outages. If the primary data center for a region becomes unavailable, traffic automatically routes to backup regions. This requires sophisticated health checking and automatic DNS updates to maintain service availability during disasters.',
        'Latency monitoring and optimization is continuous. The system constantly measures response times from different global locations, identifying performance bottlenecks and optimizing routing decisions. This includes monitoring third-party services like CDNs and DNS providers that impact overall user experience.'
      ]
    }
  ];

  const references = [
    {
      category: 'System Design Resources',
      links: [
        { title: 'Designing TinyURL - High Scalability', url: 'http://highscalability.com/blog/2011/4/18/designing-tinyurl.html' },
        { title: 'URL Shortener System Design', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR' },
        { title: 'Building a URL Shortener', url: 'https://github.com/donnemartin/system-design-primer#design-a-url-shortener' }
      ]
    },
    {
      category: 'Encoding & Algorithms',
      links: [
        { title: 'Base62 Encoding Explained', url: 'https://www.kn8.lt/blog/2009/11/17/base62-encoding/' },
        { title: 'Consistent Hashing', url: 'https://www.toptal.com/big-data/consistent-hashing' },
        { title: 'Short URL Generation Algorithms', url: 'https://stackoverflow.com/questions/742013/how-to-code-a-url-shortener' }
      ]
    },
    {
      category: 'Database & Scaling',
      links: [
        { title: 'Database Sharding Strategies', url: 'https://www.digitalocean.com/community/tutorials/understanding-database-sharding' },
        { title: 'Redis Caching Best Practices', url: 'https://redis.io/docs/manual/patterns/' },
        { title: 'SQL vs NoSQL for URL Shorteners', url: 'https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake' }
      ]
    },
    {
      category: 'Security & Analytics',
      links: [
        { title: 'URL Security Best Practices', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html' },
        { title: 'Rate Limiting Strategies', url: 'https://www.nginx.com/blog/rate-limiting-nginx/' },
        { title: 'Real-time Analytics Architecture', url: 'https://netflixtechblog.com/keystone-real-time-stream-processing-platform-a3ee651812a' }
      ]
    }
  ];

  const renderStory = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Link2 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">TinyURL System</h2>
            <p className="text-gray-300 text-sm">URL Shortening at Global Scale</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🌐 The URL Revolution</h3>
            <p className="text-gray-300 mb-4">
              In 2009, Kevin Gilbertson created TinyURL to solve a simple problem: URLs were getting too long for email and SMS. 
              What started as a weekend project handling a few dozen URLs per day has evolved into a critical internet infrastructure 
              serving billions of redirections monthly. URL shortening has become essential for social media, marketing campaigns, 
              and mobile communication.
            </p>
            <p className="text-gray-300 mb-4">
              Today, systems like bit.ly, t.co, and goo.gl (now shut down) handle billions of URL shortenings annually. 
              Behind that simple interface - paste a long URL, get a short one - lies sophisticated engineering handling massive scale, 
              global distribution, real-time analytics, and security challenges that would make any system architect lose sleep.
            </p>
            <p className="text-gray-300">
              This is the story of building a URL shortening service that can handle the entire internet's need for concise, 
              shareable links while maintaining millisecond response times, preventing abuse, and providing insights that 
              power modern digital marketing.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">📊 The Scale Challenge</h3>
            <p className="text-gray-300 mb-4">
              Consider the numbers: Bitly alone processes over 600 million link clicks per month. Twitter's t.co handles every 
              link shared on their platform - billions of URLs. During major events like the Super Bowl or viral social media 
              moments, traffic can spike to hundreds of thousands of redirections per second from a single short URL.
            </p>
            <p className="text-gray-300 mb-4">
              The challenge isn't just volume - it's the global nature of the service. A marketing campaign might create a URL 
              in New York, but it needs to redirect users instantly whether they're in Tokyo, London, or São Paulo. The system 
              must feel local everywhere while maintaining a single, global namespace for all short URLs.
            </p>
            <p className="text-gray-300">
              Unlike other services, URL shorteners have a unique constraint: they must work forever. Once a short URL is created 
              and shared, it becomes part of the permanent web infrastructure. Breaking a link breaks the internet a little bit, 
              so the system must be designed for indefinite reliability and durability.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">⚡ The Technical Marvel</h3>
            <p className="text-gray-300 mb-4">
              Building a URL shortener seems simple until you consider the engineering challenges. How do you generate billions 
              of unique short codes efficiently? How do you ensure that clicking a link works instantly, anywhere in the world? 
              How do you prevent malicious actors from using your service to spread malware or phishing attacks?
            </p>
            <p className="text-gray-300 mb-4">
              The architecture must excel at contradictory requirements: it needs to be write-optimized for URL creation, 
              read-optimized for redirections, analytically rich for insights, and security-focused for safety. It must scale 
              horizontally across data centers while maintaining data consistency and providing real-time analytics.
            </p>
            <p className="text-gray-300">
              The magic lies in the details: Base62 encoding algorithms, multi-layer caching strategies, geographic DNS routing, 
              asynchronous analytics processing, and ML-powered abuse detection. Every component must be optimized for both 
              massive scale and instant response times, creating one of the internet's most challenging distributed systems problems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-6">
      {requirements.map((category) => (
        <div key={category.id} className={`border rounded-lg p-6 ${category.color}`}>
          <h3 className="text-lg font-semibold mb-6">{category.title}</h3>
          <div className="space-y-6">
            {category.items.map((item) => (
              <div key={item.id} className="bg-gray-800/50 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-4">{item.title}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDataModel = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🗃️ The Data Architecture Foundation</h3>
        <p className="text-gray-300 mb-4">
          TinyURL's data model is elegantly simple yet highly optimized for extreme scale. The core challenge is designing a system 
          that can handle billions of URL mappings while maintaining sub-100ms lookup times globally. Every design decision must 
          consider the 1000:1 read-to-write ratio that characterizes URL shortening services.
        </p>
        <p className="text-gray-300 mb-4">
          The database design prioritizes read performance above all else. Short URLs serve as natural primary keys, eliminating 
          the need for additional indexes on the most frequent operation. The schema is denormalized strategically to minimize 
          join operations, and analytics data is separated to prevent interference with core redirection performance.
        </p>
        <p className="text-gray-300">
          Sharding, caching, and replication strategies ensure that the system can scale horizontally while maintaining the illusion 
          of a single, global database. The architecture must handle both the predictable load of daily operations and the 
          unpredictable spikes of viral content distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* URLs Table */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-cyan-300">URLs Table: The Core Mapping</h3>
            <button
              onClick={() => setShowUrlSchema(!showUrlSchema)}
              className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-300 text-sm hover:bg-cyan-500/30 transition-colors"
            >
              {showUrlSchema ? 'Hide Schema' : 'Show Schema'}
            </button>
          </div>
          
          <div className="mb-4 space-y-3">
            <p className="text-sm text-gray-300">
              <strong className="text-white">The Heart of URL Shortening:</strong> This table stores the fundamental URL mapping 
              that powers every redirection. Designed for maximum read performance with short_url as the primary key, eliminating 
              the need for additional indexes on the most common query pattern.
            </p>
            <p className="text-sm text-gray-300">
              <strong className="text-white">Key Design Decision:</strong> Using short_url as the primary key instead of an 
              auto-incrementing ID. This enables single-lookup redirections without joins or secondary index traversals, 
              reducing average query time from 5-10ms to sub-millisecond.
            </p>
          </div>
          
          {showUrlSchema && (
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-cyan-300">short_url</span>
                  <span className="text-gray-400">VARCHAR(10) PRIMARY KEY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">long_url</span>
                  <span className="text-gray-400">TEXT NOT NULL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">user_id</span>
                  <span className="text-gray-400">UUID</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">created_at</span>
                  <span className="text-gray-400">TIMESTAMP NOT NULL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">expires_at</span>
                  <span className="text-gray-400">TIMESTAMP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">click_count</span>
                  <span className="text-gray-400">BIGINT DEFAULT 0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">is_active</span>
                  <span className="text-gray-400">BOOLEAN DEFAULT TRUE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">custom_alias</span>
                  <span className="text-gray-400">BOOLEAN DEFAULT FALSE</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Sharding Strategy</h4>
                <p className="text-xs text-gray-300">URLs are sharded by hash(short_url) to ensure even distribution and enable single-shard lookups.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Index Optimization</h4>
                <p className="text-xs text-gray-300">Secondary index on (user_id, created_at) enables fast user dashboard queries.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Denormalization Trade-off</h4>
                <p className="text-xs text-gray-300">Click count is denormalized for fast dashboard loading, updated asynchronously.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Table */}
        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-amber-300">Analytics Table: Click Intelligence</h3>
            <button
              onClick={() => setShowAnalyticsSchema(!showAnalyticsSchema)}
              className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded text-amber-300 text-sm hover:bg-amber-500/30 transition-colors"
            >
              {showAnalyticsSchema ? 'Hide Schema' : 'Show Schema'}
            </button>
          </div>
          
          <div className="mb-4 space-y-3">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Asynchronous Analytics:</strong> Every click generates an analytics record, but this 
              happens asynchronously to avoid impacting redirection performance. The system prioritizes user experience over 
              analytics accuracy, accepting eventual consistency in exchange for speed.
            </p>
            <p className="text-sm text-gray-300">
              <strong className="text-white">Time-Series Optimization:</strong> Data is partitioned by date to enable efficient 
              queries and archival. Old analytics data is automatically moved to cheaper storage while maintaining query performance 
              for recent data.
            </p>
          </div>
          
          {showAnalyticsSchema && (
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-300">click_id</span>
                  <span className="text-gray-400">UUID PRIMARY KEY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300">short_url</span>
                  <span className="text-gray-400">VARCHAR(10) NOT NULL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300">clicked_at</span>
                  <span className="text-gray-400">TIMESTAMP NOT NULL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300">ip_address</span>
                  <span className="text-gray-400">INET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300">user_agent</span>
                  <span className="text-gray-400">TEXT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300">referrer</span>
                  <span className="text-gray-400">TEXT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300">country</span>
                  <span className="text-gray-400">VARCHAR(2)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300">city</span>
                  <span className="text-gray-400">VARCHAR(100)</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Event-Driven Processing</h4>
                <p className="text-xs text-gray-300">Analytics data flows through message queues to prevent blocking redirections.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-orange-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Privacy-First Design</h4>
                <p className="text-xs text-gray-300">IP addresses are hashed and can be anonymized for GDPR compliance.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Time-Based Partitioning</h4>
                <p className="text-xs text-gray-300">Monthly partitions enable efficient archival and maintain query performance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Design Principles */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-cyan-300 mb-4">🎯 Strategic Design Decisions</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Read-Optimized Architecture</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    With a 1000:1 read-to-write ratio, every design decision favors read performance. We use short URLs as primary 
                    keys, maintain aggressive caching, and denormalize data strategically to eliminate joins during redirections. 
                    Write operations are batched and processed asynchronously when possible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Global Distribution Strategy</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    URL mappings are replicated globally to ensure sub-100ms response times worldwide. We use eventual consistency 
                    for analytics data while maintaining strong consistency for URL mappings. Geographic sharding places data 
                    closer to users while maintaining a global namespace.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Analytics Separation</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Analytics data is completely separated from core URL storage to prevent analytical queries from impacting 
                    redirection performance. We use message queues for asynchronous processing and time-series databases optimized 
                    for analytical workloads.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Security-First Design</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Every URL is scanned for malicious content, rate limiting prevents abuse, and user data is protected with 
                    encryption and privacy controls. Security measures are designed to be invisible to legitimate users while 
                    effectively blocking malicious activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImportantTopics = () => (
    <div className="space-y-6">
      {importantTopics.map((topic) => (
        <div key={topic.id} className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">{topic.title}</h3>
            <p className="text-sm text-emerald-200">{topic.description}</p>
          </div>
          
          <div className="space-y-4">
            {topic.details.map((detail, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm text-gray-300 leading-relaxed">{detail}</p>
                {index < topic.details.length - 1 && (
                  <div className="w-full h-px bg-gray-700 my-3"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReferences = () => (
    <div className="space-y-6">
      {references.map((category) => (
        <div key={category.category} className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-teal-300 mb-4">{category.category}</h3>
          <div className="space-y-3">
            {category.links.map((link, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-lg hover:from-teal-500/20 hover:to-cyan-500/20 transition-all duration-300">
                <ExternalLink size={16} className="text-teal-400 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-white">{link.title}</h4>
                  <p className="text-sm text-teal-200">{link.url}</p>
                </div>
                <button
                  onClick={() => window.open(link.url, '_blank')}
                  className="px-3 py-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/50 rounded text-teal-300 text-sm hover:from-teal-500/30 hover:to-cyan-500/30 transition-all duration-300"
                >
                  Visit
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'story':
        return renderStory();
      case 'requirements':
        return renderRequirements();
      case 'data-model':
        return renderDataModel();
      case 'topics':
        return renderImportantTopics();
      case 'references':
        return renderReferences();
      default:
        return renderStory();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 p-6 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-600 rounded-lg">
              <Link2 size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">TinyURL System Design</h1>
              <p className="text-emerald-200 text-lg">Building a scalable URL shortening service at global scale</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-white/20 text-white'
                      : 'text-emerald-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {section.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default TinyUrlSystem; 