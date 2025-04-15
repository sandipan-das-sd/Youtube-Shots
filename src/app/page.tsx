import Image from "next/image";
import { Button } from '@/components/ui/button';
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }
  
  // Missing 'user' after prisma
  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id
    }
  });
  
  if (!loggedInUser) {
    // Missing 'data:' object in user creation
    await prisma.user.create({
      data: {
        name: user.fullName || "Sandipan Das",
        email: user.emailAddresses[0].emailAddress,
        clerkUserId: user.id,
       
      }
    });
  }
  
  return (
    <>
      <Button>Hello world</Button>
    </>
  );
}