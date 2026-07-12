// ─── Central Database Export ─────────────────────────────────────────────────
// Single import point for everything database-related:
//   import { db, beaches, analyses, ... } from "@/db"
// Database instance
export { db } from "@/drizzle";
// Auth tables (Better Auth)
export { user, session, account, verification } from "./schema";
// Domain tables
export {
  beaches,
  analyses,
  environmentalMetrics,
  aiDetections,
  recommendations,
  files,
  activities,
  chatConversations,
  chatMessages,
} from "./schema/index";
// Enums
export {
  analysisStatusEnum,
  beachStatusEnum,
  recommendationPriorityEnum,
  recommendationCategoryEnum,
  activityTypeEnum,
  fileTypeEnum,
} from "./enums";
// Relations
export {
  userRelations,
  sessionRelations,
  accountRelations,
  beachRelations,
  analysisRelations,
  environmentalMetricsRelations,
  aiDetectionRelations,
  recommendationRelations,
  fileRelations,
  activityRelations,
  chatConversationRelations,
  chatMessageRelations,
} from "./relations/index";
