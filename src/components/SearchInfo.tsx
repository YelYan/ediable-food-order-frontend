type Props = {
  city: string;
  total: number;
};
const SearchInfo = ({ total, city }: Props) => {
  return (
    <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
      <p className="text-medium md:text-xl font-bold">
        {total} restaurants found in {city}
      </p>
    </div>
  );
};

export default SearchInfo;
