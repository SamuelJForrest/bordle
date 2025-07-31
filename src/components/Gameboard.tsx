import { Col, Container, Row } from 'react-bootstrap';
import useCreateBordleCountriesList from '../functions/prepareBorldeCountries';
import CountryCard from './CountryCard';

import styles from '../scss/layout/_gameboard.module.scss';
import CountryInput from './CountryInput';
import { useState } from 'react';
import type { BordleGameType, BorldeCountryType } from '../types/bordleTypes';
import GuessedCountries from './GuessedCountries';

const GameBoard: React.FC<BordleGameType> = ({game}) => {
    const [guessedCountries, setGuessedCountries] = useState<BorldeCountryType[]>();

    return (
        <main>
            <Container>
                <Row>
                    <Col>
                    {game.fullCountryList && (
                        <div></div>
                    )}
                        <div className={styles['gameboard']}>
                            <div>
                                <>
                                    {game.randomCountry && (
                                        <CountryCard
                                            name={game.randomCountry.name}
                                            flag={game.randomCountry.flag}
                                            isMainCountry={true}
                                        />
                                    )}

                                    {game.fullCountryList && (
                                        <div className={styles['gameboard-wrap']}>
                                            <CountryInput
                                                countryList={game.fullCountryList}
                                                submitGuess={setGuessedCountries}
                                            />
                                            <GuessedCountries />
                                        </div>
                                    )}
                                </>
                            </div>
                            {game.borderingCountries &&
                                game.borderingCountries.map(country => {
                                    return (
                                        <div className={styles['gameboard-list']}>
                                            <CountryCard
                                                key={country.cca3}
                                                name={country.name}
                                                flag={country.flag}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default GameBoard;
