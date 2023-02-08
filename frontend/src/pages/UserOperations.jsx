import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";

const UserOperations = () => {
    const rows = [
        {}
    ]
    const columns = [
        { field: "E-mail", header: "E-mail", width: 150 },
        { field: "Per"}
    ]

    useEffect(() => {

    }, [])

    return (
        <DataGrid

        >

        </DataGrid>
    );
}
 
export default UserOperations;