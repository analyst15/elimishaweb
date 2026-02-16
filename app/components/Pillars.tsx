import { CheckCircle, User, Users, HandHelping } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const studentServices = [
    { text: "Full financial support for secondary education" },
    { text: "Academic mentorship and guidance" },
    { text: "Social skills development" },
    { text: "Creation of personalized digital student profiles" },
    { text: "Continuous documentation of each student’s journey" },
];

const parentServices = [
    { text: "All support services except direct financial aid" },
    { text: "Access to a secure system with a unique username and password" },
    { text: "Freedom to choose whether or not to disclose financial information" },
];

const supporterServices = [
    { text: "All support services except direct financial aid to students" },
    { text: "Access to a secure system with a unique username and password" },
    { text: "Full transparency and accountability in the use of funds" },
];

export default function Pillars() {
  return (
    <section id="pillars" className="bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl text-black font-bold tracking-tight sm:text-5xl">
              OUR PILLARS
            </h2>
            <p className="max-w-225 text-black text-base pt-6 sm:text-base">
              Our work is built on a foundation of collaboration between students, parents, and supporters.
            </p>
          </div>
        </div>

        <div className="mx-auto py-12">
            <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="student"><User className="mr-2 h-4 w-4" />The Student</TabsTrigger>
                    <TabsTrigger value="parent"><Users className="mr-2 h-4 w-4" />The Parent</TabsTrigger>
                    <TabsTrigger value="supporter"><HandHelping className="mr-2 h-4 w-4" />The Supporter</TabsTrigger>
                </TabsList>
                
                <TabsContent value="student" className="pt-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">The Student</h3>
                            <p className="text-black text-sm sm:text-base">
                            The Foundation is committed to fully funding the secondary school education of its students. In addition to financial support, we invest in their holistic development to equip them for academic excellence and life success.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold">Services Offered</h4>
                            <ul className="space-y-4">
                                {studentServices.map((service, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <CheckCircle className="h-6 w-6 shrink-0 mt-1 text-emerald-500" />
                                        <span className="text-black text-sm sm:text-base">{service.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="parent" className="pt-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">The Parent</h3>
                            <p className="text-black text-sm sm:text-base">
                            Parents are vital partners in every student's journey. The Foundation works closely with them to create a nurturing and stable environment that fosters both academic achievement and personal growth.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-2xl  font-bold">Services Offered</h4>
                             <ul className="space-y-4">
                                {parentServices.map((service, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <CheckCircle className="h-6 w-6 shrink-0 mt-1 text-emerald-500" />
                                        <span className="text-black text-sm sm:text-base">{service.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="supporter" className="pt-8">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">The Supporter</h3>
                            <p className="text-black text-sm sm:text-base">
                            Supporters play a key role in shaping our students’ futures. We partner with individuals and organizations who contribute to their education whether publicly acknowledged or anonymously.
                            </p>
                        </div>
                        <div className="grid gap-10 md:grid-cols-2">
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold">Supporter Categories</h4>
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="font-semibold text-primary">Category A</h5>
                                        <p className="text-black text-sm sm:text-base">Supporters who have already identified a student in need and seek the Foundation’s assistance to manage the scholarship.</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-primary">Category B</h5>
                                        <p className="text-black text-sm sm:text-base">Supporters who have not yet identified a student and rely on the Foundation to select a beneficiary and handle scholarship management.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold">Services Offered</h4>
                                <ul className="space-y-4">
                                    {supporterServices.map((service, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <CheckCircle className="h-6 w-6 shrink-0 mt-1 text-emerald-500" />
                                            <span className="text-black text-sm sm:text-base">{service.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </section>
  );
}
