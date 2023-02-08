import gspread
from oauth2client.service_account import ServiceAccountCredentials


# define the credentials for the Google API
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)

# open the Google spreadsheet
gc = gspread.authorize(credentials)
spreadsheet = gc.open_by_url("https://docs.google.com/spreadsheets/d/e/2PACX-1vSha8soQR5PWU5FjxLmmcMsHI4p6xUtd5V-oSQG_sd9dhP43rLxkNOceRxi59P1ClmNmTxe1mBtgPos/pubhtml")
worksheet = spreadsheet.get_worksheet(0)

# get the data from the worksheet
data = worksheet.get_all_values()

# loop through the data and save it to the Django models
for row in data:
    print("row: " + row)
    # create a new model instance with the data
    #model = Model(field1=row[0], field2=row[1], field3=row[2])
    # save the model to the database
    #model.save()