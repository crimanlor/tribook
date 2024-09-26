# Tribook - Apartment Booking System

The project involves creating a tourist accommodation search and booking application using Node.js and Express. The application lists all apartments in the database and allows admin users to create, delete, and modify apartments, while regular users can view apartment details and make bookings.

## Features

### Navigation Menu

- Menu with options for both administrators and clients.
- Elements aligned horizontally.
- Background color changes on hover.

### Add New Apartment

- Form to add a new apartment with the following fields:
  - **Title**: Eye-catching title for the apartment.
  - **Description**: Brief overview of the apartment.
  - **Rules**: Usage guidelines for the apartment.
  - **Rooms**: Number of rooms.
  - **Beds**: Number of beds in each room.
  - **Bathrooms**: Number of bathrooms.
  - **Images**: Maximum of 4 photos per apartment, with a text description indicating which part of the apartment the photo belongs to.
  - **Main Photo**: One photo should be marked as the "main photo."
  - **Price per Night**: Cost to rent the apartment.
  - **Max Guests**: Maximum number of guests allowed.
  - **Square Meters**: Usable area of the apartment.
  - **Services Available**: Includes features like air conditioning, heating, TV, kitchen, and internet connectivity.
  - **Location**: Includes province, city, and GPS coordinates.
- Validation of all fields upon submission, ensuring data integrity.

### List Apartments

- Page displaying all available apartments with:
  - Title (in uppercase).
  - Price per night.
  - Square meters.
  - Main photo of the apartment.
  - Services offered, represented by icons.

### Apartment Details

- Detailed view of each apartment when clicked, showing:
  - Title
  - Description
  - Rules
  - Number of rooms, beds, and bathrooms
  - Images and descriptions
  - Price and maximum guests
  - Square meters
  - Services available

### Reservation System

- Clients can reserve an apartment for specific dates.
- If the apartment is available, the reservation is confirmed immediately.
- Reservations are stored in the database with relevant dates.

### Additional Features

- Admin functionalities to modify or delete apartments.
- Search functionality based on guest capacity, price, city, and available dates.

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/tribook.git
   ```
2. Navigate to the project directory:
   ```sh
   cd tribook
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Use the menu to navigate between apartment listings and view the aparment details.
3. Administrators can manage apartments while clients can reserve them.

## Dependencies

- `express`: To create the server and handle routes.
- `mongoose`: To interact with MongoDB for data storage.
- `w3.css`: For responsive design and layout.
- `body-parser`: To handle form submissions.
- `dotenv`: For environment variable management.
- `connect-flash`: For setting and displaying temporary notifications to the user.
- `nodemon`: To restart the server when file changes are detected, improving the development workflow.

## Example Usage

Below is an example of how the apartment data will appear once it's stored in MongoDB:

```json
{
  "_id": "66ed3cc2190d4fb066632cd0",
  "title": "Penthouse with Sea View",
  "location": {
    "city": "Valencia",
    "province": "Valencia",
    "coordinates": {
      "latitude": 39.47,
      "longitude": 0.38
    }
  },
  "description": "Enjoy this luxurious penthouse with stunning sea views in the heart of Valencia. Perfect for families or travelers seeking comfort and elegance.",
  "rules": "No parties or events allowed. Respect the neighbors and no smoking indoors.",
  "rooms": 3,
  "beds": 4,
  "bathrooms": 2,
  "price": 180,
  "size": 85,
  "photos": [
    {
      "url": "https://images.pexels.com/photos/2347356/pexels-photo-2347356.jpeg?auto=compress&cs=tinysrgb&w=800",
      "descriptionPhoto": "Spacious living room with sea view"
    },
    {
      "url": "https://images.pexels.com/photos/2347356/pexels-photo-2347356.jpeg?auto=compress&cs=tinysrgb&w=800",
      "descriptionPhoto": "Master bedroom with king-size bed and balcony access"
    },
    {
      "url": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "descriptionPhoto": "Fully equipped modern kitchen"
    },
    {
      "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800",
      "descriptionPhoto": "Bathroom with luxury finishes and sea view"
    }
  ],
  "mainPhoto": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
  "capacity": "two-persons",
  "services": {
    "wifi": true,
    "airConditioner": true,
    "heater": true,
    "accesibility": false,
    "tv": true,
    "kitchen": true
  },
  "bookings": [
    {
      "startDate": {
        "$date": "2024-11-04T00:00:00Z"
      },
      "endDate": {
        "$date": "2024-11-05T00:00:00Z"
      },
      "_id": {
        "$oid": "66df33d8512ae4a990092e6e"
      }
    }
  ],
  "isAvailable": true,
  "__v": 0
}
```

## Deployment

The application is deployed and can be accessed at the following URL:
[Tribook](https://tribook-nznc.onrender.com/)

### Admin Credentials

To gain access to administrative features (such as adding, editing, or deleting apartments), please contact me directly. I can provide you with the necessary environment variables for admin access.

### Demos

Feel free to explore the demo versions of the application. You can see how to add, edit, and delete apartments without needing admin access. If you have any questions or need assistance, don’t hesitate to reach out!

- [Demo Admin features: Add, Edit and Delete Apartment](link-to-demo)
- [Demo Regular User features: View Apartments List, Filter and Made a Booking](link-to-demo)

---
