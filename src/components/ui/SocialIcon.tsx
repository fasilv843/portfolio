import React from "react";
import { SOCIALS } from "@/lib/site";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "./icons";

export type SocialLabel = (typeof SOCIALS)[number]["label"];

const size = "h-[18px] w-[18px]";

/**
 * Keyed off SOCIALS, so adding a social in site.ts without a mark here is a type
 * error rather than a blank square in the footer. The marks themselves live in
 * icons.tsx — GitHub is also used on the project cards.
 */
const socialIcons: Record<SocialLabel, React.ReactNode> = {
  GitHub: <GitHubIcon className={size} />,
  LinkedIn: <LinkedInIcon className={size} />,
  Instagram: <InstagramIcon className={size} />,
  X: <XIcon className={size} />,
  Facebook: <FacebookIcon className={size} />,
};

export default socialIcons;
