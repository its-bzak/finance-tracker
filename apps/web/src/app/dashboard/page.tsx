"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push("/login");
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="loadingText">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Navigation */}
      <nav className="dashboardNav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dashboardNavContent h-16">
            <h1 className="dashboardTitle">Finance Tracker</h1>
            
            {/* Desktop User Section */}
            <div className="dashboardUserSection">
              <p className="dashboardUserEmail">{user?.email}</p>
              <button onClick={handleSignOut} className="signOutBtn">
                Sign Out
              </button>
            </div>

            {/* Mobile Dropdown Button */}
            <button
              className="mobileMenuBtn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Mobile Dropdown Menu */}
            {dropdownOpen && (
              <div className="mobileMenuDropdown">
                <p className="mobileMenuEmail">{user?.email}</p>
                <button onClick={handleSignOut} className="mobileMenuSignOut">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboardMain">
        {/* Modern 3-Column Layout */}
        <div className="modernDashboardLayout"></div>
      </main>
    </div>
  );
}
