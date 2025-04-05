
import { Question } from "../types/assessment";

export const questions: Question[] = [
  // IT Responsibility & Support
  {
    id: "responsibility_1",
    text: "When IT problems occur (e.g., computer won't start, software crashes), is there a specific person internally everyone knows to go to first for help?",
    category: "responsibility",
  },
  {
    id: "responsibility_2",
    text: "When tech support is needed (from anyone - internal colleague, external break-fix person), is help usually available quickly enough to avoid major work disruption?",
    category: "responsibility",
  },
  {
    id: "responsibility_3",
    text: "How would you describe your current approach to IT support?",
    category: "responsibility",
  },
  {
    id: "responsibility_4",
    text: "Do recurring IT problems (like email issues, printer jams, network slowdowns) frequently interrupt your team's daily work?",
    category: "responsibility",
  },
  {
    id: "responsibility_5",
    text: "Do you feel the person/company currently handling IT issues (if any) truly understands the specific needs and priorities of your business/firm?",
    category: "responsibility",
  },
  
  // Business & Technology Alignment
  {
    id: "alignment_1",
    text: "We consider IT needs and potential costs when making overall business plans or budgets.",
    category: "alignment",
  },
  {
    id: "alignment_2",
    text: "Does your current technology (computers, software, network) generally help your team work efficiently, or does it often feel like a source of frustration?",
    category: "alignment",
  },
  {
    id: "alignment_3",
    text: "We have a basic understanding of our key IT assets (e.g., main computers, essential software licenses, cloud services we pay for).",
    category: "alignment",
  },
  {
    id: "alignment_4",
    text: "We try to proactively plan for replacing aging computers or upgrading essential software before they cause major problems.",
    category: "alignment",
  },
  {
    id: "alignment_5",
    text: "Our current technology seems adequate to support our main business goals for the next 1-2 years.",
    category: "alignment",
  },
  
  // Core Technology & Reliability
  {
    id: "technology_1",
    text: "Our core systems (like email, internet access, and primary business/legal software) are generally reliable and available when we need them.",
    category: "technology",
  },
  {
    id: "technology_2",
    text: "Our computers and network generally perform well enough for our team to do their jobs efficiently.",
    category: "technology",
  },
  {
    id: "technology_3",
    text: "We effectively utilize cloud services (like Microsoft 365, Google Workspace, Dropbox, etc.) where it makes sense for our business.",
    category: "technology",
  },
  {
    id: "technology_4",
    text: "Is it generally easy for our team to securely share files and collaborate on documents, both internally and with clients/external parties?",
    category: "technology",
  },
  {
    id: "technology_5",
    text: "Our primary business or practice management software generally meets our key operational needs.",
    category: "technology",
  },
  
  // Security & Data Protection
  {
    id: "security_1",
    text: "Is critical business and client data regularly backed up to a separate, secure location (e.g., cloud service, external drive)?",
    category: "security",
  },
  {
    id: "security_2",
    text: "Have you ever actually tested if you can restore files or systems successfully from your backups within the last year?",
    category: "security",
  },
  {
    id: "security_3",
    text: "Does your business enforce basic security measures like strong, unique passwords, and is multi-factor authentication (MFA/2FA) required for critical accounts like email?",
    category: "security",
  },
  {
    id: "security_4",
    text: "Do your employees receive occasional reminders or basic guidance about cybersecurity risks, such as how to spot phishing emails or unsafe websites?",
    category: "security",
  },
  {
    id: "security_5",
    text: "Do you actively take steps to ensure your handling of client/customer data complies with relevant confidentiality, security, and privacy requirements?",
    category: "security",
  },
];
