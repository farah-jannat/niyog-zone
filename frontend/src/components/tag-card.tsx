interface Props {
  label: string;
  value: string | number;
}

const TagCard = (props: Props) => {
  const { label, value } = props;

  return (
    <div className="flex flex-col items-start col-span-2 md:col-span-3  xl:col-span-2 bg-[#FEFEFF] rounded-[4px] gap-1  sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-6">
      <p className="text-[#68696F] text-[12px]"> {label}</p>
      <h3 className=" text-[#03050F] ">{value}</h3>
    </div>
  );
};

export default TagCard;
