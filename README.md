# Menu Design Order System

A comprehensive internal order management system for menu design companies, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Client Management**: Add, edit, and manage client information
- **Design Catalog**: Browse and select from available menu designs
- **Order Processing**: Create orders with client, design, and quantity selection
- **Real-time Pricing**: Automatic calculation of total costs
- **Order Tracking**: Monitor order status from pending to completion

### 🔗 Website Integration
- **Automated Communication**: Email notifications for order updates
- **API Integration**: Connect with your website for seamless workflow
- **Next Steps Automation**: Automated guidance for website setup
- **Status Synchronization**: Keep website and internal system in sync

### 📊 Dashboard & Analytics
- **Order Statistics**: View total orders, pending orders, and revenue
- **Recent Orders**: Quick access to latest order information
- **Status Overview**: Visual representation of order statuses
- **Revenue Tracking**: Monthly and total revenue monitoring

### 👥 Employee Management
- **Role-based Access**: Different permissions for admin, sales, designer, and manager roles
- **Order Attribution**: Track which employee created each order
- **Activity Logging**: Monitor employee actions and order history

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Icons**: Heroicons
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Email**: Nodemailer for automated notifications
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- SMTP email service (for notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd menu-design-order-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   - Database connection string
   - Email service credentials
   - Website integration details
   - JWT secrets

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── orders/        # Order management endpoints
│   │   ├── clients/       # Client management endpoints
│   │   ├── designs/       # Design catalog endpoints
│   │   └── notifications/ # Automated communication
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard component
│   ├── Header.tsx         # Application header
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── OrderForm.tsx      # Order creation/editing form
├── types/                 # TypeScript type definitions
├── lib/                   # Utility libraries
├── hooks/                 # Custom React hooks
└── utils/                 # Helper functions
```

## API Endpoints

### Orders
- `GET /api/orders` - Fetch all orders
- `POST /api/orders` - Create new order

### Clients
- `GET /api/clients` - Fetch all clients
- `POST /api/clients` - Create new client

### Designs
- `GET /api/designs` - Fetch all designs
- `POST /api/designs` - Create new design

### Notifications
- `POST /api/notifications` - Send automated notifications

## Database Schema

The system uses PostgreSQL with the following main entities:

- **Clients**: Customer information and contact details
- **Designs**: Menu design templates with pricing
- **Orders**: Order records linking clients, designs, and employees
- **Employees**: Staff members with role-based permissions

## Website Integration

The system is designed to integrate with your existing website:

1. **Order Creation**: When an order is placed, the system automatically:
   - Sends confirmation emails to clients
   - Generates integration instructions
   - Provides API keys for website connection

2. **Status Updates**: Order status changes trigger:
   - Email notifications to clients
   - Website API calls for status synchronization
   - Next steps guidance for website updates

3. **Completion Workflow**: When orders are completed:
   - Final delivery notifications
   - Website integration setup instructions
   - Support contact information

## Customization

### Adding New Design Categories
1. Update the `Design` model in `prisma/schema.prisma`
2. Add category options to the design creation form
3. Update the dashboard filters

### Customizing Notifications
1. Modify the notification templates in `src/app/api/notifications/route.ts`
2. Add new notification types as needed
3. Configure email templates and styling

### Website Integration
1. Set up your website API endpoints
2. Configure the integration URLs in environment variables
3. Customize the integration instructions for your specific website platform

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Set up your database and environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions 