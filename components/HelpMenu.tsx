import { type ReactNode } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import { THEMES } from "@/constants";

const HelpMenuItem = ({
  command,
  children,
}: {
  command: string;
  children: ReactNode;
}) => {
  return (
    <p>
      <strong>{command}</strong> - {children}
    </p>
  );
};

export const HelpMenu = () => {
  return (
    <>
      <HelpMenuItem command="ri <RELAY_DOMAIN>">
        Retrieves info about a nostr relay if the relay supports{" "}
        <ExternalLink href="https://github.com/nostr-protocol/nips/blob/master/11.md">
          nip-11
        </ExternalLink>
        .
      </HelpMenuItem>
      <HelpMenuItem command="whois <NIP05_ADDRESS>">
        Retrieves link to user&apos;s profile on Snort and their preferred
        relays.
      </HelpMenuItem>
      <HelpMenuItem command="fe <RELAY_URI> <EVENT_ID>">
        Checks to see if a relay has a given event.
      </HelpMenuItem>
      <HelpMenuItem command="convert <SIMPLE_BECH_32_VALUE>">
        Converts a simple bech32 value such as your pubkey in npub format to
        hex.
      </HelpMenuItem>
      <HelpMenuItem command="wtf">
        Type this if you are confused af.
      </HelpMenuItem>
      <HelpMenuItem command="donate <AMOUNT_IN_SATS> <OPTIONAL_COMMENT>">
        Generates a lightning invoice that you can pay to contribute to the
        development of this site.
      </HelpMenuItem>
      <HelpMenuItem command={`theme <${THEMES.join(" | ")}>`}>
        Changes the theme of the terminal.
      </HelpMenuItem>
      <HelpMenuItem command="clear">Clears the console.</HelpMenuItem>
    </>
  );
};
