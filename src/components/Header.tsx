import { Col, Container, Row } from "react-bootstrap";
import styles from '../scss/layout/_header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <Container>
                <Row>
                    <Col>
                        <h1 className={styles.headerTitle}>Bordle</h1>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;