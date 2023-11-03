// import postgres table
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

//User: when usr gives in role and experience in that role
//System: when System returns the bullet points
export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

//Each Resume will be a row in the database 
export const resumes = pgTable('resumes', {
    id: serial('id').primaryKey(),
    resumeName: text('resume_name').notNull(),
    resumeUrl: text('resume_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    fileKey: text('file_key').notNull(), //for retrieving the file from S3

})
//each Bulletpoint will be stored in the database
export const bulletpoints = pgTable('bulletpoints', {
    id: serial('id').primaryKey(),
    bulletpointId: integer('bulletpoint_id').references(()=>resumes.id).notNull(), //one to many relationship with resumes
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    role: userSystemEnum('role').notNull()
})