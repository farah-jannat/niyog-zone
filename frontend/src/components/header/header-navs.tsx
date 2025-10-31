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
  // ** --- Props ---
  const { className } = props;

  // ** --- Stores ---
  const { authUser } = useAuthStore();
  //   const authUser = {};

  const router = useRouter();

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

              {/* {i === 0 && (
                <BecomeASeller
                  className="order-0 md:order-1"
                  onClick={() => setActiveItem(1)}
                />
              )} */}
            </Fragment>
          ))}

        {authUser && <ProfileDropdown />}
      </div>
    </>
  );
};

export default HeaderNavs;
