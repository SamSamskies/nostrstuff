import { type AnchorHTMLAttributes } from "react";

export const ExternalLink = ({
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a target="_blank" rel="noreferrer" {...rest}>
    {children}
  </a>
);
