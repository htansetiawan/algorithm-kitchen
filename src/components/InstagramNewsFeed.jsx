import React, { useState } from 'react';
import { 
  Book, 
  Target, 
  Database, 
  Lightbulb, 
  ExternalLink, 
  Clock, 
  Image,
  ArrowUp,
  Eye
} from 'lucide-react';

const InstagramNewsFeed = () => {
  const [activeSection, setActiveSection] = useState('story');
  const [showPostSchema, setShowPostSchema] = useState(false);
  const [showFeedSchema, setShowFeedSchema] = useState(false);

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
          id: 'post-creation', 
          title: 'Post Creation & Media Processing', 
          description: 'When a user taps that camera button, they expect magic. Behind the scenes, we need to handle image uploads, video processing, automatic compression, and content moderation. The system must support multiple image formats, generate thumbnails, and apply filters - all while ensuring the content adheres to community guidelines. This isn\'t just about storing files; it\'s about creating a seamless creative experience that encourages authentic sharing.'
        },
        { 
          id: 'feed-generation', 
          title: 'Personalized Feed Generation', 
          description: 'This is the heart of Instagram\'s value proposition. Every time you open the app, the system needs to craft a unique story just for you. It considers your relationships, interests, engagement patterns, and even the time of day to decide what content will resonate most. The challenge is balancing relevance with discovery - showing you content you\'ll love while also introducing you to new accounts and ideas that might expand your world.'
        },
        { 
          id: 'follow-system', 
          title: 'Social Graph Management', 
          description: 'The follow system is Instagram\'s social DNA. It\'s not just about tracking who follows whom - it\'s about understanding relationship strength, reciprocal connections, and social signals. When someone follows you, it triggers a cascade of updates across multiple systems: notification services, feed algorithms, and recommendation engines. The system must handle the complexity of public vs private accounts, follower requests, and blocked users while maintaining real-time consistency.'
        },
        { 
          id: 'engagement', 
          title: 'Real-time Engagement Engine', 
          description: 'Every like, comment, and share is a signal that feeds back into the recommendation system. But it\'s more than just counting interactions - the system needs to understand engagement quality, detect spam, and maintain comment threads. When you like a post, it should feel instantaneous to you while also updating the post creator\'s notifications and potentially influencing thousands of other users\' feeds. This creates a living, breathing social ecosystem.'
        },
        { 
          id: 'timeline', 
          title: 'Intelligent Content Ranking', 
          description: 'Gone are the days of simple chronological feeds. Instagram\'s ranking system is a sophisticated machine learning pipeline that evaluates hundreds of signals per post. It considers your relationship with the poster, the content type, engagement velocity, and even contextual factors like location and time. The goal is to surface the most meaningful content first, creating a feed that feels personally curated rather than algorithmic.'
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
          title: 'Planetary Scale Operations', 
          description: 'Instagram operates at a scale that\'s hard to comprehend. With over 2 billion monthly active users and 500 million daily active users, the system processes more content in a day than most companies handle in a year. This means architecting for horizontal scaling from day one, using techniques like sharding, caching, and distributed computing. Every component must be designed to handle 10x growth without major architectural changes.'
        },
        { 
          id: 'availability', 
          title: 'Always-On Global Presence', 
          description: 'Instagram never sleeps. Users expect the app to work seamlessly whether they\'re in New York at noon or Tokyo at midnight. This requires a globally distributed architecture with multiple data centers, sophisticated load balancing, and automated failover systems. The challenge is maintaining consistency across regions while ensuring that users experience minimal latency regardless of their location.'
        },
        { 
          id: 'latency', 
          title: 'Split-Second Response Times', 
          description: 'In the attention economy, every millisecond matters. Users expect their feed to load instantly - any delay longer than 200ms feels sluggish and can lead to user drop-off. This drives architectural decisions around caching strategies, database optimization, and content delivery networks. The system must pre-compute as much as possible and position content close to users before they even request it.'
        },
        { 
          id: 'storage', 
          title: 'Infinite Storage Horizon', 
          description: 'With users uploading millions of photos and videos daily, storage isn\'t just about capacity - it\'s about intelligent data management. The system must efficiently store media files, implement tiered storage for different access patterns, and handle data replication across multiple regions. This includes smart compression, automated archival of older content, and ensuring data durability across different storage tiers.'
        },
        { 
          id: 'consistency', 
          title: 'Eventual Consistency Balance', 
          description: 'Instagram faces the classic CAP theorem challenge. With global distribution and high availability requirements, the system opts for eventual consistency rather than strong consistency. This means that when you post a photo, it might take a few moments to appear in all your followers\' feeds worldwide. The key is managing user expectations and ensuring that important operations (like posting) feel immediate while background synchronization happens seamlessly.'
        }
      ]
    }
  ];

  const importantTopics = [
    {
      id: 'feed-algorithm',
      title: 'The Feed Ranking Algorithm: Understanding Human Behavior at Scale',
      description: 'The heart of Instagram\'s personalization engine',
      details: [
        'Let\'s start with the fundamental challenge: how do you decide what 2 billion people want to see? Instagram\'s feed ranking algorithm is essentially a sophisticated prediction system that tries to answer one question: "What content will this specific user find most engaging right now?"',
        'The algorithm considers hundreds of signals, but let\'s focus on the most important ones. First, relationship signals - the system tracks who you interact with most frequently, how quickly you respond to their content, and whether you seek out their profile directly. If you always like your sister\'s photos within minutes of her posting, the algorithm learns that her content should be prioritized.',
        'Then there\'s content affinity - the system knows if you prefer videos over photos, if you engage more with food content on weekends, or if you\'re more active during specific times of day. This creates a dynamic preference model that evolves with your behavior.',
        'The recency factor is crucial but nuanced. It\'s not just about showing the newest content - it\'s about finding the sweet spot between fresh content and high-quality content. A post from 6 hours ago that\'s getting lots of engagement might rank higher than a post from 30 minutes ago with no engagement.',
        'The magic happens in the machine learning models that combine all these signals. Instagram uses deep learning networks trained on billions of user interactions to predict engagement probability. These models are constantly retrained as user behavior evolves, creating a feedback loop that makes the system smarter over time.'
      ]
    },
    {
      id: 'caching',
      title: 'Multi-Layer Caching: The Performance Multiplier',
      description: 'How Instagram serves billions of requests with sub-200ms latency',
      details: [
        'Caching at Instagram isn\'t just about speed - it\'s about survival. Without sophisticated caching, the system would collapse under its own load. Let\'s walk through the caching layers from the user\'s perspective.',
        'When you open Instagram, the first thing that loads is your feed. This data comes from Redis clusters that store pre-computed feed rankings for millions of active users. These feeds are refreshed every few hours by background jobs, ensuring that when you open the app, your personalized content is already waiting.',
        'The photos and videos you see are served from a global CDN with hundreds of edge locations. When someone in Tokyo uploads a photo, it\'s replicated to CDN nodes worldwide within minutes. This means when you view that photo from New York, it\'s served from a nearby edge server, not from Instagram\'s primary data centers.',
        'At the application level, we cache expensive computations like user relationship graphs and content recommendations. These caches are carefully invalidated when underlying data changes - if you follow someone new, the system needs to update your cached recommendation models.',
        'The database query result cache is perhaps the most critical layer. Common queries like "get user profile" or "get post engagement counts" are cached aggressively. The key insight is that most Instagram data doesn\'t change frequently, so we can cache it for minutes or even hours without affecting user experience.',
        'Cache invalidation is the hardest part. We use a combination of TTL (time-to-live) expiration and event-driven invalidation. When a user posts new content, it triggers a cascade of cache invalidations across multiple layers, but we do this asynchronously to avoid blocking the user\'s experience.'
      ]
    },
    {
      id: 'sharding',
      title: 'Database Sharding: Scaling Beyond Single Machine Limits',
      description: 'How Instagram distributes data across thousands of database servers',
      details: [
        'Database sharding is Instagram\'s solution to the fundamental problem of scale. No single database server can handle billions of users and their content, so we distribute the data across thousands of servers using a technique called sharding.',
        'The key decision is choosing the right sharding key. Instagram shards by user_id, which means all of a user\'s data - their posts, followers, feed preferences - lives on the same database shard. This enables efficient queries for user-specific operations like loading a profile or generating a timeline.',
        'We use consistent hashing to distribute users across shards. This algorithm ensures that when we add new database servers, we only need to move a small fraction of the data, minimizing disruption. The hash function takes a user_id and maps it to a specific shard, ensuring the same user always goes to the same shard.',
        'Cross-shard queries are the biggest challenge. When you want to see posts from users across different shards, we need to query multiple databases and merge the results. This is where feed pre-computation becomes crucial - instead of doing cross-shard queries in real-time, we pre-compute feeds during off-peak hours.',
        'Replication is essential for reliability. Each shard has multiple replicas across different data centers. If the primary shard fails, we can quickly failover to a replica. We use asynchronous replication to maintain performance, accepting eventual consistency in exchange for speed.',
        'Shard rebalancing is an ongoing operational challenge. As users grow more active or inactive, some shards become "hot" while others are "cold." We\'ve built sophisticated monitoring and automated rebalancing systems to maintain even load distribution across all shards.'
      ]
    },
    {
      id: 'media-storage',
      title: 'Media Storage: Handling Petabytes of Visual Content',
      description: 'The infrastructure behind Instagram\'s photos and videos',
      details: [
        'Instagram processes over 100 million photos and videos daily, creating unique challenges for storage and delivery. Unlike text data, media files are large, immutable, and accessed with highly variable patterns - a viral post might be viewed millions of times, while a personal photo might only be seen by a few friends.',
        'We use object storage systems like Amazon S3 and Google Cloud Storage as our primary media repositories. These systems provide virtually unlimited capacity, automatic replication, and built-in durability guarantees. Each uploaded media file is stored in multiple geographic regions to ensure availability and fast access worldwide.',
        'Image and video processing happens in real-time during upload. We automatically generate multiple versions of each image - thumbnails for feed previews, web-optimized versions for different screen sizes, and compressed versions for bandwidth-constrained networks. This processing pipeline can handle thousands of uploads per second.',
        'The compression algorithms we use are crucial for performance. We use advanced techniques like WebP for images and H.264/H.265 for videos, achieving 30-50% size reduction without noticeable quality loss. For mobile users on slower networks, we serve highly compressed versions that load instantly.',
        'Lazy loading is essential for performance. When you scroll through your feed, images are loaded just-in-time as they come into view. We preload the next few images in the background, creating a smooth scrolling experience while minimizing unnecessary data transfer.',
        'Progressive image loading provides instant visual feedback. When you tap on an image, we first show a low-resolution version that loads in milliseconds, then progressively enhance it with higher resolution details. This technique makes the app feel responsive even on slow connections.'
      ]
    },
    {
      id: 'real-time',
      title: 'Real-time Updates: Creating Living, Breathing Social Experiences',
      description: 'How Instagram delivers instant notifications and live updates',
      details: [
        'Real-time updates are what make Instagram feel alive. When someone likes your post, you get a notification within seconds. When you\'re scrolling through your feed, new posts appear seamlessly. This real-time experience is built on sophisticated infrastructure that handles millions of concurrent connections.',
        'WebSocket connections are the backbone of real-time communication. When you open Instagram, your app establishes a persistent connection to Instagram\'s servers. This connection stays open, allowing the server to push updates to your device instantly. Managing millions of concurrent WebSocket connections requires specialized servers and careful resource management.',
        'Server-sent events provide an alternative for web browsers. Unlike WebSockets, SSE is unidirectional - the server can push data to the client, but the client sends requests through normal HTTP. This is perfect for delivering feed updates and notifications without the complexity of bidirectional communication.',
        'Push notifications extend Instagram\'s reach beyond the app. When you receive a like or comment, Instagram sends a push notification through Apple\'s APNS or Google\'s FCM. These services handle the complexity of delivering notifications to devices that might be offline or have poor connectivity.',
        'Real-time engagement updates create a feedback loop that enhances the user experience. When you like a post, the like count updates instantly not just for you, but for everyone else viewing that post. This requires careful coordination between the real-time update system and the database to ensure consistency.',
        'Connection management is a critical operational challenge. Mobile devices frequently lose and regain connectivity, and the system must handle reconnections gracefully. We use exponential backoff algorithms and connection pooling to maintain stable connections while minimizing server load.'
      ]
    },
    {
      id: 'content-delivery',
      title: 'Content Delivery Network: Bringing Instagram to the World',
      description: 'Global infrastructure for instant content access',
      details: [
        'Instagram\'s CDN is like a global nervous system, with hundreds of edge servers positioned strategically around the world. When someone in Mumbai uploads a photo, it needs to be accessible instantly to their friend in São Paulo. This global distribution challenge requires sophisticated content delivery infrastructure.',
        'Geographic distribution is the foundation of our CDN strategy. We have edge servers in every major city worldwide, positioned as close as possible to our users. When you request an image, the CDN automatically routes your request to the nearest edge server, minimizing latency and improving loading times.',
        'Edge caching is more than just storing files - it\'s about predicting what content users will want. Our CDN uses machine learning to pre-position popular content at edge servers before users even request it. If a post is going viral in New York, we proactively cache it at edge servers worldwide.',
        'Media optimization happens at the edge. Different users have different device capabilities and network conditions. A user on a high-end phone with 5G gets full-resolution images, while a user on a basic phone with 2G gets heavily compressed versions. The CDN makes these optimization decisions in real-time.',
        'Load balancing across edge servers ensures no single server becomes overwhelmed. When a piece of content goes viral, the CDN automatically distributes the load across multiple servers. This prevents any single server from becoming a bottleneck and ensures consistent performance.',
        'Regional data centers provide redundancy and compliance. Different countries have different data residency requirements, and our CDN ensures that user data is stored and processed in compliance with local laws. This geographic distribution also provides natural disaster recovery - if one region goes offline, traffic automatically routes to other regions.'
      ]
    }
  ];

  const references = [
    {
      category: 'System Design Resources',
      links: [
        { title: 'Designing Instagram - High Scalability', url: 'http://highscalability.com/blog/2022/1/11/designing-instagram.html' },
        { title: 'Instagram Architecture', url: 'https://instagram-engineering.com/what-powers-instagram-hundreds-of-instances-dozens-of-technologies-adf2e22da2ad' },
        { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' }
      ]
    },
    {
      category: 'Database Design',
      links: [
        { title: 'Instagram Database Design', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2yDVZnQ8lG' },
        { title: 'Database Sharding', url: 'https://www.digitalocean.com/community/tutorials/understanding-database-sharding' },
        { title: 'NoSQL vs SQL', url: 'https://www.mongodb.com/nosql-explained/nosql-vs-sql' }
      ]
    },
    {
      category: 'Caching & Performance',
      links: [
        { title: 'Redis Caching Strategies', url: 'https://redis.io/docs/manual/patterns/' },
        { title: 'CDN Best Practices', url: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/' },
        { title: 'Database Optimization', url: 'https://use-the-index-luke.com/' }
      ]
    }
  ];

  const renderStory = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Image size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Instagram News Feed</h2>
            <p className="text-gray-300 text-sm">System Design Challenge</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">📱 The Journey Begins</h3>
            <p className="text-gray-300 mb-4">
              Imagine you're walking into Instagram's headquarters in 2010. Kevin Systrom and Mike Krieger just launched their photo-sharing app, 
              and something magical is happening. Users are uploading photos faster than anyone anticipated. Within hours, the simple chronological 
              feed becomes overwhelming. Users start missing posts from their closest friends because they're buried under hundreds of other posts.
            </p>
            <p className="text-gray-300 mb-4">
              Fast forward to today: Instagram serves over 2 billion monthly active users, processes 100 million photos and videos daily, 
              and somehow manages to show each user the most relevant content in their personalized feed. How did they transform from a simple 
              chronological timeline to this sophisticated, AI-driven content curation system?
            </p>
            <p className="text-gray-300">
              This is the story of building one of the world's most complex recommendation systems - a system that needs to understand 
              human relationships, predict content preferences, and deliver personalized experiences at massive scale, all while maintaining 
              the illusion of simplicity for the end user.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🎯 The Scale Challenge</h3>
            <p className="text-gray-300 mb-4">
              Let's put this in perspective. Every second, Instagram users upload about 1,000 photos and videos. That's 86 million pieces of content 
              per day. But here's the real challenge: each of those 2 billion users has a unique set of relationships, interests, and behaviors. 
              Sarah from New York cares about her college friends' travel photos and local coffee shop updates. Meanwhile, Ahmed from Cairo 
              is interested in football highlights and technology news.
            </p>
            <p className="text-gray-300 mb-4">
              The system needs to sift through billions of posts, analyze countless signals like who you interact with most, what types of content 
              you engage with, when you're most active, and even how much time you spend looking at different posts. Then it must serve up a 
              personalized feed that feels natural and engaging - all within 200 milliseconds of you opening the app.
            </p>
            <p className="text-gray-300">
              Think about it: that's faster than you can blink, and in that time, the system has made thousands of decisions about what content 
              will make you smile, connect with friends, or discover something new. This isn't just a technical challenge - it's about understanding 
              human psychology at scale.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🏗️ The Architecture Story</h3>
            <p className="text-gray-300 mb-4">
              Building Instagram's news feed is like constructing a digital city that never sleeps. At its foundation, we have massive data centers 
              storing petabytes of photos, videos, and user interactions. Above that, we've built a sophisticated network of microservices that 
              work together like a well-orchestrated symphony.
            </p>
            <p className="text-gray-300 mb-4">
              The magic happens in the ranking layer - this is where machine learning models trained on billions of interactions decide what you'll 
              see next. These models know that you always like your sister's photos, that you engage more with video content on weekends, and that 
              you're more likely to discover new accounts through your friend's activity.
            </p>
            <p className="text-gray-300">
              But here's what makes it truly remarkable: while all this complexity churns behind the scenes, the user experience remains beautifully 
              simple. You open the app, and your feed just works. That's the art of great system design - hiding incredible complexity behind 
              elegant simplicity.
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
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🏗️ The Data Architecture Story</h3>
        <p className="text-gray-300 mb-4">
          Designing Instagram's data model is like planning a city's infrastructure. Every decision ripples through the entire system, affecting 
          performance, scalability, and user experience. Let's walk through the key design decisions that enable Instagram to serve billions of 
          users efficiently.
        </p>
        <p className="text-gray-300 mb-4">
          The fundamental challenge is this: how do you design a database that can handle both the write-heavy nature of content creation and 
          the read-heavy nature of feed consumption? Traditional normalized databases would crumble under this load, so Instagram employs a 
          sophisticated mix of denormalization, caching, and strategic data duplication.
        </p>
        <p className="text-gray-300">
          The magic lies in the balance between consistency and performance. While perfect consistency is ideal in theory, Instagram 
          chooses strategic inconsistency to deliver the blazing-fast performance users expect. Let's explore how this works in practice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Posts Table */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-300">Posts Table: The Content Foundation</h3>
            <button
              onClick={() => setShowPostSchema(!showPostSchema)}
              className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-sm hover:bg-green-500/30 transition-colors"
            >
              {showPostSchema ? 'Hide Schema' : 'Show Schema'}
            </button>
          </div>
          
          <div className="mb-4 space-y-3">
            <p className="text-sm text-gray-300">
              <strong className="text-white">The Heart of Instagram:</strong> Every photo, video, and story starts here. This table is designed 
              for high-volume writes with millions of new posts daily, while also supporting the complex queries needed for feed generation.
            </p>
            <p className="text-sm text-gray-300">
              <strong className="text-white">Key Design Decision:</strong> We denormalize engagement counts (likes, comments) directly in the 
              posts table. While this violates traditional normalization principles, it's crucial for performance. When loading a feed, we 
              need these counts immediately - querying separate tables for each post would be prohibitively slow.
            </p>
          </div>
          
          {showPostSchema && (
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
                              <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-300">post_id</span>
                    <span className="text-gray-400">UUID PRIMARY KEY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">user_id</span>
                    <span className="text-gray-400">UUID NOT NULL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">content</span>
                    <span className="text-gray-400">TEXT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">media_url</span>
                    <span className="text-gray-400">VARCHAR(255)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">media_type</span>
                    <span className="text-gray-400">ENUM('image', 'video')</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">created_at</span>
                    <span className="text-gray-400">TIMESTAMP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">updated_at</span>
                    <span className="text-gray-400">TIMESTAMP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">likes_count</span>
                    <span className="text-gray-400">INT DEFAULT 0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">comments_count</span>
                    <span className="text-gray-400">INT DEFAULT 0</span>
                  </div>
                </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Sharding Strategy</h4>
                <p className="text-xs text-gray-300">Posts are sharded by user_id, ensuring all of a user's content lives on the same database shard for efficient queries.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Indexing Philosophy</h4>
                <p className="text-xs text-gray-300">Composite indexes on (user_id, created_at) enable lightning-fast user timeline queries.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Denormalization Trade-off</h4>
                <p className="text-xs text-gray-300">Engagement counts are duplicated here for read performance, updated asynchronously to maintain consistency.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feed Table */}
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-emerald-300">Feed Table: The Personalization Engine</h3>
            <button
              onClick={() => setShowFeedSchema(!showFeedSchema)}
              className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-emerald-300 text-sm hover:bg-emerald-500/30 transition-colors"
            >
              {showFeedSchema ? 'Hide Schema' : 'Show Schema'}
            </button>
          </div>
          
          <div className="mb-4 space-y-3">
            <p className="text-sm text-gray-300">
              <strong className="text-white">The Smart Feed:</strong> This is where Instagram's AI-powered personalization lives. Instead of 
              computing feeds on-demand (which would be impossibly slow), we pre-compute and store personalized feed rankings for each user.
            </p>
            <p className="text-sm text-gray-300">
              <strong className="text-white">The Challenge:</strong> With 2 billion users, storing complete feeds for everyone would require 
              enormous storage. So we use a hybrid approach: store the top 500-1000 most relevant posts per user, and compute the rest on-demand 
              from a smaller candidate set.
            </p>
          </div>
          
          {showFeedSchema && (
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
                              <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-emerald-300">feed_id</span>
                    <span className="text-gray-400">UUID PRIMARY KEY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">user_id</span>
                    <span className="text-gray-400">UUID NOT NULL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">post_id</span>
                    <span className="text-gray-400">UUID NOT NULL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">author_id</span>
                    <span className="text-gray-400">UUID NOT NULL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">score</span>
                    <span className="text-gray-400">DECIMAL(5,2)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">created_at</span>
                    <span className="text-gray-400">TIMESTAMP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">rank_position</span>
                    <span className="text-gray-400">INT</span>
                  </div>
                </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">ML-Powered Ranking</h4>
                <p className="text-xs text-gray-300">Each entry has a machine learning-generated score that determines its position in the user's feed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Batch Processing</h4>
                <p className="text-xs text-gray-300">Feed entries are computed in batches during off-peak hours to reduce real-time computation load.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-medium text-white text-sm">Temporal Optimization</h4>
                <p className="text-xs text-gray-300">Older entries are automatically archived to keep the active feed table lean and fast.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Design Principles */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-300 mb-4">🎯 Strategic Design Decisions</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowUp size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Read-Optimized Architecture</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Instagram's read-to-write ratio is roughly 100:1. For every post created, it's viewed hundreds of times. This drives our 
                    decision to denormalize data aggressively. We duplicate engagement counts, cache computed feeds, and maintain multiple 
                    indexes - all to ensure that reads are lightning fast, even if it means more complex write operations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Database size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Horizontal Scaling Philosophy</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    We shard by user_id to ensure that all of a user's data lives on the same database shard. This enables efficient queries 
                    for user profiles and timelines. When a user's shard becomes too large, we use consistent hashing to redistribute data 
                    with minimal disruption to the overall system.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Multi-Layer Caching</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    We implement caching at every layer: Redis for hot user data, CDN for media files, and application-level caching for 
                    computed results. The key insight is that cache invalidation is harder than cache population, so we design our 
                    caching strategy around acceptable staleness rather than perfect consistency.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Intelligent Indexing</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Our indexing strategy is surgical and purposeful. We create composite indexes for common query patterns, but avoid 
                    over-indexing which would slow down writes. The most critical index is (user_id, created_at DESC) which enables 
                    instant timeline queries for any user.
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
        <div key={topic.id} className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-amber-300 mb-2">{topic.title}</h3>
            <p className="text-sm text-amber-200">{topic.description}</p>
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
        <div key={category.category} className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">{category.category}</h3>
          <div className="space-y-3">
            {category.links.map((link, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300">
                  <ExternalLink size={16} className="text-cyan-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{link.title}</h4>
                    <p className="text-sm text-cyan-200">{link.url}</p>
                  </div>
                  <button
                    onClick={() => window.open(link.url, '_blank')}
                    className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded text-cyan-300 text-sm hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300"
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
    <div className="flex h-full">
      {/* Navigation */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <div className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-orange-500/20 border border-orange-500/50 text-orange-300'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{section.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default InstagramNewsFeed; 