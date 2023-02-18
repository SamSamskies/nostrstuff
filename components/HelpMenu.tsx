export const HelpMenu = () => {
  return (
    <>
      <p>
        <strong>ri &lt;RELAY_DOMAIN&gt;</strong> - Retrieves info about a nostr
        relay if the relay supports{" "}
        <a
          href="https://github.com/nostr-protocol/nips/blob/master/11.md"
          target="_blank"
          rel="noreferrer"
        >
          nip-11
        </a>
        .
      </p>
      <p>
        <strong>whois &lt;NIP05_ADDRESS&gt;</strong> - Retrieves link to
        user&apos;s profile on Snort and their preferred relays.
      </p>
      <p>
        <strong>wtf</strong> - Type this if you are confused af.
      </p>
      <p>
        <strong>clear</strong> - Clears the console.
      </p>
    </>
  );
};
