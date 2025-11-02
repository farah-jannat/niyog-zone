// import { useAuthStore } from "@/store/use-auth.store";
import ProfileDropdown from "@/components/header/profile-dropdown";
import { useAuthStore } from "@/store/use-auth.store";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

interface Props {
  className?: string;
}

const navs = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
  { title: "jobs", path: "/jobs" },
];

const HeaderNavs = (props: Props) => {
  // ** --- props ---
  const { className } = props;

  // ** --- stores ---
  const { authUser } = useAuthStore();

  const router = useRouter();

  console.log("auth user is ", authUser);

  return (
    <>
      <div className={`flex items-center justify-center gap-x-6 ${className}`}>
        {!authUser &&
          navs.map((nav, i) => (
            <Fragment key={i}>
              <p
                key={i}
                className="font-lato text-[16px] text-[#35373F] font-normal whitespace-nowrap capitalize cursor-pointer"
                onClick={() => router.push(nav.path)}
              >
                {nav.title}
              </p>
            </Fragment>
          ))}

        {authUser && <ProfileDropdown />}
      </div>
    </>
  );
};

export default HeaderNavs;
