import GameBoard from './components/Gameboard';
import Header from './components/Header';
import useCreateBordleCountriesList from './functions/prepareBorldeCountries';
import './scss/main.scss';

function App() {
    const bordle = useCreateBordleCountriesList();

    if (!bordle.borderingCountries || !bordle.fullCountryList || !bordle.randomCountry) return;

    const bordleGame = {
        randomCountry: bordle.randomCountry,
        fullCountryList: bordle.fullCountryList,
        borderingCountries: bordle.borderingCountries,
    };

    return (
        <>
            <Header />
            <GameBoard game={bordleGame} />
        </>
    );
}

export default App;
