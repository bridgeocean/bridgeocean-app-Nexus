"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthTest() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🎉 Authentication Test - Success!</CardTitle>
            <CardDescription>NextAuth.js is working correctly with your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Session Information:</h3>
                <ul className="text-sm space-y-1 mt-2">
                  <li>
                    <strong>User ID:</strong> {session.user?.id}
                  </li>
                  <li>
                    <strong>Email:</strong> {session.user?.email}
                  </li>
                  <li>
                    <strong>Name:</strong> {session.user?.name}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Authentication Status:</h3>
                <ul className="text-sm space-y-1 mt-2">
                  <li>
                    <strong>Status:</strong> {status}
                  </li>
                  <li>
                    <strong>Authenticated:</strong> ✅ Yes
                  </li>
                  <li>
                    <strong>Session Active:</strong> ✅ Yes
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
