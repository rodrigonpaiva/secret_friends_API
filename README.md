# Secret Santa API

This is a REST API built for managing Secret Santa events. The API allows you to create events, manage groups, add participants, and perform random matches between participants.

## Features

- Event Management (CRUD operations)
- Group Management within events
- Participant Management
- Automatic Secret Santa matching system
- Group-aware matching (can prevent matches between people in the same group)
- Token-based authentication
- Password validation

## Technologies Used

- Node.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod

## Main Components

### Events Service
- Create, read, update, and delete events
- Perform automatic matches between participants
- Support for grouped matching (participants won't be matched with others from the same group)

### Groups Service
- Create, read, update, and delete groups within events
- Group validation before operations

### People Service
- Add, update, remove, and list participants
- Associate participants with groups and events
- Find participants by email or ID

### Authentication Service
- Password validation
- Token generation and validation
- Date-based security system

## API Endpoints

### Events
- `GET /events` - List all events
- `GET /events/:id` - Get specific event
- `POST /events` - Create new event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `POST /events/:id/match` - Perform matching for an event

### Groups
- `GET /events/:eventId/groups` - List all groups in an event
- `GET /events/:eventId/groups/:id` - Get specific group
- `POST /events/:eventId/groups` - Create new group
- `PUT /events/:eventId/groups/:id` - Update group
- `DELETE /events/:eventId/groups/:id` - Delete group

### People
- `GET /events/:eventId/people` - List all participants in an event
- `GET /events/:eventId/people/:id` - Get specific participant
- `POST /events/:eventId/people` - Add new participant
- `PUT /events/:eventId/people/:id` - Update participant
- `DELETE /events/:eventId/people/:id` - Remove participant

## Error Handling

The API includes comprehensive error handling for:
- Invalid operations
- Non-existent resources
- Authentication failures
- Database errors

## Security

- Token-based authentication
- Daily password rotation
- Encrypted matching results

## Installation

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your environment variables in `.env`
4. Run Prisma migrations:
    ```bash
    npx prisma migrate dev
    ```
5. Start the server:
    ```bash
    npm run dev
    ```

## Environment Variables

Create a `.env` file with the following variables:

DATABASE_URL="your-database-url" 

DEFAULT_TOKEN="your-default-token"


## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.

**Note:** This README is based on the provided code. You may want to adjust it according to additional features or specific implementation details not shown in the shared code.
