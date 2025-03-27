# Bodoland Trivia Challenge 🧠

An interactive quiz game for Reddit that tests users' knowledge about Bodoland's culture, geography, and history. Built with Devvit for Reddit communities.

## Features

- 25 carefully curated multiple-choice questions
- Real-time scoring and progress tracking
- User profile integration (avatar and username)
- Shareable results with customizable post
- Responsive design optimized for Reddit's platform
- Toast notifications for immediate feedback
- Play again functionality

## Installation

1. Requires Devvit CLI installed (`npm install -g devvit`)
2. Clone or download the project repository
3. Configure with your Reddit developer credentials
4. Deploy to your subreddit using `devvit deploy`

## Usage

### For Moderators
1. Navigate to your subreddit where the app is installed
2. Click the "Create Bodoland Trivia" option in the subreddit menu (moderator only)
3. The system will automatically generate a new trivia post
4. Pin the post for maximum visibility

### For Players
1. Open the Bodoland Trivia post in your subreddit
2. Read each question carefully
3. Select your answer from the provided options
4. Immediate feedback will show if you answered correctly
5. Progress through all 25 questions
6. View your final score and share it with the community

## Technical Details

### Architecture
- Built using Devvit's React-like component system
- Uses Reddit's native UI components and styling
- Implements client-side state management
- Leverages Reddit's API for user data and post creation

### Key Components
1. **Trivia Engine**:
   - Manages question flow and scoring
   - Handles answer validation
   - Tracks completion state

2. **User Integration**:
   - Fetches and displays user profile data
   - Handles anonymous users gracefully
   - Customizes shared score posts

3. **Sharing System**:
   - Generates attractive score cards
   - Creates new Reddit posts with results
   - Handles sharing state and errors

### Data Management
- Questions stored in a static array with structure:
  ```typescript
  {
    question: string,
    options: string[4],
    correct: number // 0-3 index