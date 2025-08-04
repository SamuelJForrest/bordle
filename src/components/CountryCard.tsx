import type { CountryComponentType } from '../types/bordleTypes';

import styles from '../scss/components/_countrycard.module.scss';

const CountryCard: React.FC<CountryComponentType> = ({ name, flag, isMainCountry, isVisible }) => {
    let cardClass = isMainCountry ? 'country-card--main' : 'country-card';

    if (isVisible) {
        cardClass = cardClass += '--visible';
    }

    return (
        <div className={styles[cardClass]}>
            <div className={styles['country-card-wrap']}>
                <div className={styles['country-card-front']}></div>
                <div className={styles['country-card-back']}>
                    <p className={styles['country-card-emoji']}>{flag}</p>
                </div>
            </div>
            <p className={styles['country-card-name']}>{isVisible ? name : '????'}</p>
        </div>
    );
};

export default CountryCard;
