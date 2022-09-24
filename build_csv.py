import requests

csv = 'first name,last name,group,role\n'

roles = ['Organizer', 'Presenter', 'Participant']


for i in range(3):
    group = f"group_{i}"
    for role in roles:
        for j in range(1000):
            csv += f"first_{i}_{j},last_{i}_{j},{group},{role}\n"


with open('data.csv', 'w') as csv_file:
    csv_file.write(csv)