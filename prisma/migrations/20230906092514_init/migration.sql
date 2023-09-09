-- CreateEnum
CREATE TYPE "device_status" AS ENUM ('connected', 'not_connected');

-- CreateEnum
CREATE TYPE "message_status" AS ENUM ('sent', 'failed');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "account_api_key" TEXT NOT NULL,
    "google_id" TEXT,
    "affiliation_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer_Service" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Customer_Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Privileges" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_superadmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Privileges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menus_Privileges" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "privileges_id" INTEGER NOT NULL,

    CONSTRAINT "Menus_Privileges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moduls" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "controller" TEXT NOT NULL,

    CONSTRAINT "Moduls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "subscription_id" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "server_id" INTEGER NOT NULL,
    "status" "device_status" NOT NULL DEFAULT 'not_connected',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "business_hour_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "variables_data" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts_Groups" (
    "id" SERIAL NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "Contacts_Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_campaign" BOOLEAN NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outgoing_Messages" (
    "id" SERIAL NOT NULL,
    "to" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "scedule" TIMESTAMP(3) NOT NULL,
    "status" "message_status" NOT NULL,
    "source" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "Outgoing_Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incoming_Messages" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "received_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "Incoming_Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auto_Reply" (
    "id" SERIAL NOT NULL,
    "request" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" "message_status" NOT NULL,
    "source" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "Auto_Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "syntax_registration" TEXT NOT NULL,
    "registration_message" TEXT NOT NULL,
    "message_registered" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "campaign_messages" INTEGER NOT NULL,
    "members" INTEGER NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign_Messages" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "delay" INTEGER NOT NULL,

    CONSTRAINT "Campaign_Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business_Hours" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "Business_Hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "delivery_cost" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password_Resets" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Password_Resets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Service_email_key" ON "Customer_Service"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Privileges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Service" ADD CONSTRAINT "Customer_Service_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus_Privileges" ADD CONSTRAINT "Menus_Privileges_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus_Privileges" ADD CONSTRAINT "Menus_Privileges_privileges_id_fkey" FOREIGN KEY ("privileges_id") REFERENCES "Privileges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devices" ADD CONSTRAINT "Devices_business_hour_id_fkey" FOREIGN KEY ("business_hour_id") REFERENCES "Business_Hours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devices" ADD CONSTRAINT "Devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts_Groups" ADD CONSTRAINT "Contacts_Groups_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts_Groups" ADD CONSTRAINT "Contacts_Groups_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outgoing_Messages" ADD CONSTRAINT "Outgoing_Messages_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incoming_Messages" ADD CONSTRAINT "Incoming_Messages_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auto_Reply" ADD CONSTRAINT "Auto_Reply_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_campaign_messages_fkey" FOREIGN KEY ("campaign_messages") REFERENCES "Campaign_Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_members_fkey" FOREIGN KEY ("members") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
