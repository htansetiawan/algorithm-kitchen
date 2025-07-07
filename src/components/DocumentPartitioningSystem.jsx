import React, { useState } from 'react';
import { 
  Book, 
  Target, 
  Database, 
  Lightbulb, 
  ExternalLink, 
  HardDrive,
  Network,
  RotateCcw,
  Shield,
  Activity,
} from 'lucide-react';

const DocumentPartitioningSystem = () => {
  const [activeSection, setActiveSection] = useState('story');
  const [showPartitionSchema, setShowPartitionSchema] = useState(false);
  const [showHashRingDiagram, setShowHashRingDiagram] = useState(false);

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
          id: 'document-storage', 
          title: 'Scalable Document Storage', 
          description: 'The system must store and retrieve billions of documents (text files, JSON documents, images, videos) across multiple nodes. Each document should have a unique identifier and support metadata storage including creation time, size, content type, and custom tags. The system must handle documents of varying sizes from small JSON objects (few KB) to large video files (several GB). Storage should be distributed across multiple nodes to prevent any single point of failure and enable horizontal scaling.'
        },
        { 
          id: 'consistent-partitioning', 
          title: 'Consistent Hash-Based Partitioning', 
          description: 'Documents must be distributed across storage nodes using consistent hashing to ensure even load distribution and minimal data movement during node additions/removals. The partitioning algorithm should be deterministic, allowing any node to calculate the correct storage location for any document. The system must support virtual nodes (vnodes) to improve load distribution and handle nodes with different storage capacities. Hash ring management should be automatic with no manual intervention required for rebalancing.'
        },
        { 
          id: 'high-availability', 
          title: 'High Availability Operations', 
          description: 'The system must maintain availability even when individual nodes fail. This requires replication of documents across multiple nodes (typically 3 replicas) with automatic failover mechanisms. Read and write operations should continue functioning even during node failures, with the system automatically routing requests to healthy replicas. The system must detect failed nodes quickly and initiate recovery procedures without manual intervention.'
        },
        { 
          id: 'crud-operations', 
          title: 'Complete CRUD Operations', 
          description: 'Users must be able to create, read, update, and delete documents through a RESTful API. Create operations should return the document ID and storage location. Read operations should fetch documents from the nearest healthy replica. Update operations must maintain consistency across all replicas. Delete operations should support both soft deletion (marking as deleted) and hard deletion (permanent removal). All operations should include proper error handling and retry mechanisms.'
        },
        { 
          id: 'replication-consistency', 
          title: 'Configurable Consistency Levels', 
          description: 'The system should support different consistency levels for read and write operations: strong consistency (all replicas must acknowledge), eventual consistency (allows temporary inconsistency), and quorum-based consistency (majority of replicas must agree). Users should be able to specify consistency requirements per operation. The system must handle read-your-writes consistency, ensuring users can immediately read their own writes. Conflict resolution mechanisms should handle concurrent updates to the same document.'
        }
      ]
    },
    {
      id: 'non-functional',
      title: 'Non-Functional Requirements',
      color: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
      items: [
        { 
          id: 'horizontal-scalability', 
          title: 'Linear Horizontal Scalability', 
          description: 'The system must scale linearly by adding more nodes. Adding a new node should automatically trigger rebalancing with minimal performance impact. The system should support thousands of nodes in a single cluster. Storage capacity and throughput should increase proportionally with the number of nodes. The partitioning scheme must distribute load evenly across all nodes regardless of cluster size. Auto-scaling capabilities should add/remove nodes based on storage utilization and traffic patterns.'
        },
        { 
          id: 'fault-tolerance', 
          title: '99.99% Availability Target', 
          description: 'The system must maintain high availability with automatic failure detection and recovery. Node failures should be detected within seconds using heartbeat mechanisms. Failed nodes should not impact overall system availability. The system must handle various failure scenarios: single node failure, network partitions, data center outages, and correlated failures. Recovery procedures should be automatic with minimal human intervention. Planned maintenance should be possible without downtime using rolling upgrades.'
        },
        { 
          id: 'performance', 
          title: 'High Performance Operations', 
          description: 'Read operations should complete within 10ms for small documents and 100ms for large documents. Write operations should be acknowledged within 50ms for strong consistency and 10ms for eventual consistency. The system should handle 100,000+ operations per second across the cluster. Batch operations should be supported for bulk document processing. Performance should remain consistent even during rebalancing operations. Query performance should not degrade significantly as data size increases.'
        },
        { 
          id: 'data-durability', 
          title: 'Enterprise Data Durability', 
          description: 'Documents must be protected against data loss with 99.999999999% (11 9s) durability. Multiple replicas should be stored across different failure domains (servers, racks, data centers). The system must use checksums to detect data corruption and automatic repair mechanisms. Backup and disaster recovery procedures should enable point-in-time recovery. Storage should be resilient to hardware failures, software bugs, and human errors. Regular data integrity checks should verify consistency across all replicas.'
        },
        { 
          id: 'operational-simplicity', 
          title: 'Self-Managing Operations', 
          description: 'The system should be largely self-managing with minimal operational overhead. Node provisioning and decommissioning should be automated. Load rebalancing should happen automatically without manual intervention. Monitoring and alerting should provide clear visibility into system health. Configuration changes should be possible without downtime. The system should provide detailed metrics for capacity planning and performance optimization. Troubleshooting should be facilitated through comprehensive logging and diagnostic tools.'
        }
      ]
    }
  ];

  const importantTopics = [
    {
      id: 'consistent-hashing',
      title: 'Consistent Hashing: The Foundation of Distributed Storage',
      description: 'Understanding how consistent hashing enables seamless scaling',
      details: [
        'Consistent hashing solves the fundamental problem of data distribution in distributed systems. Traditional hashing using hash(key) % N nodes works well until N changes. When nodes are added or removed, most data needs to be redistributed, causing massive data movement and potential downtime.',
        'The consistent hashing algorithm places both nodes and data on a conceptual "ring" using a hash function. The ring represents the entire hash space (typically 0 to 2^160 for SHA-1). Each node is assigned a position on the ring based on its identifier. Documents are placed at the first node encountered when moving clockwise around the ring from the document\'s hash position.',
        'When a node joins the cluster, it only affects the data previously owned by its successor on the ring. Similarly, when a node leaves, its data is redistributed only to its successor. This property ensures that only 1/N of the data moves when the cluster size changes, making scaling operations much more efficient.',
        'Virtual nodes (vnodes) enhance consistent hashing by assigning multiple positions on the ring to each physical node. Instead of each server having one position, it might have 100-500 virtual positions. This approach provides several benefits: better load distribution, faster rebalancing when nodes fail, and the ability to handle heterogeneous hardware where some nodes have more capacity.',
        'Hash ring management becomes critical in production systems. The system must maintain a consistent view of the ring across all nodes, handle simultaneous node additions/removals, and manage the transfer of data during rebalancing. Most implementations use a coordination service like Apache ZooKeeper or etcd to maintain the authoritative ring state.',
        'Real-world implementations often use variations of consistent hashing. Amazon\'s Dynamo uses consistent hashing with virtual nodes and preference lists. Apache Cassandra uses a token-based approach where each node is assigned a range of hash values. Understanding these variations is crucial for system design interviews and practical implementations.'
      ]
    },
    {
      id: 'partitioning-schemes',
      title: 'Data Partitioning Strategies: Horizontal vs Vertical Scaling',
      description: 'Comprehensive overview of data partitioning approaches',
      details: [
        'Horizontal partitioning (sharding) divides data by rows, distributing different records across multiple nodes. This is the most common approach for distributed document stores. Each partition contains a subset of the total data, and queries might need to access multiple partitions. The main challenge is choosing an effective partitioning key that distributes load evenly and supports efficient queries.',
        'Vertical partitioning divides data by columns or features, storing different attributes of the same entity on different nodes. For document stores, this might mean storing metadata on one cluster and document content on another. This approach is useful when different parts of the data have different access patterns, but it complicates queries that need multiple attributes.',
        'Range-based partitioning assigns data to partitions based on key ranges. For example, documents with IDs 1-1000 go to partition 1, 1001-2000 to partition 2, etc. This approach enables efficient range queries but can create hotspots if keys are not uniformly distributed. It\'s particularly problematic with sequential key generation where all new data goes to the same partition.',
        'Hash-based partitioning uses a hash function to determine the partition for each document. This approach distributes data more evenly but makes range queries expensive since related data might be scattered across partitions. The hash function must be consistent and provide good distribution properties to avoid hotspots.',
        'Directory-based partitioning maintains a lookup service that maps each key to its partition. This approach provides maximum flexibility and can support complex partitioning logic, but the directory service becomes a potential bottleneck and single point of failure. Most large-scale systems avoid this approach due to its complexity.',
        'Hybrid partitioning combines multiple approaches for different use cases. For example, a system might use hash-based partitioning for even distribution while maintaining secondary indexes using range-based partitioning for efficient queries. MongoDB uses this approach with its sharding strategy that supports both hash and range-based shard keys.',
        'Dynamic repartitioning allows the system to change partitioning strategies as data grows or access patterns change. This requires sophisticated data migration capabilities and careful coordination to maintain consistency. Systems like Google Spanner support automatic repartitioning based on load and data size metrics.'
      ]
    },
    {
      id: 'replication-strategies',
      title: 'Replication and Consistency: Balancing Availability with Consistency',
      description: 'How to maintain data consistency across distributed replicas',
      details: [
        'Master-slave replication designates one replica as the master that handles all writes, while slave replicas serve read requests. This approach provides strong consistency for writes but can create bottlenecks. When the master fails, a slave must be promoted, which can cause temporary write unavailability. The replication lag between master and slaves can lead to read inconsistencies.',
        'Master-master replication allows multiple nodes to accept writes for the same data. This improves write availability but introduces complex conflict resolution. When two masters receive conflicting updates, the system must have strategies to resolve conflicts: last-writer-wins, vector clocks, or application-specific resolution logic. This approach is used by systems like Amazon DynamoDB.',
        'Quorum-based replication requires a majority of replicas to agree on reads and writes. With N replicas, reads require R replicas to respond and writes require W replicas to acknowledge. Strong consistency is achieved when R + W > N. This approach provides a tunable balance between consistency and availability, as used in Apache Cassandra and Amazon Dynamo.',
        'Chain replication organizes replicas in a linear chain where writes flow from head to tail. Reads can be served from the tail for strong consistency or from any replica for eventual consistency. This approach simplifies failure handling since each replica only communicates with its immediate neighbors, but it can create latency as writes must traverse the entire chain.',
        'Eventual consistency accepts temporary inconsistencies in exchange for high availability. All replicas will eventually converge to the same state once network partitions heal and all updates propagate. This model is suitable for applications that can tolerate temporary inconsistencies, such as social media feeds or shopping carts.',
        'Strong consistency ensures that all replicas have the same data at any given time. This typically requires coordination protocols like two-phase commit or Paxos/Raft consensus. While providing the strongest guarantees, strong consistency can impact availability and performance, especially during network partitions.',
        'Causal consistency provides ordering guarantees for causally related operations while allowing concurrent operations to be reordered. This model is stronger than eventual consistency but weaker than strong consistency. It\'s particularly useful for applications like collaborative editing where the order of operations matters for related updates.'
      ]
    },
    {
      id: 'failure-detection',
      title: 'Failure Detection and Recovery: Building Resilient Systems',
      description: 'Mechanisms for detecting and recovering from various failure types',
      details: [
        'Heartbeat mechanisms are the foundation of failure detection in distributed systems. Nodes periodically send heartbeat messages to indicate they are alive and functioning. The absence of heartbeats within a timeout period indicates a potential failure. The challenge is tuning timeout values: too short causes false positives during network hiccups, too long delays failure detection.',
        'Gossip protocols enable decentralized failure detection where nodes share information about other nodes\' status. Each node maintains a list of other nodes and their last known state. Periodically, nodes exchange this information with randomly selected peers. This approach is highly scalable and resilient to network partitions, as used in Apache Cassandra and Amazon Dynamo.',
        'Phi Accrual failure detection adapts to network conditions by maintaining a suspicion level for each node rather than a binary alive/dead state. The suspicion level increases when expected heartbeats are missed and decreases when they arrive. This approach reduces false positives in variable network conditions and is used in systems like Apache Cassandra.',
        'Split-brain prevention is crucial when network partitions occur. If the cluster splits into multiple groups, each might believe it\'s the only functioning partition and continue operating independently. This can lead to data divergence and conflicts. Prevention strategies include quorum requirements, designated tie-breakers, or external coordination services.',
        'Automated recovery procedures must handle various failure scenarios without human intervention. When a node fails, the system should redirect traffic to healthy replicas, initiate data repair from other replicas, and potentially spawn replacement nodes. Recovery must be carefully orchestrated to avoid data loss or inconsistency.',
        'Cascading failure prevention is essential in large clusters where the failure of one node can trigger failures in other nodes. This might happen due to increased load on remaining nodes, resource exhaustion, or dependency chains. Circuit breakers, load shedding, and graceful degradation help prevent cascading failures.',
        'Disaster recovery planning addresses large-scale failures like data center outages or regional disasters. This requires cross-region replication, automated failover procedures, and data backup strategies. The system must be able to continue operating with reduced capacity while maintaining data consistency and availability.'
      ]
    },
    {
      id: 'load-balancing',
      title: 'Load Distribution: Ensuring Even Resource Utilization',
      description: 'Strategies for distributing load evenly across cluster nodes',
      details: [
        'Hash-based load balancing uses consistent hashing to distribute requests evenly across nodes. Each request is hashed to a position on the ring, and the responsible node is determined by the ring layout. This approach works well for uniform data access patterns but can create hotspots when certain keys are accessed much more frequently than others.',
        'Request routing strategies determine how clients discover which nodes to contact for specific documents. Options include client-side routing (clients calculate target nodes), proxy-based routing (load balancers route requests), or coordinator-based routing (designated nodes route requests). Each approach has trade-offs in terms of complexity, performance, and consistency.',
        'Hotspot detection and mitigation are crucial for maintaining balanced load. The system must monitor access patterns to identify hot keys or hot nodes. Mitigation strategies include request throttling, data replication to additional nodes, or dynamic repartitioning to spread hot data across more nodes.',
        'Adaptive load balancing adjusts routing decisions based on real-time node performance metrics. Instead of using only the hash ring, the system considers factors like CPU usage, memory consumption, disk I/O, and network bandwidth. This approach can provide better load distribution but adds complexity to the routing logic.',
        'Virtual node management optimizes load distribution by adjusting the number of virtual nodes per physical node. Nodes with higher capacity can be assigned more virtual nodes, giving them a larger share of the data and traffic. This approach helps balance load in heterogeneous clusters with nodes of different capabilities.',
        'Traffic shaping and admission control prevent overload by limiting the rate of incoming requests. When nodes become overwhelmed, the system can implement backpressure, request queuing, or selective request dropping. These mechanisms help maintain stability during traffic spikes while providing graceful degradation.',
        'Geographic load distribution considers the physical location of clients and data centers. Requests can be routed to the nearest data center to minimize latency, with automatic failover to other regions during outages. This approach improves user experience but complicates consistency management across regions.'
      ]
    },
    {
      id: 'data-migration',
      title: 'Data Migration and Rebalancing: Managing Data Movement',
      description: 'Efficient strategies for moving data during cluster changes',
      details: [
        'Incremental migration moves data in small batches to minimize impact on system performance. Instead of transferring all data at once, the system identifies which documents need to move and transfers them gradually. During migration, requests might need to check both old and new locations, requiring careful coordination to maintain consistency.',
        'Live migration allows data movement while the system continues serving requests. The process typically involves: stopping writes to the source, copying data to the destination, redirecting reads to the destination, and finally updating the hash ring. This approach minimizes downtime but requires sophisticated coordination.',
        'Merkle trees enable efficient detection of differences between replicas during migration or repair. Each node maintains a tree structure where leaf nodes represent data blocks and internal nodes contain hashes of their children. Comparing Merkle trees between nodes quickly identifies which data blocks need synchronization.',
        'Stream-based replication uses change logs to propagate updates during migration. Instead of copying static snapshots, the system maintains a log of all changes and replays them on the destination. This approach ensures consistency during migration and can be used for both initial data copy and ongoing synchronization.',
        'Bandwidth throttling controls the rate of data transfer to prevent migration from overwhelming network resources. The system monitors network utilization and adjusts transfer rates accordingly. This ensures that migration doesn\'t impact normal request processing while still completing in reasonable time.',
        'Coordination protocols manage the complex state transitions during migration. Multiple nodes must agree on migration start/completion, handle failures during migration, and ensure that clients are properly redirected. Most systems use consensus protocols like Raft or external coordination services like ZooKeeper.',
        'Migration validation ensures data integrity throughout the movement process. This includes checksumming transferred data, verifying replica counts, and confirming that all data has been successfully moved. Validation procedures help detect and correct issues before completing the migration.'
      ]
    }
  ];

  const references = [
    {
      category: 'Distributed Systems Theory',
      links: [
        { title: 'Consistent Hashing and Random Trees', url: 'https://www.akamai.com/us/en/multimedia/documents/technical-publication/consistent-hashing-and-random-trees-distributed-caching-protocols-for-relieving-hot-spots-on-the-world-wide-web-technical-publication.pdf' },
        { title: 'Amazon Dynamo Paper', url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf' },
        { title: 'Apache Cassandra Architecture', url: 'https://cassandra.apache.org/doc/latest/cassandra/architecture/index.html' }
      ]
    },
    {
      category: 'Partitioning Strategies',
      links: [
        { title: 'Database Sharding Patterns', url: 'https://www.digitalocean.com/community/tutorials/understanding-database-sharding' },
        { title: 'MongoDB Sharding Guide', url: 'https://docs.mongodb.com/manual/sharding/' },
        { title: 'Horizontal vs Vertical Scaling', url: 'https://blog.mongodb.com/post/sharding--introduction-and-overview' }
      ]
    },
    {
      category: 'Consistency and Replication',
      links: [
        { title: 'CAP Theorem Explained', url: 'https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/' },
        { title: 'Eventual Consistency', url: 'https://www.allthingsdistributed.com/2008/12/eventually_consistent.html' },
        { title: 'Raft Consensus Algorithm', url: 'https://raft.github.io/' }
      ]
    },
    {
      category: 'Implementation Examples',
      links: [
        { title: 'Google Bigtable Paper', url: 'https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf' },
        { title: 'Apache Kafka Partitioning', url: 'https://kafka.apache.org/documentation/#intro_concepts_and_terms' },
        { title: 'Redis Cluster Specification', url: 'https://redis.io/topics/cluster-spec' }
      ]
    }
  ];

  const renderStory = () => (
    <div className="space-y-8">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Book className="text-blue-400" />
          The Document Partitioning Challenge
        </h2>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Imagine you're the principal engineer at <span className="text-blue-400 font-semibold">CloudDocs</span>, 
            a rapidly growing cloud storage company. Your platform stores billions of documents for millions of users 
            worldwide, from small text files to large video content. What started as a simple file storage service 
            running on a few servers has evolved into a critical infrastructure supporting major enterprises.
          </p>

          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">The Growing Pains</h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong className="text-yellow-400">Year 1:</strong> Started with a single MySQL database and file server. 
                Life was simple - all documents in one place, easy to backup, straightforward to manage.
              </p>
              <p>
                <strong className="text-yellow-400">Year 2:</strong> Hit the storage limit. Added more hard drives, 
                upgraded the server. Query times started slowing down as the database grew to millions of records.
              </p>
              <p>
                <strong className="text-yellow-400">Year 3:</strong> The single server couldn't handle the load. 
                Added read replicas, implemented caching. But uploads were still bottlenecked by the single master server.
              </p>
              <p>
                <strong className="text-yellow-400">Year 4:</strong> Multiple server failures caused data loss. 
                Customers were furious. Manual database sharding became a nightmare to maintain.
              </p>
            </div>
          </div>

          <p>
            The wake-up call came during Black Friday when your largest enterprise customer, a global media company, 
            couldn't access their critical video assets due to a server failure. The incident caused them to lose 
            $50M in advertising revenue, and they threatened to terminate their $10M annual contract unless you 
            could guarantee 99.99% availability.
          </p>

          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4">The Crisis Moment</h3>
            <div className="space-y-3">
              <p className="text-red-200">
                <strong>The Problem:</strong> Your monolithic architecture couldn't handle the scale. Single points 
                of failure were everywhere. Manual sharding was error-prone and didn't distribute load evenly.
              </p>
              <p className="text-red-200">
                <strong>The Stakes:</strong> Lose major customers, face regulatory scrutiny for data loss, 
                or completely redesign your architecture to handle distributed storage at scale.
              </p>
            </div>
          </div>

          <p>
            You have 6 months to design and implement a distributed document storage system that can:
          </p>

          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-3">
              <Shield className="text-green-400 mt-1 flex-shrink-0" size={16} />
              Store billions of documents across hundreds of servers
            </li>
            <li className="flex items-start gap-3">
              <Activity className="text-green-400 mt-1 flex-shrink-0" size={16} />
              Maintain 99.99% availability even during server failures
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="text-green-400 mt-1 flex-shrink-0" size={16} />
              Automatically distribute load using consistent hashing
            </li>
            <li className="flex items-start gap-3">
              <Network className="text-green-400 mt-1 flex-shrink-0" size={16} />
              Scale horizontally by adding new servers seamlessly
            </li>
            <li className="flex items-start gap-3">
              <HardDrive className="text-green-400 mt-1 flex-shrink-0" size={16} />
              Handle various partitioning schemes for different use cases
            </li>
          </ul>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Your Mission</h3>
            <p className="text-blue-200">
              Design a distributed document storage system that uses consistent hashing for automatic partitioning, 
              supports multiple replication strategies for high availability, and can gracefully handle node 
              failures without data loss. The system must be so robust that adding or removing servers requires 
              zero downtime and minimal data movement.
            </p>
          </div>

          <p>
            This isn't just about building another database - you're creating the foundation for a multi-billion 
            dollar cloud infrastructure that will serve millions of users worldwide. Every decision you make about 
            partitioning, consistency, and failure handling will impact the company's future scalability and reliability.
          </p>
        </div>
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Target className="text-blue-400" />
        System Requirements
      </h2>
      
      {requirements.map((category) => (
        <div key={category.id} className={`rounded-lg border p-6 ${category.color}`}>
          <h3 className="text-xl font-bold mb-4">{category.title}</h3>
          <div className="space-y-4">
            {category.items.map((item) => (
              <div key={item.id} className="border-l-4 border-current border-opacity-50 pl-4">
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-sm opacity-90 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDataModel = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Database className="text-blue-400" />
        Data Model & Architecture
      </h2>

      {/* Consistent Hash Ring: The Mathematical Marvel */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">Consistent Hash Ring: The Mathematical Elegance</h3>
            <p className="text-blue-200 text-sm">How MIT's 1997 breakthrough solved distributed systems' biggest scaling problem</p>
          </div>
          <button
            onClick={() => setShowHashRingDiagram(!showHashRingDiagram)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
          >
            {showHashRingDiagram ? 'Hide' : 'Show'} Ring Diagram
          </button>
        </div>

        {/* The Problem Section */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-red-400 mb-4">🚨 The Original Problem (Pre-1997)</h4>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong>Traditional Hashing Crisis:</strong> With 5 servers using <code className="bg-gray-800 px-2 py-1 rounded text-red-300">hash(key) % 5</code>, 
              adding one server changes to <code className="bg-gray-800 px-2 py-1 rounded text-red-300">hash(key) % 6</code>.
            </p>
            <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
              <div className="text-red-400">DISASTER SCENARIO:</div>
              <div>• 1M cached items across 5 servers</div>
              <div>• Add 6th server → 83% of data now on "wrong" server</div>
              <div>• Cache hit rate drops from 95% to 17%</div>
              <div>• Database gets crushed by sudden load</div>
            </div>
            <p>This wasn't just inconvenient—when Amazon's cache hit rate drops by 1%, they lose millions in revenue.</p>
          </div>
        </div>

        {/* The MIT Solution */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-green-400 mb-4">🎓 The MIT Breakthrough (1997)</h4>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong>Karger, Lehman, Leighton, Panigrahy, Levine, and Lewin</strong> at MIT published 
              "Consistent Hashing and Random Trees" with a revolutionary insight:
            </p>
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 font-semibold text-center text-lg">
                "What if we don't hash to server numbers, but to positions on a circle?"
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-red-400 font-semibold mb-2">Traditional Impact:</div>
                <div className="text-sm">Add 1 server to N servers</div>
                <div className="text-sm text-red-300">→ (1 - 1/N) fraction moves</div>
                <div className="text-sm text-red-300">→ 5→6 servers: 83% moves!</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-green-400 font-semibold mb-2">Consistent Hashing Impact:</div>
                <div className="text-sm">Add 1 server to N servers</div>
                <div className="text-sm text-green-300">→ 1/N fraction moves</div>
                <div className="text-sm text-green-300">→ 5→6 servers: Only 17% moves!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Diagram */}
        {showHashRingDiagram && (
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="relative w-80 h-80 mx-auto mb-6">
              {/* Ring Circle */}
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full"></div>
              
              {/* Nodes */}
              {[
                { name: 'Node A', angle: 0, color: 'bg-green-500', load: '18%' },
                { name: 'Node B', angle: 72, color: 'bg-yellow-500', load: '22%' },
                { name: 'Node C', angle: 144, color: 'bg-red-500', load: '19%' },
                { name: 'Node D', angle: 216, color: 'bg-purple-500', load: '21%' },
                { name: 'Node E', angle: 288, color: 'bg-pink-500', load: '20%' }
              ].map((node, index) => {
                const radian = (node.angle * Math.PI) / 180;
                const x = Math.cos(radian) * 140 + 160;
                const y = Math.sin(radian) * 140 + 160;
                return (
                  <div key={index}>
                    <div
                      className={`absolute w-8 h-8 ${node.color} rounded-full border-2 border-white flex items-center justify-center`}
                      style={{
                        left: `${x - 16}px`,
                        top: `${y - 16}px`,
                      }}
                    >
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <span className="absolute text-xs text-white whitespace-nowrap font-semibold"
                          style={{
                            left: `${x - 20}px`,
                            top: `${y - 35}px`,
                          }}>
                      {node.name}
                    </span>
                    <span className="absolute text-xs text-gray-400 whitespace-nowrap"
                          style={{
                            left: `${x - 15}px`,
                            top: `${y + 25}px`,
                          }}>
                      {node.load}
                    </span>
                  </div>
                );
              })}
              
              {/* Documents */}
              {[
                { name: 'Doc1', angle: 36, color: 'bg-blue-300' },
                { name: 'Doc2', angle: 108, color: 'bg-blue-300' },
                { name: 'Doc3', angle: 180, color: 'bg-blue-300' },
                { name: 'Doc4', angle: 252, color: 'bg-blue-300' },
                { name: 'Doc5', angle: 324, color: 'bg-blue-300' }
              ].map((doc, index) => {
                const radian = (doc.angle * Math.PI) / 180;
                const x = Math.cos(radian) * 100 + 160;
                const y = Math.sin(radian) * 100 + 160;
                return (
                  <div
                    key={index}
                    className={`absolute w-3 h-3 ${doc.color} rounded border border-white`}
                    style={{
                      left: `${x - 6}px`,
                      top: `${y - 6}px`,
                    }}
                  >
                    <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-blue-300 whitespace-nowrap">
                      {doc.name}
                    </span>
                  </div>
                );
              })}
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-sm text-gray-400">Hash Ring</div>
                <div className="text-xs text-gray-500">0 to 2^160</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
                <div className="text-blue-400 font-semibold">Core Algorithm</div>
                <div className="text-gray-300 mt-2">Documents go to the first node clockwise from their hash position</div>
              </div>
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
                <div className="text-green-400 font-semibold">Load Balance</div>
                <div className="text-gray-300 mt-2">Each node gets ~20% of data with O(log N) variance</div>
              </div>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
                <div className="text-purple-400 font-semibold">Failure Impact</div>
                <div className="text-gray-300 mt-2">Only adjacent node affected when server fails</div>
              </div>
            </div>
          </div>
        )}

        {/* Virtual Nodes: The Hotspot Solution */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-yellow-400 mb-4">🔥 The Hotspot Problem & Virtual Nodes Solution</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-red-400 font-semibold mb-2">Hotspot Causes:</div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>• Non-uniform hash distribution</div>
                  <div>• Viral content access patterns</div>
                  <div>• Temporal data clustering</div>
                  <div>• Hardware heterogeneity</div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-green-400 font-semibold mb-2">Virtual Nodes Fix:</div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>• Multiple ring positions per server</div>
                  <div>• Variance decreases by factor of V</div>
                  <div>• Failure impact spreads across V servers</div>
                  <div>• Weighted by server capacity</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <div className="text-yellow-400 mb-2">Real-World VNode Configurations:</div>
              <div className="space-y-1 text-gray-300">
                <div>• <span className="text-blue-400">Cassandra:</span> 256 vnodes/server (default)</div>
                <div>• <span className="text-green-400">DynamoDB:</span> 512 vnodes/server</div>
                <div>• <span className="text-purple-400">Riak:</span> 64 vnodes/server</div>
                <div>• <span className="text-orange-400">Our System:</span> 100-500 vnodes/server (configurable)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mathematical Guarantees */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-purple-400 mb-4">📊 Mathematical Guarantees (Karger et al., 1997)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-blue-400 font-semibold mb-2">Balance</div>
              <div className="text-sm text-gray-300">Each server gets (1 ± O(√(log n / n))) fraction of data</div>
              <div className="text-xs text-gray-400 mt-2">With V vnodes: improves to O(√(log n / (nV)))</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-green-400 font-semibold mb-2">Smoothness</div>
              <div className="text-sm text-gray-300">Adding/removing servers moves O(1/n) fraction of data</div>
              <div className="text-xs text-gray-400 mt-2">Mathematically optimal - can't do better!</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-orange-400 font-semibold mb-2">Spread</div>
              <div className="text-sm text-gray-300">Each key stored on O(log n) servers with replication</div>
              <div className="text-xs text-gray-400 mt-2">Fault tolerance scales logarithmically</div>
            </div>
          </div>
        </div>
      </div>

      {/* Partition Schema */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-400">Document Partition Schema</h3>
          <button
            onClick={() => setShowPartitionSchema(!showPartitionSchema)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
          >
            {showPartitionSchema ? 'Hide' : 'Show'} Schema
          </button>
        </div>
        
        {showPartitionSchema && (
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-4">
            <div className="border border-blue-500/30 rounded p-3">
              <div className="text-blue-400 font-semibold mb-2">Document Table</div>
              <div className="text-gray-300 space-y-1">
                <div>document_id (UUID, Primary Key)</div>
                <div>content_hash (SHA-256)</div>
                <div>metadata (JSON)</div>
                <div>size_bytes (BIGINT)</div>
                <div>content_type (VARCHAR)</div>
                <div>created_at (TIMESTAMP)</div>
                <div>updated_at (TIMESTAMP)</div>
                <div>owner_id (UUID)</div>
                <div>replication_nodes (Array[UUID])</div>
              </div>
            </div>
            
            <div className="border border-green-500/30 rounded p-3">
              <div className="text-green-400 font-semibold mb-2">Node Registry</div>
              <div className="text-gray-300 space-y-1">
                <div>node_id (UUID, Primary Key)</div>
                <div>node_address (VARCHAR)</div>
                <div>hash_range_start (BIGINT)</div>
                <div>hash_range_end (BIGINT)</div>
                <div>virtual_nodes (JSON)</div>
                <div>capacity_bytes (BIGINT)</div>
                <div>status (ENUM: active, joining, leaving, failed)</div>
                <div>last_heartbeat (TIMESTAMP)</div>
              </div>
            </div>
            
            <div className="border border-purple-500/30 rounded p-3">
              <div className="text-purple-400 font-semibold mb-2">Replication Log</div>
              <div className="text-gray-300 space-y-1">
                <div>log_id (UUID, Primary Key)</div>
                <div>document_id (UUID, Foreign Key)</div>
                <div>operation (ENUM: create, update, delete)</div>
                <div>timestamp (TIMESTAMP)</div>
                <div>node_id (UUID)</div>
                <div>checksum (VARCHAR)</div>
                <div>replicated_to (Array[UUID])</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Design */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">RESTful API Design</h3>
        <div className="space-y-4 font-mono text-sm">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-green-400 font-semibold mb-2">Document Operations</div>
            <div className="space-y-2 text-gray-300">
              <div><span className="text-blue-400">POST</span> /api/v1/documents</div>
              <div><span className="text-yellow-400">GET</span> /api/v1/documents/&#123;id&#125;</div>
              <div><span className="text-orange-400">PUT</span> /api/v1/documents/&#123;id&#125;</div>
              <div><span className="text-red-400">DELETE</span> /api/v1/documents/&#123;id&#125;</div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-green-400 font-semibold mb-2">Cluster Management</div>
            <div className="space-y-2 text-gray-300">
              <div><span className="text-yellow-400">GET</span> /api/v1/cluster/status</div>
              <div><span className="text-yellow-400">GET</span> /api/v1/cluster/ring</div>
              <div><span className="text-blue-400">POST</span> /api/v1/cluster/nodes</div>
              <div><span className="text-red-400">DELETE</span> /api/v1/cluster/nodes/&#123;id&#125;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImportantTopics = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Lightbulb className="text-blue-400" />
        Important Topics Deep Dive
      </h2>
      
      {importantTopics.map((topic) => (
        <div key={topic.id} className="bg-gray-800 border border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">{topic.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{topic.description}</p>
          
          <div className="space-y-4">
            {topic.details.map((detail, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-gray-300 text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReferences = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <ExternalLink className="text-blue-400" />
        References & Further Reading
      </h2>
      
      {references.map((category) => (
        <div key={category.category} className="bg-gray-800 border border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">{category.category}</h3>
          <div className="space-y-3">
            {category.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-400" />
                  <span className="text-gray-300 group-hover:text-white">{link.title}</span>
                </div>
              </a>
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
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Database size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Document Partitioning & Consistent Hashing</h1>
              <p className="text-blue-200 text-lg">Building scalable distributed storage with high availability</p>
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
                      : 'text-blue-200 hover:bg-white/10 hover:text-white'
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

export default DocumentPartitioningSystem; 