import { cn } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

interface VerdictBadgeProps {
  verdict: "Should trust" | "Be skeptical" | "Likely marketing";
  className?: string;
}

export function VerdictBadge({ verdict, className }: VerdictBadgeProps) {
  const config = {
    "Should trust": {
      icon: ShieldCheck,
      bg: "bg-success/10",
      text: "text-success",
      border: "border-success/20",
    },
    "Be skeptical": {
      icon: ShieldAlert,
      bg: "bg-warning/10",
      text: "text-warning",
      border: "border-warning/20",
    },
    "Likely marketing": {
      icon: ShieldX,
      bg: "bg-destructive/10",
      text: "text-destructive",
      border: "border-destructive/20",
    },
  };

  const { icon: Icon, bg, text, border } = config[verdict];

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium",
      bg, text, border, className
    )}>
      <Icon className="w-5 h-5" />
      <span>{verdict}</span>
    </div>
  );
}
