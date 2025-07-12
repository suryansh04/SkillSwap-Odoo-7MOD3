import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "./ui/button";
import { BackgroundLines } from "./background-lines";
import { FeaturesSection } from "./features";

const HomePage = () => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 py-16 md:py-24">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-3xl md:text-5xl lg:text-7xl font-sans py-4 md:py-10 relative z-20 font-bold tracking-tight">
        Welcome to SkillSwap
      </h2>
      <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground text-center mb-8">
        Connect with people in your community to exchange skills. Teach what you
        know, learn what you need. From coding to cooking, photography to
        finance - grow together.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
        <Link
          to="/signup"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 z-20"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 z-20"
        >
          Login
        </Link>
      </div>
    </BackgroundLines>

    {/* Features Section */}
    <FeaturesSection />

    {/* How It Works Section */}
    <section id="how-it-works" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How SkillSwap Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Get started in just a few simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Create Your Profile
            </h3>
            <p className="text-muted-foreground">
              List your skills, what you want to learn, and set your
              availability preferences.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Find & Connect
            </h3>
            <p className="text-muted-foreground">
              Browse profiles, search for specific skills, and send swap
              requests to potential partners.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Learn & Teach
            </h3>
            <p className="text-muted-foreground">
              Meet up, exchange skills, and rate your experience to help build a
              trusted community.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/90">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Start Swapping Skills?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Join our growing community of learners and teachers. Your next skill
          is just a swap away.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="text-lg px-8 py-6"
          asChild
        >
          <Link to="/signup">
            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-background border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                SkillSwap
              </span>
            </div>
            <p className="text-muted-foreground">
              Connecting communities through skill exchange and collaborative
              learning.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Features</li>
              <li>Pricing</li>
              <li>Security</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Community</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default HomePage;
