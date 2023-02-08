import gspread

gc = gspread.service_account(filename='./credentials.json')

# Open a sheet from a spreadsheet in one go
sht1 = gc.open_by_url("https://docs.google.com/spreadsheets/d/1TT7DbGj6F6BN10PS0PkSLAXXLyX9i-ILlBEs70X-Lac/edit?usp=sharing")



print(sht1)