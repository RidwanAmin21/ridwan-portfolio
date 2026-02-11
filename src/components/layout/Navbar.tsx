"use client";

import {
  IconHome,
  IconUser,
  IconCode,
  IconBriefcase,
  IconMail,
  IconFileText,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";

const NAV_ITEMS = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-stone-300" />,
    href: "#",
  },
  {
    title: "About",
    icon: <IconUser className="h-full w-full text-stone-300" />,
    href: "#about",
  },
  {
    title: "Projects",
    icon: <IconCode className="h-full w-full text-stone-300" />,
    href: "#projects",
  },
  {
    title: "Experience",
    icon: <IconBriefcase className="h-full w-full text-stone-300" />,
    href: "#experience",
  },
  {
    title: "Contact",
    icon: <IconMail className="h-full w-full text-stone-300" />,
    href: "#contact",
  },
  {
    title: "Resume",
    icon: <IconFileText className="h-full w-full text-stone-300" />,
    href: "/Ridwan_Amin_Resume_2025__Copy_%20(1).pdf",
  },
];

const Navbar = () => {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <FloatingDock items={NAV_ITEMS} />
    </div>
  );
};

export default Navbar;
