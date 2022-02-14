export interface Seeder {
  title: string;
  start: () => Promise<void>;
}

