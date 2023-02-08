import { Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Stack, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Cities from "../il.json";


function LocationDataGrid({ onUpdate, onCancel }) {
  	const [selectedLocation, setSelectedLocation] = useState('')
  	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [selectedRow, setSelectedRow] = useState(null)
	const { control, handleSubmit, formState: errors } = useForm()

	const locations = [
		{
			"id": 4,
			"name": "Gulcimen Aspava",
			"latitude": 39.9276529,
			"longitude": 32.8094168,
			"needs_people": true,
			"needs_donation": true,
			"help_message": "Yardim\n\r\nYardim2",
			"latest_information_date": "2023-02-07T22:50:47.893307Z",
			"geometry": {
				"lat": 39.9276529,
				"lon": 32.8094168
			},
			"help": {
				"needed": true,
				"message": "Yardim\n\r\nYardim2"
			},
			"properties": {
				"name": "Gulcimen Aspava"
			}
		},
		{
			"id": 5,
			"name": "Yardim Konumu 1",
			"latitude": 40.1,
			"longitude": 32.8094168,
			"needs_people": true,
			"needs_donation": true,
			"help_message": "Ihtiyac malzemeleri:\r\nBez\r\nMama\r\nGiysi\r\nBot\r\nBattaniye\r\nIsitici",
			"latest_information_date": "2023-02-08T09:34:51.169757Z",
			"geometry": {
				"lat": 40.1,
				"lon": 32.8094168
			},
			"help": {
				"needed": true,
				"message": "Ihtiyac malzemeleri:\r\nBez\r\nMama\r\nGiysi\r\nBot\r\nBattaniye\r\nIsitici"
			},
			"properties": {
				"name": "Yardim Konumu 1"
			}
		}
	]

  const columns = [
    { field: "name", headerName: "İsim", flex: 3, minWidth: 150},
    { field: "city", headerName: "Şehir", flex: 2, minWidth: 130},
    { field: "needs_people", headerName: "İnsan gücü ihtiyacı", type: "boolean", flex: 2, minWidth: 100 },
    { field: "needs_donation", headerName: "Erzak ihtiyacı", type: "boolean", editable: true, flex: 2, minWidth: 100 },
    { field: "help_message", headerName: "Yardım mesajı", editable: true, flex: 4, minWidth: 100 },
    { field: "severity", headerName: "Aciliyet", type: "numeric", editable: true, flex: 2, minWidth: 100 },
    { field: "latest_information_date", headerName: "Son güncellenme tarihi", type: "datetime", flex: 3, minWidth: 200 },
  ];  

  	const handleRowClick = (rowParams) => {
		console.log(rowParams)
		setSelectedRow(rowParams.row)
		setIsEditDialogOpen(true)
	}

	const handleClose = () => {
		setSelectedRow(null)
		setIsEditDialogOpen(false)
	}

	const onSubmit = (data) => {
		console.log(data)
	}
	
    return (
      <Container 
	  	p={2}
	  >
        <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Cities}
                autoSelect
                fullWidth
                onChange={(event, value, reason, details) => {
                    console.log(value)
                    localStorage.setItem("latest_city", JSON.stringify(value))
                }}
                renderInput={(params) => 
                
                <TextField {...params} 
                label="Şehir"
                value={selectedLocation}
                onChange={(event) => {
                  setSelectedLocation(event.target.value)
                }} />}
            />
            <div style={{ display: 'flex', width: "100%", height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  autoHeight
                  rows={locations}
                  columns={columns}
                  editMode="row"
                  onRowClick={handleRowClick}
                />
              </div>
            </div>
			<Dialog 
				open={isEditDialogOpen} 
				onClose={handleClose}
			>
				<DialogTitle>Konum Detaylarını Güncelle</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<DialogContentText></DialogContentText>
						<Stack spacing={2}>
							<Controller
								name='name'
								control={control}
								render={({ field }) => (
									<TextField 
										{...field}
										label='İsim'
										defaultValue={selectedRow?.name}
									/>
								)}
							/>
							<Controller
								name='city'
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
									  onChange={(event, item) => {
										onChange(item);
									  }}
									  value={value}
									  options={Cities}
									  getOptionLabel={(item) => (item ? item.label : "")}
									  getOptionSelected={(option, value) =>
										value === undefined || value === "" || option.id === value.id
									  }
									  defaultValue={Cities.find((c) => c.label === selectedRow?.city)}
									  renderInput={(params) => (
										<TextField
										  {...params}
										  label="Şehir"
										  margin="normal"
										  variant="outlined"
										  error={!!errors.city}
										  defaultValue={selectedRow?.city}
										/>
									  )}
									/>)}
								/>
							<FormControlLabel
								label="İnsan gücü ihtiyacı"
								control={
									<Controller
										name='needHelp'
										control={control}
										render={({ field }) => (
											<Checkbox 
												{...field}
												onChange={(e) => field.onChange(e.target.checked)}
												defaultChecked={selectedRow?.needs_people}
											/>
										)}
									/>
								}
							/>
							<FormControlLabel
								label="Erzak ihtiyacı"
								control={
									<Controller
										name='needDonation'
										control={control}
										render={({ field }) => (
												<Checkbox 
												{...field}
												onChange={(e) => field.onChange(e.target.checked)}
												defaultChecked={selectedRow?.needs_donation}
											/>
										)}
									/>
								}
							/>
							<Controller
								name='helpMessage'
								control={control}
								render={({ field }) => (
									<TextField 
										multiline
										label='Yardım mesajı'
										defaultValue={selectedRow?.help_message}
										{...field}
									/>
								)}
							/>
							<Controller
								name='severity'
								control={control}
								render={({ field }) => (
									<TextField 
										type='number'
										InputProps={{
											inputProps: {
												min: 0,
												max: 5,
											}
										}}
										label='Aciliyet'
										defaultValue={selectedRow?.severity}
										{...field}
									/>
								)}
							/>
							<TextField
								label="Son güncelleme tarihi"
								InputProps={{
									readOnly: true
								}}
								defaultValue={selectedRow?.latest_information_date}
							>

							</TextField>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button 
							variant='contained'
							onClick={handleClose}
						>
							Kapat
						</Button>
						<Button 
							type='submit'
							variant='contained'
						>
							Kaydet
						</Button>
					</DialogActions>
				</form>
			</Dialog>
      </Container>
    );
  }
    
export default LocationDataGrid;

