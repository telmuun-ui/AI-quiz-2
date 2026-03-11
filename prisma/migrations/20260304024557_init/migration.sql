-- CreateTable
CREATE TABLE "User" (
    "is" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("is")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_is_key" ON "User"("is");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
