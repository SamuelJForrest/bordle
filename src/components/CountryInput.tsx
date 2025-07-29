import type { Dispatch, FormEvent, SetStateAction } from 'react';
import styles from '../scss/components/_countryinput.module.scss';
import type { BorldeCountryType } from '../types/bordleTypes';

type CountryInputType = {
    countryList: BorldeCountryType[] | undefined;
    submitGuess: Dispatch<SetStateAction<BorldeCountryType[]> | undefined>;
}

const CountryInput: React.FC<CountryInputType> = ({countryList, submitGuess}) => {
    const makeGuess = (e: FormEvent) => {
        e.preventDefault();
        console.log(countryList);
    }

    return (
        <form onSubmit={makeGuess} className={styles['country-input-container']}>
            <input type="text" id="country-input" name="country-input" className={styles['country-input']} placeholder='Guess a country' />
            <button className={styles['country-input-button']}>Submit</button>
        </form>
    );
};

export default CountryInput;
