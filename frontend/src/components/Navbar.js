import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Baby, List } from "lucide-react"; // Import des icônes

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex items-center space-x-6 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" /> {/* Ajoute ton logo ici */}
        <span className="text-lg font-semibold">Ma Crèche</span>
      </Link>

      {/* Liens de navigation */}
      <div className="flex space-x-4">
        <Link to="/">
          <Button variant="ghost" className="text-white flex items-center space-x-2">
            <Home size={18} /> <span>Dashboard</span>
          </Button>
        </Link>
        <Link to="/enfants">
          <Button variant="ghost" className="text-white flex items-center space-x-2">
            <Baby size={18} /> <span>Enfants</span>
          </Button>
        </Link>
        <Link to="/liste-attente">
          <Button variant="ghost" className="text-white flex items-center space-x-2">
            <List size={18} /> <span>Liste d'Attente</span>
          </Button>
        </Link>
        <Link to="/parents">
          <Button variant="ghost" className="text-white flex items-center space-x-2">
            <Users size={18} /> <span>Parents</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;