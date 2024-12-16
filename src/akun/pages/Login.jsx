import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const toggleDarkMode = () => {
		if (document.documentElement.classList.contains("dark")) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("color-theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("color-theme", "dark");
		}
	};

	useEffect(() => {
		// Cek apakah sudah ada token JWT
		if (localStorage.getItem("jwt")) {
			navigate("/");
		}

		// Logika untuk dark mode
		const storedTheme = localStorage.getItem("color-theme");
		const prefersDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		if (storedTheme === "dark" || (storedTheme === null && prefersDarkMode)) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				createApiUrl(API_CONFIG.ENDPOINTS.AUTH.SIGNIN),
				{
					method: "POST",
					headers: API_CONFIG.HEADERS,
					body: JSON.stringify({
						username: email,
						password: password,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Email atau Password salah");
			}

			const data = await response.json();
			console.log("Loin success:", data);
			alert("Login Berhasil");
			localStorage.setItem("jwt", data.data.token);

			try {
				const responseUser = await fetch(createApiUrl(API_CONFIG.ENDPOINTS.USER.PROFILE), {
					method: "GET",
					headers: getAuthHeader(),
				});

				if (!responseUser.ok) {
					const errorData = await responseUser.json();
					throw new Error(errorData.message || "Failed to get personal user");
				}
				const dataUser = await responseUser.json();
				localStorage.setItem("role", dataUser.data.role.name);
			} catch (error) {
				console.error("Error:", error.message);
			}

			window.location.href = "/";
		} catch (error) {
			console.error("Error:", error.message);
			alert(`Gagal login: ${error.message}`);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800 relative">
				<button
					onClick={toggleDarkMode}
					type="button"
					className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
				>
					<svg
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
					</svg>
				</button>
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
					Masuk ke Platform
				</h2>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Email Anda
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="name@company.com"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Kata Sandi Anda
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="••••••••"
							required
						/>
					</div>
					<div className="flex items-start">
						<div className="flex items-center h-5">
							<input
								id="remember"
								name="remember"
								type="checkbox"
								className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>
						<div className="ml-3 text-sm">
							<label
								htmlFor="remember"
								className="font-medium text-gray-900 dark:text-white"
							>
								Ingat Saya
							</label>
						</div>
						<a
							href="#"
							className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
						>
							Lupa Kata Sandi?
						</a>
					</div>
					<button
						type="submit"
						className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						Masuk
					</button>
					<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Belum terdaftar?{" "}
						<a
							href="/register"
							className="text-primary-700 hover:underline dark:text-primary-500"
						>
							Buat akun
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
