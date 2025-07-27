import type { CountryPicker } from '@yusifaliyevpro/countries/types';

type BordleCountryPickerType = CountryPicker<['name', 'flag', 'borders', 'cca3']>[] | null;

type BorldeCountryType = {
    name: string;
    acceptedNames: string[];
    flag: string;
    borders: string[];
    cca3: string;
} | null;

type CountryComponentType = {
    name: string;
    flag: string;
    isMainCountry?: boolean;
    isHidden?: boolean;
}

export type {BordleCountryPickerType, BorldeCountryType, CountryComponentType};