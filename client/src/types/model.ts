export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string|null;
  username: string;
  gender: string;
  confirmed: boolean;
  created_at: string;
  updated_at: string;
};

export type Currency = {
  code: string,
  name: string,
  symbol: string
};

export type Language = {
  iso639_1: string,
  iso639_2: string,
  name: string,
  nativeName: string
};

export type RegionBloc = {
  acronym: string,
  name: string,
  otherAcronyms: string[],
  otherNames: string[]
};

export type Country = {
  name: string,
  topLevelDomain: string[],
  alpha2Code: string,
  alpha3Code: string,
  callingCodes: string[],
  capital: string,
  altSpellings: string[],
  region: string,
  subregion: string,
  population: number,
  latlng: number[],
  demonym: string,
  area: number,
  gini: number,
  timezones: string[],
  borders: string[],
  nativeName: string,
  numericCode: string,
  currencies: Currency[],
  languages: Language[],
  translations: {
    [key: string]: string
  },
  flag: string,
  regionalBlocs: RegionBloc[],
  cioc: string
};

export type FilteredCountry = {
  name: string,
  alpha2Code: string
};
