'use client'
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-context";
export default function LogoutButton() {
  const { signOutUser } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    signOutUser()
    router.push("/")
  }
  return (
    <Button sx={{color:"white"}} onClick={handleSignOut} variant="outlined">Log Out</Button>
  )
}