# 🌍 Taste of Africa Canteen

> A modern demo restaurant website for an African college canteen, built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **TypeScript**.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
taste-of-africa/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, Footer, CartProvider)
│   ├── globals.css         # Global styles + Tailwind
│   ├── page.tsx            # Landing page
│   ├── menu/page.tsx       # Digital menu with category filter
│   ├── preorder/page.tsx   # Pre-order form
│   ├── order-status/page.tsx # Live order tracking
│   ├── admin/page.tsx      # Admin dashboard
│   └── qr-menu/page.tsx    # Mobile QR scan menu
│
├── components/
│   ├── Navbar.tsx          # Sticky nav with cart badge
│   ├── Footer.tsx          # Footer with contact info
│   ├── FoodCard.tsx        # Reusable food item card
│   ├── CategoryTabs.tsx    # Scrollable category filter
│   ├── CartSidebar.tsx     # Slide-in cart panel
│   ├── OrderForm.tsx       # Pre-order form with validation
│   └── OrderStatus.tsx     # Order progress tracker + badge
│
├── lib/
│   ├── data.ts             # Mock menu items, orders, testimonials
│   └── cart-context.tsx    # React Context for cart state
│
└── types/
    └── index.ts            # TypeScript types
```

---

## 🌐 Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, specials, popular dishes, how it works, testimonials |
| `/menu` | Full digital menu with search + category tabs |
| `/preorder` | Pre-order form with cart summary |
| `/order-status` | Order tracking — search by Order ID or Student ID |
| `/admin` | Admin dashboard — orders, revenue, popular items |
| `/qr-menu` | Mobile-optimized QR scan menu page |

---

## 🛒 Features

- **Add to Cart** — live cart updates via React Context
- **Cart Sidebar** — slide-in panel with quantity controls
- **Pre-Order Form** — validation, pickup time selector, confirmation modal
- **Order Status Tracker** — visual step progress (Received → Cooking → Ready → Complete)
- **Admin Dashboard** — orders list with status updates, revenue charts
- **QR Menu** — ultra-lightweight page for scan-and-view
- **Daily Specials** — chef special + discount highlight
- **Category Filter** — tabs with emoji for Rice, Grilled, Snacks, Drinks
- **Search** — filter by name/description
- **Mobile First** — responsive grid, sticky nav, scrollable tabs

---

## 🎨 Design System

- **Colors**: Earthy amber/orange tones inspired by African cuisine + kente accents
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Components**: Rounded cards (rounded-2xl), smooth hover animations, shadow-md
- **Kente decoration**: Red/gold/green stripe motifs in hero section

---

## 📦 Tech Stack

- **Next.js 14** — App Router, server + client components
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Full type safety
- **Lucide React** — Icon library
- **React Context** — Cart state management
- **Mock Data** — No backend required (15 menu items, 5 mock orders)

---

## 🧪 Demo Data

Try these Order IDs on the Track Order page:
- `ORD-001` (Preparing)
- `ORD-002` (Ready!)
- `ORD-003` (Completed)
- `ORD-004` (Received)
- `ORD-005` (Preparing)

---

Built as a demo to show how African campus canteens can go digital 🌍🍽️
