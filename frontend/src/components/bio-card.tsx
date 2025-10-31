import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

interface Props {
  user: User;
}

const BioCard = (props: Props) => {
  const { user } = props;

  return (
    <div className="grid py-[68px]  md:grid-cols-2 items-center gap-[0px] md:gap-[44px]  ">
      <div className="h-[330px]">
        <img
          src={user?.profile?.profilePhoto}
          alt=""
          className="w-full h-full object-cover rounded-[4px]"
        />
        <Button
          // onClick={() => setOpen(true)}
          variant="outline"
          className="w-full mt-[10px] bg-[#287992] text-white hover:bg-[#216377] hover:text-white"
        >
          Edit Profile
          <Pen />
        </Button>
      </div>
      <div className="">
        <div className="flex flex-col my-[68px] ">
          <h3 className="text-[#35373F] capitalize border-b border-[#EAF2F4] py-[18px] text-[28px] font-bold">
            {user?.fullName}
          </h3>
          <div className="flex flex-col items-start  gap-[4px] border-b border-[#EAF2F4]  py-[18px] ">
            <p className="text-[#03050F] max-w-[349px]">{user?.profile?.bio}</p>

            {/* <p className="text-[#03050F] w-[349px]">
                  Exploring the world and capturing the small moments. Always
                  learning, always growing.
                </p> */}
          </div>
          <div className="flex flex-col gap-[12px] mt-[22px]">
            <div className="flex flex-col items-start gap-[2px] min-w-[186px]  ">
              <p className="text-[#68696F] text-[12px]"> Phone </p>
              <h3 className=" text-[#03050F] ">{user?.phoneNumber}</h3>
              {/* <h3 className=" text-[#03050F] ">233583475</h3> */}
            </div>
            <div className="flex flex-col items-start   gap-[2px] min-w-[186px] ">
              <p className="text-[#68696F] text-[12px]"> Email</p>
              <h3 className=" text-[#03050F] ">{user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
