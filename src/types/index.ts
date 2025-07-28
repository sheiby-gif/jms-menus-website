export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface Design {
  id: string
  name: string
  description: string
  category: string
  price: number
  imageUrl: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  clientId: string
  client: Client
  designId: string
  design: Design
  quantity: number
  totalPrice: number
  status: OrderStatus
  notes: string
  employeeId: string
  employee: Employee
  createdAt: Date
  updatedAt: Date
}

export interface Employee {
  id: string
  name: string
  email: string
  role: EmployeeRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type OrderStatus = 'pending' | 'confirmed' | 'in_production' | 'completed' | 'cancelled'
export type EmployeeRole = 'admin' | 'sales' | 'designer' | 'manager'

export interface OrderFormData {
  clientId: string
  designId: string
  quantity: number
  notes: string
}

export interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalRevenue: number
  monthlyRevenue: number
} 