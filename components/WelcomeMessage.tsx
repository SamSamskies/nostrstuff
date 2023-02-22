import { ReactNode } from "react";

const ExampleCommand = ({ children }: { children: ReactNode }) => {
  return (
    <p style={{ margin: "4px 0" }}>
      <code
        style={{
          background: "#50a",
          color: "#f5f",
          padding: "0 8px",
        }}
      >
        {children}
      </code>
    </p>
  );
};

export const WelcomeMessage = () => (
  <div style={{ marginBottom: 16 }}>
    <p>Welcome to Nostr Stuff 🤙</p>
    <p>Type &quot;help&quot; for all available commands.</p>
    <div>
      Example commands:
      <ExampleCommand>ri eden.nostr.land</ExampleCommand>
      <ExampleCommand>whois samsamskies@nostrstuff.com</ExampleCommand>
    </div>
  </div>
);
