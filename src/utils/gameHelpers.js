/**
 * Game helper functions and constants for Millionaire Game
 */

// Game timing constants
export const GAME_CONSTANTS = {
  ANSWER_FEEDBACK_DELAY: 2000, // Time to show correct/wrong answer before next question
  FIFTY_FIFTY_REMOVE_COUNT: 2,
  AUDIENCE_CORRECT_VOTE_MIN: 60,
  AUDIENCE_CORRECT_VOTE_MAX: 90,
  AUDIENCE_WRONG_VOTE_MAX: 15,
};

// Helper profiles with their advice templates
export const HELPER_PROFILES = {
  marx: {
    name: 'Karl Marx',
    hints: [
      (answerId) => `Đồng chí ơi, tôi khá chắc đáp án là ${answerId}. Tin tôi đi!`,
      (answerId) => `Theo lý thuyết của tôi, câu trả lời phải là ${answerId}.`,
      (answerId) => `Tôi đã nghiên cứu vấn đề này, tôi nghĩ là ${answerId}!`,
      (answerId) => `${answerId} chính là đáp án đúng, tôi 90% chắc chắn!`,
    ],
  },
  lenin: {
    name: 'Vladimir Lenin',
    hints: [
      (answerId) => `Tôi tin rằng đáp án ${answerId} là chính xác, đồng chí!`,
      (answerId) => `Theo kinh nghiệm cách mạng của tôi, hãy chọn ${answerId}.`,
      (answerId) => `Đáp án ${answerId} phù hợp với nguyên lý duy vật biện chứng!`,
      (answerId) => `Tôi khuyên bạn nên chọn ${answerId}, đó là lựa chọn đúng đắn!`,
    ],
  },
  engels: {
    name: 'Friedrich Engels',
    hints: [
      (answerId) => `Bạn thân ơi, tôi và Marx đều cho rằng đáp án ${answerId} là chính xác!`,
      (answerId) => `Dựa trên nghiên cứu chung của chúng tôi, ${answerId} là đáp án đúng.`,
      (answerId) => `Tôi khá chắc chắn đáp án là ${answerId}, hãy tin tôi!`,
      (answerId) => `${answerId} - đây là kết luận từ lý thuyết của Marx và tôi!`,
    ],
  },
};

/**
 * Get a hint from a specific helper
 * @param {string} helperKey - Key for the helper (marx, lenin, engels)
 * @param {string} correctAnswerId - The ID of the correct answer
 * @returns {Object} Helper answer object with name and text
 */
export function getHintFromHelper(helperKey, correctAnswerId) {
  const profile = HELPER_PROFILES[helperKey];
  if (!profile) return null;

  const hints = profile.hints;
  const randomHint = hints[Math.floor(Math.random() * hints.length)];

  return {
    name: profile.name,
    text: randomHint(correctAnswerId),
  };
}

/**
 * Simulate audience votes for answers
 * @param {Array} answers - Array of answer objects
 * @returns {Object} Vote percentages keyed by answer ID
 */
export function simulateAudienceVotes(answers) {
  const votes = {};

  // Assign random votes
  answers.forEach((answer) => {
    if (answer.correct) {
      // Correct answer gets 60-90% of votes
      votes[answer.id] =
        GAME_CONSTANTS.AUDIENCE_CORRECT_VOTE_MIN +
        Math.random() *
          (GAME_CONSTANTS.AUDIENCE_CORRECT_VOTE_MAX -
            GAME_CONSTANTS.AUDIENCE_CORRECT_VOTE_MIN);
    } else {
      // Wrong answers get 0-15% each
      votes[answer.id] = Math.random() * GAME_CONSTANTS.AUDIENCE_WRONG_VOTE_MAX;
    }
  });

  // Normalize to 100% using largest remainder method
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const keys = Object.keys(votes);
  
  // Calculate percentages with remainder tracking
  const percentages = keys.map(key => ({
    key,
    value: (votes[key] / total) * 100,
    floored: Math.floor((votes[key] / total) * 100)
  }));
  
  // Calculate how many percent points we need to distribute
  const distributed = percentages.reduce((sum, p) => sum + p.floored, 0);
  const remainder = 100 - distributed;
  
  // Sort by fractional part (descending) and give +1 to top N
  percentages
    .sort((a, b) => (b.value - b.floored) - (a.value - a.floored))
    .slice(0, remainder)
    .forEach(p => p.floored++);
  
  // Apply results
  percentages.forEach(p => votes[p.key] = p.floored);

  return votes;
}

/**
 * Get answers to eliminate for 50:50 lifeline
 * @param {Array} answers - Array of answer objects
 * @returns {Array} Array of answer IDs to eliminate
 */
export function getFiftyFiftyAnswers(answers) {
  const wrongAnswers = answers.filter((a) => !a.correct);
  
  // Fisher-Yates shuffle to randomize which 2 wrong answers to remove
  const shuffled = [...wrongAnswers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled
    .slice(0, GAME_CONSTANTS.FIFTY_FIFTY_REMOVE_COUNT)
    .map((a) => a.id);
}
