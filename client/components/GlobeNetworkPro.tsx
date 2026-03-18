"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Node = {
  id: string;
  name: string;
  logo: string;
  lat: number;
  lon: number;
  weight: number;
};

const nodes: Node[] = [
  {
    id: "uniabuja",
    logo: "nile.png",
    name: "UNIABUJA",
    lat: 12,
    lon: 6,
    weight: 6,
  },
  {
    id: "unilag",
    logo: "unilag.jpg",
    name: "UNILAG",
    lat: 5,
    lon: -2.3792,
    weight: 9,
  },
  {
    id: "uniport",
    logo: "uniport.png",
    name: "UNIPORT",
    lat: 1.3775,
    lon: 5.947,
    weight: 5,
  },
  {
    id: "lmu",
    logo: "lmu.jpg",
    name: "LMU",
    lat: 10.5855,
    lon: 0.0199,
    weight: 4,
  },
  {
    id: "enugu",
    logo: "unical.jpg",
    name: "ENUGU",
    lat: 6.864,
    lon: 7.4085,
    weight: 5,
  },
  {
    id: "adamawa",
    logo: "adamawa.png",
    name: "ADAMAWA",
    lat: 7.5227,
    lon: 13.522,
    weight: 4,
  },
  {
    id: "cu",
    logo: "cu.jpg",
    name: "cu",
    lat: 4.5227,
    lon: 16.4,
    weight: 4,
  },
];

const connections = [
  ["uniabuja", "unilag"],
  ["unilag", "lmu"],
  ["enugu", "lmu"],
  ["enugu", "adamawa"],
  ["uniport", "lmu"],
  ["uniport", "cu"],
  ["cu", "adamawa"],
];

// 🌍 Projection
const project = (lat: number, lon: number) => {
  const x = (lon - 2) * 20;
  const y = (12 - lat) * 20;
  return { x: 80 + x, y: 80 + y * 0.8 };
};

const getNode = (id: string) => {
  const n = nodes.find((n) => n.id === id)!;
  return { ...n, ...project(n.lat, n.lon) };
};

// 💰 Random realistic amount
const randomAmount = () => {
  const base = Math.random() * 15000;
  return `₦${Math.floor(base + 500).toLocaleString()}`;
};

export default function GlobeNetworkPro() {
  const [transactions, setTransactions] = useState<any[]>([]);

  // ⚡ Weighted connections (activity intelligence)
  const weightedConnections = connections.flatMap(([from, to]) => {
    const fromNode = nodes.find((n) => n.id === from)!;
    const toNode = nodes.find((n) => n.id === to)!;
    const weight = fromNode.weight + toNode.weight;

    return Array(weight).fill([from, to]);
  });

  useEffect(() => {
    const generateTx = () => {
      const conn =
        weightedConnections[
          Math.floor(Math.random() * weightedConnections.length)
        ];

      const fromNode = getNode(conn[0]);
      const toNode = getNode(conn[1]);

      const id = Math.random().toString();

      setTransactions((prev) => [
        ...prev,
        {
          id,
          from: fromNode,
          to: toNode,
          amount: randomAmount(),
        },
      ]);

      setTimeout(() => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    const interval = setInterval(generateTx, 700 + Math.random() * 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[450px] flex justify-center overflow-hidden">
      {/* <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-400 text-lg max-w-lg"
      >
        Hallmarts powers buying and selling across universities — connecting
        vendors, students, and transactions in one seamless network.
      </motion.p> */}
      {/* 🌟 Glow */}
      {/* <div className="absolute bottom-[28%] w-[70%] h-[180px] bg-cyan-50/10 blur-3xl rounded-full" /> */}

      <svg viewBox="0 0 300 300" className="w-full h-full relative z-10">
        {/* Gradient for trails */}
        <defs>
          <linearGradient id="flow">
            <stop offset="0%" stopColor="#afeaaf" stopOpacity="0" />{" "}
            <stop offset="50%" stopColor="#afeaaf" stopOpacity="1" />{" "}
            <stop offset="100%" stopColor="#afeaaf" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base Connections */}
        {connections.map(([from, to], i) => {
          const a = getNode(from);
          const b = getNode(to);

          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2 - 30;

          return (
            <path
              key={i}
              d={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
              stroke="#edf8e3"
              strokeWidth="1"
              fill="none"
            />
          );
        })}

        {/* 🔥 Glow Trails */}
        {transactions.map((tx) => {
          const midX = (tx.from.x + tx.to.x) / 2;
          const midY = (tx.from.y + tx.to.y) / 2 - 30;

          const path = `M ${tx.from.x} ${tx.from.y} Q ${midX} ${midY} ${tx.to.x} ${tx.to.y}`;

          return (
            <motion.path
              key={`trail-${tx.id}`}
              d={path}
              stroke="url(#flow)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 6"
              animate={{ strokeDashoffset: [20, 0] }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          );
        })}

        {/* ⚡ Moving particles */}
        {transactions.map((tx) => {
          const midX = (tx.from.x + tx.to.x) / 2;
          const midY = (tx.from.y + tx.to.y) / 2 - 30;

          const path = `M ${tx.from.x} ${tx.from.y} Q ${midX} ${midY} ${tx.to.x} ${tx.to.y}`;

          return (
            <motion.circle
              key={tx.id}
              r={2.5}
              // fill="#05df72"
              fill="#24ae24"
              // initial={{ offsetDistance: "0%" }}
              // animate={{ offsetDistance: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
              style={{ offsetPath: `path("${path}")` }}
            />
          );
        })}

        {/* 🏫 Nodes (LOGOS) */}
        {nodes.map((node) => {
          const p = project(node.lat, node.lon);

          return (
            <g key={node.id}>
              {/* Glow */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={18}
                fill="rgb(236, 255, 220)"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Logo */}
              <foreignObject x={p.x - 10} y={p.y - 10} width={20} height={20}>
                <Image
                  src={`/campus_logo/${node.logo}`}
                  width={30}
                  height={30}
                  alt={`${node.name} campus logo`}
                  className="w-6 h-6 rounded-full object-cover border border-white/20"
                />
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* 💰 Floating Labels */}
      {transactions.map((tx) => (
        <motion.div
          key={`label-${tx.id}`}
          className="absolute text-[15px] text-green-400 "
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: -15 }}
          transition={{ duration: 2 }}
          style={{
            right: `300px`,
            top: `${(tx.from.y + tx.to.y) / 2}px`,
          }}
        >
          {tx.amount}
        </motion.div>
      ))}

      {/* 💰 Floating Labels */}
      {transactions.map((tx) => (
        <motion.div
          key={`label-${tx.id}`}
          className="absolute text-[15px] text-green-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: -15 }}
          transition={{ duration: 1 }}
          style={{
            left: `100px`,
            bottom: `100px`,
          }}
        >
          {tx.amount}
        </motion.div>
      ))}
      {/* 💰 Floating Labels */}
      {transactions.map((tx) => (
        <motion.div
          key={`label-${tx.id}`}
          className="absolute text-[15px] text-green-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: -15 }}
          transition={{ duration: 1 }}
          style={{
            right: `100px`,
            top: `${tx.from.y + tx.to.y / 2}px`,
          }}
        >
          {tx.amount}
        </motion.div>
      ))}
      {/* 💰 Floating Labels */}
      {transactions.map((tx) => (
        <motion.div
          key={`label-${tx.id}`}
          className="absolute text-[15px] text-green-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: -15 }}
          transition={{ duration: 2 }}
          style={{
            right: `300px`,
            bottom: `100px`,
          }}
        >
          {tx.amount}
        </motion.div>
      ))}
    </div>
  );
}
