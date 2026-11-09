export type HealthStatus = "healthy" | "warning" | "critical" | "optimal";

export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  pullRequests: number;
  updatedAt: string;
  visibility: "public" | "private" | "internal";
  healthScore: number;
  healthStatus: HealthStatus;
  intelligenceEnabled: boolean;
  branch: string;
  defaultBranch?: string;
  commitCount?: number;
  contributorsCount?: number;
  lastCommit?: {
    message: string;
    hash: string;
    author: string;
    timestamp: string;
  };
  topics?: string[];
}

export interface ActivityEvent {
  id: string;
  type: "commit" | "pr_merged" | "pr_opened" | "alert" | "security_scan" | "release";
  title: string;
  repository: string;
  author: {
    name: string;
    handle: string;
    avatar?: string;
  };
  timestamp: string;
  statusBadge?: {
    text: string;
    variant: "blue" | "red" | "yellow" | "green" | "neutral";
  };
}

export interface HealthMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  indicator: "blue" | "red" | "yellow" | "green";
  description: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: "repo" | "scan" | "terminal" | "branch" | "shield";
  accent: "blue" | "red" | "yellow" | "green";
  badge?: string;
  href?: string;
}

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  size?: string;
  lastModified?: string;
  lastCommitMessage?: string;
  content?: string;
  children?: FileNode[];
}

export interface Branch {
  name: string;
  isDefault: boolean;
  protected?: boolean;
  lastCommit: {
    hash: string;
    message: string;
    author: string;
    timestamp: string;
  };
  aheadCount?: number;
  behindCount?: number;
}

export interface CommitChangeSummary {
  filesChanged: number;
  additions: number;
  deletions: number;
  files: {
    filename: string;
    status: "added" | "modified" | "deleted";
    additions: number;
    deletions: number;
    patchPreview?: string;
  }[];
}

export interface CommitItem {
  hash: string;
  fullHash: string;
  message: string;
  description?: string;
  author: {
    name: string;
    email: string;
    handle: string;
  };
  timestamp: string;
  dateGroup: string; // e.g., "Today", "Yesterday", "Nov 4, 2026"
  branch: string;
  verified?: boolean;
  changesSummary: CommitChangeSummary;
}
