import React from 'react'

import { Button } from '@payloadcms/ui'
import Link from 'next/link'

const AdminPreview: React.FC = () => {
  return (
    <Link href="/" target="live-preview">
      <Button className="preview-button" size="small" buttonStyle="pill">
        Náhled webu
      </Button>
    </Link>
  )
}

export default AdminPreview
