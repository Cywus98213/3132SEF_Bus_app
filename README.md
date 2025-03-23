# 3132SEF Bus App

## Overview

The 3132SEF Bus App is a React Native application designed to provide users with detailed information about bus routes, stops, and real-time locations. The app integrates with Google Maps to display routes and markers for bus stops.

## Tech Stack

- **React Native**: For building the mobile application.
- **Expo**: For development and building the app.
- **TypeScript**: For type safety and better development experience.
- **react-native-maps**: For displaying maps and markers.
- **react-native-dotenv**: For managing environment variables.
- **Axios**: For making HTTP requests.
- **Google Maps API**: For map functionalities.

## Features

- **Map Integration**: Display bus routes and stops on a Google Map.
- **Real-time Updates**: Fetch and display real-time data for bus routes and stops.
- **Search Functionality**: Search for specific bus routes and stops.
- **Detailed Information**: View detailed information about each bus stop.
- **Error Handling**: Display error messages when data fetching fails.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/3132SEF_Bus_app.git
    cd 3132SEF_Bus_app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Google Maps API key:
    ```env
    GOOGLE_MAPS_API_KEY=your_api_key_here
    ```

4. Start the development server:
    ```sh
    npm start
    ```

## Usage

- Open the app on your device or emulator.
- Use the search functionality to find specific bus routes and stops.
- View the map to see the bus routes and stops.
- Tap on a marker to view detailed information about a bus stop.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.