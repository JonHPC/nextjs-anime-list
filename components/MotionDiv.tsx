"use client";

import { motion } from 'framer-motion';

export const MotionDiv = motion.div;

// We make this component because AnimeCard is a SSR component
// This makes ONLY motion.div a client side component