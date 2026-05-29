/**
 * ============================================================================
 * ATEION SHARED NAVBAR
 * ============================================================================
 * Primary navbar used across all pages
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router";

import logo from "../../assets/logo.png";

const navTextClass =
  "font-bold text-[13px] whitespace-nowrap font-manrope";

/**
 * ============================================================================
 * NAV BUTTON
 * ============================================================================
 */

function NavButton({
  children,
  variant = "default" as
    | "default"
    | "muted"
    | "primary"
    | "white",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "default" | "muted" | "primary" | "white";
  onClick?: () => void;
}) {

  const variantClasses = {

    default:
      "bg-[rgba(235,235,235,0.8)] hover:bg-[rgba(215,215,215,0.95)] text-[#292929]",

    muted:
      "bg-[rgba(235,235,235,0.8)] hover:bg-[rgba(215,215,215,0.95)] text-[#292929]",

    primary:
      "bg-[#fb4444] hover:bg-[#ff5555] text-white shadow-[0_4px_12px_rgba(251,68,68,0.25)] hover:shadow-[0_6px_20px_rgba(251,68,68,0.35)]",

    white:
      "bg-white hover:bg-[#f5f5f5] text-[#292929] shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]",

  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${variantClasses[variant]} flex h-[36px] items-center justify-center px-[12px] xl:px-[20px] rounded-full shrink-0 cursor-pointer transition-colors`}
    >
      {children}
    </motion.div>
  );
}

/**
 * ============================================================================
 * DARK SECTION DETECTOR
 * ============================================================================
 */

function useNavbarOnDark() {

  const [isOnDarkSection, setIsOnDarkSection] =
    useState(false);

  useEffect(() => {

    const handleScroll = () => {

      const navbar = document.querySelector("nav");

      if (!navbar) return;

      const navRect = navbar.getBoundingClientRect();

      const navMidY =
        navRect.top + navRect.height / 2;

      const darkSections =
        document.querySelectorAll(".dark-section");

      let overDark = false;

      darkSections.forEach((section) => {

        const rect = section.getBoundingClientRect();

        if (
          navMidY >= rect.top &&
          navMidY <= rect.bottom
        ) {
          overDark = true;
        }

      });

      setIsOnDarkSection(overDark);

    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    handleScroll();

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

    };

  }, []);

  return isOnDarkSection;

}

/**
 * ============================================================================
 * LOGO
 * ============================================================================
 */

function LogoContainer() {

  const isLogoWhite = useNavbarOnDark();

  return (
    <div className="flex items-center relative shrink-0">
      <Link to="/">
        <img
          src={logo}
          alt="Ateion Logo"
          className={`h-[50px] md:h-[60px] object-contain w-auto transition-all duration-300 ${
            isLogoWhite
              ? "brightness-0 invert"
              : ""
          }`}
        />
      </Link>
    </div>
  );
}

/**
 * ============================================================================
 * HOME BUTTON
 * ============================================================================
 */

function HomeBtn({
  onClick,
}: {
  onClick?: () => void;
}) {

  const navigate = useNavigate();

  return (
    <NavButton
      variant="default"
      onClick={() => {

        if (onClick) onClick();

        navigate("/");

      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>
        Home
      </p>
    </NavButton>
  );
}

/**
 * ============================================================================
 * DASHBOARD BUTTON
 * ============================================================================
 */

function DashboardBtn({
  onClick,
}: {
  onClick?: () => void;
}) {

  const navigate = useNavigate();

  return (
    <NavButton
      variant="primary"
      onClick={() => {

        if (onClick) onClick();

        navigate("/dashboard");

      }}
    >
      <p className={`${navTextClass} text-white`}>
        Dashboard
      </p>
    </NavButton>
  );
}

/**
 * ============================================================================
 * GLOBAL OLYMPIAD BUTTON
 * ============================================================================
 */

function GlobalOlympiadBtn({
  onClick,
}: {
  onClick?: () => void;
}) {

  const navigate = useNavigate();

  return (
    <NavButton
      variant="muted"
      onClick={() => {

        if (onClick) onClick();

        navigate("/gco");

      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>
        Global Olympiad
      </p>
    </NavButton>
  );
}

/**
 * ============================================================================
 * PLAYGROUND BUTTON
 * ============================================================================
 */

function ResourcesBtn({
  onClick,
}: {
  onClick?: () => void;
}) {

  const navigate = useNavigate();

  return (
    <NavButton
      variant="muted"
      onClick={() => {

        if (onClick) onClick();

        navigate("/playground");

      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>
        PlayGround
      </p>
    </NavButton>
  );
}

/**
 * ============================================================================
 * CERTIFICATE BUTTON
 * ============================================================================
 */

function CertificateBtn({
  onClick,
}: {
  onClick?: () => void;
}) {

  const navigate = useNavigate();

  return (
    <NavButton
      variant="muted"
      onClick={() => {

        if (onClick) onClick();

        navigate("/certificate");

      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>
        Certificate
      </p>
    </NavButton>
  );
}

/**
 * ============================================================================
 * GET CONNECTED BUTTON
 * ============================================================================
 */

function GetConnectedBtn({
  onClick,
}: {
  onClick?: () => void;
}) {

  const navigate = useNavigate();

  return (
    <NavButton
      variant="primary"
      onClick={() => {

        if (onClick) onClick();

        navigate("/contact");

      }}
    >
      <p className={`${navTextClass} text-white`}>
        Get Connected
      </p>
    </NavButton>
  );
}

/**
 * ============================================================================
 * SIGN IN BUTTON
 * ============================================================================
 */

function SignInBtn({
  onClick,
}: {
  onClick?: () => void;
}) {

  return (
    <NavButton
      variant="white"
      onClick={() => {

        if (onClick) onClick();

        window.dispatchEvent(
          new CustomEvent("open-login")
        );

      }}
    >
      <p className={`${navTextClass} text-[#292929]`}>
        Sign In
      </p>
    </NavButton>
  );
}

/**
 * ============================================================================
 * SIGN UP BUTTON
 * ============================================================================
 */

function SignUpBtn({
  onClick,
}: {
  onClick?: () => void;
}) {

  return (
    <NavButton
      variant="primary"
      onClick={() => {

        if (onClick) onClick();

        window.dispatchEvent(
          new CustomEvent("open-register")
        );

      }}
    >
      <p className={`${navTextClass} text-white`}>
        Sign Up
      </p>
    </NavButton>
  );
}

/**
 * ============================================================================
 * NAV LINKS
 * ============================================================================
 */

function NavLinks({
  onCloseMobile,
}: {
  onCloseMobile?: () => void;
}) {

  return (
    <div className="flex gap-[8px] xl:gap-[16px] items-center shrink-0">

      {/* HOME */}
      <HomeBtn onClick={onCloseMobile} />

      {/* DASHBOARD */}
      <DashboardBtn
        onClick={onCloseMobile}
      />

      {/* GLOBAL OLYMPIAD */}
      <GlobalOlympiadBtn
        onClick={onCloseMobile}
      />

      {/* PLAYGROUND */}
      <ResourcesBtn
        onClick={onCloseMobile}
      />

      {/* CERTIFICATE */}
      <CertificateBtn
        onClick={onCloseMobile}
      />

    </div>
  );
}

/**
 * ============================================================================
 * MAIN NAVBAR
 * ============================================================================
 */

export default function SharedNavbar() {

  return (

    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-transparent"
      role="navigation"
      aria-label="Main navigation"
    >

      <div className="flex items-center justify-between px-[16px] lg:px-[24px] py-[12px] lg:py-[20px] w-full max-w-[1280px] mx-auto">

        {/* LEFT SIDE */}
        <div className="flex items-center justify-start">

          <LogoContainer />

          <div className="hidden lg:flex items-center ml-[16px] xl:ml-[32px]">
            <NavLinks />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center justify-end ml-auto gap-[8px] xl:gap-[12px]">

          <GetConnectedBtn />

          <SignInBtn />

          <SignUpBtn />

        </div>

      </div>

    </nav>
  );
}