import { Col, Container, Row } from 'react-bootstrap';
import CountryCard from './CountryCard';

import styles from '../scss/layout/_gameboard.module.scss';
import CountryInput from './CountryInput';
import { useState } from 'react';
import type { BordleGameType, BorldeCountryType } from '../types/bordleTypes';
import GuessedCountries from './GuessedCountries';

const GameBoard: React.FC<BordleGameType> = ({ game }) => {
    const [guessedCountries, setGuessedCountries] = useState<BorldeCountryType[]>([]);
    const [guessIndex, setGuessIndex] = useState<number>(0);
    const [gameInProgress, setGameInProgess] = useState<boolean>(true);
    const randomCountry = game.randomCountry;

    return (
        <main>
            <Container>
                <Row>
                    <Col>
                        {game.fullCountryList && (
                            <div className={styles['gameboard']}>
                                <div>
                                    {game.randomCountry && (
                                        <CountryCard
                                            name={game.randomCountry.name}
                                            flag={game.randomCountry.flag}
                                            isMainCountry={true}
                                            isVisible={!gameInProgress}
                                        />
                                    )}

                                    {game.fullCountryList && (
                                        <div className={styles['gameboard-wrap']}>
                                            <CountryInput
                                                countryList={game.fullCountryList}
                                                setGuessedCountries={setGuessedCountries}
                                                setGuessIndex={setGuessIndex}
                                                countryToGuess={randomCountry}
                                                gameInProgress={gameInProgress}
                                                setGameInProgress={setGameInProgess}
                                            />

                                            {guessedCountries && guessedCountries.length > 0 && (
                                                <GuessedCountries list={guessedCountries} />
                                            )}
                                        </div>
                                    )}
                                </div>
                                {game.borderingCountries && (
                                    <div className={styles['gameboard-list']}>
                                        {game.borderingCountries.map((country, i) => {
                                            return (
                                                <CountryCard
                                                    key={i}
                                                    name={country.name}
                                                    flag={country.flag}
                                                    isVisible={i <= guessIndex ? true : false}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default GameBoard;
