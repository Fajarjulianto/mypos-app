import { useState } from "react";
import Link from "next/link";
import { Menu, X, Cpu } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Civika</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Fitur", "Manfaat", "Harga", "Testimoni", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
              Request Demo
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
              Coba Gratis
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          {["Fitur", "Manfaat", "Harga", "Testimoni", "FAQ"].map((item) => (
            <Link
              key={item}
              href="#"
              className="block text-sm font-medium text-gray-600"
            >
              {item}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button className="w-full px-5 py-2.5 text-sm font-semibold border rounded-lg">
              Request Demo
            </button>
            <button className="w-full px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg">
              Coba Gratis
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
