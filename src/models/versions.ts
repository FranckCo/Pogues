export type Version = {
  author: string;
  day: string; // format "YYYY-MM-DD"
  id: string;
  poguesId: string;
  timestamp: string; // ISO 8601
};

export type VersionWithData = Version & {
  data: unknown;
};
