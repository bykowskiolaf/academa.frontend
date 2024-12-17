import Dashboard from '@/pages/Dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: Dashboard,
})