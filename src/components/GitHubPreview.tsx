import { Star, Circle } from "lucide-react";

interface GitHubPreviewProps {
  repo: string; // Format: "owner/repo"
}

// GitHub API response types (simplified)
interface GitHubRepoData {
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}

export async function GitHubPreview({ repo }: GitHubPreviewProps) {
  let data: GitHubRepoData | null = null;
  let error = null;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        Accept: "application/vnd.github.v3+json",
        // In a real app, you'd add a GitHub token here to avoid rate limits
        // "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch repo data: ${res.status}`);
    }

    data = await res.json();
  } catch (err) {
    console.error("Error fetching GitHub repo:", err);
    error = "Failed to load repository data.";
  }

  if (error || !data) {
    return (
      <div className="border border-red-500 p-4 mt-4 bg-card text-red-500 font-mono text-sm">
        [ERROR]: {error || "Repository not found."} - {repo}
      </div>
    );
  }

  return (
    <div className="github-card mt-4 p-4 border border-border bg-card relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
      {/* Cyberpunk accent line */}
      <div className="hidden absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent cyberpunk-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Retro Header Label */}
      <div className="retro-header hidden bg-border text-background px-2 py-0.5 inline-block font-bold text-xs mb-2 uppercase tracking-wider absolute top-0 left-0">
        Repository
      </div>

      <div className="mt-1">
          <a
            href={data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold text-lg hover:underline transition-colors block mb-1"
          >
            {data.full_name}
          </a>
          <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
            {data.description || "No description provided."}
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-primary" />
              <span>{data.stargazers_count.toLocaleString()}</span>
            </div>
            {data.language && (
              <div className="flex items-center gap-1">
                <Circle size={10} className="fill-primary text-primary" />
                <span>{data.language}</span>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
