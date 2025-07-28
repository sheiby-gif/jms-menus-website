# Database Management Guide

This guide explains how to manage your database using the comprehensive database management system built into your menu design order system.

## 🚀 Quick Start

### 1. Setup Database
```bash
# Install dependencies
npm install

# Set up your environment variables
cp env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 2. Access Database Management Interface
1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/database`
3. Use the web interface to manage your database

## 📊 Database Management Features

### Overview Dashboard
- **Real-time Statistics**: View counts of clients, designs, orders, and employees
- **Database Performance**: Monitor database size and connection status
- **Quick Actions**: Access common operations from the overview

### Database Operations

#### Seeding Database
Populate your database with sample data for testing and development.

**Via Web Interface:**
1. Go to the "Operations" tab
2. Click "Seed Database"
3. Wait for confirmation

**Via Command Line:**
```bash
npm run db:seed
```

#### Resetting Database
Clear all data and optionally re-seed.

**Via Web Interface:**
1. Go to the "Operations" tab
2. Click "Reset Database"
3. Confirm the action

**Via Command Line:**
```bash
npm run db:reset
```

### Migration Management

#### View Migration Status
- See which migrations have been applied
- Check migration timestamps
- Identify pending migrations

#### Run Migrations
**Via Web Interface:**
1. Go to the "Migrations" tab
2. Click "Run Migrations"
3. Monitor the progress

**Via Command Line:**
```bash
# Development migrations
npm run db:migrate

# Production migrations
npm run db:migrate:deploy
```

### Backup & Restore

#### Export Database
Create a complete backup of your database.

**Via Web Interface:**
1. Go to the "Backup & Restore" tab
2. Click "Export Database"
3. Download the JSON file

**Via Command Line:**
```bash
npm run db:backup
```

#### Import Database
Restore your database from a backup file.

**Via Web Interface:**
1. Go to the "Backup & Restore" tab
2. Drag and drop or click to select a backup file
3. Wait for import completion

### Database Monitoring

#### Health Checks
Monitor database performance and identify issues:

- **Connection Status**: Verify database connectivity
- **Response Time**: Check query performance
- **Data Integrity**: Identify orphaned records and duplicates
- **Table Sizes**: Monitor database growth

#### Performance Metrics
- Active connections
- Slow queries
- Table sizes
- Record counts

## 🛠️ Command Line Tools

### Available Scripts

```bash
# Database Schema Management
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes to database
npm run db:migrate     # Create and apply new migration
npm run db:migrate:deploy  # Apply existing migrations (production)

# Database Data Management
npm run db:seed        # Seed database with sample data
npm run db:reset       # Reset database and optionally re-seed
npm run db:backup      # Create database backup

# Database Exploration
npm run db:studio      # Open Prisma Studio for visual database management
```

### Custom Seeding Script

The seeding script (`scripts/seed-database.ts`) creates:

- **4 Employees**: Admin, Sales, Designer, Manager
- **8 Clients**: Various restaurant types
- **11 Designs**: Different menu categories
- **8 Orders**: Sample order data

You can customize this script to add your own data.

## 🔧 Configuration

### Environment Variables

Required environment variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/menu_design_db"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File Upload
UPLOAD_DIR="public/uploads"
MAX_FILE_SIZE=5242880 # 5MB
```

### Database Schema

The database includes these main entities:

- **Clients**: Restaurant and business information
- **Designs**: Menu design templates and pricing
- **Employees**: Staff members and roles
- **Orders**: Client orders with status tracking

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check if database is running
# Verify DATABASE_URL in .env
# Ensure database exists
```

#### Migration Errors
```bash
# Reset migrations
npm run db:reset

# Regenerate Prisma client
npm run db:generate
```

#### Seeding Errors
```bash
# Clear existing data first
npm run db:reset

# Try seeding again
npm run db:seed
```

### Performance Issues

1. **Check Database Health**: Use the monitoring tab
2. **Review Slow Queries**: Monitor query performance
3. **Optimize Indexes**: Add database indexes for frequently queried fields
4. **Connection Pooling**: Configure connection limits

## 🔒 Security Considerations

### Data Protection
- Regular backups before major changes
- Test operations on development database first
- Validate imported data before production use
- Monitor for data integrity issues

### Access Control
- Limit database management access to authorized users
- Use environment variables for sensitive configuration
- Implement proper authentication for admin functions

## 📈 Best Practices

### Regular Maintenance
1. **Daily**: Monitor database health
2. **Weekly**: Review performance metrics
3. **Monthly**: Create full backups
4. **Before Updates**: Backup before schema changes

### Data Management
1. **Backup Before Changes**: Always backup before major operations
2. **Test in Development**: Test all operations in development first
3. **Monitor Growth**: Track database size and performance
4. **Clean Up**: Regularly remove old or unused data

### Performance Optimization
1. **Index Optimization**: Add indexes for frequently queried fields
2. **Query Optimization**: Monitor and optimize slow queries
3. **Connection Management**: Properly manage database connections
4. **Regular Maintenance**: Schedule regular database maintenance

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the database logs
3. Verify your environment configuration
4. Test with the health check feature
5. Create a backup before attempting fixes

For additional help, refer to:
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Next.js Documentation](https://nextjs.org/docs) 