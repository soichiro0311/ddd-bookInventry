import { Book } from "../Book";

export interface BookRepository {
  fetch(): Promise<void>;
}
