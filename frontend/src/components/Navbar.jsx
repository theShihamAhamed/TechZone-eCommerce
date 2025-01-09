import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";
import { useCartStore } from "../store/useCartStore.js";
import { useEffect } from "react";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const isSeller = user?.role === "seller";
	const { cart } = useCartStore();
	const showDashboard = isAdmin || isSeller;

	const navigate = useNavigate();

	useEffect(() => {
		console.log("User state changed:", user);
	}, [user]);

	const handleLogout = async () => {
		try {
		  await logout();
		  navigate("/");
		} catch (error) {
		  console.log(error);
		}
	  };

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-sky-800'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-gray-50 items-center space-x-2 flex'>
						E-Commerce
					</Link>

					<nav className='flex flex-wrap items-center gap-4'>
						<Link
							to={"/"}
							className='text-gray-300 hover:text-sky-400 transition duration-300
					 ease-in-out'
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='relative group text-gray-300 hover:text-sky-400 transition duration-300 
							ease-in-out'
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-sky-400' size={20} />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-sky-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-sky-400 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{showDashboard && (
							<Link
								className='bg-sky-700 hover:bg-sky-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
								onClick={handleLogout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/sign-up"}
									className='bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;