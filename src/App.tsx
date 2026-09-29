import { useEffect, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { CommunityPanel } from "./components/CommunityPanel";
import { HealthPanel } from "./components/HealthPanel";
import { Overview } from "./components/Overview";
import { PetProfilePanel } from "./components/PetProfilePanel";
import { TimelinePanel } from "./components/TimelinePanel";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { CommunityPost, DailyMoment, HealthRecord, PetProfile, ViewKey } from "./types";

function App() {
  const [activeView, setActiveView] = useState<ViewKey>("home");
  const [pet, setPet] = useLocalStorage<PetProfile | null>("pawprint.pet", null);
  const [records, setRecords] = useLocalStorage<HealthRecord[]>("pawprint.health", []);
  const [moments, setMoments] = useLocalStorage<DailyMoment[]>("pawprint.moments", []);
  const [personalPosts, setPersonalPosts] = useLocalStorage<CommunityPost[]>("pawprint.posts", []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  return (
    <div className="app-shell">
      <AppHeader activeView={activeView} onNavigate={setActiveView} />
      <main className="page-shell">
        {activeView === "home" ? (
          <Overview pet={pet} records={records} momentCount={moments.length} onNavigate={setActiveView} />
        ) : null}
        {activeView === "profile" ? <PetProfilePanel pet={pet} onSave={setPet} /> : null}
        {activeView === "health" ? (
          <HealthPanel
            records={records}
            onAdd={(record) => setRecords((current) => [record, ...current])}
            onDelete={(id) => setRecords((current) => current.filter((record) => record.id !== id))}
          />
        ) : null}
        {activeView === "timeline" ? (
          <TimelinePanel
            records={records}
            moments={moments}
            onAddMoment={(moment) => setMoments((current) => [moment, ...current])}
            onDeleteMoment={(id) => setMoments((current) => current.filter((moment) => moment.id !== id))}
          />
        ) : null}
        {activeView === "community" ? (
          <CommunityPanel
            pet={pet}
            personalPosts={personalPosts}
            onAddPost={(post) => setPersonalPosts((current) => [post, ...current])}
            onDeletePost={(id) => setPersonalPosts((current) => current.filter((post) => post.id !== id))}
          />
        ) : null}
      </main>
      <footer className="app-footer">
        <span>爪印日记 · 可操作原型</span>
        <span>数据仅保存在当前浏览器</span>
      </footer>
    </div>
  );
}

export default App;
