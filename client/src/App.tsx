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
const LazyPrimaryDocs = lazy(() => import("./routes/PrimaryDocs/PrimaryDocs"));
const LazyCrm = lazy(() => import("./routes/PrimaryDocs/Contracts/Contracts"));
const LazyConstructor = lazy(
	() => import("./routes/PrimaryDocs/Contracts/Create/Constructor"),
);
const LazyShowCRM = lazy(
	() => import("./routes/PrimaryDocs/Contracts/Show/ShowDocs"),
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
								<Route path="*" element={<h2>Страница не существует</h2>} />
								<Route
									path="/primary-docs"
									element={<LazyPrimaryDocs />}
								>
                  
                </Route>
								<Route path="/crm" element={<LazyCrm />} />
								<Route path="/" element={<LazyAuthrozation />} />
								<Route path="/auth" element={<LazyAuthrozation />}>
									<Route path="regme" element={<LazyRegMe />} />
									<Route path="logme" element={<LazyLogMe />} />
								</Route>
								<Route path="/crm/create" element={<LazyConstructor />} />
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
