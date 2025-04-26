"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useAnimation,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Hexagon,
  Star,
  CheckCircle,
  Info,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Animated Counter Component
function AnimatedNumber({
  to,
  duration = 2,
  decimals = 0,
}: {
  to: number;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    latest.toFixed(decimals)
  );

  useEffect(() => {
    const controls = animate(motionValue, to, { duration, ease: "easeInOut" });
    return controls.stop;
  }, [to, duration, motionValue]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);

  return <span ref={ref} />;
}

// Animated Section Helper
function AnimatedSection({
  children,
  className = "",
  variants = fadeIn,
  delay = 0,
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050B18] text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-900/20 blur-[120px]"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-cyan-900/20 blur-[120px]"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[100px]"
        ></motion.div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-[#050B18]/80 border-b border-gray-800/50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <Hexagon className="h-10 w-10 text-cyan-400 fill-cyan-900/30" />
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Wallet className="h-5 w-5 text-cyan-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
            </div>
            <motion.span
              initial={{ opacity: 0, backgroundPosition: "200% 0" }}
              animate={{ opacity: 1, backgroundPosition: "0% 0" }}
              transition={{ duration: 1.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent bg-size-200"
            >
              SMART FINANCE
            </motion.span>
          </motion.div>
          <motion.nav
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-8"
          >
            <motion.div variants={fadeIn}>
              <Link
                href="#features"
                className="text-gray-300 hover:text-white transition duration-200 font-medium"
              >
                Features
              </Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link
                href="#pricing"
                className="text-gray-300 hover:text-white transition duration-200 font-medium"
              >
                Pricing
              </Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link
                href="#about"
                className="text-gray-300 hover:text-white transition duration-200 font-medium"
              >
                About
              </Link>
            </motion.div>
          </motion.nav>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.6, staggerChildren: 0.1 }}
            className="flex items-center space-x-4"
          >
            <motion.div variants={fadeIn}>
              <ConnectButton />
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800/70 font-medium"
                >
                  Connect
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  Register
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        <AnimatedSection
          variants={fadeInUp}
          className="w-full flex flex-col items-center mt-24"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Welcome to Smart Finance
          </h1>
          <p className="mt-2 mb-8 text-lg text-center text-gray-300 max-w-2xl">
            Your one-stop solution for smart investments and wallet management.
          </p>
          {/* BUTTONS START */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
            {/* Create Wallet Button */}
            <Link href="/auth/register" className="w-full">
              <motion.button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium shadow-lg rounded-lg py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="button"
              >
                Create Wallet
              </motion.button>
            </Link>
            {/* Plan Investment Button */}
            <Link href="/plan-investment" className="w-full">
              <motion.button
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium shadow-[0_0_20px_4px_rgba(239,68,68,0.7)] border border-red-500 rounded-lg py-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 32px 8px rgba(239,68,68,0.9)",
                }}
                whileTap={{ scale: 0.98 }}
                type="button"
              >
                Plan Investment
              </motion.button>
            </Link>
          </div>
          {/* BUTTONS END */}
        </AnimatedSection>

        {/* FEATURES SECTION */}
        <AnimatedSection
          variants={staggerChildren}
          className="w-full max-w-5xl mx-auto mt-32 px-4"
          delay={0.2}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
            id="features"
          >
            Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 40px 0 rgba(34,211,238,0.15)",
              }}
              className="bg-[#10172A] rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <Star className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Unified Dashboard</h3>
              <p className="text-gray-400 mb-2">
                Track all your investments, wallets, and budgets in one place
                with real-time analytics and advanced charts.
              </p>
              <AnimatedNumber to={100000} duration={2} />+ Users
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 40px 0 rgba(168,85,247,0.15)",
              }}
              className="bg-[#10172A] rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <CheckCircle className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Smart Recommendations
              </h3>
              <p className="text-gray-400 mb-2">
                AI-driven insights to help you choose the best investment plans
                and savings options tailored to your goals.
              </p>
              <AnimatedNumber to={250} duration={2} />+ Investment Plans
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 40px 0 rgba(34,197,94,0.15)",
              }}
              className="bg-[#10172A] rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <TrendingUp className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Fast</h3>
              <p className="text-gray-400 mb-2">
                Bank-grade security, instant transactions, and privacy-first
                design for peace of mind.
              </p>
              <AnimatedNumber to={99.99} duration={2} decimals={2} />% Uptime
            </motion.div>
          </div>
        </AnimatedSection>

        {/* PRICING SECTION */}
        <AnimatedSection
          variants={fadeInUp}
          className="w-full max-w-4xl mx-auto mt-32 px-4"
          delay={0.3}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
            id="pricing"
          >
            Pricing
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px 0 rgba(34,211,238,0.12)",
              }}
              className="bg-[#10172A] rounded-2xl p-8 flex flex-col items-center text-center border border-cyan-800"
            >
              <DollarSign className="w-8 h-8 text-cyan-400 mb-2" />
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="text-3xl font-bold text-cyan-400 mb-2">Free</div>
              <ul className="text-gray-400 mb-4 space-y-1 text-left">
                <li>✔ Basic dashboard</li>
                <li>✔ Investment tracking</li>
                <li>✔ Community support</li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 8px 32px 0 rgba(168,85,247,0.15)",
              }}
              className="bg-gradient-to-br from-cyan-800 to-purple-800 rounded-2xl p-8 flex flex-col items-center text-center border-2 border-purple-400 scale-105"
            >
              <DollarSign className="w-8 h-8 text-white mb-2" />
              <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-3xl font-bold text-white mb-2">₹299/mo</div>
              <ul className="text-white mb-4 space-y-1 text-left">
                <li>✔ All Starter features</li>
                <li>✔ Smart recommendations</li>
                <li>✔ Priority support</li>
                <li>✔ Advanced analytics</li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px 0 rgba(34,197,94,0.12)",
              }}
              className="bg-[#10172A] rounded-2xl p-8 flex flex-col items-center text-center border border-green-800"
            >
              <DollarSign className="w-8 h-8 text-green-400 mb-2" />
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">
                Contact Us
              </div>
              <ul className="text-gray-400 mb-4 space-y-1 text-left">
                <li>✔ Custom integrations</li>
                <li>✔ Dedicated manager</li>
                <li>✔ SLA & compliance</li>
              </ul>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ABOUT SECTION */}
        <AnimatedSection
          variants={fadeInUp}
          className="w-full max-w-3xl mx-auto mt-32 px-4"
          delay={0.4}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
            id="about"
          >
            About
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="bg-[#10172A] rounded-2xl p-8 text-center text-lg text-gray-300"
          >
            <Info className="w-10 h-10 mx-auto mb-4 text-cyan-400" />
            <p>
              <b>Smart Finance</b> is built by passionate fintech experts to
              empower everyone to manage, grow, and secure their finances with
              confidence. Our mission is to simplify financial decisions,
              provide actionable insights, and make investing accessible for
              all.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <span className="bg-cyan-900/40 px-4 py-2 rounded-full text-cyan-300">
                Founded 2025
              </span>
              <span className="bg-purple-900/40 px-4 py-2 rounded-full text-purple-300">
                10+ Team Members
              </span>
              <span className="bg-green-900/40 px-4 py-2 rounded-full text-green-300">
                100K+ Users
              </span>
            </div>
          </motion.div>
        </AnimatedSection>
      </main>
      <footer className="w-full border-t border-gray-800/50 py-6 bg-[#050B18]/90 text-center text-gray-400 text-sm z-20 relative">
        &copy; {new Date().getFullYear()} Smart Finance. All rights reserved.
      </footer>
    </div>
  );
}
