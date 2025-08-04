import { useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import styles from '../scss/components/_countryinput.module.scss';
import type { BorldeCountryType } from '../types/bordleTypes';
import AutocompleteOption from './AutocompleteOption';

type CountryInputType = {
    countryList: BorldeCountryType[];
    setGuessedCountries: Dispatch<SetStateAction<BorldeCountryType[]>>;
    setGuessIndex: Dispatch<SetStateAction<number>>;
};

const CountryInput: React.FC<CountryInputType> = ({ countryList, setGuessedCountries, setGuessIndex }) => {
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
            const aLower = a.name.toLowerCase();
            const bLower = b.name.toLowerCase();

            const aStarts = aLower.startsWith(s);
            const bStarts = bLower.startsWith(s);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            return aLower.localeCompare(bLower);
        });

    const resetGuess = () => {
        setCountrySearch('');
        setActiveIndex(-1);
    };

    const makeGuess = (
        e: FormEvent | React.MouseEvent<HTMLLIElement>,
        selectedCountry?: BorldeCountryType
    ) => {
        e.preventDefault();

        const countryToGuess = selectedCountry ?? filteredCountries[activeIndex];

        if (!countryToGuess) {
            console.warn('No country selected. Please try again.');
            return;
        }

        setGuessedCountries(prev => [...prev, countryToGuess]);
        setGuessIndex(prev => prev + 1);
        resetGuess();
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
        } else if (e.key === 'Escape') {
            resetGuess();
        }

        activeElement?.scrollIntoView({
            block: 'end',
            behavior: 'auto',
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
                    value={countrySearch}
                />

                {countrySearch.length > 0 && (
                    <ul className={styles['country-input-autocomplete']}>
                        {filteredCountries.map((country, i) => {
                            return (
                                <AutocompleteOption
                                    country={country}
                                    key={i}
                                    index={i}
                                    cssClass={
                                        i === activeIndex
                                            ? 'country-input-autocomplete-option--active'
                                            : 'country-input-autocomplete-option'
                                    }
                                    currentRef={optionRefs}
                                    onClick={(e) => makeGuess(e, country)}
                                />
                            );
                        })}
                        {filteredCountries.length === 0 && <AutocompleteOption noOptions={true} />}
                    </ul>
                )}
            </div>
            <button className={styles['country-input-button']}>Submit</button>
        </form>
    );
};

export default CountryInput;
