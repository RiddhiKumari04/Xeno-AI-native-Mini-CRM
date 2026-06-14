import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Orders() {
  return (
    <PageWrapper>
      <Header 
        title="Orders" 
        description="View and manage customer orders."
      />

      <div className="mt-8">
        <Card className="border-none shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="size-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground max-w-md">
              When customers place orders, they will appear here. You can connect your e-commerce platform to sync orders automatically.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
