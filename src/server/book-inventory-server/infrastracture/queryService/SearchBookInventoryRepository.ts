import { PrismaClient } from "@prisma/client";
import { BookStoreInventoryDto } from "../../usecase/dto/queryService/BookStoreInventoryDto";
import { SearchBookInventory } from "../../usecase/QueryService/SearchBookInventory";

export class SearchBookInventoryRepository implements SearchBookInventory {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }
  async findInventoryBy(isbnCode: string): Promise<BookStoreInventoryDto[]> {
    const inventoryInfo = await this.prisma.bookInventory.findMany({
      where: {
        isbnCode: isbnCode,
      },
      include: {
        bookStore: true,
      },
    });

    const bookInfo = await this.prisma.book.findUnique({
      where: {
        isbnCode: isbnCode,
      },
    });

    return inventoryInfo.map((inventory: any) => {
      return new BookStoreInventoryDto(
        inventory.bookStore.storeName,
        inventory.bookStore.id,
        inventory.isbnCode,
        bookInfo!.title,
        inventory.inStoreInventory
      );
    });
  }
}
