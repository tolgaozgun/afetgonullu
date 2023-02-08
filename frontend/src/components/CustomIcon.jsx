// Severity is between 0-5 where 5 is the highest severity
import BlueMarker from "../img/squat-marker-blue.svg"
import GreenMarker from "../img/squat-marker-green.svg"
import GreyMarker from "../img/squat-marker-grey.svg"
import OrangeMarker from "../img/squat-marker-orange.svg"
import RedMarker from "../img/squat-marker-red.svg"
import YellowMarker from "../img/squat-marker-yellow.svg"

const CustomIcon = ({ severity }) => {
    switch (severity) {
        case "0":
            return BlueMarker
        case "1":
            return GreyMarker
        case "2":
            return GreenMarker
        case "3":
            return YellowMarker
        case "4":
            return OrangeMarker
        case "5":
            return RedMarker
        default:
            return GreyMarker
        
    }
}
 
export default CustomIcon;