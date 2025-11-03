// ** --- Third party imports ---
import type { Request, Response } from "express";
import { faker } from "@faker-js/faker";

// ** --- Utils ---
import { hashPassword } from "@/utils/hashing.util";
import { catchError } from "@/utils/catch-error.util";

// ** --- DB ---
import { db } from "@/db";
import {
  userTable,
  applicationTable,
  jobTable,
  profileSkillTable,
  companyTable,
  profileTable,
  skillTable,
  type Requirement,
} from "@/schemas";

const uuidv4 = () => crypto.randomUUID();

// --- UTILITY FUNCTIONS ---

async function clearDatabase() {
  console.log("--- Clearing Existing Data ---");
  await db.delete(applicationTable);
  await db.delete(jobTable);
  await db.delete(profileSkillTable);
  await db.delete(companyTable);
  await db.delete(profileTable);
  await db.delete(skillTable);
  await db.delete(userTable);
  console.log("--- Database Cleared ---");
}

// --- DATA GENERATION FUNCTIONS ---

const NUM_STUDENTS = 110;
const NUM_RECRUITERS = 105;
const NUM_SKILLS = 120;
const NUM_JOBS = 115;
const NUM_APPLICATIONS = 130;
const NUM_PROFILE_SKILLS = 140;

// const NUM_STUDENTS = 1110;
// const NUM_RECRUITERS = 1105;
// const NUM_SKILLS = 1120;
// const NUM_JOBS = 5115;
// const NUM_APPLICATIONS = 2130;
// const NUM_PROFILE_SKILLS = 1140;

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const jobLevels = ["Junior", "Senior", "Mid"];
const experiences = ["1", "2", "3", "4", "5", "6"]; // 1=Entry, 5=Senior

export const jobCategories = [
  "Software",
  "Healthcare and Wellness",
  "Finance and Business",
  "Manufacturing and Engineering",
  "Education and Training",
  "Construction and Infrastructure",
  "Arts, Design, and Media",
  "Hospitality and Tourism",
];

const possibleRequirements: Requirement[] = [
  { title: "Must have 3+ years experience with React." },
  { title: "Proficiency in SQL and relational databases." },
  { title: "Strong communication skills." },
  { title: "Experience with CI/CD pipelines." },
  { title: "Bachelor's degree in Computer Science or related field." },
];

async function generateUsers() {
  const users = [];

  const password = await hashPassword("qwerty");

  // Generate Students
  for (let i = 0; i < NUM_STUDENTS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    users.push({
      id: uuidv4(),
      fullName: `${firstName} ${lastName}`,
      // email: faker.internet.email({
      //   firstName,
      //   lastName,
      //   provider: "student.edu",
      // }),
      email: `candidate${i}@gmail.com`,
      phoneNumber: faker.phone.number(),
      password: password,
      role: "student" as const,
    });
  }

  // Generate Recruiters
  for (let i = 0; i < NUM_RECRUITERS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    users.push({
      id: uuidv4(),
      fullName: `${firstName} ${lastName}`,
      // email: faker.internet.email({
      //   firstName,
      //   lastName,
      //   provider: "recruiter.com",
      // }),
      email: `recruiter${i}@gmail.com`,
      phoneNumber: faker.phone.number(),
      password: password,
      role: "recruiter" as const,
    });
  }

  return users;
}

function generateCompanies(recruiterIds: string[]) {
  // const uniqueCompanyName = faker.helpers.unique(faker.company.name);

  return recruiterIds.map((userId, i) => ({
    id: uuidv4(),
    userId,
    name: `${faker.company.name()}${i}`,
    // name: uniqueCompanyName(),
    category: faker.commerce.department(),
    description: faker.lorem.paragraph(),
    website: faker.internet.url(),
    location: faker.location.city(),
    logo: faker.image.url({ width: 64, height: 64 }),
  }));
}

interface SkillInterface {
  name: string;
  years: string;
}

function generateProfiles(studentIds: string[]) {
  return studentIds.map((userId) => {
    // Generate an in-place skills array (as per the schema's jsonb field)
    const skillsArray: SkillInterface[] = faker.helpers.arrayElements(
      [
        { name: "JavaScript", years: "3" },
        { name: "TypeScript", years: "2" },
        { name: "React", years: "4" },
        { name: "Tailwind CSS", years: "1" },
        { name: "PostgreSQL", years: "3" },
        { name: "Next", years: "4" },
        { name: "Node", years: "5" },
        { name: "Redux", years: "3" },
        { name: "Graphql", years: "2" },
      ],
      { min: 6, max: 6 }
    );

    return {
      id: uuidv4(),
      userId,
      bio: faker.person.bio(),
      profilePhoto: faker.image.avatar(),
      skills: skillsArray,
    };
  });
}

function generateSkills() {
  const skills = new Set<string>();
  while (skills.size < NUM_SKILLS) {
    skills.add(faker.word.adjective() + " " + faker.word.noun());
  }

  return Array.from(skills).map((skillName) => ({
    id: uuidv4(),
    name: skillName,
    years: faker.helpers.arrayElement(["1-2", "2-4", "4-6", "6+"]),
  }));
}

function generateJobs(companyIds: string[], recruiterIds: string[]) {
  const jobs = [];
  for (let i = 0; i < NUM_JOBS; i++) {
    jobs.push({
      id: uuidv4(),
      title: faker.person.jobTitle(),
      description: faker.lorem.paragraphs(2),
      requirements: faker.helpers.arrayElements(possibleRequirements, {
        min: 2,
        max: 4,
      }) as Requirement[],
      category: faker.helpers.arrayElement(jobCategories),
      salary: faker.number.int({ min: 50000, max: 150000 }),
      experience: faker.helpers.arrayElement(experiences),
      location: faker.location.city(),
      jobType: faker.helpers.arrayElement(jobTypes),
      jobLevel: faker.helpers.arrayElement(jobLevels),
      vacancy: faker.number.int({ min: 1, max: 10 }),
      companyId: faker.helpers.arrayElement(companyIds),
      createdBy: faker.helpers.arrayElement(recruiterIds),
    });
  }
  return jobs;
}

function generateApplications(studentIds: string[], jobIds: string[]) {
  const applications = [];
  for (let i = 0; i < NUM_APPLICATIONS; i++) {
    applications.push({
      id: uuidv4(),
      jobId: faker.helpers.arrayElement(jobIds),
      applicantId: faker.helpers.arrayElement(studentIds),
      status: faker.helpers.arrayElement([
        "pending",
        "accepted",
        "rejected",
      ]) as "pending" | "accepted" | "rejected",
    });
  }
  return applications;
}

function generateProfileSkills(studentIds: string[], skillIds: string[]) {
  const links = new Set<string>();
  const profileSkills = [];

  while (links.size < NUM_PROFILE_SKILLS) {
    const profileId = faker.helpers.arrayElement(studentIds);
    const skillId = faker.helpers.arrayElement(skillIds);
    const linkKey = `${profileId}-${skillId}`;

    if (!links.has(linkKey)) {
      links.add(linkKey);
      profileSkills.push({
        id: uuidv4(),
        profileId,
        skillId,
      });
    }
  }
  return profileSkills;
}

export const seed = async (req: Request, res: Response) => {
  // 2. Clear existing data
  await clearDatabase();

  console.log("Starting Data Seeding! 🚀");

  // 3. Generate and Insert Users
  const users = await generateUsers();
  const studentUsers = users.filter((u) => u.role === "student");
  const recruiterUsers = users.filter((u) => u.role === "recruiter");

  console.log(`--- Inserting ${users.length} users ---`);
  await db.insert(userTable).values(users);

  const studentIds = studentUsers.map((u) => u.id);
  const recruiterIds = recruiterUsers.map((u) => u.id);

  // 4. Generate and Insert Companies & Profiles
  const companies = generateCompanies(recruiterIds);
  const profiles = generateProfiles(studentIds);

  console.log(`--- Inserting ${companies.length} companies ---`);
  await db.insert(companyTable).values(companies);

  console.log(`--- Inserting ${profiles.length} profiles ---`);
  await db.insert(profileTable).values(profiles);

  // 5. Generate and Insert Skills
  const skills = generateSkills();
  console.log(`--- Inserting ${skills.length} unique skills ---`);
  await db.insert(skillTable).values(skills);
  const skillIds = skills.map((s) => s.id);

  // 6. Generate and Insert Jobs
  const companyIds = companies.map((c) => c.id);
  const jobs = generateJobs(companyIds, recruiterIds);
  console.log(`--- Inserting ${jobs.length} jobs ---`);
  await db.insert(jobTable).values(jobs);
  const jobIds = jobs.map((j) => j.id);

  // 7. Generate and Insert Applications
  const applications = generateApplications(studentIds, jobIds);
  console.log(`--- Inserting ${applications.length} applications ---`);
  await db.insert(applicationTable).values(applications);

  // 8. Generate and Insert Profile Skills (many-to-many)
  const profileSkills = generateProfileSkills(studentIds, skillIds);
  console.log(`--- Inserting ${profileSkills.length} profile-skill links ---`);
  await db.insert(profileSkillTable).values(profileSkills);

  console.log("Seeding complete! ✨");

  return res.send("Seeding complete! ✨");
};
