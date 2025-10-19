"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ];
  const MotionLink = motion(Link);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ opacity: navOpacity }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-purple-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex items-center gap-2"
            >
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Gabriel Corgado | Software Engineer
              </span>
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-xl blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.name.toLowerCase();
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveSection(item.name.toLowerCase())}
                  className="relative"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.03 * index,
                      duration: 0.16,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.1, ease: "easeOut" },
                    }}
                    whileTap={{ y: -1, scale: 0.99 }}
                    className={`relative px-4 py-2 rounded-lg font-bold transition-colors ${
                      isActive ? "text-purple-400" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg"
                        transition={{ type: "spring", stiffness: 600, damping: 28 }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-slate-800/30 rounded-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 1,
                        transition: { duration: 0.1, ease: "easeOut" },
                      }}
                    />
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
              <FiX className="text-slate-300 text-xl" />
            ) : (
              <FiMenu className="text-slate-300 text-xl" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={
          isMenuOpen
            ? { opacity: 1, height: "auto" }
            : { opacity: 0, height: 0, transitionEnd: { display: "none" } }
        }
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="md:hidden border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item, index) => (
            <MotionLink
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * index, duration: 0.16, ease: [0.33, 1, 0.68, 1] }}
              onClick={() => {
                setActiveSection(item.name.toLowerCase());
                setIsMenuOpen(false);
              }}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === item.name.toLowerCase()
                  ? "bg-slate-800/50 text-purple-400 border border-slate-700/50"
                  : "text-slate-300 hover:bg-slate-800/30 hover:text-white"
              }`}
            >
              {item.name}
            </MotionLink>
          ))}
          <MotionLink
            href="/contact"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16, duration: 0.16, ease: [0.33, 1, 0.68, 1] }}
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 mt-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-center rounded-lg font-semibold shadow-lg shadow-purple-500/30"
          >
            Hire Me
          </MotionLink>
        </div>
      </motion.div>

      {/* Decorative gradient line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.nav>
  );
}
