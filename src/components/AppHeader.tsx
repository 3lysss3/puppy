import {
  Activity,
  HeartHandshake,
  Home,
  PawPrint,
  ScrollText,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ViewKey } from "../types";

interface AppHeaderProps {
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
}

const navItems: Array<{ key: ViewKey; label: string; icon: LucideIcon }> = [
  { key: "home", label: "总览", icon: Home },
  { key: "profile", label: "宠物档案", icon: UserRound },
  { key: "health", label: "健康记录", icon: Activity },
  { key: "timeline", label: "成长时间线", icon: ScrollText },
  { key: "community", label: "同城社区", icon: HeartHandshake },
];

export function AppHeader({ activeView, onNavigate }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <button className="brand" type="button" onClick={() => onNavigate("home")}>
          <span className="brand-mark" aria-hidden="true">
            <PawPrint size={22} strokeWidth={2.2} />
          </span>
          <span>
            <strong>爪印日记</strong>
            <small>和它一起，好好长大</small>
          </span>
        </button>

        <nav className="main-nav" aria-label="主要导航">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              className={activeView === key ? "nav-item active" : "nav-item"}
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
