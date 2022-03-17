export interface Seeder {
  title: string;
  start: () => Promise<void>;
  unique: boolean;
}
