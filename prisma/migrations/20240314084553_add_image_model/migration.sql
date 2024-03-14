-- CreateTable
CREATE TABLE "Image" (
    "id" STRING NOT NULL,
    "imgbbId" STRING NOT NULL,
    "title" STRING NOT NULL,
    "url" STRING NOT NULL,
    "imgbbUrl" STRING NOT NULL,
    "deleteUrl" STRING NOT NULL,
    "mime" STRING NOT NULL,
    "width" INT8 NOT NULL,
    "height" INT8 NOT NULL,
    "size" INT8 NOT NULL,
    "time" INT8 NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_key" ON "Image"("userId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
