import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Item } from "@/lib/items";

export function ExchangeTag({ item }: { item: Item }) {
  if (!item.directExchange) return null;
  return <Badge className="gap-1 bg-eco text-eco-foreground hover:bg-eco"><Zap className="h-3 w-3" />Tukar Langsung</Badge>;
}