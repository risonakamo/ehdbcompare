### usage
webpage cross compares ehdb-ext and chrome bookmarks.

requires two files:
1. **ehdb-ext backup JSON:** use ehdb-ext's built in backup feature to generate a database backup json
2. **bookmark data JSON:** navigate to the target bookmark folder in *lambda bookmark new tab extension*. execute the script present in ```extractbookmarkpage.js```, copy the results into a **JSON** file.

then:
- place the files in an accessible folder
- point the file paths to the files in ```index.js```.