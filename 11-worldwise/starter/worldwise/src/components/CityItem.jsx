import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));


function CityItem({ city }) {
    const flagemojiToPNG = (flag) => {
        const codePoints = Array.from(flag, (char) => char.codePointAt(0));
        const countryCode = codePoints
            .map((code) => String.fromCharCode(code - 127397).toLowerCase())
            .join('');

        const flagImageUrl = `https://flagcdn.com/24x18/${countryCode}.png`;

        return <img src={flagImageUrl} alt="flag" />;
    };

    const { id, emoji, date, cityName } = city;
    return (
        <li>
            <Link to={`${id}`} className={styles.cityItem}>
                <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
