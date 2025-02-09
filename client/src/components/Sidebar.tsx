import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBasket,
  Trophy,
  Award,
  Users,
  UserCircle
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/"
  },
  {
    title: "Inventory",
    icon: ShoppingBasket,
    href: "/inventory"
  },
  {
    title: "NutriPlanner",
    icon: UserCircle,
    href: "/NutriPlanner"
  },
  {
    title: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard"
  },
  {
    title: "Challenges",
    icon: Award,
    href: "/challenges"
  },
  {
    title: "Community",
    icon: Users,
    href: "/community"
  },
  {
    title: "Profile",
    icon: UserCircle,
    href: "/profile"
  }
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all",
                  location.pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}