import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CallToAction = () => {
  return (
    <Card className="bg-primary text-primary-foreground mb-8">
      <CardHeader>
        <CardTitle className="text-xl">ready to take the next step?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          book a free, no-obligation 30-minute strategy session to discuss your results and create a clear path forward for your business's IT needs.
        </p>
        <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
          <a href="#" className="w-full">book your free strategy session</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CallToAction;
