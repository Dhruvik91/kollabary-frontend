# Discover Page Filter Implementation

## Overview
Comprehensive filter system for the influencer discover page with backend and frontend integration.

## Filters Implemented

### 1. **Search** (Text Input)
- **Field**: `search`
- **Type**: String
- **Searches**: Full name, username, bio
- **Backend**: ILIKE query on profile.fullName, profile.username, profile.bio, influencer.fullName
- **Edge Cases**: 
  - Empty string handled
  - Special characters escaped by TypeORM
  - Case-insensitive search

### 2. **Content Categories** (Multi-select)
- **Field**: `categories`
- **Type**: Array of Strings
- **Options**: Lifestyle, Fitness, Technology, Fashion, Beauty, Travel, Finance, etc.
- **Backend**: Array overlap query (`&&`) on influencer.categories
- **Edge Cases**:
  - Empty value/null = all categories
  - Overlap check for multi-matching

### 3. **Primary Platform** (Dropdown)
- **Field**: `platform`
- **Type**: String
- **Options**: All Platforms, Instagram, TikTok, YouTube, X (Twitter)
- **Backend**: JSONB text search on influencer.platforms
- **Edge Cases**:
  - Empty value = all platforms
  - Searches within JSONB structure

### 4. **Minimum Followers** (Number Input)
- **Field**: `minFollowers`
- **Type**: Number
- **Validation**: Min 0
- **Backend**: Query on denormalized `totalFollowers` field
- **Edge Cases**:
  - Empty input = no filter
  - Non-numeric input prevented
  - Negative numbers prevented

### 5. **Ranking Tier** (Dropdown)
- **Field**: `rankingTier`
- **Type**: String
- **Options**: 
  - All Ranks
  - Rising Creator
  - Emerging Partner
  - Established Influencer
  - Premium Collaborator
  - Elite Ambassador
  - Legendary Icon
- **Backend**: Exact match on influencer.rankingTier
- **Edge Cases**:
  - Empty value = all tiers
  - Exact string match required

### 6. **Minimum Rating** (Dropdown)
- **Field**: `minRating`, `maxRating`
- **Type**: Number (0-5)
- **Options**:
  - Any Rating (no filter)
  - 4+ Stars (minRating: 4, maxRating: 5)
  - 3+ Stars (minRating: 3, maxRating: 5)
  - 2+ Stars (minRating: 2, maxRating: 5)
- **Backend**: Comparison on `avgRating` field
- **Validation**: Min 0, Max 5

### 7. **Verification Status** (Toggle Button)
- **Field**: `verified`
- **Type**: Boolean
- **States**:
  - All Creators (undefined)
  - Verified Only (true)
- **Backend**: influencer.verified = :verified

## State Management

### Debouncing
- 500ms debounce on filter changes using `use-debounce`
- Prevents excessive API calls during typing
- Improves frontend performance and UX

### Infinite Scroll
- Implemented via `@tanstack/react-query`'s `useInfiniteQuery`
- Intersection Observer triggers next page fetch
- Meta information tracks total count and page progress
