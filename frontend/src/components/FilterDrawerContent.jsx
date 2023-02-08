import { Checkbox, FormControlLabel, Grid } from "@mui/material";

const FilterDrawerContent = ({ needPeopleFilter, setNeedPeopleFilter, needDonationFilter, setNeedDonationFilter }) => {
    return (
        <Grid item xs={4} >
            <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={needPeopleFilter}
                            onChange={(event) => {
                                setNeedPeopleFilter(event.target.checked)
                            }}
                    />
                } 
                label="Gönüllü isteyenleri filtrele" 
            />
            <FormControlLabel 
                control={
                    <Checkbox 
                        checked={needDonationFilter}
                        onChange={(event) => {
                            setNeedDonationFilter(event.target.checked)
                        }}
                    />
                } 
                label="Yardım isteyenleri filtrele" 
            />
        </Grid> 
    );
}
 
export default FilterDrawerContent;