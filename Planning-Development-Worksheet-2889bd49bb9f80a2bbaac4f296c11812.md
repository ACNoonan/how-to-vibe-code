
# PLANNING


## Step 1: Problem & Persona


### WHO HAS THE PROBLEM?


Be specific about the person, not just "users"


**Your Answer:**


```text
[Example: "Busy real estate investors who review 50+ properties per week"]



```


### WHAT'S THE PROBLEM?


One sentence. What pain are they experiencing?


**Your Answer:**


```text
[Example: "They waste hours reviewing listings that don't meet their criteria"]



```


### WHAT'S THE DESIRED OUTCOME?


What does success look like for them?


**Your Answer:**


```text
[Example: "Quickly identify the 3-5 properties worth scheduling a viewing"]



```


---


## Step 2: MVP User Journey


### MVP USER JOURNEY (The UX Flow)


Write 5-8 steps describing exactly what happens. Focus on the WHAT, not the HOW.


**Your Journey:**


```text
1.

2.

3.

4.

5.

6.

7.

8.


```


**Example Journey (Team Lunch Coordinator):**


```text
1. Person creates an event: "Friday Team Lunch"
2. They set the date and invite teammates via email
3. Teammates receive link and mark dietary restrictions (vegetarian, vegan, allergies)
4. Organizer sees a dashboard of all responses
5. AI suggests 3 restaurants that accommodate everyone's needs
6. Organizer picks one and clicks "Finalize"
7. Everyone gets notification with restaurant details and time

```


---


## Step 3: Data Requirements


### DATA REQUIREMENTS


For each entity, list: **Entity Name | Key Attributes | Relationships**


**Instructions:** Look at your user journey and extract the NOUNS (Person, Place, Thing). These become your data entities.


**Your Data Requirements:**


```text
ENTITY:
Attributes:
Why needed: (reference journey step #)
Relationships:

ENTITY:
Attributes:
Why needed: (reference journey step #)
Relationships:

ENTITY:
Attributes:
Why needed: (reference journey step #)
Relationships:

ENTITY:
Attributes:
Why needed: (reference journey step #)
Relationships:

```


**Example (Team Lunch Coordinator):**


```text
ENTITY: events
Attributes: id (uuid), organizer_name, organizer_email, event_name, event_date,
event_time, location, status (planning/finalized/cancelled),
selected_restaurant_id (fk, nullable), created_at, updated_at
Why needed: Core event information created by organizer (step 1)
Relationships: Has many invitations, has many restaurant_suggestions

ENTITY: invitations
Attributes: id (uuid), event_id (fk), invitee_email, invitee_name,
response_status (pending/accepted/declined), responded_at, created_at, updated_at
Why needed: Track who's invited and their RSVP status (steps 2, 3)
Relationships: Belongs to event, has one dietary_preference

ENTITY: dietary_preferences
Attributes: id (uuid), invitation_id (fk), is_vegetarian (boolean), is_vegan (boolean),
is_gluten_free (boolean), allergies (text, nullable), other_notes (text, nullable),
created_at, updated_at
Why needed: Store each attendee's dietary restrictions (step 2)
Relationships: Belongs to invitation

ENTITY: restaurant_suggestions
Attributes: id (uuid), event_id (fk), restaurant_name, cuisine_type, address,
price_range, phone, meets_all_restrictions (boolean), accommodates_notes (text),
menu_url (nullable), suggested_at, created_at
Why needed: Store AI-generated restaurant options (step 5)
Relationships: Belongs to event

```


---


# DEVELOPMENT


## Step 1: Database Schema Generation


### 🎯 PURPOSE


Generate complete SQL schema for Supabase that you can copy/paste into the SQL Editor.


### 📋 PROMPT TEMPLATE


Copy this template and fill in YOUR information from Planning Steps 1-3:


```text
You are a senior database architect specializing in PostgreSQL and Supabase.

CONTEXT:
I'm building an MVP for: [PASTE YOUR PROBLEM STATEMENT FROM STEP 1]

The core user journey is:
[PASTE YOUR MVP USER JOURNEY FROM STEP 2]

DATA REQUIREMENTS:
[PASTE YOUR DATA REQUIREMENTS FROM STEP 3]

TASK:
Generate a complete SQL schema for Supabase (PostgreSQL) that:

1. Creates all necessary tables with appropriate data types
2. Includes primary keys (UUID preferred for main entities)
3. Includes foreign keys with proper constraints:
   - Use ON DELETE CASCADE where child records should be deleted with parent
   - Use ON DELETE SET NULL where we just want to unset the reference
4. Includes indexes on columns that will be frequently queried or filtered
5. Includes created_at and updated_at timestamps (with automatic triggers for updated_at)
6. Uses Row Level Security (RLS) appropriate for an MVP (enable RLS but leave policies for later)
7. Follows PostgreSQL and Supabase best practices

SPECIFIC REQUIREMENTS:
[List any specific data types, constraints, or relationships you want]
Example:
- Use DATE for event_date, TIME for event_time
- Use VARCHAR(255) for names and emails
- Add CHECK constraints for status fields
- Expected load: <100 records per month

CONSTRAINTS:
- This is a free tier Supabase project (keep schema efficient)
- [Add any other constraints about authentication, user load, etc.]

OUTPUT FORMAT:
Provide a single, complete SQL script that I can copy and paste into the Supabase SQL Editor.
Include comments explaining each table's purpose.
Include the updated_at trigger function and triggers for all tables.

```


---


### ✅ COMPLETE EXAMPLE PROMPT


```text
You are a senior database architect specializing in PostgreSQL and Supabase.

CONTEXT:
I'm building an MVP for: Busy professionals who need to coordinate team lunches while accommodating everyone's dietary restrictions without endless email chains.

The core user journey is:
1. Person creates an event with name, date, and invites teammates via email
2. Teammates receive link and respond with their attendance and dietary restrictions (vegetarian, vegan, gluten-free, allergies)
3. Organizer sees a dashboard showing all responses and dietary requirements
4. AI analyzes restrictions and suggests 3 restaurants that accommodate everyone
5. Organizer reviews suggestions and picks one restaurant
6. System sends final notification to all attendees with restaurant details, time, and location
7. Attendees receive confirmation with restaurant name, address, time, and what dietary needs are accommodated

DATA REQUIREMENTS:

ENTITY: events
Attributes: id (uuid), organizer_name, organizer_email, event_name, event_date, event_time, location, status (planning/finalized/cancelled), selected_restaurant_id (fk, nullable), created_at, updated_at
Why needed: Core event information created by organizer (step 1)
Relationships: Has many invitations, has many restaurant_suggestions

ENTITY: invitations
Attributes: id (uuid), event_id (fk), invitee_email, invitee_name, response_status (pending/accepted/declined), responded_at, created_at, updated_at
Why needed: Track who's invited and their RSVP status (steps 2, 3)
Relationships: Belongs to event, has one dietary_preference

ENTITY: dietary_preferences
Attributes: id (uuid), invitation_id (fk), is_vegetarian (boolean), is_vegan (boolean), is_gluten_free (boolean), allergies (text, nullable), other_notes (text, nullable), created_at, updated_at
Why needed: Store each attendee's dietary restrictions (step 2)
Relationships: Belongs to invitation

ENTITY: restaurant_suggestions
Attributes: id (uuid), event_id (fk), restaurant_name, cuisine_type, address, price_range, phone, meets_all_restrictions (boolean), accommodates_notes (text), menu_url (nullable), suggested_at, created_at
Why needed: Store AI-generated restaurant options (step 5)
Relationships: Belongs to event

TASK:
Generate a complete SQL schema for Supabase (PostgreSQL) that:

1. Creates all necessary tables with appropriate data types
2. Includes primary keys (UUID preferred for main entities)
3. Includes foreign keys with proper constraints:
   - Use ON DELETE CASCADE for invitations → events (if event deleted, delete invitations)
   - Use ON DELETE CASCADE for dietary_preferences → invitations
   - Use ON DELETE CASCADE for restaurant_suggestions → events
   - Use ON DELETE SET NULL for events.selected_restaurant_id (if suggestion deleted, just unset selection)
4. Includes indexes on columns that will be frequently queried:
   - events will be queried by organizer_email and event_date
   - invitations will be queried by event_id and response_status
   - restaurant_suggestions will be queried by event_id and meets_all_restrictions
5. Includes created_at and updated_at timestamps (with automatic triggers for updated_at)
6. Uses appropriate data types:
   - Use DATE for event_date
   - Use TIME for event_time
   - Use VARCHAR(255) for names and emails
   - Use TEXT for longer fields (allergies, notes, address)
   - Use BOOLEAN for dietary flags
7. Add CHECK constraints where appropriate:
   - response_status should only be 'pending', 'accepted', or 'declined'
   - status should only be 'planning', 'finalized', or 'cancelled'
   - price_range should be '$', '$$', or '$$$'
8. Uses Row Level Security (RLS) appropriate for an MVP (enable RLS but leave policies for later)
9. Follows PostgreSQL and Supabase best practices

CONSTRAINTS:
- This is a free tier Supabase project (keep schema efficient)
- Expected MVP load: <100 events per month, ~10 invitations per event
- No authentication yet in MVP, but design schema to add auth later (organizer_email could become user_id)
- Events should support 2-50 people typically

OUTPUT FORMAT:
Provide a single, complete SQL script that I can copy and paste into the Supabase SQL Editor.
Include comments explaining each table's purpose.
Include the updated_at trigger function and triggers for all tables.

```


---


## Step 2: User Interface Generation


### 🎯 PURPOSE


Generate a complete Next.js application using V0 or Cursor that implements your user journey.


### 📋 PROMPT TEMPLATE


Copy this template and fill in YOUR information:


```text
You are an expert frontend engineer specializing in Next.js, React, TypeScript, and Tailwind CSS.

CONTEXT:
I'm building an MVP for: [PASTE YOUR PROBLEM STATEMENT]

The target user is: [PASTE WHO HAS THE PROBLEM]

MVP USER JOURNEY:
[PASTE YOUR USER JOURNEY]

DATA AVAILABLE:
I have a Supabase PostgreSQL database with the following tables:
[List your table names and key columns—don't paste entire SQL, just structure]

Example format:
- events (id, organizer_name, organizer_email, event_name, event_date, status)
- invitations (id, event_id, invitee_email, response_status)
- dietary_preferences (id, invitation_id, is_vegetarian, is_vegan, allergies)

TASK:
Generate a complete Next.js application that implements the above user journey.

REQUIREMENTS:

UI/UX:
- Modern, clean design using Tailwind CSS
- Mobile-first responsive design
- Clear visual hierarchy and intuitive navigation
- Loading states for data fetching
- Error states with helpful messages
- [Add design preference: "Minimalist" / "Playful and colorful" / "Professional SaaS"]

Technical:
- Next.js 14+ with App Router
- TypeScript for type safety
- Supabase client for database queries
- Server components where appropriate, client components for interactivity
- Form validation where needed
- Optimistic UI updates for better UX

Pages/Components Needed:
[Based on your user journey, list main pages]

Example:
1. Landing/Event Creation page (step 1)
2. Invitation Response page (steps 2-3)
3. Organizer Dashboard (step 4)
4. Restaurant Selection page (step 5)
5. Confirmation page (steps 6-7)

Key Features:
[Translate each journey step into feature requirements]

Example:
- Event creation form with date/time pickers and email input
- RSVP form with dietary restriction checkboxes
- Real-time dashboard showing all responses
- Restaurant card display with selection buttons
- Email notification triggers (can be placeholder for MVP)

STYLING PREFERENCES:
- Color scheme: [e.g., "Professional blues and grays" / "Warm earth tones"]
- Typography: [e.g., "Clean sans-serif, high readability"]
- Overall feel: [e.g., "Polished SaaS tool" / "Fun consumer app"]

CONSTRAINTS:
- This is an MVP—prioritize core functionality over polish
- Free tier Supabase (optimize queries)
- [Add any other constraints: "No authentication yet" / "Mobile-only" / etc.]

OUTPUT:
Generate the complete application code, including:
- All page components
- Reusable UI components
- Supabase client setup
- TypeScript types based on database schema
- Basic error handling

The code should be immediately deployable to Vercel and connectable to my Supabase project.

```


---


### ✅ COMPLETE EXAMPLE PROMPT


```text
You are an expert frontend engineer specializing in Next.js, React, TypeScript, and Tailwind CSS.

CONTEXT:
I'm building an MVP for: Busy professionals who need to coordinate team lunches while accommodating everyone's dietary restrictions without endless email chains.

The target user is: Team leaders and managers organizing lunch for 5-15 people

MVP USER JOURNEY:
1. Person creates an event with name, date, and invites teammates via email
2. Teammates receive link and respond with their attendance and dietary restrictions
3. Organizer sees a dashboard showing all responses and dietary requirements
4. AI analyzes restrictions and suggests 3 restaurants that accommodate everyone
5. Organizer reviews suggestions and picks one restaurant
6. System sends final notification to all attendees
7. Attendees receive confirmation with restaurant details

DATA AVAILABLE:
I have a Supabase PostgreSQL database with the following tables:
- events (id, organizer_name, organizer_email, event_name, event_date, event_time, location, status, selected_restaurant_id)
- invitations (id, event_id, invitee_email, invitee_name, response_status, responded_at)
- dietary_preferences (id, invitation_id, is_vegetarian, is_vegan, is_gluten_free, allergies, other_notes)
- restaurant_suggestions (id, event_id, restaurant_name, cuisine_type, address, price_range, meets_all_restrictions, accommodates_notes)

TASK:
Generate a complete Next.js application that implements the above user journey.

REQUIREMENTS:

UI/UX:
- Modern, clean design using Tailwind CSS
- Mobile-first responsive design
- Clear visual hierarchy and intuitive navigation
- Loading states for data fetching
- Error states with helpful messages
- Warm, friendly aesthetic that makes coordination feel easy

Technical:
- Next.js 14+ with App Router
- TypeScript for type safety
- Supabase client for database queries
- Server components where appropriate, client components for interactivity
- Form validation where needed
- Optimistic UI updates for better UX

Pages/Components Needed:
1. Landing/Event Creation page (step 1) - Form to create event and add invitees
2. Invitation Response page (steps 2-3) - Public link where invitees RSVP
3. Organizer Dashboard (step 4) - Shows all responses in real-time
4. Restaurant Selection page (step 5) - Displays AI suggestions as cards
5. Confirmation page (steps 6-7) - Final details for all attendees

Key Features:
- Event creation form with date/time pickers and multiple email inputs
- RSVP form with dietary restriction checkboxes (vegetarian, vegan, gluten-free) and allergy text field
- Real-time dashboard showing response count and dietary needs summary
- "Generate Recommendations" button that triggers AI analysis (can use placeholder AI for MVP)
- Restaurant cards showing name, cuisine, address, price range, and which restrictions it meets
- Email notification system (can be placeholder/console.log for MVP)
- Shareable links for invitations

STYLING PREFERENCES:
- Color scheme: Warm oranges and friendly greens with neutral grays
- Typography: Clean sans-serif (Inter or similar), high readability
- Overall feel: Friendly and approachable, reduces stress of coordination

CONSTRAINTS:
- This is an MVP—prioritize core functionality over polish
- Free tier Supabase (optimize queries, expect ~10-20 events per week)
- No authentication yet—events accessed via unique URLs
- AI recommendations can be hardcoded/placeholder for MVP (we'll add real AI later)
- Email notifications can log to console for now

OUTPUT:
Generate the complete application code, including:
- All page components
- Reusable UI components (EventCard, RestaurantCard, RSVPForm, etc.)
- Supabase client setup with connection instructions
- TypeScript types based on database schema
- Basic error handling and loading states
- README with setup instructions

The code should be immediately deployable to Vercel and connectable to my Supabase project.

```


---


## Step 3: Connecting Your Application


### After generating code, you need to connect it to your Supabase database:


**In Supabase:**

1. Go to Project Settings → API
2. Copy your Project URL
3. Copy your `anon/public` API key

**In your code:**

1. Create a `.env.local` file in your project root
2. Add these lines:

```text
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

```


**Deploy to Vercel:**

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

---


## Technical Constraints Checklist


Use this to inform your prompts:


**Free Tier Limitations:**

- [ ] Supabase: 500MB database, 2GB bandwidth/month
- [ ] Vercel: 100GB bandwidth/month
- [ ] Other API limits? _______________

**Required Integrations:**

- [ ] List external APIs needed: _______________
- [ ] API keys ready? Yes / No
- [ ] Authentication method known? Yes / No

**Performance Considerations:**

- [ ] Expected # of users for MVP: _______________
- [ ] Real-time requirements? Yes / No
- [ ] Mobile-first or desktop-first? _______________

**MVP Simplifications:**
What are we explicitly NOT building in v1?


```text
Example: "No user authentication yet—just unique URLs"
Example: "No payment processing—just contact forms"

Your simplifications:
-
-
-

```


---


## 🎯 Quick Reference: When to Move Fast vs Slow


### MOVE FAST ⚡

- Tweaking UI colors, spacing, layouts
- Implementing features you've done before
- Trying different approaches to the same problem
- Deploying changes to test

### MOVE SLOW 🐢

- Planning your data model
- Adding new features you haven't built before
- Debugging persistent errors
- Setting up authentication or payment systems
- Performance optimization

**Remember:** Things will break MORE than they work. That's normal. Flow comes from knowing when to trust the AI and when to slow down and think.


---


## Notes & Learnings


Use this space to capture what works for you:


```text
What went well:


What was frustrating:


What I'll do differently next time:


Questions to research later:



```


---


## Next Steps: Beyond MVP


Once your MVP is working, consider:

1. **Add Authentication** - Convert emails to user accounts
2. **Improve AI Features** - Replace placeholders with real AI
3. **Add Payment Processing** - If needed for your model
4. **Performance Optimization** - Database indexes, caching
5. **Error Handling** - Better user feedback
6. **Testing** - Automated tests for core flows
7. **Analytics** - Track how people use your app

---


**Remember the Flow State Formula:**

1. ✅ Clear Goals (your user journey)
2. ⚡ Fast Feedback (deploy early, test often)
3. 🎯 Challenge vs Skill (start simple, build complexity)
4. 🧘 Action = Awareness (stay present with the code)
5. 🎉 Intrinsically Rewarding (celebrate small wins!)

Good luck on your build! 🚀

