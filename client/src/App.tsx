import { Route, Routes, useLocation } from "react-router";
import { lazy, Suspense, useEffect, useRef } from "react";
import "./App.css";
import { Loader } from "./UI/Loader/Loader";
import Header from "./components/Header/Header";

const LazyAuthrozation = lazy(
	() => import("./routes/Auth/Authorization/Authorization"),
);
const LazyLogMe = lazy(() => import("./routes/Auth/Logme/Logme"));
const LazyRegMe = lazy(() => import("./routes/Auth/Regme/Regme"));
const LazyCrm = lazy(() => import("./routes/CRM/Crm"));
const LazyCreateCRM = lazy(() => import("./routes/CRM/Create/CreateCRM"));
const LazyShowCRM = lazy(() => import("./routes/CRM/Show/ShowCRM"));
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
								<Route path="/crm" element={<LazyCrm />} />
								{/* Доработать КМ */}
								<Route path="/" element={<LazyAuthrozation />} />
								<Route path="/auth" element={<LazyAuthrozation />}>
									<Route path="regme" element={<LazyRegMe />} />
									<Route path="logme" element={<LazyLogMe />} />
								</Route>
								<Route path="*" element={<h2>Страница не существует</h2>} />
								<Route path="/crm/create" element={<LazyCreateCRM />} />
								<Route path="/crm/show/:id" element={<LazyShowCRM />} />
							</Routes>
							{/* <LazyOrgcard
								orgName="km"
								orgType="bo"
								orgInn="1123"
								orglocation="испечак 2"
								directorName="km"
								headAccountantName="km"
							/> */}
						</Suspense>
					</div> 
				</div>
			</main>
		</>
	);
}

export default App;
