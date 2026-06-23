import { prisma } from './lib/prisma.js';

export async function getLeaseholders() {
  return prisma.leaseholder.findMany({ orderBy: { name: 'asc' } });
}

export async function createLeaseholder(name, email, phone) {
  return prisma.leaseholder.create({ data: { name, email, phone: phone || null } });
}

export async function getTenants() {
  return prisma.tenant.findMany({
    include: { currentLeaseholder: true },
    orderBy: { name: 'asc' },
  });
}

export async function createTenant(name, email, phone, currentLeaseholderId) {
  return prisma.tenant.create({
    data: { name, email, phone: phone || null, currentLeaseholderId: currentLeaseholderId || null },
    include: { currentLeaseholder: true },
  });
}

export async function getPerformanceByTenant(tenantId) {
  return prisma.tenantPerformance.findMany({
    where: { tenantId: parseInt(tenantId) },
    include: { requestedBy: true, submittedBy: true, tenant: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createPerformance(data) {
  return prisma.tenantPerformance.create({
    data: {
      tenantId: data.tenantId,
      requestedById: data.requestedById,
      submittedById: data.submittedById,
      financialScore: data.financialScore,
      propertyScore: data.propertyScore,
      complianceScore: data.complianceScore,
      lifestyleScore: data.lifestyleScore,
      communicationScore: data.communicationScore,
      smokes: data.smokes ?? false,
      drinks: data.drinks ?? false,
      drugs: data.drugs ?? false,
      pets: data.pets ?? false,
      noisyParties: data.noisyParties ?? false,
      unauthorizedGuests: data.unauthorizedGuests ?? false,
      wouldRentAgain: data.wouldRentAgain,
      overallRating: data.overallRating,
      comments: data.comments || null,
    },
    include: { requestedBy: true, submittedBy: true, tenant: true },
  });
}
