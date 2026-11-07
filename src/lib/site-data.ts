export const SITE_URL = "https://www.accesspsych.com.au";
export const BOOKING_PORTAL = "https://clientportal.powerdiary.com/clientportal/accesspsych";
export const PHONE_LINK = "tel:1800277924";
export const EMAIL_LINK = "mailto:info@accesspsych.com.au";
export const LOGO_URL = `${SITE_URL}/wp-content/uploads/2022/07/AP_RGB_300x46.png`;
export const HOME_IMAGE = `${SITE_URL}/wp-content/uploads/2022/06/Homepage_1.jpg`;

export type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ContentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: SiteLink[];
  image?: string;
  imageAlt?: string;
};

export type ContentCard = {
  title: string;
  text: string;
  href?: string;
  image?: string;
  imageAlt?: string;
};

export type ContentPage = {
  title: string;
  eyebrow: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  sections?: ContentSection[];
  cards?: ContentCard[];
  note?: string;
  cta?: SiteLink;
};

export const navigation = [
  {
    label: "About us",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Vision Purpose & Values", href: "/vision-purpose-values" },
      { label: "Our approach", href: "/our-approach" },
      { label: "How to book", href: "/how-to-book-an-appointment-with-access-psych" },
      { label: "Meet our team", href: "/meet-our-team" },
      { label: "Our fees", href: "/fees" },
      { label: "News and Events", href: "/news-and-events" },
      { label: "Our locations", href: "/our-locations" },
    ],
  },
  {
    label: "Our services",
    links: [
      { label: "Psychology therapy and counselling", href: "/psychology-therapy-counselling" },
      { label: "Employee Assistance Program", href: "/employee-assistance-program" },
      { label: "Professional Care Program", href: "/professional-care-program" },
      { label: "Workplace group education", href: "/workplace-group-education" },
      { label: "Mental Health First Aid training", href: "/mhfa" },
      { label: "Critical Incident Support", href: "/critical-incident-support" },
      { label: "Autism ADHD and Cognitive Assessments", href: "/adhd-autism-assessments" },
      { label: "How to access our services", href: "/access-our-services" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Mental Health Information (blogs)", href: "/blogs" },
      { label: "Tip Sheets", href: "/tip-sheets" },
    ],
  },
  {
    label: "Careers",
    links: [
      { label: "Working At Access Psych", href: "/careers" },
      { label: "Current Vacancies", href: "/careers#current-vacancies" },
    ],
  },
  {
    label: "Contact",
    links: [
      { label: "Our locations", href: "/our-locations" },
      { label: "Booking request form", href: "/online-booking-request" },
      { label: "Frequently Asked Questions", href: "/frequently-asked-questions" },
    ],
  },
] satisfies { label: string; links: SiteLink[] }[];

export const concerns = [
  "Anxiety",
  "Depression",
  "Eating disorders",
  "Mood disorders including bipolar disorder",
  "Personality disorders",
  "Relationship therapy",
  "Substance abuse including drug and alcohol addictions",
  "Trauma-related disorders such as PTSD",
];

export const homepageCopy = [
  "It’s no secret that our mental health and wellbeing are essential to living our best lives.",
  "However, unprecedented demand for qualified, expert psychological services has outstripped supply and Australians are struggling to receive the mental health support they need, when they need it.",
  "That’s why Access Psych was established – to offer qualified face-to-face and telehealth psychological services to address a wide range of mental health issues and concerns, including:",
  "Access Psych psychology, therapy and counselling services are delivered by our team of mental health clinicians located across Australia. Our clinicians are trained in the science of the human mind and how people think, feel, behave and learn. They put this training to practice; supporting people to understand and improve mental health and wellbeing, relationships and behaviours, as well as learning, development and performance.",
];

export const pages: Record<string, ContentPage> = {
  "about-us": {
    title: "About Access Psych",
    eyebrow: "About us",
    intro: "Access Psych has a team of mental health clinicians Australia wide.",
    image: `${SITE_URL}/wp-content/uploads/2022/06/Aboutus.jpg`,
    imageAlt: "Older woman with glasses attending mental health support session",
    sections: [
      {
        title: "About Access Psych",
        paragraphs: [
          "No matter which member of our team you work with, their aim is to empower you with the tools to help you cope with the challenges that life presents and improve your overall mental health and wellbeing.",
          "From Cognitive Behaviour Therapy (CBT), Acceptance & Commitment Therapy (ACT) or Mindfulness, to Interpersonal Psychotherapy (ITP), Solution-Focused Brief Therapy (SBT) and Schema Therapy (ST) – to name a few – our mental health clinicians have the qualifications and experience to design therapy and counselling programs to support people who may be experiencing:",
        ],
        bullets: [
          "Self worth issues",
          "Anxiety",
          "Depression",
          "Attention Deficit Hyperactivity Disorder (ADHD)",
          "Domestic or family violence",
          "Substance related issues",
          "Stress",
          "Anger management issues",
          "Autism Spectrum Disorders",
          "Grief and bereavement",
          "Eating disorders",
          "Post traumatic stress disorders (PTSD), including complex PTSD",
          "Chronic pain",
          "Adjustment issues",
          "Relationship problems",
        ],
      },
      {
        title: "Support for people living with disability",
        paragraphs: [
          "Our mental health clinicians are also experienced in supporting people living with disability under the National Disability Insurance Scheme (NDIS).",
        ],
      },
      {
        title: "Part of MedHealth",
        paragraphs: [
          "Access Psych is part of MedHealth. MedHealth supports thousands of people each year to achieve better work and health outcomes through a unique combination of strengths, capabilities and resources which span employment, medical opinions, advisory, rehabilitation and return to work services. MedHealth’s 1,700 strong team of committed professionals use their talents to help others realise their potential. Backed by the expertise of more than 1,200 independent medical specialists, MedHealth covers all major medical and allied health disciplines, delivering localised expertise in more than 300 locations across Australia.",
        ],
        links: [{ label: "MedHealth", href: "https://www.medhealth.com.au/", external: true }],
      },
    ],
    cta: { label: "Meet our team", href: "/meet-our-team" },
  },
  "vision-purpose-values": {
    title: "Vision, Purpose & Values",
    eyebrow: "About us",
    intro: "Improving the wellbeing of people, families, workplaces and communities.",
    sections: [
      {
        title: "Our Vision",
        paragraphs: ["Improving the wellbeing of people, families, workplaces and communities."],
      },
      {
        title: "Our Purpose",
        paragraphs: ["Connecting people with the mental health support they need, when they need it."],
      },
    ],
    cards: [
      { title: "Authentic", text: "Our mental health clinicians build genuine relationships with clients that foster trust and confidence.", image: `${SITE_URL}/wp-content/uploads/2022/08/Authentic_Aug.png`, imageAlt: "Authenticity icon" },
      { title: "Compassionate", text: "We understand the challenges our clients face and approach them with compassion and understanding.", image: `${SITE_URL}/wp-content/uploads/2022/08/Compassionate_Aug.png`, imageAlt: "Compassion icon" },
      { title: "Dependable", text: "Our team of expert mental health clinicians can be trusted to work towards the best interest of the client.", image: `${SITE_URL}/wp-content/uploads/2022/08/Dependable_Aug.png`, imageAlt: "Dependability icon" },
      { title: "Collaborative", text: "We are determined to work with our clients to identify solutions that help resolve their issues and concerns.", image: `${SITE_URL}/wp-content/uploads/2022/08/Collaborative_Aug.png`, imageAlt: "Collaboration icon" },
    ],
  },
  "our-approach": {
    title: "Our approach",
    eyebrow: "About us",
    intro: "No matter which member of our team you work with, their aim is to empower you with the tools to help you cope with the challenges that life presents and improve your overall mental health and wellbeing.",
    cards: [
      { title: "Mindful", text: "We will always be conscious of who we are as humans." },
      { title: "Genuine", text: "Our focus is on your mental health needs. You are at the heart of our service." },
      { title: "Individual", text: "We will work closely with you to set and reach goals that are important to you." },
      { title: "Professional", text: "Our qualifications and capacity to deliver is your peace of mind." },
      { title: "Flexible", text: "You can choose from face-to-face sessions in one of our clinics or telehealth services Australia wide." },
      { title: "Motivational", text: "We want to make mental health care as accessible and as normal as going to the gym." },
    ],
  },
  "how-to-book-an-appointment-with-access-psych": {
    title: "How to book an appointment with Access Psych",
    eyebrow: "Bookings & referrals",
    intro: "At Access Psych, we believe in making mental health support as accessible as possible. It’s easy to make a booking with us.",
    sections: [
      {
        title: "Booking online",
        paragraphs: [
          "Our online booking portal is suitable for private paying and Medicare clients, plus employees whose employer has an Employee Assistance Program or Supervision agreement with Access Psych (please check with your employer if you are not sure).",
          "Via the portal, you can check the availability of our mental health clinicians, review our team member profiles to help you make an informed choice of clinician, book telehealth and in-person appointments at a time that suits you, manage re-bookings and cancellations, and learn more about fee information where this is relevant to your booking.",
        ],
        links: [{ label: "Our online booking portal", href: BOOKING_PORTAL, external: true }],
      },
      {
        title: "Booking via phone",
        paragraphs: [
          "If you’d like to talk to us about your booking, we’re here to help.",
          "Simply call our team on 1800 APSYCH (1800 277 924) and we will be able to match you to an appropriate mental health clinician and book a telehealth or in-person appointment at a time that suits you.",
        ],
        links: [{ label: "1800 APSYCH (1800 277 924)", href: PHONE_LINK }],
      },
      {
        title: "Completing our booking request form",
        paragraphs: [
          "Our online booking request form allows you, or someone on your behalf, to complete and submit information in relation to the mental health support you need. Once we have received this information, our support team will be in contact with you to make an appointment at a time and place that suits you.",
        ],
        links: [{ label: "Online booking request form", href: "/online-booking-request" }],
      },
    ],
    cta: { label: "Book online now", href: BOOKING_PORTAL, external: true },
  },
  "meet-our-team": {
    title: "Meet our team",
    eyebrow: "About us",
    intro: "Access Psych has a team of mental health clinicians Australia wide.",
    image: `${SITE_URL}/wp-content/uploads/2022/06/Homepage_1.jpg`,
    imageAlt: "A young man talking with a psychologist",
  },
  "psychology-therapy-counselling": {
    title: "Psychology, Therapy & Counselling",
    eyebrow: "Our services",
    intro: "Access Psych has a team of mental health clinicians located across Australia, ready to deliver mental health therapy and counselling for people aged 12 years and over.",
    image: `${SITE_URL}/wp-content/uploads/2022/06/Psych_therapy_counselling1.jpg`,
    imageAlt: "Woman performing counselling psychology services",
    sections: [
      {
        title: "Psychology, therapy and counselling services",
        paragraphs: [
          "Our clinicians assess each client so they can develop therapy and counselling programs that incorporate the most suitable therapeutic approaches to meet the unique needs of each individual.",
          "From Cognitive Behaviour Therapy (CBT), Acceptance & Commitment Therapy (ACT) or Mindfulness, to Interpersonal Psychotherapy (ITP), Solution-Focused Brief Therapy (SBT) and Schema Therapy (ST) – to name a few – our clinicians have the qualifications and experience to design therapy and counselling programs to support people who may be experiencing:",
        ],
        bullets: [
          "Self worth issues",
          "Anxiety",
          "Depression",
          "Attention Deficit Hyperactivity Disorder (ADHD)",
          "Domestic or family violence",
          "Substance related issues",
          "Stress",
          "Anger management issues",
          "Autism Spectrum Disorders",
          "Grief and bereavement",
          "Eating disorders",
          "Post traumatic stress disorders (PTSD), including complex PTSD",
          "Chronic pain",
          "Adjustment issues",
          "Relationship problems",
        ],
      },
      {
        title: "NDIS support",
        paragraphs: ["Our mental health clinicians are also experienced in supporting people living with disability under the National Disability Insurance Scheme (NDIS)."],
      },
      {
        title: "Appointments across Australia",
        paragraphs: [
          "Access Psych psychology, therapy and counselling services are delivered by a team of mental health clinicians located across Australia. Our clinicians are trained in the science of the human mind and how people think, feel, behave and learn. They put this training to practice; supporting people to understand and improve mental health and wellbeing, relationships and behaviours, as well as learning, development and performance.",
          "Access Psych has immediate availability for telehealth psychology, therapy and counselling services. Our mental health clinicians are also available for face-to-face appointments from selected clinics.",
        ],
      },
    ],
    cta: { label: "Find a clinician", href: "/meet-our-team" },
  },
  "access-our-services": {
    title: "How to access our services",
    eyebrow: "Our services",
    intro: "We want to make mental health care as accessible and as normal as going to the gym so that you get the mental health support you need, when you need it. We’ve detailed the different ways you can access our services below, or you can talk to our friendly team about your options.",
    sections: [
      {
        title: "Medicare",
        paragraphs: [
          "Medicare rebates are available for psychological treatment by registered psychologists and mental health social workers under the Australian Government’s Better Access to Mental Health Care Program. This initiative provides assistance to people living with mental health problems, allowing them greater access to registered psychologists and mental health social workers and providing more affordable mental healthcare.",
          "Under the program, our clinicians can provide approved psychological strategies and therapies for a broad range of commonly experienced mental health problems including depression, anxiety, panic attacks, bipolar, phobias, substance issues, sleep problems, grief, loss and trauma-related conditions.",
          "Our clinicians will assess each client individually and tailor treatment programs which may incorporate approved treatments such as cognitive-behaviour therapy, relaxation and stress management techniques, interpersonal therapy and eye movement desensitisation therapy (EMDR). Our clinicians may also engage in specific skills training featuring problem solving skills, anger management and communication skills.",
          "Individuals diagnosed with a mental health disorder may be eligible for a rebate for up to 10 individual counselling sessions, and up to 10 group therapy sessions, in a calendar year. Medicare requires that you, your clinician and your doctor periodically review (every four to six sessions) how you are progressing with treatment.",
          "You must be referred to Access Psych by your doctor (GP), a psychiatrist or a paediatrician. Your doctor must first assess and determine that the services of a registered psychologist or mental health social worker is required through a Mental Health Care Plan.",
          "Access Psych clinicians will continue to work collaboratively with your doctor, providing correspondence over the course of your treatment to ensure that they are aware of your progress with treatment.",
        ],
        links: [{ label: "Better Access to Mental Health Care Program", href: "https://www.health.gov.au/initiatives-and-programs/better-access-initiative", external: true }],
        image: `${SITE_URL}/wp-content/uploads/2021/09/ipar-psych-medicare-img1.jpg`,
        imageAlt: "Smiling woman holding coffee cup",
      },
      {
        title: "Private appointments",
        paragraphs: [
          "Anyone is able to access psychological intervention and support without a referral as a private client and Access Psych welcomes self-referrals for treatment of mental health conditions or concerns. There are no limits on the number of sessions that a private client can access. You will not be eligible for any Medicare rebate under a self-referral.",
          "Simply complete an online booking form, phone 1800 277 924 or email info@accesspsych.com.au to make an appointment.",
        ],
        links: [
          { label: "Online booking form", href: "/online-booking-request" },
          { label: "1800 277 924", href: PHONE_LINK },
          { label: "info@accesspsych.com.au", href: EMAIL_LINK },
        ],
      },
      {
        title: "Private health insurance",
        paragraphs: [
          "For clients with extras cover, you may be entitled to a rebate on psychology services. Every policy is different and it is recommended that you check with your health fund about their eligibility requirements before contacting Access Psych to make an appointment.",
          "Access Psych can provide a receipt for services provided to allow you to seek a rebate from your Private Health Insurance.",
          "Once you have checked with your health fund and obtained a referral from your doctor (if required) please contact Access Psych on 1800 277 924 to book an appointment.",
        ],
        links: [{ label: "1800 277 924", href: PHONE_LINK }],
      },
      {
        title: "Workers Compensation",
        paragraphs: [
          "If you have sustained a psychological injury at work or if you have a psychological condition relating to a workplace injury you may be eligible to access psychological treatment services under Workers Compensation. The number of sessions approved under the Workers Compensation scheme is determined on a case-by-case basis.",
          "Access Psych clinicians are Workers Compensation specialists and endeavour to work collaboratively with your treating health professionals and other relevant parties relating to your claim (e.g., your Nominated Treating Doctor, your insurer and your Rehabilitation Provider) to support your recovery and transition through the return-to-work process.",
          "An injured worker is able to access psychological treatment through Workers Compensation when this psychological intervention is recommended as part of the Treatment Plan documented on the Certificate of Capacity. Access Psych is able to assist clients with seeking approval from the Workers Compensation Insurance Claims Manager prior to proceeding with any services.",
        ],
        image: `${SITE_URL}/wp-content/uploads/2021/09/ipar-psych-workerscomp-img.jpg`,
        imageAlt: "Woman discussing a workers compensation claim with a psychologist",
      },
      {
        title: "Employee Assistance Program (EAP)",
        paragraphs: [
          "If your employer has an EAP Service Agreement with Access Psych, you are able to access counselling sessions to assist with personal, family or work-related issues. To access those sessions, you can complete a self-referral or be referred through your workplace representative.",
        ],
        links: [{ label: "Employee Assistance Program", href: "/employee-assistance-program" }],
      },
    ],
    cta: { label: "Contact our team", href: PHONE_LINK },
  },
  fees: {
    title: "Our fees",
    eyebrow: "Fees & payment",
    intro: "Access Psych is not a bulk billing clinic, so payment is required on the day before your counselling session.",
    sections: [
      {
        title: "Payment and rebates",
        paragraphs: [
          "If your therapy is covered by Medicare, we will assist with processing all eligible rebates.",
          "If you are covered by Private Health Insurance, we will email a copy of your invoice so you can make a claim with your insurer.",
          "If your counselling session is related to a workplace injury and you’re covered by Workers Compensation*, we will send the invoice direct to your insurer.",
          "Employee Assistance Program (EAP) sessions will be invoiced directly with your employer.",
        ],
        links: [
          { label: "Employee Assistance Program (EAP)", href: "/employee-assistance-program" },
          { label: "How to access our psychology services", href: "/access-our-services" },
          { label: "Terms of Payment", href: `${SITE_URL}/wp-content/uploads/2026/10/Access-Psych-Terms-of-Payment_Oct2026.pdf`, external: true },
          { label: "Cancellation, Non-attendance and Late arrival policy", href: `${SITE_URL}/wp-content/uploads/2026/10/Access-Psych-Cancellation-Non-attendance-and-Late-Arrival-Policy_Oct2026.pdf`, external: true },
        ],
      },
    ],
    note: "* Approved Sessions Only.",
    cta: { label: "Book online now", href: BOOKING_PORTAL, external: true },
  },
  "employee-assistance-program": {
    title: "Employee Assistance Program",
    eyebrow: "Our services",
    intro: "Supporting resilient workplaces and making mental health a priority",
    image: `${SITE_URL}/wp-content/uploads/2022/06/EAP1.jpg`,
    imageAlt: "Office worker talking with psychologist over coffee about employee support",
    sections: [
      {
        title: "Employee Assistance Programs",
        paragraphs: [
          "Access Psych has extensive experience in the provision of tailored and supportive Employee Assistance Programs (EAP) to businesses across Australia.",
          "EAP is a confidential and solution-focused counselling service, designed to support employees experiencing mental health issues of any kind – whether these are personal, family and/or work-related issues.",
          "It is a brief and practical intervention delivered by our mental health clinicians to develop strategies to approach current and future mental health concerns.",
        ],
        links: [{ label: "Mental health clinicians", href: "/meet-our-team" }],
      },
      {
        title: "Why offer an EAP to your employees?",
        paragraphs: [
          "An EAP can form part of your risk mitigation framework and assist compliance to the SafeWork NSW Code of Practice for Managing psychosocial hazards at work.",
          "The counselling is short-term, informal, friendly and focused on employee’s specific needs.",
          "The employee can select the delivery method that best suits them: either via the phone or telehealth, or face-to-face at Access Psych clinics located across NSW.",
          "All information is treated with the utmost privacy and confidentiality.",
          "Access Psych is able to offer national 24/7 call triaging.",
        ],
        links: [
          { label: "SafeWork NSW Code of Practice", href: "https://www.safework.nsw.gov.au/resource-library/list-of-all-codes-of-practice/codes-of-practice/managing-psychosocial-hazards-at-work", external: true },
          { label: "Our locations", href: "/our-locations" },
        ],
      },
      {
        title: "What happens if the employee needs more support?",
        paragraphs: [
          "In some cases, the specialty or the duration of counselling that is required may be outside the scope of EAP services. In this case, Access Psych may facilitate a referral via the employee’s General Practitioner for counselling under Medicare’s Better Access to Mental Health Care program.",
        ],
        links: [{ label: "Better Access to Mental Health Care program", href: "https://www.health.gov.au/initiatives-and-programs/better-access-initiative", external: true }],
      },
      {
        title: "Tailoring EAP to your organisation",
        paragraphs: [
          "Access Psych recognises that every workplace and worker is different, so we tailor the EAP package to suit the organisation. This can include an initial screen of the individual and allocation to the most appropriate clinician near you based on the service delivery needs. It will also include the number of sessions available to each employee, and potentially their family members.",
          "In addition to the EAP service, Access Psych offers a suite of corporate health packages designed to improve employee’s health and wellbeing, while reducing absenteeism and the risk of illness.",
        ],
        links: [{ label: "Clinician near you", href: "/meet-our-team" }],
      },
      {
        title: "Further information for employers",
        paragraphs: [
          "If you are an employer and would like to discuss an EAP Service Agreement with Access Psych, or our other corporate health packages, please contact us on 1800 277 924 or via email info@accesspsych.com.au",
        ],
        links: [
          { label: "1800 277 924", href: PHONE_LINK },
          { label: "info@accesspsych.com.au", href: EMAIL_LINK },
        ],
      },
    ],
    cta: { label: "Contact our team", href: PHONE_LINK },
  },
  "professional-care-program": {
    title: "Professional Care Program",
    eyebrow: "Our services",
    intro: "Expert, proactive mental health support for professionals",
    image: `${SITE_URL}/wp-content/uploads/2025/08/lady-computer.jpg`,
    imageAlt: "Smiling lady gesturing at her computer screen",
    sections: [
      {
        title: "Professional Care Program",
        paragraphs: [
          "In emotionally demanding professions, mental strength and resilience aren’t just helpful, they’re essential. Yet the very nature of these roles can leave individuals feeling overwhelmed or isolated. That’s why more workplaces are recognising the need for proactive support to maintain wellbeing and prevent psychological injury.",
          "At Access Psych, our Professional Care Program (PCP) provides structured, personalised, and preventative mental health support. The program is designed to strengthen resilience, prevent burnout and compassion fatigue, and sustain high performance in your people and teams.",
        ],
      },
      {
        title: "Who is the program for?",
        paragraphs: ["The PCP is ideal for professionals working in high-pressure, emotionally intensive roles. These are the people who regularly carry the weight of complex decisions, people leadership, or exposure to trauma."],
        bullets: [
          "Frontline professionals such as first responders, healthcare workers, case managers, and educators",
          "Leaders and people managers navigating team demands and responsibilities",
          "Both seasoned staff and those new to their profession who want to build resilience",
        ],
      },
      {
        title: "Supporting workplaces",
        paragraphs: [
          "Recent workplace health and safety regulations make it clear: employers have a legal duty to identify, manage, and control psychosocial hazards, just as they do with physical risks.",
          "The Professional Care Program helps organisations meet these obligations through evidence-based strategies for managing psychosocial hazards such as role overload, trauma exposure, or emotional demands; early identification and support for workers showing signs of psychological distress; and preventative care that reduces the risk of long-term harm.",
          "Integrating the PCP into your wellbeing strategy isn’t just good practice. It’s a future-focused investment in your people.",
        ],
        image: `${SITE_URL}/wp-content/uploads/2025/08/man-having-chat.jpg`,
        imageAlt: "Seated man talking with a woman holding a clipboard",
      },
      {
        title: "How the program works",
        paragraphs: [
          "Your organisation pre-purchases an agreed number of sessions annually. Your professional team members are then paired with experienced mental health clinicians for regular one-on-one sessions, delivered virtually or onsite.",
          "In these confidential, proactive sessions, your people can reflect on challenges and role demands, build and maintain psychological resilience, strengthen professional skills and confidence, manage stress and prevent burnout, and receive practical strategies for wellbeing and performance.",
          "Each session includes tailored takeaways to support resilience, self-care, and effectiveness at work.",
        ],
        bullets: [
          "Resources and check-ins for managers or HR teams",
          "Integration with broader wellbeing initiatives such as training, workshops, or critical incident response",
        ],
      },
      {
        title: "Confidentiality and Insight",
        paragraphs: [
          "All sessions are private and confidential. However, organisations can access de-identified reporting on overarching themes and wellbeing trends—helping leaders monitor risk and shape a supportive, psychologically safe workplace culture.",
        ],
      },
    ],
    cta: { label: "Contact us about the program", href: EMAIL_LINK },
  },
  "workplace-group-education": {
    title: "Workplace group education",
    eyebrow: "Our services",
    intro: "Access Psych offers bespoke workplace training, designed to increase your employee’s knowledge of wellbeing and resilience behaviours and strengthen them in all aspects of life. The program can be fully customised, mixing the content outlined below for a unique program.",
    sections: [
      {
        title: "Workplace training modules",
        paragraphs: ["Interactive and engaging, the sessions are available face-to-face, via webinar, or available as a video series."],
        bullets: [
          "Understanding your mental health — A module that develops a greater understanding of mental health. Includes practical strategies to help a person manage their own mental health, plus resources to support mental health and wellness.",
          "Turning Disputes into Discussion — We explore different types of conflicts, why they arise and the difference between dispute and conflict. We then look at how to engage in constructive conversations to cultivate a harmonious workplace.",
          "Supporting mental health in the workplace — We explore and seek to improve our understanding of mental health challenges within the workplace, including appropriate approaches to support your team and colleagues.",
          "Understanding grief and loss — This module seeks to support people to understanding grief and how it impacts themselves and others. It also includes advice on how to support others in managing their grief.",
          "Building mental resilience — This module focuses on developing a greater understanding of resilience, its importance and how to improve your resilience, embrace change and navigate the challenges of life.",
          "Suicide awareness — This important module is designed to equip people with the resources, knowledge and skills to recognise warning signs, provide support and effective intervention.",
          "Change in the workplace — This module explores change in the workplace through a mental health lens, developing a greater understanding of change management and how it can be an opportunity for people and teams.",
          "Understanding trauma — We explore trauma: the prevalence, what it is, signs and symptoms, and how we respond to it. We also look at practical tips for how to support people who have experienced trauma.",
          "Neurodiversity in the Workplace — This training provides an overview of neurodiversity, including a specific focus on ADHD and Autism. We’ll explore the strengths of a neurodiverse workplace and discuss the barriers neurodivergent individuals may experience. We will also provide practical strategies for fostering an inclusive workplace environment.",
        ],
      },
      {
        title: "Looking for something else?",
        paragraphs: [
          "Contact us to discuss building a bespoke training program for your workplace.",
          "All Access Psych training sessions are presented by highly qualified mental health clinicians with experience delivering engaging and empowering content.",
          "Are you ready to schedule a training session with Access Psych or get further information from us? Please complete our simple Training Request Form or contact us on 1800 277 924.",
        ],
        links: [
          { label: "Training Request Form", href: `${SITE_URL}/training-request-form/`, external: true },
          { label: "1800 277 924", href: PHONE_LINK },
        ],
      },
    ],
  },
  mhfa: {
    title: "Mental Health First Aid training",
    eyebrow: "Our services",
    intro: "Training for adults",
    sections: [
      {
        title: "Training for adults",
        paragraphs: [
          "Mental Health First Aid® training teaches participants how to provide initial support to another adult who may be experiencing a mental health problem or mental health crisis, until professional help is received or the crisis resolves.",
          "Participants learn about the signs and symptoms of common mental health problems in adults, how to recognise and respond to an emerging or worsening mental health problem and the treatments and supports available.",
          "The 12-hour course can be delivered in one of three ways:",
        ],
        bullets: [
          "Face-to-face: A two-day course led by one of Access Psych’s Licensed MHFA Instructors (held for a minimum of 6 and maximum of 12 participants).",
          "Blended face-to-face: A self-paced e-learning component, followed by a four-hour face-to-face session led by a Licensed MHFA Instructor.",
          "Online: A self-paced e-learning component, followed by two 2.5-hour video conferencing sessions led by a Licensed MHFA Instructor.",
        ],
      },
      {
        title: "Mental health first aid topics",
        paragraphs: ["No matter the delivery method, participants will learn how to apply mental health first aid across a range of common mental health problems and situations, including:"],
        bullets: [
          "Depression",
          "Anxiety",
          "Psychosis",
          "Substance use problems",
          "Suicidal thoughts and behaviours",
          "Panic attacks",
          "Non suicidal self-injury",
          "Traumatic events",
        ],
      },
    ],
  },
  "critical-incident-support": {
    title: "Critical Incident Support",
    eyebrow: "Our services",
    intro: "Access Psych has extensive experience in the provision of Critical Incident Support for Australian employers and their employees.",
    sections: [
      {
        title: "What is Critical Incident Support?",
        paragraphs: [
          "Critical Incident Support is where our qualified personnel offer immediate counselling and support services following a:",
        ],
        bullets: [
          "Workplace injury or death",
          "Natural disaster",
          "Suicide or attempted suicide",
          "Armed robbery",
          "Assault or violence in the workplace",
          "Serious near-miss or safety incident",
        ],
      },
      {
        title: "Support following a critical incident",
        paragraphs: [
          "These types of incidents can present a risk to the safety, wellbeing and health of your staff and organisation. Access Psych is able to provide immediate, comprehensive support that can mitigate risk and minimise impact while protecting the psychological safety of your workforce.",
          "Access Psych Critical Incident Support services include:",
        ],
        bullets: [
          "An immediate, prompt and thorough response and action plan",
          "24/7 phone call triaging service",
          "Ongoing counselling for impacted staff",
          "Professional support for workers involved in a serious incident",
          "Individual or group support, as required",
          "Support and coaching for Managers",
          "Resources for staff to support them to care for themselves and others during these times",
        ],
      },
      {
        title: "Further information for employers",
        paragraphs: ["If you are an employer and would like to discuss Critical Incident Support with Access Psych, please contact the team."],
        links: [
          { label: "1800 277 924", href: PHONE_LINK },
          { label: "info@accesspsych.com.au", href: EMAIL_LINK },
        ],
      },
    ],
    cta: { label: "Call our team", href: PHONE_LINK },
  },
  "adhd-autism-assessments": {
    title: "Autism, ADHD and Cognitive Assessments",
    eyebrow: "Our services",
    intro: "Frequently asked questions about Autism",
    sections: [
      {
        title: "What is Autism?",
        paragraphs: [
          "Autism is a different brain type that is more motivated by interest and information gathering/sharing than a non-Autistic brain. This is underpinned by differences in neural connectivity (hyperconnectivity in some brain areas, and hypoconnectivity in other areas) which can also lead to more/less sensory sensitivity, greater need for routine and/or repetitive movements to self-regulate, and deeper focus on a smaller range of interest compared to a non-Autistic brain, which can lead to experiences of intense joy.",
          "Some Autistic people have a stronger drive for autonomy and fairness than non-Autistic people. Autism tends to run in families.",
        ],
      },
      {
        title: "How do we assess Autism?",
        paragraphs: [
          "There are Australian Evidence-Based Clinical Practice Guidelines for Attention Deficit Hyperactivity Disorder (ADHD) developed by AADPA.",
          "Access Psych’s assessment process follows these guidelines, including a comprehensive assessment and a clinical interview involving administration of the Monteiro Interview Guidelines for Diagnosing the Autism Spectrum (MIGDAS).",
        ],
        links: [{ label: "AADPA", href: "https://aadpa.com.au/", external: true }],
      },
      {
        title: "Who can diagnose Autism in adults?",
        paragraphs: [
          "Any suitably qualified and trained mental health clinician can diagnose Autism. This can include psychologists, psychiatrists, and mental health social workers. Provisional psychologists can also conduct assessments and diagnose Autism under supervision.",
          "Access Psych ensures that all its clinicians have undertaken suitable training in Autism assessment and receive regular supervision.",
        ],
      },
      {
        title: "What are the signs or symptoms of Autism in adults?",
        paragraphs: [
          "Current understanding of Autism recognises that it is a different brain type (neurotype), not a disorder, and that there are a wide range of different presentations of Autism. This has led to the saying “If you know one person with Autism, you know one person with Autism.”",
          "Currently, Autism is assessed against a medical model, the DSM-5-TR, which defines the symptoms of Autism as lifelong, impactful difficulties in social reciprocity, non-verbal communication, as well as developing, sustaining, and understanding relationships, with repetitive behaviours, rigidity, narrow range of interests and/or sensory hyper- or hypo-sensitivity.",
          "This has led to stigma, discrimination, misunderstanding, and under recognition of Autistic individuals, because many Autistic people do not identify with this description of their identities.",
          "A more neuroaffirming view of Autism is that it is a neurotype characterised by lifelong differences (not deficits) in social communication, prioritising of verbal over non-verbal communication, greater ease in relationships with other Autistic people, as well as sensory differences, deep or special interests (SPINs), and use of routines and /or repetitive movements “stims” to self-regulate.",
          "These differences may lead to significant mental health challenges, distress, or challenges in daily life because of the expectations on the person to behave",
        ],
      },
      {
        title: "Are the symptoms of Autism different for women?",
        paragraphs: [
          "Autism has typically been underdiagnosed in women, because the diagnostic criteria were developed based on a classic, male presentation of Autism, and because it was incorrectly believed to affect more men than women.",
          "Women may also be better at ‘masking’ – that is hiding their Autistic traits to appear non-Autistic. However, masking often leads to exhaustion, burn out and mental health challenges, and many Autistic people are now seeking out communities of other Autistic people where they can safely unmask and practice being their authentic selves.",
          "Clinicians are getting better at identifying Autism in women and non-binary people. Diversity in gender identity and sexuality is known to occur at higher rates in Autistic people compared to non-Autistic people.",
        ],
      },
      {
        title: "Why is it important to be tested for Autism?",
        paragraphs: [
          "Undiagnosed neurodivergence is often a source of significant trauma and poor mental health for Autistic people, who may feel defective in some way because of their struggles.",
          "Receiving an Autism diagnosis can lead to feelings of relief as well as validation and increased self-compassion, but many Autistic people receiving a diagnosis later in life also experience a range of other emotions including grief and other complicated feelings related to how life may have been different if they had received a diagnosis earlier.",
          "There are more public figures who have spoken openly about Autism, which means that Autistic people have role models to look up to, such as Chloe Hayden, an Australian Autistic and ADHD actor and advocate.",
        ],
        links: [{ label: "Chloe Hayden", href: "https://www.chloehayden.com.au/", external: true }],
      },
      {
        title: "What is the Autism spectrum?",
        paragraphs: [
          "The term Autism Spectrum or Autism Spectrum Disorder has typically been used to refer to the range of functioning of Autistic people. This is now thought of in terms of the range of support needs of Autistic People.",
          "It has also been misunderstood and taken to mean that “everyone is somewhere on the spectrum/ we’re all a little bit Autistic” which is not accurate. As awareness of Autism grows, many people now think about Autism beyond even a spectrum, to something akin to a colour wheel, as a way of attempting to capture the uniqueness of every Autistic person’s experience.",
        ],
      },
      {
        title: "How do you treat Autism in adults?",
        paragraphs: [
          "Autism is not a disorder; therefore, it is not a condition to be treated. However, Autistic people often require support and accommodations to enable them to embrace their identity and live well in a non-Autistic world.",
        ],
      },
    ],
    note: "TODO: content needed — the live assessment page text available during research ends mid-sentence in the section about expectations on Autistic people. Read the original page for the complete text.",
    cta: { label: "Read the full assessment information", href: `${SITE_URL}/adhd-autism-assessments/`, external: true },
  },
  "our-locations": {
    title: "Our locations",
    eyebrow: "Contact",
    intro: "We want to make mental health care as accessible and as normal as going to the gym so that you get the mental health support you need, when you need it.",
    sections: [
      {
        title: "Accessible mental health care",
        paragraphs: [
          "Access Psych has a growing team of experienced mental health clinicians. If you are seeking services in a location that is not listed or if you would like to discuss specific aspects of our service, please do not hesitate to contact 1800 APSYCH.",
          "We are growing our clinics across Australia to connect people with the mental health support they need, when they need it.",
        ],
        links: [{ label: "1800 APSYCH (1800 277 924)", href: PHONE_LINK }],
      },
    ],
    cta: { label: "Contact our team", href: PHONE_LINK },
  },
  "frequently-asked-questions": {
    title: "Frequently asked questions",
    eyebrow: "Contact",
    intro: "Straightforward information about mental health services and appointments at Access Psych.",
    sections: [
      {
        title: "Is there an Access Psych mental health clinician near me?",
        paragraphs: ["We operate a selection of clinics nationally for face-to-face appointments. However, we offer all our counselling and psychology sessions via telehealth, so you can access the help you need, when you need it."],
      },
      {
        title: "How can I find out more about counselling and psychological services near me?",
        paragraphs: ["From the services we offer, to the clinicians who deliver them, our website is full of useful, straightforward information. However, if you still have questions about our services, or you want further clarification on something, you can contact our friendly team on 1800 APSYCH (1800 277 924) or email us info@accesspsych.com.au"],
        links: [
          { label: "1800 APSYCH (1800 277 924)", href: PHONE_LINK },
          { label: "info@accesspsych.com.au", href: EMAIL_LINK },
        ],
      },
      {
        title: "Do you offer relationship counselling for couples?",
        paragraphs: ["Yes. We offer therapy and counselling sessions for couples to help overcome relationship issues, including loss of intimacy, lack of honesty, loss of trust, infidelity, communication issues, and more. Medicare rebates do not apply for these services."],
      },
      {
        title: "Can you help with anxiety and depression?",
        paragraphs: ["Yes. Our team of mental health clinicians are on hand to help you overcome any issues you’re facing as a result of anxiety and depression. Combining valuable experience and therapeutic knowledge, our team work with you to set realistic goals that will help manage your mental health."],
      },
      {
        title: "Do you have a waitlist for psychologist support?",
        paragraphs: ["We have a large, national team of mental health clinicians, which means that we can provide psychological support appointments immediately, with little or no waiting time. Please contact us on 1800 APSYCH (1800 277 924) to make an appointment."],
        links: [{ label: "1800 APSYCH (1800 277 924)", href: PHONE_LINK }],
      },
      {
        title: "Is it possible to complete my appointment via telehealth?",
        paragraphs: ["Yes. We offer all our therapy, counselling and psychology sessions via telehealth, so that no matter where you are located in Australia you can get the psychological support that you need, when you need it. We also have a selection of clinics nationally for face-to-face sessions."],
      },
      {
        title: "Do you offer trauma psychology services?",
        paragraphs: ["Yes. Our team are experienced to support clients living with a wide range of trauma. This includes acute trauma, which results from a single stressful or dangerous event, to chronic trauma – repeated and prolonged exposure to highly stressful events, such as child abuse or bullying. We are also experienced in dealing with trauma as a result of domestic and family violence."],
      },
      {
        title: "How do I get in touch with Access Psych?",
        paragraphs: ["For all enquiries, questions or appointments, please contact our friendly team on 1800 APSYCH (1800 277 924) or email info@accesspsych.com.au. We can arrange an appointment with one of our mental health clinicians at a time that suits you. We can also help you with telehealth services if that suits you."],
        links: [
          { label: "1800 APSYCH (1800 277 924)", href: PHONE_LINK },
          { label: "info@accesspsych.com.au", href: EMAIL_LINK },
        ],
      },
      {
        title: "How do I get a Mental Health Care Plan?",
        paragraphs: ["Your GP is able to provide you with a Mental Health Care Plan. A Mental Health Care Plan provides you with an initial six sessions, with the option to re-visit your GP to obtain an additional four sessions. You are able to access ten psychology sessions per calendar year. If you would like to continue therapy after you have used these sessions, you may access psychology through your private health insurer or pay privately."],
      },
      {
        title: "What happens if I don’t want to see my doctor?",
        paragraphs: ["You may access psychological treatment as a private client, without having to obtain a Mental Health Care Plan from your GP. We’re here to help so don’t hesitate to pick up the phone and call 1800 APSYCH (1800 277 924) or email info@accesspsych.com.au"],
        links: [
          { label: "1800 APSYCH (1800 277 924)", href: PHONE_LINK },
          { label: "info@accesspsych.com.au", href: EMAIL_LINK },
        ],
      },
    ],
    cta: { label: "Contact our team", href: PHONE_LINK },
  },
  resources: {
    title: "Mental health resources",
    eyebrow: "Resources",
    intro: "Check out our free online resources for advice and support on a range of mental health topics",
    sections: [
      {
        title: "Information and support",
        paragraphs: [
          "At Access Psych, we believe your mental health matters, and that people should have access to the support they need, when they need it. To help you access information that could support your mental health, we’ve put together pages full of useful information.",
          "Remember, the information provided in our resources is general in nature and is intended to be used for information purposes only. If you want to talk to one of the Access Psych team, head over to our Meet the Team page to find a mental health clinician near you. Alternatively, if you have any questions about Access Psych and what else we can do for you, visit our Frequently Asked Questions page.",
          "When you’re ready, you can book an appointment online, speak to one of our friendly team on 1800 277 924 or email info@accesspsych.com.au.",
        ],
        links: [
          { label: "Tip sheets", href: "/tip-sheets" },
          { label: "Mental health information articles", href: "/blogs" },
          { label: "Meet the Team", href: "/meet-our-team" },
          { label: "Frequently Asked Questions", href: "/frequently-asked-questions" },
          { label: "Book online", href: BOOKING_PORTAL, external: true },
          { label: "info@accesspsych.com.au", href: EMAIL_LINK },
        ],
      },
    ],
  },
  blogs: {
    title: "Mental health information",
    eyebrow: "Resources",
    intro: "Mental health information articles from Access Psych.",
    cards: [
      {
        title: "Autistic burnout in adults: signs, contributing factors, and recovery supports",
        text: "Autistic burnout is a nervous system response to sustained overload. It is not laziness or a lack of resilience. Many Autistic adults can maintain performance in public settings and then experience significant exhaustion and reduced functioning…",
        href: `${SITE_URL}/autistic-burnout-in-adults-signs-contributing-factors-and-recovery-supports/`,
        image: `${SITE_URL}/wp-content/uploads/2026/03/Autistic-burnout-in-adults-495x317.jpg`,
        imageAlt: "A thoughtful young woman with glasses sits in a classroom",
      },
      {
        title: "ADHD and emotional intensity: rejection sensitivity, overwhelm, and repair strategies",
        text: "ADHD affects emotion regulation, not just attention. Many adults with ADHD describe emotions as arriving quickly, feeling intense, and being hard to shift.",
        href: `${SITE_URL}/adhd-and-emotional-intensity-rejection-sensitivity-overwhelm-and-repair-strategies/`,
        image: `${SITE_URL}/wp-content/uploads/2026/03/ADHD-and-emotional-intensity-495x317.jpg`,
        imageAlt: "Two women sitting at a table in an office setting",
      },
      {
        title: "Managing Stress: Practical Strategies for Everyday Life",
        text: "In today’s fast-paced world, stress has become part of the human experience. Whether it’s juggling work demands, family responsibilities, or unexpected life events, everyone encounters stress at some point.",
        href: `${SITE_URL}/managing-stress-practical-strategies-for-everyday-life/`,
        image: `${SITE_URL}/wp-content/uploads/2025/11/Access-Psych-Blog-Posts-Nov-2025-Managing-Stress-header-495x317.jpg`,
        imageAlt: "A woman speaking with a man in an outdoor setting",
      },
      {
        title: "Supporting Neurodiverse Employees: Building Inclusive and Psychologically Safe Workplaces",
        text: "Every workplace is made up of people who think, communicate, and process information differently. This diversity in how we experience and engage with the world is known as neurodiversity.",
        href: `${SITE_URL}/supporting-neurodiverse-employees-building-inclusive-and-psychologically-safe-workplaces/`,
        image: `${SITE_URL}/wp-content/uploads/2025/11/Access-Psych-Blog-Posts-Nov-2025-Neurodiverse-Employees-header-495x317.jpg`,
        imageAlt: "A diverse group of people in a professional setting",
      },
      {
        title: "Conflict Resolution: Fostering Open and Respectful Communication for Win-Win Outcomes",
        text: "Conflict is a natural and inevitable part of life. Whether in the workplace, at home, or in our communities, differences in opinions, needs, and perspectives will arise. While conflict can feel uncomfortable, it also presents an opportunity…",
        href: `${SITE_URL}/conflict-resolution-fostering-open-and-respectful-communication-for-win-win-outcomes/`,
        image: `${SITE_URL}/wp-content/uploads/2025/11/Access-Psych-Blog-Posts-Nov-2025-Conflict-Resolution-header-495x317.jpg`,
        imageAlt: "A man and woman facing each other having a conversation",
      },
      {
        title: "Supporting Menopause and Mental Health in the Workplace",
        text: "Menopause is a natural and inevitable phase in a woman’s life, typically occurring between the ages of 45 and 55. While it marks the end of menstruation, it also brings significant hormonal, physical, and psychological changes…",
        href: `${SITE_URL}/supporting-menopause-and-mental-health-in-the-workplace/`,
        image: `${SITE_URL}/wp-content/uploads/2025/11/Access-Psych-Blog-Posts-Nov-2025-Menopause-and-MH-header-495x317.jpg`,
        imageAlt: "An older woman working on her laptop",
      },
      {
        title: "Debunking common myths about visiting a psychologist",
        text: "If you’ve never seen a psychologist, the thought of visiting one, or even just thinking about it, can feel daunting and like a huge step. You may just be nervous about the unknown…",
        href: `${SITE_URL}/debunking-common-myths-about-visiting-a-psychologist/`,
        image: `${SITE_URL}/wp-content/uploads/2022/06/Debunking-common-myths-about-visiting-a-psychologist-1-495x400.jpg`,
        imageAlt: "Two people sitting down on sofas talking",
      },
      {
        title: "What You Need to Know About EMDR Therapy",
        text: "Eye Movement Desensitization and Reprocessing, or EMDR, has become a widely recognized therapeutic method for treating trauma and distressing life experiences.",
        href: `${SITE_URL}/what-you-need-to-know-about-emdr-therapy/`,
        image: `${SITE_URL}/wp-content/uploads/2024/10/EMDR-therapy-v2-495x400.jpg`,
        imageAlt: "Image accompanying information about EMDR therapy",
      },
    ],
    note: "The information provided in these resources is general in nature and is intended to be used for information purposes only.",
  },
  "tip-sheets": {
    title: "Tip sheets",
    eyebrow: "Resources",
    intro: "Access Psych was established to offer qualified in-person and telehealth services to address a wide range of mental health issues and concerns.",
    sections: [
      {
        title: "Helpful information",
        paragraphs: [
          "We understand that making the decision to see a psychologist is a big deal and that access to helpful information can be an important part of the process.",
          "We want to give you the tools to cope with the challenges that life throws at you, and our tip sheets are designed to introduce you to a range of mental health and wellbeing topics.",
          "From sleep hygiene to managing anxiety, our tip sheets are full of handy information and trustworthy third party resources.",
        ],
      },
    ],
    cta: { label: "Visit the tip sheets", href: `${SITE_URL}/tip-sheets/`, external: true },
  },
  careers: {
    title: "Working at Access Psych",
    eyebrow: "Careers",
    intro: "Help Australians access the mental health support they need, when they need it.",
    image: `${SITE_URL}/wp-content/uploads/2022/06/Careers.jpg`,
    imageAlt: "Smiling man looking into camera while using laptop",
    sections: [
      {
        title: "Join our team",
        paragraphs: [
          "At Access Psych, we believe that our mental health and wellbeing are essential to living our best lives. That’s why we’re always on the lookout for talented Registered Psychologists and Mental Health Social Workers to join our team.",
          "You will be part of a dynamic group of mental health professionals who are working to meet unprecedented demand for telehealth and face-to-face psychology, therapy and counselling services. You will also enjoy the benefits of working for one of Australia’s most reputable Allied Health service providers.",
          "Register your interest to join Access Psych right now. Simply fill out the form below and our careers team will contact you to talk about the possibilities.",
          "Want to start with a confidential and friendly chat about your options at Access Psych? Please call Tammy Tran on 0428 575 220.",
        ],
        links: [{ label: "0428 575 220", href: "tel:0428575220" }],
      },
      {
        title: "Mandatory requirements",
        paragraphs: ["Joining our team is straightforward. But first, you need to meet a few mandatory requirements:"],
        bullets: [
          "You are a AHPRA Registered Psychologist, or Accredited Mental Health Social Worker",
          "You have permanent residency in Australia",
          "You are passionate about improving lives through work and health",
          "You want to part of a dynamic, social and hard-working team",
        ],
      },
      {
        title: "Hybrid working",
        paragraphs: ["Our hybrid working model lets you combine both face to face and telehealth work, according to what’s best for you."],
      },
      {
        title: "Dynamic and growing team",
        paragraphs: ["Join Access Psych and become a member of our dynamic team of psychologists working to support Australians who need mental health care."],
      },
      {
        title: "Job security",
        paragraphs: ["We continue to invest in our teams and services, giving you job security and giving you more time to support the people who need it most."],
      },
      {
        title: "Be part of something bigger",
        paragraphs: ["Access Psych is part of MedHealth, a purpose-built collection of leading health, medical and employment brands."],
        links: [{ label: "MedHealth", href: "https://www.medhealth.com.au/", external: true }],
      },
      {
        title: "Current Vacancies",
        paragraphs: ["Register your interest to join Access Psych right now. Simply fill out the form below and our careers team will contact you to talk about the possibilities."],
        links: [{ label: "Register your interest", href: `${SITE_URL}/careers/`, external: true }],
      },
    ],
    cta: { label: "Current vacancies", href: `${SITE_URL}/careers/#current-vacancies`, external: true },
  },
  "news-and-events": {
    title: "News and Events",
    eyebrow: "News and Events",
    intro: "News, announcements and events from Access Psych.",
    cards: [
      {
        title: "Access Psych widens service reach by opening seven new clinics in Victoria",
        text: "March 28, 2023 · Access Psych has opened seven new clinics which will make mental health support available to an estimated half a million people.",
        href: `${SITE_URL}/access-psych-widens-service-reach-by-opening-seven-new-clinics-in-victoria/`,
        image: `${SITE_URL}/wp-content/uploads/2023/03/access-psych_new_clinics-495x400.jpg`,
        imageAlt: "Image accompanying news about new clinics",
      },
      {
        title: "Access Psych expands support network by opening three new clinics",
        text: "February 20, 2023 · The new clinics are in Albury-Wodonga, New South Wales, and Dandenong and Oakleigh, both in Victoria.",
        href: `${SITE_URL}/access-psych-expands-support-network-by-opening-three-new-clinics/`,
        image: `${SITE_URL}/wp-content/uploads/2023/02/three-new-clinics-495x400.png`,
        imageAlt: "Woman talking to a mental health psychologist",
      },
      {
        title: "Event – 2023 Frontline Mental Health Conference",
        text: "February 20, 2023 · Frontline workers, such as firefighters, police officers and defence workers, are known for their resilience, but they are also at high risk of poor mental health.",
        href: `${SITE_URL}/event-2023-frontline-mental-health-conference/`,
        image: `${SITE_URL}/wp-content/uploads/2023/02/frontline-mental-health-conference-495x400.png`,
        imageAlt: "Firefighter standing in burnt bushland",
      },
      {
        title: "Event – Mental Health Breakfast Forum",
        text: "February 20, 2023 · Psychological injuries are increasing amongst the Australian workforce.",
        href: `${SITE_URL}/event-mental-health-breakfast-forum/`,
        image: `${SITE_URL}/wp-content/uploads/2023/02/mental-health-breakfast-forum-cover-495x400.png`,
        imageAlt: "Office lobby and reception area",
      },
    ],
  },
  newsletter: {
    title: "Subscribe to our newsletter",
    eyebrow: "Newsletter",
    intro: "Subscribe to our newsletter to hear about the latest in mental health services and what we do.",
    sections: [
      {
        title: "Subscribe to our newsletter",
        paragraphs: ["* indicates required"],
        bullets: [
          "Email Address *",
          "First Name",
          "Last Name",
          "Postcode",
          "Role",
          "Industry",
          "Subscribe to: Updates / Resources, Regular Capacity, Events, All",
        ],
        links: [{ label: "Open the newsletter subscription form", href: `${SITE_URL}/newsletter/`, external: true }],
      },
    ],
    cta: { label: "Subscribe to our newsletter", href: `${SITE_URL}/newsletter/`, external: true },
  },
  "terms-of-use": {
    title: "Terms of Use",
    eyebrow: "Company policies",
    intro: "TODO: content needed — the original Terms of Use page could not be fetched; the source URL returned 404.",
  },
};

export const locations = [
  { state: "New South Wales", city: "Albury / Wodonga", address: "556 David Street, ALBURY NSW 2640", note: "Located within IPAR Offices" },
  { state: "New South Wales", city: "Ballina", address: "8/31 Cherry Street, BALLINA NSW 2478", note: "Located within IPAR Offices" },
  { state: "New South Wales", city: "Bowral", address: "Suite H, Springett's Arcade, 302 Bong Bong Street, Bowral NSW 2576", note: "Located within Enlighten Health rooms, on the first floor of Springetts Arcade in Bowral. There is a large car park at the rear entrance on Pitt Avenue." },
  { state: "New South Wales", city: "Central Coast", address: "3 Bounty Close, TUGGERAH NSW 2259", note: "Located within IPAR Offices" },
  { state: "New South Wales", city: "Kingswood", address: "Suite 2.04B, Level 2, Somerset Specialist Centre, 38 Somerset Street, KINGSWOOD NSW 2747", note: "Located within IPAR Offices" },
  { state: "New South Wales", city: "Newcastle", address: "Suite 4 OTP House, 10 Bradford Close, KOTARA NSW 2289", note: "Located within IPAR Offices" },
  { state: "New South Wales", city: "Port Macquarie", address: "4/136 William Street, PORT MACQUARIE NSW 2444", note: "Located within IPAR Offices" },
  { state: "New South Wales", city: "Sydney CBD", address: "Level 16, 1 Market Street, SYDNEY NSW 2000", note: "Located within IPAR Offices" },
  { state: "Queensland", city: "Brisbane", address: "Level 1, 10 Eagle Street, BRISBANE QLD 4000", note: "Located within IPAR Offices" },
  { state: "Queensland", city: "Gold Coast", address: "Suite 1102, Level 11, The Rocket 203 Robina Town Centre Drive, ROBINA QLD 4230", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Albury / Wodonga", address: "556 David Street, ALBURY NSW 2640", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Ballarat", address: "32A Doveton St North, Ballarat Central VIC 3350" },
  { state: "Victoria", city: "Bendigo", address: "Suite 5A, Level 2/84 Mollison Street, BENDIGO VIC 3550", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Bentleigh", address: "20A Gilmour Road, BENTLEIGH VIC 3204", note: "Located within One2One Counselling" },
  { state: "Victoria", city: "Bundoora", address: "Level 2, 240 Plenty Road, BUNDOORA VIC 3083", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Caroline Springs", address: "Level 2, 13-15 Lake Street, CAROLINE SPRINGS VIC 3023", note: "Located within Ability Action Australia Office" },
  { state: "Victoria", city: "Dandenong", address: "Shop 3 16-18 Halpin Way, (165 Thomas St), DANDENONG VIC 3175", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Echuca", address: "Office 8, 250 Anstruther Street, ECHUCA VIC 3564", note: "Ace Radio building. On the second floor. Ground level boardroom available for clients with limited mobility. Access granted from side access pathway." },
  { state: "Victoria", city: "Frankston", address: "1 Vera Street, FRANKSTON VIC 3199", note: "Located within Peninsula Family General Practice" },
  { state: "Victoria", city: "Geelong West", address: "5 Villamanta Place, Geelong West VIC 3218", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Gippsland", address: "36A Bair Street, Leongatha VIC 3953", note: "Located within David Morris Private Practice" },
  { state: "Victoria", city: "Melbourne CBD", address: "Level 3 North Tower, 485 La Trobe Street, MELBOURNE VIC 3000", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Mildura", address: "52 Lime Avenue, MILDURA VIC 3500", note: "Located within Revive Health Mildura" },
  { state: "Victoria", city: "Mornington", address: "131 Tanti Avenue, MORNINGTON VIC 3931", note: "Located within Mornington Family Chiropractic" },
  { state: "Victoria", city: "Oakleigh", address: "66 Atherton Road, OAKLEIGH VIC 3166", note: "Located in Oakleigh Osteopathy & Allied Health" },
  { state: "Victoria", city: "Preston", address: "312 High Street, PRESTON VIC 3072", note: "Located within the Wellbeing Chiropractic Centre" },
  { state: "Victoria", city: "Ringwood", address: "Suite 9, Level 1, 12 Maroondah Highway, RINGWOOD VIC 3134", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Wangaratta", address: "Suite 5, 8-10 Tone Road, WANGARATTA VIC 3677", note: "Located within IPAR Offices" },
  { state: "Victoria", city: "Warrnambool", address: "Room 1, 68 Flaxman Street, Warrnambool VIC 3280", note: "(Room 3)" },
  { state: "Victoria", city: "Williams Landing", address: "C08, Level 1 Williams Landing Shopping Centre, 100 Overton Road, WILLIAMS LANDING VIC 3027", note: "Located within Williams Landing Shopping Centre" },
  { state: "South Australia", city: "Adelaide", address: "Level 8, 182 Victoria Square, ADELAIDE SA 5000", note: "Located within IPAR Offices" },
  { state: "Australian Capital Territory", city: "Canberra", address: "Lantern Psychology Centre, Anthony House, 3/6 Geils Court, DEAKIN ACT 2600", note: "Located within IPAR Offices" },
  { state: "Tasmania", city: "Hobart", address: "Ground Floor, 99 Bathurst Street, HOBART TAS 7000", note: "Located within IPAR Offices" },
  { state: "Tasmania", city: "Launceston", address: "Level 2/10-14 Paterson St, Launceston TAS 7250" },
  { state: "Western Australia", city: "Perth", address: "Level 6, 3 Hasler Road, Herdsman WA 6017" },
];
