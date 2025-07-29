import styles from '../scss/components/_guesses.module.scss';

const GuessedCountries: React.FC = () => {
    return (
        <div className={styles['guesses-container']}>
            <ul className={styles['guesses-list']}>
                <li>Guess one</li>
                <li>Guess two</li>
                <li>Guess three</li>
            </ul>
        </div>
    )
}

export default GuessedCountries;