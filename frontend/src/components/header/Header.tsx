"use client";

// ** Components Imports
import Container from "@/components/container";
import HeaderLogo from "@/components/header/header-logo";
import HeaderNavs from "@/components/header/header-navs";
import SearchBox from "@/components/header/search-box";

const Header = () => {
  return (
    <Container className="bg-[#FAF3E9]">
      <header className="flex flex-col md:flex-row md:gap-x-[34px] gap-y-6 items-center justify-center py-6 min-h-[114px]">
        {/* <Logo /> */}
        <HeaderLogo />

        <SearchBox className="w-full" />
        <HeaderNavs />
      </header>
    </Container>
  );
};

export default Header;
