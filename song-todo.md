# Spotify Song Analysis Feature - Implementation Plan

## Overview
This feature will allow users to connect their Spotify accounts, analyze their "Liked Songs" playlist, and receive an AI-generated personality analysis based on their music preferences. The implementation will follow the existing architecture pattern with a minimalist frontend and a Railway-hosted backend.

## Technical Requirements

### Spotify API Integration
- [ ] Register a Spotify Developer application to get API credentials
- [ ] Implement OAuth 2.0 authentication flow for Spotify
- [ ] Set up API endpoints to fetch user's liked songs

### Backend Implementation
- [ ] Create a new Spotify service for API interactions
- [ ] Set up data caching to minimize API calls
- [ ] Develop song analysis processing using AI (OpenAI API)
- [ ] Create secure session management for OAuth tokens

### Frontend Implementation
- [ ] Add Spotify section to stats.html page with "Connect Spotify" button
- [ ] Implement OAuth redirect handling in a new spotify.html page
- [ ] Create analysis results display following existing minimalist UI style
- [ ] Add loading states and error handling matching current patterns

## Detailed Implementation Steps

### 1. Spotify Developer Setup
- [x] Create a Spotify Developer account (https://developer.spotify.com/)
- [x] Register a new application with name "Yev Song Analysis"
- [x] Set redirect URI to `https://yevkollab.com/spotify/callback` (and localhost equivalent for development)
- [x] Store Client ID and Client Secret securely in environment variables

### 2. Backend API Development

#### Authentication Flow
- [x] Create `/api/spotify/auth` endpoint to generate authorization URL (similar to Twitter auth pattern)
- [x] Implement `/api/spotify/callback` to handle OAuth code exchange for access token
- [x] Set up token refresh mechanism for expired tokens
- [x] Store tokens securely in MongoDB (similar to Twitter stats)

#### Data Retrieval
- [x] Create `spotify.service.js` following existing service pattern
- [x] Implement `/api/spotify/liked-songs` endpoint with MongoDB caching
- [x] Include pagination to handle large libraries (Spotify limits to 50 songs per request)
- [x] Extract relevant song metadata (artist, title, genre, audio features)
- [~] ~~Add `spotify.job.js` for scheduled data refreshing~~ (Not needed - analysis is on-demand)

#### Analysis Engine
- [x] Create `/api/spotify/analyze` endpoint
- [x] Structure song data for AI processing
- [x] Integrate with OpenAI API to generate personality analysis
- [x] Implement fallback responses for API failures
- [x] Add debug endpoint `/api/spotify/debug` to match existing patterns

### 3. Frontend Development

#### Authentication UI
- [x] Create new header menu 'Spotify' 
- [x] Create new page 'spotify.html' with the similar structure as other pages (Header, info-text, devider)
- [x] Add there button 'Connect Spotify' 
- [x] Create authorization flow handling
- [x] Implement secure storage of session tokens in local storage (similar to current approach)
- [x] Add "Loading..." state during authentication matching existing style

#### Results UI
- [x] Show AI-generated personality analysis as text
- [x] Implement retry button for failures

### 4. Security and Privacy

- [x] Ensure secure storage of OAuth tokens
- [x] Implement proper CORS protection
- [x] Add rate limiting to prevent abuse
- [ ] Create privacy policy explaining data usage
- [ ] Set up data purging after analysis (don't persistently store user's Spotify data)

### 5. Testing

- [ ] Test OAuth flow with multiple accounts
- [ ] Verify API rate limit handling
- [ ] Test with various library sizes (small, medium, large collections)
- [ ] Check error cases (API unavailable, token expired)
- [ ] Perform cross-browser compatibility testing

### 6. Deployment

- [ ] Add required environment variables to Railway:
  - [ ] `SPOTIFY_CLIENT_ID`
  - [ ] `SPOTIFY_CLIENT_SECRET`
  - [ ] `SPOTIFY_REDIRECT_URI`
  - [ ] `OPENAI_API_KEY`
- [ ] Deploy backend changes to Railway
- [ ] Deploy frontend changes to existing host
- [ ] Register production redirect URI in Spotify Developer dashboard
- [ ] Perform end-to-end testing in production environment
- [ ] Update .env.dev with development variables

## Technical Considerations

### Spotify API Limitations
- Rate limits: 1 request per second for regular usage
- Authentication token validity: Access tokens expire after 1 hour
- API response format: Liked songs don't include detailed audio features (separate API call needed)

### AI Analysis Approach
- We'll need to gather:
  - Top genres
  - Audio features (danceability, energy, tempo, etc.)
  - Release years distribution
  - Language/country distribution of artists
- Analysis will use OpenAI API to generate insights based on these characteristics

### Data Privacy
- We won't store users' Spotify data permanently
- All analysis will be session-based
- Clear explanation to users about data usage

### Fallback Plan
- If Spotify API is unavailable: Display friendly error message
- If AI analysis fails: Offer basic statistical overview instead

## Dependencies

- Backend:
  - `spotify-web-api-node`: Spotify API wrapper for Node.js
  - `express-session`: For session management (already in use)
  - `openai`: OpenAI API client
  - `mongoose`: For MongoDB storage (already in use)

- Frontend:
  - No additional libraries required (following current vanilla JS pattern)

## Timeline Estimate

1. Spotify Developer Setup & Authentication Flow: 1 day
2. Backend API Development: 2-3 days
3. AI Analysis Integration: 1 day
4. Frontend Implementation: 1-2 days (simpler due to matching existing patterns)
5. Testing & Refinement: 1 day

Total: ~6-7 days of development time
