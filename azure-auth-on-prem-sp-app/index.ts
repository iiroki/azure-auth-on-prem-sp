import { randomUUID as uuid } from 'node:crypto'
import { DefaultAzureCredential } from '@azure/identity'
import { BlobServiceClient } from '@azure/storage-blob'
import dotnev from 'dotenv'

dotnev.config()

const storageAccount = process.env.STORAGE_ACCOUNT_NAME
const storageBlobContainer = process.env.STORAGE_BLOB_CONTAINER

const url = `https://${storageAccount}.blob.core.windows.net`

// "DefaultAzureCredential" could also be replaced with "EnvironmentCredential",
// since that's what we're using in the example.
const credential = new DefaultAzureCredential()
const client = new BlobServiceClient(url, credential)

console.log(`Blob Storage client initialized: ${client.url}`)
console.log()

const containerClient = client.getContainerClient(storageBlobContainer)
const blobName = `azure-auth-on-prem-sp/${uuid()}.txt`
const blobClient = containerClient.getBlobClient(blobName)
console.log(`Sending a blob to Blob Storage - Container: ${blobClient.containerName}, Name: ${blobClient.name}`)

await blobClient.getBlockBlobClient().uploadData(Buffer.from('Hello, World!'))
console.log('Success!')

await new Promise(r => setTimeout(r, 5000))
console.log('Shutdown')
