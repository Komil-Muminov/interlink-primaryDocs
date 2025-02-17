import { Route, Routes, useLocation } from "react-router";
import { lazy, Suspense, useEffect, useRef } from "react";
import "./App.css";
import { Loader } from "./UI/Loader/Loader";
import Header from "./Components/Header/Header";

const LazyAuthrozation = lazy(
	() => import("./routes/Auth/Authorization/Authorization"),
);
const LazyLogMe = lazy(() => import("./routes/Auth/Logme/Logme"));
const LazyRegMe = lazy(() => import("./routes/Auth/Regme/Regme"));

const LazyPrimaryDocs = lazy(() => import("./routes/PrimaryDocs/PrimaryDocs"));

const LazyContracts = lazy(
	() => import("./routes/PrimaryDocs/Contracts/Contracts"),
);
const LazyInvoices = lazy(
	() => import("./routes/PrimaryDocs/Invoices/Invoices"),
);

const LazyOverhead = lazy(
	() => import("./routes/PrimaryDocs/Overhead/Overhead"),
);

const LazyPowerAttorney = lazy(
	() => import("./routes/PrimaryDocs/Power of Attorney/PowerAttorney"),
);

const LazyTravelExprenses = lazy(
	() => import("./routes/PrimaryDocs/Travel expenses/TravelExpenses"),
);

const LazyCertificateCompletionWork = lazy(
	() =>
		import(
			"./routes/PrimaryDocs/Сertificate of completion of work/СertificateCompletionWork"
		),
);

const LazyCreateContracts = lazy(
	() => import("./routes/PrimaryDocs/Contracts/Create/CreateContracts"),
);
const LazyShowContracts = lazy(
	() => import("./routes/PrimaryDocs/Contracts/Show/ShowContracts"),
);
// const LazyOrgcard = lazy(() => import("./routes/Orgcard/Orgcard"));
function App() {
	const location = useLocation();

	useEffect(() => {
		if (
			location.pathname === "/auth/logme" ||
			location.pathname === "/auth/regme"
		) {
			document.querySelector(".section-offset")?.classList.add("main-bg");
		} else {
			document.querySelector(".section-offset")?.classList.remove("main-bg");
		}
	}, [location.pathname]);
	return (
		<>
			<Header />
			<main className="section-offset">
				<div className="container">
					<div className="app__content">
						<Suspense fallback={<Loader />}>
							<Routes>
								<Route path="/primary-docs" element={<LazyPrimaryDocs />} />
								{/* Contracts */}
								<Route
									path="primary-docs/contracts"
									element={<LazyContracts />}
								/>
								<Route
									path="primary-docs/contracts/create"
									element={<LazyCreateContracts />}
								/>
								<Route
									path="primary-docs/contracts/show/:id"
									element={<LazyShowContracts />}
								/>
								{/* Invoices */}
								<Route
									path="primary-docs/invoices"
									element={<LazyInvoices />}
								/>
								{/* Overhead */}
								<Route
									path="primary-docs/overhead"
									element={<LazyOverhead />}
								/>
								{/* Power of attorney */}
								<Route
									path="primary-docs/power-of-attorney"
									element={<LazyPowerAttorney />}
								/>
								{/* Travel exprenses */}
								<Route
									path="primary-docs/travel-exprenses"
									element={<LazyTravelExprenses />}
								/>
								{/* Certificate of completion of work */}
								<Route
									path="primary-docs/certificate-of-completion-of-work"
									element={<LazyCertificateCompletionWork />}
								/>

								{/* Main route */}
								<Route path="/" element={<LazyAuthrozation />} />
								{/* Authorization */}
								<Route path="/auth" element={<LazyAuthrozation />}>
									<Route path="regme" element={<LazyRegMe />} />
									<Route path="logme" element={<LazyLogMe />} />
								</Route>
								{/* Error page */}
								<Route path="*" element={<h2>Страница не существует</h2>} />
							</Routes>
						</Suspense>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
