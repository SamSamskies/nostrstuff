import { ExternalLink } from "@/components/ExternalLink";
import Image from "next/image";

export const GitHubRepoLink = ({ color }: { color: "white" | "black" }) => {
  const src = {
    white: "/github-mark-white.png",
    black: "/github-mark.png",
  }[color];

  return (
    <ExternalLink
      href="https://github.com/SamSamskies/nostrstuff"
      style={{ position: "fixed", right: 16, top: 12, zIndex: 1 }}
    >
      <Image src={src} width={16} height={16} alt="GitHub logo" />
    </ExternalLink>
  );
};
