const quests = [
  "Martin's blog is worth a read. He goes deep on topics most people don't dare touch. https://intune.best/",
  "Johannes somehow finds the most efficient path through everything, first admin I know to uninstall SCCM at a bar and go fully passwordless before it was cool. https://johannesblog.com/",
  "MSEndpointMgr is one of the go-to community sites for endpoint admins. https://msendpointmgr.com/",
  "OpenIntuneBaseline, solid community-driver baseline for Intune. https://openintunebaseline.com/",
  "James Robinson, the mind behind OpenIntuneBaseline, who puts as much back into the community as his project does. https://skiptotheendpoint.co.uk/",
  "Lewis Barry,  someone who doesn't shy away from a challenge and tackles everything head on .https://conditionalaccess.uk/",
  "Rudy Ooms, the guy who looks at Intune troubleshooting from angles you never thought of. https://call4cloud.nl/about/",
  "AJ might be the cert guy, but his blog covers everything from PKI to Intune to security hardening. https://anthonyfontanez.com/",
  "Max tackles the Intune bugs and edge cases. If something is broken and weird, he's probably already written about it. https://azuretothemax.net/",
];


const EPOCH = new Date('2026-06-01T00:00:00');

const now = new Date();
const day = now.getDay();
const daysSinceMonday = (day === 0 ? 6 : day - 1);
const monday = new Date(now);
monday.setDate(now.getDate() - daysSinceMonday);
monday.setHours(0, 0, 0, 0);

const weeksSinceEpoch = Math.floor((monday - EPOCH) / (7 * 24 * 60 * 60 * 1000));
const index = weeksSinceEpoch % quests.length;

console.log('index:', index);
console.log('quest:', quests[index]);
document.getElementById('quest-text').textContent = quests[index];
