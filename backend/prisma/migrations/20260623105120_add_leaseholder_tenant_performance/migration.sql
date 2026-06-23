-- CreateTable
CREATE TABLE "Leaseholder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leaseholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "currentLeaseholderId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantPerformance" (
    "id" SERIAL NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "requestedById" INTEGER NOT NULL,
    "submittedById" INTEGER NOT NULL,
    "financialScore" INTEGER NOT NULL,
    "propertyScore" INTEGER NOT NULL,
    "complianceScore" INTEGER NOT NULL,
    "lifestyleScore" INTEGER NOT NULL,
    "communicationScore" INTEGER NOT NULL,
    "smokes" BOOLEAN NOT NULL DEFAULT false,
    "drinks" BOOLEAN NOT NULL DEFAULT false,
    "drugs" BOOLEAN NOT NULL DEFAULT false,
    "pets" BOOLEAN NOT NULL DEFAULT false,
    "noisyParties" BOOLEAN NOT NULL DEFAULT false,
    "unauthorizedGuests" BOOLEAN NOT NULL DEFAULT false,
    "wouldRentAgain" BOOLEAN NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TenantPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Leaseholder_email_key" ON "Leaseholder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_currentLeaseholderId_fkey" FOREIGN KEY ("currentLeaseholderId") REFERENCES "Leaseholder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantPerformance" ADD CONSTRAINT "TenantPerformance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantPerformance" ADD CONSTRAINT "TenantPerformance_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "Leaseholder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantPerformance" ADD CONSTRAINT "TenantPerformance_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "Leaseholder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
