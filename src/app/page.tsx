"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-20">
        <div className="wrapper flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/assets/icons/logo.svg"
              alt="CapCord"
              width={32}
              height={32}
            />
            <span className="text-xl font-black text-blue-100 font-satoshi -tracking-[0.1px]">
              CapCord
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-100 hover:text-dark-100 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-100 hover:text-dark-100 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-100 hover:text-dark-100 transition-colors"
            >
              Testimonials
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden sm:block text-sm font-semibold text-dark-100 hover:text-pink-100 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/sign-in"
              className="py-2.5 px-5 bg-dark-100 text-white text-sm font-semibold rounded-4xl hover:bg-blue-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="overlay" />
        <div className="wrapper flex flex-col items-center text-center gap-8">
          {/* Announcement Badge */}
          <div className="animate-fade-in flex items-center gap-2 py-2 px-4 bg-pink-10 rounded-4xl border border-pink-100/20">
            <span className="text-sm font-medium text-dark-100">New:</span>
            <span className="text-sm text-gray-100">
              Group collaboration is here
            </span>
            <Link
              href="/group"
              className="text-sm font-semibold text-pink-100 hover:underline"
            >
              Learn more
            </Link>
          </div>

          {/* Main Headline */}
          <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-100 max-w-4xl leading-tight">
            Record, share, and{" "}
            <span className="text-pink-100">collaborate</span> in seconds
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up animation-delay-100 text-lg sm:text-xl text-gray-100 max-w-2xl leading-relaxed">
            CapCord makes screen recording effortless. From quick walkthroughs
            to full presentations, create and share videos that get your point
            across.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animation-delay-200 flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link
              href="/sign-in"
              className="w-full sm:w-auto py-4 px-8 bg-pink-100 text-white text-base font-semibold rounded-4xl hover:bg-pink-100/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Start Recording Free
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto py-4 px-8 border border-gray-25 text-dark-100 text-base font-semibold rounded-4xl hover:border-dark-100 transition-colors"
            >
              Explore Library
            </Link>
          </div>

          {/* Hero Image/Video Preview */}
          <div className="animate-fade-in-up animation-delay-300 w-full max-w-5xl mt-12 relative">
            <div className="relative rounded-20 overflow-hidden shadow-20 border border-gray-20">
              <div className="aspect-video bg-light-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-20 rounded-full bg-pink-100 flex items-center justify-center animate-pulse-slow">
                    <Image
                      src="/assets/icons/record.svg"
                      alt="Record"
                      width={32}
                      height={32}
                      className="brightness-0 invert"
                    />
                  </div>
                  <p className="text-gray-100 text-sm font-medium">
                    Your screen recording preview appears here
                  </p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-4 left-4 py-2 px-3 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-10 animate-float">
                <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-dark-100">
                  Recording
                </span>
              </div>
              <div className="absolute bottom-4 right-4 py-2 px-4 bg-dark-100/90 backdrop-blur-sm rounded-full text-xs font-medium text-white animate-float animation-delay-500">
                00:45
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-20 bg-light-100">
        <div className="wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="10K+" label="Active Users" />
            <StatCard value="50K+" label="Videos Created" />
            <StatCard value="98%" label="User Satisfaction" />
            <StatCard value="2s" label="Average Share Time" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="wrapper">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Everything you need to create and share
            </h2>
            <p className="text-gray-100 text-lg max-w-2xl mx-auto">
              Powerful features that make screen recording simple and
              collaboration seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="/assets/icons/record.svg"
              title="One-Click Recording"
              description="Start recording instantly with a single click. No complicated setup or configuration needed."
            />
            <FeatureCard
              icon="/assets/icons/link.svg"
              title="Instant Sharing"
              description="Get a shareable link the moment you stop recording. Share with anyone, anywhere."
            />
            <FeatureCard
              icon="/assets/icons/video.svg"
              title="Video Library"
              description="All your recordings organized in one place. Search, filter, and manage with ease."
            />
            <FeatureCard
              icon="/assets/icons/message.svg"
              title="Team Groups"
              description="Create groups to share videos with your team. Perfect for async collaboration."
            />
            <FeatureCard
              icon="/assets/icons/eye.svg"
              title="View Analytics"
              description="Track who watched your videos and for how long. Understand engagement at a glance."
            />
            <FeatureCard
              icon="/assets/icons/download.svg"
              title="Easy Download"
              description="Download your recordings in high quality. Keep a local copy whenever you need."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-light-100">
        <div className="wrapper">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Get started in three simple steps
            </h2>
            <p className="text-gray-100 text-lg max-w-2xl mx-auto">
              From recording to sharing, CapCord makes the entire process
              effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Record"
              description="Click the record button and capture your screen, camera, or both. It&apos;s that simple."
            />
            <StepCard
              number="02"
              title="Edit (Optional)"
              description="Trim, add captions, or enhance your video with our built-in editing tools."
            />
            <StepCard
              number="03"
              title="Share"
              description="Get an instant link and share with anyone. They can watch without signing up."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="wrapper">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-gray-100 text-lg max-w-2xl mx-auto">
              See what our users have to say about their experience with
              CapCord.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="CapCord has completely changed how our team communicates. No more lengthy emails - just quick video explanations."
              author="Sarah Chen"
              role="Product Manager"
              image="/assets/images/sarah.png"
            />
            <TestimonialCard
              quote="The group feature is a game-changer for our remote team. We share feedback videos daily now."
              author="Michael Torres"
              role="Engineering Lead"
              image="/assets/images/michael.png"
            />
            <TestimonialCard
              quote="I use CapCord for all my client presentations. The instant sharing makes it so professional."
              author="Emily Davis"
              role="Freelance Designer"
              image="/assets/images/emily.png"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
        </div>
        <div className="wrapper relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to start recording?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Join thousands of teams already using CapCord to communicate
              better. Get started for free today.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 py-4 px-8 bg-pink-100 text-white text-base font-semibold rounded-4xl hover:bg-pink-100/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started Free
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Arrow"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-20">
        <div className="wrapper">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/assets/icons/logo.svg"
                alt="CapCord"
                width={28}
                height={28}
              />
              <span className="text-lg font-black text-blue-100 font-satoshi">
                CapCord
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm text-gray-100 hover:text-dark-100 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/group"
                className="text-sm text-gray-100 hover:text-dark-100 transition-colors"
              >
                Groups
              </Link>
              <Link
                href="/sign-in"
                className="text-sm text-gray-100 hover:text-dark-100 transition-colors"
              >
                Sign In
              </Link>
            </div>

            <p className="text-sm text-gray-100">
              &copy; CapCord {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl sm:text-4xl font-bold text-dark-100 mb-1">
        {value}
      </p>
      <p className="text-sm text-gray-100">{label}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 rounded-20 border border-gray-20 bg-white hover:border-pink-100/30 hover:shadow-10 transition-all duration-300">
      <div className="size-12 rounded-18 bg-pink-10 flex items-center justify-center mb-4 group-hover:bg-pink-100 transition-colors">
        <Image
          src={icon}
          alt={title}
          width={24}
          height={24}
          className="group-hover:brightness-0 group-hover:invert transition-all"
        />
      </div>
      <h3 className="text-lg font-bold text-dark-100 mb-2">{title}</h3>
      <p className="text-sm text-gray-100 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative p-8 rounded-20 bg-white border border-gray-20 shadow-10">
      <span className="text-6xl font-bold text-pink-10 absolute top-4 right-6">
        {number}
      </span>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-dark-100 mb-3">{title}</h3>
        <p className="text-gray-100 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  image,
}: {
  quote: string;
  author: string;
  role: string;
  image: string;
}) {
  return (
    <div className="p-6 rounded-20 border border-gray-20 bg-white hover:shadow-10 transition-shadow">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Image
            key={i}
            src="/assets/icons/star.svg"
            alt="star"
            width={16}
            height={16}
          />
        ))}
      </div>
      <p className="text-dark-100 mb-6 leading-relaxed">{quote}</p>
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={author}
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-dark-100">{author}</p>
          <p className="text-sm text-gray-100">{role}</p>
        </div>
      </div>
    </div>
  );
}
