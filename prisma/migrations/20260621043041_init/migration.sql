-- CreateEnum
CREATE TYPE "CountryOfInterest" AS ENUM ('USA', 'CHINA', 'MALAYSIA', 'SOUTH_KOREA', 'UK', 'CANADA', 'AUSTRALIA', 'OTHER');

-- CreateEnum
CREATE TYPE "BudgetRange" AS ENUM ('UNDER_10000', 'BETWEEN_10000_20000', 'BETWEEN_20000_40000', 'ABOVE_40000');

-- CreateEnum
CREATE TYPE "PreferredIntake" AS ENUM ('SPRING_2025', 'FALL_2025', 'SPRING_2026', 'FALL_2026');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('STUDY_ABROAD_GUIDES', 'VISA_TIPS', 'SCHOLARSHIP_UPDATES', 'COUNTRY_COMPARISON', 'ADMISSION_ADVICE', 'STUDENT_LIFE', 'DOCUMENT_PREPARATION', 'SUCCESS_STORIES', 'CAREER_GUIDANCE');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'REPLIED', 'CLOSED');

-- CreateEnum
CREATE TYPE "UniversityCountry" AS ENUM ('USA', 'CHINA', 'MALAYSIA', 'SOUTH_KOREA', 'THAILAND', 'UK', 'CANADA', 'AUSTRALIA', 'OTHER');

-- CreateEnum
CREATE TYPE "VisaCountry" AS ENUM ('USA', 'CHINA', 'MALAYSIA', 'THAILAND', 'UK', 'CANADA', 'AUSTRALIA', 'SCHENGEN', 'OTHER');

-- CreateEnum
CREATE TYPE "VisaPurpose" AS ENUM ('STUDY', 'TOURIST', 'BUSINESS', 'FAMILY_VISIT', 'OTHER');

-- CreateEnum
CREATE TYPE "VisaAppointmentStatus" AS ENUM ('NEW', 'CONTACTED', 'SCHEDULED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryOfInterest" "CountryOfInterest" NOT NULL,
    "programPreference" TEXT,
    "academicBackground" TEXT,
    "budgetRange" "BudgetRange",
    "preferredIntake" "PreferredIntake",
    "message" TEXT,
    "documentsUrl" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "category" "BlogCategory" NOT NULL,
    "featuredImage" TEXT,
    "author" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "location" TEXT,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "registrationLink" TEXT,
    "isPast" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "country" TEXT,
    "program" TEXT,
    "university" TEXT,
    "review" TEXT NOT NULL,
    "photoUrl" TEXT,
    "rating" INTEGER,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" "UniversityCountry" NOT NULL,
    "city" TEXT NOT NULL,
    "logoUrl" TEXT,
    "description" TEXT,
    "worldRank" TEXT,
    "majors" TEXT[],
    "programs" TEXT[],
    "tuitionFee" TEXT,
    "hostelFee" TEXT,
    "scholarshipType" TEXT,
    "intake" TEXT,
    "deadline" TEXT,
    "documentsRequired" TEXT[],
    "website" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisaAppointment" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" "VisaCountry" NOT NULL,
    "visaType" TEXT,
    "purpose" "VisaPurpose",
    "preferredDate" TIMESTAMP(3),
    "message" TEXT,
    "status" "VisaAppointmentStatus" NOT NULL DEFAULT 'NEW',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisaAppointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_email_idx" ON "Application"("email");

-- CreateIndex
CREATE INDEX "Application_phone_idx" ON "Application"("phone");

-- CreateIndex
CREATE INDEX "Application_countryOfInterest_idx" ON "Application"("countryOfInterest");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_fullName_idx" ON "Application"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_title_idx" ON "BlogPost"("title");

-- CreateIndex
CREATE INDEX "BlogPost_category_idx" ON "BlogPost"("category");

-- CreateIndex
CREATE INDEX "BlogPost_published_idx" ON "BlogPost"("published");

-- CreateIndex
CREATE INDEX "BlogPost_isFeatured_idx" ON "BlogPost"("isFeatured");

-- CreateIndex
CREATE INDEX "BlogPost_author_idx" ON "BlogPost"("author");

-- CreateIndex
CREATE INDEX "Event_title_idx" ON "Event"("title");

-- CreateIndex
CREATE INDEX "Event_date_idx" ON "Event"("date");

-- CreateIndex
CREATE INDEX "Event_location_idx" ON "Event"("location");

-- CreateIndex
CREATE INDEX "Event_isOnline_idx" ON "Event"("isOnline");

-- CreateIndex
CREATE INDEX "Event_isPast_idx" ON "Event"("isPast");

-- CreateIndex
CREATE INDEX "EventRegistration_eventId_idx" ON "EventRegistration"("eventId");

-- CreateIndex
CREATE INDEX "EventRegistration_email_idx" ON "EventRegistration"("email");

-- CreateIndex
CREATE INDEX "EventRegistration_phone_idx" ON "EventRegistration"("phone");

-- CreateIndex
CREATE INDEX "EventRegistration_fullName_idx" ON "EventRegistration"("fullName");

-- CreateIndex
CREATE INDEX "Inquiry_email_idx" ON "Inquiry"("email");

-- CreateIndex
CREATE INDEX "Inquiry_phone_idx" ON "Inquiry"("phone");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- CreateIndex
CREATE INDEX "Inquiry_name_idx" ON "Inquiry"("name");

-- CreateIndex
CREATE INDEX "Inquiry_subject_idx" ON "Inquiry"("subject");

-- CreateIndex
CREATE INDEX "Testimonial_studentName_idx" ON "Testimonial"("studentName");

-- CreateIndex
CREATE INDEX "Testimonial_country_idx" ON "Testimonial"("country");

-- CreateIndex
CREATE INDEX "Testimonial_university_idx" ON "Testimonial"("university");

-- CreateIndex
CREATE INDEX "Testimonial_rating_idx" ON "Testimonial"("rating");

-- CreateIndex
CREATE INDEX "University_name_idx" ON "University"("name");

-- CreateIndex
CREATE INDEX "University_country_idx" ON "University"("country");

-- CreateIndex
CREATE INDEX "University_city_idx" ON "University"("city");

-- CreateIndex
CREATE INDEX "University_featured_idx" ON "University"("featured");

-- CreateIndex
CREATE INDEX "VisaAppointment_email_idx" ON "VisaAppointment"("email");

-- CreateIndex
CREATE INDEX "VisaAppointment_phone_idx" ON "VisaAppointment"("phone");

-- CreateIndex
CREATE INDEX "VisaAppointment_country_idx" ON "VisaAppointment"("country");

-- CreateIndex
CREATE INDEX "VisaAppointment_purpose_idx" ON "VisaAppointment"("purpose");

-- CreateIndex
CREATE INDEX "VisaAppointment_status_idx" ON "VisaAppointment"("status");

-- CreateIndex
CREATE INDEX "VisaAppointment_fullName_idx" ON "VisaAppointment"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_fullName_idx" ON "User"("fullName");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
