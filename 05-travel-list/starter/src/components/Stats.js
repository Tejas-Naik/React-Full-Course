export default function Stats({ items }) {

    if (!items.length) {
        return (
            <p className="stats">
                Start adding some items to your packing list 🚀.
            </p>
        )
    }

    const numItems = items.length;
    let packed = items.filter(item => item.packed).length;
    const percentage = (packed * 100) / numItems;

    return <footer className="stats">
        <em>
            {percentage === 100 ?
                "You got everything. Ready to go 🛫."
                :
                `You have ${numItems} items in your list, and you already packed ${packed} (${percentage}%).`
            }</em>

    </footer>
};