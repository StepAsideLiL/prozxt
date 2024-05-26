-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "name" STRING NOT NULL DEFAULT '';
ALTER TABLE "Profile" ADD COLUMN     "professionalStatus" STRING NOT NULL DEFAULT '';
ALTER TABLE "Profile" ADD COLUMN     "showProfessionalStatus" BOOL NOT NULL DEFAULT false;
