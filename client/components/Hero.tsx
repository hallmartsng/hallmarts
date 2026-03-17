"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";

import GlobeNetworkPro from "@/components/GlobeNetworkPro";

const Hero = () => {
  return (
    <section className="flex pt-16 sm:flex-row flex-col items-center justify-center gap-4 ">
      <div className="mx-auto max-w-7xl sm:px-0 px-4 flex sm:flex-row flex-col items-center">
        <div className="space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            Now powering campus vendors
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Campus stores, <span className="text-primary">connected.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-600 text-lg max-w-lg"
          >
            Hallmarts powers buying and selling across universities — connecting
            vendors, students, and transactions in one seamless network.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button className="px-3 py-2 bg-primary hover:bg-primary/90 text-white transition rounded-lg font-medium">
              Start selling
            </Button>

            <button className="px-6 py-3 border border-white/15 hover:bg-white/5 transition rounded-lg font-medium">
              Explore marketplace
            </button>
          </motion.div>
        </div>
        <div className="w-full flex flex-col items-center justify-center -mt-10">
          <GlobeNetworkPro />
          {/* Trust / Stats */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex sm:flex-row flex-col gap-8 pt-6 text-sm text-gray-400"
          >
            <div>
              <p className="font-semibold text-primary">5+ Campuses</p>
              <p className="text-gray-600">Active network</p>
            </div>
            <div>
              <p className="font-semibold text-primary">₦6 Millions+</p>
              <p className="text-gray-600">Transactions</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Fast</p>
              <p className="text-gray-600">Real-time system</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
