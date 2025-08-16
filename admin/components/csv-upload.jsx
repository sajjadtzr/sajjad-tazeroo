import React, { useState } from 'react'
import { Box, Button, Text, MessageBox, Label } from '@adminjs/design-system'

const CSVUpload = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
    setMessage('')
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a CSV file')
      setMessageType('error')
      return
    }

    if (!file.name.endsWith('.csv')) {
      setMessage('Please select a valid CSV file')
      setMessageType('error')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('csvFile', file)

    try {
      const response = await fetch('/admin/upload-csv', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(result.message)
        setMessageType('success')
        setFile(null)
        // Reset file input
        document.getElementById('csvFile').value = ''
      } else {
        setMessage(result.error || 'Upload failed')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Upload failed: ' + error.message)
      setMessageType('error')
    }

    setUploading(false)
  }

  return (
    <Box>
      <Box mb="xl">
        <Text as="h1">CSV Product Upload</Text>
        <Text mt="default">
          Upload a CSV file to bulk import or update products. The CSV should include columns for: 
          name, description, price, sku, stock, category, images (comma-separated URLs), featured (true/false), active (true/false).
        </Text>
      </Box>

      {message && (
        <Box mb="xl">
          <MessageBox message={message} variant={messageType === 'error' ? 'danger' : 'success'} />
        </Box>
      )}

      <Box mb="xl">
        <Label htmlFor="csvFile">Select CSV File:</Label>
        <input
          id="csvFile"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{
            marginTop: '8px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '400px'
          }}
        />
      </Box>

      <Box mb="xl">
        <Button
          variant="primary"
          size="lg"
          onClick={handleUpload}
          disabled={uploading || !file}
        >
          {uploading ? 'Uploading...' : 'Upload CSV'}
        </Button>
      </Box>

      <Box>
        <Text as="h3">CSV Format Example:</Text>
        <Box 
          mt="default" 
          p="default" 
          style={{ 
            backgroundColor: '#f5f5f5', 
            fontFamily: 'monospace', 
            fontSize: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}
        >
          <pre>{`name,description,price,sku,stock,category,images,featured,active
iPhone 15 Pro,Latest Apple smartphone,999.99,IPHONE15PRO,50,Electronics,https://example.com/iphone1.jpg,true,true
Samsung Galaxy S24,Premium Android phone,849.99,GALAXYS24,30,Electronics,https://example.com/samsung1.jpg,false,true`}</pre>
        </Box>
      </Box>
    </Box>
  )
}

export default CSVUpload