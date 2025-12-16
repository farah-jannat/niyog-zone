"use client";
import BioCard from "@/components/bio-card";
import Container from "@/components/container";
import TagCard from "@/components/tag-card";
import JobList from "@/features/job/components/job-list";
import { useUserQuery } from "@/features/user/queries/use-user.query";
import { useParams } from "next/navigation";

// const user = {
//   id: "e392d964-31ac-4287-a8ef-fc947a2dcb03",
//   email: "Harvey_Cronin@student.edu",
//   phoneNumber: "535-221-9162",
//   password: "$2b$10$Ox5Ymm/XZHWPKRl1xmTVke6pSbdwWwnCzgVI5.r/q7ph9.oDtfk5O",
//   fullName: "Harvey Cronin",
//   role: "student",
//   createdAt: "2025-10-31T10:46:48.681Z",
//   updatedAt: "2025-10-31T10:46:48.681Z",
//   applications: [
//     {
//       id: "1f1f1396-ceab-47f0-8445-34fa9e4d77e5",
//       jobId: "53bfa32c-7629-4f14-b55e-f2faada32b17",
//       applicantId: "e392d964-31ac-4287-a8ef-fc947a2dcb03",
//       status: "pending",
//       createdAt: "2025-10-31T10:46:48.771Z",
//       updatedAt: "2025-10-31T10:46:48.771Z",
//       job: {
//         id: "53bfa32c-7629-4f14-b55e-f2faada32b17",
//         title: "Central Quality Analyst",
//         category: "Healthcare and Wellness",
//         description:
//           "Degusto theca acies atavus pauper omnis cursim alveus. Ubi celebrer vitae cubitum reprehenderit odit ultra fugit patruus basium. Adsidue fugit soluta viscus sunt ulterius demulceo degusto ager.\nItaque amitto aut cubicularis voluptatum capitulus volaticus blandior umbra. Decor dolore cognatus demo. Utrum cimentarius corrumpo denego concedo volutabrum facilis arbustum.",
//         requirements: [
//           "Bachelor's degree in Computer Science or related field.",
//           "Experience with CI/CD pipelines.",
//           "Strong communication skills.",
//         ],
//         salary: 115085,
//         experience: "6",
//         location: "Urbana",
//         jobType: "Contract",
//         jobLevel: "Junior",
//         vacancy: 5,
//         companyId: "38fcb481-f0e6-4ee1-8102-84aa33fdf7da",
//         createdBy: "9cb6ce93-1952-4640-a777-735c451b6053",
//         createdAt: "2025-10-31T10:46:48.759Z",
//         updatedAt: "2025-10-31T10:46:48.759Z",
//       },
//     },
//     {
//       id: "048fddeb-4942-44f5-8ee6-b45b659b2b5e",
//       jobId: "549767af-d87f-44a1-9d9a-ce8477217d46",
//       applicantId: "e392d964-31ac-4287-a8ef-fc947a2dcb03",
//       status: "rejected",
//       createdAt: "2025-10-31T10:46:48.771Z",
//       updatedAt: "2025-10-31T10:46:48.771Z",
//       job: {
//         id: "549767af-d87f-44a1-9d9a-ce8477217d46",
//         title: "Dynamic Accounts Strategist",
//         category: "Finance and Business",
//         description:
//           "Beatae solio ater. Altus confero sublime delicate adfero benigne vespillo. Socius cetera eius.\nCedo curo vae apud corroboro. Tero vilitas decretum repellat. Ventosus socius viscus color ultra.",
//         requirements: [
//           "Proficiency in SQL and relational databases.",
//           "Bachelor's degree in Computer Science or related field.",
//         ],
//         salary: 59560,
//         experience: "2",
//         location: "Lindgrenbury",
//         jobType: "Full-time",
//         jobLevel: "Mid",
//         vacancy: 3,
//         companyId: "a7ad866e-39cf-4f52-99df-e36e1f74efeb",
//         createdBy: "883aa772-9b4a-4eb7-b100-8f591c16673c",
//         createdAt: "2025-10-31T10:46:48.759Z",
//         updatedAt: "2025-10-31T10:46:48.759Z",
//       },
//     },
//   ],
//   profile: {
//     id: "80107a32-b50a-45ea-880e-a2e69184a835",
//     userId: "e392d964-31ac-4287-a8ef-fc947a2dcb03",
//     bio: "place advocate, founder",
//     profilePhoto: "https://avatars.githubusercontent.com/u/38376598",
//     skills: [{ name: "JavaScript", years: "3" }],
//     createdAt: "2025-10-31T10:46:48.720Z",
//     updatedAt: "2025-10-31T10:46:48.720Z",
//   },
// };

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading: isuserLoading,
    data: user,
    error,
  } = useUserQuery(id, "application=true&profile=true&job=true");

  console.log("user");

  if (isuserLoading) return null;


  return (
    <div>
      <Container className="bg-[#FFFFFF]">
        <BioCard user={user} />
      </Container>

      <Container className="bg-[#F5F6FD] py-8">
        <div className="my-[68px] grid grid-cols-4 md:grid-cols-9 xl:grid-cols-12 gap-4 capitalize">
          {user?.profile?.skills?.map((skill, i) => (
            <TagCard
              key={i}
              label={`${skill.years}+ years`}
              value={skill.name}
            />
          ))}
        </div>
      </Container>

      <Container className="bg-[#F5F6FD] py-[20px]">
        <JobList
          subHeading="Jobs You  Applied Till Now"
          heading="Applied Jobs"
          isLoading={isuserLoading}
          error={error}
          jobs={user?.applications?.map((app) => app.job!)}
          // jobs={user?.applications?.map((app)=>app.job)}
        />
      </Container>
    </div>
  );
};

export default Profile;
