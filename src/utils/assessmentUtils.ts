
import { Answer, AssessmentResult, Category, CategoryScore, MaturityLevel } from "../types/assessment";
import { questions } from "../data/assessmentQuestions";

// Define maturity level thresholds
const maturityLevels: { level: MaturityLevel; min: number; max: number }[] = [
  { level: "reactive", min: 0, max: 20 },
  { level: "foundational", min: 21, max: 40 },
  { level: "managed", min: 41, max: 60 },
  { level: "proactive", min: 61, max: 80 },
  { level: "strategic", min: 81, max: 100 },
];

// Get human-readable category names
export const getCategoryName = (category: Category): string => {
  switch (category) {
    case "responsibility":
      return "IT Responsibility & Support";
    case "alignment":
      return "Business & Technology Alignment";
    case "technology":
      return "Core Technology & Reliability";
    case "security":
      return "Security & Data Protection";
    default:
      return category;
  }
};

// Get category descriptions
export const getCategoryDescription = (category: Category): string => {
  switch (category) {
    case "responsibility":
      return "How IT issues are currently handled in your business.";
    case "alignment":
      return "How well technology supports your business operations and goals.";
    case "technology":
      return "How well your essential tech tools function day-to-day.";
    case "security":
      return "How well your critical business and client data is protected.";
    default:
      return "";
  }
};

// Get human-readable maturity level names
export const getMaturityLevelName = (level: MaturityLevel): string => {
  switch (level) {
    case "reactive":
      return "Reactive";
    case "foundational":
      return "Foundational";
    case "managed":
      return "Managed";
    case "proactive":
      return "Proactive";
    case "strategic":
      return "Strategic";
    default:
      return level;
  }
};

// Get description of maturity level
export const getMaturityLevelDescription = (level: MaturityLevel): string => {
  switch (level) {
    case "reactive":
      return "IT is chaotic, problems fixed as they break, little planning, significant risks.";
    case "foundational":
      return "Basic elements are in place, but inconsistent; starting to think about IT, but still mainly reactive.";
    case "managed":
      return "Processes are developing, key systems are stable, some planning and security measures exist.";
    case "proactive":
      return "IT is well-managed, aligned with business goals, security is a priority, using technology for efficiency.";
    case "strategic":
      return "IT is a competitive advantage, optimized, secure, compliant, continuously improving.";
    default:
      return "";
  }
};

// Get action items based on focus area
export const getActionItems = (focusArea: Category): string[] => {
  switch (focusArea) {
    case "responsibility":
      return [
        "Clarify internal IT point person: designate someone internally (even if wearing multiple hats) as the first point of contact for IT issues to reduce confusion.",
        "Evaluate support speed: track how long it takes to get help when needed. Is it fast enough? If not, explore options for faster support.",
        "Define support needs: list the top 3 recurring IT problems your team faces. Does your current support (if any) address these effectively?",
        "Consider proactive support: if you currently rely only on calling someone when things break (break-fix), explore the benefits of ongoing managed IT support for preventing issues.",
        "Assess IT expertise: does whoever helps with IT understand your specific business or legal software needs? Identify critical skill gaps."
      ];
    case "alignment":
      return [
        "Start basic IT budgeting: estimate your current annual spending on tech (subscriptions, hardware, support). How does this fit into your overall budget?",
        "Quick asset list: create a simple inventory of your essential tech: how many main computers? What key software licenses? What cloud services are you paying for?",
        "Link tech to business goals: identify 1-2 key goals for the next year. Brainstorm specifically how better technology could help achieve them (e.g., improve remote client meetings, speed up document processing).",
        "Plan hardware refresh: check the age of your computers/laptops. Make a simple plan to replace the oldest ones *before* they fail and cause major disruption.",
        "Gather team feedback: ask your team – what are the biggest technology frustrations that slow down their work or impact client service?"
      ];
    case "technology":
      return [
        "Log major IT issues: for one month, keep a simple log of core system problems (email outages, internet slowness, software crashes). Identify the biggest, most frequent pain points.",
        "Review core software fit: is your main business/practice management software causing headaches or missing key features? Explore training, updates, or alternatives.",
        "Assess cloud opportunities: could using cloud tools (like Microsoft 365/Google Workspace for email/files) improve your team's collaboration or ability to work remotely?",
        "Evaluate file sharing security & ease: how does your team share files securely internally and externally? Are there easier or safer methods available?",
        "Check software licenses: quickly verify that all essential business software is properly licensed and up-to-date to avoid legal or security problems."
      ];
    case "security":
      return [
        "Verify backups now (Priority #1): confirm critical data is being backed up regularly. **Most importantly, schedule a test restore this month.** If backups aren't happening or tested, address this immediately.",
        "Enable MFA everywhere: turn on multi-factor authentication (MFA/2FA) immediately for all email accounts (Microsoft 365/Google) and other critical online services (like banking). This is a crucial security step.",
        "Improve password habits: implement and communicate a basic strong password policy (long, unique passwords). Strongly recommend using a password manager for your team.",
        "Quick security reminder: send a brief email or hold a 15-min meeting reminding staff about spotting phishing scams and practicing safe browsing. Even a short reminder helps.",
        "Review data access: check who has access to sensitive client/business files. Remove permissions for anyone who doesn't absolutely need it for their job."
      ];
    default:
      return [];
  }
};

// Calculate results from answers
export const calculateResults = (answers: Answer[]): AssessmentResult => {
  // Initialize category scores
  const categoryScores: Record<Category, { score: number; count: number }> = {
    responsibility: { score: 0, count: 0 },
    alignment: { score: 0, count: 0 },
    technology: { score: 0, count: 0 },
    security: { score: 0, count: 0 },
  };

  // Calculate scores per category
  answers.forEach((answer) => {
    // Skip null answers (N/A)
    if (answer.value === null) return;
    
    const question = questions.find((q) => q.id === answer.questionId);
    if (question) {
      categoryScores[question.category].score += answer.value;
      categoryScores[question.category].count += 1;
    }
  });

  // Calculate category percentages
  const categories: Category[] = ["responsibility", "alignment", "technology", "security"];
  const formattedCategoryScores: CategoryScore[] = categories.map((category) => {
    const maxPossibleScore = categoryScores[category].count * 5;
    const score = categoryScores[category].score;
    const percentage = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;
    
    return {
      category,
      score,
      maxScore: maxPossibleScore,
      percentage,
    };
  });

  // Find focus area (lowest scoring category)
  let focusArea = categories[0];
  let lowestPercentage = 100;

  formattedCategoryScores.forEach((categoryScore) => {
    if (categoryScore.percentage < lowestPercentage && categoryScore.maxScore > 0) {
      lowestPercentage = categoryScore.percentage;
      focusArea = categoryScore.category;
    }
  });

  // Calculate overall score
  const totalScore = formattedCategoryScores.reduce((sum, cat) => sum + cat.score, 0);
  const maxPossibleScore = formattedCategoryScores.reduce((sum, cat) => sum + cat.maxScore, 0);
  const overallPercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

  // Determine maturity level
  let maturityLevel: MaturityLevel = "reactive";
  for (const level of maturityLevels) {
    if (overallPercentage >= level.min && overallPercentage <= level.max) {
      maturityLevel = level.level;
      break;
    }
  }

  return {
    overallScore: totalScore,
    maxScore: maxPossibleScore,
    percentage: overallPercentage,
    maturityLevel,
    categoryScores: formattedCategoryScores,
    focusArea,
  };
};
