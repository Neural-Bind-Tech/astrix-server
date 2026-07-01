import { prisma } from '../src/lib/prisma';
import { UserRole, UserStatus, UniversityCountry } from '../src/generated/prisma/enums';
import bcrypt from 'bcrypt';

async function main() {
  const SUPERADMINEMAIL = (process.env.SUPERADMINEMAIL || 'neuralbind@superadmin.com').trim();
  const SUPERADMINPHONE = (process.env.SUPERADMINPHONE || '22556688000').trim();
  const SUPERADMINPASSWORD = (process.env.SUPERADMINPASSWORD || 'ASD123!@#asd').trim();

  const existingAdmin = await prisma.user.findUnique({
    where: { email: SUPERADMINEMAIL },
  });

  if (existingAdmin) {
    console.log('Super admin already exists, skipping creation');
  } else {
    const hashPassword = await bcrypt.hash(SUPERADMINPASSWORD, 10);
    const superAdmin = await prisma.user.create({
      data: {
        email: SUPERADMINEMAIL,
        phone: SUPERADMINPHONE,
        password: hashPassword,
        fullName: 'Super Admin',
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
      },
    });

    console.log('Super admin created successfully:', {
      id: superAdmin.id,
      email: superAdmin.email,
      role: superAdmin.role,
    });
  }

  // Seed some universities
  const countUniversities = await prisma.university.count();
  if (countUniversities === 0) {
    await prisma.university.createMany({
      data: [
        {
          name: 'Harvard University',
          country: UniversityCountry.USA,
          city: 'Cambridge',
          logoUrl: 'https://example.com/harvard.png',
          description: 'A prestigious Ivy League research university in Cambridge, Massachusetts.',
          worldRank: 'QS #4',
          majors: ['Computer Science', 'Economics', 'Government', 'History'],
          programs: ['Bachelor', 'Master', 'PhD'],
          tuitionFee: '$55,000 / year',
          hostelFee: '$18,000 / year',
          scholarshipType: 'Need-based financial aid',
          intake: 'Fall (September)',
          deadline: 'January 1st',
          documentsRequired: ['Transcript', 'SAT/ACT', '2 Recommendation Letters', 'Statement of Purpose'],
          website: 'https://harvard.edu',
          featured: true,
        },
        {
          name: 'Tsinghua University',
          country: UniversityCountry.CHINA,
          city: 'Beijing',
          logoUrl: 'https://example.com/tsinghua.png',
          description: 'A major research university in Beijing and a member of the C9 League.',
          worldRank: 'QS #14',
          majors: ['Engineering', 'Computer Science', 'Business Administration', 'Physics'],
          programs: ['Bachelor', 'Master', 'PhD'],
          tuitionFee: 'CNY 30,000 / year',
          hostelFee: 'CNY 12,000 / year',
          scholarshipType: 'Chinese Government Scholarship',
          intake: 'Fall (September)',
          deadline: 'March 30th',
          documentsRequired: ['High School Transcript', 'HSK Certificate', 'Passport Copy', 'Recommendation Letter'],
          website: 'https://tsinghua.edu.cn',
          featured: true,
        },
      ],
    });
    console.log('Universities seeded successfully.');
  } else {
    console.log('Universities already exist, skipping seeding.');
  }
}

async function seed() {
  try {
    console.log('Starting database seeding...');
    await main();
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed');
  }
}

seed().catch((error) => {
  console.error('Fatal error during seeding:', error);
  process.exit(1);
});
