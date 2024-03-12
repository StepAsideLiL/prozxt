-- CreateTable
CREATE TABLE "Card" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL DEFAULT '',
    "title" STRING NOT NULL DEFAULT '',
    "icons" STRING NOT NULL DEFAULT '',
    "socials" STRING NOT NULL DEFAULT '',
    "style" STRING NOT NULL DEFAULT '',
    "userId" STRING NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_key" ON "Card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
