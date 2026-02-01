'use client'

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'

export interface AssessmentAnswer {
  question: string
  answer: string
}

export interface AssessmentResult {
  type: 'ai' | 'it'
  title: string
  answers: AssessmentAnswer[]
  resultLevel: string
  completedAt: Date
}

interface AssessmentContextType {
  assessments: AssessmentResult[]
  addAssessment: (assessment: AssessmentResult) => void
  clearAssessments: () => void
  getAssessmentByType: (type: 'ai' | 'it') => AssessmentResult | undefined
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [assessments, setAssessments] = useState<AssessmentResult[]>([])

  const addAssessment = useCallback((assessment: AssessmentResult) => {
    setAssessments(prev => {
      // Replace existing assessment of same type, or add new one
      const filtered = prev.filter(a => a.type !== assessment.type)
      return [...filtered, assessment]
    })
  }, [])

  const clearAssessments = useCallback(() => {
    setAssessments([])
  }, [])

  const getAssessmentByType = useCallback((type: 'ai' | 'it') => {
    return assessments.find(a => a.type === type)
  }, [assessments])

  const value = useMemo(() => ({
    assessments,
    addAssessment,
    clearAssessments,
    getAssessmentByType
  }), [assessments, addAssessment, clearAssessments, getAssessmentByType])

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}
