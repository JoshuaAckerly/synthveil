# Synthveil API Documentation

## Overview

The Synthveil API provides endpoints for message management. All endpoints return JSON responses.

**Base URL**: `https://synthveil.local` (or your configured domain)

## Authentication

All API endpoints require **Bearer token authentication** in the `Authorization` header:

```
Authorization: Bearer YOUR_AUTH_TOKEN
```

## API Endpoints

### 1. Get Messages

Retrieves all messages for the authenticated user.

**Endpoint**: `GET /api/messages`

**Authentication**: Required (Bearer token)

**Response Format**:
```json
[
  {
    "id": "string",
    "subject": "string",
    "body": "string",
    "read": false,
    "created_at": "ISO 8601 timestamp",
    "updated_at": "ISO 8601 timestamp"
  }
]
```

**Success Response** (200):
```json
[
  {
    "id": "msg_001",
    "subject": "Welcome to Synthveil",
    "body": "Your account has been created successfully.",
    "read": false,
    "created_at": "2026-04-09T10:30:00Z",
    "updated_at": "2026-04-09T10:30:00Z"
  }
]
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing authentication token
- `500 Internal Server Error`: Server error retrieving messages

---

### 2. Mark All Messages as Read

Marks all unread messages for the authenticated user as read.

**Endpoint**: `PATCH /api/messages/read-all`

**Authentication**: Required (Bearer token)

**Request Body**: (empty)

**Success Response** (200):
```json
{
  "success": true
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing authentication token
- `500 Internal Server Error`: Server error updating messages

---

### 3. Mark Single Message as Read

Marks a specific message as read.

**Endpoint**: `PATCH /api/messages/{id}/read`

**Authentication**: Required (Bearer token)

**URL Parameters**:
- `id` (required): Message ID

**Request Body**: (empty)

**Success Response** (200):
```json
{
  "success": true
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing authentication token
- `404 Not Found`: Message not found or not owned by user
- `500 Internal Server Error`: Server error updating message

---

## Error Handling

All error responses follow a consistent format:

```json
{
  "message": "Human-readable error message"
}
```

## Common HTTP Status Codes

- `200 OK`: Request successful
- `401 Unauthorized`: Authentication required or invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Integration Examples

### JavaScript Fetch

```javascript
// Get messages
const response = await fetch('/api/messages', {
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Accept': 'application/json'
  }
});

const messages = await response.json();

// Mark all as read
const readResponse = await fetch('/api/messages/read-all', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Accept': 'application/json'
  }
});

const result = await readResponse.json();
```

### PHP cURL

```php
// Get messages
$ch = curl_init('https://synthveil.local/api/messages');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Authorization: Bearer ' . $authToken,
  'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$messages = json_decode($response, true);
```

---

## Best Practices

1. **Always include the Authorization header** for all API requests
2. **Handle 401 responses** by redirecting to login or refreshing the token
3. **Validate input** on the client side before sending API requests
4. **Handle errors gracefully** and display user-friendly messages
5. **Store auth tokens securely** (preferably in secure HTTP-only cookies)
6. **Use HTTPS** in production for all API requests
