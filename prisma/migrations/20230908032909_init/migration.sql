/*
  Warnings:

  - Added the required column `email_otp_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_otp_code" VARCHAR(6) NOT NULL,
ADD COLUMN     "email_verified_at" TIMESTAMP(3);
