import { useRouter } from "next/navigation";

const JobCompany = () => {
  const router = useRouter();

  const company = {
    id: "0162bbb1-f36e-4f85-b8e4-9b1324005dcd",
    user_id: "8df95153-439a-431b-b216-746b094f9f59",
    name: "Frami LLC75",
    category: "Beauty",
    description:
      "Advoco cursim suspendo totus. Sponte sui cumque voluntarius theatrum verecundia deficio dapifer. Consequatur vinitor clam sint spes cum minus colligo adeo et.",
    website: "https://impassioned-puritan.info",
    location: "Arelyland",
    logo: "https://picsum.photos/seed/ML0G4W/64/64",
    created_at: "2025-10-30 14:43:16.925482",
    updated_at: "2025-10-30 14:43:16.925482",
  };

  return (
    <div
      onClick={() => {
        router.push(`/companyProfile/${company?.id}`);
      }}
      className=" bg-[#FFFFFF] py-[38px] px-6"
    >
      <div className="flex items-start gap-4">
        <img
          src={company?.logo}
          alt=""
          className="rounded-[4px] h-[70px] w-[70px]"
        />

        <div className="flex flex-col gap-1">
          <h1 className="capitalize text-[#03050F] font-bold text-[20px]">
            {company?.name}
          </h1>
          <div className="text-[#35373F]">{company?.location}</div>
          {/* <span>2 open jobs</span> */}
        </div>
      </div>

      <div className="flex flex-col my-11">
        <div className="flex flex-col items-start  gap-1 border-b  py-[18px] px-6">
          <p className="text-[#68696F] text-[12px]"> Description</p>
          <h3 className=" text-[#03050F] ">{company?.description}</h3>
        </div>
        <div className="flex flex-col items-start gap-1 border-b min-w-[186px] py-[18px] px-6">
          <p className="text-[#68696F] text-[12px]"> Website </p>
          <h3 className=" text-[#03050F] ">{company?.website}</h3>
        </div>
        <div className="flex flex-col items-start border-b  gap-1 min-w-[186px] py-[18px] px-6">
          <p className="text-[#68696F] text-[12px]"> Location </p>
          <h3 className=" text-[#03050F] ">{company?.location}</h3>
        </div>
      </div>
    </div>
  );
};

export default JobCompany;
