'use client';

import { useState } from 'react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';

import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import { countries } from '@/data/countries';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState(countries.find(c => c.code === '+254'));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        const form = e.target as HTMLFormElement;

        const data = {
            name: form.fullName.value,
            email: form.email.value,
            countryCode: country?.code,
            phone: form.phone.value,
            company: form.company.value,
            subject: form.subject.value,
            message: form.message.value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.success) {
                setSuccess('Message sent successfully!');
                form.reset();
            } else {
                setError('Failed to send message. Try again.');
            }
        } catch {
            setError('Something went wrong. Try later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background px-4 py-12 md:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">

                {/* ================= HEADER ================= */}
                <section className="mb-12 text-center">

                    <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                        Contact Us
                    </h1>

                    <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                        Get in touch with Elimisha Watoto Foundation.
                    </p>

                </section>

                {/* ================= CONTENT ================= */}
                <section className="grid gap-10 md:grid-cols-2">

                    {/* -------- LEFT SIDE -------- */}
                    <div className="space-y-6 rounded-2xl bg-card p-6 shadow-sm md:p-8">

                        <h2 className="text-xl font-semibold text-primary">
                            Get Involved
                        </h2>

                        <p className="text-muted-foreground leading-relaxed">
                            At Elimisha Watoto Foundation, every contribution makes a difference. There are many ways to support our mission and transform the lives of families and students in need.
                        </p>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Volunteer Your Time
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                            Join our dedicated team and lend your skills, passion, and energy. Whether it's mentoring, event support, or program facilitation, your involvement helps us reach more children and families.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Support a Project
                            </h3>

                            <p className="text-muted-foreground">
                            From educational programs to community initiatives, your support can transform lives. You can contribute to specific projects that align with your interests and values, helping us deliver essential services efficiently.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Adopt a Family or Student
                            </h3>

                            <p className="text-muted-foreground">
                                Make a direct, personal impact by sponsoring a family through Care and share or a student. Your support can provide education, or basic necessities, creating opportunities for growth, stability, and hope.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Other Ways to Contribute
                            </h3>

                            <p className="text-muted-foreground">
                                No matter how you choose to get involved, every effort count. Donations, advocacy, and sharing our work with your network all strengthen our community and extend our reach.
                            </p>

                            <p className="text-muted-foreground pt-4">
                                Together, we can create a brighter future one family, one student, and one project at a time.
                            </p>
                            
                        </div>

                        <p className="text-muted-foreground text-left">
                            Ready to Get Started?
                        </p>

                        <div className="rounded-xl bg-muted/40 p-4 text-left text-base">
                            Sign up to volunteer, support a project, Adopt a family or student.
                        </div>

                    </div>

                    {/* -------- CONTACT FORM -------- */}
                    <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">

                        <h2 className="mb-6 text-2xl font-semibold">
                            Send Us a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-7">

                            {/* Name + Email */}
                            <div className="grid gap-4 sm:grid-cols-2">

                                <Input
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="min-h-12"
                                    required
                                />

                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className="min-h-12"
                                    required
                                />

                            </div>

                            {/* PHONE WITH COUNTRY */}
                            <div className="flex gap-3">

                                {/* Country Code */}
                                <Popover open={open} onOpenChange={setOpen}>

                                    <PopoverTrigger asChild>

                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className="w-40 justify-between min-h-12"
                                        >
                                            {country
                                                ? `${country.name} (${country.code})`
                                                : 'Country Code'}

                                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                        </Button>

                                    </PopoverTrigger>

                                    <PopoverContent className="w-62.5 p-0">

                                        <Command>

                                            <CommandInput placeholder="Search country..." />

                                            <CommandEmpty>No country found.</CommandEmpty>

                                            <CommandGroup>

                                                {countries.map((c) => (

                                                    <CommandItem
                                                        key={`${c.name}-${c.code}`}
                                                        value={`${c.name}-${c.code}`}
                                                        onSelect={() => {
                                                            setCountry(c);
                                                            setOpen(false);
                                                        }}
                                                    >

                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                country?.code === c.code
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />

                                                        {c.name} ({c.code})

                                                    </CommandItem>

                                                ))}

                                            </CommandGroup>

                                        </Command>

                                    </PopoverContent>

                                </Popover>

                                {/* Phone Input */}
                                <Input
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone number"
                                    className="flex-1 min-h-12"
                                    required
                                />

                            </div>

                            {/* Company (Moved Below) */}
                            <Input
                                name="company"
                                placeholder="Company / Organization"
                                className="min-h-12"
                            />

                            {/* Subject */}
                            <Input
                                name="subject"
                                placeholder="Subject"
                                className="min-h-12"
                                required
                            />

                            {/* Message */}
                            <Textarea
                                name="message"
                                placeholder="Write your message..."
                                rows={8}
                                className="min-h-50"
                                required
                            />

                            {/* Submit */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </Button>

                            {/* Feedback */}
                            {success && (
                                <p className="text-green-600 text-center text-sm">
                                    {success}
                                </p>
                            )}

                            {error && (
                                <p className="text-red-600 text-center text-sm">
                                    {error}
                                </p>
                            )}

                        </form>

                    </div>

                </section>
            </div>
        </main>
    );
}
