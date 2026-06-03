const quests = [
  "This blog is still under construction. There will be little bugs;",
  "New post dropping soon. Stay tuned, traveler;",
  "Exploring Intune compliance policies tonight;",
  "Working on a guide about Entra soft delete;",
  "Polishing the village animation;",
];

const now = new Date();
const day = now.getDay();
const daysSinceMonday = (day === 0 ? 6 : day - 1);
const monday = new Date(now);
monday.setDate(now.getDate() - daysSinceMonday);
monday.setHours(0, 0, 0, 0);

// Use monday's timestamp as a simple seed
const seed = monday.getTime();
const index = Math.floor((seed / 1000000) % quests.length);
document.getElementById('quest-text').textContent = quests[index];
