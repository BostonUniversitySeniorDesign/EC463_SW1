# EC463_SW1

## Usage:

To run on IOS:
* `npm i`

For Intel Macs:
* `cd ios/ && pod install && cd ..`
For M1 Macs:
* `cd ios/ && arch -x86_64 pod install && cd ..`

Then:
* `npx react-native run-ios`

## Design:

### Front End:

- Initial login screen (using Google authentication) provides context to store data associated to user
- After login, access to scanner screen is allowed
- Once barcode is detected it's value is passed along to the "backend" processing

### Back End:

- Once barcode string is passed, first it is placed into a query object
- The query object is posted to the Food Data Central (FDC) API
- This query returns an array of possible matches, the first element being the relevant item
- This food item is taken, its foodNutrients array elements searched for calories and macronutrients
- This data is then stored in a structure along with a Date string of the current day and sent to the Firebase database

## Testing:

### Login:

- Initial testing was for the Google Firebase login
- Consisted of making sure our Google accounts could login then the uid identified

### Barcode Scanner:

- First the application was loaded onto an iPhone for testing
- Then a barcode was placed into view of the camera
- An alert was then thrown up with the barcode string as data

### API communication:

- First a test barcode was decided upon (Welch's Fruit Snacks)
- This barcode string was then loaded into the query object (attached to button press)
- On completion of this query its result was then sent to the Firebase DB attached to the tester's uID

### Images/Videos:

* Insert here
