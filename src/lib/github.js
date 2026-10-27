const GITHUB_API = "https://api.github.com";

function headers() {
  const h = {
    Accept: "application/vnd.github+json",
    "User-Agent": "developer-zodiac-card",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function gh(path) {
  const res = await fetch(`${GITHUB_API}${path}`, { headers: headers() });
  if (res.status === 404) {
    const err = new Error("GitHub user not found");
    err.statusCode = 404;
    throw err;
  }
  if (!res.ok) {
    const body = await res.text();
    const err = new Error(`GitHub API error (${res.status}): ${body.slice(0, 200)}`);
    err.statusCode = res.status === 403 ? 429 : 502;
    throw err;
  }
  return res.json();
}

function guessRole(languages) {
  const top = languages[0]?.name?.toLowerCase() ?? "";
  // Short labels — pin/SVG both clip easily with long "…Developer" strings
  const map = {
    python: "Backend Dev",
    go: "Backend Dev",
    rust: "Systems Dev",
    java: "Backend Dev",
    kotlin: "Mobile Dev",
    swift: "Mobile Dev",
    typescript: "Full-Stack Dev",
    javascript: "Full-Stack Dev",
    "c#": "Software Eng",
    "c++": "Systems Dev",
    c: "Systems Dev",
    php: "Web Dev",
    ruby: "Web Dev",
    dart: "App Dev",
    html: "Frontend Dev",
    css: "Frontend Dev",
    shell: "DevOps",
    dockerfile: "DevOps",
  };
  return map[top] || "Software Dev";
}

export async function fetchGitHubProfile(username) {
  const user = await gh(`/users/${encodeURIComponent(username)}`);
  const repos = await gh(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`,
  );

  const languageBytes = {};
  let stars = 0;
  let forks = 0;
  let openIssues = 0;

  for (const repo of repos) {
    if (repo.fork) continue;
    stars += repo.stargazers_count || 0;
    forks += repo.forks_count || 0;
    openIssues += repo.open_issues_count || 0;
    if (repo.language) {
      languageBytes[repo.language] = (languageBytes[repo.language] || 0) + 1;
    }
  }

  const languages = Object.entries(languageBytes)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  const createdAt = new Date(user.created_at);
  const ageDays = Math.max(
    1,
    Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)),
  );

  return {
    username: user.login,
    name: user.name || user.login,
    bio: user.bio || "",
    avatarUrl: user.avatar_url,
    followers: user.followers || 0,
    following: user.following || 0,
    publicRepos: user.public_repos || 0,
    createdAt: user.created_at,
    ageDays,
    stars,
    forks,
    openIssues,
    languages,
    role: guessRole(languages),
    mostActiveRepo: repos.find((r) => !r.fork)?.name || null,
  };
}

/** Days in a row with contributions, ending today (or yesterday if today is still empty). */
export function currentStreak(days) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let i = sorted.length - 1;
  if (i >= 0 && sorted[i].count === 0) i--;
  let streak = 0;
  for (; i >= 0 && sorted[i].count > 0; i--) streak++;
  return streak;
}

/**
 * Last-year contribution total and current streak via GraphQL.
 * Needs GITHUB_TOKEN; returns null when unavailable so the card can fall back.
 */
export async function fetchActivity(username) {
  if (!process.env.GITHUB_TOKEN) return null;
  try {
    const res = await fetch(`${GITHUB_API}/graphql`, {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks { contributionDays { date contributionCount } }
              }
            }
          }
        }`,
        variables: { login: username },
      }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;
    const days = calendar.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    );
    return {
      contributions: calendar.totalContributions,
      streak: currentStreak(days),
    };
  } catch {
    return null;
  }
}
