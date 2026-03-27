import type { Post } from '@/types';

export let posts: Post[] = [
  {
    id: '1',
    slug: 'the-rise-of-generative-ai',
    title: 'The Unfolding Era of Generative AI',
    content: `We stand at the precipice of a new technological revolution. Generative Artificial Intelligence, a field once confined to research labs, is now accessible to the masses. Models like GPT, DALL-E, and Midjourney are not just tools; they are creative partners, analytical engines, and gateways to previously unimaginable possibilities.

This post explores the fundamental concepts behind generative AI, from transformers to diffusion models. We'll delve into the ethical considerations that accompany such powerful technology and speculate on its future impact across various industries, including art, software development, and scientific research. The journey has just begun, and the landscape is evolving at a breathtaking pace.`,
    tags: ['ai', 'technology', 'future'],
    createdAt: '2024-05-15T10:00:00Z',
    imageUrl: 'https://placehold.co/1200x630.png',
  },
  {
    id: '2',
    slug: 'a-deep-dive-into-quantum-computing',
    title: 'A Deep Dive into Quantum Computing',
    content: `Quantum computing harnesses the strange and wonderful principles of quantum mechanics to process information in ways that classical computers cannot. Instead of bits, which are either 0 or 1, quantum computers use qubits, which can exist in a superposition of both states simultaneously. This fundamental difference unlocks immense computational power for specific types of problems.

In this article, we'll demystify concepts like superposition, entanglement, and quantum interference. We'll examine the current state of quantum hardware and the challenges researchers face in building stable, fault-tolerant quantum machines. Finally, we'll look at the potential applications that could reshape medicine, materials science, and cryptography.`,
    tags: ['quantum computing', 'science', 'physics'],
    createdAt: '2024-05-20T14:30:00Z',
    imageUrl: 'https://placehold.co/1200x630.png',
  },
  {
    id: '3',
    slug: 'the-philosophy-of-consciousness',
    title: 'The Philosophy of Consciousness',
    content: `What is consciousness? This question, known as the "hard problem," has puzzled philosophers and scientists for centuries. Is it merely an emergent property of complex neural networks, or is there something more? From Descartes' "I think, therefore I am" to modern theories like Integrated Information Theory (IIT), humanity has long sought to understand the nature of subjective experience.

This essay navigates the rich history of this philosophical debate. We will explore dualism, materialism, and panpsychism, examining the arguments for and against each viewpoint. As neuroscience advances, we get closer to understanding the brain's mechanics, but the bridge between the physical and the phenomenal remains elusive. Join us on a journey into the heart of what it means to be.`,
    tags: ['philosophy', 'consciousness', 'mind'],
    createdAt: '2024-05-25T09:00:00Z',
    imageUrl: 'https://placehold.co/1200x630.png',
  },
];
