import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import styles from '../scss/components/_countryinput.module.scss';
import type { BorldeCountryType } from '../types/bordleTypes';

type CountryInputType = {
    countryList: BorldeCountryType[] | undefined;
    submitGuess: Dispatch<SetStateAction<BorldeCountryType[]> | undefined>;
};

const CountryInput: React.FC<CountryInputType> = ({ countryList, submitGuess }) => {
    const [countrySearch, setCountrySearch] = useState<string>('');

    const makeGuess = (e: FormEvent) => {
        e.preventDefault();
        console.log(countryList);
    };

    const filteredCountries = countryList
        ?.filter(country => {
            if (countrySearch.trim() === '') return;

            return country?.name.toLowerCase().includes(countrySearch.toLowerCase());
        })
        .map((country, index) => (
            <li className={styles['country-input-autocomplete-option']} key={index}>
                {country?.flag} {country?.name}
            </li>
        ));

    const inputClass = countrySearch.trim().length > 0 ? 'country-input--active' : 'country-input';

    return (
        <form onSubmit={makeGuess} className={styles['country-input-container']}>
            <div className={styles['country-input-autocomplete-container']}>
                <input
                    type="text"
                    id="country-input"
                    name="country-input"
                    className={styles[inputClass]}
                    placeholder="Guess a country"
                    onChange={e => setCountrySearch(e.target.value)}
                    autoComplete="off"
                />
                {countrySearch.length > 0 && (
                    <ul className={styles['country-input-autocomplete']}>{filteredCountries}</ul>
                )}
            </div>
            <button className={styles['country-input-button']}>Submit</button>
        </form>
    );
};

export default CountryInput;
