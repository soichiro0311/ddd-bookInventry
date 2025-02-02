-- CreateTable
CREATE TABLE "Book" (
    "isbnCode" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("isbnCode")
);

-- CreateTable
CREATE TABLE "BookStore" (
    "id" VARCHAR(255) NOT NULL,
    "storeName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookInventory" (
    "isbnCode" VARCHAR(255) NOT NULL,
    "inStoreInventory" INTEGER NOT NULL,
    "reservationInventory" INTEGER NOT NULL,
    "bookStoreId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookInventory_pkey" PRIMARY KEY ("isbnCode")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" VARCHAR(255) NOT NULL,
    "isbnCode" TEXT NOT NULL,
    "buyCount" INTEGER NOT NULL,
    "buyDate" TEXT NOT NULL,
    "bookStoreId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" VARCHAR(255) NOT NULL,
    "isbnCode" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "orderBookCount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "bookStoreId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookInventory" ADD CONSTRAINT "BookInventory_bookStoreId_fkey" FOREIGN KEY ("bookStoreId") REFERENCES "BookStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bookStoreId_fkey" FOREIGN KEY ("bookStoreId") REFERENCES "BookStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bookStoreId_fkey" FOREIGN KEY ("bookStoreId") REFERENCES "BookStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
