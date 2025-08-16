import React from 'react'
import { Box, Text, Button, Icon } from '@adminjs/design-system'

const Dashboard = () => {
  return (
    <Box>
      <Box mb="xl">
        <Text as="h1">Tech Store Dashboard</Text>
        <Text>Welcome to your ecommerce admin panel</Text>
      </Box>

      <Box display="flex" flexWrap="wrap" mx="-lg">
        <Box width={[1, 1/2, 1/3]} px="lg" mb="xl">
          <Box 
            bg="white" 
            border="default" 
            borderRadius="lg" 
            p="xl"
            style={{ 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <Box display="flex" alignItems="center" mb="lg">
              <Icon icon="ShoppingCart" size={24} mr="default" />
              <Text as="h3" mb="0">Products</Text>
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mb="sm">Manage Inventory</Text>
            <Text opacity={0.9}>Add, edit, and organize your product catalog</Text>
          </Box>
        </Box>

        <Box width={[1, 1/2, 1/3]} px="lg" mb="xl">
          <Box 
            bg="white" 
            border="default" 
            borderRadius="lg" 
            p="xl"
            style={{ 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white'
            }}
          >
            <Box display="flex" alignItems="center" mb="lg">
              <Icon icon="Package" size={24} mr="default" />
              <Text as="h3" mb="0">Orders</Text>
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mb="sm">Track Sales</Text>
            <Text opacity={0.9}>Monitor and manage customer orders</Text>
          </Box>
        </Box>

        <Box width={[1, 1/2, 1/3]} px="lg" mb="xl">
          <Box 
            bg="white" 
            border="default" 
            borderRadius="lg" 
            p="xl"
            style={{ 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white'
            }}
          >
            <Box display="flex" alignItems="center" mb="lg">
              <Icon icon="Upload" size={24} mr="default" />
              <Text as="h3" mb="0">CSV Upload</Text>
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mb="sm">Bulk Import</Text>
            <Text opacity={0.9}>Upload products via CSV file</Text>
          </Box>
        </Box>
      </Box>

      <Box mt="xxl">
        <Text as="h2" mb="lg">Quick Actions</Text>
        <Box display="flex" flexWrap="wrap" mx="-sm">
          <Box px="sm" mb="lg">
            <Button variant="primary" size="lg">
              <Icon icon="Plus" mr="sm" />
              Add Product
            </Button>
          </Box>
          <Box px="sm" mb="lg">
            <Button variant="secondary" size="lg">
              <Icon icon="Eye" mr="sm" />
              View Store
            </Button>
          </Box>
          <Box px="sm" mb="lg">
            <Button variant="tertiary" size="lg">
              <Icon icon="BarChart" mr="sm" />
              Analytics
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard