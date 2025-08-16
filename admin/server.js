const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const { Database, Resource } = require('@adminjs/prisma')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const express = require('express')
const session = require('express-session')
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

const adminOptions = {
  resources: [
    {
      resource: { model: prisma.product, client: prisma },
      options: {
        properties: {
          id: { isVisible: { list: true, show: true, edit: false, filter: true } },
          images: {
            type: 'string',
            isArray: true,
          },
          createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
          updatedAt: { isVisible: { list: false, show: true, edit: false, filter: false } },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.slug) {
                request.payload.slug = request.payload.slug.toLowerCase().replace(/\s+/g, '-')
              } else if (request.payload.name) {
                request.payload.slug = request.payload.name.toLowerCase().replace(/\s+/g, '-')
              }
              return request
            }
          },
          edit: {
            before: async (request) => {
              if (request.payload.slug) {
                request.payload.slug = request.payload.slug.toLowerCase().replace(/\s+/g, '-')
              }
              return request
            }
          }
        }
      }
    },
    {
      resource: { model: prisma.category, client: prisma },
      options: {
        properties: {
          id: { isVisible: { list: true, show: true, edit: false, filter: true } },
          createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
          updatedAt: { isVisible: { list: false, show: true, edit: false, filter: false } },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.slug) {
                request.payload.slug = request.payload.slug.toLowerCase().replace(/\s+/g, '-')
              } else if (request.payload.name) {
                request.payload.slug = request.payload.name.toLowerCase().replace(/\s+/g, '-')
              }
              return request
            }
          },
          edit: {
            before: async (request) => {
              if (request.payload.slug) {
                request.payload.slug = request.payload.slug.toLowerCase().replace(/\s+/g, '-')
              }
              return request
            }
          }
        }
      }
    },
    {
      resource: { model: prisma.order, client: prisma },
      options: {
        properties: {
          id: { isVisible: { list: true, show: true, edit: false, filter: true } },
          orderNumber: { isVisible: { list: true, show: true, edit: false, filter: true } },
          createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
          updatedAt: { isVisible: { list: false, show: true, edit: false, filter: false } },
        }
      }
    },
    {
      resource: { model: prisma.customer, client: prisma },
      options: {
        properties: {
          id: { isVisible: { list: true, show: true, edit: false, filter: true } },
          createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
          updatedAt: { isVisible: { list: false, show: true, edit: false, filter: false } },
        }
      }
    },
    {
      resource: { model: prisma.admin, client: prisma },
      options: {
        properties: {
          password: { 
            type: 'password',
            isVisible: { list: false, show: false, edit: true, filter: false }
          },
          createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
          updatedAt: { isVisible: { list: false, show: true, edit: false, filter: false } },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload.password = await bcrypt.hash(request.payload.password, 10)
              }
              return request
            }
          },
          edit: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload.password = await bcrypt.hash(request.payload.password, 10)
              }
              return request
            }
          }
        }
      }
    }
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Tech Store Admin',
    softwareBrothers: false,
    theme: {
      colors: {
        primary100: '#0f172a',
        primary80: '#1e293b',
        primary60: '#334155',
        primary40: '#64748b',
        primary20: '#94a3b8',
        grey100: '#151515',
        grey80: '#2d2d2d',
        grey60: '#4a4a4a',
        grey40: '#6b6b6b',
        grey20: '#9d9d9d',
        filterBg: '#1e293b',
        accent: '#3b82f6',
        hoverBg: '#334155',
      }
    }
  },
  dashboard: {
    component: AdminJS.bundle('./components/dashboard')
  }
}

const authenticate = async (email, password) => {
  const admin = await prisma.admin.findUnique({ where: { email } })
  if (admin && await bcrypt.compare(password, admin.password)) {
    return admin
  }
  return null
}

const start = async () => {
  const admin = new AdminJS(adminOptions)

  // Add custom pages for CSV upload
  admin.addPage({
    name: 'CSV Upload',
    component: AdminJS.bundle('./components/csv-upload'),
    icon: 'Upload'
  })

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'sessionsecret',
  }, null, {
    resave: false,
    saveUninitialized: true,
    secret: 'sessionsecret',
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'adminjs'
  })

  const app = express()

  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  app.use(admin.options.rootPath, adminRouter)

  // CSV Upload endpoint
  app.post('/admin/upload-csv', upload.single('csvFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const results = []
      const filePath = req.file.path

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            let created = 0
            let updated = 0
            let errors = []

            for (const row of results) {
              try {
                const productData = {
                  name: row.name || row.Name,
                  slug: (row.slug || row.name || row.Name)?.toLowerCase().replace(/\s+/g, '-'),
                  description: row.description || row.Description || '',
                  price: parseFloat(row.price || row.Price) || 0,
                  salePrice: row.salePrice || row.sale_price ? parseFloat(row.salePrice || row.sale_price) : null,
                  sku: row.sku || row.SKU || `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  stock: parseInt(row.stock || row.Stock) || 0,
                  weight: row.weight ? parseFloat(row.weight) : null,
                  featured: (row.featured || row.Featured)?.toLowerCase() === 'true',
                  active: (row.active || row.Active)?.toLowerCase() !== 'false',
                  images: row.images ? row.images.split(',').map(img => img.trim()) : []
                }

                // Check if category exists, create if not
                if (row.category || row.Category) {
                  const categoryName = row.category || row.Category
                  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-')
                  
                  let category = await prisma.category.findUnique({ where: { slug: categorySlug } })
                  if (!category) {
                    category = await prisma.category.create({
                      data: {
                        name: categoryName,
                        slug: categorySlug
                      }
                    })
                  }
                  productData.categoryId = category.id
                }

                // Check if product exists by SKU
                const existingProduct = await prisma.product.findUnique({ where: { sku: productData.sku } })
                
                if (existingProduct) {
                  await prisma.product.update({
                    where: { sku: productData.sku },
                    data: productData
                  })
                  updated++
                } else {
                  await prisma.product.create({ data: productData })
                  created++
                }
              } catch (error) {
                errors.push(`Row error: ${error.message}`)
              }
            }

            // Clean up uploaded file
            fs.unlinkSync(filePath)

            res.json({
              success: true,
              message: `Processing complete. Created: ${created}, Updated: ${updated}, Errors: ${errors.length}`,
              details: { created, updated, errors }
            })
          } catch (error) {
            res.status(500).json({ error: error.message })
          }
        })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  const PORT = process.env.ADMIN_PORT || 3001
  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

// Create default admin user if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await prisma.admin.findFirst()
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
      await prisma.admin.create({
        data: {
          email: process.env.ADMIN_EMAIL || 'admin@techstore.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'admin'
        }
      })
      console.log('Default admin user created')
    }
  } catch (error) {
    console.error('Error creating default admin:', error)
  }
}

start().then(() => {
  createDefaultAdmin()
}).catch(console.error)