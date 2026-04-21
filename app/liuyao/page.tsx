import { ModuleShell } from "@/components/divination/module-shell";
import { LiuyaoPageContent } from "@/components/liuyao/liuyao-page-content";


export default function LiuyaoPage() {
  return (
    <ModuleShell
      title=""
      subtitle=""
      description=""
      showHeader={false}
      compact
    >
      <LiuyaoPageContent />
    </ModuleShell>
  );
}
