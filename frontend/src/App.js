// https://www.tecforfun.com/frameworks/how-to-integrate-openstreetmap-into-react-apps/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddLocation from "./pages/panel/AddLocation";
import HelpCenters from "./pages/public/HelpCenters";
import LocationTable from "./pages/panel/LocationTable";
import SignIn from "./pages/SignIn";
import UpdateLocationPage from "./pages/UpdateLocationPage";
import UserOperations from "./pages/UserOperations";
import Dashboard from "./pages/panel/Dashboard";

export default function App() {
	return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HelpCenters/>}/>
			{/* <Route path="/konumekle" element={<AddLocation/>}/> */}
			<Route path="/konumlar" element={<LocationTable/>}/>
			<Route path="/giris" element={<SignIn/>}/>
			<Route path="/panel" element={<Dashboard/>}/>
			<Route path="/updateLocation" element={<UpdateLocationPage/>}/>
			<Route path="/kullanici-islemleri" element={<UserOperations />}></Route>
			<Route path="*" element={<HelpCenters />} />
		</Routes>
	</BrowserRouter>
	)
}