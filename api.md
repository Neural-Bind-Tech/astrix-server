# Astrix Backend — API Reference

> **Base URL:** `http://localhost:<PORT>/api/v1`

---

## Common Patterns

### Query Parameters (List endpoints)

| Param     | Type           | Description                                                    |
| --------- | -------------- | -------------------------------------------------------------- |
| `q`       | JSON string    | Filter object, e.g. `?q={"status":"NEW"}`                      |
| `limit`   | number (1–100) | Max records (default: 10)                                      |
| `skip`    | number         | Records to skip (default: 0)                                   |
| `sort_by` | string         | Field to sort by. Prefix `-` for descending, e.g. `-createdAt` |

### Paginated Response Shape

```json
{
  "success": true,
  "statusCode": 200,
  "message": "...",
  "meta": { "page": 1, "limit": 10, "total": 42 },
  "data": [...]
}
```

### Single Record Response Shape

```json
{ "success": true, "statusCode": 200, "message": "...", "data": { ... } }
```

---

## Route Summary

| Module            | Base Path                   |
| ----------------- | --------------------------- |
| Auth              | `/api/v1/auth`              |
| User              | `/api/v1/user`              |
| Application       | `/api/v1/application`       |
| Blog              | `/api/v1/blog`              |
| Event             | `/api/v1/event`             |
| EventRegistration | `/api/v1/eventregistration` |
| Inquiry           | `/api/v1/inquiry`           |
| Testimonial       | `/api/v1/testimonial`       |
| University        | `/api/v1/university`        |
| VisaAppointment   | `/api/v1/visaappointment`   |

---

## Auth — `/api/v1/auth`

| Method | Path                    | Description                    | Auth Required |
| ------ | ----------------------- | ------------------------------ | ------------- |
| POST   | `/auth/login`           | Login with email & password    | ❌            |
| POST   | `/auth/forgot-password` | Send password reset link       | ❌            |
| POST   | `/auth/reset-password`  | Reset password with token      | ❌            |
| POST   | `/auth/change-password` | Change own password            | 🔒 ADMIN      |
| GET    | `/auth/me`              | Get current authenticated user | 🔒 ADMIN      |
| POST   | `/auth/logout`          | Logout current session         | 🔒 ADMIN      |

**Login:**

```json
POST /api/v1/auth/login
{
  "email": "admin@example.com",
  "password": "secret"
}
```

---

## User — `/api/v1/user`

**Model fields:** `id`, `email` _(unique)_, `fullName`, `role` (`ADMIN` | `USER`), `createdById`, `createdAt`, `updatedAt`

| Method | Path        | Description    |
| ------ | ----------- | -------------- |
| GET    | `/user`     | List users     |
| POST   | `/user`     | Create a user  |
| GET    | `/user/:id` | Get user by ID |
| PUT    | `/user/:id` | Update user    |
| DELETE | `/user/:id` | Delete user    |

**Create:**

```json
POST /api/v1/user
{
  "email": "user@example.com",
  "fullName": "Jane Doe",
  "role": "USER"
}
```

**Filter examples:**

```
GET /api/v1/user?q={"role":"ADMIN"}&sort_by=-createdAt&limit=20
```

---

## Application — `/api/v1/application`

| Method | Path                       | Description            |
| ------ | -------------------------- | ---------------------- |
| GET    | `/application`             | List applications      |
| POST   | `/application`             | Create                 |
| POST   | `/application/bulk`        | Bulk create            |
| PUT    | `/application/bulk`        | Bulk update            |
| PATCH  | `/application/update-many` | Update many by filter  |
| DELETE | `/application`             | Delete many by filter  |
| GET    | `/application/:id`         | Get by ID              |
| PUT    | `/application/:id`         | Update by ID           |
| DELETE | `/application/:id`         | Delete by ID           |
| PUT    | `/application/:id/restore` | Restore deleted record |

**Bulk create:**

```json
POST /api/v1/application/bulk
[
  { "universityId": "...", "studentName": "Ali" },
  { "universityId": "...", "studentName": "Rina" }
]
```

**Update many:**

```json
PATCH /api/v1/application/update-many
{
  "filter": { "status": "PENDING" },
  "data":   { "status": "APPROVED" }
}
```

**Delete many:**

```json
DELETE /api/v1/application
{ "status": "REJECTED" }
```

---

## Blog — `/api/v1/blog`

Same full pattern as Application (10 endpoints: list, create, bulk create, bulk update, update-many, delete-many, get by id, update by id, delete by id, restore).

---

## Event — `/api/v1/event`

**Model fields:** `id`, `title`, `description`, `date`, `time`, `location`, `isOnline`, `imageUrl`, `registrationLink`, `isPast`, `createdById`, `createdAt`, `updatedAt`

| Method | Path                 | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/event`             | List events           |
| POST   | `/event`             | Create                |
| POST   | `/event/bulk`        | Bulk create           |
| PUT    | `/event/bulk`        | Bulk update           |
| PATCH  | `/event/update-many` | Update many by filter |
| DELETE | `/event`             | Delete many by filter |
| GET    | `/event/:id`         | Get by ID             |
| PUT    | `/event/:id`         | Update                |
| DELETE | `/event/:id`         | Delete                |
| PUT    | `/event/:id/restore` | Restore               |

**Create:**

```json
POST /api/v1/event
{
  "title": "Study Abroad Fair",
  "date": "2026-09-01",
  "location": "Dhaka",
  "isOnline": false
}
```

**Filter:**

```
GET /api/v1/event?q={"isOnline":"true"}&sort_by=-date
```

---

## EventRegistration — `/api/v1/eventregistration`

**Model fields:** `id`, `eventId`, `fullName`, `email`, `phone`, `createdById`, `createdAt`, `updatedAt`

| Method | Path                             | Description           |
| ------ | -------------------------------- | --------------------- |
| GET    | `/eventregistration`             | List registrations    |
| POST   | `/eventregistration`             | Create                |
| POST   | `/eventregistration/bulk`        | Bulk create           |
| PUT    | `/eventregistration/bulk`        | Bulk update           |
| PATCH  | `/eventregistration/update-many` | Update many by filter |
| DELETE | `/eventregistration`             | Delete many by filter |
| GET    | `/eventregistration/:id`         | Get by ID             |
| PUT    | `/eventregistration/:id`         | Update                |
| DELETE | `/eventregistration/:id`         | Delete                |
| PUT    | `/eventregistration/:id/restore` | Restore               |

**Create:**

```json
POST /api/v1/eventregistration
{
  "eventId": "uuid-of-event",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+8801700000000"
}
```

**Filter by event:**

```
GET /api/v1/eventregistration?q={"eventId":"uuid-of-event"}
```

---

## Inquiry — `/api/v1/inquiry`

**Model fields:** `id`, `name`, `email`, `phone`, `subject`, `message`, `status` (`NEW` | `REPLIED` | `CLOSED`), `createdById`, `createdAt`, `updatedAt`

| Method | Path                   | Description           |
| ------ | ---------------------- | --------------------- |
| GET    | `/inquiry`             | List inquiries        |
| POST   | `/inquiry`             | Create                |
| POST   | `/inquiry/bulk`        | Bulk create           |
| PUT    | `/inquiry/bulk`        | Bulk update           |
| PATCH  | `/inquiry/update-many` | Update many by filter |
| DELETE | `/inquiry`             | Delete many by filter |
| GET    | `/inquiry/:id`         | Get by ID             |
| PUT    | `/inquiry/:id`         | Update                |
| DELETE | `/inquiry/:id`         | Delete                |
| PUT    | `/inquiry/:id/restore` | Restore               |

**Create:**

```json
POST /api/v1/inquiry
{
  "name": "Alice",
  "email": "alice@example.com",
  "message": "I want to study in Canada."
}
```

**Update status:**

```json
PUT /api/v1/inquiry/:id
{ "status": "REPLIED" }
```

**Filter by status:**

```
GET /api/v1/inquiry?q={"status":"NEW"}&sort_by=-createdAt
```

---

## Testimonial — `/api/v1/testimonial`

**Model fields:** `id`, `studentName`, `country`, `program`, `university`, `review`, `photoUrl`, `rating` (int 1–5), `createdById`, `createdAt`, `updatedAt`

| Method | Path                       | Description           |
| ------ | -------------------------- | --------------------- |
| GET    | `/testimonial`             | List testimonials     |
| POST   | `/testimonial`             | Create                |
| POST   | `/testimonial/bulk`        | Bulk create           |
| PUT    | `/testimonial/bulk`        | Bulk update           |
| PATCH  | `/testimonial/update-many` | Update many by filter |
| DELETE | `/testimonial`             | Delete many by filter |
| GET    | `/testimonial/:id`         | Get by ID             |
| PUT    | `/testimonial/:id`         | Update                |
| DELETE | `/testimonial/:id`         | Delete                |
| PUT    | `/testimonial/:id/restore` | Restore               |

**Create:**

```json
POST /api/v1/testimonial
{
  "studentName": "Ravi Kumar",
  "country": "CANADA",
  "university": "University of Toronto",
  "review": "Amazing experience studying abroad!",
  "rating": 5
}
```

---

## University — `/api/v1/university`

**Model fields:** `id`, `name`, `country`, `city`, `logoUrl`, `description`, `worldRank`, `majors[]`, `programs[]`, `tuitionFee`, `hostelFee`, `scholarshipType`, `intake`, `deadline`, `documentsRequired[]`, `website`, `featured`, `createdById`, `createdAt`, `updatedAt`

**`country` enum values:** `USA` | `CHINA` | `MALAYSIA` | `SOUTH_KOREA` | `THAILAND` | `UK` | `CANADA` | `AUSTRALIA` | `OTHER`

| Method | Path                      | Description           |
| ------ | ------------------------- | --------------------- |
| GET    | `/university`             | List universities     |
| POST   | `/university`             | Create                |
| POST   | `/university/bulk`        | Bulk create           |
| PUT    | `/university/bulk`        | Bulk update           |
| PATCH  | `/university/update-many` | Update many by filter |
| DELETE | `/university`             | Delete many by filter |
| GET    | `/university/:id`         | Get by ID             |
| PUT    | `/university/:id`         | Update                |
| DELETE | `/university/:id`         | Delete                |
| PUT    | `/university/:id/restore` | Restore               |

**Create:**

```json
POST /api/v1/university
{
  "name": "University of Melbourne",
  "country": "AUSTRALIA",
  "city": "Melbourne",
  "worldRank": "33",
  "majors": ["Engineering", "Business"],
  "programs": ["Bachelor", "Master"],
  "tuitionFee": "$35,000/year",
  "featured": true
}
```

**Get featured universities:**

```
GET /api/v1/university?q={"featured":"true"}&sort_by=worldRank
```

---

## VisaAppointment — `/api/v1/visaappointment`

**Model fields:** `id`, `fullName`, `email`, `phone`, `country`, `visaType`, `purpose`, `preferredDate`, `message`, `status`, `createdById`, `createdAt`, `updatedAt`

**`country` enum values:** `USA` | `CHINA` | `MALAYSIA` | `THAILAND` | `UK` | `CANADA` | `AUSTRALIA` | `SCHENGEN` | `OTHER`

**`purpose` enum values:** `STUDY` | `TOURIST` | `BUSINESS` | `FAMILY_VISIT` | `OTHER`

**`status` enum values:** `NEW` | `CONTACTED` | `SCHEDULED` | `COMPLETED`

| Method | Path                           | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | `/visaappointment`             | List appointments     |
| POST   | `/visaappointment`             | Create                |
| POST   | `/visaappointment/bulk`        | Bulk create           |
| PUT    | `/visaappointment/bulk`        | Bulk update           |
| PATCH  | `/visaappointment/update-many` | Update many by filter |
| DELETE | `/visaappointment`             | Delete many by filter |
| GET    | `/visaappointment/:id`         | Get by ID             |
| PUT    | `/visaappointment/:id`         | Update                |
| DELETE | `/visaappointment/:id`         | Delete                |
| PUT    | `/visaappointment/:id/restore` | Restore               |

**Book appointment:**

```json
POST /api/v1/visaappointment
{
  "fullName": "Sunan Ahmed",
  "email": "sunan@example.com",
  "phone": "+8801700000000",
  "country": "CANADA",
  "purpose": "STUDY",
  "preferredDate": "2026-08-15",
  "message": "Need help with student visa."
}
```

**Update status:**

```json
PUT /api/v1/visaappointment/:id
{ "status": "SCHEDULED" }
```

---

## Frontend Fetch Helper (TypeScript)

```ts
const BASE = 'https://backend.astrixeducation.com/api/v1';

async function api<T>(
  path: string,
  options?: RequestInit
): Promise<{ data: T; meta?: { page: number; limit: number; total: number } }> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// List with filters
const { data: universities, meta } = await api<University[]>(
  '/university?q={"country":"CANADA"}&sort_by=-createdAt&limit=20'
);

// Create
const { data: inquiry } = await api<Inquiry>('/inquiry', {
  method: 'POST',
  body: JSON.stringify({ name: 'Ali', email: 'ali@x.com', message: 'Hello' }),
});

// Update
await api(`/inquiry/${id}`, {
  method: 'PUT',
  body: JSON.stringify({ status: 'REPLIED' }),
});

// Delete
await api(`/inquiry/${id}`, { method: 'DELETE' });

// Bulk create
await api('/testimonial/bulk', {
  method: 'POST',
  body: JSON.stringify([
    { studentName: 'John', review: 'Great experience!', rating: 5 },
  ]),
});

// Update many
await api('/visaappointment/update-many', {
  method: 'PATCH',
  body: JSON.stringify({
    filter: { status: 'NEW' },
    data: { status: 'CONTACTED' },
  }),
});
```
