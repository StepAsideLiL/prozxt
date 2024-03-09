import {
  Besley,
  Inter,
  Monofett,
  Rubik_Mono_One,
  VT323,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const monofett = Monofett({ subsets: ["latin"], weight: "400" });

export const vt323 = VT323({ subsets: ["latin"], weight: "400" });

export const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
});

export const besley = Besley({
  subsets: ["latin"],
});
