import { Answer, AssessmentResult, CategoryId, CategoryScore, MaturityLevel } from "../types/assessment";
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
 export const getCategoryName = (category: CategoryId): string => {
  switch (category) {
  case "responsibility":
  return "IT responsibility & support";
  case "alignment":
  return "business & technology alignment";
  case "technology":
  return "core technology & reliability";
  case "security":
  return "security & data protection";
  default:
  return category;
  }
 };
 
 // Get category descriptions
 export const getCategoryDescription = (category: CategoryId): string => {
  switch (category) {
  case "responsibility":
  return "how IT issues are currently handled in your business";
  case "alignment":
  return "how well technology supports your business operations and goals";
  case "technology":
  return "how well your essential tech tools function day-to-day";
  case "security":
  return "how well your critical business and client data is protected";
  default:
  return "";
  }
 };
 
 // Get human-readable maturity level names
 export const getMaturityLevelName = (level: MaturityLevel): string => {
  switch (level) {
  case "reactive":
  return "reactive";
  case "foundational":
  return "foundational";
  case "managed":
  return "managed";
  case "proactive":
  return "proactive";
  case "strategic":
  return "strategic";
  default:
  return level;
  }
 };
 
 // Get description of maturity level
 export const getMaturityLevelDescription = (level: MaturityLevel): string => {
  const descriptions: Record<MaturityLevel, string> = {
  strategic: "technology is a strategic advantage, processes are optimized, security is robust",
  proactive: "processes are well-defined, technology is planned, security is prioritized",
  managed: "processes are developing, key systems are stable, some planning and security measures exist",
  foundational: "basic systems in place but reactive, limited planning and security",
  reactive: "minimal processes, unstable systems, security gaps present"
  };
  return descriptions[level];
 };
 
 // Get action items based on focus area
 export const getActionItems = (category: CategoryId): string[] => {
  const actionItems: Record<CategoryId, string[]> = {
  responsibility: [
  "clarify internal IT point person: designate someone internally (even if wearing multiple hats) as the first point of contact for IT issues to reduce confusion",
  "evaluate support speed: track how long it takes to get help when needed. is it fast enough? if not, explore options for faster support",
  "define support needs: list the top 3 recurring IT problems your team faces. does your current support (if any) address these effectively?",
  "consider proactive support: if you currently rely only on calling someone when things break (break-fix), explore the benefits of ongoing managed IT support for preventing issues",
  "assess IT expertise: does whoever helps with IT understand your specific business or legal software needs? identify critical skill gaps"
  ],
  "user-info": [
  "Complete your user information to get personalized recommendations"
  ],
  alignment: [
  "start basic IT budgeting: estimate your current annual spending on tech (subscriptions, hardware, support). how does this fit into your overall budget?",
  "quick asset list: create a simple inventory of your essential tech: how many main computers? what key software licenses? what cloud services are you paying for?",
  "link tech to business goals: identify 1-2 key goals for the next year. brainstorm specifically how better technology could help achieve them (e.g., improve remote client meetings, speed up document processing)",
  "plan hardware refresh: check the age of your computers/laptops. make a simple plan to replace the oldest ones before they fail and cause major disruption",
  "gather team feedback: ask your team – what are the biggest technology frustrations that slow down their work or impact client service?"
  ],
  technology: [
  "log major IT issues: for one month, keep a simple log of core system problems (email outages, internet slowness, software crashes). identify the biggest, most frequent pain points.",
  "review core software fit: is your main business/practice management software causing headaches or missing key features? explore training, updates, or alternatives.",
  "assess cloud opportunities: could using cloud tools (like Microsoft 365/Google Workspace for email/files) improve your team's collaboration or ability to work remotely?",
  "evaluate file sharing security & ease: how does your team share files securely internally and externally? are there easier or safer methods available?",
  "check software licenses: quickly verify that all essential business software is properly licensed and up-to-date to avoid legal or security problems."
  ],
  security: [
  "verify backups now (priority #1): confirm critical data is being backed up regularly. **most importantly, schedule a test restore this month.** if backups aren't happening or tested, address this immediately.",
  "enable MFA everywhere: turn on multi-factor authentication (MFA/2FA) immediately for all email accounts (Microsoft 365/Google) and other critical online services (like banking). this is a crucial security step.",
  "improve password habits: implement and communicate a basic strong password policy (long, unique passwords). strongly recommend using a password manager for your team.",
  "quick security reminder: send a brief email or hold a 15-min meeting reminding staff about spotting phishing scams and practicing safe browsing. even a short reminder helps.",
  "review data access: check who has access to sensitive client/business files. remove permissions for anyone who doesn't absolutely need it for their job."
  ]
  };
  return actionItems[category];
 };
 
 // Calculate results from answers
 export const calculateResults = (answers: Answer[]): AssessmentResult => {
  // Initialize category scores
  type CategoryScoreType = { score: number; count: number };
  type CategoryScores = Record<CategoryId, CategoryScoreType> & { [key: string]: CategoryScoreType };
  const categoryScores: CategoryScores = {
  responsibility: { score: 0, count: 0 },
  alignment: { score: 0, count: 0 },
  technology: { score: 0, count: 0 },
  security: { score: 0, count: 0 },
  "user-info": {
  score: 0,
  count: 0
  }
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
  const categories: CategoryId[] = ["responsibility", "alignment", "technology", "security"];
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
  let maturityLevel: MaturityLevel;
 
  if (overallPercentage >= 80) {
  maturityLevel = 'strategic';
  } else if (overallPercentage >= 60) {
  maturityLevel = 'proactive';
  } else if (overallPercentage >= 40) {
  maturityLevel = 'managed';
  } else if (overallPercentage >= 20) {
  maturityLevel = 'foundational';
  } else {
  maturityLevel = 'reactive';
  }
 
  const responsibilityScore = formattedCategoryScores.find(
  score => score.category === 'responsibility'
  );
 
  const responsibilityText = generateResponsibilityText(
  responsibilityScore?.percentage ?? 0
  );
 
  return {
  overallScore: overallPercentage,
  maturityLevel,
  maturityDescription: getMaturityLevelDescription(maturityLevel),
  scores: categoryScores,
  categoryScores: formattedCategoryScores,
  focusArea,
  responsibilityText,
  };
 };
 
 const generateResponsibilityText = (score: number): string => {
  if (score >= 80) {
  return "your organization has strong IT responsibility and support structures in place";
  } else if (score >= 60) {
  return "your IT responsibility and support setup is solid but has room for improvement";
  } else if (score >= 40) {
  return "your IT responsibility and support framework needs attention to better serve your needs";
  } else {
  return "establishing clear IT responsibility and support structures should be a priority";
  }
 };