import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { Menu, LogOut, LogIn, BookOpen, User, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "@/components/ui/search-bar";
import SearchBarMobile from "@/components/ui/search-bar-mobile";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-orange-500" />
              <span className="font-bold text-xl hidden sm:inline-block text-orange-500">
                Edible
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <SearchBar
              placeholder="Search restaurants..."
              className="w-full"
              onSearch={handleSearch}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-9 w-9 rounded-full"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={user?.picture}
                            alt={user?.username}
                          />
                          <AvatarFallback>
                            {user?.username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user?.name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate("/manage-restaurant")}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Manage Restaurant
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/user-profile")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                {/* Auth Buttons - Desktop */}
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => await loginWithRedirect()}
                  >
                    Sign In
                  </Button>
                </div>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-orange-500">
                    Welcome to Edible!
                  </SheetTitle>
                  <SheetDescription>
                    Order first & Delivery fast!
                  </SheetDescription>
                </SheetHeader>
                <MobileNav
                  isAuthenticated={isAuthenticated}
                  user={user}
                  onClose={() => setIsMenuOpen(false)}
                  onLogout={handleLogout}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// Mobile Navigation Component
function MobileNav({
  isAuthenticated,
  user,
  onClose,
  onLogout,
}: {
  isAuthenticated: boolean;
  user: any;
  onClose: () => void;
  onLogout: () => void;
}) {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <div className="flex flex-col h-full p-2 gap-4">
      {/* User Info */}
      {isAuthenticated && user && (
        <div className="flex items-center gap-3 pb-4 mb-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.picture} alt={user.username} />
            <AvatarFallback>
              {user.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.username}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      )}

      {/* Mobile Search */}
      <div className="mb-4">
        <SearchBarMobile
          placeholder="Search restaurants..."
          variant="mobile"
          onSearch={handleSearch}
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {isAuthenticated ? (
          <>
            <div className="pt-4 mt-4 border-t space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("/manage-restaurant");
                  onClose();
                }}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Manage Restaurant
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("/user-profile");
                  onClose();
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-600"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="pt-4 mt-4 border-t space-y-2">
              <Button
                className="w-full"
                onClick={async () => await loginWithRedirect()}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
