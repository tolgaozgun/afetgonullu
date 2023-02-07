// https://www.tecforfun.com/frameworks/how-to-integrate-openstreetmap-into-react-apps/

import { Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import HelpCenters from "./pages/HelpCenters";
import SignIn from "./pages/SignIn";

export default function App() {
	return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HelpCenters/>}/>
			<Route path="/giris" element={<SignIn/>}/>
			<Route path="*" element={<HelpCenters />} />
		</Routes>
	</BrowserRouter>
	)
}