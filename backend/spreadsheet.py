"""
import gspread
import gspread_dataframe as gd

gc = gspread.service_account(filename='./credentials.json')

# Open a sheet from a spreadsheet in one go
sht1 = gc.open_by_url("https://docs.google.com/spreadsheets/d/1TT7DbGj6F6BN10PS0PkSLAXXLyX9i-ILlBEs70X-Lac/edit?usp=sharing")
worksheet = sht1.sheet1


df = gd.get_as_dataframe(worksheet, parse_dates=True)

# Extract the cell background color information
colors_D = df.iloc[1:21, 3].style.background_color.tolist()
colors_E = df.iloc[1:21, 4].style.background_color.tolist()
print('Colors of cells D2:D22:', colors_D)
print('Colors of cells E2:E22:', colors_E)


#print(sht1)
"""
import gspread
from gspread_dataframe import set_with_dataframe
import openpyxl 

# Use the credentials to authenticate with the Google API
gc = gspread.service_account(filename='./credentials.json')

# Open a sheet from a spreadsheet in one go
sht1 = gc.open_by_url("https://docs.google.com/spreadsheets/d/1TT7DbGj6F6BN10PS0PkSLAXXLyX9i-ILlBEs70X-Lac/edit?usp=sharing")

export_file = sht1.export(format= gspread.utils.ExportFormat.EXCEL)
f = open('temp.xlsx', 'wb')
f.write(export_file)
f.close()

# Load the Excel file into a Workbook object using openpyxl
workbook = openpyxl.reader.excel.load_workbook('temp.xlsx')

# Get the first sheet of the Workbook
worksheet = workbook.worksheets[0]

colors_D = []
colors_E = []

# Loop through the cells to extract the cell background color information
for row in range(2, 23):
    cell = worksheet.cell(row=row, column=4)
    colors_D.append(cell.fill.start_color.index)

for row in range(2, 23):
    cell = worksheet.cell(row=row, column=5)
    colors_E.append(cell.fill.start_color.index)

print('Colors of cells D2:D22:', colors_D)
print('Colors of cells E2:E22:', colors_E)
