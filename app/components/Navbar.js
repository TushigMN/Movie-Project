const [dark, setDark] = useState(false);

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 bg-black text-white">
            <h1 className="text-xl font-bold">MovieCenter</h1>

            <ul className="flex gap-6">
                <li>Home</li>
                <li>Movies</li>
                <li>Watchlist</li>
            </ul>
        </nav>
    )
}