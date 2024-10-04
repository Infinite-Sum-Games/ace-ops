-- AlterTable
CREATE SEQUENCE campaigncontent_id_seq;
ALTER TABLE "CampaignContent" ALTER COLUMN "id" SET DEFAULT nextval('campaigncontent_id_seq');
ALTER SEQUENCE campaigncontent_id_seq OWNED BY "CampaignContent"."id";

-- AlterTable
CREATE SEQUENCE subscribers_id_seq;
ALTER TABLE "Subscribers" ALTER COLUMN "id" SET DEFAULT nextval('subscribers_id_seq');
ALTER SEQUENCE subscribers_id_seq OWNED BY "Subscribers"."id";

-- AlterTable
CREATE SEQUENCE suggestions_id_seq;
ALTER TABLE "Suggestions" ALTER COLUMN "id" SET DEFAULT nextval('suggestions_id_seq');
ALTER SEQUENCE suggestions_id_seq OWNED BY "Suggestions"."id";
