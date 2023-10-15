import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NFTMarketplaceProvider} from "../Context/NFTMarketplaceContext";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NFT Marketplace by Iftikhar',
  description: 'NFT Marketplace by Iftikhar uddin in Nextjs and Solidity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <NFTMarketplaceProvider>
    <body className={inter.className}>{children}</body>
    </NFTMarketplaceProvider>
    </html>
  )
}
