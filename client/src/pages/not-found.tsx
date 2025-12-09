import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[12rem] md:text-[16rem] font-bold leading-none text-foreground/5 select-none">
              404
            </div>
            <h1 className="text-4xl md:text-5xl font-serif -mt-16 mb-6">
              Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="rounded-full px-8 gap-2" data-testid="button-404-home">
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 gap-2"
                onClick={() => window.history.back()}
                data-testid="button-404-back"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
