# RunHub

A web application developed to manage running communities and events. Users can create **communities**, join existing ones, create **events**, and RSVP (Going/Maybe/Not) to participate. The app uses **Clerk** for authentication to securely manage user logins and logouts. The interface is designed with **TailwindCSS** and **shadcn/ui**. The database layer utilizes **Drizzle ORM** and **PostgreSQL** (Neon DB).

---

## Technologies

- **Next.js 13** (App Router)
- **TypeScript**
- **TailwindCSS** + [shadcn/ui](https://ui.shadcn.com/)
- **Clerk** (User authentication and management)
- **Drizzle ORM** + **Neon/PostgreSQL**

---

## Features

1. **Create Community**

   - Add a name, description, and location to create a new community
   - `creatorUserId` records who created the community

2. **Join Community**

   - Join a community by clicking the "Join" button
   - The creator of the community can see who has joined

3. **Create Event**

   - Add details like date, time, and participant limit to create an event
   - `creatorUserId` stores who created the event

4. **RSVP (Event Participation)**

   - RSVP with "Going," "Maybe," or "Not" options
   - Event creators can view the RSVP list

5. **Clerk Integration**

   - Unauthenticated users attempting to join or RSVP are redirected to the `/sign-in` page
   - Authenticated users can complete join or RSVP actions through forms

---

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/username/runhub.git
   cd runhub
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables (.env)**

   ```bash
   DATABASE_URL="postgres://[username]:[password]@[host]/[database]"
   CLERK_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   ```

   Get the database connection details from Neon or your PostgreSQL server.

4. **Drizzle ORM Migration (Optional)**

   ```bash
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

5. **Run in Development Mode**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```bash
.
├── app/
│   ├── community/
│   │   ├── [id]/
│   │   │   ├── client-part.tsx        # Community detail client component (participant list, etc.)
│   │   │   └── page.tsx              # Community detail page (server component)
│   │   ├── create/
│   │   │   └── page.tsx              # Community creation page
│   │   ├── _actions.ts               # Server Actions: create, join
│   │   └── page.tsx                  # List all communities
│   ├── events/
│   │   ├── [id]/
│   │   │   ├── client-part.tsx        # Event detail client component (RSVP, etc.)
│   │   │   └── page.tsx              # Event detail page (server component)
│   │   ├── create/
│   │   │   └── page.tsx              # Event creation page
│   │   ├── _actions.ts               # Server Actions: createEvent, rsvpEvent
│   │   └── page.tsx                  # List all events
│   ├── layout.tsx                    # Shared Layout (header/footer)
│   └── page.tsx                      # Landing/Home page
├── db/
│   ├── index.ts                      # Drizzle DB connection
│   └── schema.ts                     # Table definitions
├── components/
│   └── ui/                           # shadcn/ui components (Button, Card, etc.)
└── package.json
```

---

## Development Tips

### Server Actions

Functions like `joinCommunityAction` and `rsvpEventAction` are defined with the “use server” directive and can be used with `<form action={...}>` or `action={async (formData) => {...}}` patterns.

### Design

- Add full-width hero sections, sub-content areas, background images, etc., to enrich your pages.
- `shadcn/ui` components (Card, Button, Input, etc.) are TailwindCSS-compatible, enabling quick creation of stylish UIs.

---

## Contributing

1. Fork the project.
2. Create a new branch (`git checkout -b feature/xyz`).
3. Make your changes and commit them.
4. Submit a Pull Request!

---

## License

This project is licensed under the MIT License. For more information, refer to the LICENSE file.

