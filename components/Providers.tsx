'use client'

import { ReactNode } from 'react'
import { AssessmentProvider } from '@/contexts/AssessmentContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AssessmentProvider>
      {children}
    </AssessmentProvider>
  )
}
