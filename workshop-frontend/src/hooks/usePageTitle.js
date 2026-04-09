import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to update document title based on current route
 * Maps route paths to descriptive page titles
 */
export function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      "/": "Home ",
      "/workshops": "Workshops - FOSSEE Workshop Booking",
      "/statistics/public": "Statistics",
      "/profile": "Profile",
      "/password-change": "Change Password",
      "/login": "Login",
      "/register": "Register",
    };

    // Check for exact match first
    if (titleMap[location.pathname]) {
      document.title = titleMap[location.pathname];
      return;
    }

    // Check for dynamic routes (like /workshop/:id)
    if (location.pathname.match(/^\/workshop\/\d+/)) {
      document.title = "Workshop Details - FOSSEE Workshop Booking";
      return;
    }

    // Fallback to generic title
    document.title = "FOSSEE Workshop Booking";
  }, [location.pathname]);
}
