import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'CSV file must have at least a header and one data row' },
        { status: 400 }
      )
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const dataRows = lines.slice(1)

    // Map CSV columns to database fields
    const columnMapping: { [key: string]: string } = {
      'Name': 'name',
      'Email': 'email',
      'Phone': 'phone',
      'Company': 'company',
      'Address': 'address',
      'CUSTOMERNAME': 'name',
      'EMAIL ADDRESS': 'email',
      'Phone Number': 'phone',
      'Contact Name': 'name',
      'Address 1': 'address',
      'Address 2': 'address2',
      'City': 'city',
      'State': 'state',
      'Zip Code': 'zipCode'
    }

    const importedClients = []
    const errors = []

    for (let i = 0; i < dataRows.length; i++) {
      const line = dataRows[i]
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
      
      if (values.length < headers.length) {
        errors.push(`Row ${i + 2}: Insufficient data`)
        continue
      }

      const clientData: any = {}
      
      headers.forEach((header, index) => {
        const dbField = columnMapping[header]
        if (dbField) {
          if (dbField === 'address' && clientData.address) {
            // Combine address fields
            clientData.address = `${clientData.address}, ${values[index]}`
          } else if (dbField === 'address2' && values[index]) {
            // Add address2 to address
            clientData.address = clientData.address ? `${clientData.address}, ${values[index]}` : values[index]
          } else if (dbField === 'city' && values[index]) {
            // Add city to address
            clientData.address = clientData.address ? `${clientData.address}, ${values[index]}` : values[index]
          } else if (dbField === 'state' && values[index]) {
            // Add state to address
            clientData.address = clientData.address ? `${clientData.address}, ${values[index]}` : values[index]
          } else if (dbField === 'zipCode' && values[index]) {
            // Add zip to address
            clientData.address = clientData.address ? `${clientData.address} ${values[index]}` : values[index]
          } else {
            clientData[dbField] = values[index]
          }
        }
      })

      // Validate required fields
      if (!clientData.name || !clientData.email || !clientData.company) {
        errors.push(`Row ${i + 2}: Missing required fields (name, email, company)`)
        continue
      }

      try {
        // Check if client already exists
        const existingClient = await prisma.client.findUnique({
          where: { email: clientData.email }
        })

        if (existingClient) {
          if (existingClient.isDeleted) {
            // Restore soft deleted client
            const restoredClient = await prisma.client.update({
              where: { id: existingClient.id },
              data: {
                name: clientData.name,
                email: clientData.email,
                phone: clientData.phone || '',
                company: clientData.company,
                address: clientData.address || '',
                isDeleted: false,
                deletedAt: null,
              }
            })
            importedClients.push(restoredClient)
          } else {
            errors.push(`Row ${i + 2}: Client with email ${clientData.email} already exists`)
          }
        } else {
          // Create new client
          const newClient = await prisma.client.create({
            data: {
              name: clientData.name,
              email: clientData.email,
              phone: clientData.phone || '',
              company: clientData.company,
              address: clientData.address || '',
              isDeleted: false,
            }
          })
          importedClients.push(newClient)
        }
      } catch (error) {
        errors.push(`Row ${i + 2}: ${error}`)
      }
    }

    return NextResponse.json({
      message: `Imported ${importedClients.length} clients successfully`,
      imported: importedClients.length,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Error importing CSV:', error)
    return NextResponse.json(
      { error: 'Failed to import CSV' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 