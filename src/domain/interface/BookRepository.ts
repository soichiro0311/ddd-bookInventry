export interface BookRepository {
  fetch(): Promise<void>;
  clear(): void;
}
