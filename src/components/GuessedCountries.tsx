import styles from '../scss/components/_guesses.module.scss';
import type { BorldeCountryType } from '../types/bordleTypes';

type GuessedCountriesComponent = {
    list: BorldeCountryType[];
};

const GuessedCountries: React.FC<GuessedCountriesComponent> = ({ list }) => {
    if (!list) return;

    return (
        <div className={styles['guesses-container']}>
            <h3>Countries Guessed:</h3>
            <ul className={styles['guesses-list']}>
                {list.map(country => (
                    <li
                        key={country.cca3}
                        data-icon={country.flag}
                        className={styles['guesses-item']}
                    >
                        <span>{country.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GuessedCountries;
