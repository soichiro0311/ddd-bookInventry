import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import { myContainer } from "../../inversify.config";
import { TYPES } from "../types";
import { isInStoreBookDto } from "./dto/response/BookInventryDto";

export class ViewBookInventory {
  private bookStoreRepository = myContainer.get<BookStoreRepository>(
    TYPES.BookStoreRepository
  );

  async isInStore(isbnCode: string, bookStoreId: string) {
    const bookStore = await this.bookStoreRepository.findById(bookStoreId);

    return new isInStoreBookDto(
      bookStore.id(),
      bookStore.name(),
      isbnCode,
      bookStore.isInStore(isbnCode)
    );
  }
}
