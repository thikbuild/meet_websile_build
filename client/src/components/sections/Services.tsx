import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';

const services = [
	{
		number: '01',
		title: 'Web Design & Development',
		href: '/website',
	},
	{
		number: '02',
		title: 'Digital Marketing',
		href: '/digital-marketing',
	},
	{
		number: '03',
		title: 'Branding & Identity',
		href: '/branding',
	},
	{
		number: '04',
		title: 'E-commerce Solutions',
		href: '/e-commerce',
	},
	{
		number: '05',
		title: 'Social Media Marketing',
		href: '/social-media',
	},
	{
		number: '06',
		title: 'SEO & SEM',
		href: '/seo-sem',
	},
	{
		number: '07',
		title: 'Landing Page',
		href: '/landing-page',
	},
	{
		number: '08',
		title: 'Webflow Development',
		href: '/webflow-development',
	},
];

interface Service {
	number: string;
	title: string;
	href: string;
}

const ServiceItem = ({ item, index }: { item: Service; index: number }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.a
			href={item.href}
			className="relative flex items-center justify-between py-8 px-4 border-b border-gray-200 group cursor-pointer overflow-hidden transition-colors duration-300"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Hover Background - Animate layout ID for smooth sliding if connected, 
          or simple opacity fade for standalone items. Using simple absolute fill here. */}
			<motion.div
				className="absolute inset-0 bg-gray-100/80 z-0 hover:bg-[#F9FAFB] hover:rounded-lg transition-colors duration-300"
				initial={{ opacity: 0 }}
				animate={{ opacity: isHovered ? 1 : 0 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Content Container */}
			<div className="relative z-10 flex items-center w-full">
				<span className="text-sm md:text-base font-medium text-gray-500 w-12 md:w-24 shrink-0 font-mono">
					{item.number}
				</span>

				<h3 className="text-xl md:text-3xl font-medium text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
					{item.title}
				</h3>
			</div>

			{/* Arrow Icon */}
			<div className="relative z-10 text-gray-900 overflow-hidden">
				{/* We stack two icons: one that moves out, one that moves in */}
				<div className="relative w-6 h-6 md:w-8 md:h-8">
					<motion.div
						className="absolute inset-0 flex items-center justify-center"
						animate={{
							x: isHovered ? 24 : 0,
							opacity: isHovered ? 0 : 1,
						}}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<ArrowRight className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5]" />
					</motion.div>

					<motion.div
						className="absolute inset-0 flex items-center justify-center"
						initial={{ x: -24, opacity: 0 }}
						animate={{
							x: isHovered ? 0 : -24,
							opacity: isHovered ? 1 : 0,
						}}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<ArrowRight className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5]" />
					</motion.div>
				</div>
			</div>
		</motion.a>
	);
};

export default function ServicesSection() {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true, margin: '-100px' });

	return (
		<section className="min-h-screen bg-gray-50 lg:py-48 lg:px-12 py-20 px-4 md:px-8 font-sans">
			<div className="max-w-6xl mx-auto bg-[#E5E9EB]/40 rounded-3xl p-8 md:p-16 shadow-sm min-h-[800px] flex flex-col justify-between">
				{/* Header Section */}
				<div
					ref={containerRef}
					className="flex flex-col md:flex-row justify-between mb-16 md:mb-24 gap-8"
				>
					{/* Left Label */}
					<motion.div
						className="flex items-center gap-2"
						initial={{ opacity: 0, x: -20 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6 }}
					>
						<div className="w-1.5 h-1.5 bg-black rounded-full" />
						<span className="text-sm font-medium text-gray-900 uppercase tracking-wide">
							Our services
						</span>
					</motion.div>

					{/* Right Heading */}
					<motion.h2
						className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] max-w-2xl"
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						We create solutions but most importantly we identify problems.
					</motion.h2>
				</div>

				{/* Services List */}
				<div className="flex flex-col mb-16 ">
					{services.map((service, index) => (
						<ServiceItem key={index} item={service} index={index} />
					))}
				</div>

				{/* Bottom CTA */}
				<div className="flex justify-center mt-auto">
					<motion.button
						className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.6 }}
					>
						<Link href="/services">
							<span className="relative z-10 font-medium text-sm md:text-base">
								All Services
							</span>
						</Link>
						<div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
					</motion.button>
				</div>
			</div>
		</section>
	);
}