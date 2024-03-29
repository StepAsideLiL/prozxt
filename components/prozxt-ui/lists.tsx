import {
  SiCss3,
  SiFacebook,
  SiGithub,
  SiHtml5,
  SiInstagram,
  SiJavascript,
  SiLinkedin,
  SiNextdotjs,
  SiReact,
  SiReddit,
  SiTailwindcss,
  SiThreads,
  SiTiktok,
  SiTypescript,
  SiWordpress,
  SiX,
} from "react-icons/si";

export const socialIcons = [
  {
    id: "x",
    socialTitle: "X",
    icon: <SiX />,
    profileHref: "https://twitter.com/",
  },
  {
    id: "github",
    socialTitle: "GitHub",
    icon: <SiGithub />,
    profileHref: "https://github.com/",
  },
  {
    id: "instagram",
    socialTitle: "Instagram",
    icon: <SiInstagram />,
    profileHref: "https://www.instagram.com/",
  },
  {
    id: "linkedin",
    socialTitle: "Linkedin",
    icon: <SiLinkedin />,
    profileHref: "https://www.linkedin.com/in/",
  },
  {
    id: "facebook",
    socialTitle: "Facebook",
    icon: <SiFacebook />,
    profileHref: "https://www.facebook.com/",
  },
  {
    id: "threads",
    socialTitle: "Threads",
    icon: <SiThreads />,
    profileHref: "https://www.threads.net/@",
  },
  {
    id: "tiktok",
    socialTitle: "Tiktok",
    icon: <SiTiktok />,
    profileHref: "https://www.tiktok.com/@",
  },
  {
    id: "reddit",
    socialTitle: "Reddit",
    icon: <SiReddit />,
    profileHref: "https://www.reddit.com/user/",
  },
];

export const cardIcons = [
  {
    id: "react",
    title: "React",
    icon: <SiReact />,
    iconMd: <SiReact size={30} />,
    iconBig: <SiReact size={50} />,
  },
  {
    id: "nextjs",
    title: "Nextjs",
    icon: <SiNextdotjs />,
    iconMd: <SiNextdotjs size={30} />,
    iconBig: <SiNextdotjs size={50} />,
  },
  {
    id: "tailwindcss",
    title: "Tailwind CSS",
    icon: <SiTailwindcss />,
    iconMd: <SiTailwindcss size={30} />,
    iconBig: <SiTailwindcss size={50} />,
  },
  {
    id: "html",
    title: "HTML",
    icon: <SiHtml5 />,
    iconMd: <SiHtml5 size={30} />,
    iconBig: <SiHtml5 size={50} />,
  },
  {
    id: "css",
    title: "CSS",
    icon: <SiCss3 />,
    iconMd: <SiCss3 size={30} />,
    iconBig: <SiCss3 size={50} />,
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: <SiJavascript />,
    iconMd: <SiJavascript size={30} />,
    iconBig: <SiJavascript size={50} />,
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: <SiTypescript />,
    iconMd: <SiTypescript size={30} />,
    iconBig: <SiTypescript size={50} />,
  },
  {
    id: "wordpress",
    title: "WordPress",
    icon: <SiWordpress />,
    iconMd: <SiWordpress size={30} />,
    iconBig: <SiWordpress size={50} />,
  },
];
