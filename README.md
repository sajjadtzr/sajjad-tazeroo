<<<<<<< HEAD
# TechStore - Next.js Ecommerce Platform

A modern, full-featured ecommerce platform built with Next.js, PostgreSQL, and AdminJS featuring a sleek black technology theme.

## 🚀 Features

### Frontend
- **Modern Tech Design**: Black theme with gradient accents and glass morphism effects
- **Responsive Layout**: Mobile-first design that works on all devices
- **Product Catalog**: Advanced filtering, search, and sorting capabilities
- **Shopping Cart**: Real-time cart management with persistent storage
- **Checkout System**: Secure checkout flow with form validation
- **Product Pages**: Detailed product views with image galleries
- **Category Navigation**: Organized product browsing by categories

### Backend & Admin
- **PostgreSQL Database**: Robust relational database with Prisma ORM
- **AdminJS Panel**: Full-featured admin interface for managing:
  - Products (CRUD operations)
  - Categories
  - Orders and customers
  - Inventory management
- **CSV Import**: Bulk product upload via CSV files
- **Order Management**: Track orders from placement to delivery
- **Customer Management**: Customer profiles and order history

### Technology Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Admin Panel**: AdminJS with Express
- **State Management**: Zustand
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
The project is configured to connect to your PostgreSQL database:
- **Host**: logan.liara.cloud:30546
- **Database**: tech_store
- **User**: root

### 3. Environment Variables
Create a `.env` file with:
```env
DATABASE_URL="postgresql://root:7DY881qh5HXwgKYk7eTgqOPd@logan.liara.cloud:30546/tech_store?schema=public"
NEXTAUTH_SECRET="your-secret-key"
ADMIN_EMAIL="admin@techstore.com"
ADMIN_PASSWORD="admin123"
```

### 4. Database Migration
```bash
npm run db:push
```

### 5. Start Development Servers

**Frontend (Next.js):**
```bash
npm run dev
```
Access at: http://localhost:3000

**Admin Panel:**
```bash
npm run admin
```
Access at: http://localhost:3001/admin

## 📁 Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── checkout/          # Checkout pages
│   ├── products/          # Product pages
│   └── globals.css        # Global styles
├── admin/                 # AdminJS configuration
│   ├── components/        # Admin components
│   └── server.js         # Admin server
├── components/            # React components
├── lib/                   # Utilities and configurations
├── prisma/               # Database schema and migrations
├── store/                # State management
└── public/               # Static assets
```

## 🎨 Design Features

### Theme Colors
- **Primary**: Blue gradients (#667eea to #764ba2)
- **Accent**: Pink/Red gradients (#f093fb to #f5576c)
- **Tech**: Cyan gradients (#4facfe to #00f2fe)
- **Dark**: Slate colors for backgrounds

### UI Components
- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Buttons**: Animated hover effects
- **Floating Shapes**: Animated background elements
- **Responsive Grid**: Auto-fit product layouts
- **Loading States**: Skeleton loaders and spinners

## 📊 Admin Panel Features

### CSV Upload
Upload products in bulk using CSV format:
```csv
name,description,price,sku,stock,category,images,featured,active
iPhone 15 Pro,Latest Apple smartphone,999.99,IPHONE15PRO,50,Electronics,https://example.com/image.jpg,true,true
```

### Dashboard
- Sales overview and statistics
- Recent orders management
- Quick action buttons
- Real-time data updates

### Product Management
- Rich product editor
- Image gallery support
- Inventory tracking
- Category assignment
- Featured product flags

## 🛒 Cart & Checkout

### Shopping Cart
- Persistent cart storage
- Real-time quantity updates
- Price calculations
- Remove items functionality
- Mobile-responsive dropdown

### Checkout Process
1. **Customer Information**: Name, email, phone
2. **Shipping Address**: Complete address details
3. **Payment Information**: Credit card details (mock)
4. **Order Confirmation**: Order summary and tracking

## 🔧 API Endpoints

### Products
- `GET /api/products` - List products with filtering
- `GET /api/products/[slug]` - Get single product
- `POST /api/products` - Create product (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/[slug]` - Get category with products

## 🚀 Deployment

### Database Setup
1. Ensure PostgreSQL is running and accessible
2. Run migrations: `npm run db:push`
3. Seed initial data if needed

### Production Build
```bash
npm run build
npm start
```

### Admin Panel
```bash
node admin/server.js
```

## 🔒 Security Features

- **Input Validation**: All forms validated client and server-side
- **SQL Injection Protection**: Prisma ORM with prepared statements
- **XSS Protection**: React's built-in XSS prevention
- **Admin Authentication**: Secure admin login system
- **HTTPS Ready**: SSL/TLS encryption support

## 📱 Mobile Optimization

- **Responsive Design**: Works perfectly on all screen sizes
- **Touch Friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized images and code splitting
- **Progressive Enhancement**: Works without JavaScript

## 🎯 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Browser and server-side caching
- **Lazy Loading**: Images and components loaded on demand

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build
```

## 📞 Support

For questions or issues:
- Email: support@techstore.com
- Documentation: Check the code comments
- Issues: Create GitHub issues for bugs

## 📄 License

This project is proprietary software. All rights reserved.

---

Built with ❤️ using Next.js, PostgreSQL, and AdminJS
=======
# sajjad-tazeroo
>>>>>>> 09fcac66d040dd79ace44c6aed1b82d99facf7d4
