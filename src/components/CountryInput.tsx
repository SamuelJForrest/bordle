import { useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import styles from '../scss/components/_countryinput.module.scss';
import type { BorldeCountryType } from '../types/bordleTypes';

type CountryInputType = {
    countryList: BorldeCountryType[];
    submitGuess: Dispatch<SetStateAction<BorldeCountryType[]>>;
};

const CountryInput: React.FC<CountryInputType> = ({ countryList, submitGuess }) => {
    const [countrySearch, setCountrySearch] = useState<string>('');
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

    const filteredCountries = countryList
        ?.filter(country => {
            if (countrySearch.trim() === '') return;

            return country?.name.toLowerCase().includes(countrySearch.toLowerCase());
        })
        .sort((a, b) => {
            const s = countrySearch.toLowerCase();
            const aLower = a?.name.toLowerCase();
            const bLower = b?.name.toLowerCase();

            const aStarts = aLower!.startsWith(s);
            const bStarts = bLower!.startsWith(s);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            return aLower!.localeCompare(bLower!);
        })
        .map((country, index) => {
            const optionClass =
                index === activeIndex
                    ? 'country-input-autocomplete-option--active'
                    : 'country-input-autocomplete-option';

            return (
                <li
                    className={styles[optionClass]}
                    key={index}
                    ref={el => {
                        optionRefs.current[index - 1] = el;
                    }}
                >
                    {country?.flag} {country?.name}
                </li>
            );
        });

    const makeGuess = (e: FormEvent) => {
        e.preventDefault();
        console.log(countrySearch);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!countrySearch?.length) return;

        const activeElement = optionRefs.current[activeIndex];

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (activeIndex >= filteredCountries?.length - 1) return;

            setActiveIndex(prev => prev + 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();

            if (activeIndex <= 0) return;

            setActiveIndex(prev => prev - 1);
        } else if (e.key === 'Escape')
        {
            setCountrySearch("");
            setActiveIndex(-1);
        }

        activeElement?.scrollIntoView({
            block: 'end',
            behavior: 'auto'
        });
    };

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
                    onKeyDown={e => handleKeyDown(e)}
                    autoComplete="off"
                />
                {countrySearch.length > 0 && (
                    <ul className={styles['country-input-autocomplete']}>
                        {filteredCountries}
                        {filteredCountries?.length === 0 && (
                            <li
                                className={styles['country-input-autocomplete-option']}
                                key="no suggestions"
                            >
                                No countries available.
                            </li>
                        )}
                    </ul>
                )}
            </div>
            <button className={styles['country-input-button']}>Submit</button>
        </form>
    );
};

export default CountryInput;
