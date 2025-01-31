import { Link } from "react-router-dom";
function CustomNav() {
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-lg font-bold">SAVR</div>
                    <ul className="flex gap-5">
                        
                        <li>
                            <Link to="/aboutUs" className="text-white hover:text-gray-400">About Us</Link>
                        </li>
                        <li>
                            <Link to="/aboutYou" className="text-white hover:text-gray-400">About You</Link>
                        </li>
                        <li>
                            <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                        </li>
                        <li>
                            <Link to="/account" className="text-white hover:text-gray-400">My Account</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>

        </>
    )
}

export default CustomNav;