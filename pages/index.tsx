import { Terminal } from "@/components";
import { useIsHydrated } from "@/hooks";

export default function Home() {
  const hasHydrated = useIsHydrated();

  return (
    <main style={{ height: "calc(100vh - 16px)", width: "100%" }}>
      {hasHydrated && <Terminal />}
    </main>
  );
}
