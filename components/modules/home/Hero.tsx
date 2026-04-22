"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, GraduationCap, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-10 blur-3xl overflow-hidden">
        <div className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary" />
        <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-400" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-sm font-medium">
              <span className="text-primary mr-2">New</span>
              Explore 500+ Professional Courses
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
              Unlock Your Potential with Our <span className="text-primary">Course Learning</span> Platform
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Join thousands of students and start your journey today. Learn from industry experts and get certified in the most in-demand skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-lg font-semibold w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/course">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold w-full sm:w-auto">
                  Browse Courses
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">10k+ Learners</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Certified</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Students studying together" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Courses</p>
                  <p className="font-bold text-sm">2,450+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
