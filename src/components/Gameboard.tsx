import { Col, Container, Row } from 'react-bootstrap';
import useCreateBordleCountriesList from '../functions/prepareBorldeCountries';
import Country from './Country';

import styles from '../scss/layout/_gameboard.module.scss';

const GameBoard: React.FC = () => {
    const bordle = useCreateBordleCountriesList();

    return (
        <main>
            <Container>
                <Row>
                    <Col>
                        <div className={styles["gameboard"]}>
                            <div>
                                {bordle.randomCountry && (
                                    <Country name={bordle.randomCountry!.name} flag={bordle.randomCountry!.flag} />
                                )}
                            </div>
                            <div>
                                {bordle.borderingCountries && bordle.borderingCountries?.map(country => {
                                    return <Country key={country!.cca3} name={country!.name} flag={country!.flag} />;
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
