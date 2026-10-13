import { profile } from "@/content";
import { CurrentYear } from "./CurrentYear";

export function SiteFooter() {
  return (
    <footer className="border-t border-divider">
      <div className="container-page py-8 pb-28 text-sm text-text-muted min-[1440px]:pb-8 print:pb-8">
        <p>
          © <CurrentYear /> {profile.fullName}
        </p>
      </div>
    </footer>
  );
}
