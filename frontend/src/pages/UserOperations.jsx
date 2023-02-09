import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";

const UserOperations = () => {
    const rows = [
        {}
    ]
    const columns = [
        { field: "email", header: "E-mail", width: 150 },
        { field: ""}
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