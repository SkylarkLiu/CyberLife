import { ModuleShell } from "@/components/divination/module-shell";
import { MeihuaPageContent } from "@/components/meihua/meihua-page-content";

export default function MeihuaPage() {
  return (
    <ModuleShell title="" subtitle="" description="" showHeader={false} compact>
      <MeihuaPageContent />
    </ModuleShell>
  );
}
