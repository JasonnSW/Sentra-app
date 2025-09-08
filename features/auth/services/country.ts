import countries from "../../../constants/countries.json";

export const fetchCountries = async (): Promise<any[]> => {
  return countries as any;
};
