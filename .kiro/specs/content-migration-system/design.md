# Design Document: Content Migration System

## Overview

The Content Migration System is designed as a comprehensive, legally-compliant content management solution for a React/TypeScript news website. The system prioritizes ethical content sourcing, robust content management, and seamless integration with existing site infrastructure.

The architecture follows a modular approach with clear separation between content sourcing, processing, validation, and presentation layers. All content operations are governed by strict legal compliance checks and proper attribution mechanisms.

## Architecture

The system follows a layered architecture pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   CMS Interface │  │  Public Website │  │  RSS Feeds   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Content Manager │  │ Legal Validator │  │ RSS Generator│ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Processing Layer                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │Image Processor  │  │Content Validator│  │Attribution   │ │
│  │                 │  │                 │  │Manager       │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   File System   │  │   Content DB    │  │  Image Store │ │
│  │ (newsData.ts,   │  │   (JSON/SQLite) │  │  (public/)   │ │
│  │  posts.ts)      │  │                 │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Core Interfaces

```typescript
interface ContentItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedDate: Date;
  updatedDate: Date;
  category: string;
  tags: string[];
  featuredImage?: ImageAsset;
  status: 'draft' | 'published' | 'archived';
  seo: SEOMetadata;
  attribution: AttributionData;
}

interface AttributionData {
  sourceUrl?: string;
  originalAuthor?: string;
  license: 'original' | 'cc-by' | 'cc-by-sa' | 'public-domain' | 'permission';
  licenseUrl?: string;
  attributionText: string;
  isOriginalContent: boolean;
}

interface ImageAsset {
  id: string;
  filename: string;
  altText: string;
  sizes: {
    thumbnail: string;
    medium: string;
    large: string;
    original: string;
  };
  attribution: AttributionData;
  metadata: {
    width: number;
    height: number;
    fileSize: number;
    format: string;
  };
}

interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl?: string;
  keywords: string[];
}
```

### Legal Validator Component

```typescript
class LegalValidator {
  private approvedSources: Map<string, SourceConfig>;
  
  async validateContentSource(url: string): Promise<ValidationResult> {
    // Check if source is in approved whitelist
    // Verify robots.txt compliance
    // Check for explicit licensing information
    // Validate attribution requirements
  }
  
  async checkLicenseCompliance(content: ContentItem): Promise<boolean> {
    // Verify license compatibility
    // Check attribution completeness
    // Validate usage rights
  }
}
```

### Content Manager Component

```typescript
class ContentManager {
  async createContent(data: Partial<ContentItem>): Promise<ContentItem> {
    // Validate required fields
    // Generate unique ID and slug
    // Set timestamps
    // Apply content formatting
  }
  
  async importContent(source: ContentSource): Promise<ImportResult> {
    // Legal validation first
    // Content processing and formatting
    // Image downloading and optimization
    // Attribution generation
  }
  
  async updateExistingDataFiles(): Promise<void> {
    // Update newsData.ts with new content
    // Update posts.ts with blog content
    // Preserve existing content structure
  }
}
```

### Image Processor Component

```typescript
class ImageProcessor {
  async processImage(imageUrl: string, attribution: AttributionData): Promise<ImageAsset> {
    // Download image with proper attribution
    // Generate multiple sizes
    // Optimize for web (WebP + JPEG fallback)
    // Extract metadata
    // Store in public folder structure
  }
  
  async optimizeImage(buffer: Buffer): Promise<OptimizedImages> {
    // Convert to WebP with JPEG fallback
    // Generate responsive sizes
    // Compress while maintaining quality
  }
}
```

### RSS Generator Component

```typescript
class RSSGenerator {
  async generateMainFeed(content: ContentItem[]): Promise<string> {
    // Create RSS 2.0 compliant feed
    // Include proper metadata
    // Handle content excerpts
  }
  
  async generateCategoryFeed(category: string, content: ContentItem[]): Promise<string> {
    // Generate category-specific feeds
    // Maintain feed consistency
  }
}
```

## Data Models

### Content Storage Structure

The system maintains compatibility with existing data structures while extending them:

```typescript
// Extended newsData.ts structure
interface NewsItem extends ContentItem {
  // Existing fields preserved
  // Additional CMS fields added
}

// Extended posts.ts structure  
interface BlogPost extends ContentItem {
  // Existing fields preserved
  // Additional CMS fields added
}
```

### File System Organization

```
src/
├── data/
│   ├── newsData.ts          # Extended with CMS content
│   ├── posts.ts             # Extended with blog content
│   └── cms/
│       ├── content.json     # CMS metadata and drafts
│       ├── sources.json     # Approved content sources
│       └── attribution.json # Attribution tracking
public/
├── images/
│   ├── news/               # News article images
│   ├── blog/               # Blog post images
│   └── thumbnails/         # Generated thumbnails
└── feeds/
    ├── rss.xml            # Main RSS feed
    └── category/          # Category-specific feeds
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas where properties can be consolidated:

- **Content validation properties** (2.2, 4.1, 4.4, 5.1) can be combined into comprehensive validation properties
- **Image processing properties** (3.1, 3.2, 3.4, 3.5) can be consolidated into fewer comprehensive properties  
- **RSS generation properties** (6.1, 6.3, 6.5) can be combined for feed completeness
- **Attribution properties** (1.3, 1.5, 3.3) can be unified around attribution completeness

This consolidation eliminates redundancy while ensuring comprehensive coverage.

### Core Correctness Properties

**Property 1: Legal content validation**
*For any* content import request, only content with valid licensing (Creative Commons, public domain, or explicit permission) should be accepted, and rejected content should be logged with specific reasons
**Validates: Requirements 1.1, 1.2**

**Property 2: Attribution completeness**
*For any* approved content, the system should automatically generate complete attribution metadata including source URL, author, license type, and attribution text
**Validates: Requirements 1.3, 1.5**

**Property 3: Content structure validation**
*For any* content being saved, it should conform to the existing NewsCard/NewsDetail TypeScript interfaces and include all required fields (title, excerpt, image, date, category)
**Validates: Requirements 2.2, 4.1, 4.4, 5.1**

**Property 4: Content preservation during updates**
*For any* content update operation, existing content should be preserved while new content is added, and content history should be maintained
**Validates: Requirements 2.3, 4.3**

**Property 5: Image processing completeness**
*For any* uploaded image, the system should generate optimized versions in multiple sizes (thumbnail, medium, large), maintain metadata, and organize files in the correct directory structure
**Validates: Requirements 3.1, 3.2, 3.4, 3.5**

**Property 6: Image licensing and attribution**
*For any* image imported from external sources, the system should verify licensing, download local copies, and maintain complete attribution information
**Validates: Requirements 3.3**

**Property 7: Content sanitization security**
*For any* HTML content input, the system should sanitize malicious content to prevent XSS attacks while preserving safe formatting and adding appropriate security attributes to external links
**Validates: Requirements 5.2, 5.3**

**Property 8: SEO and formatting consistency**
*For any* content title, the system should generate SEO-friendly URLs, and all formatted content should meet typography and length requirements
**Validates: Requirements 5.4, 5.5, 5.6**

**Property 9: RSS feed completeness and compliance**
*For any* published content, the RSS feeds should be automatically updated with proper metadata, comply with RSS 2.0/Atom 1.0 standards, and maintain correct timestamps
**Validates: Requirements 6.1, 6.3, 6.4, 6.5**

**Property 10: Batch import integrity**
*For any* batch import operation, the system should track progress, provide detailed error reporting for failures, maintain complete import logs, and prevent duplicate content
**Validates: Requirements 7.2, 7.3, 7.4, 7.6**

**Property 11: Ethical scraping compliance**
*For any* external content source, the system should respect robots.txt files, implement rate limiting, and only access whitelisted sources with verified licensing
**Validates: Requirements 1.4, 7.5**

**Property 12: Search and filtering accuracy**
*For any* search query or filter criteria, the system should return accurate results across all specified fields (title, content, metadata) and support filtering by date, author, category, and status
**Validates: Requirements 8.1, 8.2**

**Property 13: Content relationship integrity**
*For any* content with relationships to other articles, the system should maintain cross-references and ensure archived content is preserved but excluded from public feeds
**Validates: Requirements 8.4, 8.5**

## Error Handling

### Content Import Errors
- **Invalid licensing**: Reject import with detailed licensing requirements
- **Missing attribution**: Block publication until attribution is complete
- **Malformed content**: Provide specific validation errors and correction suggestions
- **Network failures**: Implement retry logic with exponential backoff
- **Rate limiting**: Respect source server limits and queue requests appropriately

### Image Processing Errors
- **Unsupported formats**: Convert to supported formats or reject with format requirements
- **Oversized images**: Compress or reject with size limits
- **Corrupted images**: Detect corruption and provide re-upload instructions
- **Attribution missing**: Block image use until proper attribution is provided

### Data Integrity Errors
- **Schema validation failures**: Provide specific field-level error messages
- **Duplicate content detection**: Offer merge or skip options for duplicates
- **File system errors**: Implement backup and recovery mechanisms
- **Database corruption**: Maintain data backups and integrity checks

### RSS Feed Errors
- **Invalid XML**: Validate and fix XML structure automatically where possible
- **Missing metadata**: Use default values or prompt for required information
- **Feed size limits**: Implement pagination for large feeds
- **Encoding issues**: Ensure proper UTF-8 encoding throughout

## Testing Strategy

### Dual Testing Approach

The system requires both unit testing and property-based testing for comprehensive coverage:

**Unit Tests** focus on:
- Specific examples of content validation and processing
- Integration points between components (CMS interface, file system, RSS generation)
- Edge cases like empty content, malformed data, and network failures
- Error conditions and recovery mechanisms

**Property Tests** focus on:
- Universal properties that hold for all content inputs
- Comprehensive input coverage through randomization
- Legal compliance validation across all content types
- Data integrity preservation during all operations

### Property-Based Testing Configuration

- **Testing Library**: Use `fast-check` for TypeScript/JavaScript property-based testing
- **Test Iterations**: Minimum 100 iterations per property test to ensure thorough coverage
- **Test Tagging**: Each property test must reference its design document property using the format:
  ```typescript
  // Feature: content-migration-system, Property 1: Legal content validation
  ```

### Testing Implementation Requirements

Each correctness property must be implemented by a single property-based test that:
- Generates random test data appropriate to the property
- Validates the universal behavior described in the property
- References the specific requirements it validates
- Runs sufficient iterations to catch edge cases

The testing strategy ensures both concrete bug detection through unit tests and general correctness verification through property-based testing, providing comprehensive coverage of the content migration system's complex requirements.

### Integration Testing

- **End-to-end content flow**: Test complete content journey from import to publication
- **CMS interface integration**: Verify seamless integration with existing React components
- **RSS feed generation**: Test feed updates and validation across all content types
- **Legal compliance workflow**: Test complete legal validation and attribution process