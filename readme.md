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
- Map integration to show the location of the apartment on Google Maps.

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
2. Use the menu to navigate between apartment listings and the form to add new apartments.
3. Administrators can manage apartments while clients can reserve them.

## Dependencies

- `express`: To create the server and handle routes.
- `mongoose`: To interact with MongoDB for data storage.
- `w3.css`: For responsive design and layout.
- `body-parser`: To handle form submissions.
- `dotenv`: For environment variable management.

## Example Usage

Here's an example of how to create a new apartment entry:

```javascript
const newApartment = {
  title: "Cozy Mountain Retreat",
  description: "A lovely apartment in the heart of the mountains.",
  rules: "No pets allowed.",
  rooms: 2,
  beds: 3,
  bathrooms: 1,
  images: ["url1.jpg", "url2.jpg", "url3.jpg", "url4.jpg"],
  mainPhoto: "url1.jpg",
  pricePerNight: 100,
  maxGuests: 4,
  squareMeters: 80,
  services: {
    wifi: true,
    airConditioner: true,
    heater: false,
    tv: true,
    kitchen: true,
  },
  location: {
    province: "Barcelona",
    city: "Sitges",
    coordinates: {
      lat: 41.2363,
      lng: 1.8372,
    },
  },
};
```

## Deployment

The application is deployed and can be accessed at the following URL:
[Tribook](https://)

### Demos

- [Demo Simple: Add Apartment](link-to-demo)
- [List Apartments](link-to-demo)
- [Final App with Additional Features](link-to-demo)

### Admin Credentials

- Username:
- Password:

---
