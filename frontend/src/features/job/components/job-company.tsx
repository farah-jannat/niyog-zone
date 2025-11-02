import { useCompanyQuery } from "@/features/company/queries/use-company.query";
import { useRouter } from "next/navigation";

interface Props {
  companyId?: string;
}

const JobCompany = (props: Props) => {
  // ** --- props ---
  const { companyId } = props;

  // ** --- router ---
  const router = useRouter();

  // ** --- queires ---
  const { isLoading: isCompanyLoading, data: company } =
    useCompanyQuery(companyId);

  if (isCompanyLoading) return null;

  return (
    <div className=" bg-[#FFFFFF] py-[38px] px-6">
      <div
        className="flex items-start gap-4 cursor-pointer"
        onClick={() => {
          router.push(`/companies/${company?.id}`);
        }}
      >
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
