export interface CountryApiResponse {
  flags: {
    png: string;
    svg?: string;
    webp?: string;
    jpg?: string;
    jpeg?: string;
    alt?: string;
  };
  idd: {
    root: string;
    suffixes?: string[];
  };
  name: {
    common: string;
    official?: string;
  };
  region: string;
  cca2: string;
  cca3: string;
}

export type CountrySelectProps = {
  onSelect: (code: string) => void;
};

export type CountryData = {
  flag: string;
  dialCode: string;
  region: string;
  name: string;
};
