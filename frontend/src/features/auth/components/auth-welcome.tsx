interface Props {
  title: string;
  subTitle: string;
}

const AuthWelcome = (props: Props) => {
  const { title, subTitle } = props;

  return (
    <div className="relative z-10 overflow-hidden hidden xl:flex flex-col items-center h-full justify-center  gap-[22px] text-[#35373F] text-[16px] rounded-[8px] card-gradient-bluish bg-[#EAF2F4]">
      <h3 className="text-[40px] font-bold">{title}</h3>
      <p className="max-w-[431px] text-center">
        {subTitle}
      </p>

      {/* design elements */}

      <div className="bg-[#F6FCEF] w-56 h-56 rounded-full absolute -z-10 -left-[50px] -top-[50px] card-gradient-green" />
      <div className="bg-[#F0F7F1] w-28 h-28 rounded-full absolute -z-10 left-[50%] top-[40%] card-gradient-green" />

      <div className="bg-[#F0F7F1] w-28 h-28 rounded-full absolute -z-10 left-5 top-[50%] card-gradient-green" />

      <div className="bg-[#F0F7F1] w-28 h-28 rounded-full absolute -z-10 left-[50%] bottom-[70px] card-gradient-green" />

      <div className="bg-[#F6FCEF] w-56 h-56 rounded-full absolute -z-10 -left-[50px] -bottom-[50px] card-gradient-green" />

      <div className="bg-[#F6FCEF] w-56 h-56 rounded-full absolute -z-10 -right-[100px] -bottom-[100px] card-gradient-green" />
    </div>
  );
};

export default AuthWelcome;
