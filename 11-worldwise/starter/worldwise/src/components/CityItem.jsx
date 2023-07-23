import { Link } from 'react-router-dom';
import { useCities } from "../context/CitiesContext";
import styles from './CityItem.module.css';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

const flagemojiToPNG = (flag) => {
    const codePoints = Array.from(flag, (char) => char.codePointAt(0));
    const countryCode = codePoints
        .map((code) => String.fromCharCode(code - 127397).toLowerCase())
        .join('');

    const flagImageUrl = `https://flagcdn.com/24x18/${countryCode}.png`;

    return <img src={flagImageUrl} alt="flag" />;
};

function CityItem({ city }) {
    const { currentCity, deleteCity } = useCities();
    const { id, emoji, date, cityName, position } = city;
    console.log(position);

    function handleClick(e) {
        e.preventDefault();
        console.log("Clicked");
        deleteCity(id);
    }

    return (
        <li>
            <Link
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
                className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
            >
                <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={(e) => handleClick(e)}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
