import { Eye } from "lucide-react";

export function Header() {
  return (
    <header className="text-center space-y-4">
      <div className="inline-flex items-center justify-center gap-3">
        <div className="p-3 bg-primary rounded-xl">
          <Eye className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Clarity AI</h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        Analyze articles for hidden marketing intent and discover the truth behind the content.
      </p>
    </header>
  );
}
