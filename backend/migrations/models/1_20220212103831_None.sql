-- upgrade --
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(20) NOT NULL,
    "content" JSON NOT NULL
);
CREATE TABLE IF NOT EXISTS "authtoken" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "token" TEXT,
    "refresh_token" TEXT
);
CREATE TABLE IF NOT EXISTS "channel" (
    "id" BIGINT NOT NULL  PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS "user" (
    "id" BIGINT NOT NULL  PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "firstname" VARCHAR(25) NOT NULL,
    "lastname" VARCHAR(25) NOT NULL,
    "email" VARCHAR(320) NOT NULL UNIQUE,
    "password" VARCHAR(4096) NOT NULL
);
CREATE TABLE IF NOT EXISTS "message" (
    "id" BIGINT NOT NULL  PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "author_id" BIGINT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "recipient_id" BIGINT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "relationship" (
    "id" BIGINT NOT NULL  PRIMARY KEY,
    "type" SMALLINT NOT NULL  /* friends: 1\npending_incoming: 2\npending_outgoing: 3 */,
    "of_id" BIGINT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "to_id" BIGINT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    CONSTRAINT "uid_relationshi_of_id_7ada18" UNIQUE ("of_id", "to_id", "type")
);
CREATE TABLE IF NOT EXISTS "channel_user" (
    "channel_id" BIGINT NOT NULL REFERENCES "channel" ("id") ON DELETE CASCADE,
    "user_id" BIGINT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
