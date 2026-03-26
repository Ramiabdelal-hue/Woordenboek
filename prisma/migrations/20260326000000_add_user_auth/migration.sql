-- Create User table
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- Insert a default system user for existing data
INSERT INTO "User" ("id", "username", "password", "createdAt")
VALUES ('default_user', 'admin', '$2a$10$placeholder', CURRENT_TIMESTAMP);

-- Add userId to Quiz
ALTER TABLE "Quiz" ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'default_user';
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add userId to Word (with default for existing rows)
ALTER TABLE "Word" ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'default_user';
ALTER TABLE "Word" ADD CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Drop old unique constraint on Word.dutch and add new composite one
ALTER TABLE "Word" DROP CONSTRAINT IF EXISTS "Word_dutch_key";
CREATE UNIQUE INDEX "Word_dutch_userId_key" ON "Word"("dutch", "userId");

-- Add userId to Sentence
ALTER TABLE "Sentence" ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'default_user';
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add unique constraint on Sentence dutch+userId
CREATE UNIQUE INDEX "Sentence_dutch_userId_key" ON "Sentence"("dutch", "userId");
