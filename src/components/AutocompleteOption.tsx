import type { ReactNode } from 'react';
import styles from '../scss/components/_countryinput.module.scss';

type AutocompleteOptionProps = {
    index?: number;
    cssClass: string;
    currentRef?: React.RefObject<(HTMLLIElement | null)[]>;
    onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
    children: ReactNode;
};

const AutocompleteOption: React.FC<AutocompleteOptionProps> = ({
    index,
    cssClass,
    currentRef,
    onClick,
    children,
}) => {
    const setRef =
        typeof index === 'number' && currentRef
            ? (el: HTMLLIElement | null) => {
                  currentRef.current[index] = el;
              }
            : undefined;

    return (
        <li
            className={styles[cssClass]}
            {...(setRef ? { ref: setRef } : {})}
            role="option"
            onClick={onClick}
        >
            {children}
        </li>
    );
};

export default AutocompleteOption;
