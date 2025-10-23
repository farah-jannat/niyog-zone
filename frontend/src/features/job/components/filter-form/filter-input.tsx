interface Props {
  label: string;
  placeholder?: string;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value?: string;
  type?: string;
  className?: string;
}

const FilterInput = (props: Props) => {
  const { handleFilterChange, label, className, placeholder, type, value } =
    props;

  return (
    <div>
      <label htmlFor={label}>{label}</label>

      <input
        id={label}
        type={type}
        value={value}
        onChange={handleFilterChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default FilterInput;
