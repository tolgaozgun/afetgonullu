import { redirect } from "react-router-dom";
import { Button, Container } from "@mui/material";



const Dashboard = () => {
  
    const handleClick = () => {
      redirect("/konumlar");
    };
  
    return (
        <Container maxWidth="lg">
            <Button variant="contained" color="primary" onClick={handleClick}>
                Konumlar Listesi
            </Button>
        </Container>
    );
  };
  
  export default Dashboard;