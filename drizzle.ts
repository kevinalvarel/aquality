import { drizzle } from "drizzle-orm/neon-http";

import * as authSchema from "@/db/schema";
import * as domainSchema from "@/db/schema/index";
import * as relations from "@/db/relations/index";
import * as enums from "@/db/enums";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    ...authSchema,
    ...domainSchema,
    ...relations,
    ...enums,
  },
});
