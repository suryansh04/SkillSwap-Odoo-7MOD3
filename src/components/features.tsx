import { cn } from "@/lib/utils";
import { Users, Search, Calendar, ArrowRight, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContainer, CardItem, CardHeader, CardFooter } from "./ui/3d-card";

export function FeaturesSection() {
  const features = [
    {
      title: "Create Your Profile",
      description: "Build a comprehensive profile with your skills, location, and availability. Choose to keep it public or private.",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "Browse & Search",
      description: "Find people with the skills you need. Search by skill type, location, or availability to find the perfect match.",
      icon: <Search className="w-6 h-6" />,
      color: "text-green-500"
    },
    {
      title: "Flexible Scheduling",
      description: "Set your availability for weekends, evenings, or any time that works for you. Coordinate easily with swap partners.",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-purple-500"
    },
    {
      title: "Request & Accept Swaps",
      description: "Send swap requests and manage incoming offers. Accept or reject requests and track all your pending exchanges.",
      icon: <ArrowRight className="w-6 h-6" />,
      color: "text-orange-500"
    },
    {
      title: "Ratings & Feedback",
      description: "Rate your experience after each swap. Build trust in the community through honest feedback and reviews.",
      icon: <Star className="w-6 h-6" />,
      color: "text-yellow-500"
    },
    {
      title: "Safe & Secure",
      description: "Control your privacy settings, delete unwanted requests, and connect safely with verified community members.",
      icon: <Shield className="w-6 h-6" />,
      color: "text-red-500"
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Swap Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to connect, exchange, and grow your skillset with others in your community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <CardContainer key={index} className="w-full h-full">
              <Card className="h-full group">
                <CardHeader className="flex flex-col h-full">
                  <div className="flex flex-col h-full">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", feature.color, "bg-opacity-10")}>
                      <CardItem translateZ="50">
                        {feature.icon}
                      </CardItem>
                    </div>
                    <CardItem as="h3" translateZ="60" className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-muted-foreground text-sm mb-4 flex-grow"
                    >
                      {feature.description}
                    </CardItem>
                  </div>
                </CardHeader>
                <CardFooter>
                  <CardItem
                    as="div"
                    translateZ="40"
                    className="w-full"
                  >
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent my-2" />
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-muted-foreground">Learn more</span>
                      <span className="text-xs text-foreground/50 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </CardItem>
                </CardFooter>
              </Card>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
