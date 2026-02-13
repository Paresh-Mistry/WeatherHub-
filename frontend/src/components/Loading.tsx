import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export const Loading = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading weather data...</p>
      </CardContent>
    </Card>
  );
};