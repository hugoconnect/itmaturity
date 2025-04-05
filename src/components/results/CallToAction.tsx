
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CallToAction = () => {
  return (
    <Card className="bg-primary text-primary-foreground mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Ready to Take the Next Step?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          Book a FREE, no-obligation 30-minute Strategy Session to discuss your results and create a clear path forward for your business's IT needs.
        </p>
        <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
          <a href="#" className="w-full">Book Your Free Strategy Session</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CallToAction;
