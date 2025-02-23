import { BookStoreInventoryDto } from "../dto/queryService/BookStoreInventoryDto";

export interface SearchBookInventory {
  findInventoryBy(isbnCode: string): Promise<BookStoreInventoryDto>;
}
