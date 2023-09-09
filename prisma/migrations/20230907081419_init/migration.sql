/*
  Warnings:

  - The primary key for the `Campaign` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `campaign_messages` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `members` on the `Campaign` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `syntax_registration` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `device_id` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `account_api_key` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `google_id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `affiliation_link` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Auto_Reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Business_Hours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Campaign_Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacts_Groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer_Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Devices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Incoming_Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menus_Privileges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Moduls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Outgoing_Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Password_Resets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Privileges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_api_key]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[google_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `campaign_message_id` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_id` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Campaign` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `deviceId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `privilege_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subsription_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('CONNECTED', 'NOT_CONNECTED');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'FAILED');

-- DropForeignKey
ALTER TABLE "Auto_Reply" DROP CONSTRAINT "Auto_Reply_device_id_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_campaign_messages_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_device_id_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_members_fkey";

-- DropForeignKey
ALTER TABLE "Contacts_Groups" DROP CONSTRAINT "Contacts_Groups_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "Contacts_Groups" DROP CONSTRAINT "Contacts_Groups_device_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer_Service" DROP CONSTRAINT "Customer_Service_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Devices" DROP CONSTRAINT "Devices_business_hour_id_fkey";

-- DropForeignKey
ALTER TABLE "Devices" DROP CONSTRAINT "Devices_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Incoming_Messages" DROP CONSTRAINT "Incoming_Messages_device_id_fkey";

-- DropForeignKey
ALTER TABLE "Menus_Privileges" DROP CONSTRAINT "Menus_Privileges_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "Menus_Privileges" DROP CONSTRAINT "Menus_Privileges_privileges_id_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_device_id_fkey";

-- DropForeignKey
ALTER TABLE "Outgoing_Messages" DROP CONSTRAINT "Outgoing_Messages_device_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_device_id_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_pkey",
DROP COLUMN "campaign_messages",
DROP COLUMN "members",
ADD COLUMN     "campaign_message_id" INTEGER NOT NULL,
ADD COLUMN     "group_id" INTEGER NOT NULL,
ADD COLUMN     "pkId" SERIAL NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "syntax_registration" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "Campaign_pkey" PRIMARY KEY ("pkId");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "device_id",
ADD COLUMN     "deviceId" INTEGER NOT NULL,
ADD COLUMN     "pkId" SERIAL NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("pkId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "role",
ADD COLUMN     "pkId" SERIAL NOT NULL,
ADD COLUMN     "privilege_id" INTEGER NOT NULL,
ADD COLUMN     "subsription_id" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "username" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "account_api_key" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "google_id" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "affiliation_link" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("pkId");

-- DropTable
DROP TABLE "Auto_Reply";

-- DropTable
DROP TABLE "Business_Hours";

-- DropTable
DROP TABLE "Campaign_Messages";

-- DropTable
DROP TABLE "Contacts";

-- DropTable
DROP TABLE "Contacts_Groups";

-- DropTable
DROP TABLE "Customer_Service";

-- DropTable
DROP TABLE "Devices";

-- DropTable
DROP TABLE "Groups";

-- DropTable
DROP TABLE "Incoming_Messages";

-- DropTable
DROP TABLE "Menus";

-- DropTable
DROP TABLE "Menus_Privileges";

-- DropTable
DROP TABLE "Moduls";

-- DropTable
DROP TABLE "Orders";

-- DropTable
DROP TABLE "Outgoing_Messages";

-- DropTable
DROP TABLE "Password_Resets";

-- DropTable
DROP TABLE "Privileges";

-- DropTable
DROP TABLE "Subscriptions";

-- DropTable
DROP TABLE "Transactions";

-- DropEnum
DROP TYPE "device_status";

-- DropEnum
DROP TYPE "message_status";

-- CreateTable
CREATE TABLE "CustomerService" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "username" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "privilege_id" INTEGER NOT NULL,

    CONSTRAINT "CustomerService_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Privilege" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "is_superadmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Privilege_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "PrivilegeRole" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "isVisible" BOOLEAN NOT NULL,
    "isCreate" BOOLEAN NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "isEdit" BOOLEAN NOT NULL,
    "module_id" INTEGER NOT NULL,
    "privilege_id" INTEGER NOT NULL,

    CONSTRAINT "PrivilegeRole_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Menu" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "type" VARCHAR(128) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "MenuPrivilege" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "privilege_id" INTEGER NOT NULL,

    CONSTRAINT "MenuPrivilege_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Modul" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "controller" VARCHAR(255) NOT NULL,

    CONSTRAINT "Modul_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Device" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "api_key" VARCHAR(255) NOT NULL,
    "serverId" INTEGER NOT NULL,
    "status" "DeviceStatus" NOT NULL DEFAULT 'NOT_CONNECTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "business_hour_id" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Contact" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "variables_data" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "ContactGroup" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "contactId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "ContactGroup_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "ContactDevice" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "contactId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "ContactDevice_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Group" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "is_campaign" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "OutgoingMessage" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "to" VARCHAR(20) NOT NULL,
    "message" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" "MessageStatus" NOT NULL,
    "source" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "OutgoingMessage_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "IncomingMessage" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "from" VARCHAR(20) NOT NULL,
    "message" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "IncomingMessage_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "AutoReply" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "request" VARCHAR(255) NOT NULL,
    "response" VARCHAR(255) NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" "MessageStatus" NOT NULL,
    "source" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "AutoReply_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "CampaignMessage" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "day" VARCHAR(128) NOT NULL,
    "message" TEXT NOT NULL,
    "sechedule" TIMESTAMP(3) NOT NULL,
    "delay" INTEGER NOT NULL,

    CONSTRAINT "CampaignMessage_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "BusinessHour" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "mon_start" TIMESTAMP(3) NOT NULL,
    "mon_end" TIMESTAMP(3) NOT NULL,
    "tue_start" TIMESTAMP(3) NOT NULL,
    "tue_end" TIMESTAMP(3) NOT NULL,
    "wed_start" TIMESTAMP(3) NOT NULL,
    "wed_end" TIMESTAMP(3) NOT NULL,
    "thu_start" TIMESTAMP(3) NOT NULL,
    "thu_end" TIMESTAMP(3) NOT NULL,
    "fri_start" TIMESTAMP(3) NOT NULL,
    "fri_end" TIMESTAMP(3) NOT NULL,
    "sat_start" TIMESTAMP(3) NOT NULL,
    "sat_end" TIMESTAMP(3) NOT NULL,
    "sun_start" TIMESTAMP(3) NOT NULL,
    "sun_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessHour_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Order" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone" INTEGER NOT NULL,
    "delivery_cost" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "PasswordReset" (
    "pkId" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("pkId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerService_username_key" ON "CustomerService"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerService_phone_key" ON "CustomerService"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerService_email_key" ON "CustomerService"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Device_phone_key" ON "Device"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_phone_key" ON "Contact"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_email_key" ON "PasswordReset"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_phone_key" ON "Campaign"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_api_key_key" ON "User"("account_api_key");

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subsription_id_fkey" FOREIGN KEY ("subsription_id") REFERENCES "Subscription"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "Privilege"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerService" ADD CONSTRAINT "CustomerService_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerService" ADD CONSTRAINT "CustomerService_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "Privilege"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivilegeRole" ADD CONSTRAINT "PrivilegeRole_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Modul"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivilegeRole" ADD CONSTRAINT "PrivilegeRole_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "Privilege"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuPrivilege" ADD CONSTRAINT "MenuPrivilege_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuPrivilege" ADD CONSTRAINT "MenuPrivilege_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "Privilege"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_business_hour_id_fkey" FOREIGN KEY ("business_hour_id") REFERENCES "BusinessHour"("pkId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactGroup" ADD CONSTRAINT "ContactGroup_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactGroup" ADD CONSTRAINT "ContactGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactDevice" ADD CONSTRAINT "ContactDevice_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactDevice" ADD CONSTRAINT "ContactDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutgoingMessage" ADD CONSTRAINT "OutgoingMessage_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomingMessage" ADD CONSTRAINT "IncomingMessage_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoReply" ADD CONSTRAINT "AutoReply_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_campaign_message_id_fkey" FOREIGN KEY ("campaign_message_id") REFERENCES "CampaignMessage"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("pkId") ON DELETE RESTRICT ON UPDATE CASCADE;
