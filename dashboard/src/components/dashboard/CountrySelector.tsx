import Option from '@/ui/v2/Option';
import Select from '@/ui/v2/Select';
import { useGetCountriesQuery } from '@/utils/__generated__/graphql';

type CountrySelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const { data, error } = useGetCountriesQuery();

  if (error) {
    throw error;
  }

  const { countries } = data || {};

  return (
    <Select
      fullWidth
      value={value || null}
      onChange={(_event, inputValue) => onChange(inputValue as string)}
      placeholder="Select Country"
    >
      {countries?.map((country) => (
        <Option value={country.name}>{country.name}</Option>
      ))}
    </Select>
  );
}

export default CountrySelector;
