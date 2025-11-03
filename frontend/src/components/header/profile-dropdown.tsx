import CustomDropdown from "@/components/header/custom-dropdown";
import DropdownMenu from "@/components/header/dropdown-menu";
import { profileUrl } from "@/constants";
import { useLogout } from "@/features/auth/mutations/use-logout.mutation";
import { useAuthStore } from "@/store/use-auth.store";
import generateRandomInt from "@/utils/generate-random-int.util";
import { LogOut, PackagePlus, UserCog } from "lucide-react";

const ProfileDropdown = () => {
  // ** --- store ---
  const { authUser } = useAuthStore();

  // ** --- mutations ---

  const { mutate: logout } = useLogout();

  const trigger = (
    <div className="w-10 h-10 rounded-full bg-[#FEFEFF] cursor-pointer overflow-hidden">
      {/* <img src={authUser?.profilePicture} alt="profile" /> */}

      <img
        // src={`https://robohash.org/${generateRandomInt(1, 100)}?size=200x200`}
        src={profileUrl}
        alt="profile"
      />
    </div>
  );
  const content = (
    <div className="w-full">
      {/* header */}
      <div className="p-4 gap-y-2 border-b border-[#E7E7E8]">
        <h6 className="capitalize text-[#0E0F19] font-lato font-normal text-sm">
          {authUser?.fullName}
        </h6>
        <span className="text-[#6E6F75] font-lato font-normal text-xs capitalize">
          {authUser?.role}
        </span>
      </div>
      {/* body */}
      <div className="flex flex-col gap-y-4 p-4">
        <DropdownMenu
          Icon={UserCog}
          title={`View Profile`}
          // isBtn
          link={
            authUser?.role === "student"
              ? `/candidates/${authUser?.id}`
              : `/recruiters/${authUser?.id}`
          }
        />
        {/* <DropdownMenu
          Icon={LayoutDashboard}
          title="Dashboard"
          link={
            role === "buyer"
              ? `/buyer/profile/${authUser?.id}`
              : `/seller/profile/${authUser?.id}`
          }
        /> */}
        {authUser?.role === "recruiter" && (
          <DropdownMenu
            Icon={PackagePlus}
            title="Add a new job"
            link="/jobs/create"
          />
        )}
      </div>

      {/* footer */}
      <div className="p-4 gap-y-2 border-t border-[#E7E7E8]">
        <DropdownMenu onClick={() => logout()} Icon={LogOut} title="Log Out" />
      </div>
    </div>
  );

  return (
    <CustomDropdown
      contentClassName="rounded-[4px] bg-[#FEFEFF] min-w-[220px]"
      trigger={trigger}
      content={content}
      align="end"
    />
  );
};

export default ProfileDropdown;
