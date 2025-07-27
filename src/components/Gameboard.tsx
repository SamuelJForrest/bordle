import { Col, Container, Row } from 'react-bootstrap';
import useCreateBordleCountriesList from '../functions/prepareBorldeCountries';
import Country from './Country';

const GameBoard: React.FC = () => {
    const bordle = useCreateBordleCountriesList();

    return (
        <main>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <div>
                                <Country name={bordle.randomCountry!.name} flag={bordle.randomCountry!.flag} />
                            </div>
                            <div>
                                {bordle.borderingCountries?.map(country => {
                                    return <Country name={country!.name} flag={country!.flag} />;
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
