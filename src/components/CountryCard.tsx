import type { CountryComponentType } from "../types/bordleTypes";

import styles from '../scss/components/_countrycard.module.scss';

const CountryCard: React.FC<CountryComponentType> = ({name, flag, isMainCountry, isHidden}) => {
    const emojiClass = isMainCountry ? "country-card-emoji--main" : "country-card-emoji";
    const nameClass = isMainCountry ? "country-card-name--main" : "country-card-name";
    const cardClass = isHidden ? "country-card--hidden" : "country-card";

    return (
        <div className={styles[cardClass]}>
            <p className={styles[emojiClass]}>{flag}</p>
            <p className={styles[nameClass]}>{name}</p>
        </div>
    )
}

export default CountryCard;