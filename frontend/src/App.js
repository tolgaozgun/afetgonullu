// https://www.tecforfun.com/frameworks/how-to-integrate-openstreetmap-into-react-apps/

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import "./App.css";
import HelpCenters from "./pages/HelpCenters";

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HelpCenters />,
	},
  ]);

export default function App() {
	return (
		<>
			<RouterProvider router={router} />
			<div class="App">

			</div>
		</>
	)
	
}