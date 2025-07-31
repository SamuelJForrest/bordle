import { useEffect, useState } from 'react';
import { getCountries } from '@yusifaliyevpro/countries';
import type { BordleCountryPickerType, BorldeCountryType } from '../types/bordleTypes';

const useCreateBordleCountriesList = () => {
    const [randomCountry, setRandomCountry] = useState<BorldeCountryType>();
    const [borderingCountries, setBorderingCountries] = useState<BorldeCountryType[]>();
    const [fullCountryList, setFullCountryList] = useState<BorldeCountryType[]>();

    useEffect(() => {        
        const prepareBordleCountries = async () => {
            const allCountries: BordleCountryPickerType = await getCountries({
                fields: ['name', 'flag', 'borders', 'cca3'],
            });

            if (allCountries == null) return;

            const bordleCountries: BorldeCountryType[] = allCountries
                .filter(country => country.borders && country.borders.length > 0)
                .map(country => ({
                    name: country.name.common,
                    acceptedNames: [country.name.official],
                    flag: country.flag,
                    borders: country.borders!,
                    cca3: country.cca3,
                }));

            setFullCountryList(bordleCountries);

            const randomCountry =
                bordleCountries[Math.floor(Math.random() * bordleCountries.length)];
            setRandomCountry(randomCountry);

            const countriesBorderingRandomCountry = bordleCountries.filter(country =>
                country?.borders.includes(randomCountry!.cca3)
            );
            setBorderingCountries(countriesBorderingRandomCountry);
        };

        prepareBordleCountries();
    }, []);

    return { randomCountry, borderingCountries, fullCountryList };
};

export default useCreateBordleCountriesList;
