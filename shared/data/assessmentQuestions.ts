import { Question } from '../types/assessment';

export const questions: Question[] = [
  // IT Responsibility & Support
  {
    id: "responsibility_1",
    text: "when IT problems occur (e.g., computer won't start, software crashes), is there a specific person internally everyone knows to go to first for help?",
    category: "responsibility",
    options: []
  },
  {
    id: "responsibility_2",
    text: "when IT support is needed (from anyone - internal colleague, external break-fix person), is help usually available quickly enough to avoid major work disruption?",
    category: "responsibility",
    options: []
  },
  {
    id: "responsibility_3",
    text: "how would you describe your current approach to IT support?",
    category: "responsibility",
    options: []
  },
  {
    id: "responsibility_4",
    text: "do recurring IT problems (like email issues, printer jams, network slowdowns) frequently interrupt your team's daily work?",
    category: "responsibility",
    options: []
  },
  {
    id: "responsibility_5",
    text: "do you feel the person/company currently handling IT issues (if any) truly understands the specific needs and priorities of your business/firm?",
    category: "responsibility",
    options: []
  },
  
  // Business & Technology Alignment
  {
    id: "alignment_1",
    text: "we consider IT needs and potential costs when making overall business plans or budgets.",
    category: "alignment",
    options: []
  },
  {
    id: "alignment_2",
    text: "does your current technology (computers, software, network) generally help your team work efficiently, or does it often feel like a source of frustration?",
    category: "alignment",
    options: []
  },
  {
    id: "alignment_3",
    text: "we have a basic understanding of our key IT assets (e.g., main computers, essential software licenses, cloud services we pay for).",
    category: "alignment",
    options: []
  },
  {
    id: "alignment_4",
    text: "we try to proactively plan for replacing aging computers or upgrading essential software before they cause major problems.",
    category: "alignment",
    options: []
  },
  {
    id: "alignment_5",
    text: "our current technology seems adequate to support our main business goals for the next 1-2 years.",
    category: "alignment",
    options: []
  },
  
  // Core Technology & Reliability
  {
    id: "technology_1",
    text: "our core systems (like email, internet access, and primary business/legal software) are generally reliable and available when we need them.",
    category: "technology",
    options: []
  },
  {
    id: "technology_2",
    text: "our computers and network generally perform well enough for our team to do their jobs efficiently.",
    category: "technology",
    options: []
  },
  {
    id: "technology_3",
    text: "we effectively utilize cloud services (like microsoft 365, google workspace, dropbox, etc.) where it makes sense for our business.",
    category: "technology",
    options: []
  },
  {
    id: "technology_4",
    text: "is it generally easy for our team to securely share files and collaborate on documents, both internally and with clients/external parties?",
    category: "technology",
    options: []
  },
  {
    id: "technology_5",
    text: "our primary business or practice management software generally meets our key operational needs.",
    category: "technology",
    options: []
  },
  
  // Security & Data Protection
  {
    id: "security_1",
    text: "is critical business and client data regularly backed up to a separate, secure location (e.g., cloud service, external drive)?",
    category: "security",
    options: []
  },
  {
    id: "security_2",
    text: "have you ever actually tested if you can restore files or systems successfully from your backups within the last year?",
    category: "security",
    options: []
  },
  {
    id: "security_3",
    text: "does your business enforce basic security measures like strong, unique passwords, and is multi-factor authentication (mfa/2fa) required for critical accounts like email?",
    category: "security",
    options: []
  },
  {
    id: "security_4",
    text: "do your employees receive occasional reminders or basic guidance about cybersecurity risks, such as how to spot phishing emails or unsafe websites?",
    category: "security",
    options: []
  },
  {
    id: "security_5",
    text: "do you actively take steps to ensure your handling of client/customer data complies with relevant confidentiality, security, and privacy requirements?",
    category: "security",
    options: []
  },
];
