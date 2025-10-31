import Link from "next/link";

const HeaderLogo = () => {
  return (
    <Link href={`/`}>
      <h1 className="text-[28px] cursor-pointer">
        <span className="text-[#287992]">Niyog</span>
        <span className="text-[#E8C092]">Zone</span>
      </h1>
    </Link>
  );
};

export default HeaderLogo;
