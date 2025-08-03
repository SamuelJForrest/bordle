import styles from '../scss/components/_countryinput.module.scss';

type AutocompleteCountryType = {
    name: string;
    flag: string;
}

type AutocompleteOptionType = {
    country: AutocompleteCountryType;
    index: number;
    cssClass: string;
    currentRef: React.RefObject<(HTMLLIElement | null)[]>;
    noOptions?: boolean;
    onClick: (e: React.MouseEvent<HTMLLIElement>) => void
};

type AutocompleteNoOptionsType = {
    noOptions: true
}

type AutocompleteOptionProps = AutocompleteOptionType | AutocompleteNoOptionsType

const AutocompleteOption: React.FC<AutocompleteOptionProps> = (props) => {
    if (props.noOptions) {
        return (
            <li className={styles['country-input-autocomplete-option']} role='option'>No countries available.</li>
        );
    }

    const {country, index, cssClass, currentRef, onClick } = props;

    return (
        <li
            className={styles[cssClass]}
            ref={el => {
                currentRef.current[index - 1] = el;
            }}
            role='option'
            onClick={onClick}
        >
            {country.flag} {country.name}
        </li>
    );
};

export default AutocompleteOption;
