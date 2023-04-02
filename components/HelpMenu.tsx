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
        Retrieves links to user&apos;s profile and their preferred relays.
      </HelpMenuItem>
      <HelpMenuItem command="fe <RELAY_URI> <EVENT_ID>">
        Returns event if found on a specified relay.
      </HelpMenuItem>
      <HelpMenuItem command="fu <USER_ID> <OPTIONAL_RELAYS>">
        Returns user profile if found on specified relays. If no relays are
        specified, a bunch of default relays including wss://relay.damus.io,
        wss://relay.snort.social will be used. OPTIONAL_RELAYS value must be
        separated by a comma without spaces e.g. fu
        npub1vp8fdcyejd4pqjyrjk9sgz68vuhq7pyvnzk8j0ehlljvwgp8n6eqsrnpsw
        wss://nostr.fmt.wiz.biz,wss://relay.snort.social
      </HelpMenuItem>
      <HelpMenuItem command="convert <SIMPLE_BECH32_VALUE>">
        Converts a simple bech32 value such as your pubkey in npub format to
        hex.
      </HelpMenuItem>
      <HelpMenuItem command="encode <npub | note> <HEX_VALUE>">
        Encodes a hex value in bech32 format with either a prefix of npub or
        note.
      </HelpMenuItem>
      <HelpMenuItem command="extract <NEVENT_BECH32_VALUE>">
        Extracts the note ID, relays (if available), and author npub (if
        available) from an nevent bech32 value.
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
