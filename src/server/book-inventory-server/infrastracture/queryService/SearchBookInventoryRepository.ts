import { Book, BookInventory, BookStore, PrismaClient } from "@prisma/client";
import { BookStoreInventoryDto } from "../../usecase/dto/queryService/BookStoreInventoryDto";
import { SearchBookInventory } from "../../usecase/QueryService/SearchBookInventory";

export class SearchBookInventoryRepository implements SearchBookInventory {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }
  async findInventoryBy(isbnCode: string): Promise<BookStoreInventoryDto> {
    const inventoryInfo: (BookInventory & { bookStore: Partial<BookStore> })[] =
      await this.prisma.bookInventory.findMany({
        where: {
          isbnCode: isbnCode,
        },
        include: {
          bookStore: true,
        },
      });

    const bookInfo: Book | null = await this.prisma.book.findUnique({
      where: {
        isbnCode: isbnCode,
      },
    });

    if (bookInfo == null) {
      throw new Error(`Not Found Book! isbnCode=${isbnCode}`);
    }

    return new BookStoreInventoryDto(bookInfo, inventoryInfo);
  }
}
