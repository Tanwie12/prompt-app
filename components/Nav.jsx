'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { Button } from 'antd';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

function Nav() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <nav className="flex-between items-center w-full pt-4">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promtopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="gap-4 md:gap-4 hidden md:flex">
        {session?.user ? (
          <>
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <Button type="link" color="primary" onClick={signOut}>
              Sign Out
            </Button>
            <Link href="/profile">
              <Image src={session.user.image} width={30} height={30} className="object-contain rounded-full" />
            </Link>
          </>
        ) : (
          <Button type="button" color="primary" className="black_btn" onClick={handleSignIn}>
            Sign In
          </Button>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden flex relative">
        {session?.user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar isBordered as="button" className="transition-transform" src={session.user.image} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user.name}</p>
              </DropdownItem>
              <DropdownItem key="profile" href="/profile">
                My Profile
              </DropdownItem>
              <DropdownItem key="createPrompt" href="/create-prompt">
                Create Prompt
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={signOut}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button type="button" color="primary" className="black_btn" onClick={handleSignIn}>
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Nav;
