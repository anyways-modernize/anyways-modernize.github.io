const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
const ROTATION_START = new Date(Date.UTC(2026, 5, 1));
const QUESTS_URL = '/data/weeklyquests.json';

function getUtcMonday(date) {
  const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utcDate.getUTCDay();
  const daysSinceMonday = day === 0 ? 6 : day - 1;

  utcDate.setUTCDate(utcDate.getUTCDate() - daysSinceMonday);
  return utcDate;
}

function getQuestIndex(date, questCount) {
  const currentWeek = getUtcMonday(date);
  const firstWeek = getUtcMonday(ROTATION_START);
  const weeksSinceStart = Math.floor((currentWeek - firstWeek) / MS_PER_WEEK);

  return ((weeksSinceStart % questCount) + questCount) % questCount;
}

function isValidQuest(quest) {
  return quest && typeof quest.text === 'string' && typeof quest.url === 'string';
}

function renderQuest(questElement, quest) {
  questElement.replaceChildren();
  questElement.append(document.createTextNode(quest.text));
  questElement.append(document.createElement('br'));
  questElement.append(document.createElement('br'));

  const link = document.createElement('a');

  link.href = quest.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = quest.url;

  questElement.append(link);
}

async function loadQuests() {
  const response = await fetch(QUESTS_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to load quests: ${response.status}`);
  }

  const quests = await response.json();

  if (!Array.isArray(quests) || quests.length === 0 || !quests.every(isValidQuest)) {
    throw new Error('Weekly quest data is invalid.');
  }

  return quests;
}

const questElement = document.getElementById('quest-text');

if (questElement) {
  loadQuests()
    .then((quests) => {
      const quest = quests[getQuestIndex(new Date(), quests.length)];

      renderQuest(questElement, quest);
    })
    .catch((error) => {
      console.error(error);
      questElement.textContent = 'Weekly quest is unavailable right now.';
    });
}
