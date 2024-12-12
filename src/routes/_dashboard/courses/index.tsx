import CoursesPage from '@/pages/CoursesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/courses/')({
  component: CoursesPage,
})
