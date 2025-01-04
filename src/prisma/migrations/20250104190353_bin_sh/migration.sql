/*
  Warnings:

  - The primary key for the `BookInventory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BookInventory" DROP CONSTRAINT "BookInventory_pkey",
ADD CONSTRAINT "BookInventory_pkey" PRIMARY KEY ("isbnCode", "bookStoreId");
