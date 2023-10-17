-- AlterTable
ALTER TABLE "Plans" ADD COLUMN     "destination" TEXT NOT NULL DEFAULT 'unknown';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "contact_no" DROP NOT NULL,
ALTER COLUMN "profile_img" DROP NOT NULL,
ALTER COLUMN "about_user" DROP NOT NULL;
