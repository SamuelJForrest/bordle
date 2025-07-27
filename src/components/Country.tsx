import type { CountryComponentType } from "../types/bordleTypes";

const Country: React.FC<CountryComponentType> = ({name, flag}) => {
    return (
        <div>
            <p>{flag}</p>
            <p>{name}</p>
        </div>
    )
}

export default Country;