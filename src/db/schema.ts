import {
    pgTable,
    bigserial,
    char,
    timestamp,
    varchar,
    uniqueIndex,
    text,
    boolean,
    bigint,
    integer,
    check,
    foreignKey,
    doublePrecision,
    numeric,
    index,
    primaryKey,
    pgSequence,
    serial, pgEnum
} from "drizzle-orm/pg-core"
import {dbCategoryNames} from "@/constants/category";
import { sql } from "drizzle-orm"



export const postHateCountSeq = pgSequence("post_hate_count_seq", {  startWith: "1", increment: "50", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })
export const postLikeCountSeq = pgSequence("post_like_count_seq", {  startWith: "1", increment: "50", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })
export const postSeq = pgSequence("post_seq", {  startWith: "1", increment: "50", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })
export const replyLikeCountSeq = pgSequence("reply_like_count_seq", {  startWith: "1", increment: "50", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })
export const testSeq = pgSequence("test_seq", {  startWith: "1", increment: "50", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })

export const signInHistory = pgTable("sign_in_history", {
    signInHistoryId: bigserial("sign_in_history_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    userId: varchar("user_id", { length: 255 }),
    platformInfo: varchar("platform_info", { length: 255 }),
});

export const categories = pgTable("categories", {
    categoryId: text("category_id").primaryKey().notNull(),
    name: text().notNull(),
    description: text(),
    emoji: text().notNull(),
    delYn: boolean("del_yn").default(false).notNull(),
    regUser: text("reg_user"),
    modUser: text("mod_user"),
    regDateTime: timestamp("reg_date_time", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    modDateTime: timestamp("mod_date_time", { precision: 3, mode: 'string' }).notNull(),
}, (table) => [
    uniqueIndex("categories_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const menuLikeHistory = pgTable("menu_like_history", {
    menuLikeHistoryId: bigserial("menu_like_history_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    menuId: bigint("menu_id", { mode: "number" }),
    userId: varchar("user_id", { length: 255 }),
});

export const vueBoard = pgTable("vue_board", {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    author: varchar({ length: 255 }),
    content: varchar({ length: 255 }),
    title: varchar({ length: 255 }),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    views: integer(),
});

export const menu = pgTable("menu", {
    menuId: bigserial("menu_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    menuCategory: varchar("menu_category", { length: 255 }),
    menuImage: varchar("menu_image", { length: 255 }),
    menuName: varchar("menu_name", { length: 255 }),
    searchCount: bigint("search_count", { mode: "number" }),
    totalSearchCount: bigint("total_search_count", { mode: "number" }),
    userId: bigint("user_id", { mode: "number" }),
    likeTempCount: bigint("like_temp_count", { mode: "number" }),
    description: varchar({ length: 255 }),
});

export const member = pgTable("member", {
    memberId: bigserial("member_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    memberType: varchar("member_type", { length: 255 }),
    password: varchar({ length: 255 }),
    username: varchar({ length: 255 }),
}, (table) => [
    check("member_member_type_check", sql`(member_type)::text = ANY (ARRAY[('GENERAL'::character varying)::text, ('ADMIN'::character varying)::text])`),
]);

export const codeGroup = pgTable("code_group", {
    codeGroupId: bigserial("code_group_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    codeGroupKey: varchar("code_group_key", { length: 255 }),
    codeGroupName: varchar("code_group_name", { length: 255 }),
});

export const code = pgTable("code", {
    codeId: bigserial("code_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    bufferFirstContent: varchar("buffer_first_content", { length: 255 }),
    codeKey: varchar("code_key", { length: 255 }),
    codeName: varchar("code_name", { length: 255 }),
    test1: varchar({ length: 255 }),
    codeGroupId: bigint("code_group_id", { mode: "number" }),
}, (table) => [
    foreignKey({
        columns: [table.codeGroupId],
        foreignColumns: [codeGroup.codeGroupId],
        name: "fkt8wmpi8wl01ktn41tjol0svkl"
    }),
]);

export const menuLikeCount = pgTable("menu_like_count", {
    menuLikeCountId: bigserial("menu_like_count_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    menuId: bigint("menu_id", { mode: "number" }),
    userId: bigint("user_id", { mode: "number" }),
}, (table) => [
    foreignKey({
        columns: [table.menuId],
        foreignColumns: [menu.menuId],
        name: "fkkiriilov66ge0q3u4m480t83v"
    }),
]);

export const placeDetail = pgTable("place_detail", {
    placeDetailId: bigserial("place_detail_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    addressName: varchar("address_name", { length: 255 }),
    categoryName: varchar("category_name", { length: 255 }),
    distance: varchar({ length: 255 }),
    gradeAvg: doublePrecision("grade_avg"),
    gradeCount: numeric("grade_count", { precision: 38, scale:  2 }),
    phone: varchar({ length: 255 }),
    placeId: bigint("place_id", { mode: "number" }),
    placeInfo: varchar("place_info", { length: 255 }),
    placeName: varchar("place_name", { length: 255 }),
    placeUrl: varchar("place_url", { length: 255 }),
    roadAddressName: varchar("road_address_name", { length: 255 }),
    x: varchar({ length: 255 }),
    y: varchar({ length: 255 }),
    likeCount: numeric("like_count", { precision: 38, scale:  2 }),
    likeYn: char("like_yn", { length: 1 }),
});

export const placeGrade = pgTable("place_grade", {
    placeGradeId: bigserial("place_grade_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    grade: integer(),
    placeDetailId: bigint("place_detail_id", { mode: "number" }),
    userId: bigint("user_id", { mode: "number" }),
    memberId: varchar("member_id", { length: 255 }),
}, (table) => [
    foreignKey({
        columns: [table.placeDetailId],
        foreignColumns: [placeDetail.placeDetailId],
        name: "fkcoqh7wdj8qy310rpk043q7va0"
    }),
]);

export const placeLikeCount = pgTable("place_like_count", {
    placeLikeCountId: bigserial("place_like_count_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    userId: bigint("user_id", { mode: "number" }),
    placeDetailId: bigint("place_detail_id", { mode: "number" }),
}, (table) => [
    foreignKey({
        columns: [table.placeDetailId],
        foreignColumns: [placeDetail.placeDetailId],
        name: "fk932fbswwbsaminc2pq8misjxl"
    }),
]);

export const post = pgTable("post", {
    postId: bigserial("post_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    content: varchar({ length: 255 }),
    userSession: varchar("user_session", { length: 255 }),
    writer: varchar({ length: 255 }),
    userId: bigint("user_id", { mode: "number" }),
    category: varchar({ length: 255 }),
    title: varchar({ length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
});

export const postHateCount = pgTable("post_hate_count", {
    postHateCountId: bigint("post_hate_count_id", { mode: "number" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    userId: bigint("user_id", { mode: "number" }),
    postId: bigint("post_id", { mode: "number" }),
}, (table) => [
    foreignKey({
        columns: [table.postId],
        foreignColumns: [post.postId],
        name: "fkjxc6nlgcphpw03fdaavn7pg5a"
    }),
]);

export const test = pgTable("test", {
    id: bigint({ mode: "number" }).primaryKey().notNull(),
    test: varchar({ length: 255 }),
});

export const springSession = pgTable("spring_session", {
    primaryId: char("primary_id", { length: 36 }).primaryKey().notNull(),
    sessionId: char("session_id", { length: 36 }).notNull(),
    creationTime: bigint("creation_time", { mode: "number" }).notNull(),
    lastAccessTime: bigint("last_access_time", { mode: "number" }).notNull(),
    maxInactiveInterval: integer("max_inactive_interval").notNull(),
    expiryTime: bigint("expiry_time", { mode: "number" }).notNull(),
    principalName: varchar("principal_name", { length: 100 }),
}, (table) => [
    uniqueIndex("spring_session_ix1").using("btree", table.sessionId.asc().nullsLast().op("bpchar_ops")),
    index("spring_session_ix2").using("btree", table.expiryTime.asc().nullsLast().op("int8_ops")),
    index("spring_session_ix3").using("btree", table.principalName.asc().nullsLast().op("text_ops")),
]);

export const userTm = pgTable("user_tm", {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    email: varchar({ length: 255 }),
    name: varchar({ length: 255 }),
    password: varchar({ length: 255 }),
});

export const reply = pgTable("reply", {
    replyId: bigserial("reply_id", { mode: "bigint" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    content: varchar({ length: 255 }),
    depth: integer(),
    parentId: bigint("parent_id", { mode: "number" }),
    replyCategory: varchar("reply_category", { length: 255 }),
    userName: varchar("user_name", { length: 255 }),
    postId: bigint("post_id", { mode: "number" }),
    grade: integer(),
    userId: bigint("user_id", { mode: "number" }),
}, (table) => [
    foreignKey({
        columns: [table.postId],
        foreignColumns: [post.postId],
        name: "fknpyg5e6pqr2v1y4y6pacte11q"
    }),
]);

export const postLikeCount = pgTable("post_like_count", {
    postLikeCountId: bigint("post_like_count_id", { mode: "number" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    postId: bigint("post_id", { mode: "number" }),
    userId: bigint("user_id", { mode: "number" }),
}, (table) => [
    foreignKey({
        columns: [table.postId],
        foreignColumns: [post.postId],
        name: "fk7pj3y7qjkd42ah7n79mchnk3j"
    }),
]);

export const replyLikeCount = pgTable("reply_like_count", {
    replyLikeCountId: bigint("reply_like_count_id", { mode: "number" }).primaryKey().notNull(),
    delYn: char("del_yn", { length: 1 }),
    modDateTime: timestamp("mod_date_time", { precision: 6, mode: 'string' }),
    regDateTime: timestamp("reg_date_time", { precision: 6, mode: 'string' }),
    replyType: varchar("reply_type", { length: 255 }),
    replyId: bigint("reply_id", { mode: "number" }),
    userId: bigint("user_id", { mode: "number" }),
}, (table) => [
    foreignKey({
        columns: [table.replyId],
        foreignColumns: [reply.replyId],
        name: "fk4d382r60xlojna1ggap1euv5c"
    }),
]);

export const userLy = pgTable("user_ly", {
    userId: varchar("user_id", { length: 30 }).primaryKey().notNull(),
    password: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 10 }).notNull(),
    role: varchar({ length: 10 }).notNull(),
    nickName: varchar("nick_name", { length: 255 }),
    nickname: varchar({ length: 255 }),
    userProfileUrl: varchar("user_profile_url", { length: 255 }),
    name: varchar({ length: 255 }),
});

export const certification = pgTable("certification", {
    userId: varchar("user_id", { length: 30 }).primaryKey().notNull(),
    email: varchar({ length: 255 }).notNull(),
    certificationNumber: varchar("certification_number", { length: 4 }).notNull(),
});

export const springSessionAttributes = pgTable("spring_session_attributes", {
    sessionPrimaryId: char("session_primary_id", { length: 36 }).notNull(),
    attributeName: varchar("attribute_name", { length: 200 }).notNull(),
    attributeBytes: text("attribute_bytes").notNull(),
}, (table) => [
    foreignKey({
        columns: [table.sessionPrimaryId],
        foreignColumns: [springSession.primaryId],
        name: "spring_session_attributes_fk"
    }).onDelete("cascade"),
    primaryKey({ columns: [table.sessionPrimaryId, table.attributeName], name: "spring_session_attributes_pk"}),
]);

export const categoryEnum = pgEnum('category', dbCategoryNames);

export const menus = pgTable('menus', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    category: categoryEnum('category').notNull(),
});