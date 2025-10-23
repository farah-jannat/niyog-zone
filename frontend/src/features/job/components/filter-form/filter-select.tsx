interface Props {
  label: string;
  id: string;
  options: string[];
  value: string;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder: string;
  className?: string;
}

const FilterSelect: React.FC<Props> = (props: Props) => {
  //  ** --- Props ---
  const {
    label,
    id,
    options,
    value,
    handleFilterChange,
    placeholder,
    className = "",
  } = props;

  return (
    <div
      className={`flex flex-col items-start w-full max-w-full gap-2 ${className}`}
    >
      <label htmlFor={id} className="text-[#03050F]">
        {label}
      </label>

      <div className="relative w-full">
        <select
          id={id}
          name={id}
          value={value}
          onChange={handleFilterChange}
          className="pr-10 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm appearance-none w-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm transition duration-150 ease-in-out"
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;
