import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  campaigns,
  campaignMembers,
  sessions,
  sessionParticipants,
  virtualMaps,
  sessionMaps,
  mapMarkers,
  chatMessages,
  sessionFiles,
  videoSyncEvents,
  sessionInvitations,
  emailVerificationTokens,
  InsertCampaign,
  InsertSession,
  InsertVirtualMap,
  InsertMapMarker,
  InsertChatMessage,
  InsertSessionFile,
  InsertVideoSyncEvent,
  InsertEmailVerificationToken,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { eq } from "drizzle-orm";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const existing = await db.select().from(users).where(eq(users.openId, user.openId)).limit(1);

  if (existing.length > 0) {
    await db.update(users).set(user).where(eq(users.openId, user.openId));
  } else {
    await db.insert(users).values(user);
  }
}

export async function getUser(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

  return result.length > 0 ? result
// ============ CAMPAIGNS ============

export async function createCampaign(data: InsertCampaign) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(campaigns).values(data);
  return (result as any).insertId;
}

export async function getCampaign(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
  return result[0] || null;
}

export async function getUserCampaigns(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.creatorId, userId));
  return result;
}

export async function addCampaignMember(data: {
  campaignId: number;
  userId: number;
  role: "master" | "player";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(campaignMembers).values({
    campaignId: data.campaignId,
    userId: data.userId,
    role: data.role,
  });
  return (result as any).insertId;
}

// ============ SESSIONS ============

export async function createSession(data: InsertSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(sessions).values(data);
  return (result as any).insertId;
}

export async function getSession(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(sessions).where(eq(sessions.id, id)).limit(1);
  return result[0] || null;
}

export async function getCampaignSessions(campaignId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(sessions)
    .where(eq(sessions.campaignId, campaignId));
  return result;
}

export async function addSessionParticipant(data: {
  sessionId: number;
  userId: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(sessionParticipants).values({
    sessionId: data.sessionId,
    userId: data.userId,
  });
  return (result as any).insertId;
}

// ============ VIRTUAL MAPS ============

export async function createVirtualMap(data: InsertVirtualMap) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(virtualMaps).values(data);
  return (result as any).insertId;
}

export async function getVirtualMap(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(virtualMaps).where(eq(virtualMaps.id, id)).limit(1);
  return result[0] || null;
}

export async function addMapMarker(data: InsertMapMarker) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(mapMarkers).values(data);
  return (result as any).insertId;
}

// ============ CHAT MESSAGES ============

export async function createChatMessage(data: InsertChatMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(chatMessages).values(data);
  return (result as any).insertId;
}

export async function getSessionMessages(sessionId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .limit(limit);
  return result;
}

// ============ SESSION FILES ============

export async function createSessionFile(data: InsertSessionFile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(sessionFiles).values(data);
  return (result as any).insertId;
}

export async function getSessionFiles(sessionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(sessionFiles)
    .where(eq(sessionFiles.sessionId, sessionId));
  return result;
}

// ============ VIDEO SYNC ============

export async function createVideoSyncEvent(data: InsertVideoSyncEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(videoSyncEvents).values(data);
  return (result as any).insertId;
}

export async function getVideoSyncEvents(sessionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(videoSyncEvents)
    .where(eq(videoSyncEvents.sessionId, sessionId));
  return result;
}

// ============ SESSION INVITATIONS ============

export async function createSessionInvitation(data: {
  sessionId: number;
  userId: number;
  invitedBy: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(sessionInvitations).values({
    sessionId: data.sessionId,
    invitedUserId: data.userId,
    invitedBy: data.invitedBy,
    status: "pending",
  });
  return (result as any).insertId;
}

export async function getPendingInvitations(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(sessionInvitations)
    .where(eq(sessionInvitations.invitedUserId, userId));
  return result;
}
