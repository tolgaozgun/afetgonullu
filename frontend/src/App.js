// https://www.tecforfun.com/frameworks/how-to-integrate-openstreetmap-into-react-apps/

import { Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import HelpCenters from "./pages/HelpCenters";
import LocationTable from "./pages/LocationTable";
import AddLocation from "./pages/AddLocation";
import SignIn from "./pages/SignIn";
import UpdateLocationPage from "./pages/UpdateLocationPage";

export default function App() {
	return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HelpCenters/>}/>
			{/* <Route path="/konumekle" element={<AddLocation/>}/> */}
			<Route path="/konumlar" element={<LocationTable/>}/>
			<Route path="/giris" element={<SignIn/>}/>
			<Route path="/updateLocation" element={<UpdateLocationPage/>}/>
			<Route path="*" element={<HelpCenters />} />
		</Routes>
	</BrowserRouter>
	)
}