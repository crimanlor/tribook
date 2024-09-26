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
- `express-session`: For managing user sessions in Express app.
- `ejs`: To generate dynamic HTML pages on the server side.
- `morgan`: To log requests.
- `mongoose`: To interact with MongoDB for data storage.
- `w3.css`: For responsive design and layout.
- `dotenv`: For environment variable management.
- `connect-flash`: For setting and displaying temporary notifications to the user.
- `nodemon`: To restart the server when file changes are detected, improving the development workflow.

## Technical Overview

This section provides an insight into the architecture of the project, focusing on the models, controllers, routes, and views used in the application.

### Models

The application utilizes **Mongoose** to define the data structure and interactions with MongoDB. Apartment model represents a collection in the database:

#### Apartment Data Structure Example

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

### Controllers

The controllers handle the business logic of the application. Key controllers include:

- **Admin**: Manages the CRUD operations for apartments, including creating, updating, and deleting listings.
- **Auth**: Handles user authentication and authorization, managing user sessions.
- **Index**: Renders the homepage, where it lists available apartments. It also handles filtering apartments based on user input and manages the reservation form.

### Routes

The application uses **Express Router** to define the endpoints for the application. Key routes include:

- **Admin**
- `GET /apartment/:idApartment/edit`
- `GET /apartment/new-apartment`
- `POST /apartment/new-apartment`

- **Auth**
- `GET /login`
- `GET /logout`
- `POST /login`

- **Index**
- `GET /`
- `GET /apartment/:idApartment`
- `GET /search`
- `GET /apartment/:idApartment/new-booking`
- `GET /about-us`
- `GET /contact`
- `POST /apartment/new-booking`

### Views

The views are rendered using **EJS**, allowing dynamic content generation. The main views include:

- **Home**
- **Apartment Details**
- **Login**
- **New Apartment**
- **New Booking**
- **Contact**
- **About us**

## Deployment

The application is deployed and can be accessed at the following URL:
[Tribook](https://tribook-nznc.onrender.com/)

### Admin Credentials

To gain access to administrative features (such as adding, editing, or deleting apartments), please contact me directly. I can provide you with the necessary environment variables for admin access.

### Demos

Feel free to explore the demo versions of the application. You can see how to add, edit, and delete apartments without needing admin access. If you have any questions or need assistance, don’t hesitate to reach out!

- [Demo Admin features: Add, Edit and Delete Apartment](https://drive.google.com/file/d/1hq71uDphRP2AxkYsPbybmTFCsQwiJFGw/view?usp=sharing)
- [Demo Regular User features: View Apartments List, Filter and Made a Booking](https://drive.google.com/file/d/12jH3pyqtiuwNAUK12mdLD_w_tvG1Ollz/view?usp=sharing)

---
