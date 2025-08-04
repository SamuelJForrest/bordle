import type { CountryPicker } from '@yusifaliyevpro/countries/types';

type BordleCountryPickerType = CountryPicker<['name', 'flag', 'borders', 'cca3']>[] | null;

type BordleGameType = {
    game: {
        randomCountry: BorldeCountryType;
        fullCountryList: BorldeCountryType[];
        borderingCountries: BorldeCountryType[];
    }
};

type BorldeCountryType = {
    name: string;
    acceptedNames: string[];
    flag: string;
    borders: string[];
    cca3: string;
};

type CountryComponentType = {
    name: string;
    flag: string;
    isMainCountry?: boolean;
    isVisible?: boolean;
};

export type { BordleCountryPickerType, BorldeCountryType, CountryComponentType, BordleGameType };
