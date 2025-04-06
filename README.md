 # Bodoland Trivia Challenge 🧠

**An interactive quiz game for Reddit communities that tests users' knowledge about Bodoland's culture, geography, and history.**

## Overview

The Bodoland Trivia Challenge is a Devvit app designed to engage subreddit members in a fun and educational way. By presenting an interactive quiz directly within a Reddit post (using a Custom Post Type), it encourages participation, community building, and learning about Bodoland. Moderators can easily create new trivia sessions for their community to enjoy.

## Features

*   Presents a set of multiple-choice questions (defaults to 25 about Bodoland).
*   Real-time scoring and progress tracking within the post.
*   Displays the player's Reddit avatar and username during the quiz (fetches using `redditAPI`).
*   Allows users to share their results by creating a new, pre-formatted post.
*   Responsive design optimized for Reddit's desktop and mobile platforms.
*   Uses toast notifications for immediate feedback on answers.
*   Includes a "Play Again" button for replayability.

## Installation (For Subreddit Moderators)

1.  Ensure you are a moderator of the subreddit where you want to install the app.
2.  Navigate to your subreddit's **Mod Tools**.
3.  Scroll down the left sidebar and click on **"Devvit"** (or "Apps").
4.  Find **"Bodoland Trivia Challenge"** in the list of available apps (you might need to search or browse the store/your development apps).
5.  Click **"Install"**.
6.  Review the required permissions (see "Permissions Required" section below) and click **"Approve"**.

## Configuration

This app currently requires **no configuration** via the Devvit settings panel after installation. The quiz questions and functionality are pre-set within the app package. *(See "Customizing Questions" below if you wish to modify the source code).*

## How to Use

### For Moderators (Creating a Trivia Post)

This app adds a menu item for moderators to easily create new trivia posts.

1.  Go to the main page of the subreddit where the app is installed.
2.  Look for the **"Create Bodoland Trivia"** menu item. Based on `location: 'subreddit'`, this typically appears:
    *   In the dropdown menu under the main "Create Post" button.
    *   Or potentially within other subreddit-level action menus visible to moderators.
    *   *(The exact placement can sometimes vary slightly based on the Reddit interface).*
3.  Clicking this menu item will trigger the app to automatically create and submit a new post containing the interactive trivia game (`custom postType="Bodoland Trivia"`).
4.  **Recommendation:** Pin the generated trivia post to the top of your subreddit for better visibility.

### For Players (Playing the Trivia)

1.  Open the "Bodoland Trivia Challenge" post created by a moderator in the subreddit.
2.  The interactive quiz custom post type will load within the post frame.
3.  Read each question carefully.
4.  Click or tap on your chosen answer from the multiple-choice options.
5.  You will receive immediate feedback via a toast notification ("Correct!" or "Wrong answer").
6.  Continue through all the questions (default is 25).
7.  At the end, your final score will be displayed along with your Reddit username and avatar (if available).
8.  You will have an option to **"Share Score"**, which creates a new post in the subreddit displaying your achievement.
9.  You can use the **"Play Again"** button to restart the quiz.

## Permissions Required

This app requires the `redditAPI: true` configuration, enabling it to request the following permissions:

*   **`posts:submit`**: Required for the moderator action (`addMenuItem`) to create the initial trivia post and for players to use the "Share Score" functionality.
*   **`users:read`**: Required to fetch the player's username and avatar (`getUserById`) for display within the quiz results.
*   *(Implicit basic read permissions are also needed for `getCurrentSubreddit`)*

## Limitations

*   The set of questions is fixed in the standard installed version and cannot be customized by moderators through the UI.
*   Scores are tracked only for the current session; there is no persistent leaderboard across different playthroughs or users (other than the individual shared score posts).

## Support & Contact

If you encounter issues, have questions, or want to provide feedback on the Bodoland Trivia Challenge app:

*   Please contact the developer, u/RyanHazarika.
*   Consider creating an issue on the GitHub repository: [https://github.com/RyanHazarika/bodoland-trivia/issues](https://github.com/RyanHazarika/bodoland-trivia/issues)

---
## Technical Details (For Developers / Optional)

### Architecture
- Built using Devvit's functional components (`useState`, `useAsync`) and JSX syntax.
- Leverages Devvit features: `addMenuItem`, `addCustomPostType`, `ui.showToast`, `ui.navigateTo`.
- Uses Reddit API via `context.reddit` for user data and post creation.
- Implements client-side state management within the custom post render function.

### Key Components
1.  **Moderator Menu Item**: Trigger for creating trivia posts.
2.  **Custom Post Renderer**: Main UI logic for displaying questions, handling answers, state (score, current question, completion), fetching user info, and rendering results/sharing options.
3.  **Sharing Function**: Creates a new, formatted post summarizing the user's score.

### Data Management
- Questions are stored in the `TRIVIA_DATA` constant array directly within the main application code file (e.g., `main.ts` or `index.ts`). The required structure for each question object is:
  ```typescript
  {
    question: string,  // The text of the question
    options: string[4], // An array of 4 possible answer strings
    correct: number   // The index (0-3) of the correct answer in the options array
  }
    


**Customizing Questions (For Developers)**

If you wish to use this app's framework with your own set of trivia questions for your subreddit, you will need to modify the source code and deploy your own version of the app.

**Prerequisites:**

* Node.js and npm installed.
* Devvit CLI installed (`npm install -g devvit`).
* A Reddit account with developer permissions to deploy apps.

**Steps:**

1.  **Get the Source Code:** Clone or download the project repository from [https://github.com/RyanHazarika/bodoland-trivia](https://github.com/RyanHazarika/bodoland-trivia).
    ```bash
    git clone https://github.com/RyanHazarika/bodoland-trivia.git
    cd bodoland-trivia
    ```
2.  **Locate `TRIVIA_DATA`:** Open the main application code file (likely `src/main.tsx` or similar based on your project setup). Find the constant array named `TRIVIA_DATA` defined near the top of the file.
3. **Edit the Questions:** Modify this `TRIVIA_DATA` array. Add, remove, or edit the question objects directly within this array definition. Ensure each object strictly follows the format specified in the "Data Management" section above:
    * A `question` string.
    * An `options` array containing exactly four strings.
    * A `correct` number (0, 1, 2, or 3) indicating the index of the correct option.

 *   **Example Question Object:**
        ```typescript
        {
          question: "What is the primary color of the Reddit logo alien (Snoo)?",
          options: ["Blue", "OrangeRed", "White", "Black"],
          correct: 1 // Index 1 corresponds to "OrangeRed"
        }
        ```
4. **Save** your changes to the file.
5. **Deploy Your Version:**
    * Navigate to the project's root directory in your terminal.
    * Log in to Devvit if needed (`devvit login`).
    * Deploy the app using the command: `devvit deploy`
    * Follow the prompts. This will upload your modified version of the app under your developer account.
6. **Install Your Version:** Once deployed, you can install your customized trivia app onto your subreddit(s) using the standard installation steps (via Mod Tools -> Devvit), but selecting your newly deployed app instead of the original "Bodoland Trivia Challenge".


**Note:** Modifying the source code requires basic familiarity with TypeScript/JavaScript and the Devvit development workflow. You will be responsible for maintaining and managing your deployed version of the app.
