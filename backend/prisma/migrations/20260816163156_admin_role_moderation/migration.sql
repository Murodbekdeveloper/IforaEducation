-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN');

-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "contacted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT',
ALTER COLUMN "email" DROP NOT NULL;
