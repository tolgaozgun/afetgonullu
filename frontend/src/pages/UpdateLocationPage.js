import React, { useState } from 'react';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid, MenuItem } from '@mui/material';
// 1) Malzeme ihtiyaç durumu dropdown
// 2) İş gücü dropdown
// 3) not editleme textfield

const UpdateLocationPage = () => {
    const statusList = ["Üst Düzey Aciliyet", "Orta Aciliyet", "Hafif Destek", "Aciliyeti Yok / İhtiyaç Yok", "Kapalı / Aktif Değil", "Henüz Veri Yok"]
    

    const [selectedIsGucu, setSelectedIsGucu] = useState("Henüz Veri Yok");

    const [selectedMalzeme, setSelectedMalzeme] = useState("Henüz Veri Yok");
    
    const handleIsGucuChange = (value) => {
        setSelectedIsGucu(value);
    };
    
    const handleMalzemeChange = (value) => {
        setSelectedMalzeme(value);
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Select
                    labelId="status-list-label"
                    id="status-list-id"
                    value={selectedIsGucu}
                    label="İş Gücü İhtiyacı"
                    onChange={handleIsGucuChange}
                >
                    {statusList.map((status)=>(
                        <MenuItem value={{status}}>{status}</MenuItem>
                    ))}
                </Select>
                <Select
                    labelId="malzeme-list-label"
                    id="malzeme-list-id"
                    value={selectedMalzeme}
                    label="Malzeme İhtiyacı"
                    onChange={handleMalzemeChange}
                >
                    {statusList.map((status)=>(
                        <MenuItem value={{status}}>{status}</MenuItem>
                    ))}
                </Select>
            </Grid>

        </Grid>);
};

export default UpdateLocationPage;