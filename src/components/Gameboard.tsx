import { Col, Container, Row } from 'react-bootstrap';
import useCreateBordleCountriesList from '../functions/prepareBorldeCountries';
import CountryCard from './CountryCard';

import styles from '../scss/layout/_gameboard.module.scss';
import CountryInput from './CountryInput';
import { useState } from 'react';
import type { BorldeCountryType } from '../types/bordleTypes';
import GuessedCountries from './GuessedCountries';

const GameBoard: React.FC = () => {
    const bordle = useCreateBordleCountriesList();
    const [guessedCountries, setGuessedCountries] = useState<BorldeCountryType[]>();

    return (
        <main>
            <Container>
                <Row>
                    <Col>
                        <div className={styles['gameboard']}>
                            <div>
                                {bordle.randomCountry && (
                                    <>
                                        <CountryCard
                                            name={bordle.randomCountry!.name}
                                            flag={bordle.randomCountry!.flag}
                                            isMainCountry={true}
                                        />
                                        <div className={styles['gameboard-wrap']}>
                                            <CountryInput
                                                countryList={bordle.fullCountryList}
                                                submitGuess={setGuessedCountries}
                                            />
                                            <GuessedCountries />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className={styles['gameboard-list']}>
                                {bordle.borderingCountries &&
                                    bordle.borderingCountries?.map(country => {
                                        return (
                                            <CountryCard
                                                key={country!.cca3}
                                                name={country!.name}
                                                flag={country!.flag}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default GameBoard;
